import { headers } from "next/headers";
import { timingSafeEqual } from "node:crypto";
import { getSupabaseAdmin } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata = {
  title: "Admin · KPIs",
  robots: { index: false, follow: false },
};

interface SubscriberRow {
  id: string;
  source: string | null;
  created_at: string;
}

interface EventRow {
  id: number;
  source: string | null;
  metadata: Record<string, unknown> | null;
  created_at: string;
  pathname: string | null;
}

const DAY_MS = 1000 * 60 * 60 * 24;

function isoDaysAgo(days: number, fromMs = Date.now()): string {
  return new Date(fromMs - days * DAY_MS).toISOString();
}

function dateKey(iso: string): string {
  return iso.slice(0, 10);
}

function safeEqual(a: string, b: string): boolean {
  const ab = Buffer.from(a, "utf8");
  const bb = Buffer.from(b, "utf8");
  if (ab.length !== bb.length) {
    timingSafeEqual(ab, ab);
    return false;
  }
  return timingSafeEqual(ab, bb);
}

async function isAuthorized(): Promise<boolean> {
  const password = process.env.ADMIN_PASSWORD;
  if (!password) return false;

  const username = process.env.ADMIN_USERNAME ?? "admin";
  const h = await headers();
  const auth = h.get("authorization") ?? "";
  if (!auth.startsWith("Basic ")) return false;

  let decoded: string;
  try {
    decoded = Buffer.from(auth.slice(6), "base64").toString("utf8");
  } catch {
    return false;
  }
  const sep = decoded.indexOf(":");
  if (sep === -1) return false;

  return (
    safeEqual(decoded.slice(0, sep), username) &&
    safeEqual(decoded.slice(sep + 1), password)
  );
}

export default async function AdminPage() {
  const nowMs = new Date().getTime();

  if (!(await isAuthorized())) {
    return (
      <main className="mx-auto max-w-md p-12 text-center">
        <h1 className="font-serif text-2xl mb-2">No autorizado</h1>
        <p className="text-sm text-[var(--muted)]">
          Configura ADMIN_PASSWORD en el entorno y vuelve a intentarlo.
        </p>
      </main>
    );
  }

  const supabase = getSupabaseAdmin();
  const since30 = isoDaysAgo(30, nowMs);

  const [
    subsTotalRes,
    subsLast7Res,
    subsLast30Res,
    clicksTotalRes,
    clicksLast30Res,
  ] = await Promise.all([
    supabase.from("subscribers").select("id", { count: "exact", head: true }),
    supabase
      .from("subscribers")
      .select("id", { count: "exact", head: true })
      .gte("created_at", isoDaysAgo(7, nowMs)),
    supabase
      .from("subscribers")
      .select<"id, source, created_at", SubscriberRow>("id, source, created_at")
      .gte("created_at", since30)
      .order("created_at", { ascending: false }),
    supabase
      .from("events")
      .select("id", { count: "exact", head: true })
      .eq("event_type", "booking_click"),
    supabase
      .from("events")
      .select<
        "id, source, metadata, created_at, pathname",
        EventRow
      >("id, source, metadata, created_at, pathname")
      .eq("event_type", "booking_click")
      .gte("created_at", since30)
      .order("created_at", { ascending: false })
      .limit(5000),
  ]);

  const subsTotal = subsTotalRes.count ?? 0;
  const subsLast7 = subsLast7Res.count ?? 0;
  const subsLast30Rows = subsLast30Res.data ?? [];
  const subsLast30 = subsLast30Rows.length;

  const clicksTotal = clicksTotalRes.count ?? 0;
  const clicksRows = clicksLast30Res.data ?? [];
  const clicksLast30 = clicksRows.length;
  const clicksLast7 = clicksRows.filter(
    (e) => e.created_at >= isoDaysAgo(7, nowMs),
  ).length;

  // Suscriptores por source (últimos 30d)
  const subsBySource = new Map<string, number>();
  for (const s of subsLast30Rows) {
    const k = s.source ?? "unknown";
    subsBySource.set(k, (subsBySource.get(k) ?? 0) + 1);
  }

  // Clicks por source (últimos 30d)
  const clicksBySource = new Map<string, number>();
  for (const e of clicksRows) {
    const k = e.source ?? "unknown";
    clicksBySource.set(k, (clicksBySource.get(k) ?? 0) + 1);
  }

  // Top puentes que convierten (últimos 30d)
  const clicksByHoliday = new Map<string, number>();
  for (const e of clicksRows) {
    const name =
      typeof e.metadata?.holiday_name === "string"
        ? e.metadata.holiday_name
        : "(sin nombre)";
    clicksByHoliday.set(name, (clicksByHoliday.get(name) ?? 0) + 1);
  }
  const topHolidays = Array.from(clicksByHoliday.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8);

  // Timeline diario últimos 30d
  const dailySubs = new Map<string, number>();
  const dailyClicks = new Map<string, number>();
  for (let i = 29; i >= 0; i--) {
    const k = dateKey(new Date(nowMs - i * DAY_MS).toISOString());
    dailySubs.set(k, 0);
    dailyClicks.set(k, 0);
  }
  for (const s of subsLast30Rows) {
    const k = dateKey(s.created_at);
    if (dailySubs.has(k)) dailySubs.set(k, dailySubs.get(k)! + 1);
  }
  for (const e of clicksRows) {
    const k = dateKey(e.created_at);
    if (dailyClicks.has(k)) dailyClicks.set(k, dailyClicks.get(k)! + 1);
  }
  const timeline = Array.from(dailySubs.keys()).map((date) => ({
    date,
    subs: dailySubs.get(date) ?? 0,
    clicks: dailyClicks.get(date) ?? 0,
  }));
  const maxBar = Math.max(
    1,
    ...timeline.map((t) => Math.max(t.subs, t.clicks)),
  );

  return (
    <main className="mx-auto max-w-5xl px-6 py-12">
      <div className="mb-12">
        <p className="text-[0.65rem] uppercase tracking-widest text-[var(--muted)] mb-2">
          Hoy Es Fiesta · interno
        </p>
        <h1 className="font-serif text-4xl mb-1">KPIs de PMF</h1>
        <p className="text-sm text-[var(--muted)]">
          Datos de los últimos 30 días, salvo totales acumulados.
        </p>
      </div>

      {/* Top KPIs */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        <Kpi
          label="Suscriptores"
          value={subsTotal}
          sub={`+${subsLast7} esta semana · +${subsLast30} últimos 30d`}
        />
        <Kpi
          label="Clicks Booking"
          value={clicksTotal}
          sub={`+${clicksLast7} esta semana · +${clicksLast30} últimos 30d`}
        />
        <Kpi
          label="Clicks / suscriptor (30d)"
          value={
            subsLast30 > 0
              ? (clicksLast30 / subsLast30).toFixed(2)
              : "—"
          }
          sub="proxy de engagement"
        />
        <Kpi
          label="Conversión activa"
          value={
            clicksLast30 > 0
              ? `${((subsLast30 / clicksLast30) * 100).toFixed(0)}%`
              : "—"
          }
          sub="suscriptores ÷ clicks 30d"
        />
      </section>

      {/* Timeline */}
      <section className="mb-12">
        <h2 className="font-serif text-2xl mb-1">Actividad diaria</h2>
        <p className="text-xs text-[var(--muted)] mb-6">
          Suscripciones (rojo) vs clicks Booking (gris) últimos 30 días
        </p>
        <div className="flex items-end gap-1 h-40 border-b border-[var(--surface-border)] pb-2">
          {timeline.map((t) => (
            <div
              key={t.date}
              className="flex-1 flex flex-col items-center justify-end gap-px"
              title={`${t.date} · ${t.subs} subs · ${t.clicks} clicks`}
            >
              <div
                className="w-full bg-[var(--muted)] opacity-30"
                style={{
                  height: `${(t.clicks / maxBar) * 100}%`,
                  minHeight: t.clicks > 0 ? "2px" : "0",
                }}
              />
              <div
                className="w-full bg-[var(--primary)]"
                style={{
                  height: `${(t.subs / maxBar) * 100}%`,
                  minHeight: t.subs > 0 ? "2px" : "0",
                }}
              />
            </div>
          ))}
        </div>
        <div className="flex justify-between text-[0.6rem] uppercase tracking-widest text-[var(--muted)] mt-2">
          <span>{timeline[0]?.date}</span>
          <span>{timeline[timeline.length - 1]?.date}</span>
        </div>
      </section>

      {/* Breakdowns */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
        <Breakdown
          title="Suscriptores por origen"
          rows={Array.from(subsBySource.entries()).sort((a, b) => b[1] - a[1])}
        />
        <Breakdown
          title="Clicks Booking por origen"
          rows={Array.from(clicksBySource.entries()).sort(
            (a, b) => b[1] - a[1],
          )}
        />
      </section>

      <section className="mb-12">
        <h2 className="font-serif text-2xl mb-4">
          Puentes que más convierten (clicks)
        </h2>
        {topHolidays.length === 0 ? (
          <p className="text-sm text-[var(--muted)]">
            Aún no hay clicks. Comparte la web y vuelve a esta página.
          </p>
        ) : (
          <ol className="space-y-2">
            {topHolidays.map(([name, count], i) => (
              <li
                key={name}
                className="flex items-center justify-between border-b border-[var(--surface-border)] py-2"
              >
                <span className="text-sm">
                  <span className="text-[var(--muted)] mr-3">{i + 1}.</span>
                  {name}
                </span>
                <span className="font-serif text-lg">{count}</span>
              </li>
            ))}
          </ol>
        )}
      </section>

      <p className="text-[0.6rem] uppercase tracking-widest text-[var(--muted)] text-center">
        Datos en vivo · {new Date().toISOString()}
      </p>
    </main>
  );
}

function Kpi({
  label,
  value,
  sub,
}: {
  label: string;
  value: number | string;
  sub: string;
}) {
  return (
    <div className="border border-[var(--surface-border)] p-5">
      <p className="text-[0.6rem] uppercase tracking-widest text-[var(--muted)] mb-2">
        {label}
      </p>
      <p className="font-serif text-3xl text-[var(--foreground)]">{value}</p>
      <p className="text-[0.65rem] text-[var(--muted)] mt-2 leading-snug">
        {sub}
      </p>
    </div>
  );
}

function Breakdown({
  title,
  rows,
}: {
  title: string;
  rows: [string, number][];
}) {
  const total = rows.reduce((sum, [, n]) => sum + n, 0);
  return (
    <div>
      <h2 className="font-serif text-2xl mb-4">{title}</h2>
      {rows.length === 0 ? (
        <p className="text-sm text-[var(--muted)]">Sin datos aún.</p>
      ) : (
        <div className="space-y-2">
          {rows.map(([source, count]) => {
            const pct = total > 0 ? (count / total) * 100 : 0;
            return (
              <div key={source}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="capitalize">{source}</span>
                  <span className="text-[var(--muted)]">
                    {count} · {pct.toFixed(0)}%
                  </span>
                </div>
                <div className="h-1 bg-[var(--surface-alt)]">
                  <div
                    className="h-full bg-[var(--primary)]"
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
