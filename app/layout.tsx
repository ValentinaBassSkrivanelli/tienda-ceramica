import type { Metadata, Viewport } from "next";
import { Albert_Sans, Young_Serif } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/lib/config";
import { CartProvider } from "@/components/CartProvider";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const display = Young_Serif({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display",
  display: "swap",
});

const sans = Albert_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const titulo = `${siteConfig.name}, cerámica hecha a mano en ${siteConfig.city}`;

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: titulo,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  openGraph: {
    title: titulo,
    description: siteConfig.description,
    url: "/",
    siteName: siteConfig.name,
    locale: "es_AR",
    type: "website",
  },
  robots: siteConfig.demo ? { index: false, follow: false } : undefined,
};

export const viewport: Viewport = {
  themeColor: "#F3F3EE",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es-AR" className={`${display.variable} ${sans.variable}`}>
      <body>
        <a
          href="#contenido"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:bg-hollin focus:px-4 focus:py-2 focus:text-hueso"
        >
          Saltar al contenido
        </a>
        <CartProvider>
          <Header />
          <main id="contenido">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
