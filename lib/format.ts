const formato = new Intl.NumberFormat("es-AR", {
  style: "currency",
  currency: "ARS",
  maximumFractionDigits: 0,
});

export function pesos(valor: number) {
  return formato.format(valor);
}
