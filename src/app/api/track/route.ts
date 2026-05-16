import { NextRequest } from "next/server";
import { createHash } from "node:crypto";
import { getSupabaseAdmin } from "@/lib/supabase/admin";

const ALLOWED_TYPES = new Set([
  "booking_click",
  "newsletter_subscribe",
  "pageview",
  "other",
]);

const ALLOWED_SOURCES = new Set([
  "home",
  "optimizer",
  "comunidad",
  "provincia",
  "municipio",
  "other",
]);

function hashIp(ip: string): string {
  const salt = process.env.SUBSCRIBER_IP_SALT ?? "hef-default-salt";
  return createHash("sha256").update(`${salt}:${ip}`).digest("hex");
}

function getClientIp(request: NextRequest): string {
  const fwd = request.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0]!.trim();
  return request.headers.get("x-real-ip") ?? "unknown";
}

interface TrackPayload {
  event_type?: unknown;
  source?: unknown;
  metadata?: unknown;
  pathname?: unknown;
}

export async function POST(request: NextRequest) {
  let body: TrackPayload;
  try {
    // sendBeacon manda como text/plain por defecto, así que aceptamos JSON crudo.
    const text = await request.text();
    body = text ? JSON.parse(text) : {};
  } catch {
    return Response.json({ error: "JSON inválido" }, { status: 400 });
  }

  const eventType =
    typeof body.event_type === "string" && ALLOWED_TYPES.has(body.event_type)
      ? body.event_type
      : null;

  if (!eventType) {
    return Response.json({ error: "event_type no permitido" }, { status: 400 });
  }

  const source =
    typeof body.source === "string" && ALLOWED_SOURCES.has(body.source)
      ? body.source
      : null;

  const metadata =
    body.metadata && typeof body.metadata === "object" && !Array.isArray(body.metadata)
      ? (body.metadata as Record<string, unknown>)
      : {};

  const pathname =
    typeof body.pathname === "string" ? body.pathname.slice(0, 512) : null;

  let supabase;
  try {
    supabase = getSupabaseAdmin();
  } catch (err) {
    console.error("[track] supabase admin no disponible:", err);
    return Response.json({ ok: false }, { status: 503 });
  }

  const { error } = await supabase.from("events").insert({
    event_type: eventType,
    source,
    metadata,
    ip_hash: hashIp(getClientIp(request)),
    user_agent: request.headers.get("user-agent")?.slice(0, 512) ?? null,
    referrer: request.headers.get("referer")?.slice(0, 2048) ?? null,
    pathname,
  });

  if (error) {
    console.error("[track] insert error:", error);
    return Response.json({ ok: false }, { status: 500 });
  }

  // sendBeacon ignora el cuerpo de la respuesta; devolvemos 204 para no malgastar bytes.
  return new Response(null, { status: 204 });
}
