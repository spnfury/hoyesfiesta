import Link from "next/link";
import {
  comunidades,
  festivosNacionales2026,
  allHolidays2026,
  calculateBridges,
  formatDateES,
} from "@/lib/holidays-data";

function TodayHero() {
  const today = new Date().toISOString().split("T")[0];
  const todayHolidays = allHolidays2026.filter((h) => h.date === today);
  const isHoliday = todayHolidays.length > 0;

  return (
    <section className="relative overflow-hidden py-20 sm:py-28 px-4">
      {/* Background gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[var(--primary)] opacity-10 rounded-full blur-[128px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[var(--accent)] opacity-10 rounded-full blur-[128px] pointer-events-none" />

      <div className="relative mx-auto max-w-4xl text-center">
        <div
          className={`inline-flex items-center gap-3 px-6 py-3 rounded-full mb-8 animate-fade-in-up ${
            isHoliday
              ? "bg-[var(--success)]/20 border border-[var(--success)]/30"
              : "bg-[var(--surface)] border border-[var(--surface-border)]"
          }`}
        >
          <span className="text-3xl">{isHoliday ? "🎉" : "💼"}</span>
          <span className="text-lg font-semibold">
            {isHoliday
              ? `¡Hoy es fiesta! — ${todayHolidays[0].name}`
              : "Hoy no es festivo en España"}
          </span>
        </div>

        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6 animate-fade-in-up stagger-1">
          <span className="gradient-text">Calendario de Festivos</span>
          <br />
          <span className="text-[var(--foreground)]">España 2026</span>
        </h1>

        <p className="text-lg sm:text-xl text-[var(--muted)] max-w-2xl mx-auto mb-10 animate-fade-in-up stagger-2">
          Descubre todos los festivos nacionales, autonómicos y locales.
          Encuentra los mejores{" "}
          <span className="text-[var(--accent)] font-semibold">puentes</span>{" "}
          para maximizar tus vacaciones.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up stagger-3">
          <a
            href="#puentes"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-[var(--primary)] to-[var(--primary-dark)] text-white font-semibold text-lg hover:opacity-90 transition-all pulse-glow"
          >
            🌉 Ver Mejores Puentes
          </a>
          <a
            href="#comunidades"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-[var(--surface)] border border-[var(--surface-border)] text-[var(--foreground)] font-semibold text-lg hover:border-[var(--primary)] transition-all"
          >
            📍 Buscar por Comunidad
          </a>
        </div>
      </div>
    </section>
  );
}

function NationalHolidaysSection() {
  return (
    <section className="py-16 px-4">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4">
          🇪🇸 Festivos <span className="gradient-text">Nacionales</span> 2026
        </h2>
        <p className="text-center text-[var(--muted)] mb-12 max-w-xl mx-auto">
          Los 10 días festivos que aplican en todo el territorio español
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {festivosNacionales2026.map((holiday, i) => (
            <div
              key={holiday.id}
              className={`glass-card p-5 animate-fade-in-up stagger-${
                (i % 5) + 1
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm text-[var(--muted)] mb-1">
                    {formatDateES(holiday.date)}
                  </p>
                  <h3 className="font-semibold text-lg">{holiday.name}</h3>
                </div>
                <span className="badge-national text-xs px-2.5 py-1 rounded-full font-medium whitespace-nowrap">
                  Nacional
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function BridgesSection() {
  const bridges = calculateBridges(allHolidays2026).slice(0, 8);

  return (
    <section id="puentes" className="py-16 px-4 bg-[var(--surface)]/50">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4">
          🌉 Los Mejores{" "}
          <span className="gradient-text">Puentes</span> de 2026
        </h2>
        <p className="text-center text-[var(--muted)] mb-4 max-w-2xl mx-auto">
          Maximiza tus vacaciones. Te mostramos cuántos días libres puedes
          conseguir pidiendo el mínimo de días en el trabajo.
        </p>
        <p className="text-center text-sm text-[var(--accent)] mb-12">
          💡 ¿Sabías que con solo 8 días de vacaciones puedes conseguir hasta 30
          días libres?
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {bridges.map((bridge, i) => {
            const location = bridge.holiday.location_id
              ? comunidades.find((c) => c.id === bridge.holiday.location_id)
              : null;

            return (
              <div
                key={`${bridge.holiday.id}-${i}`}
                className={`glass-card bridge-card p-6 animate-fade-in-up stagger-${
                  (i % 5) + 1
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-bold text-lg mb-1">
                      {bridge.holiday.name}
                    </h3>
                    <p className="text-sm text-[var(--muted)]">
                      {formatDateES(bridge.holiday.date)}
                    </p>
                    {location && (
                      <Link
                        href={`/${location.slug}`}
                        className="text-xs text-[var(--primary-light)] hover:underline mt-1 inline-block"
                      >
                        📍 {location.name}
                      </Link>
                    )}
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-black text-[var(--accent)]">
                      {bridge.total_days_free}
                    </div>
                    <div className="text-xs text-[var(--muted)]">
                      días libres
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-4 border-t border-[var(--surface-border)]">
                  {bridge.days_off_needed === 0 ? (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[var(--success)]/20 text-[var(--success)] text-sm font-medium">
                      ✨ ¡Gratis! No necesitas pedir días
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[var(--primary)]/20 text-[var(--primary-light)] text-sm font-medium">
                      📝 Pide {bridge.days_off_needed} día
                      {bridge.days_off_needed > 1 ? "s" : ""} → Consigues{" "}
                      {bridge.total_days_free}
                    </span>
                  )}
                </div>

                {/* Affiliate CTA */}
                <div className="mt-4 p-3 rounded-xl bg-[var(--accent)]/10 border border-[var(--accent)]/20">
                  <p className="text-sm text-[var(--accent-light)] font-medium">
                    ✈️ Aprovecha este puente:{" "}
                    <span className="underline cursor-pointer hover:text-[var(--accent)]">
                      Busca vuelos baratos para estas fechas
                    </span>
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function CommunitiesSection() {
  const regions = comunidades.filter(
    (c) => c.type === "autonomous_region"
  );

  return (
    <section id="comunidades" className="py-16 px-4">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4">
          📍 Festivos por{" "}
          <span className="gradient-text">Comunidad Autónoma</span>
        </h2>
        <p className="text-center text-[var(--muted)] mb-12 max-w-xl mx-auto">
          Cada comunidad tiene sus propios festivos autonómicos. Selecciona la
          tuya para ver el calendario completo.
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {regions.map((region, i) => (
            <Link
              key={region.id}
              href={`/${region.slug}`}
              className={`glass-card p-4 text-center group animate-fade-in-up stagger-${
                (i % 5) + 1
              }`}
            >
              <h3 className="font-semibold text-sm sm:text-base group-hover:text-[var(--primary-light)] transition-colors">
                {region.name}
              </h3>
              <p className="text-xs text-[var(--muted)] mt-1">
                Ver festivos →
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function APISection() {
  return (
    <section className="py-16 px-4 bg-[var(--surface)]/50">
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">
          🛠️ <span className="gradient-text">API para Desarrolladores</span>
        </h2>
        <p className="text-[var(--muted)] mb-8 max-w-xl mx-auto">
          ¿Necesitas saber si una fecha es festivo desde tu software? Integra
          nuestra API REST en tu aplicación de RRHH, logística o e-commerce.
        </p>

        <div className="glass-card p-6 text-left mb-8">
          <p className="text-xs text-[var(--muted)] mb-2 font-mono">
            GET /api/v1/holidays
          </p>
          <pre className="bg-[var(--background)] rounded-xl p-4 overflow-x-auto text-sm font-mono text-[var(--primary-light)]">
{`curl "https://hoyesfiesta.com/api/v1/holidays?date=2026-05-01&location=MD"

// Response:
{
  "date": "2026-05-01",
  "is_holiday": true,
  "holidays": [
    {
      "name": "Día del Trabajador",
      "scope": "national",
      "location": "España (Nacional)"
    }
  ]
}`}
          </pre>
        </div>

        <Link
          href="/api/v1/holidays?date=2026-12-25"
          target="_blank"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[var(--primary)] text-white font-semibold hover:opacity-90 transition-all"
        >
          Probar API en vivo →
        </Link>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <TodayHero />
      <NationalHolidaysSection />
      <BridgesSection />
      <CommunitiesSection />
      <APISection />
    </>
  );
}
