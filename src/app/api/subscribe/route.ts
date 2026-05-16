import { NextRequest } from "next/server";
import { createHash } from "node:crypto";
import { getSupabaseAdmin } from "@/lib/supabase/admin";
import {
  getResend,
  getFromAddress,
  getAudienceId,
} from "@/lib/resend";
import { buildWelcomeEmail } from "@/lib/email-templates";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
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

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "JSON inválido" }, { status: 400 });
  }

  const { email, source } =
    (body as { email?: unknown; source?: unknown }) ?? {};

  if (typeof email !== "string" || !EMAIL_RE.test(email) || email.length > 320) {
    return Response.json({ error: "Email no válido" }, { status: 400 });
  }

  const normalizedEmail = email.trim().toLowerCase();
  const safeSource =
    typeof source === "string" && ALLOWED_SOURCES.has(source) ? source : "home";

  const ipHash = hashIp(getClientIp(request));
  const userAgent = request.headers.get("user-agent")?.slice(0, 512) ?? null;

  let supabase;
  try {
    supabase = getSupabaseAdmin();
  } catch (err) {
    console.error("[subscribe] supabase admin no disponible:", err);
    return Response.json(
      { error: "Servicio no disponible temporalmente" },
      { status: 503 },
    );
  }

  const { error } = await supabase.from("subscribers").insert({
    email: normalizedEmail,
    source: safeSource,
    ip_hash: ipHash,
    user_agent: userAgent,
  });

  if (error) {
    // 23505 = unique_violation (Postgres). Tratamos email duplicado como éxito idempotente.
    if (error.code === "23505") {
      return Response.json({ ok: true, already_subscribed: true });
    }
    console.error("[subscribe] insert error:", error);
    return Response.json(
      { error: "No pudimos guardar tu email. Inténtalo en un momento." },
      { status: 500 },
    );
  }

  // Resend: welcome email + sync con Audience. Fire-and-forget — un fallo
  // no debe bloquear la respuesta al usuario (su email ya está en Supabase).
  void syncWithResend(normalizedEmail, safeSource);

  return Response.json({ ok: true });
}

async function syncWithResend(email: string, source: string): Promise<void> {
  const resend = getResend();
  if (!resend) return;

  const audienceId = getAudienceId();
  if (audienceId) {
    try {
      await resend.contacts.create({
        audienceId,
        email,
        unsubscribed: false,
      });
    } catch (err) {
      console.error("[subscribe] resend audience sync error:", err);
    }
  }

  const from = getFromAddress();
  if (from) {
    const { subject, html, text } = buildWelcomeEmail();
    try {
      await resend.emails.send({
        from,
        to: email,
        subject,
        html,
        text,
        tags: [{ name: "type", value: "welcome" }, { name: "source", value: source }],
      });
    } catch (err) {
      console.error("[subscribe] resend welcome email error:", err);
    }
  }
}
