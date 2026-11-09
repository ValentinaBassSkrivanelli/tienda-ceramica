import Link from "next/link";
import { siteConfig } from "@/lib/config";
import CartLink from "./CartLink";

export default function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-linea bg-hueso/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-5 py-4 sm:px-8">
        <Link href="/" className="font-display text-2xl leading-none">
          {siteConfig.name}
        </Link>

        <nav aria-label="Principal" className="flex items-center gap-6 text-sm sm:gap-8">
          <Link href="/#coleccion" className="hover:text-cobalto">
            Colección
          </Link>
          <Link href="/#taller" className="hidden hover:text-cobalto sm:inline">
            El taller
          </Link>
          <Link href="/#preguntas" className="hidden hover:text-cobalto sm:inline">
            Preguntas
          </Link>
          <CartLink />
        </nav>
      </div>
    </header>
  );
}
