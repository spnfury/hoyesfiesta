-- Inicialización de Esquema para Hoy Es Fiesta

-- 1. Tabla de Localizaciones Geográficas
-- Almacena jerarquía: País -> Comunidad Autónoma -> Provincia -> Municipio
CREATE TABLE public.locations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    type VARCHAR(50) NOT NULL CHECK (type IN ('country', 'autonomous_region', 'province', 'municipality')),
    code VARCHAR(50) UNIQUE, -- Código INE (opcional, muy útil para API B2B)
    parent_id UUID REFERENCES public.locations(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Índices para búsquedas rápidas jerárquicas
CREATE INDEX idx_locations_parent_id ON public.locations(parent_id);
CREATE INDEX idx_locations_type ON public.locations(type);

-- 2. Tabla de Festivos
-- Almacena las configuraciones de festivos
CREATE TABLE public.holidays (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    date DATE NOT NULL,
    name VARCHAR(255) NOT NULL,
    scope VARCHAR(50) NOT NULL CHECK (scope IN ('national', 'regional', 'local')),
    location_id UUID REFERENCES public.locations(id) ON DELETE CASCADE, 
    -- location_id será NULL si el scope es 'national', de lo contrario es obligatorio
    is_replaceable BOOLEAN DEFAULT false, -- Indica si es un festivo que se pasa al lunes, etc.
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    
    CONSTRAINT check_holiday_scope_location CHECK (
        (scope = 'national' AND location_id IS NULL) OR 
        (scope != 'national' AND location_id IS NOT NULL)
    )
);

-- Índices cruciales para la velocidad del Frontend ("Es festivo hoy en...?")
CREATE INDEX idx_holidays_date ON public.holidays(date);
CREATE INDEX idx_holidays_location_id ON public.holidays(location_id);
CREATE INDEX idx_holidays_date_location ON public.holidays(date, location_id);

-- Configuración de seguridad (RLS - Row Level Security)
-- Permitimos lectura pública a todos
ALTER TABLE public.locations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.holidays ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Lectura publica para localizaciones" 
ON public.locations FOR SELECT USING (true);

CREATE POLICY "Lectura publica para festivos" 
ON public.holidays FOR SELECT USING (true);
