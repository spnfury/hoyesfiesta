// Tipos de datos principales del proyecto Hoy Es Fiesta

export type LocationType = 'country' | 'autonomous_region' | 'province' | 'municipality';
export type HolidayScope = 'national' | 'regional' | 'local';

export interface Location {
  id: string;
  name: string;
  slug: string;
  type: LocationType;
  code: string | null;
  parent_id: string | null;
}

export interface Holiday {
  id: string;
  date: string; // ISO date string YYYY-MM-DD
  name: string;
  scope: HolidayScope;
  location_id: string | null;
  is_replaceable: boolean;
}

// Para la respuesta de la API B2B
export interface HolidayAPIResponse {
  date: string;
  is_holiday: boolean;
  holidays: {
    name: string;
    scope: HolidayScope;
    location?: string;
  }[];
}

// Para la lógica de "Puentes" (long weekends)
export interface BridgeOpportunity {
  holiday: Holiday;
  bridge_start: string;
  bridge_end: string;
  days_off_needed: number; // Días de vacaciones que necesitas pedir
  total_days_free: number; // Días libres totales que obtienes
  efficiency_ratio: number; // total_days_free / days_off_needed
}
