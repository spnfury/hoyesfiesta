import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  comunidades,
  getHolidaysForLocation,
  calculateBridges,
  formatDateES,
  getProvincesByCommunity,
} from "@/lib/holidays-data";

type Props = {
  params: Promise<{ comunidad: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { comunidad } = await params;
  const location = comunidades.find((c) => c.slug === comunidad);
  if (!location) return { title: "Comunidad no encontrada" };

  return {
    title: `Festivos en ${location.name} 2026 — Calendario y Puentes`,
    description: `Calendario completo de festivos en ${location.name} 2026. Descubre los días libres nacionales y autonómicos, los mejores puentes y planifica tus escapadas.`,
    alternates: { canonical: `https://hoyesfiesta.com/${location.slug}` },
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

  if (!location) notFound();

  const holidays = getHolidaysForLocation(location.id);
  const bridges = calculateBridges(holidays);
  const provinces = getProvincesByCommunity(location.id);

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
    <div className="min-h-screen bg-white">
      {/* Hero Header Minimalist */}
      <section className="pt-20 pb-16 px-4 text-center border-b border-[var(--surface-border)]">
        <div className="mx-auto max-w-4xl">
          <Link
            href="/"
            className="text-[0.65rem] uppercase tracking-widest text-[var(--muted)] hover:text-[var(--primary)] transition-colors mb-12 inline-block"
          >
            ← Volver al inicio
          </Link>
          
          <p className="font-script text-4xl text-[var(--primary)] mb-2">Descubre los</p>
          <h1 className="text-4xl sm:text-6xl font-serif text-[var(--foreground)] mb-6">
            Festivos en {location.name}
          </h1>
          
          <div className="elegant-divider max-w-xs mx-auto text-[var(--muted)]">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--primary)]"></span>
          </div>
          
          <div className="mt-8 flex justify-center gap-8">
            <div className="text-center">
              <span className="block font-serif text-3xl">{holidays.length}</span>
              <span className="text-[0.65rem] uppercase tracking-widest text-[var(--muted)]">días festivos</span>
            </div>
            <div className="w-px h-10 bg-[var(--surface-border)] my-auto"></div>
            <div className="text-center">
              <span className="block font-serif text-3xl">{bridges.length}</span>
              <span className="text-[0.65rem] uppercase tracking-widest text-[var(--muted)]">puentes largos</span>
            </div>
          </div>
        </div>
      </section>

      {/* Mejores Puentes */}
      {bridges.length > 0 && (
        <section className="py-20 px-4 section-alt border-b border-[var(--surface-border)]">
          <div className="mx-auto max-w-5xl">
            <div className="text-center mb-12">
              <h2 className="font-script text-3xl text-[var(--primary)] mb-2">Escapadas</h2>
              <h3 className="font-serif text-3xl">Puentes Disponibles</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {bridges.slice(0, 4).map((bridge, i) => (
                <div key={`bridge-${i}`} className="bg-white p-8 elegant-card text-center">
                  <h4 className="font-serif text-xl mb-2">{bridge.holiday.name}</h4>
                  <p className="text-[0.7rem] uppercase tracking-widest text-[var(--muted)] mb-6">
                    {formatDateES(bridge.holiday.date)}
                  </p>
                  
                  <div className="mb-6">
                    <span className="font-serif text-4xl text-[var(--foreground)] block">
                      {bridge.total_days_free}
                    </span>
                    <span className="text-[0.65rem] uppercase tracking-widest text-[var(--muted)]">días libres</span>
                  </div>
                  
                  <p className="text-sm text-[var(--muted)] mb-6">
                    {bridge.days_off_needed === 0 
                      ? "Sin gastar días de vacaciones." 
                      : `Pidiendo ${bridge.days_off_needed} día${bridge.days_off_needed > 1 ? 's' : ''}.`}
                  </p>
                  
                  <button className="btn-outline text-[0.7rem] py-2 px-6">Ver Opciones de Viaje</button>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Calendario Complete Minimalist */}
      <section className="py-20 px-4">
        <div className="mx-auto max-w-3xl">
          <div className="text-center mb-16">
            <h2 className="font-script text-3xl text-[var(--primary)] mb-2">Día a día</h2>
            <h3 className="font-serif text-3xl">Calendario 2026</h3>
          </div>

          <div className="space-y-12">
            {Object.entries(holidaysByMonth)
              .sort(([a], [b]) => a.localeCompare(b))
              .map(([monthKey, monthHolidays]) => {
                const monthIndex = parseInt(monthKey.split("-")[1]) - 1;

                return (
                  <div key={monthKey}>
                    <h3 className="font-serif text-2xl mb-6 relative pl-4">
                      <span className="absolute left-0 top-1 w-1 h-6 bg-[var(--primary)]"></span>
                      {monthNames[monthIndex]}
                    </h3>
                    <div className="grid grid-cols-1 min-w-full">
                      {monthHolidays.map((h, i) => (
                        <div
                          key={h.id}
                          className={`flex items-center justify-between py-4 border-b border-[var(--surface-border)] ${h.scope === "regional" ? "bg-[var(--surface-alt)] px-4 -mx-4" : ""}`}
                        >
                          <div>
                            <p className="font-medium text-sm">{h.name}</p>
                            <p className="text-[0.7rem] uppercase tracking-widest text-[var(--muted)] mt-1">
                              {formatDateES(h.date)}
                            </p>
                          </div>
                          <span className={h.scope === "national" ? "badge-national" : "badge-regional px-2 py-0.5"}>
                            {h.scope === "national" ? "Nac" : "Aut"}
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

      {/* Provincias de esta comunidad */}
      {provinces.length > 0 && (
        <section className="py-20 px-4 bg-white border-t border-[var(--surface-border)]">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="font-script text-3xl text-[var(--primary)] mb-2">Festivos por</h2>
            <h3 className="font-serif text-3xl mb-8">Provincia en {location.name}</h3>
            <div className="flex flex-wrap justify-center gap-3">
              {provinces.map((p) => (
                <Link
                  key={p.id}
                  href={`/${location.slug}/${p.slug}`}
                  className="px-5 py-2 bg-white border border-[var(--surface-border)] text-[0.7rem] uppercase tracking-widest text-[var(--muted)] hover:border-[var(--primary)] hover:text-[var(--primary)] transition-colors"
                >
                  {p.name}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Explore More */}
      <section className="py-20 px-4 section-alt border-t border-[var(--surface-border)]">
        <div className="mx-auto max-w-5xl text-center">
          <h3 className="font-serif text-2xl mb-8">Descubre otros calendarios</h3>
          <div className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
            {comunidades
              .filter((c) => c.type === "autonomous_region" && c.id !== location.id)
              .map((c) => (
                <Link
                  key={c.id}
                  href={`/${c.slug}`}
                  className="px-5 py-2 bg-white border border-[var(--surface-border)] text-[0.7rem] uppercase tracking-widest text-[var(--muted)] hover:border-[var(--primary)] hover:text-[var(--primary)] transition-colors"
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
