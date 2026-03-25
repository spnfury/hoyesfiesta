// Datos estáticos de festivos nacionales de España 2026
// Estos datos se usarán como fallback y como seed inicial.
// En producción, se alimentarán desde Supabase.

import { Holiday, Location, BridgeOpportunity } from './types';

// =============================================
// COMUNIDADES AUTÓNOMAS (Localizaciones)
// =============================================
export const comunidades: Location[] = [
  { id: 'es', name: 'España', slug: 'espana', type: 'country', code: 'ES', parent_id: null },
  { id: 'and', name: 'Andalucía', slug: 'andalucia', type: 'autonomous_region', code: 'AN', parent_id: 'es' },
  { id: 'ara', name: 'Aragón', slug: 'aragon', type: 'autonomous_region', code: 'AR', parent_id: 'es' },
  { id: 'ast', name: 'Asturias', slug: 'asturias', type: 'autonomous_region', code: 'AS', parent_id: 'es' },
  { id: 'bal', name: 'Islas Baleares', slug: 'islas-baleares', type: 'autonomous_region', code: 'IB', parent_id: 'es' },
  { id: 'can', name: 'Canarias', slug: 'canarias', type: 'autonomous_region', code: 'CN', parent_id: 'es' },
  { id: 'cnt', name: 'Cantabria', slug: 'cantabria', type: 'autonomous_region', code: 'CB', parent_id: 'es' },
  { id: 'clm', name: 'Castilla-La Mancha', slug: 'castilla-la-mancha', type: 'autonomous_region', code: 'CM', parent_id: 'es' },
  { id: 'cyl', name: 'Castilla y León', slug: 'castilla-y-leon', type: 'autonomous_region', code: 'CL', parent_id: 'es' },
  { id: 'cat', name: 'Cataluña', slug: 'cataluna', type: 'autonomous_region', code: 'CT', parent_id: 'es' },
  { id: 'ext', name: 'Extremadura', slug: 'extremadura', type: 'autonomous_region', code: 'EX', parent_id: 'es' },
  { id: 'gal', name: 'Galicia', slug: 'galicia', type: 'autonomous_region', code: 'GA', parent_id: 'es' },
  { id: 'mad', name: 'Comunidad de Madrid', slug: 'comunidad-de-madrid', type: 'autonomous_region', code: 'MD', parent_id: 'es' },
  { id: 'mur', name: 'Región de Murcia', slug: 'region-de-murcia', type: 'autonomous_region', code: 'MC', parent_id: 'es' },
  { id: 'nav', name: 'Navarra', slug: 'navarra', type: 'autonomous_region', code: 'NC', parent_id: 'es' },
  { id: 'pva', name: 'País Vasco', slug: 'pais-vasco', type: 'autonomous_region', code: 'PV', parent_id: 'es' },
  { id: 'rio', name: 'La Rioja', slug: 'la-rioja', type: 'autonomous_region', code: 'RI', parent_id: 'es' },
  { id: 'val', name: 'Comunidad Valenciana', slug: 'comunidad-valenciana', type: 'autonomous_region', code: 'VC', parent_id: 'es' },
  { id: 'ceu', name: 'Ceuta', slug: 'ceuta', type: 'autonomous_region', code: 'CE', parent_id: 'es' },
  { id: 'mel', name: 'Melilla', slug: 'melilla', type: 'autonomous_region', code: 'ML', parent_id: 'es' },
  // =============================================
  // PROVINCIAS (50)
  // =============================================
  // Andalucía (8)
  { id: 'p-alm', name: 'Almería', slug: 'almeria', type: 'province', code: '04', parent_id: 'and' },
  { id: 'p-cad', name: 'Cádiz', slug: 'cadiz', type: 'province', code: '11', parent_id: 'and' },
  { id: 'p-cor', name: 'Córdoba', slug: 'cordoba', type: 'province', code: '14', parent_id: 'and' },
  { id: 'p-gra', name: 'Granada', slug: 'granada', type: 'province', code: '18', parent_id: 'and' },
  { id: 'p-hue', name: 'Huelva', slug: 'huelva', type: 'province', code: '21', parent_id: 'and' },
  { id: 'p-jae', name: 'Jaén', slug: 'jaen', type: 'province', code: '23', parent_id: 'and' },
  { id: 'p-mal', name: 'Málaga', slug: 'malaga', type: 'province', code: '29', parent_id: 'and' },
  { id: 'p-sev', name: 'Sevilla', slug: 'sevilla', type: 'province', code: '41', parent_id: 'and' },
  // Aragón (3)
  { id: 'p-hues', name: 'Huesca', slug: 'huesca', type: 'province', code: '22', parent_id: 'ara' },
  { id: 'p-ter', name: 'Teruel', slug: 'teruel', type: 'province', code: '44', parent_id: 'ara' },
  { id: 'p-zar', name: 'Zaragoza', slug: 'zaragoza', type: 'province', code: '50', parent_id: 'ara' },
  // Asturias (1 - uniprovincial)
  { id: 'p-ast', name: 'Asturias', slug: 'asturias-provincia', type: 'province', code: '33', parent_id: 'ast' },
  // Islas Baleares (1 - uniprovincial)
  { id: 'p-bal', name: 'Islas Baleares', slug: 'baleares-provincia', type: 'province', code: '07', parent_id: 'bal' },
  // Canarias (2)
  { id: 'p-lpa', name: 'Las Palmas', slug: 'las-palmas', type: 'province', code: '35', parent_id: 'can' },
  { id: 'p-tfe', name: 'Santa Cruz de Tenerife', slug: 'santa-cruz-de-tenerife', type: 'province', code: '38', parent_id: 'can' },
  // Cantabria (1 - uniprovincial)
  { id: 'p-cnt', name: 'Cantabria', slug: 'cantabria-provincia', type: 'province', code: '39', parent_id: 'cnt' },
  // Castilla-La Mancha (5)
  { id: 'p-ab', name: 'Albacete', slug: 'albacete', type: 'province', code: '02', parent_id: 'clm' },
  { id: 'p-cr', name: 'Ciudad Real', slug: 'ciudad-real', type: 'province', code: '13', parent_id: 'clm' },
  { id: 'p-cu', name: 'Cuenca', slug: 'cuenca', type: 'province', code: '16', parent_id: 'clm' },
  { id: 'p-gu', name: 'Guadalajara', slug: 'guadalajara', type: 'province', code: '19', parent_id: 'clm' },
  { id: 'p-to', name: 'Toledo', slug: 'toledo', type: 'province', code: '45', parent_id: 'clm' },
  // Castilla y León (9)
  { id: 'p-av', name: 'Ávila', slug: 'avila', type: 'province', code: '05', parent_id: 'cyl' },
  { id: 'p-bu', name: 'Burgos', slug: 'burgos', type: 'province', code: '09', parent_id: 'cyl' },
  { id: 'p-le', name: 'León', slug: 'leon', type: 'province', code: '24', parent_id: 'cyl' },
  { id: 'p-pa', name: 'Palencia', slug: 'palencia', type: 'province', code: '34', parent_id: 'cyl' },
  { id: 'p-sa', name: 'Salamanca', slug: 'salamanca', type: 'province', code: '37', parent_id: 'cyl' },
  { id: 'p-sg', name: 'Segovia', slug: 'segovia', type: 'province', code: '40', parent_id: 'cyl' },
  { id: 'p-so', name: 'Soria', slug: 'soria', type: 'province', code: '42', parent_id: 'cyl' },
  { id: 'p-va', name: 'Valladolid', slug: 'valladolid', type: 'province', code: '47', parent_id: 'cyl' },
  { id: 'p-za', name: 'Zamora', slug: 'zamora', type: 'province', code: '49', parent_id: 'cyl' },
  // Cataluña (4)
  { id: 'p-bcn', name: 'Barcelona', slug: 'barcelona', type: 'province', code: '08', parent_id: 'cat' },
  { id: 'p-gi', name: 'Girona', slug: 'girona', type: 'province', code: '17', parent_id: 'cat' },
  { id: 'p-ll', name: 'Lleida', slug: 'lleida', type: 'province', code: '25', parent_id: 'cat' },
  { id: 'p-ta', name: 'Tarragona', slug: 'tarragona', type: 'province', code: '43', parent_id: 'cat' },
  // Comunidad Valenciana (3)
  { id: 'p-ali', name: 'Alicante', slug: 'alicante', type: 'province', code: '03', parent_id: 'val' },
  { id: 'p-cas', name: 'Castellón', slug: 'castellon', type: 'province', code: '12', parent_id: 'val' },
  { id: 'p-vlc', name: 'Valencia', slug: 'valencia', type: 'province', code: '46', parent_id: 'val' },
  // Extremadura (2)
  { id: 'p-ba', name: 'Badajoz', slug: 'badajoz', type: 'province', code: '06', parent_id: 'ext' },
  { id: 'p-cc', name: 'Cáceres', slug: 'caceres', type: 'province', code: '10', parent_id: 'ext' },
  // Galicia (4)
  { id: 'p-co', name: 'A Coruña', slug: 'a-coruna', type: 'province', code: '15', parent_id: 'gal' },
  { id: 'p-lu', name: 'Lugo', slug: 'lugo', type: 'province', code: '27', parent_id: 'gal' },
  { id: 'p-ou', name: 'Ourense', slug: 'ourense', type: 'province', code: '32', parent_id: 'gal' },
  { id: 'p-po', name: 'Pontevedra', slug: 'pontevedra', type: 'province', code: '36', parent_id: 'gal' },
  // Comunidad de Madrid (1 - uniprovincial)
  { id: 'p-mad', name: 'Madrid', slug: 'madrid', type: 'province', code: '28', parent_id: 'mad' },
  // Región de Murcia (1 - uniprovincial)
  { id: 'p-mur', name: 'Murcia', slug: 'murcia-provincia', type: 'province', code: '30', parent_id: 'mur' },
  // Navarra (1 - uniprovincial)
  { id: 'p-nav', name: 'Navarra', slug: 'navarra-provincia', type: 'province', code: '31', parent_id: 'nav' },
  // País Vasco (3)
  { id: 'p-al', name: 'Álava', slug: 'alava', type: 'province', code: '01', parent_id: 'pva' },
  { id: 'p-bi', name: 'Vizcaya', slug: 'vizcaya', type: 'province', code: '48', parent_id: 'pva' },
  { id: 'p-ss', name: 'Guipúzcoa', slug: 'guipuzcoa', type: 'province', code: '20', parent_id: 'pva' },
  // La Rioja (1 - uniprovincial)
  { id: 'p-rio', name: 'La Rioja', slug: 'la-rioja-provincia', type: 'province', code: '26', parent_id: 'rio' },
];

// =============================================
// FESTIVOS NACIONALES 2026
// =============================================
export const festivosNacionales2026: Holiday[] = [
  { id: 'n1', date: '2026-01-01', name: 'Año Nuevo', scope: 'national', location_id: null, is_replaceable: false },
  { id: 'n2', date: '2026-01-06', name: 'Epifanía del Señor (Reyes)', scope: 'national', location_id: null, is_replaceable: false },
  { id: 'n3', date: '2026-04-03', name: 'Viernes Santo', scope: 'national', location_id: null, is_replaceable: false },
  { id: 'n4', date: '2026-05-01', name: 'Día del Trabajador', scope: 'national', location_id: null, is_replaceable: false },
  { id: 'n5', date: '2026-08-15', name: 'Asunción de la Virgen', scope: 'national', location_id: null, is_replaceable: false },
  { id: 'n6', date: '2026-10-12', name: 'Fiesta Nacional de España', scope: 'national', location_id: null, is_replaceable: false },
  { id: 'n7', date: '2026-11-02', name: 'Día de Todos los Santos', scope: 'national', location_id: null, is_replaceable: false },
  { id: 'n8', date: '2026-12-07', name: 'Día de la Constitución Española', scope: 'national', location_id: null, is_replaceable: false },
  { id: 'n9', date: '2026-12-08', name: 'Inmaculada Concepción', scope: 'national', location_id: null, is_replaceable: false },
  { id: 'n10', date: '2026-12-25', name: 'Navidad', scope: 'national', location_id: null, is_replaceable: false },
];

// =============================================
// FESTIVOS AUTONÓMICOS 2026 (Selección)
// =============================================
export const festivosRegionales2026: Holiday[] = [
  // Andalucía
  { id: 'r1', date: '2026-02-28', name: 'Día de Andalucía', scope: 'regional', location_id: 'and', is_replaceable: false },
  { id: 'r2', date: '2026-04-02', name: 'Jueves Santo', scope: 'regional', location_id: 'and', is_replaceable: false },
  // Aragón
  { id: 'r3', date: '2026-04-23', name: 'Día de Aragón (San Jorge)', scope: 'regional', location_id: 'ara', is_replaceable: false },
  { id: 'r4', date: '2026-04-02', name: 'Jueves Santo', scope: 'regional', location_id: 'ara', is_replaceable: false },
  // Cataluña
  { id: 'r5', date: '2026-06-24', name: 'Sant Joan', scope: 'regional', location_id: 'cat', is_replaceable: false },
  { id: 'r6', date: '2026-09-11', name: 'Diada Nacional de Catalunya', scope: 'regional', location_id: 'cat', is_replaceable: false },
  { id: 'r7', date: '2026-04-06', name: 'Lunes de Pascua', scope: 'regional', location_id: 'cat', is_replaceable: false },
  // Comunidad de Madrid
  { id: 'r8', date: '2026-05-02', name: 'Día de la Comunidad de Madrid', scope: 'regional', location_id: 'mad', is_replaceable: false },
  { id: 'r9', date: '2026-04-02', name: 'Jueves Santo', scope: 'regional', location_id: 'mad', is_replaceable: false },
  // Comunidad Valenciana
  { id: 'r10', date: '2026-03-19', name: 'San José (Fallas)', scope: 'regional', location_id: 'val', is_replaceable: false },
  { id: 'r11', date: '2026-04-06', name: 'Lunes de Pascua', scope: 'regional', location_id: 'val', is_replaceable: false },
  { id: 'r12', date: '2026-10-09', name: 'Día de la Comunidad Valenciana', scope: 'regional', location_id: 'val', is_replaceable: false },
  // País Vasco
  { id: 'r13', date: '2026-04-02', name: 'Jueves Santo', scope: 'regional', location_id: 'pva', is_replaceable: false },
  { id: 'r14', date: '2026-04-06', name: 'Lunes de Pascua', scope: 'regional', location_id: 'pva', is_replaceable: false },
  { id: 'r15', date: '2026-10-25', name: 'Día del País Vasco', scope: 'regional', location_id: 'pva', is_replaceable: false },
  // Galicia
  { id: 'r16', date: '2026-05-17', name: 'Día das Letras Galegas', scope: 'regional', location_id: 'gal', is_replaceable: false },
  { id: 'r17', date: '2026-07-25', name: 'Día Nacional de Galicia', scope: 'regional', location_id: 'gal', is_replaceable: false },
  // Canarias
  { id: 'r18', date: '2026-05-30', name: 'Día de Canarias', scope: 'regional', location_id: 'can', is_replaceable: false },
  // Asturias
  { id: 'r19', date: '2026-09-08', name: 'Día de Asturias', scope: 'regional', location_id: 'ast', is_replaceable: false },
  // Navarra
  { id: 'r20', date: '2026-12-03', name: 'Día de Navarra', scope: 'regional', location_id: 'nav', is_replaceable: false },
  // Murcia
  { id: 'r21', date: '2026-06-09', name: 'Día de la Región de Murcia', scope: 'regional', location_id: 'mur', is_replaceable: false },
  // Extremadura
  { id: 'r22', date: '2026-09-08', name: 'Día de Extremadura', scope: 'regional', location_id: 'ext', is_replaceable: false },
  // Castilla y León
  { id: 'r23', date: '2026-04-23', name: 'Día de Castilla y León', scope: 'regional', location_id: 'cyl', is_replaceable: false },
  // La Rioja
  { id: 'r24', date: '2026-06-09', name: 'Día de La Rioja', scope: 'regional', location_id: 'rio', is_replaceable: false },
  // Cantabria
  { id: 'r25', date: '2026-07-28', name: 'Día de las Instituciones de Cantabria', scope: 'regional', location_id: 'cnt', is_replaceable: false },
  // Castilla-La Mancha
  { id: 'r26', date: '2026-05-31', name: 'Día de Castilla-La Mancha', scope: 'regional', location_id: 'clm', is_replaceable: false },
  // Islas Baleares
  { id: 'r27', date: '2026-03-01', name: 'Día de las Islas Baleares', scope: 'regional', location_id: 'bal', is_replaceable: false },
];

export const allHolidays2026 = [...festivosNacionales2026, ...festivosRegionales2026];

// =============================================
// UTILIDADES PARA CALCULAR "PUENTES"
// =============================================

function getDayOfWeek(dateStr: string): number {
  return new Date(dateStr + 'T00:00:00').getDay(); // 0=Dom, 1=Lun, ..., 6=Sáb
}

function addDays(dateStr: string, days: number): string {
  const d = new Date(dateStr + 'T00:00:00');
  d.setDate(d.getDate() + days);
  return d.toISOString().split('T')[0];
}

function diffDays(start: string, end: string): number {
  const s = new Date(start + 'T00:00:00');
  const e = new Date(end + 'T00:00:00');
  return Math.round((e.getTime() - s.getTime()) / (1000 * 60 * 60 * 24));
}

export function calculateBridges(holidays: Holiday[]): BridgeOpportunity[] {
  const bridges: BridgeOpportunity[] = [];
  const today = new Date().toISOString().split('T')[0];

  for (const holiday of holidays) {
    if (holiday.date < today) continue;

    const dow = getDayOfWeek(holiday.date);

    // Lunes festivo: puente de Sáb-Dom-Lun (3 días gratis, 0 extra)
    if (dow === 1) {
      bridges.push({
        holiday,
        bridge_start: addDays(holiday.date, -2), // sábado
        bridge_end: holiday.date, // lunes
        days_off_needed: 0,
        total_days_free: 3,
        efficiency_ratio: Infinity,
      });
    }

    // Martes festivo: pide Lunes libre → 4 días
    if (dow === 2) {
      bridges.push({
        holiday,
        bridge_start: addDays(holiday.date, -3), // sábado
        bridge_end: holiday.date, // martes
        days_off_needed: 1,
        total_days_free: 4,
        efficiency_ratio: 4,
      });
    }

    // Miércoles festivo: puente mini (solo día festivo) → No muy potente
    // Pero se puede ampliar pidiendo jueves y viernes
    if (dow === 3) {
      bridges.push({
        holiday,
        bridge_start: addDays(holiday.date, -1), // martes (pid)
        bridge_end: addDays(holiday.date, 2), // viernes (pid) + Sáb-Dom
        days_off_needed: 2,
        total_days_free: 5,
        efficiency_ratio: 2.5,
      });
    }

    // Jueves festivo: pide Viernes libre → 4 días
    if (dow === 4) {
      bridges.push({
        holiday,
        bridge_start: holiday.date, // jueves
        bridge_end: addDays(holiday.date, 2), // sábado (+domingo)
        days_off_needed: 1,
        total_days_free: 4,
        efficiency_ratio: 4,
      });
    }

    // Viernes festivo: 3 días gratis (Vie-Sáb-Dom)
    if (dow === 5) {
      bridges.push({
        holiday,
        bridge_start: holiday.date, // viernes
        bridge_end: addDays(holiday.date, 2), // domingo
        days_off_needed: 0,
        total_days_free: 3,
        efficiency_ratio: Infinity,
      });
    }
  }

  // Ordenar por eficiencia descendente y luego por fecha
  bridges.sort((a, b) => {
    if (b.efficiency_ratio === a.efficiency_ratio) {
      return a.holiday.date.localeCompare(b.holiday.date);
    }
    if (a.efficiency_ratio === Infinity) return -1;
    if (b.efficiency_ratio === Infinity) return 1;
    return b.efficiency_ratio - a.efficiency_ratio;
  });

  return bridges;
}

export function getHolidaysForLocation(locationId: string | null): Holiday[] {
  if (!locationId) {
    return festivosNacionales2026;
  }
  return [
    ...festivosNacionales2026,
    ...festivosRegionales2026.filter(h => h.location_id === locationId),
  ];
}

export function getLocationBySlug(slug: string): Location | undefined {
  return comunidades.find(c => c.slug === slug);
}

export function formatDateES(dateStr: string): string {
  const date = new Date(dateStr + 'T00:00:00');
  return date.toLocaleDateString('es-ES', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export function getMonthName(month: number): string {
  const months = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];
  return months[month];
}

export function getProvincesByCommunity(communityId: string): Location[] {
  return comunidades.filter(c => c.type === 'province' && c.parent_id === communityId);
}

export function getProvinceBySlug(slug: string): Location | undefined {
  return comunidades.find(c => c.type === 'province' && c.slug === slug);
}

export function getCommunityById(id: string): Location | undefined {
  return comunidades.find(c => c.id === id);
}

