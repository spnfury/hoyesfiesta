import Link from "next/link";
import {
  comunidades,
  festivosNacionales2026,
  allHolidays2026,
  calculateBridges,
  formatDateES,
} from "@/lib/holidays-data";
import { bookingSearchUrl, nextDayIso } from "@/lib/affiliate";
import CountdownHero from "./components/CountdownHero";
import AnnualCalendar from "./components/AnnualCalendar";
import NewsletterForm from "./components/NewsletterForm";
import BookingLink from "./components/BookingLink";

function HeroSection() {
  const bridges = calculateBridges(allHolidays2026);
  const bridgesData = bridges.map((b) => ({
    holidayName: b.holiday.name,
    holidayDate: b.holiday.date,
    totalDaysFree: b.total_days_free,
    daysOffNeeded: b.days_off_needed,
    bridgeStart: b.bridge_start,
    bridgeEnd: b.bridge_end,
  }));

  return (
    <section className="hero-shell relative min-h-[calc(100vh-7rem)] overflow-hidden px-4 py-12 sm:px-6 lg:px-8">
      <div className="hero-media" />
      <div className="hero-overlay" />
      <div className="hero-noise" />

      <div className="relative z-10 mx-auto grid min-h-[calc(100vh-12rem)] max-w-7xl items-center gap-12 lg:grid-cols-[1.02fr_0.98fr]">
        <div className="max-w-3xl text-white">
          <div className="mb-5 animate-fade-in-up">
            <span className="hero-kicker">España 2026</span>
          </div>

          <h1 className="max-w-4xl text-5xl font-serif leading-[0.93] tracking-normal text-white animate-fade-in-up stagger-1 sm:text-7xl lg:text-8xl">
            Convierte festivos en escapadas memorables
          </h1>

          <p className="mt-7 max-w-2xl text-base leading-8 text-white/82 animate-fade-in-up stagger-2 sm:text-lg">
            Calendario laboral, puentes y optimizador de vacaciones en una
            experiencia visual pensada para decidir rápido cuándo viajar.
          </p>

          <div className="mt-9 flex flex-col gap-4 animate-fade-in-up stagger-3 sm:flex-row">
            <Link href="/optimizador" className="btn-primary hero-cta">
              Optimizar vacaciones
            </Link>
            <Link href="#puentes" className="btn-glass">
              Ver mejores puentes
            </Link>
          </div>

          <div className="hero-stats mt-12 grid grid-cols-3 gap-3 animate-fade-in-up stagger-3">
            <div>
              <span>{festivosNacionales2026.length}</span>
              <p>festivos nacionales</p>
            </div>
            <div>
              <span>{bridges.length}</span>
              <p>puentes detectados</p>
            </div>
            <div>
              <span>12</span>
              <p>meses planificados</p>
            </div>
          </div>
        </div>

        <div className="hero-panel animate-fade-in-up stagger-2">
          <div className="hero-panel-label">Tu cockpit de festivos</div>
          <CountdownHero holidays={allHolidays2026} bridges={bridgesData} />
        </div>
      </div>

      <div className="hero-scroll-hint">
        <span>Explora el calendario</span>
      </div>
    </section>
  );
}

function UpcomingHolidaysTimeline() {
  const today = new Date().toISOString().split("T")[0];
  const upcoming = festivosNacionales2026
    .filter((h) => h.date >= today)
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, 5);

  const past = festivosNacionales2026.filter((h) => h.date < today).length;

  function getDaysUntil(dateStr: string): number {
    const todayDate = new Date();
    todayDate.setHours(0, 0, 0, 0);
    const target = new Date(dateStr + "T00:00:00");
    return Math.ceil(
      (target.getTime() - todayDate.getTime()) / (1000 * 60 * 60 * 24)
    );
  }

  return (
    <section className="relative overflow-hidden bg-[var(--surface)] px-4 py-24">
      <div className="section-ribbon" />
      <div className="relative mx-auto max-w-3xl">
        <div className="mb-16 text-center">
          <h2 className="font-script text-4xl text-[var(--primary)] mb-2">
            Próximos
          </h2>
          <h3 className="font-serif text-3xl sm:text-4xl">
            Festivos Nacionales
          </h3>
          {past > 0 && (
            <p className="text-sm text-[var(--muted)] mt-3">
              {past} festivos ya pasados · {upcoming.length} por venir
            </p>
          )}
        </div>

        <div className="space-y-0">
          {upcoming.map((holiday, i) => {
            const days = getDaysUntil(holiday.date);
            return (
              <div
                key={holiday.id}
                className="timeline-item pb-8 animate-fade-in-up"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="flex items-start justify-between gap-6">
                  <div>
                    <h4 className="font-serif text-xl mb-1">{holiday.name}</h4>
                    <p className="text-[0.7rem] uppercase tracking-widest text-[var(--muted)]">
                      {formatDateES(holiday.date)}
                    </p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <span className="font-serif text-2xl text-[var(--primary)]">
                      {days}
                    </span>
                    <span className="text-[0.55rem] uppercase tracking-widest text-[var(--muted)] block">
                      días
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-4">
          <span className="text-[0.7rem] uppercase tracking-widest text-[var(--muted)]">
            {festivosNacionales2026.length} festivos nacionales en 2026
          </span>
        </div>
      </div>
    </section>
  );
}

function CalendarSection() {
  return (
    <section className="calendar-section px-4 py-24">
      <div className="mx-auto max-w-5xl">
        <div className="text-center mb-16">
          <h2 className="font-script text-4xl text-[var(--primary)] mb-2">
            Vista anual
          </h2>
          <h3 className="font-serif text-3xl sm:text-4xl">Calendario 2026</h3>
          <div className="flex flex-wrap items-center justify-center gap-6 mt-6">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-[var(--primary)] rounded-sm" />
              <span className="text-[0.65rem] uppercase tracking-widest text-[var(--muted)]">
                Festivo
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-[var(--surface-alt)] rounded-sm border border-[var(--surface-border)]" />
              <span className="text-[0.65rem] uppercase tracking-widest text-[var(--muted)]">
                Fin de semana
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 border-2 border-[var(--foreground)] rounded-sm" />
              <span className="text-[0.65rem] uppercase tracking-widest text-[var(--muted)]">
                Hoy
              </span>
            </div>
          </div>
        </div>
        <div className="calendar-stage">
          <AnnualCalendar holidays={allHolidays2026} />
        </div>
      </div>
    </section>
  );
}

function BridgesSection() {
  const bridges = calculateBridges(allHolidays2026).slice(0, 4);

  return (
    <section id="puentes" className="bg-[var(--surface)] px-4 py-24">
      <div className="mx-auto max-w-5xl">
        <div className="text-center mb-16">
          <h2 className="font-script text-4xl text-[var(--primary)] mb-2">
            Escapadas largas
          </h2>
          <h3 className="font-serif text-3xl sm:text-4xl">
            Los Mejores Puentes
          </h3>
          <p className="text-sm text-[var(--muted)] mt-4 max-w-md mx-auto leading-relaxed">
            Combina tus días de vacaciones con estos festivos estratégicos para
            conseguir más tiempo libre seguido.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {bridges.map((bridge, i) => {
            const location = bridge.holiday.location_id
              ? comunidades.find((c) => c.id === bridge.holiday.location_id)
              : null;

            return (
              <div
                key={`${bridge.holiday.id}-${i}`}
                className={`bridge-card animate-fade-in-up stagger-${
                  (i % 2) + 1
                }`}
              >
                <div className="bridge-card-top flex min-h-44 items-center justify-center p-6 text-center">
                  <h4 className="font-serif text-3xl leading-tight text-white">
                    {bridge.holiday.name}
                  </h4>
                </div>

                <div className="p-8 pb-10 flex-1 flex flex-col justify-between text-center">
                  <div>
                    <p className="text-xs uppercase tracking-widest text-[var(--muted)] mb-2">
                      {formatDateES(bridge.holiday.date)}
                    </p>

                    {location && (
                      <p className="text-[0.7rem] uppercase tracking-widest text-[var(--primary)] mb-6">
                        Exclusivo en {location.name}
                      </p>
                    )}

                    <div className="my-6">
                      <span className="font-serif text-6xl text-[var(--foreground)] block mb-1">
                        {bridge.total_days_free}
                      </span>
                      <span className="text-[0.65rem] uppercase tracking-widest text-[var(--muted)]">
                        días libres
                      </span>
                    </div>

                    <p className="text-sm text-[var(--foreground)] mb-8">
                      {bridge.days_off_needed === 0
                        ? "Disfruta de un fin de semana largo sin gastar días de vacaciones."
                        : `Pide ${bridge.days_off_needed} día${
                            bridge.days_off_needed > 1 ? "s" : ""
                          } en el trabajo para desbloquear este puente.`}
                    </p>
                  </div>

                  <div className="flex flex-col items-center gap-3">
                    <BookingLink
                      href={bookingSearchUrl({
                        checkin: bridge.bridge_start,
                        checkout: nextDayIso(bridge.bridge_end),
                        destination: location?.name,
                        label: "hef-home-bridges",
                      })}
                      source="home"
                      metadata={{
                        holiday_name: bridge.holiday.name,
                        holiday_date: bridge.holiday.date,
                        destination: location?.name ?? null,
                        days: bridge.total_days_free,
                      }}
                      className="btn-primary text-[0.75rem]"
                    >
                      Buscar hotel ↗
                    </BookingLink>
                    <Link
                      href="/optimizador"
                      className="text-[0.7rem] uppercase tracking-widest text-[var(--muted)] hover:text-[var(--primary)] transition-colors"
                    >
                      Optimizar vacaciones
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <Link href="/optimizador" className="btn-primary">
            Optimizar mis vacaciones
          </Link>
        </div>
      </div>
    </section>
  );
}

function OptimizerCTASection() {
  return (
    <section className="bg-[var(--ink)] px-4 py-20 text-white">
      <div className="mx-auto grid max-w-5xl items-center gap-10 md:grid-cols-[1fr_auto]">
        <div>
          <h2 className="font-script text-4xl text-[var(--primary)] mb-2">
            La herramienta
          </h2>
          <h3 className="font-serif text-4xl sm:text-5xl mb-5 text-white">
            De 10 días a más de 30 libres
          </h3>
          <p className="text-sm text-white/72 max-w-xl leading-relaxed">
            El optimizador combina festivos, fines de semana y días de
            vacaciones para mostrarte el itinerario con mejor rendimiento.
          </p>
        </div>
        <Link href="/optimizador" className="btn-primary hero-cta">
          Calcular mis días libres
        </Link>
      </div>
    </section>
  );
}

function CommunitiesSection() {
  const regions = comunidades.filter((c) => c.type === "autonomous_region");

  return (
    <section id="comunidades" className="bg-[var(--surface)] px-4 py-24">
      <div className="mx-auto max-w-6xl text-center">
        <h2 className="font-script text-4xl text-[var(--primary)] mb-2">
          Explora por
        </h2>
        <h3 className="font-serif text-3xl sm:text-4xl mb-16">
          Destinos &amp; Comunidades
        </h3>

        <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
          {regions.map((region, i) => (
            <Link
              key={region.id}
              href={`/${region.slug}`}
              className="region-chip animate-fade-in-up"
              style={{ animationDelay: `${i * 0.05}s` }}
            >
              {region.name}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function NewsletterSection() {
  return (
    <section className="section-alt border-t border-[var(--surface-border)] px-4 py-20">
      <div className="newsletter-panel mx-auto max-w-2xl text-center">
        <h2 className="font-script text-3xl text-[var(--primary)] mb-2">
          No te pierdas ningún
        </h2>
        <h3 className="font-serif text-2xl sm:text-3xl mb-4">
          Puente ni Escapada
        </h3>
        <p className="text-sm text-[var(--muted)] mb-8 max-w-md mx-auto leading-relaxed">
          Te avisamos 2 semanas antes de cada puente con las mejores ideas de
          escapada. Sin spam, solo puentes.
        </p>
        <NewsletterForm />
        <p className="text-[0.6rem] uppercase tracking-widest text-[var(--muted)] mt-4">
          Gratis · Sin spam · Cancelación inmediata
        </p>
      </div>
    </section>
  );
}

export default function Home() {
  const bridges = calculateBridges(allHolidays2026);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        name: "Hoy Es Fiesta",
        url: "https://hoyesfiesta.com",
        description:
          "Calendario de festivos en España 2026, optimizador de puentes y guía de escapadas.",
        inLanguage: "es-ES",
      },
      {
        "@type": "WebPage",
        name: "Calendario de Festivos España 2026",
        url: "https://hoyesfiesta.com",
        description: `${festivosNacionales2026.length} festivos nacionales y ${bridges.length} puentes en 2026.`,
      },
      {
        "@type": "ItemList",
        name: "Festivos nacionales España 2026",
        numberOfItems: festivosNacionales2026.length,
        itemListElement: festivosNacionales2026.map((h, idx) => ({
          "@type": "ListItem",
          position: idx + 1,
          item: {
            "@type": "Event",
            name: h.name,
            startDate: h.date,
            endDate: h.date,
            eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
            eventStatus: "https://schema.org/EventScheduled",
            location: {
              "@type": "Place",
              name: "España",
              address: { "@type": "PostalAddress", addressCountry: "ES" },
            },
          },
        })),
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HeroSection />
      <UpcomingHolidaysTimeline />
      <CalendarSection />
      <BridgesSection />
      <OptimizerCTASection />
      <CommunitiesSection />
      <NewsletterSection />
    </>
  );
}
