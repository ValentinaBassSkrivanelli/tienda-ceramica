import Link from "next/link";
import Vessel from "./Vessel";
import { pesos } from "@/lib/format";
import { esmaltes, type Producto } from "@/lib/products";

export default function ProductCard({ producto }: { producto: Producto }) {
  const principal = esmaltes[producto.esmaltes[0]];
  const sinStock = producto.stock === 0;

  return (
    <Link href={`/producto/${producto.slug}`} className="group block">
      <div className="relative flex aspect-[4/5] items-end justify-center bg-loza p-6">
        <Vessel
          tipo={producto.tipo}
          color={principal.color}
          dip={producto.dip}
          className="w-full max-w-[11rem]"
        />
        {sinStock && (
          <span className="absolute left-3 top-3 bg-hollin px-2.5 py-1 text-xs text-hueso">
            Por encargo
          </span>
        )}
      </div>

      <h3 className="mt-3 font-display text-lg leading-snug group-hover:underline group-hover:underline-offset-4">
        {producto.nombre}
      </h3>
      <p className="text-ceniza">{pesos(producto.precio)}</p>

      <p className="mt-2 flex items-center gap-1.5">
        <span className="sr-only">
          Esmaltes disponibles: {producto.esmaltes.map((e) => esmaltes[e].nombre).join(", ")}
        </span>
        {producto.esmaltes.map((e) => (
          <span
            key={e}
            aria-hidden="true"
            className="h-3.5 w-3.5 rounded-full border border-hollin/20"
            style={{ backgroundColor: esmaltes[e].color }}
          />
        ))}
      </p>
    </Link>
  );
}
