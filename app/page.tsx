import Hero from "@/components/Hero";
import Catalogo from "@/components/Catalogo";
import Taller from "@/components/Taller";
import Preguntas from "@/components/Preguntas";

export default function Home() {
  return (
    <>
      <Hero />

      <section id="coleccion" className="border-t border-linea py-20 lg:py-28">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <h2 className="font-display text-3xl leading-tight sm:text-4xl">La colección</h2>
          <p className="mb-10 mt-3 max-w-xl text-hollin/75">
            Elegí una pieza para ver los esmaltes disponibles. Los puntos de color debajo de cada
            una son los esmaltes en los que la hacemos.
          </p>
          <Catalogo />
        </div>
      </section>

      <Taller />
      <Preguntas />
    </>
  );
}
