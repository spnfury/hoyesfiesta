import { ImageResponse } from "next/og";
import { festivosNacionales2026, allHolidays2026, calculateBridges } from "@/lib/holidays-data";

export const alt = "Hoy Es Fiesta — Calendario de Festivos España 2026";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  const bridges = calculateBridges(allHolidays2026);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: "#FAF7F2",
          color: "#1a1a1a",
          padding: "80px",
          fontFamily: "serif",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 28,
            letterSpacing: 6,
            textTransform: "uppercase",
            color: "#9a8c70",
            marginBottom: 40,
          }}
        >
          Hoy Es Fiesta
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 110,
            fontWeight: 400,
            lineHeight: 1.05,
            marginBottom: 24,
          }}
        >
          Calendario de Festivos
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 88,
            fontStyle: "italic",
            color: "#9a8c70",
            marginBottom: 80,
          }}
        >
          España 2026
        </div>

        <div style={{ display: "flex", gap: 60, marginTop: "auto" }}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: 84, fontWeight: 600 }}>{festivosNacionales2026.length}</span>
            <span style={{ fontSize: 22, letterSpacing: 4, textTransform: "uppercase", color: "#666" }}>
              Festivos nacionales
            </span>
          </div>
          <div style={{ display: "flex", width: 1, background: "#d6cdb9" }} />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: 84, fontWeight: 600 }}>{bridges.length}</span>
            <span style={{ fontSize: 22, letterSpacing: 4, textTransform: "uppercase", color: "#666" }}>
              Puentes en 2026
            </span>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            position: "absolute",
            right: 80,
            bottom: 80,
            fontSize: 22,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: "#9a8c70",
          }}
        >
          hoyesfiesta.com
        </div>
      </div>
    ),
    { ...size },
  );
}
