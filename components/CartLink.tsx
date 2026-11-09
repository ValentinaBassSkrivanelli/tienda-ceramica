"use client";

import Link from "next/link";
import { useCart } from "./CartProvider";

export default function CartLink() {
  const { cantidadTotal, listo } = useCart();
  const mostrar = listo && cantidadTotal > 0;

  return (
    <Link
      href="/carrito"
      aria-label={mostrar ? `Carrito, ${cantidadTotal} productos` : "Carrito"}
      className="inline-flex items-center gap-2 text-sm font-medium hover:text-cobalto"
    >
      Carrito
      {mostrar && (
        <span className="inline-flex h-6 min-w-6 items-center justify-center rounded-full bg-cobalto px-1.5 text-xs text-white">
          {cantidadTotal}
        </span>
      )}
    </Link>
  );
}
