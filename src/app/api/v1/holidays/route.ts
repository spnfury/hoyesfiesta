import { NextRequest } from 'next/server';
import {
  allHolidays2026,
  comunidades,
  getHolidaysForLocation,
} from '@/lib/holidays-data';
import { municipios } from '@/lib/municipalities-data';

/**
 * GET /api/v1/holidays
 *   ?date=YYYY-MM-DD          (opcional, por defecto hoy)
 *   ?location=AN|MD|...       (opcional, código autonómico de 2 letras)
 *   ?province=08|28|...       (opcional, código INE de provincia, 2 dígitos)
 *   ?municipality=28079|...   (opcional, código INE municipal, 5 dígitos)
 *
 *   Si se pasa varios, gana el más específico: municipality > province > location.
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const dateParam = searchParams.get('date');
  const locationCode = searchParams.get('location');
  const provinceCode = searchParams.get('province');
  const municipalityCode = searchParams.get('municipality');

  const targetDate = dateParam || new Date().toISOString().split('T')[0];

  if (!/^\d{4}-\d{2}-\d{2}$/.test(targetDate)) {
    return Response.json(
      { error: 'Formato de fecha inválido. Usa YYYY-MM-DD.' },
      { status: 400 },
    );
  }

  let holidays = allHolidays2026;
  let resolvedLocation: { id: string; name: string; type: string } | null = null;

  if (municipalityCode) {
    const muni = municipios.find((m) => m.code === municipalityCode);
    if (muni) {
      resolvedLocation = { id: muni.id, name: muni.name, type: 'municipality' };
      holidays = getHolidaysForLocation(muni.id);
    }
  } else if (provinceCode) {
    const prov = comunidades.find(
      (c) => c.type === 'province' && c.code === provinceCode,
    );
    if (prov) {
      resolvedLocation = { id: prov.id, name: prov.name, type: 'province' };
      holidays = getHolidaysForLocation(prov.id);
    }
  } else if (locationCode) {
    const region = comunidades.find(
      (c) =>
        c.type === 'autonomous_region' &&
        c.code?.toLowerCase() === locationCode.toLowerCase(),
    );
    if (region) {
      resolvedLocation = {
        id: region.id,
        name: region.name,
        type: 'autonomous_region',
      };
      holidays = getHolidaysForLocation(region.id);
    }
  }

  const matchingHolidays = holidays.filter((h) => h.date === targetDate);

  // Resuelve nombre legible de la location_id de cada festivo
  const allLocations = [...comunidades, ...municipios];
  const locationName = (id: string | null) =>
    id
      ? allLocations.find((l) => l.id === id)?.name ?? null
      : 'España (Nacional)';

  const response = {
    date: targetDate,
    is_holiday: matchingHolidays.length > 0,
    location: resolvedLocation,
    holidays: matchingHolidays.map((h) => ({
      name: h.name,
      scope: h.scope,
      location: locationName(h.location_id),
    })),
    meta: {
      api_version: 'v1',
      source: 'hoyesfiesta.com',
      year: 2026,
    },
  };

  return Response.json(response, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    },
  });
}
