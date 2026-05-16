import { Resend } from "resend";

let cached: Resend | null = null;

/**
 * Cliente Resend lazy. Devuelve null si la API key no está configurada,
 * de modo que las rutas pueden degradar a "guardado en Supabase, sin email"
 * sin romper la suscripción.
 */
export function getResend(): Resend | null {
  if (cached) return cached;
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return null;
  cached = new Resend(apiKey);
  return cached;
}

/**
 * Dirección de envío. Si no hay dominio verificado en Resend, deja sin
 * configurar y el welcome email se omite.
 *   ej: "Hoy Es Fiesta <hola@hoyesfiesta.com>"
 */
export function getFromAddress(): string | null {
  return process.env.RESEND_FROM ?? null;
}

/**
 * ID de la Audience donde acumulamos suscriptores para luego mandar
 * Broadcasts desde el panel de Resend. Sin esta env, no se sincroniza.
 */
export function getAudienceId(): string | null {
  return process.env.RESEND_AUDIENCE_ID ?? null;
}
