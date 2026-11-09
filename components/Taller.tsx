const etapas = [
  {
    titulo: "Modelado",
    texto: "Cada pieza se levanta en el torno o se arma a mano con placas de arcilla.",
    tiempo: "Un día",
  },
  {
    titulo: "Secado",
    texto: "La arcilla se seca despacio y a la sombra para que no se agriete.",
    tiempo: "5 a 7 días",
  },
  {
    titulo: "Primera quema",
    texto: "La pieza se quema por primera vez y queda lista para recibir el esmalte.",
    tiempo: "A 980 °C",
  },
  {
    titulo: "Esmaltado",
    texto:
      "Se sumerge en el esmalte a mano. Por eso el borde de color nunca es igual en dos piezas.",
    tiempo: "Un día",
  },
  {
    titulo: "Segunda quema",
    texto: "El esmalte se funde y se vuelve vidrio. La pieza sale lista para usar.",
    tiempo: "A 1.240 °C",
  },
];

export default function Taller() {
  return (
    <section id="taller" className="border-t border-linea py-20 lg:py-28">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div>
          <h2 className="font-display text-3xl leading-tight sm:text-4xl">
            Del barro a tu mesa en tres semanas
          </h2>
          <p className="mt-5 max-w-md text-lg leading-relaxed text-hollin/80">
            El esmalte se aplica por inmersión: la pieza se sumerge hasta la mitad y queda la
            línea que ves en cada foto. Es la marca de que la hizo una persona.
          </p>
        </div>

        <ol className="border-t border-hollin">
          {etapas.map((etapa, i) => (
            <li
              key={etapa.titulo}
              className="grid gap-1 border-b border-linea py-5 sm:grid-cols-[2rem_1fr_8rem] sm:gap-6"
            >
              <span className="font-display text-xl text-cobalto">{i + 1}</span>
              <div>
                <h3 className="font-display text-xl">{etapa.titulo}</h3>
                <p className="mt-1 text-hollin/75">{etapa.texto}</p>
              </div>
              <p className="text-sm text-ceniza sm:pt-1.5 sm:text-right">{etapa.tiempo}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
