/**
 * Builders de URLs de afiliados.
 *
 * El `aid` (affiliate id) se inyecta vía env y solo se añade si está presente,
 * de modo que el enlace funciona sin estar dado de alta todavía. Cuando te
 * registres en Booking Partners (o TravelPayouts) basta con definir
 * NEXT_PUBLIC_BOOKING_AID y todos los CTAs empiezan a comisionar.
 */

const BOOKING_AID = process.env.NEXT_PUBLIC_BOOKING_AID ?? "";

export interface BookingSearchParams {
  /** Fecha YYYY-MM-DD del check-in (primer día de la escapada) */
  checkin: string;
  /** Fecha YYYY-MM-DD del check-out (día siguiente al último día) */
  checkout: string;
  /** Destino (ciudad/región). Si se omite, abre el buscador. */
  destination?: string;
  /** Etiqueta de tracking para identificar de qué página/widget viene el clic. */
  label?: string;
  /** Adultos por defecto 2. */
  adults?: number;
}

/**
 * Construye una URL de búsqueda en Booking con fechas pre-rellenadas.
 * Funciona aunque BOOKING_AID esté vacío (no comisiona, pero el flujo es el mismo).
 */
export function bookingSearchUrl(params: BookingSearchParams): string {
  const url = new URL("https://www.booking.com/searchresults.es.html");

  if (params.destination) url.searchParams.set("ss", params.destination);
  url.searchParams.set("checkin", params.checkin);
  url.searchParams.set("checkout", params.checkout);
  url.searchParams.set("group_adults", String(params.adults ?? 2));
  url.searchParams.set("group_children", "0");
  url.searchParams.set("no_rooms", "1");
  url.searchParams.set("selected_currency", "EUR");

  if (BOOKING_AID) url.searchParams.set("aid", BOOKING_AID);
  if (params.label) url.searchParams.set("label", params.label);

  return url.toString();
}

/**
 * Booking espera el día siguiente al último de la escapada como checkout.
 * Recibe `bridgeEnd` en YYYY-MM-DD y devuelve YYYY-MM-DD + 1 día.
 */
export function nextDayIso(dateIso: string): string {
  const d = new Date(dateIso + "T00:00:00Z");
  d.setUTCDate(d.getUTCDate() + 1);
  return d.toISOString().split("T")[0]!;
}
