"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { useCart } from "./CartProvider";
import { pesos } from "@/lib/format";
import { siteConfig } from "@/lib/config";
import { armarLineas, calcularEnvio, type Entrega } from "@/lib/products";

const campo =
  "w-full border border-linea bg-white px-3 py-3 text-base placeholder:text-ceniza/70 focus:border-cobalto";

export default function CheckoutForm() {
  const { items, listo } = useCart();
  const [entrega, setEntrega] = useState<Entrega>("retiro");
  const [enviando, setEnviando] = useState(false);
  const [error, setError] = useState("");

  if (!listo) return <p className="text-ceniza">Cargando tu pedido.</p>;

  const lineas = armarLineas(items);

  if (lineas.length === 0) {
    return (
      <div className="max-w-md">
        <h2 className="font-display text-2xl">No hay piezas en tu carrito</h2>
        <Link
          href="/#coleccion"
          className="mt-6 inline-block bg-cobalto px-6 py-3.5 font-medium text-white hover:bg-cobalto-oscuro"
        >
          Ver la colección
        </Link>
      </div>
    );
  }

  const subtotal = lineas.reduce((suma, l) => suma + l.subtotal, 0);
  const envio = calcularEnvio(subtotal, entrega);
  const total = subtotal + envio;

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const datos = Object.fromEntries(new FormData(e.currentTarget));

    setEnviando(true);
    setError("");

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map(({ slug, esmalte, cantidad }) => ({ slug, esmalte, cantidad })),
          cliente: { ...datos, entrega },
        }),
      });
      const json = await res.json().catch(() => ({}));

      if (!res.ok || !json.ok || typeof json.url !== "string") {
        setError(
          json.error ??
            "No pudimos iniciar el pago. Revisá los datos e intentá de nuevo, o hacé el pedido por WhatsApp.",
        );
        setEnviando(false);
        return;
      }

      // Mercado Pago (o la página de resultado en modo demostración)
      window.location.assign(json.url);
    } catch {
      setError("No pudimos conectar con el servidor. Intentá de nuevo en unos minutos.");
      setEnviando(false);
    }
  }

  return (
    <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
      <form onSubmit={onSubmit} className="grid gap-6">
        <fieldset className="grid gap-5">
          <legend className="mb-1 font-display text-2xl">Tus datos</legend>
          <div>
            <label htmlFor="nombre" className="mb-1.5 block text-sm font-medium">
              Nombre y apellido
            </label>
            <input id="nombre" name="nombre" type="text" required minLength={2} maxLength={80} autoComplete="name" className={campo} />
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="email" className="mb-1.5 block text-sm font-medium">
                Correo electrónico
              </label>
              <input id="email" name="email" type="email" required maxLength={120} autoComplete="email" className={campo} />
            </div>
            <div>
              <label htmlFor="telefono" className="mb-1.5 block text-sm font-medium">
                Teléfono o WhatsApp
              </label>
              <input
                id="telefono"
                name="telefono"
                type="tel"
                required
                maxLength={20}
                autoComplete="tel"
                placeholder="Con código de área"
                className={campo}
              />
            </div>
          </div>
        </fieldset>

        <fieldset className="grid gap-3">
          <legend className="mb-1 font-display text-2xl">Cómo lo recibís</legend>

          <label className={`flex cursor-pointer gap-3 border p-4 ${entrega === "retiro" ? "border-hollin" : "border-linea"}`}>
            <input
              type="radio"
              name="entrega-opcion"
              checked={entrega === "retiro"}
              onChange={() => setEntrega("retiro")}
              className="mt-1 accent-cobalto"
            />
            <span>
              <span className="block font-medium">Retiro en el taller, gratis</span>
              <span className="block text-sm text-ceniza">
                {siteConfig.taller}. {siteConfig.retiroHorarios}.
              </span>
            </span>
          </label>

          <label className={`flex cursor-pointer gap-3 border p-4 ${entrega === "domicilio" ? "border-hollin" : "border-linea"}`}>
            <input
              type="radio"
              name="entrega-opcion"
              checked={entrega === "domicilio"}
              onChange={() => setEntrega("domicilio")}
              className="mt-1 accent-cobalto"
            />
            <span>
              <span className="block font-medium">
                Envío a domicilio en {siteConfig.envio.zona},{" "}
                {calcularEnvio(subtotal, "domicilio") === 0
                  ? "gratis"
                  : pesos(calcularEnvio(subtotal, "domicilio"))}
              </span>
              <span className="block text-sm text-ceniza">
                Gratis desde {pesos(siteConfig.envio.gratisDesde)}.
              </span>
            </span>
          </label>

          {entrega === "domicilio" && (
            <div className="mt-2">
              <label htmlFor="direccion" className="mb-1.5 block text-sm font-medium">
                Dirección de entrega
              </label>
              <input
                id="direccion"
                name="direccion"
                type="text"
                required
                maxLength={160}
                autoComplete="street-address"
                placeholder="Calle, número, barrio y piso o depto"
                className={campo}
              />
            </div>
          )}
        </fieldset>

        <div>
          <label htmlFor="notas" className="mb-1.5 block text-sm font-medium">
            ¿Querés aclarar algo? (opcional)
          </label>
          <textarea id="notas" name="notas" rows={3} maxLength={400} className={campo} />
        </div>

        {/* Campo trampa para bots: las personas no lo ven ni lo completan. */}
        <div aria-hidden="true" className="absolute -left-[9999px]">
          <label htmlFor="empresa">Empresa</label>
          <input id="empresa" name="empresa" type="text" tabIndex={-1} autoComplete="off" />
        </div>

        {error && (
          <p role="alert" className="border-l-2 border-cobalto bg-cobalto/5 px-4 py-3 text-sm">
            {error}
          </p>
        )}

        <div>
          <button
            type="submit"
            disabled={enviando}
            className="bg-cobalto px-8 py-4 font-medium text-white hover:bg-cobalto-oscuro disabled:opacity-60"
          >
            {enviando ? "Preparando el pago" : `Pagar ${pesos(total)} con Mercado Pago`}
          </button>
          <p className="mt-3 max-w-md text-xs text-ceniza">
            Vas a pasar a Mercado Pago para completar el pago. Usamos tus datos solo para
            preparar y entregar tu pedido.
          </p>
        </div>
      </form>

      <aside className="h-fit border border-linea bg-white/60 p-6" aria-label="Resumen del pedido">
        <h2 className="font-display text-2xl">Tu pedido</h2>
        <ul className="mt-5 grid gap-3 text-sm">
          {lineas.map((l) => (
            <li key={`${l.item.slug}-${l.item.esmalte}`} className="flex justify-between gap-4">
              <span>
                {l.item.cantidad} × {l.producto.nombre}
                <span className="block text-ceniza">Esmalte {l.esmalte.nombre.toLowerCase()}</span>
              </span>
              <span>{pesos(l.subtotal)}</span>
            </li>
          ))}
        </ul>
        <dl className="mt-5 grid gap-2 border-t border-linea pt-4">
          <div className="flex justify-between">
            <dt>Piezas</dt>
            <dd>{pesos(subtotal)}</dd>
          </div>
          <div className="flex justify-between">
            <dt>Envío</dt>
            <dd>{envio === 0 ? "Gratis" : pesos(envio)}</dd>
          </div>
          <div className="flex justify-between border-t border-hollin pt-3 font-medium">
            <dt>Total</dt>
            <dd>{pesos(total)}</dd>
          </div>
        </dl>
        <Link href="/carrito" className="mt-5 inline-block text-sm text-ceniza underline underline-offset-4">
          Modificar el carrito
        </Link>
      </aside>
    </div>
  );
}
