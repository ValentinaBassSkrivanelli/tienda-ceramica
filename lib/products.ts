// Catálogo de la tienda. Los precios, medidas y textos son de ejemplo.
// Para sumar un producto, agregá un objeto a `productos`. No hace falta tocar nada más.

import { siteConfig } from "./config";

export type Tipo = "taza" | "jarra" | "plato" | "cuenco" | "maceta" | "florero";
export type CategoriaId = "tazas" | "mesa" | "plantas" | "deco";
export type Entrega = "retiro" | "domicilio";

export interface Esmalte {
  id: string;
  nombre: string;
  color: string;
}

export interface Producto {
  slug: string;
  nombre: string;
  categoria: CategoriaId;
  // Forma de la ilustración. Cuando tengas fotos reales, se reemplaza en components/Vessel.tsx
  tipo: Tipo;
  precio: number;
  descripcion: string;
  medidas: string;
  cuidado: string;
  esmaltes: string[];
  stock: number;
  // Hasta dónde llega el esmalte en la ilustración, de 0 (solo el borde) a 1 (toda la pieza)
  dip: number;
}

export interface ItemCarrito {
  slug: string;
  esmalte: string;
  cantidad: number;
}

export interface Linea {
  item: ItemCarrito;
  producto: Producto;
  esmalte: Esmalte;
  subtotal: number;
}

export const MAX_POR_LINEA = 10;

export const categorias: { id: CategoriaId; nombre: string }[] = [
  { id: "tazas", nombre: "Tazas" },
  { id: "mesa", nombre: "Mesa" },
  { id: "plantas", nombre: "Plantas" },
  { id: "deco", nombre: "Decoración" },
];

export const esmaltes: Record<string, Esmalte> = {
  cobalto: { id: "cobalto", nombre: "Cobalto", color: "#25459B" },
  celadon: { id: "celadon", nombre: "Celadón", color: "#9DB8A8" },
  hueso: { id: "hueso", nombre: "Hueso", color: "#ECEAE0" },
  ceniza: { id: "ceniza", nombre: "Ceniza", color: "#8A9096" },
  mostaza: { id: "mostaza", nombre: "Mostaza", color: "#C99A2E" },
  bosque: { id: "bosque", nombre: "Verde bosque", color: "#2F5D4A" },
};

export const productos: Producto[] = [
  {
    slug: "taza-300",
    nombre: "Taza de 300 ml",
    categoria: "tazas",
    tipo: "taza",
    precio: 14500,
    descripcion:
      "Una taza de pared gruesa que conserva el calor y se siente firme en la mano. Cada una se esmalta por inmersión, así que la línea del esmalte es distinta en cada pieza.",
    medidas: "9 cm de alto, 8 cm de diámetro",
    cuidado: "Apta para lavavajillas y microondas.",
    esmaltes: ["cobalto", "celadon", "hueso", "ceniza"],
    stock: 12,
    dip: 0.55,
  },
  {
    slug: "taza-espresso",
    nombre: "Taza de espresso",
    categoria: "tazas",
    tipo: "taza",
    precio: 9800,
    descripcion:
      "Chiquita y pesada, pensada para el café corto. El interior va esmaltado completo para que no absorba el sabor.",
    medidas: "6 cm de alto, 6 cm de diámetro, 90 ml",
    cuidado: "Apta para lavavajillas y microondas.",
    esmaltes: ["cobalto", "mostaza", "hueso"],
    stock: 9,
    dip: 0.6,
  },
  {
    slug: "jarra-1l",
    nombre: "Jarra de 1 litro",
    categoria: "mesa",
    tipo: "jarra",
    precio: 28000,
    descripcion:
      "Para el agua, el jugo o las flores del domingo. El pico vierte sin gotear y el asa está hecha para agarrarla con toda la mano.",
    medidas: "22 cm de alto, 12 cm de diámetro",
    cuidado: "Apta para lavavajillas. No usar en el horno.",
    esmaltes: ["celadon", "cobalto", "bosque"],
    stock: 6,
    dip: 0.5,
  },
  {
    slug: "plato-llano",
    nombre: "Plato llano de 26 cm",
    categoria: "mesa",
    tipo: "plato",
    precio: 16500,
    descripcion:
      "Un plato de borde bajo que alcanza para una comida completa. Se apilan sin rayarse porque el pie va sin esmaltar.",
    medidas: "26 cm de diámetro, 3 cm de alto",
    cuidado: "Apto para lavavajillas y microondas.",
    esmaltes: ["hueso", "ceniza", "celadon", "cobalto"],
    stock: 10,
    dip: 0.4,
  },
  {
    slug: "plato-postre",
    nombre: "Plato de postre de 19 cm",
    categoria: "mesa",
    tipo: "plato",
    precio: 12500,
    descripcion:
      "Para la tostada, la fruta o el postre. Hace juego con el plato llano y se vende por unidad.",
    medidas: "19 cm de diámetro, 2,5 cm de alto",
    cuidado: "Apto para lavavajillas y microondas.",
    esmaltes: ["hueso", "ceniza", "celadon", "cobalto"],
    stock: 14,
    dip: 0.45,
  },
  {
    slug: "cuenco-desayuno",
    nombre: "Cuenco de desayuno",
    categoria: "mesa",
    tipo: "cuenco",
    precio: 13800,
    descripcion:
      "Hondo para el yogur con granola o la sopa. Entra bien en una mano y tiene el borde redondeado.",
    medidas: "14 cm de diámetro, 7 cm de alto, 450 ml",
    cuidado: "Apto para lavavajillas y microondas.",
    esmaltes: ["mostaza", "cobalto", "bosque", "hueso"],
    stock: 11,
    dip: 0.65,
  },
  {
    slug: "maceta-12",
    nombre: "Maceta de 12 cm con plato",
    categoria: "plantas",
    tipo: "maceta",
    precio: 11900,
    descripcion:
      "Para suculentas, cactus o hierbas chicas. Tiene agujero de drenaje y viene con su plato.",
    medidas: "12 cm de diámetro, 11 cm de alto",
    cuidado: "Para uso interior y exterior bajo techo. Evitar heladas.",
    esmaltes: ["bosque", "celadon", "ceniza"],
    stock: 8,
    dip: 0.5,
  },
  {
    slug: "maceta-18",
    nombre: "Maceta de 18 cm con plato",
    categoria: "plantas",
    tipo: "maceta",
    precio: 17500,
    descripcion:
      "El tamaño para una planta de interior mediana. Tiene agujero de drenaje y viene con su plato.",
    medidas: "18 cm de diámetro, 16 cm de alto",
    cuidado: "Para uso interior y exterior bajo techo. Evitar heladas.",
    esmaltes: ["bosque", "celadon", "ceniza"],
    stock: 5,
    dip: 0.55,
  },
  {
    slug: "florero-botella",
    nombre: "Florero botella",
    categoria: "deco",
    tipo: "florero",
    precio: 19800,
    descripcion:
      "Cuello fino y panza ancha: sostiene una sola flor o una rama seca sin que se caiga. Va esmaltado por dentro y es impermeable.",
    medidas: "24 cm de alto, 13 cm de diámetro",
    cuidado: "Lavar a mano para cuidar el esmalte.",
    esmaltes: ["cobalto", "mostaza", "hueso"],
    stock: 7,
    dip: 0.6,
  },
  {
    slug: "jarron-alto",
    nombre: "Jarrón alto",
    categoria: "deco",
    tipo: "jarra",
    precio: 34000,
    descripcion:
      "Una pieza grande para ramas o flores largas. Se hace en el torno en dos partes y se une a mano, por eso se fabrica por encargo.",
    medidas: "38 cm de alto, 18 cm de diámetro",
    cuidado: "Lavar a mano para cuidar el esmalte.",
    esmaltes: ["ceniza", "bosque", "cobalto"],
    stock: 0,
    dip: 0.45,
  },
];

export function getProducto(slug: string) {
  return productos.find((p) => p.slug === slug);
}

export function maxCantidad(p: Producto) {
  return Math.min(p.stock, MAX_POR_LINEA);
}

// Convierte los ítems del carrito en líneas con producto, esmalte y subtotal.
// Ignora lo que ya no existe en el catálogo.
export function armarLineas(items: ItemCarrito[]): Linea[] {
  const lineas: Linea[] = [];
  for (const item of items) {
    const producto = getProducto(item.slug);
    const esmalte = esmaltes[item.esmalte];
    if (!producto || !esmalte || !producto.esmaltes.includes(esmalte.id)) continue;
    lineas.push({ item, producto, esmalte, subtotal: producto.precio * item.cantidad });
  }
  return lineas;
}

export function calcularEnvio(subtotal: number, entrega: Entrega) {
  if (entrega === "retiro") return 0;
  return subtotal >= siteConfig.envio.gratisDesde ? 0 : siteConfig.envio.domicilio;
}
