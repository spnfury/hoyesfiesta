import { NextRequest } from 'next/server';
import { allHolidays2026, comunidades, getHolidaysForLocation } from '@/lib/holidays-data';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const dateParam = searchParams.get('date');
  const locationCode = searchParams.get('location'); // Código INE de comunidad (ej: 'MD')

  // Si no se especifica fecha, usar hoy
  const targetDate = dateParam || new Date().toISOString().split('T')[0];

  // Validar formato de fecha
  if (!/^\d{4}-\d{2}-\d{2}$/.test(targetDate)) {
    return Response.json(
      { error: 'Formato de fecha inválido. Usa YYYY-MM-DD.' },
      { status: 400 }
    );
  }

  let holidays = allHolidays2026;

  // Si se especifica una localización, filtrar
  if (locationCode) {
    const location = comunidades.find(
      (c) => c.code?.toLowerCase() === locationCode.toLowerCase()
    );
    if (location) {
      holidays = getHolidaysForLocation(location.id);
    }
  }

  // Filtrar por la fecha exacta
  const matchingHolidays = holidays.filter((h) => h.date === targetDate);

  const response = {
    date: targetDate,
    is_holiday: matchingHolidays.length > 0,
    holidays: matchingHolidays.map((h) => ({
      name: h.name,
      scope: h.scope,
      location: h.location_id
        ? comunidades.find((c) => c.id === h.location_id)?.name || null
        : 'España (Nacional)',
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
