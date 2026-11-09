import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Hueso: fondo general, blanco frío
        hueso: "#F3F3EE",
        // Hollín: texto principal y repisa del horno
        hollin: "#20232A",
        // Cobalto: color de botones y enlaces, el azul del esmalte más clásico
        cobalto: "#25459B",
        "cobalto-oscuro": "#1B357A",
        // Celadón: verde suave de esmalte, para detalles
        celadon: "#9DB8A8",
        // Ceniza: texto secundario
        ceniza: "#5E646B",
        // Línea: separadores finos
        linea: "#D9DAD3",
        // Loza: fondo de las fichas de producto
        loza: "#E7E8E1",
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
