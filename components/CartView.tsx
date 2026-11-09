"use client";

import Link from "next/link";
import Vessel from "./Vessel";
import Cantidad from "./Cantidad";
import { useCart } from "./CartProvider";
import { pesos } from "@/lib/format";
import { siteConfig, whatsappUrl } from "@/lib/config";
import { armarLineas, maxCantidad } from "@/lib/products";

export default function CartView() {
  const { items, listo, cambiar, quitar } = useCart();

  if (!listo) {
    return <p className="text-ceniza">Cargando tu carrito.</p>;
  }

  const lineas = armarLineas(items);

  if (lineas.length === 0) {
    return (
      <div className="max-w-md">
        <h2 className="font-display text-2xl">Tu carrito está vacío</h2>
        <p className="mt-3 text-hollin/75">
          Elegí una pieza de la colección y elegí el esmalte que más te guste.
        </p>
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
  const faltaParaEnvioGratis = siteConfig.envio.gratisDesde - subtotal;

  const mensajeWhatsApp =
    "Hola, quisiera hacer este pedido:\n" +
    lineas
      .map((l) => `- ${l.item.cantidad} x ${l.producto.nombre} (${l.esmalte.nombre})`)
      .join("\n") +
    `\nTotal de las piezas: ${pesos(subtotal)}`;

  return (
    <div className="grid gap-12 lg:grid-cols-[1.6fr_1fr] lg:gap-16">
      <ul className="border-t border-hollin">
        {lineas.map(({ item, producto, esmalte, subtotal: sub }) => (
          <li
            key={`${item.slug}-${item.esmalte}`}
            className="grid grid-cols-[6rem_1fr] gap-5 border-b border-linea py-6 sm:grid-cols-[7rem_1fr_auto]"
          >
            <Link
              href={`/producto/${producto.slug}`}
              className="flex aspect-square items-end justify-center bg-loza p-3"
              tabIndex={-1}
              aria-hidden="true"
            >
              <Vessel tipo={producto.tipo} color={esmalte.color} dip={producto.dip} className="w-full" />
            </Link>

            <div>
              <Link
                href={`/producto/${producto.slug}`}
                className="font-display text-lg hover:underline hover:underline-offset-4"
              >
                {producto.nombre}
              </Link>
              <p className="mt-1 text-sm text-ceniza">
                Esmalte {esmalte.nombre.toLowerCase()} · {pesos(producto.precio)} c/u
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-4">
                <Cantidad
                  valor={item.cantidad}
                  max={maxCantidad(producto)}
                  nombre={producto.nombre}
                  onChange={(v) => cambiar(item.slug, item.esmalte, v)}
                />
                <button
                  type="button"
                  onClick={() => quitar(item.slug, item.esmalte)}
                  className="text-sm text-ceniza underline underline-offset-4 hover:text-hollin"
                >
                  Quitar
                </button>
              </div>
            </div>

            <p className="col-start-2 text-lg sm:col-start-auto sm:text-right">{pesos(sub)}</p>
          </li>
        ))}
      </ul>

      <aside className="h-fit border border-linea bg-white/60 p-6" aria-label="Resumen del pedido">
        <h2 className="font-display text-2xl">Resumen</h2>
        <dl className="mt-5 grid gap-3">
          <div className="flex justify-between">
            <dt>Piezas</dt>
            <dd>{pesos(subtotal)}</dd>
          </div>
          <div className="flex justify-between text-ceniza">
            <dt>Envío</dt>
            <dd>Se calcula en el próximo paso</dd>
          </div>
        </dl>

        {faltaParaEnvioGratis > 0 ? (
          <p className="mt-4 text-sm text-ceniza">
            Sumá {pesos(faltaParaEnvioGratis)} más y el envío a domicilio en {siteConfig.envio.zona}{" "}
            es gratis.
          </p>
        ) : (
          <p className="mt-4 text-sm text-ceniza">
            Tu pedido tiene envío gratis a domicilio en {siteConfig.envio.zona}.
          </p>
        )}

        <Link
          href="/checkout"
          className="mt-6 block bg-cobalto px-6 py-3.5 text-center font-medium text-white hover:bg-cobalto-oscuro"
        >
          Continuar con el pago
        </Link>
        <a
          href={whatsappUrl(mensajeWhatsApp)}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 block border border-hollin/30 px-6 py-3.5 text-center font-medium hover:border-hollin"
        >
          Hacer el pedido por WhatsApp
        </a>
      </aside>
    </div>
  );
}
