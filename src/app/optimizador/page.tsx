import type { Metadata } from "next";
import Link from "next/link";
import {
  allHolidays2026,
  calculateBridges,
} from "@/lib/holidays-data";
import VacationOptimizer from "../components/VacationOptimizer";

export const metadata: Metadata = {
  title: "Optimizador de Vacaciones 2026 — Maximiza tus Días Libres",
  description:
    "Descubre cómo convertir tus días de vacaciones en el máximo de días libres posibles combinándolos estratégicamente con festivos y puentes de España 2026.",
};

export default function OptimizerPage() {
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
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="pt-20 pb-16 px-4 text-center border-b border-[var(--surface-border)] bg-[var(--surface-alt)]">
        <div className="mx-auto max-w-4xl">
          <Link
            href="/"
            className="text-[0.65rem] uppercase tracking-widest text-[var(--muted)] hover:text-[var(--primary)] transition-colors mb-10 inline-block"
          >
            ← Volver al inicio
          </Link>

          <p className="font-script text-4xl text-[var(--primary)] mb-2">
            Maximiza tus
          </p>
          <h1 className="text-4xl sm:text-5xl font-serif text-[var(--foreground)] mb-6">
            Días Libres en 2026
          </h1>

          <div className="elegant-divider max-w-xs mx-auto text-[var(--muted)]">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--primary)]"></span>
          </div>

          <p className="text-sm text-[var(--muted)] mt-6 max-w-lg mx-auto leading-relaxed">
            Introduce tus días de vacaciones disponibles y te calculamos la
            combinación perfecta para que disfrutes del máximo número de días
            libres consecutivos.
          </p>
        </div>
      </section>

      {/* Optimizer */}
      <section className="py-20 px-4">
        <div className="mx-auto max-w-3xl">
          <VacationOptimizer bridges={bridgesData} />
        </div>
      </section>
    </div>
  );
}
