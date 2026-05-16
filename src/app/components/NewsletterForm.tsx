"use client";

import { useState } from "react";
import { plausible } from "@/lib/analytics";

type Status = "idle" | "loading" | "success" | "error";

interface NewsletterFormProps {
  source?: "home" | "optimizer" | "comunidad" | "provincia" | "municipio" | "other";
}

export default function NewsletterForm({ source = "home" }: NewsletterFormProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || status === "loading") return;

    setStatus("loading");
    setErrorMsg(null);

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source }),
      });

      if (!res.ok) {
        const data = (await res.json().catch(() => null)) as
          | { error?: string }
          | null;
        setErrorMsg(
          data?.error ??
            "No hemos podido suscribirte. Inténtalo de nuevo en un momento.",
        );
        setStatus("error");
        return;
      }

      setStatus("success");
      plausible("Newsletter", { source });
    } catch {
      setErrorMsg("Error de red. Comprueba tu conexión y reintenta.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="text-center animate-fade-in-up">
        <p className="font-serif text-xl text-[var(--primary)] mb-2">¡Apuntado!</p>
        <p className="text-sm text-[var(--muted)]">
          Te avisaremos antes de cada puente.
        </p>
      </div>
    );
  }

  return (
    <form
      className="flex flex-col items-center justify-center gap-3 max-w-md mx-auto"
      onSubmit={handleSubmit}
      noValidate
    >
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="tu@email.com"
          className="newsletter-input"
          required
          disabled={status === "loading"}
          autoComplete="email"
        />
        <button
          type="submit"
          className="btn-primary whitespace-nowrap"
          disabled={status === "loading"}
        >
          {status === "loading" ? "Enviando…" : "Suscribirme"}
        </button>
      </div>
      {status === "error" && errorMsg && (
        <p className="text-xs text-[var(--primary)] mt-1">{errorMsg}</p>
      )}
    </form>
  );
}
