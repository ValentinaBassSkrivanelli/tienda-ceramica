import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ProductView from "@/components/ProductView";
import ProductCard from "@/components/ProductCard";
import { categorias, getProducto, productos } from "@/lib/products";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return productos.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const producto = getProducto(slug);
  if (!producto) return {};
  return {
    title: producto.nombre,
    description: producto.descripcion,
  };
}

export default async function ProductoPage({ params }: Props) {
  const { slug } = await params;
  const producto = getProducto(slug);
  if (!producto) notFound();

  const categoria = categorias.find((c) => c.id === producto.categoria);
  const relacionados = productos
    .filter((p) => p.categoria === producto.categoria && p.slug !== producto.slug)
    .slice(0, 4);

  return (
    <div className="mx-auto max-w-6xl px-5 pb-24 pt-8 sm:px-8 lg:pt-12">
      <nav aria-label="Ruta" className="mb-8 text-sm text-ceniza">
        <Link href="/#coleccion" className="underline underline-offset-4 hover:text-hollin">
          Colección
        </Link>{" "}
        / {categoria?.nombre} / <span className="text-hollin">{producto.nombre}</span>
      </nav>

      <ProductView producto={producto} />

      {relacionados.length > 0 && (
        <section className="mt-24 border-t border-linea pt-12" aria-labelledby="relacionados">
          <h2 id="relacionados" className="font-display text-2xl">
            Más de {categoria?.nombre.toLowerCase()}
          </h2>
          <ul className="mt-8 grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-4">
            {relacionados.map((p) => (
              <li key={p.slug}>
                <ProductCard producto={p} />
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
