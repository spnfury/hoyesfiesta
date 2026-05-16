import { ImageResponse } from "next/og";
import { notFound } from "next/navigation";
import {
  comunidades,
  getHolidaysForLocation,
  calculateBridges,
  getProvinceBySlug,
} from "@/lib/holidays-data";
import { getMunicipalityBySlug } from "@/lib/municipalities-data";

export const alt = "Festivos y puentes 2026";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

type Props = {
  params: Promise<{ comunidad: string; provincia: string; municipio: string }>;
};

export default async function Image({ params }: Props) {
  const { comunidad, provincia, municipio } = await params;

  const community = comunidades.find(
    (c) => c.slug === comunidad && c.type === "autonomous_region",
  );
  const province = getProvinceBySlug(provincia);
  const municipality = getMunicipalityBySlug(municipio);

  if (
    !community ||
    !province ||
    !municipality ||
    province.parent_id !== community.id ||
    municipality.parent_id !== province.id
  ) {
    notFound();
  }

  const holidays = getHolidaysForLocation(municipality.id);
  const bridges = calculateBridges(holidays);
  const bestBridge = bridges
    .slice()
    .sort((a, b) => b.total_days_free - a.total_days_free)[0];

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
          padding: "70px 80px",
          fontFamily: "serif",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 24,
            letterSpacing: 5,
            textTransform: "uppercase",
            color: "#9a8c70",
            marginBottom: 30,
          }}
        >
          Hoy Es Fiesta · {community.name}
        </div>

        <div style={{ display: "flex", fontSize: 50, fontStyle: "italic", color: "#9a8c70", marginBottom: 4 }}>
          ¿Hoy es fiesta en
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 120,
            fontWeight: 600,
            lineHeight: 1,
            marginBottom: 50,
          }}
        >
          {municipality.name}?
        </div>

        {bestBridge && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              padding: 32,
              background: "#fff",
              border: "1px solid #d6cdb9",
              marginBottom: 30,
            }}
          >
            <span style={{ fontSize: 22, letterSpacing: 4, textTransform: "uppercase", color: "#666", marginBottom: 8 }}>
              Mejor puente del año
            </span>
            <span style={{ fontSize: 44, fontWeight: 500 }}>
              {bestBridge.total_days_free} días libres · {bestBridge.holiday.name}
            </span>
          </div>
        )}

        <div style={{ display: "flex", gap: 50, marginTop: "auto", alignItems: "flex-end" }}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: 64, fontWeight: 600 }}>{holidays.length}</span>
            <span style={{ fontSize: 18, letterSpacing: 3, textTransform: "uppercase", color: "#666" }}>
              Festivos
            </span>
          </div>
          <div style={{ display: "flex", width: 1, height: 70, background: "#d6cdb9" }} />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: 64, fontWeight: 600 }}>{bridges.length}</span>
            <span style={{ fontSize: 18, letterSpacing: 3, textTransform: "uppercase", color: "#666" }}>
              Puentes
            </span>
          </div>
          <div
            style={{
              display: "flex",
              marginLeft: "auto",
              fontSize: 20,
              letterSpacing: 4,
              textTransform: "uppercase",
              color: "#9a8c70",
            }}
          >
            hoyesfiesta.com
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
