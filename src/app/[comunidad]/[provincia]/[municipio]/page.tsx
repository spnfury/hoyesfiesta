import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  comunidades,
  getHolidaysForLocation,
  calculateBridges,
  formatDateES,
  getProvinceBySlug,
  getCommunityById,
} from "@/lib/holidays-data";
import {
  getMunicipalityBySlug,
  getMunicipalitiesByProvince,
  getPlansForCategory,
  getAllMunicipalities,
} from "@/lib/municipalities-data";

type Props = {
  params: Promise<{ comunidad: string; provincia: string; municipio: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { comunidad, provincia, municipio } = await params;
  const community = comunidades.find(
    (c) => c.slug === comunidad && c.type === "autonomous_region"
  );
  const province = getProvinceBySlug(provincia);
  const municipality = getMunicipalityBySlug(municipio);

  if (!community || !province || !municipality) {
    return { title: "Municipio no encontrado" };
  }

  const title = `¿Hoy es fiesta en ${municipality.name}? — Festivos ${municipality.name} 2026`;
  const description = `Consulta si hoy es festivo en ${municipality.name} (${province.name}, ${community.name}). Calendario completo de festivos 2026, puentes y planes para hacer en ${municipality.name} en días festivos.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      locale: "es_ES",
      url: `https://hoyesfiesta.com/${community.slug}/${province.slug}/${municipality.slug}`,
    },
    alternates: {
      canonical: `https://hoyesfiesta.com/${community.slug}/${province.slug}/${municipality.slug}`,
    },
  };
}

export async function generateStaticParams() {
  const allMunicipalities = getAllMunicipalities();
  const params: { comunidad: string; provincia: string; municipio: string }[] =
    [];

  for (const muni of allMunicipalities) {
    const province = comunidades.find(
      (c) => c.id === muni.parent_id && c.type === "province"
    );
    if (!province) continue;
    const community = comunidades.find(
      (c) => c.id === province.parent_id && c.type === "autonomous_region"
    );
    if (!community) continue;

    params.push({
      comunidad: community.slug,
      provincia: province.slug,
      municipio: muni.slug,
    });
  }

  return params;
}

export default async function MunicipalityPage({ params }: Props) {
  const { comunidad, provincia, municipio } = await params;

  const community = comunidades.find(
    (c) => c.slug === comunidad && c.type === "autonomous_region"
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

  // Los municipios heredan los festivos de su comunidad autónoma
  const holidays = getHolidaysForLocation(community.id);
  const bridges = calculateBridges(holidays);
  const plans = getPlansForCategory(municipality.category);

  const today = new Date().toISOString().split("T")[0];
  const todayHolidays = holidays.filter((h) => h.date === today);
  const isHoliday = todayHolidays.length > 0;

  // Otros municipios de la misma provincia
  const siblings = getMunicipalitiesByProvince(province.id).filter(
    (m) => m.id !== municipality.id
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

  // Schema.org
  const faqItems = [
    {
      "@type": "Question",
      name: `¿Hoy es fiesta en ${municipality.name}?`,
      acceptedAnswer: {
        "@type": "Answer",
        text: isHoliday
          ? `Sí, hoy es festivo en ${municipality.name}: ${todayHolidays
              .map((h) => h.name)
              .join(", ")}.`
          : `No, hoy no es festivo en ${municipality.name}. Es un día laborable normal.`,
      },
    },
    {
      "@type": "Question",
      name: `¿Cuántos festivos hay en ${municipality.name} en 2026?`,
      acceptedAnswer: {
        "@type": "Answer",
        text: `En ${municipality.name} hay ${holidays.length} días festivos en 2026, incluyendo los festivos nacionales y los autonómicos de ${community.name}.`,
      },
    },
    {
      "@type": "Question",
      name: `¿Cuántos puentes hay en ${municipality.name} en 2026?`,
      acceptedAnswer: {
        "@type": "Answer",
        text: `En ${municipality.name} hay ${bridges.length} oportunidades de puente en 2026, combinando festivos con fines de semana.`,
      },
    },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        name: `¿Hoy es fiesta en ${municipality.name}?`,
        description: `Calendario de festivos en ${municipality.name} 2026`,
        url: `https://hoyesfiesta.com/${community.slug}/${province.slug}/${municipality.slug}`,
      },
      {
        "@type": "FAQPage",
        mainEntity: faqItems,
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Inicio",
            item: "https://hoyesfiesta.com",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: community.name,
            item: `https://hoyesfiesta.com/${community.slug}`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: province.name,
            item: `https://hoyesfiesta.com/${community.slug}/${province.slug}`,
          },
          {
            "@type": "ListItem",
            position: 4,
            name: municipality.name,
            item: `https://hoyesfiesta.com/${community.slug}/${province.slug}/${municipality.slug}`,
          },
        ],
      },
    ],
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
            <Link
              href="/"
              className="hover:text-[var(--primary)] transition-colors"
            >
              Inicio
            </Link>
            <span>/</span>
            <Link
              href={`/${community.slug}`}
              className="hover:text-[var(--primary)] transition-colors"
            >
              {community.name}
            </Link>
            <span>/</span>
            <Link
              href={`/${community.slug}/${province.slug}`}
              className="hover:text-[var(--primary)] transition-colors"
            >
              {province.name}
            </Link>
            <span>/</span>
            <span className="text-[var(--foreground)]">
              {municipality.name}
            </span>
          </nav>

          <p className="font-script text-4xl text-[var(--primary)] mb-2">
            ¿Hoy es fiesta en
          </p>
          <h1 className="text-4xl sm:text-5xl font-serif text-[var(--foreground)] mb-6">
            {municipality.name}?
          </h1>

          {/* Estado de hoy */}
          <div className="bg-[var(--surface-alt)] border border-[var(--surface-border)] p-6 max-w-lg mx-auto mb-8">
            {isHoliday ? (
              <div>
                <p className="text-xs uppercase tracking-widest text-[var(--primary)] mb-2">
                  ¡Sí! Hoy es festivo en {municipality.name}
                </p>
                <p className="font-serif text-xl">
                  {todayHolidays[0].name}
                </p>
              </div>
            ) : (
              <div>
                <p className="text-xs uppercase tracking-widest text-[var(--muted)] mb-2">
                  Estado de hoy
                </p>
                <p className="font-serif text-xl">
                  No, hoy es laborable en {municipality.name}
                </p>
              </div>
            )}
          </div>

          <div className="elegant-divider max-w-xs mx-auto text-[var(--muted)]">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--primary)]"></span>
          </div>

          <div className="mt-8 flex justify-center gap-8">
            <div className="text-center">
              <span className="block font-serif text-3xl">
                {holidays.length}
              </span>
              <span className="text-[0.65rem] uppercase tracking-widest text-[var(--muted)]">
                festivos
              </span>
            </div>
            <div className="w-px h-10 bg-[var(--surface-border)] my-auto"></div>
            <div className="text-center">
              <span className="block font-serif text-3xl">
                {bridges.length}
              </span>
              <span className="text-[0.65rem] uppercase tracking-widest text-[var(--muted)]">
                puentes
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Intro SEO */}
      <section className="py-16 px-4 bg-white border-b border-[var(--surface-border)]">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm text-[var(--muted)] leading-relaxed">
            <strong>{municipality.name}</strong> es un municipio de la provincia
            de <strong>{province.name}</strong>, en la comunidad autónoma de{" "}
            <strong>{community.name}</strong>. En 2026, los habitantes de{" "}
            {municipality.name} disfrutan de{" "}
            <strong>{holidays.length} días festivos</strong> (nacionales y
            autonómicos), que combinados estratégicamente generan{" "}
            <strong>{bridges.length} oportunidades de puente</strong> para
            escapadas y descanso.
          </p>
        </div>
      </section>

      {/* Planes para hacer en [ciudad] */}
      <section className="py-20 px-4 section-alt border-b border-[var(--surface-border)]">
        <div className="mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="font-script text-3xl text-[var(--primary)] mb-2">
              Planes para
            </h2>
            <h3 className="font-serif text-3xl">
              Qué hacer en {municipality.name} en festivo
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {plans.map((plan, i) => (
              <div
                key={i}
                className="bg-white p-6 elegant-card"
              >
                <span className="text-3xl mb-4 block">{plan.emoji}</span>
                <h4 className="font-serif text-lg mb-2">{plan.title}</h4>
                <p className="text-sm text-[var(--muted)] leading-relaxed">
                  {plan.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Puentes */}
      {bridges.length > 0 && (
        <section className="py-20 px-4 bg-white border-b border-[var(--surface-border)]">
          <div className="mx-auto max-w-5xl">
            <div className="text-center mb-12">
              <h2 className="font-script text-3xl text-[var(--primary)] mb-2">
                Escapadas desde
              </h2>
              <h3 className="font-serif text-3xl">{municipality.name}</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {bridges.slice(0, 4).map((bridge, i) => (
                <div
                  key={`bridge-${i}`}
                  className="bg-white p-8 elegant-card text-center"
                >
                  <h4 className="font-serif text-xl mb-2">
                    {bridge.holiday.name}
                  </h4>
                  <p className="text-[0.7rem] uppercase tracking-widest text-[var(--muted)] mb-6">
                    {formatDateES(bridge.holiday.date)}
                  </p>
                  <div className="mb-6">
                    <span className="font-serif text-4xl text-[var(--foreground)] block">
                      {bridge.total_days_free}
                    </span>
                    <span className="text-[0.65rem] uppercase tracking-widest text-[var(--muted)]">
                      días libres
                    </span>
                  </div>
                  <p className="text-sm text-[var(--muted)] mb-6">
                    {bridge.days_off_needed === 0
                      ? "Sin gastar días de vacaciones."
                      : `Pidiendo ${bridge.days_off_needed} día${
                          bridge.days_off_needed > 1 ? "s" : ""
                        }.`}
                  </p>
                  <Link
                    href="/optimizador"
                    className="text-[0.75rem] uppercase tracking-widest text-[var(--primary)] hover:text-[var(--primary-hover)] border-b border-[var(--primary)] pb-1 transition-colors"
                  >
                    Optimizar vacaciones
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Calendario */}
      <section className="py-20 px-4 section-alt">
        <div className="mx-auto max-w-3xl">
          <div className="text-center mb-16">
            <h2 className="font-script text-3xl text-[var(--primary)] mb-2">
              Todos los festivos en
            </h2>
            <h3 className="font-serif text-3xl">
              {municipality.name} 2026
            </h3>
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
                        <div
                          key={h.id}
                          className={`flex items-center justify-between py-4 border-b border-[var(--surface-border)] ${
                            h.scope === "regional"
                              ? "bg-white px-4 -mx-4"
                              : ""
                          }`}
                        >
                          <div>
                            <p className="font-medium text-sm">{h.name}</p>
                            <p className="text-[0.7rem] uppercase tracking-widest text-[var(--muted)] mt-1">
                              {formatDateES(h.date)}
                            </p>
                          </div>
                          <span
                            className={
                              h.scope === "national"
                                ? "badge-national px-2 py-0.5"
                                : "badge-regional px-2 py-0.5"
                            }
                          >
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

      {/* FAQ SEO */}
      <section className="py-20 px-4 bg-white border-t border-[var(--surface-border)]">
        <div className="mx-auto max-w-3xl">
          <div className="text-center mb-12">
            <h2 className="font-script text-3xl text-[var(--primary)] mb-2">
              Preguntas frecuentes
            </h2>
            <h3 className="font-serif text-2xl">
              Festivos en {municipality.name}
            </h3>
          </div>
          <div className="space-y-6">
            {faqItems.map((faq, i) => (
              <div key={i} className="border-b border-[var(--surface-border)] pb-6">
                <h4 className="font-serif text-lg mb-2">{faq.name}</h4>
                <p className="text-sm text-[var(--muted)] leading-relaxed">
                  {faq.acceptedAnswer.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Otros municipios */}
      {siblings.length > 0 && (
        <section className="py-20 px-4 section-alt border-t border-[var(--surface-border)]">
          <div className="mx-auto max-w-4xl text-center">
            <h3 className="font-serif text-2xl mb-2">
              Más festivos en {province.name}
            </h3>
            <p className="text-sm text-[var(--muted)] mb-8">
              Explora los festivos de otros municipios de la provincia
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {siblings.map((m) => (
                <Link
                  key={m.id}
                  href={`/${community.slug}/${province.slug}/${m.slug}`}
                  className="px-5 py-2 bg-white border border-[var(--surface-border)] text-[0.7rem] uppercase tracking-widest text-[var(--muted)] hover:border-[var(--primary)] hover:text-[var(--primary)] transition-colors"
                >
                  {m.name}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
