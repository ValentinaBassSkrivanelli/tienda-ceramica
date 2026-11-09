"use client";

import Link from "next/link";
import { useState } from "react";
import Vessel from "./Vessel";
import Cantidad from "./Cantidad";
import { useCart } from "./CartProvider";
import { pesos } from "@/lib/format";
import { whatsappUrl } from "@/lib/config";
import { esmaltes, maxCantidad, type Producto } from "@/lib/products";

export default function ProductView({ producto }: { producto: Producto }) {
  const { agregar } = useCart();
  const [esmalteId, setEsmalteId] = useState(producto.esmaltes[0]);
  const [cantidad, setCantidad] = useState(1);
  const [agregado, setAgregado] = useState(false);

  const esmalte = esmaltes[esmalteId];
  const max = maxCantidad(producto);
  const sinStock = producto.stock === 0;

  function onAgregar() {
    agregar({ slug: producto.slug, esmalte: esmalteId, cantidad });
    setAgregado(true);
  }

  function elegirEsmalte(id: string) {
    setEsmalteId(id);
    setAgregado(false);
  }

  return (
    <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
      <div className="flex aspect-square items-end justify-center bg-loza p-10 sm:p-16">
        <Vessel
          tipo={producto.tipo}
          color={esmalte.color}
          dip={producto.dip}
          label={`${producto.nombre} con esmalte ${esmalte.nombre.toLowerCase()}`}
          className="w-full max-w-sm"
        />
      </div>

      <div>
        <h1 className="font-display text-4xl leading-tight">{producto.nombre}</h1>
        <p className="mt-3 text-2xl">{pesos(producto.precio)}</p>
        <p className="mt-5 max-w-lg text-lg leading-relaxed text-hollin/80">
          {producto.descripcion}
        </p>

        <fieldset className="mt-8">
          <legend className="text-sm font-medium">
            Esmalte: <span className="font-normal text-ceniza">{esmalte.nombre}</span>
          </legend>
          <div className="mt-3 flex flex-wrap gap-3">
            {producto.esmaltes.map((id) => {
              const e = esmaltes[id];
              const seleccionado = id === esmalteId;
              return (
                <button
                  key={id}
                  type="button"
                  aria-pressed={seleccionado}
                  aria-label={e.nombre}
                  onClick={() => elegirEsmalte(id)}
                  className={`h-11 w-11 rounded-full border-2 p-1 ${
                    seleccionado ? "border-hollin" : "border-transparent hover:border-hollin/40"
                  }`}
                >
                  <span
                    className="block h-full w-full rounded-full border border-hollin/20"
                    style={{ backgroundColor: e.color }}
                  />
                </button>
              );
            })}
          </div>
        </fieldset>

        {sinStock ? (
          <div className="mt-8 max-w-md border border-linea bg-loza p-5">
            <p className="font-medium">Esta pieza se hace por encargo</p>
            <p className="mt-1 text-hollin/75">
              Tarda entre 3 y 4 semanas. Escribinos y te confirmamos el esmalte y la fecha.
            </p>
            <a
              href={whatsappUrl(`Hola, quisiera encargar: ${producto.nombre} en esmalte ${esmalte.nombre.toLowerCase()}.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block bg-cobalto px-6 py-3.5 font-medium text-white hover:bg-cobalto-oscuro"
            >
              Encargar por WhatsApp
            </a>
          </div>
        ) : (
          <div className="mt-8">
            <div className="flex flex-wrap items-center gap-4">
              <Cantidad
                valor={cantidad}
                max={max}
                nombre={producto.nombre}
                onChange={(v) => {
                  setCantidad(v);
                  setAgregado(false);
                }}
              />
              <button
                type="button"
                onClick={onAgregar}
                className="bg-cobalto px-7 py-3.5 font-medium text-white hover:bg-cobalto-oscuro"
              >
                Agregar al carrito
              </button>
            </div>
            {producto.stock <= 3 && (
              <p className="mt-3 text-sm text-ceniza">
                Quedan {producto.stock} {producto.stock === 1 ? "unidad" : "unidades"}.
              </p>
            )}
          </div>
        )}

        <p role="status" className="mt-4 min-h-6 text-sm">
          {agregado && (
            <>
              Agregaste {cantidad} al carrito.{" "}
              <Link href="/carrito" className="font-medium text-cobalto underline underline-offset-4">
                Ver carrito
              </Link>
            </>
          )}
        </p>

        <dl className="mt-8 grid max-w-lg gap-4 border-t border-hollin pt-5 text-sm">
          <div className="grid gap-1 sm:grid-cols-[7rem_1fr]">
            <dt className="text-ceniza">Medidas</dt>
            <dd>{producto.medidas}</dd>
          </div>
          <div className="grid gap-1 sm:grid-cols-[7rem_1fr]">
            <dt className="text-ceniza">Cuidado</dt>
            <dd>{producto.cuidado}</dd>
          </div>
          <div className="grid gap-1 sm:grid-cols-[7rem_1fr]">
            <dt className="text-ceniza">Hecho a mano</dt>
            <dd>El color y la línea del esmalte varían un poco en cada pieza.</dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
