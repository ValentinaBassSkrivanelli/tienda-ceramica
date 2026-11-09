// Datos generales de la tienda. Para adaptarla a otro negocio, editá este archivo,
// los productos en lib/products.ts y los colores en tailwind.config.ts.

export const siteConfig = {
  // true: muestra el aviso de proyecto de demostración y pide a los buscadores no indexar el sitio.
  // Ponelo en false cuando la tienda sea de un cliente real.
  demo: true,

  name: "Arcilla Norte",
  city: "Salta",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  description:
    "Cerámica hecha a mano en Salta: tazas, platos, jarras, macetas y floreros esmaltados. Comprá online y pagá con Mercado Pago.",

  // Formato internacional sin signos. Para celulares argentinos: 549 + código de área + número
  whatsapp: "5493870000000",
  phoneDisplay: "+54 387 000-0000",
  email: "hola@arcillanorte.com.ar",
  taller: "Calle Ejemplo 789, Salta Capital",
  retiroHorarios: "Martes a sábados, de 10:00 a 18:00",

  // Envío a domicilio: precio fijo dentro de la zona y gratis desde un monto
  envio: {
    zona: "Salta Capital",
    domicilio: 6500,
    gratisDesde: 70000,
  },

  // Texto que aparece en el resumen de la tarjeta (máximo 22 caracteres, sin espacios ni símbolos)
  descriptor: "ARCILLANORTE",
};

export function whatsappUrl(mensaje = "Hola, quisiera consultar por una pieza.") {
  return `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(mensaje)}`;
}
