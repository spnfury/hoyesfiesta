import Link from "next/link";
import {
  comunidades,
  festivosNacionales2026,
  allHolidays2026,
  calculateBridges,
  formatDateES,
} from "@/lib/holidays-data";

function HeroSection() {
  const today = new Date().toISOString().split("T")[0];
  const todayHolidays = allHolidays2026.filter((h) => h.date === today);
  const isHoliday = todayHolidays.length > 0;

  return (
    <section className="relative w-full bg-[var(--surface-alt)] py-24 sm:py-32 px-4 flex flex-col items-center justify-center border-b border-[var(--surface-border)] overflow-hidden">
      {/* Decorative background element, like a subtle map or image could go here. Keeping it ultra clean for now. */}
      
      <div className="relative mx-auto max-w-3xl text-center z-10">
        <div className="mb-4 animate-fade-in-up">
          <span className="font-script text-5xl sm:text-6xl text-[var(--primary)] -rotate-3 inline-block">
            Escapadas perfectas
          </span>
        </div>
        
        <h1 className="text-4xl sm:text-6xl font-serif text-[var(--foreground)] mb-6 animate-fade-in-up stagger-1 leading-tight">
          Calendario de Festivos <br/> España 2026
        </h1>

        <p className="text-sm tracking-widest uppercase text-[var(--muted)] mb-10 max-w-xl mx-auto animate-fade-in-up stagger-2 leading-loose">
          Descubre los días libres nacionales y autonómicos. 
          Planifica tus viajes y transforma tus vacaciones en aventuras inolvidables.
        </p>

        <div className="bg-white p-6 inline-flex flex-col sm:flex-row items-center gap-6 shadow-sm border border-[var(--surface-border)] animate-fade-in-up stagger-3">
          <div className="text-left">
            <p className="text-xs uppercase tracking-widest text-[var(--muted)] mb-1">Estado de hoy</p>
            <p className="font-serif text-xl">
              {isHoliday ? (
                <span className="text-[var(--primary)]">{todayHolidays[0].name} (¡Festivo!)</span>
              ) : (
                "Hoy es un día laborable general"
              )}
            </p>
          </div>
          <div className="hidden sm:block w-px h-10 bg-[var(--surface-border)]"></div>
          <a href="#puentes" className="btn-primary whitespace-nowrap">
            Ver Mejores Puentes
          </a>
        </div>
      </div>
    </section>
  );
}

function NationalHolidaysSection() {
  return (
    <section className="py-24 px-4 bg-white">
      <div className="mx-auto max-w-5xl">
        <div className="text-center mb-16">
          <h2 className="font-script text-4xl text-[var(--primary)] mb-2">Fechas clave</h2>
          <h3 className="font-serif text-3xl sm:text-4xl">Festivos Nacionales</h3>
          <div className="elegant-divider max-w-xs mx-auto text-[var(--muted)] mt-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--primary)]"></span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {festivosNacionales2026.map((holiday, i) => (
            <div
              key={holiday.id}
              className={`elegant-card p-8 text-center animate-fade-in-up stagger-${
                (i % 3) + 1
              }`}
            >
              <p className="text-xs uppercase tracking-widest text-[var(--primary)] mb-3">
                {formatDateES(holiday.date).split(',')[0]} {/* Just the weekday logic could go here, simulating */}
                {holiday.date.split('-')[2]} / {holiday.date.split('-')[1]}
              </p>
              <h4 className="font-serif text-xl mb-4">{holiday.name}</h4>
              <span className="badge-national px-3 py-1">Nacional</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function BridgesSection() {
  const bridges = calculateBridges(allHolidays2026).slice(0, 4);

  return (
    <section id="puentes" className="py-24 px-4 section-alt">
      <div className="mx-auto max-w-5xl">
        <div className="text-center mb-16">
          <h2 className="font-script text-4xl text-[var(--primary)] mb-2">Escapadas largas</h2>
          <h3 className="font-serif text-3xl sm:text-4xl">Los Mejores Puentes</h3>
          <p className="text-sm text-[var(--muted)] mt-4 max-w-md mx-auto leading-relaxed">
            Combina tus días de vacaciones con estos festivos estratégicos para conseguir más tiempo libre seguido.
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
                className={`bg-white border border-[var(--surface-border)] p-0 flex flex-col animate-fade-in-up stagger-${
                  (i % 2) + 1
                }`}
              >
                {/* Simulated Image Header for the card to look like a blog post */}
                <div className="h-40 bg-[var(--surface-alt)] border-b border-[var(--surface-border)] flex items-center justify-center p-6 text-center">
                   <h4 className="font-serif text-2xl">{bridge.holiday.name}</h4>
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
                      <span className="text-[0.65rem] uppercase tracking-widest text-[var(--muted)]">días libres</span>
                    </div>

                    <p className="text-sm text-[var(--foreground)] mb-8">
                      {bridge.days_off_needed === 0 
                        ? "Disfruta de un fin de semana largo sin gastar días de vacaciones." 
                        : `Pide ${bridge.days_off_needed} día${bridge.days_off_needed > 1 ? 's' : ''} en el trabajo para desbloquear este puente.`}
                    </p>
                  </div>
                  
                  <a href="#" className="text-[0.75rem] uppercase tracking-widest text-[var(--primary)] hover:text-[var(--primary-hover)] border-b border-[var(--primary)] pb-1 self-center transition-colors">
                    Planificar viaje
                  </a>
                </div>
              </div>
            );
          })}
        </div>
        
        <div className="text-center mt-12">
           <button className="btn-outline">Ver todos los puentes</button>
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
    <section id="comunidades" className="py-24 px-4 bg-white">
      <div className="mx-auto max-w-6xl text-center">
        <h2 className="font-script text-4xl text-[var(--primary)] mb-2">Explora por</h2>
        <h3 className="font-serif text-3xl sm:text-4xl mb-16">Destinos & Comunidades</h3>
        
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

export default function Home() {
  return (
    <>
      <HeroSection />
      <NationalHolidaysSection />
      <BridgesSection />
      <CommunitiesSection />
    </>
  );
}
