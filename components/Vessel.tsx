import { useId } from "react";
import type { Tipo } from "@/lib/products";

// Ilustración de cada pieza: la cerámica sin esmaltar (abajo) y el esmalte por inmersión (arriba),
// con el borde irregular que deja el esmalte al secarse. Cuando tengas fotos reales de las piezas,
// reemplazá este componente por una imagen en ProductCard y ProductView.

interface Forma {
  cuerpo: string;
  asa?: string;
  // Altura donde empieza y termina la pieza dentro del dibujo (viewBox de 120 x 140)
  arriba: number;
  abajo: number;
}

const FORMAS: Record<Tipo, Forma> = {
  taza: {
    cuerpo: "M28 40 H88 V100 Q88 128 58 128 Q28 128 28 100 Z",
    asa: "M88 55 Q112 55 108 78 Q104 98 86 96",
    arriba: 40,
    abajo: 128,
  },
  jarra: {
    cuerpo:
      "M40 22 H78 C76 34 90 42 90 70 V104 Q90 128 60 128 Q30 128 30 104 V70 C30 42 44 34 40 22 Z",
    asa: "M90 52 Q116 52 112 80 Q108 100 90 98",
    arriba: 22,
    abajo: 128,
  },
  plato: {
    cuerpo: "M6 78 H114 Q112 104 90 110 H30 Q8 104 6 78 Z",
    arriba: 78,
    abajo: 110,
  },
  cuenco: {
    cuerpo: "M12 56 H108 Q108 124 60 126 Q12 124 12 56 Z",
    arriba: 56,
    abajo: 126,
  },
  maceta: {
    cuerpo: "M22 28 H98 V42 H22 Z M27 42 H93 L81 126 H39 Z",
    arriba: 28,
    abajo: 126,
  },
  florero: {
    cuerpo:
      "M52 14 H68 V34 C68 44 96 56 96 88 C96 112 82 128 60 128 C38 128 24 112 24 88 C24 56 52 44 52 34 Z",
    arriba: 14,
    abajo: 128,
  },
};

const SIN_ESMALTAR = "#CFC6B8";

interface VesselProps {
  tipo: Tipo;
  color: string;
  dip: number;
  className?: string;
  // Si se pasa, la ilustración se anuncia a los lectores de pantalla. Si no, es decorativa.
  label?: string;
}

export default function Vessel({ tipo, color, dip, className, label }: VesselProps) {
  const id = `v${useId().replace(/[^a-zA-Z0-9]/g, "")}`;
  const forma = FORMAS[tipo];
  const y = forma.arriba + (forma.abajo - forma.arriba) * dip;

  // Borde del esmalte: una línea ondulada con gotas, de derecha a izquierda
  const esmalte =
    `M0 0 H120 V${y} ` +
    `C104 ${y + 12}, 94 ${y + 12}, 84 ${y} ` +
    `S64 ${y - 6}, 56 ${y + 5} ` +
    `S40 ${y + 18}, 30 ${y + 3} ` +
    `S10 ${y + 8}, 0 ${y} Z`;

  return (
    <svg
      viewBox="0 0 120 140"
      className={className}
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    >
      <defs>
        <clipPath id={id}>
          <path d={forma.cuerpo} />
        </clipPath>
      </defs>

      <ellipse cx="60" cy="133" rx="42" ry="4.5" fill="#20232A" opacity="0.09" />

      {forma.asa && (
        <path d={forma.asa} fill="none" stroke={color} strokeWidth="7" strokeLinecap="round" />
      )}

      <path d={forma.cuerpo} fill={SIN_ESMALTAR} />
      <g clipPath={`url(#${id})`}>
        <path d={esmalte} fill={color} />
        <ellipse
          cx="40"
          cy={forma.arriba + (y - forma.arriba) / 2}
          rx="4"
          ry={Math.max((y - forma.arriba) / 2 - 4, 2)}
          fill="#ffffff"
          opacity="0.22"
        />
      </g>
      <path d={forma.cuerpo} fill="none" stroke="#20232A" strokeOpacity="0.16" strokeWidth="1" />
    </svg>
  );
}
