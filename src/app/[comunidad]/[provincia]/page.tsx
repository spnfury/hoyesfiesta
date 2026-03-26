import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  comunidades,
  getHolidaysForLocation,
  calculateBridges,
  formatDateES,
  getProvinceBySlug,
  getProvincesByCommunity,
  getCommunityById,
} from "@/lib/holidays-data";
import { getMunicipalitiesByProvince } from "@/lib/municipalities-data";

type Props = {
  params: Promise<{ comunidad: string; provincia: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { comunidad, provincia } = await params;
  const community = comunidades.find((c) => c.slug === comunidad && c.type === "autonomous_region");
  const province = getProvinceBySlug(provincia);

  if (!community || !province || province.parent_id !== community.id) {
    return { title: "Provincia no encontrada" };
  }

  const title = `¿Hoy es fiesta en ${province.name}? — Festivos ${province.name} 2026`;
  const description = `Consulta si hoy es festivo en ${province.name}. Calendario completo de festivos nacionales, autonómicos y locales de ${province.name} (${community.name}) para 2026. Puentes y días libres.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      locale: "es_ES",
      url: `https://hoyesfiesta.com/${community.slug}/${province.slug}`,
    },
    alternates: {
      canonical: `https://hoyesfiesta.com/${community.slug}/${province.slug}`,
    },
  };
}

export async function generateStaticParams() {
  const params: { comunidad: string; provincia: string }[] = [];

  for (const community of comunidades.filter((c) => c.type === "autonomous_region")) {
    const provinces = getProvincesByCommunity(community.id);
    for (const province of provinces) {
      params.push({
        comunidad: community.slug,
        provincia: province.slug,
      });
    }
  }

  return params;
}

export default async function ProvincePage({ params }: Props) {
  const { comunidad, provincia } = await params;
  const community = comunidades.find((c) => c.slug === comunidad && c.type === "autonomous_region");
  const province = getProvinceBySlug(provincia);

  if (!community || !province || province.parent_id !== community.id) {
    notFound();
  }

  // Las provincias heredan los festivos de su comunidad
  const holidays = getHolidaysForLocation(community.id);
  const bridges = calculateBridges(holidays);

  const today = new Date().toISOString().split("T")[0];
  const todayHolidays = holidays.filter((h) => h.date === today);
  const isHoliday = todayHolidays.length > 0;

  const siblingsProvinces = getProvincesByCommunity(community.id).filter(
    (p) => p.id !== province.id
  );

  // Agrupar por mes
  const holidaysByMonth: Record<string, typeof holidays> = {};
  for (const h of holidays) {
    const month = h.date.substring(0, 7);
    if (!holidaysByMonth[month]) holidaysByMonth[month] = [];
    holidaysByMonth[month].push(h);
  }

  const monthNames = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre",
  ];

  // Schema.org JSON-LD
  const schemaEvents = holidays.map((h) => ({
    "@type": "Event",
    name: h.name,
    startDate: h.date,
    endDate: h.date,
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
    location: {
      "@type": "Place",
      name: province.name,
      address: {
        "@type": "PostalAddress",
        addressRegion: community.name,
        addressCountry: "ES",
      },
    },
  }));

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: `Festivos en ${province.name} 2026`,
    description: `Calendario de festivos en ${province.name} (${community.name}) 2026`,
    mainEntity: schemaEvents,
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Inicio", item: "https://hoyesfiesta.com" },
        { "@type": "ListItem", position: 2, name: community.name, item: `https://hoyesfiesta.com/${community.slug}` },
        { "@type": "ListItem", position: 3, name: province.name, item: `https://hoyesfiesta.com/${community.slug}/${province.slug}` },
      ],
    },
  };

  return (
    <div className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <section className="pt-20 pb-16 px-4 text-center border-b border-[var(--surface-border)]">
        <div className="mx-auto max-w-4xl">
          {/* Breadcrumbs */}
          <nav className="flex items-center justify-center gap-2 mb-10 text-[0.65rem] uppercase tracking-widest text-[var(--muted)]">
            <Link href="/" className="hover:text-[var(--primary)] transition-colors">Inicio</Link>
            <span>/</span>
            <Link href={`/${community.slug}`} className="hover:text-[var(--primary)] transition-colors">{community.name}</Link>
            <span>/</span>
            <span className="text-[var(--foreground)]">{province.name}</span>
          </nav>

          <p className="font-script text-4xl text-[var(--primary)] mb-2">¿Hoy es fiesta en</p>
          <h1 className="text-4xl sm:text-5xl font-serif text-[var(--foreground)] mb-6">
            {province.name}?
          </h1>

          {/* Estado de hoy - FOCO SEO */}
          <div className="bg-[var(--surface-alt)] border border-[var(--surface-border)] p-6 max-w-lg mx-auto mb-8">
            {isHoliday ? (
              <div>
                <p className="text-xs uppercase tracking-widest text-[var(--primary)] mb-2">¡Sí! Hoy es festivo</p>
                <p className="font-serif text-xl">{todayHolidays[0].name}</p>
              </div>
            ) : (
              <div>
                <p className="text-xs uppercase tracking-widest text-[var(--muted)] mb-2">Estado de hoy</p>
                <p className="font-serif text-xl">No, hoy es laborable en {province.name}</p>
              </div>
            )}
          </div>

          <div className="elegant-divider max-w-xs mx-auto text-[var(--muted)]">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--primary)]"></span>
          </div>

          <div className="mt-8 flex justify-center gap-8">
            <div className="text-center">
              <span className="block font-serif text-3xl">{holidays.length}</span>
              <span className="text-[0.65rem] uppercase tracking-widest text-[var(--muted)]">festivos</span>
            </div>
            <div className="w-px h-10 bg-[var(--surface-border)] my-auto"></div>
            <div className="text-center">
              <span className="block font-serif text-3xl">{bridges.length}</span>
              <span className="text-[0.65rem] uppercase tracking-widest text-[var(--muted)]">puentes</span>
            </div>
          </div>
        </div>
      </section>

      {/* Intro SEO única */}
      <section className="py-16 px-4 bg-white border-b border-[var(--surface-border)]">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm text-[var(--muted)] leading-relaxed">
            En la provincia de <strong>{province.name}</strong>, que pertenece a la comunidad autónoma de{" "}
            <strong>{community.name}</strong>, se celebran un total de{" "}
            <strong>{holidays.length} días festivos</strong> en 2026. Estos incluyen los festivos nacionales 
            de toda España y los festivos propios de {community.name}. 
            Combinando estos festivos de forma inteligente con tu calendario laboral, 
            podrás disfrutar de hasta <strong>{bridges.length} puentes</strong> largos a lo largo del año.
          </p>
        </div>
      </section>

      {/* Puentes */}
      {bridges.length > 0 && (
        <section className="py-20 px-4 section-alt border-b border-[var(--surface-border)]">
          <div className="mx-auto max-w-5xl">
            <div className="text-center mb-12">
              <h2 className="font-script text-3xl text-[var(--primary)] mb-2">Escapadas desde</h2>
              <h3 className="font-serif text-3xl">{province.name}</h3>
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
                      : `Pidiendo ${bridge.days_off_needed} día${bridge.days_off_needed > 1 ? "s" : ""}.`}
                  </p>
                  <a href="#" className="text-[0.75rem] uppercase tracking-widest text-[var(--primary)] hover:text-[var(--primary-hover)] border-b border-[var(--primary)] pb-1 transition-colors">
                    Vuelos desde {province.name}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Calendario */}
      <section className="py-20 px-4">
        <div className="mx-auto max-w-3xl">
          <div className="text-center mb-16">
            <h2 className="font-script text-3xl text-[var(--primary)] mb-2">Día a día en</h2>
            <h3 className="font-serif text-3xl">{province.name} 2026</h3>
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
                    <div>
                      {monthHolidays.map((h) => (
                        <div key={h.id} className={`flex items-center justify-between py-4 border-b border-[var(--surface-border)] ${h.scope === "regional" ? "bg-[var(--surface-alt)] px-4 -mx-4" : ""}`}>
                          <div>
                            <p className="font-medium text-sm">{h.name}</p>
                            <p className="text-[0.7rem] uppercase tracking-widest text-[var(--muted)] mt-1">
                              {formatDateES(h.date)}
                            </p>
                          </div>
                          <span className={h.scope === "national" ? "badge-national px-2 py-0.5" : "badge-regional px-2 py-0.5"}>
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

      {/* Otras provincias de la misma comunidad */}
      {siblingsProvinces.length > 0 && (
        <section className="py-20 px-4 section-alt border-t border-[var(--surface-border)]">
          <div className="mx-auto max-w-4xl text-center">
            <h3 className="font-serif text-2xl mb-2">Más festivos en {community.name}</h3>
            <p className="text-sm text-[var(--muted)] mb-8">Explora los festivos de otras provincias cercanas</p>
            <div className="flex flex-wrap justify-center gap-3">
              {siblingsProvinces.map((p) => (
                <Link
                  key={p.id}
                  href={`/${community.slug}/${p.slug}`}
                  className="px-5 py-2 bg-white border border-[var(--surface-border)] text-[0.7rem] uppercase tracking-widest text-[var(--muted)] hover:border-[var(--primary)] hover:text-[var(--primary)] transition-colors"
                >
                  {p.name}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
