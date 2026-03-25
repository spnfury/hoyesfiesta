import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: {
    default: "Hoy Es Fiesta — Calendario de Festivos en España 2026",
    template: "%s | Hoy Es Fiesta",
  },
  description:
    "Descubre si hoy es festivo en tu comunidad autónoma. Calendario completo de festivos nacionales, autonómicos y locales de España 2026. Optimiza tus puentes y vacaciones.",
  keywords: [
    "festivos España 2026",
    "calendario festivos",
    "puentes 2026",
    "días festivos",
    "hoy es fiesta",
    "vacaciones España",
  ],
  openGraph: {
    title: "Hoy Es Fiesta — Calendario de Festivos en España 2026",
    description:
      "Descubre si hoy es festivo. Calendario completo y optimizador de puentes para España 2026.",
    url: "https://hoyesfiesta.com",
    siteName: "Hoy Es Fiesta",
    locale: "es_ES",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-[var(--background)] text-[var(--foreground)]">
        {/* Navigation */}
        <nav className="sticky top-0 z-50 border-b border-[var(--surface-border)] bg-[var(--background)]/80 backdrop-blur-xl">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              <Link href="/" className="flex items-center gap-2 group">
                <span className="text-2xl">🎉</span>
                <span className="text-xl font-bold gradient-text group-hover:opacity-80 transition-opacity">
                  Hoy Es Fiesta
                </span>
              </Link>
              <div className="hidden md:flex items-center gap-8">
                <Link
                  href="/#comunidades"
                  className="text-sm text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
                >
                  Comunidades
                </Link>
                <Link
                  href="/#puentes"
                  className="text-sm text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
                >
                  Puentes 2026
                </Link>
                <Link
                  href="/api/v1/holidays?date=2026-05-01"
                  className="text-sm font-medium text-[var(--primary-light)] hover:text-[var(--primary)] transition-colors"
                  target="_blank"
                >
                  API →
                </Link>
              </div>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-1">{children}</main>

        {/* Footer */}
        <footer className="border-t border-[var(--surface-border)] bg-[var(--surface)] py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-lg font-bold gradient-text mb-3">
                  🎉 Hoy Es Fiesta
                </h3>
                <p className="text-sm text-[var(--muted)] leading-relaxed">
                  Tu calendario definitivo de festivos en España. Optimiza
                  tus puentes y planifica las mejores escapadas.
                </p>
              </div>
              <div>
                <h4 className="text-sm font-semibold mb-3 text-[var(--foreground)]">
                  Comunidades populares
                </h4>
                <div className="flex flex-col gap-2">
                  {["comunidad-de-madrid", "cataluna", "andalucia", "comunidad-valenciana"].map(
                    (slug) => (
                      <Link
                        key={slug}
                        href={`/${slug}`}
                        className="text-sm text-[var(--muted)] hover:text-[var(--primary-light)] transition-colors"
                      >
                        Festivos en {slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}
                      </Link>
                    )
                  )}
                </div>
              </div>
              <div>
                <h4 className="text-sm font-semibold mb-3 text-[var(--foreground)]">
                  Para Desarrolladores
                </h4>
                <p className="text-sm text-[var(--muted)] mb-2">
                  ¿Necesitas datos de festivos en tu aplicación?
                </p>
                <Link
                  href="/api/v1/holidays?date=2026-01-06"
                  target="_blank"
                  className="inline-flex items-center gap-2 text-sm font-medium text-[var(--primary-light)] hover:text-[var(--accent)] transition-colors"
                >
                  Prueba nuestra API →
                </Link>
              </div>
            </div>
            <div className="mt-8 pt-8 border-t border-[var(--surface-border)] text-center text-xs text-[var(--muted)]">
              © {new Date().getFullYear()} Hoy Es Fiesta. Todos los derechos
              reservados.
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
