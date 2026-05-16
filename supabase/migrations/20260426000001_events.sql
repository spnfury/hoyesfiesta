-- Eventos analíticos propios (alimenta /admin con KPIs)
-- Se mantiene minimalista: nada de PII bruta, IP solo hasheada.
CREATE TABLE public.events (
    id BIGSERIAL PRIMARY KEY,
    event_type VARCHAR(50) NOT NULL,    -- booking_click | newsletter_subscribe | pageview | other
    source VARCHAR(50),                 -- página/widget origen (home | optimizer | comunidad | provincia | municipio | other)
    metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
    ip_hash VARCHAR(64),
    user_agent VARCHAR(512),
    referrer VARCHAR(2048),
    pathname VARCHAR(512),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE INDEX idx_events_type_created ON public.events (event_type, created_at DESC);
CREATE INDEX idx_events_created ON public.events (created_at DESC);
CREATE INDEX idx_events_source ON public.events (source);

-- RLS bloqueado para clientes públicos. Inserciones y lecturas vía service role.
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
