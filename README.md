# Arcilla Norte

Tienda online de cerámica artesanal de Salta, hecha con Next.js (App Router), TypeScript y Tailwind CSS 3. Tiene catálogo, carrito, checkout con Mercado Pago y un backend en Node que recalcula los precios. Es un proyecto de demostración para portafolio: el taller, los productos, los precios y los datos de contacto son ficticios.

## Cómo correrlo

Necesitás Node.js 18.18 o superior.

```bash
npm install
cp .env.example .env.local
npm run dev
```

Abrí http://localhost:3000. Sin configurar nada, el pago se simula: al tocar "Pagar" te lleva a la página de pedido recibido y muestra el detalle del pedido en la terminal.

## Qué incluye

- Inicio con las piezas sobre la repisa del horno y el catálogo con filtro por categoría
- Cada pieza está ilustrada en SVG con el esmalte por inmersión: la cerámica sin esmaltar abajo y el color arriba, con el borde irregular que deja el esmalte (`components/Vessel.tsx`)
- Página de producto con selector de esmalte, cantidad y stock; las piezas sin stock se ofrecen por encargo con un botón de WhatsApp
- Carrito que se guarda en el navegador (queda si cerrás la pestaña)
- Checkout con retiro en taller o envío a domicilio, y pago con Mercado Pago
- Alternativa de pedido por WhatsApp desde el carrito
- Páginas de resultado del pago (aprobado, pendiente y error)
- Sección del taller con el proceso real de cada pieza y preguntas frecuentes
- Imagen para compartir el link por WhatsApp, ícono y metadatos SEO

## Cómo personalizarlo

| Qué cambiar | Dónde |
| --- | --- |
| Nombre, contacto, taller, costo y zona de envío | `lib/config.ts` |
| Productos, precios, stock, esmaltes y categorías | `lib/products.ts` |
| Colores | `tailwind.config.ts` |
| Tipografías | `app/layout.tsx` (Young Serif y Albert Sans) |
| Textos del inicio, proceso y preguntas | `components/Hero.tsx`, `components/Taller.tsx`, `components/Preguntas.tsx` |

Para agregar un producto, sumá un objeto a `productos` en `lib/products.ts`. La página, el catálogo, el carrito y el checkout lo toman solos.

### Reemplazar las ilustraciones por fotos

Las ilustraciones sirven para la demo. Con un cliente real vas a querer fotos de las piezas. Reemplazá `<Vessel />` por una imagen (`next/image`) en `ProductCard.tsx`, `ProductView.tsx`, `CartView.tsx` y `Hero.tsx`, y agregá un campo `imagen` por esmalte en `lib/products.ts`.

### Para usarlo con un cliente real

1. En `lib/config.ts` poné `demo: false`. Se oculta el aviso de demostración y se permite que Google indexe el sitio.
2. Cargá los productos, precios y stock reales en `lib/products.ts`, y revisá los textos de cuidado, tiempos de entrega y política de cambios con el taller.
3. Configurá Mercado Pago (más abajo) y probá un pago completo con credenciales de prueba antes de salir.
4. Configurá `NEXT_PUBLIC_SITE_URL` con el dominio final.

## Mercado Pago

El flujo usa Checkout Pro: la tienda crea una preferencia de pago desde el servidor (`app/api/checkout/route.ts`) y lleva a la persona a Mercado Pago a pagar. Al volver, ve el resultado.

1. En https://www.mercadopago.com.ar/developers creá una aplicación y copiá el Access Token.
2. Ponelo en `.env.local` como `MP_ACCESS_TOKEN`. Para probar usá las credenciales de prueba.
3. Para que Mercado Pago devuelva a la persona automáticamente a la tienda, `NEXT_PUBLIC_SITE_URL` tiene que empezar con `https://`. En desarrollo local, MP muestra un botón para volver.

**Seguridad:** el navegador solo envía qué piezas, qué esmalte y cuántas. El servidor busca los precios en `lib/products.ts` y calcula el total, así nadie puede modificar un precio desde el navegador.

### Lo que falta para una tienda en producción

Este proyecto resuelve la parte visible y el cobro. Para una tienda con muchas ventas, el siguiente nivel sería:

- **Confirmación automática del pago:** hoy la página de "pago recibido" confía en que Mercado Pago devolvió a la persona. Lo correcto es recibir la confirmación en un webhook (`/api/webhook`) y marcar el pedido como pagado ahí.
- **Base de datos de pedidos y stock:** hoy el stock vive en el archivo de productos y los pedidos solo llegan por mail y por el panel de Mercado Pago (cada pago lleva la referencia `AN-...`). Una base de datos (por ejemplo Supabase o Neon) permite descontar stock y listar pedidos.
- **Envíos a otras ciudades:** hoy hay un precio fijo para una zona. Se puede integrar Correo Argentino o Andreani para calcular el costo según el código postal.

## Aviso de pedidos por mail (opcional)

Si completás `RESEND_API_KEY` y `ORDERS_TO_EMAIL`, cada pedido iniciado llega al taller por mail con el detalle (piezas, esmalte, datos del cliente y forma de entrega). Se envía antes del pago, así que el asunto dice "esperando pago": confirmá el cobro en Mercado Pago antes de preparar el pedido.

## Publicarlo en Vercel

1. Subí la carpeta a un repositorio de GitHub.
2. En Vercel, elegí "Add New Project" e importá el repositorio.
3. Cargá las variables de entorno de `.env.example`.
4. Desplegá. Cada cambio que subas a GitHub se publica solo.

## Checklist antes de mostrarlo en tu portafolio

- Probar el flujo completo: elegir esmalte, agregar al carrito, cambiar cantidades, pagar (en modo demostración o con credenciales de prueba)
- Probar la tienda en un celular real
- Correr Lighthouse (Chrome DevTools) en celular y guardar la captura de los puntajes
- Sacar capturas del inicio, de una pieza con distintos esmaltes y del carrito
- Escribir 3 líneas sobre el problema que resuelve: un taller que quiere vender online sin pagar comisiones de un marketplace
