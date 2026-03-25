import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";

export const metadata: Metadata = {
  title: {
    default: "Hoy Es Fiesta — Calendario de Festivos",
    template: "%s | Hoy Es Fiesta",
  },
  description:
    "Calendario elegante de festivos en España 2026. Optimiza tus escapadas y puentes con nuestra guía de vacaciones.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-[var(--background)] text-[var(--foreground)]">
        
        {/* Topbar minimalist */}
        <div className="w-full text-center py-2 bg-[var(--surface-alt)] border-b border-[var(--surface-border)]">
          <p className="text-[0.65rem] uppercase tracking-widest text-[var(--muted)]">
            Tu guía personal de festivos y escapadas 2026
          </p>
        </div>

        {/* Elegant Navigation */}
        <header className="w-full bg-white border-b border-[var(--surface-border)] sticky top-0 z-50">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-20 items-center justify-between">
              {/* Left Links */}
              <div className="hidden md:flex flex-1 items-center gap-8">
                <Link
                  href="/#comunidades"
                  className="text-[0.75rem] uppercase tracking-widest text-[var(--foreground)] hover:text-[var(--primary)] transition-colors"
                >
                  Destinos
                </Link>
                <Link
                  href="/#puentes"
                  className="text-[0.75rem] uppercase tracking-widest text-[var(--foreground)] hover:text-[var(--primary)] transition-colors"
                >
                  Mejores Puentes
                </Link>
              </div>

              {/* Centered Logo */}
              <div className="flex-1 flex justify-center">
                <Link href="/" className="flex flex-col items-center">
                  <span className="font-serif text-3xl font-bold tracking-tight text-[var(--foreground)]">
                    Hoy Es Fiesta
                  </span>
                </Link>
              </div>

              {/* Right Links */}
              <div className="hidden md:flex flex-1 items-center justify-end gap-8">
                <Link
                  href="/api/v1/holidays?date=2026-05-01"
                  className="text-[0.75rem] uppercase tracking-widest text-[var(--muted)] hover:text-[var(--primary)] transition-colors"
                  target="_blank"
                >
                  Herramientas API
                </Link>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1">{children}</main>

        {/* Minimalist Footer */}
        <footer className="bg-[var(--surface-alt)] py-16 mt-20 border-t border-[var(--surface-border)]">
          <div className="mx-auto max-w-4xl px-4 text-center">
            <h3 className="font-serif text-2xl mb-6">Hoy Es Fiesta</h3>
            <p className="text-sm text-[var(--muted)] mb-10 max-w-md mx-auto leading-relaxed">
              Inspiración para tus próximas escapadas. Te ayudamos a optimizar tus 
              días de vacaciones combinándolos estratégicamente con los festivos locales.
            </p>
            
            <div className="flex flex-wrap justify-center gap-6 mb-12">
              <Link href="/comunidad-de-madrid" className="text-[0.75rem] uppercase tracking-widest text-[var(--foreground)] hover:text-[var(--primary)]">Madrid</Link>
              <Link href="/cataluna" className="text-[0.75rem] uppercase tracking-widest text-[var(--foreground)] hover:text-[var(--primary)]">Cataluña</Link>
              <Link href="/andalucia" className="text-[0.75rem] uppercase tracking-widest text-[var(--foreground)] hover:text-[var(--primary)]">Andalucía</Link>
              <Link href="/comunidad-valenciana" className="text-[0.75rem] uppercase tracking-widest text-[var(--foreground)] hover:text-[var(--primary)]">Valencia</Link>
            </div>

            <p className="text-[0.7rem] uppercase tracking-widest text-[var(--muted)] border-t border-[var(--surface-border)] pt-8">
              © {new Date().getFullYear()} Hoy Es Fiesta. Todos los derechos reservados.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
