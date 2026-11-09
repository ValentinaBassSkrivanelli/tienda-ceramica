"use client";

interface CantidadProps {
  valor: number;
  max: number;
  onChange: (valor: number) => void;
  // Nombre de la pieza, para que los lectores de pantalla sepan qué botón es
  nombre: string;
}

export default function Cantidad({ valor, max, onChange, nombre }: CantidadProps) {
  const boton =
    "flex h-11 w-11 items-center justify-center text-xl hover:bg-loza disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent";

  return (
    <div className="inline-flex items-center border border-hollin/30" role="group" aria-label={`Cantidad de ${nombre}`}>
      <button
        type="button"
        aria-label="Restar una unidad"
        disabled={valor <= 1}
        onClick={() => onChange(valor - 1)}
        className={boton}
      >
        −
      </button>
      <span className="w-10 text-center tabular-nums" aria-live="polite">
        {valor}
      </span>
      <button
        type="button"
        aria-label="Sumar una unidad"
        disabled={valor >= max}
        onClick={() => onChange(valor + 1)}
        className={boton}
      >
        +
      </button>
    </div>
  );
}
