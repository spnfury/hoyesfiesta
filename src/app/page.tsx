import Link from "next/link";
import {
  comunidades,
  festivosNacionales2026,
  allHolidays2026,
  calculateBridges,
  formatDateES,
} from "@/lib/holidays-data";
import CountdownHero from "./components/CountdownHero";
import AnnualCalendar from "./components/AnnualCalendar";
import NewsletterForm from "./components/NewsletterForm";

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
    <section className="relative w-full bg-[var(--surface-alt)] py-20 sm:py-28 px-4 flex flex-col items-center justify-center border-b border-[var(--surface-border)] overflow-hidden">
      <div className="relative mx-auto max-w-3xl text-center z-10">
        <div className="mb-4 animate-fade-in-up">
          <span className="font-script text-5xl sm:text-6xl text-[var(--primary)] -rotate-3 inline-block">
            Escapadas perfectas
          </span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-serif text-[var(--foreground)] mb-6 animate-fade-in-up stagger-1 leading-tight">
          Calendario de Festivos <br /> España 2026
        </h1>

        <p className="text-sm tracking-widest uppercase text-[var(--muted)] mb-10 max-w-xl mx-auto animate-fade-in-up stagger-2 leading-loose">
          Descubre los días libres nacionales y autonómicos. Planifica tus
          viajes y transforma tus vacaciones en aventuras inolvidables.
        </p>

        <CountdownHero holidays={allHolidays2026} bridges={bridgesData} />
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
    <section className="py-24 px-4 bg-white">
      <div className="mx-auto max-w-3xl">
        <div className="text-center mb-16">
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
    <section className="py-24 px-4 section-alt border-y border-[var(--surface-border)]">
      <div className="mx-auto max-w-5xl">
        <div className="text-center mb-16">
          <h2 className="font-script text-4xl text-[var(--primary)] mb-2">
            Vista anual
          </h2>
          <h3 className="font-serif text-3xl sm:text-4xl">Calendario 2026</h3>
          <div className="flex items-center justify-center gap-6 mt-6">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-[var(--primary)] rounded-sm"></div>
              <span className="text-[0.65rem] uppercase tracking-widest text-[var(--muted)]">
                Festivo
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-[var(--surface-alt)] rounded-sm border border-[var(--surface-border)]"></div>
              <span className="text-[0.65rem] uppercase tracking-widest text-[var(--muted)]">
                Fin de semana
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 border-2 border-[var(--foreground)] rounded-sm"></div>
              <span className="text-[0.65rem] uppercase tracking-widest text-[var(--muted)]">
                Hoy
              </span>
            </div>
          </div>
        </div>
        <AnnualCalendar holidays={allHolidays2026} />
      </div>
    </section>
  );
}

function BridgesSection() {
  const bridges = calculateBridges(allHolidays2026).slice(0, 4);

  return (
    <section id="puentes" className="py-24 px-4 bg-white">
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
              ? comunidades.find(
                  (c) => c.id === bridge.holiday.location_id
                )
              : null;

            return (
              <div
                key={`${bridge.holiday.id}-${i}`}
                className={`bg-white border border-[var(--surface-border)] p-0 flex flex-col animate-fade-in-up stagger-${
                  (i % 2) + 1
                }`}
              >
                <div className="h-40 bg-[var(--surface-alt)] border-b border-[var(--surface-border)] flex items-center justify-center p-6 text-center">
                  <h4 className="font-serif text-2xl">
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
                      <span className="font-serif text-5xl text-[var(--foreground)] block mb-1">
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

                  <Link
                    href="/optimizador"
                    className="text-[0.75rem] uppercase tracking-widest text-[var(--primary)] hover:text-[var(--primary-hover)] border-b border-[var(--primary)] pb-1 self-center transition-colors"
                  >
                    Optimizar vacaciones
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <Link href="/optimizador" className="btn-primary">
            ✦ Optimizar mis vacaciones
          </Link>
        </div>
      </div>
    </section>
  );
}

function OptimizerCTASection() {
  return (
    <section className="py-20 px-4 section-alt border-y border-[var(--surface-border)]">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="font-script text-4xl text-[var(--primary)] mb-2">
          La herramienta
        </h2>
        <h3 className="font-serif text-3xl sm:text-4xl mb-6">
          Optimizador de Vacaciones
        </h3>
        <p className="text-sm text-[var(--muted)] mb-8 max-w-md mx-auto leading-relaxed">
          ¿Sabías que con 10 días de vacaciones puedes tener más de 30 días
          libres? Nuestro optimizador calcula la combinación perfecta por ti.
        </p>
        <Link href="/optimizador" className="btn-primary">
          Calcular mis días libres
        </Link>
      </div>
    </section>
  );
}

function CommunitiesSection() {
  const regions = comunidades.filter(
    (c) => c.type === "autonomous_region"
  );

  return (
    <section id="comunidades" className="py-24 px-4 bg-white">
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
              className="px-6 py-3 border border-[var(--surface-border)] text-[0.75rem] uppercase tracking-widest text-[var(--foreground)] hover:border-[var(--primary)] hover:text-[var(--primary)] transition-colors animate-fade-in-up"
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
    <section className="py-20 px-4 section-alt border-t border-[var(--surface-border)]">
      <div className="mx-auto max-w-2xl text-center">
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
  return (
    <>
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
