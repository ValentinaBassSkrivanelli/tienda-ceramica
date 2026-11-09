"use client";

import { useState } from "react";
import ProductCard from "./ProductCard";
import { categorias, productos, type CategoriaId } from "@/lib/products";

export default function Catalogo() {
  const [filtro, setFiltro] = useState<CategoriaId | "todo">("todo");
  const visibles = filtro === "todo" ? productos : productos.filter((p) => p.categoria === filtro);

  const opciones: { id: CategoriaId | "todo"; nombre: string }[] = [
    { id: "todo", nombre: "Todo" },
    ...categorias,
  ];

  return (
    <div>
      <div role="group" aria-label="Filtrar por categoría" className="flex flex-wrap gap-2">
        {opciones.map((op) => (
          <button
            key={op.id}
            type="button"
            aria-pressed={filtro === op.id}
            onClick={() => setFiltro(op.id)}
            className={`rounded-full border px-4 py-2 text-sm font-medium ${
              filtro === op.id
                ? "border-hollin bg-hollin text-hueso"
                : "border-hollin/25 hover:border-hollin"
            }`}
          >
            {op.nombre}
          </button>
        ))}
      </div>

      <p className="mt-4 text-sm text-ceniza" aria-live="polite">
        {visibles.length} {visibles.length === 1 ? "pieza" : "piezas"}
      </p>

      <ul className="mt-6 grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-3 lg:grid-cols-4">
        {visibles.map((p) => (
          <li key={p.slug}>
            <ProductCard producto={p} />
          </li>
        ))}
      </ul>
    </div>
  );
}
