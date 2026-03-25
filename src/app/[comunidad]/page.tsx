import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  comunidades,
  getHolidaysForLocation,
  calculateBridges,
  formatDateES,
} from "@/lib/holidays-data";

type Props = {
  params: Promise<{ comunidad: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { comunidad } = await params;
  const location = comunidades.find((c) => c.slug === comunidad);

  if (!location) {
    return { title: "Comunidad no encontrada" };
  }

  return {
    title: `Festivos en ${location.name} 2026 — Calendario y Puentes`,
    description: `Calendario completo de festivos en ${location.name} para 2026. Descubre los puentes y optimiza tus vacaciones. Festivos nacionales y autonómicos.`,
    openGraph: {
      title: `Festivos en ${location.name} 2026`,
      description: `Todos los festivos y mejores puentes en ${location.name} para 2026.`,
    },
  };
}

export async function generateStaticParams() {
  return comunidades
    .filter((c) => c.type === "autonomous_region")
    .map((c) => ({ comunidad: c.slug }));
}

export default async function CommunityPage({ params }: Props) {
  const { comunidad } = await params;
  const location = comunidades.find((c) => c.slug === comunidad);

  if (!location) {
    notFound();
  }

  const holidays = getHolidaysForLocation(location.id);
  const bridges = calculateBridges(holidays);

  // Agrupar festivos por mes
  const holidaysByMonth: Record<string, typeof holidays> = {};
  for (const h of holidays) {
    const month = h.date.substring(0, 7); // YYYY-MM
    if (!holidaysByMonth[month]) holidaysByMonth[month] = [];
    holidaysByMonth[month].push(h);
  }

  const monthNames = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre",
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Header */}
      <section className="relative overflow-hidden py-16 sm:py-20 px-4">
        <div className="absolute top-1/4 right-1/4 w-80 h-80 bg-[var(--primary)] opacity-10 rounded-full blur-[100px] pointer-events-none" />
        <div className="mx-auto max-w-5xl">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-[var(--muted)] hover:text-[var(--primary-light)] transition-colors mb-6"
          >
            ← Volver al inicio
          </Link>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4 animate-fade-in-up">
            Festivos en{" "}
            <span className="gradient-text">{location.name}</span>
          </h1>
          <p className="text-lg text-[var(--muted)] mb-2 animate-fade-in-up stagger-1">
            Calendario completo 2026 — Festivos nacionales + autonómicos
          </p>
          <div className="flex items-center gap-4 animate-fade-in-up stagger-2">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[var(--surface)] border border-[var(--surface-border)] text-sm">
              📅 <span className="font-semibold text-[var(--accent)]">{holidays.length}</span>{" "}
              festivos en total
            </span>
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[var(--surface)] border border-[var(--surface-border)] text-sm">
              🌉 <span className="font-semibold text-[var(--primary-light)]">{bridges.length}</span>{" "}
              puentes posibles
            </span>
          </div>
        </div>
      </section>

      {/* Puentes para esta comunidad */}
      {bridges.length > 0 && (
        <section className="py-12 px-4 bg-[var(--surface)]/50">
          <div className="mx-auto max-w-5xl">
            <h2 className="text-2xl font-bold mb-6">
              🌉 Puentes en {location.name}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {bridges.slice(0, 6).map((bridge, i) => (
                <div
                  key={`bridge-${i}`}
                  className="glass-card bridge-card p-5"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-bold">{bridge.holiday.name}</h3>
                      <p className="text-sm text-[var(--muted)]">
                        {formatDateES(bridge.holiday.date)}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-black text-[var(--accent)]">
                        {bridge.total_days_free}
                      </div>
                      <div className="text-xs text-[var(--muted)]">días</div>
                    </div>
                  </div>
                  <div className="pt-3 border-t border-[var(--surface-border)]">
                    {bridge.days_off_needed === 0 ? (
                      <span className="text-sm text-[var(--success)]">
                        ✨ ¡No necesitas pedir días!
                      </span>
                    ) : (
                      <span className="text-sm text-[var(--primary-light)]">
                        📝 Pide {bridge.days_off_needed} día
                        {bridge.days_off_needed > 1 ? "s" : ""} → Consigues{" "}
                        {bridge.total_days_free} libres
                      </span>
                    )}
                  </div>

                  {/* Affiliate CTA */}
                  <div className="mt-3 p-2.5 rounded-lg bg-[var(--accent)]/10 border border-[var(--accent)]/20">
                    <p className="text-xs text-[var(--accent-light)]">
                      ✈️{" "}
                      <span className="underline cursor-pointer hover:text-[var(--accent)]">
                        Ver vuelos y hoteles para este puente
                      </span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Calendario mes a mes */}
      <section className="py-12 px-4">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-2xl font-bold mb-8">
            📅 Calendario Completo 2026
          </h2>

          <div className="space-y-6">
            {Object.entries(holidaysByMonth)
              .sort(([a], [b]) => a.localeCompare(b))
              .map(([monthKey, monthHolidays]) => {
                const monthIndex = parseInt(monthKey.split("-")[1]) - 1;

                return (
                  <div key={monthKey} className="glass-card p-5">
                    <h3 className="text-lg font-bold mb-4 text-[var(--primary-light)]">
                      {monthNames[monthIndex]}
                    </h3>
                    <div className="space-y-3">
                      {monthHolidays.map((h) => (
                        <div
                          key={h.id}
                          className="flex items-center justify-between py-2 border-b border-[var(--surface-border)] last:border-0"
                        >
                          <div>
                            <p className="font-medium">{h.name}</p>
                            <p className="text-sm text-[var(--muted)]">
                              {formatDateES(h.date)}
                            </p>
                          </div>
                          <span
                            className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                              h.scope === "national"
                                ? "badge-national"
                                : "badge-regional"
                            }`}
                          >
                            {h.scope === "national"
                              ? "Nacional"
                              : "Autonómico"}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </section>

      {/* Other communities navigation */}
      <section className="py-12 px-4 bg-[var(--surface)]/50">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-xl font-bold mb-6">
            🗺️ Ver otras Comunidades
          </h2>
          <div className="flex flex-wrap gap-3">
            {comunidades
              .filter(
                (c) =>
                  c.type === "autonomous_region" && c.id !== location.id
              )
              .map((c) => (
                <Link
                  key={c.id}
                  href={`/${c.slug}`}
                  className="px-4 py-2 rounded-xl bg-[var(--surface)] border border-[var(--surface-border)] text-sm hover:border-[var(--primary)] hover:text-[var(--primary-light)] transition-all"
                >
                  {c.name}
                </Link>
              ))}
          </div>
        </div>
      </section>
    </div>
  );
}
