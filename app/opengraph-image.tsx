import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/config";

// Imagen que aparece cuando se comparte el link por WhatsApp, Facebook o LinkedIn.
export const alt = `${siteConfig.name}, cerámica hecha a mano en ${siteConfig.city}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Piezas simplificadas: arriba el esmalte y abajo la cerámica sin esmaltar
const piezas = [
  { w: 150, h: 190, color: "#25459B", radio: "14px 14px 75px 75px" },
  { w: 170, h: 260, color: "#9DB8A8", radio: "40px 40px 85px 85px" },
  { w: 230, h: 150, color: "#C99A2E", radio: "10px 10px 115px 115px" },
  { w: 150, h: 300, color: "#8A9096", radio: "30px 30px 75px 75px" },
];

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "100%",
          background: "#F3F3EE",
          color: "#20232A",
          padding: "70px 80px 0",
        }}
      >
        <div style={{ display: "flex", fontSize: 34, color: "#5E646B" }}>
          Cerámica hecha a mano en {siteConfig.city}
        </div>
        <div style={{ display: "flex", fontSize: 108, fontWeight: 700, lineHeight: 1.05, marginTop: 20 }}>
          {siteConfig.name}
        </div>

        <div style={{ display: "flex", flexDirection: "column", marginTop: "auto" }}>
          <div style={{ display: "flex", alignItems: "flex-end", gap: 40 }}>
            {piezas.map((p, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  width: p.w,
                  height: p.h,
                  borderRadius: p.radio,
                  background: `linear-gradient(to bottom, ${p.color} 0%, ${p.color} 55%, #CFC6B8 55%, #CFC6B8 100%)`,
                }}
              />
            ))}
          </div>
          <div style={{ display: "flex", height: 22, background: "#20232A", marginTop: 0 }} />
        </div>
      </div>
    ),
    { ...size },
  );
}
