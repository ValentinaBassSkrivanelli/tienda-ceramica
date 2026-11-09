import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ClearCart from "@/components/ClearCart";
import { siteConfig, whatsappUrl } from "@/lib/config";

export const metadata: Metadata = {
  title: "Estado del pedido",
  robots: { index: false },
};

interface Props {
  params: Promise<{ estado: string }>;
  searchParams: Promise<{ demo?: string }>;
}

const estados = {
  exito: {
    titulo: "Recibimos tu pago",
    texto:
      "Gracias por tu compra. Te escribimos por mail y por WhatsApp para coordinar la entrega o el retiro de tu pedido.",
    vaciar: true,
  },
  pendiente: {
    titulo: "Tu pago está pendiente",
    texto:
      "Mercado Pago todavía no confirmó el pago. Cuando se acredite, te avisamos y preparamos tu pedido.",
    vaciar: true,
  },
  error: {
    titulo: "No se pudo completar el pago",
    texto:
      "No se hizo ningún cobro. Tu carrito sigue como lo dejaste, así que podés intentar de nuevo con otro medio de pago.",
    vaciar: false,
  },
} as const;

export default async function PedidoPage({ params, searchParams }: Props) {
  const { estado } = await params;
  const { demo } = await searchParams;

  if (!(estado in estados)) notFound();
  const info = estados[estado as keyof typeof estados];

  return (
    <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
      {info.vaciar && <ClearCart />}

      <div role="status" className="max-w-xl">
        <h1 className="font-display text-4xl leading-tight">{info.titulo}</h1>
        <p className="mt-5 text-lg leading-relaxed text-hollin/80">{info.texto}</p>

        {demo && siteConfig.demo && (
          <p className="mt-6 border-l-2 border-cobalto bg-cobalto/5 px-4 py-3 text-sm">
            Modo demostración: no se hizo ningún cobro porque Mercado Pago no está configurado.
          </p>
        )}

        <div className="mt-8 flex flex-wrap gap-3">
          {estado === "error" ? (
            <Link
              href="/checkout"
              className="bg-cobalto px-6 py-3.5 font-medium text-white hover:bg-cobalto-oscuro"
            >
              Volver a intentar
            </Link>
          ) : (
            <Link
              href="/#coleccion"
              className="bg-cobalto px-6 py-3.5 font-medium text-white hover:bg-cobalto-oscuro"
            >
              Seguir mirando la colección
            </Link>
          )}
          <a
            href={whatsappUrl("Hola, tengo una consulta sobre mi pedido.")}
            target="_blank"
            rel="noopener noreferrer"
            className="border border-hollin/30 px-6 py-3.5 font-medium hover:border-hollin"
          >
            Consultar por WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
