-- Newsletter subscribers (captura desde NewsletterForm)
CREATE TABLE public.subscribers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(320) NOT NULL,
    source VARCHAR(50) NOT NULL DEFAULT 'home', -- home | optimizer | comunidad | provincia | municipio | other
    ip_hash VARCHAR(64),                        -- sha256(ip + salt) para abuse-control sin guardar PII bruta
    user_agent VARCHAR(512),
    confirmed BOOLEAN NOT NULL DEFAULT false,
    confirmed_at TIMESTAMP WITH TIME ZONE,
    unsubscribed_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Email único case-insensitive (permite re-suscripción si fue baja: ver ON CONFLICT en el endpoint)
CREATE UNIQUE INDEX idx_subscribers_email_lower ON public.subscribers (LOWER(email));
CREATE INDEX idx_subscribers_created_at ON public.subscribers (created_at DESC);

-- RLS: solo el service role escribe/lee. Nada público.
ALTER TABLE public.subscribers ENABLE ROW LEVEL SECURITY;
