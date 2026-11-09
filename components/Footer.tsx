import Link from "next/link";
import { siteConfig, whatsappUrl } from "@/lib/config";

export default function Footer() {
  return (
    <footer className="on-dark bg-hollin text-hueso">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:px-8 md:grid-cols-[1.2fr_1fr_1fr]">
        <div>
          <p className="font-display text-2xl">{siteConfig.name}</p>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-hueso/70">
            Cerámica esmaltada hecha a mano en {siteConfig.city}.
          </p>
        </div>

        <div className="text-sm">
          <p className="font-medium">Retiro en el taller</p>
          <p className="mt-2 text-hueso/70">{siteConfig.taller}</p>
          <p className="text-hueso/70">{siteConfig.retiroHorarios}</p>
        </div>

        <div className="text-sm">
          <p className="font-medium">Consultas</p>
          <p className="mt-2">
            <a
              href={whatsappUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4"
            >
              WhatsApp {siteConfig.phoneDisplay}
            </a>
          </p>
          <p className="mt-1">
            <a href={`mailto:${siteConfig.email}`} className="text-hueso/70">
              {siteConfig.email}
            </a>
          </p>
          <p className="mt-4">
            <Link href="/carrito" className="text-hueso/70 underline underline-offset-4">
              Ver mi carrito
            </Link>
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-5 pb-10 sm:px-8">
        {siteConfig.demo && (
          <p className="max-w-2xl text-xs leading-relaxed text-hueso/60">
            Proyecto de demostración: el taller, los productos, los precios y los datos de contacto
            son ficticios. Las piezas se muestran como ilustraciones.
          </p>
        )}
        <p className="mt-4 text-xs text-hueso/50">
          © {new Date().getFullYear()} {siteConfig.name}
        </p>
      </div>
    </footer>
  );
}
