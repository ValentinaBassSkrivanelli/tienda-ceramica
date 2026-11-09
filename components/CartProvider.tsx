"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { esmaltes, getProducto, maxCantidad, type ItemCarrito } from "@/lib/products";

const CLAVE = "arcilla-norte-carrito";

interface CarritoCtx {
  items: ItemCarrito[];
  // false hasta que se leyó el carrito guardado en el navegador
  listo: boolean;
  cantidadTotal: number;
  agregar: (item: ItemCarrito) => void;
  cambiar: (slug: string, esmalte: string, cantidad: number) => void;
  quitar: (slug: string, esmalte: string) => void;
  vaciar: () => void;
}

const Contexto = createContext<CarritoCtx | null>(null);

function limpiar(crudo: unknown): ItemCarrito[] {
  if (!Array.isArray(crudo)) return [];
  const resultado: ItemCarrito[] = [];
  for (const x of crudo) {
    if (!x || typeof x.slug !== "string" || typeof x.esmalte !== "string") continue;
    const producto = getProducto(x.slug);
    if (!producto || !esmaltes[x.esmalte] || !producto.esmaltes.includes(x.esmalte)) continue;
    const max = maxCantidad(producto);
    const cantidad = Math.min(Math.floor(Number(x.cantidad)), max);
    if (!Number.isFinite(cantidad) || cantidad < 1) continue;
    resultado.push({ slug: x.slug, esmalte: x.esmalte, cantidad });
  }
  return resultado;
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<ItemCarrito[]>([]);
  const [listo, setListo] = useState(false);

  useEffect(() => {
    try {
      const guardado = localStorage.getItem(CLAVE);
      if (guardado) setItems(limpiar(JSON.parse(guardado)));
    } catch {
      // Si el navegador bloquea el almacenamiento, el carrito funciona igual mientras la página esté abierta.
    }
    setListo(true);
  }, []);

  useEffect(() => {
    if (!listo) return;
    try {
      localStorage.setItem(CLAVE, JSON.stringify(items));
    } catch {
      // Ídem: no pasa nada si no se puede guardar.
    }
  }, [items, listo]);

  const agregar = useCallback((nuevo: ItemCarrito) => {
    const producto = getProducto(nuevo.slug);
    if (!producto) return;
    const max = maxCantidad(producto);
    setItems((actual) => {
      const existente = actual.find(
        (i) => i.slug === nuevo.slug && i.esmalte === nuevo.esmalte,
      );
      if (existente) {
        return actual.map((i) =>
          i === existente ? { ...i, cantidad: Math.min(i.cantidad + nuevo.cantidad, max) } : i,
        );
      }
      return [...actual, { ...nuevo, cantidad: Math.min(nuevo.cantidad, max) }];
    });
  }, []);

  const cambiar = useCallback((slug: string, esmalte: string, cantidad: number) => {
    const producto = getProducto(slug);
    if (!producto) return;
    const max = maxCantidad(producto);
    setItems((actual) =>
      actual.map((i) =>
        i.slug === slug && i.esmalte === esmalte
          ? { ...i, cantidad: Math.max(1, Math.min(cantidad, max)) }
          : i,
      ),
    );
  }, []);

  const quitar = useCallback((slug: string, esmalte: string) => {
    setItems((actual) => actual.filter((i) => !(i.slug === slug && i.esmalte === esmalte)));
  }, []);

  const vaciar = useCallback(() => setItems([]), []);

  const valor = useMemo<CarritoCtx>(
    () => ({
      items,
      listo,
      cantidadTotal: items.reduce((suma, i) => suma + i.cantidad, 0),
      agregar,
      cambiar,
      quitar,
      vaciar,
    }),
    [items, listo, agregar, cambiar, quitar, vaciar],
  );

  return <Contexto.Provider value={valor}>{children}</Contexto.Provider>;
}

export function useCart() {
  const ctx = useContext(Contexto);
  if (!ctx) throw new Error("useCart debe usarse dentro de CartProvider");
  return ctx;
}
