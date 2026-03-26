"use client";

import { useState } from "react";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
    }
  }

  if (submitted) {
    return (
      <div className="text-center animate-fade-in-up">
        <p className="font-serif text-xl text-[var(--primary)] mb-2">¡Apuntado!</p>
        <p className="text-sm text-[var(--muted)]">
          Te avisaremos antes de cada puente. Revisa tu email.
        </p>
      </div>
    );
  }

  return (
    <form
      className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto"
      onSubmit={handleSubmit}
    >
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="tu@email.com"
        className="newsletter-input"
        required
      />
      <button type="submit" className="btn-primary whitespace-nowrap">
        Suscribirme
      </button>
    </form>
  );
}
