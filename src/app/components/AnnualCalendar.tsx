"use client";

import { useState } from "react";

interface Holiday {
  id: string;
  date: string;
  name: string;
  scope: "national" | "regional" | "local";
  location_id: string | null;
}

interface AnnualCalendarProps {
  holidays: Holiday[];
}

function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number): number {
  const day = new Date(year, month, 1).getDay();
  // Convert Sunday=0 to Monday-based (0=Mon, 6=Sun)
  return day === 0 ? 6 : day - 1;
}

const MONTH_NAMES = [
  "Ene", "Feb", "Mar", "Abr", "May", "Jun",
  "Jul", "Ago", "Sep", "Oct", "Nov", "Dic",
];

const DAY_NAMES = ["L", "M", "X", "J", "V", "S", "D"];

export default function AnnualCalendar({ holidays }: AnnualCalendarProps) {
  const [hoveredDay, setHoveredDay] = useState<{
    month: number;
    day: number;
    name: string;
  } | null>(null);

  const year = 2026;
  const todayStr = new Date().toISOString().split("T")[0];

  // Create holiday lookup
  const holidayMap = new Map<string, string>();
  for (const h of holidays) {
    holidayMap.set(h.date, h.name);
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
      {Array.from({ length: 12 }, (_, monthIdx) => {
        const daysInMonth = getDaysInMonth(year, monthIdx);
        const firstDay = getFirstDayOfMonth(year, monthIdx);

        return (
          <div key={monthIdx}>
            <h4 className="font-serif text-base mb-2 text-center">
              {MONTH_NAMES[monthIdx]}
            </h4>
            {/* Day names header */}
            <div className="calendar-grid mb-1">
              {DAY_NAMES.map((d) => (
                <div
                  key={d}
                  className="text-[0.55rem] text-center text-[var(--muted)] uppercase"
                >
                  {d}
                </div>
              ))}
            </div>
            {/* Days */}
            <div className="calendar-grid">
              {/* Empty cells before first day */}
              {Array.from({ length: firstDay }, (_, i) => (
                <div key={`empty-${i}`} className="calendar-day empty" />
              ))}
              {/* Actual days */}
              {Array.from({ length: daysInMonth }, (_, i) => {
                const day = i + 1;
                const dateStr = `${year}-${String(monthIdx + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
                const dayOfWeek = (firstDay + i) % 7; // 0=Mon, 6=Sun
                const isWeekend = dayOfWeek >= 5;
                const holidayName = holidayMap.get(dateStr);
                const isHoliday = !!holidayName;
                const isToday = dateStr === todayStr;

                const isHovered =
                  hoveredDay?.month === monthIdx && hoveredDay?.day === day;

                let className = "calendar-day";
                if (isHoliday) className += " holiday";
                else if (isWeekend) className += " weekend";
                if (isToday) className += " today";

                return (
                  <div
                    key={day}
                    className={className}
                    onMouseEnter={() =>
                      isHoliday
                        ? setHoveredDay({ month: monthIdx, day, name: holidayName! })
                        : undefined
                    }
                    onMouseLeave={() => setHoveredDay(null)}
                  >
                    {day}
                    {isHovered && (
                      <div className="calendar-tooltip">{hoveredDay.name}</div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
