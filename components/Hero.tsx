import Link from "next/link";
import Vessel from "./Vessel";
import { siteConfig } from "@/lib/config";
import { pesos } from "@/lib/format";

export default function Hero() {
  return (
    <section className="pb-16 pt-12 lg:pb-24 lg:pt-20">
      <div className="mx-auto grid max-w-6xl items-end gap-12 px-5 sm:px-8 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
        <div className="pb-2">
          <h1 className="font-display text-4xl leading-[1.08] sm:text-5xl lg:text-[3.5rem]">
            Cerámica hecha a mano en {siteConfig.city}, para usar todos los días.
          </h1>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-hollin/80">
            Tazas, platos, jarras y macetas que se modelan, se esmaltan y se queman en nuestro
            taller. Cada pieza sale un poco distinta de la anterior.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/#coleccion"
              className="bg-cobalto px-6 py-3.5 font-medium text-white hover:bg-cobalto-oscuro"
            >
              Ver la colección
            </Link>
            <Link
              href="/#taller"
              className="border border-hollin/30 px-6 py-3.5 font-medium hover:border-hollin"
            >
              Cómo las hacemos
            </Link>
          </div>
        </div>

        {/* Las piezas sobre la repisa del horno */}
        <div aria-hidden="true" className="bg-loza px-4 pt-14 sm:px-8">
          <div className="flex items-end justify-center gap-1 sm:gap-3">
            <Vessel tipo="taza" color="#25459B" dip={0.5} className="w-[22%]" />
            <Vessel tipo="jarra" color="#9DB8A8" dip={0.45} className="w-[28%]" />
            <Vessel tipo="cuenco" color="#C99A2E" dip={0.55} className="w-[30%]" />
            <Vessel tipo="florero" color="#2F5D4A" dip={0.6} className="w-[22%]" />
          </div>
          <div className="-mx-4 h-3 bg-hollin sm:-mx-8" />
        </div>
      </div>

      <div className="mx-auto mt-14 grid max-w-6xl gap-6 border-y border-linea px-5 py-6 text-sm sm:px-8 md:grid-cols-3">
        <p>
          <span className="font-medium">Hecho a mano en Salta.</span>{" "}
          <span className="text-ceniza">Cada pieza pasa por dos quemas.</span>
        </p>
        <p>
          <span className="font-medium">Envío a domicilio en {siteConfig.envio.zona}.</span>{" "}
          <span className="text-ceniza">
            Gratis desde {pesos(siteConfig.envio.gratisDesde)}.
          </span>
        </p>
        <p>
          <span className="font-medium">Pagás con Mercado Pago.</span>{" "}
          <span className="text-ceniza">Tarjeta, transferencia o dinero en cuenta.</span>
        </p>
      </div>
    </section>
  );
}
