import { NextResponse } from "next/server";
import { siteConfig } from "@/lib/config";
import { pesos } from "@/lib/format";
import {
  armarLineas,
  calcularEnvio,
  getProducto,
  maxCantidad,
  type Entrega,
  type ItemCarrito,
} from "@/lib/products";

export const runtime = "nodejs";

// Límite básico por IP: 8 intentos cada 10 minutos.
// Es en memoria, así que en hosting serverless funciona por instancia (alcanza como freno simple).
const intentos = new Map<string, number[]>();

function superaLimite(ip: string) {
  const ahora = Date.now();
  const ventana = 10 * 60 * 1000;
  const recientes = (intentos.get(ip) ?? []).filter((t) => ahora - t < ventana);
  recientes.push(ahora);
  intentos.set(ip, recientes);
  return recientes.length > 8;
}

function limpiar(valor: unknown, max: number) {
  return typeof valor === "string" ? valor.trim().slice(0, max) : "";
}

function error(mensaje: string, status: number) {
  return NextResponse.json({ ok: false, error: mensaje }, { status });
}

// Aviso por mail al taller. Es opcional y nunca bloquea la compra si falla.
async function avisarPedido(asunto: string, texto: string) {
  const apiKey = process.env.RESEND_API_KEY;
  const destino = process.env.ORDERS_TO_EMAIL;
  if (!apiKey || !destino) return;

  try {
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: process.env.ORDERS_FROM_EMAIL || "Pedidos web <onboarding@resend.dev>",
        to: [destino],
        subject: asunto,
        text: texto,
      }),
    });
  } catch (e) {
    console.error("[checkout] No se pudo enviar el aviso por mail", e);
  }
}

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "local";
  if (superaLimite(ip)) {
    return error("Hiciste varios intentos seguidos. Esperá unos minutos e intentá de nuevo.", 429);
  }

  let body: { items?: unknown; cliente?: Record<string, unknown> };
  try {
    body = await req.json();
  } catch {
    return error("Los datos enviados no son válidos.", 400);
  }

  const c = body.cliente ?? {};

  // Campo trampa: si viene completo, es un bot. Respondemos como si todo estuviera bien.
  if (limpiar(c.empresa, 100) !== "") {
    return NextResponse.json({ ok: true, url: "/pedido/exito" });
  }

  const nombre = limpiar(c.nombre, 80);
  const email = limpiar(c.email, 120);
  const telefono = limpiar(c.telefono, 20);
  const direccion = limpiar(c.direccion, 160);
  const notas = limpiar(c.notas, 400);
  const entrega: Entrega = c.entrega === "domicilio" ? "domicilio" : "retiro";

  if (nombre.length < 2) return error("Ingresá tu nombre y apellido.", 400);
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return error("Ingresá un correo válido.", 400);
  if (!/^[0-9+()\-\s]{6,20}$/.test(telefono)) {
    return error("Ingresá un teléfono válido, con código de área.", 400);
  }
  if (entrega === "domicilio" && direccion.length < 6) {
    return error("Ingresá la dirección de entrega.", 400);
  }

  // Los precios NUNCA se toman del navegador: se recalculan acá con el catálogo del servidor.
  if (!Array.isArray(body.items) || body.items.length === 0 || body.items.length > 20) {
    return error("Tu carrito está vacío o tiene demasiados productos.", 400);
  }

  const items: ItemCarrito[] = [];
  for (const crudo of body.items as Record<string, unknown>[]) {
    const slug = limpiar(crudo?.slug, 60);
    const esmalte = limpiar(crudo?.esmalte, 30);
    const cantidad = Number(crudo?.cantidad);
    const producto = getProducto(slug);

    if (!producto || !producto.esmaltes.includes(esmalte)) {
      return error("Hay un producto en tu carrito que ya no está disponible. Revisá el carrito.", 400);
    }
    if (producto.stock === 0) {
      return error(`"${producto.nombre}" se hace por encargo y no se puede pagar online.`, 400);
    }
    if (!Number.isInteger(cantidad) || cantidad < 1 || cantidad > maxCantidad(producto)) {
      return error(`La cantidad de "${producto.nombre}" no está disponible. Revisá el carrito.`, 400);
    }
    items.push({ slug, esmalte, cantidad });
  }

  const lineas = armarLineas(items);
  if (lineas.length !== items.length) {
    return error("Hay un producto en tu carrito que ya no está disponible. Revisá el carrito.", 400);
  }

  const subtotal = lineas.reduce((suma, l) => suma + l.subtotal, 0);
  const envio = calcularEnvio(subtotal, entrega);
  const total = subtotal + envio;
  const referencia = `AN-${Date.now().toString(36).toUpperCase()}`;

  const resumen = [
    `Pedido ${referencia}`,
    "",
    ...lineas.map(
      (l) => `${l.item.cantidad} x ${l.producto.nombre} (${l.esmalte.nombre}) - ${pesos(l.subtotal)}`,
    ),
    "",
    `Piezas: ${pesos(subtotal)}`,
    `Envío: ${envio === 0 ? "gratis" : pesos(envio)}`,
    `Total: ${pesos(total)}`,
    "",
    `Cliente: ${nombre}`,
    `Correo: ${email}`,
    `Teléfono: ${telefono}`,
    entrega === "domicilio" ? `Entrega a domicilio: ${direccion}` : "Retira en el taller",
    notas ? `Notas: ${notas}` : "",
  ].join("\n");

  const token = process.env.MP_ACCESS_TOKEN;

  // Modo demostración: sin Mercado Pago configurado, se simula en desarrollo y se bloquea en producción.
  if (!token) {
    if (process.env.NODE_ENV !== "production") {
      console.log("[checkout] Mercado Pago no configurado. Pedido simulado:\n" + resumen);
      return NextResponse.json({ ok: true, url: "/pedido/exito?demo=1" });
    }
    console.error("[checkout] Falta MP_ACCESS_TOKEN.");
    return error(
      "El pago online no está disponible en este momento. Hacé tu pedido por WhatsApp.",
      503,
    );
  }

  const base = siteConfig.url.replace(/\/$/, "");
  const esHttps = base.startsWith("https://");

  const itemsMP = lineas.map((l) => ({
    id: `${l.producto.slug}-${l.esmalte.id}`,
    title: `${l.producto.nombre} (${l.esmalte.nombre})`,
    quantity: l.item.cantidad,
    unit_price: l.producto.precio,
    currency_id: "ARS",
  }));
  if (envio > 0) {
    itemsMP.push({
      id: "envio",
      title: `Envío a domicilio en ${siteConfig.envio.zona}`,
      quantity: 1,
      unit_price: envio,
      currency_id: "ARS",
    });
  }

  try {
    const res = await fetch("https://api.mercadopago.com/checkout/preferences", {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        items: itemsMP,
        payer: { name: nombre, email },
        back_urls: {
          success: `${base}/pedido/exito`,
          pending: `${base}/pedido/pendiente`,
          failure: `${base}/pedido/error`,
        },
        // Mercado Pago solo acepta el regreso automático con direcciones https
        ...(esHttps ? { auto_return: "approved" } : {}),
        external_reference: referencia,
        statement_descriptor: siteConfig.descriptor,
        metadata: { referencia, telefono, entrega, direccion, notas },
      }),
    });

    if (!res.ok) {
      console.error("[checkout] Mercado Pago respondió con estado", res.status, await res.text());
      return error("No pudimos iniciar el pago. Intentá de nuevo o hacé el pedido por WhatsApp.", 502);
    }

    const preferencia = await res.json();
    if (typeof preferencia.init_point !== "string") {
      console.error("[checkout] Respuesta de Mercado Pago sin init_point");
      return error("No pudimos iniciar el pago. Intentá de nuevo o hacé el pedido por WhatsApp.", 502);
    }

    await avisarPedido(`Pedido nuevo ${referencia}: esperando pago`, resumen);
    return NextResponse.json({ ok: true, url: preferencia.init_point });
  } catch (e) {
    console.error("[checkout] Error al llamar a Mercado Pago", e);
    return error("No pudimos iniciar el pago. Intentá de nuevo o hacé el pedido por WhatsApp.", 502);
  }
}
