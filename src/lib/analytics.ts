/**
 * Tracking client-side hacia /api/track + Plausible (custom goals).
 * Usa sendBeacon cuando esté disponible para sobrevivir a navegaciones
 * (clics en enlaces target=_blank o cambios de pestaña).
 *
 * Doble destino intencional:
 *   - /api/track → admin propio en /admin con metadata rica (top puentes, etc.)
 *   - Plausible  → traffic + funnel + segmentación visual sin construir nada.
 */

declare global {
  interface Window {
    plausible?: ((eventName: string, options?: { props?: Record<string, string | number | boolean> }) => void) & {
      q?: unknown[];
    };
  }
}

export function plausible(
  eventName: string,
  props?: Record<string, string | number | boolean>,
): void {
  if (typeof window === "undefined") return;
  try {
    window.plausible?.(eventName, props ? { props } : undefined);
  } catch {
    // Nunca debe romper UX
  }
}

export type EventType =
  | "booking_click"
  | "newsletter_subscribe"
  | "pageview"
  | "other";

export type EventSource =
  | "home"
  | "optimizer"
  | "comunidad"
  | "provincia"
  | "municipio"
  | "other";

export interface TrackOptions {
  source?: EventSource;
  metadata?: Record<string, unknown>;
}

export function track(eventType: EventType, options: TrackOptions = {}): void {
  if (typeof window === "undefined") return;

  const payload = JSON.stringify({
    event_type: eventType,
    source: options.source,
    metadata: options.metadata ?? {},
    pathname: window.location.pathname,
  });

  try {
    if (
      "sendBeacon" in navigator &&
      typeof navigator.sendBeacon === "function"
    ) {
      // Blob con type text/plain evita preflight CORS y es lo que sendBeacon prefiere.
      const blob = new Blob([payload], { type: "text/plain" });
      const ok = navigator.sendBeacon("/api/track", blob);
      if (ok) return;
    }
  } catch {
    // sigue al fallback
  }

  // Fallback: fetch keepalive para que sobreviva al unload.
  void fetch("/api/track", {
    method: "POST",
    body: payload,
    keepalive: true,
    headers: { "Content-Type": "text/plain" },
  }).catch(() => {
    // Tracking nunca debe romper la UX: silencioso.
  });
}
