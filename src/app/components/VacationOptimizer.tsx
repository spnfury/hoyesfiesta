"use client";

import { useState, useMemo } from "react";

interface Holiday {
  id: string;
  date: string;
  name: string;
  scope: "national" | "regional" | "local";
  location_id: string | null;
}

interface Bridge {
  holidayName: string;
  holidayDate: string;
  totalDaysFree: number;
  daysOffNeeded: number;
  bridgeStart: string;
  bridgeEnd: string;
}

interface OptimizerProps {
  bridges: Bridge[];
}

function formatDateShort(dateStr: string): string {
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("es-ES", {
    day: "numeric",
    month: "short",
  });
}

function formatDateFull(dateStr: string): string {
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("es-ES", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });
}

export default function VacationOptimizer({ bridges }: OptimizerProps) {
  const [vacationDays, setVacationDays] = useState(10);
  const [selectedBridges, setSelectedBridges] = useState<Set<number>>(new Set());

  // Sort bridges by efficiency (most days free per day off needed)
  const sortedBridges = useMemo(() => {
    return [...bridges]
      .filter((b) => b.daysOffNeeded > 0) // Only bridges that need vacation days
      .sort((a, b) => {
        const effA = a.totalDaysFree / (a.daysOffNeeded || 1);
        const effB = b.totalDaysFree / (b.daysOffNeeded || 1);
        return effB - effA;
      });
  }, [bridges]);

  // Free bridges (weekends + holiday, no vacation days needed)
  const freeBridges = useMemo(() => {
    return bridges.filter((b) => b.daysOffNeeded === 0);
  }, [bridges]);

  // Auto-optimize: greedily pick best bridges until vacation days run out
  const optimizedSelection = useMemo(() => {
    const selected = new Set<number>();
    let remaining = vacationDays;

    for (let i = 0; i < sortedBridges.length; i++) {
      if (sortedBridges[i].daysOffNeeded <= remaining) {
        selected.add(i);
        remaining -= sortedBridges[i].daysOffNeeded;
      }
    }
    return selected;
  }, [sortedBridges, vacationDays]);

  // Use optimized selection by default, or user selection
  const activeSelection = selectedBridges.size > 0 ? selectedBridges : optimizedSelection;

  const totalVacationDaysUsed = Array.from(activeSelection).reduce(
    (sum, idx) => sum + sortedBridges[idx].daysOffNeeded,
    0
  );

  const totalFreeDays =
    freeBridges.reduce((sum, b) => sum + b.totalDaysFree, 0) +
    Array.from(activeSelection).reduce(
      (sum, idx) => sum + sortedBridges[idx].totalDaysFree,
      0
    );

  // Regular weekends (52 weeks × 2 - already counted in bridges)
  const baseWeekendDays = 104;
  const totalMaxFreeDays = baseWeekendDays + totalFreeDays;

  function toggleBridge(idx: number) {
    const newSelected = new Set(activeSelection);
    if (newSelected.has(idx)) {
      newSelected.delete(idx);
    } else {
      // Check if adding this bridge exceeds vacation days
      const newTotal = totalVacationDaysUsed - (activeSelection.has(idx) ? sortedBridges[idx].daysOffNeeded : 0) + sortedBridges[idx].daysOffNeeded;
      if (newTotal <= vacationDays) {
        newSelected.add(idx);
      }
    }
    setSelectedBridges(newSelected);
  }

  function resetToOptimal() {
    setSelectedBridges(new Set());
  }

  return (
    <div className="animate-fade-in-up">
      {/* Input section */}
      <div className="text-center mb-16">
        <p className="text-[0.7rem] uppercase tracking-widest text-[var(--muted)] mb-6">
          ¿Cuántos días de vacaciones te quedan?
        </p>
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={() => setVacationDays(Math.max(1, vacationDays - 1))}
            className="btn-outline py-2 px-4 text-lg"
          >
            −
          </button>
          <input
            type="number"
            value={vacationDays}
            onChange={(e) => {
              const v = parseInt(e.target.value);
              if (!isNaN(v) && v >= 1 && v <= 50) setVacationDays(v);
            }}
            className="optimizer-input"
            min={1}
            max={50}
          />
          <button
            onClick={() => setVacationDays(Math.min(50, vacationDays + 1))}
            className="btn-outline py-2 px-4 text-lg"
          >
            +
          </button>
        </div>
        <p className="text-sm text-[var(--muted)] mt-3">días de vacaciones</p>
      </div>

      {/* Big result */}
      <div className="optimizer-card text-center mb-12">
        <p className="text-[0.65rem] uppercase tracking-widest text-[var(--muted)] mb-2">
          Resultado
        </p>
        <p className="font-serif text-lg mb-4">
          Con <strong>{vacationDays}</strong> días de vacaciones puedes conseguir
        </p>
        <div className="flex items-baseline justify-center gap-3 mb-2">
          <span className="font-serif text-7xl font-bold text-[var(--primary)]">
            {totalFreeDays}
          </span>
          <span className="text-[0.7rem] uppercase tracking-widest text-[var(--muted)]">
            días libres
          </span>
        </div>
        <p className="text-sm text-[var(--muted)]">
          combinando estratégicamente festivos y puentes
        </p>
        <div className="elegant-divider max-w-xs mx-auto mt-6 mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--primary)]"></span>
        </div>
        <div className="flex justify-center gap-8 text-center">
          <div>
            <span className="block font-serif text-2xl">{totalVacationDaysUsed}</span>
            <span className="text-[0.6rem] uppercase tracking-widest text-[var(--muted)]">
              vacaciones usadas
            </span>
          </div>
          <div className="w-px h-10 bg-[var(--surface-border)] my-auto"></div>
          <div>
            <span className="block font-serif text-2xl">
              {vacationDays - totalVacationDaysUsed}
            </span>
            <span className="text-[0.6rem] uppercase tracking-widest text-[var(--muted)]">
              días sobrantes
            </span>
          </div>
          <div className="w-px h-10 bg-[var(--surface-border)] my-auto"></div>
          <div>
            <span className="block font-serif text-2xl">{activeSelection.size + freeBridges.length}</span>
            <span className="text-[0.6rem] uppercase tracking-widest text-[var(--muted)]">
              puentes totales
            </span>
          </div>
        </div>
      </div>

      {/* Free bridges */}
      {freeBridges.length > 0 && (
        <div className="mb-12">
          <h3 className="font-serif text-xl mb-1">Puentes gratis</h3>
          <p className="text-sm text-[var(--muted)] mb-4">
            Estos ya los tienes sin gastar vacaciones
          </p>
          <div className="space-y-2">
            {freeBridges.map((bridge, i) => (
              <div key={`free-${i}`} className="optimizer-result-card selected">
                <div className="text-left">
                  <p className="font-medium text-sm">{bridge.holidayName}</p>
                  <p className="text-[0.7rem] text-[var(--muted)]">
                    {formatDateFull(bridge.holidayDate)}
                  </p>
                </div>
                <div className="text-right">
                  <span className="font-serif text-2xl">{bridge.totalDaysFree}</span>
                  <span className="text-[0.6rem] uppercase tracking-widest text-[var(--muted)] block">
                    días libres
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Optimizable bridges */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-serif text-xl mb-1">Puentes recomendados</h3>
            <p className="text-sm text-[var(--muted)]">
              Selecciona los que prefieras o usa nuestra recomendación óptima
            </p>
          </div>
          {selectedBridges.size > 0 && (
            <button
              onClick={resetToOptimal}
              className="text-[0.7rem] uppercase tracking-widest text-[var(--primary)] hover:text-[var(--primary-hover)] transition-colors"
            >
              Restablecer recomendación
            </button>
          )}
        </div>
        <div className="space-y-2">
          {sortedBridges.map((bridge, i) => {
            const isSelected = activeSelection.has(i);
            const efficiency = bridge.totalDaysFree / bridge.daysOffNeeded;
            const canAfford =
              !isSelected &&
              totalVacationDaysUsed + bridge.daysOffNeeded <= vacationDays;

            return (
              <button
                key={`opt-${i}`}
                onClick={() => toggleBridge(i)}
                disabled={!isSelected && !canAfford}
                className={`optimizer-result-card w-full text-left ${
                  isSelected ? "selected" : ""
                } ${!isSelected && !canAfford ? "opacity-40 cursor-not-allowed" : "cursor-pointer"}`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-5 h-5 border flex items-center justify-center flex-shrink-0 ${
                      isSelected
                        ? "border-[var(--primary)] bg-[var(--primary)] text-white"
                        : "border-[var(--surface-border)]"
                    }`}
                  >
                    {isSelected && "✓"}
                  </div>
                  <div>
                    <p className="font-medium text-sm">{bridge.holidayName}</p>
                    <p className="text-[0.7rem] text-[var(--muted)]">
                      {formatDateShort(bridge.bridgeStart)} → {formatDateShort(bridge.bridgeEnd)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-center">
                    <span className="font-serif text-lg">{bridge.daysOffNeeded}</span>
                    <span className="text-[0.55rem] uppercase tracking-widest text-[var(--muted)] block">
                      pides
                    </span>
                  </div>
                  <div className="text-center">
                    <span className="font-serif text-xl text-[var(--primary)]">
                      {bridge.totalDaysFree}
                    </span>
                    <span className="text-[0.55rem] uppercase tracking-widest text-[var(--muted)] block">
                      libres
                    </span>
                  </div>
                  <div className="hidden sm:block text-center">
                    <span className="text-[0.65rem] uppercase tracking-widest text-[var(--primary)]">
                      ×{efficiency.toFixed(1)}
                    </span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
