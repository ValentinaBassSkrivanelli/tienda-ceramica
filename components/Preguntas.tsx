import { siteConfig, whatsappUrl } from "@/lib/config";
import { pesos } from "@/lib/format";

const preguntas = [
  {
    pregunta: "¿Cómo hago mi compra?",
    respuesta:
      "Elegís las piezas y el esmalte, las sumás al carrito y completás tus datos. Pagás con Mercado Pago con tarjeta, transferencia o dinero en cuenta. Cuando el pago se aprueba, te avisamos por mail y por WhatsApp.",
  },
  {
    pregunta: "¿Cómo recibo mi pedido?",
    respuesta: `Podés retirarlo gratis en el taller (${siteConfig.retiroHorarios.toLowerCase()}) o pedir envío a domicilio en ${siteConfig.envio.zona} por ${pesos(siteConfig.envio.domicilio)}. El envío es gratis desde ${pesos(siteConfig.envio.gratisDesde)}. Para otras ciudades, escribinos y lo coordinamos.`,
  },
  {
    pregunta: "¿Cuánto tarda en llegar?",
    respuesta:
      "Las piezas en stock se entregan o están listas para retirar dentro de los 3 días hábiles de aprobado el pago. Las piezas por encargo tardan entre 3 y 4 semanas, porque hay que secarlas y quemarlas.",
  },
  {
    pregunta: "¿Qué pasa si llega rota?",
    respuesta:
      "Embalamos cada pieza con papel y cartón, pero si algo llega dañado, mandanos una foto por WhatsApp dentro de las 48 horas y la reponemos sin costo.",
  },
  {
    pregunta: "¿El esmalte es igual al de las ilustraciones?",
    respuesta:
      "Muy parecido, pero no idéntico. Como el esmalte se aplica a mano y se funde en el horno, el tono y la línea cambian un poco en cada pieza. Es parte de lo hecho a mano.",
  },
  {
    pregunta: "¿Hacen sets o pedidos a medida?",
    respuesta: "Sí, desde 6 piezas iguales. Escribinos con lo que necesitás y te pasamos presupuesto y fecha.",
  },
];

export default function Preguntas() {
  return (
    <section id="preguntas" className="border-t border-linea py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <h2 className="font-display text-3xl leading-tight sm:text-4xl">Preguntas frecuentes</h2>

        <div className="mt-10 max-w-3xl border-t border-hollin">
          {preguntas.map((p) => (
            <details key={p.pregunta} className="group border-b border-linea">
              <summary className="flex cursor-pointer items-center justify-between gap-6 py-5 font-display text-xl">
                {p.pregunta}
                <span aria-hidden="true" className="relative h-4 w-4 shrink-0">
                  <span className="absolute inset-x-0 top-1/2 h-px bg-hollin" />
                  <span className="absolute inset-y-0 left-1/2 w-px bg-hollin transition-transform group-open:scale-y-0" />
                </span>
              </summary>
              <p className="max-w-2xl pb-6 leading-relaxed text-hollin/80">{p.respuesta}</p>
            </details>
          ))}
        </div>

        <p className="mt-8 text-hollin/80">
          ¿Otra duda?{" "}
          <a
            href={whatsappUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-cobalto underline underline-offset-4"
          >
            Escribinos por WhatsApp
          </a>
          .
        </p>
      </div>
    </section>
  );
}
