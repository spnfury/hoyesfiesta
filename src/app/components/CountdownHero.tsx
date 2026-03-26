"use client";

import { useState, useEffect, useMemo } from "react";

interface Holiday {
  id: string;
  date: string;
  name: string;
  scope: "national" | "regional" | "local";
  location_id: string | null;
  is_replaceable: boolean;
}

interface Bridge {
  holidayName: string;
  holidayDate: string;
  totalDaysFree: number;
  daysOffNeeded: number;
  bridgeStart: string;
  bridgeEnd: string;
}

interface CountdownHeroProps {
  holidays: Holiday[];
  bridges: Bridge[];
}

function getNextHoliday(holidays: Holiday[]): Holiday | null {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const todayStr = today.toISOString().split("T")[0];

  const future = holidays
    .filter((h) => h.date >= todayStr)
    .sort((a, b) => a.date.localeCompare(b.date));

  return future[0] || null;
}

function getNextBridge(bridges: Bridge[]): Bridge | null {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const todayStr = today.toISOString().split("T")[0];

  const future = bridges
    .filter((b) => b.holidayDate >= todayStr)
    .sort((a, b) => a.holidayDate.localeCompare(b.holidayDate));

  return future[0] || null;
}

function getDaysUntil(dateStr: string): number {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const target = new Date(dateStr + "T00:00:00");
  return Math.ceil((target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
}

function formatDateShort(dateStr: string): string {
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("es-ES", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });
}

function isHolidayToday(holidays: Holiday[]): Holiday | null {
  const today = new Date().toISOString().split("T")[0];
  return holidays.find((h) => h.date === today) || null;
}

export default function CountdownHero({ holidays, bridges }: CountdownHeroProps) {
  const [now, setNow] = useState<Date>(new Date());
  const [searchDate, setSearchDate] = useState("");
  const [searchResult, setSearchResult] = useState<{
    isHoliday: boolean;
    holidays: Holiday[];
    nearestBridge: Bridge | null;
  } | null>(null);

  // Update countdown timer every minute
  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 60000);
    return () => clearInterval(interval);
  }, []);

  const todayHoliday = useMemo(() => isHolidayToday(holidays), [holidays]);
  const nextHoliday = useMemo(() => getNextHoliday(holidays), [holidays]);
  const nextBridge = useMemo(() => getNextBridge(bridges), [bridges]);

  const daysToNextHoliday = nextHoliday ? getDaysUntil(nextHoliday.date) : null;
  const daysToNextBridge = nextBridge ? getDaysUntil(nextBridge.holidayDate) : null;

  function handleSearch() {
    if (!searchDate) return;

    const matchingHolidays = holidays.filter((h) => h.date === searchDate);
    const isHol = matchingHolidays.length > 0;

    // Find nearest bridge after search date
    const futureBridges = bridges
      .filter((b) => b.holidayDate >= searchDate)
      .sort((a, b) => a.holidayDate.localeCompare(b.holidayDate));

    setSearchResult({
      isHoliday: isHol,
      holidays: matchingHolidays,
      nearestBridge: futureBridges[0] || null,
    });
  }

  function clearSearch() {
    setSearchDate("");
    setSearchResult(null);
  }

  return (
    <div className="animate-fade-in-up stagger-2 w-full max-w-2xl mx-auto">
      {/* Estado de hoy + Cuenta atrás */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        {/* Hoy */}
        <div className="countdown-card">
          <p className="countdown-label">Hoy</p>
          {todayHoliday ? (
            <>
              <p className="countdown-value text-[var(--primary)]">¡Festivo!</p>
              <p className="countdown-detail">{todayHoliday.name}</p>
            </>
          ) : (
            <>
              <p className="countdown-value">Laborable</p>
              {daysToNextHoliday !== null && daysToNextHoliday > 0 && nextHoliday && (
                <p className="countdown-detail">
                  Próximo festivo en <strong>{daysToNextHoliday} días</strong>
                </p>
              )}
            </>
          )}
        </div>

        {/* Próximo puente */}
        <div className="countdown-card">
          <p className="countdown-label">Próximo puente</p>
          {nextBridge && daysToNextBridge !== null ? (
            <>
              <div className="flex items-baseline justify-center gap-1">
                <span className="countdown-number">{daysToNextBridge}</span>
                <span className="text-[0.65rem] uppercase tracking-widest text-[var(--muted)]">
                  días
                </span>
              </div>
              <p className="countdown-detail">
                {nextBridge.holidayName} · {nextBridge.totalDaysFree} días libres
              </p>
            </>
          ) : (
            <p className="countdown-value text-sm">No hay más puentes este año</p>
          )}
        </div>
      </div>

      {/* Buscador */}
      <div className="search-widget">
        <p className="text-[0.7rem] uppercase tracking-widest text-[var(--muted)] mb-3">
          ¿Es festivo el...?
        </p>
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <input
            type="date"
            value={searchDate}
            onChange={(e) => {
              setSearchDate(e.target.value);
              setSearchResult(null);
            }}
            min="2026-01-01"
            max="2026-12-31"
            className="date-input"
          />
          <button onClick={handleSearch} className="btn-primary text-sm py-2 px-6">
            Consultar
          </button>
          {searchResult && (
            <button
              onClick={clearSearch}
              className="text-[0.7rem] uppercase tracking-widest text-[var(--muted)] hover:text-[var(--primary)] transition-colors"
            >
              Limpiar
            </button>
          )}
        </div>

        {/* Resultado */}
        {searchResult && (
          <div className="mt-4 pt-4 border-t border-[var(--surface-border)] animate-fade-in-up">
            {searchResult.isHoliday ? (
              <div className="text-center">
                <span className="inline-block text-[var(--primary)] mb-1 text-lg">✓</span>
                <p className="font-serif text-xl mb-1">
                  ¡Sí, es festivo!
                </p>
                <p className="text-sm text-[var(--muted)]">
                  {searchResult.holidays.map((h) => h.name).join(", ")} —{" "}
                  {formatDateShort(searchDate)}
                </p>
              </div>
            ) : (
              <div className="text-center">
                <span className="inline-block text-[var(--muted)] mb-1 text-lg">✗</span>
                <p className="font-serif text-xl mb-1">
                  No, es laborable
                </p>
                <p className="text-sm text-[var(--muted)]">
                  {formatDateShort(searchDate)}
                </p>
                {searchResult.nearestBridge && (
                  <p className="text-sm text-[var(--primary)] mt-2">
                    Puente más cercano: {searchResult.nearestBridge.holidayName} (
                    {searchResult.nearestBridge.totalDaysFree} días libres)
                  </p>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
