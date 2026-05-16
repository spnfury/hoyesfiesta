import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import Link from "next/link";
import ThemeToggle from "./components/ThemeToggle";

const SITE_URL = "https://hoyesfiesta.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Hoy Es Fiesta — Calendario de Festivos España 2026",
    template: "%s | Hoy Es Fiesta",
  },
  description:
    "Calendario completo de festivos en España 2026. Descubre puentes, optimiza tus vacaciones y planifica escapadas con nuestra guía local de festivos nacionales, autonómicos y municipales.",
  keywords: [
    "festivos 2026",
    "calendario laboral España",
    "puentes 2026",
    "días festivos",
    "festivos nacionales",
    "festivos autonómicos",
    "optimizador vacaciones",
  ],
  authors: [{ name: "Hoy Es Fiesta" }],
  creator: "Hoy Es Fiesta",
  publisher: "Hoy Es Fiesta",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: SITE_URL,
    siteName: "Hoy Es Fiesta",
    title: "Hoy Es Fiesta — Calendario de Festivos España 2026",
    description:
      "Descubre todos los festivos de 2026, los mejores puentes y cómo transformar tus días de vacaciones en escapadas inolvidables.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hoy Es Fiesta — Calendario de Festivos España 2026",
    description:
      "Festivos, puentes y escapadas en España 2026. Optimiza tus vacaciones.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
  category: "travel",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="h-full antialiased" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('hef-theme');if(t==='dark'){document.documentElement.classList.add('dark');}}catch(e){}})();`,
          }}
        />
        <Script
          defer
          data-domain="hoyesfiesta.com"
          src="https://clase-plausible.s0e6bf.easypanel.host/js/script.js"
          strategy="afterInteractive"
        />
      </head>
      <body className="min-h-full flex flex-col bg-[var(--background)] text-[var(--foreground)]">
        <div className="w-full bg-[var(--ink)] py-2 text-center text-white">
          <p className="text-[0.65rem] uppercase tracking-widest text-white/68">
            Tu guía personal de festivos y escapadas 2026
          </p>
        </div>

        <header className="sticky top-0 z-50 w-full border-b border-[var(--surface-border)] bg-[var(--surface)]/88 backdrop-blur-xl">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-20 items-center justify-between gap-6">
              <div className="hidden flex-1 items-center gap-8 md:flex">
                <Link
                  href="/#comunidades"
                  className="text-[0.75rem] uppercase tracking-widest text-[var(--foreground)] transition-colors hover:text-[var(--primary)]"
                >
                  Destinos
                </Link>
                <Link
                  href="/#puentes"
                  className="text-[0.75rem] uppercase tracking-widest text-[var(--foreground)] transition-colors hover:text-[var(--primary)]"
                >
                  Puentes
                </Link>
                <Link
                  href="/optimizador"
                  className="text-[0.75rem] uppercase tracking-widest text-[var(--primary)] transition-colors hover:text-[var(--primary-hover)] font-bold"
                >
                  Optimizador
                </Link>
              </div>

              <div className="flex flex-1 justify-start md:justify-center">
                <Link href="/" className="flex flex-col">
                  <span className="font-serif text-3xl font-bold tracking-normal text-[var(--foreground)]">
                    Hoy Es Fiesta
                  </span>
                  <span className="hidden text-[0.58rem] uppercase tracking-[0.32em] text-[var(--muted)] sm:block">
                    Festivos que se viajan
                  </span>
                </Link>
              </div>

              <div className="flex flex-1 items-center justify-end gap-4">
                <ThemeToggle />
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1">{children}</main>

        <footer className="mt-20 border-t border-[var(--surface-border)] bg-[var(--ink)] py-16 text-white">
          <div className="mx-auto max-w-4xl px-4 text-center">
            <h3 className="font-serif text-2xl mb-6 text-white">Hoy Es Fiesta</h3>
            <p className="text-sm text-white/65 mb-10 max-w-md mx-auto leading-relaxed">
              Inspiración para tus próximas escapadas. Te ayudamos a optimizar tus
              días de vacaciones combinándolos estratégicamente con los festivos locales.
            </p>

            <div className="flex flex-wrap justify-center gap-6 mb-12">
              <Link href="/comunidad-de-madrid" className="text-[0.75rem] uppercase tracking-widest text-white/78 hover:text-[var(--primary)]">Madrid</Link>
              <Link href="/cataluna" className="text-[0.75rem] uppercase tracking-widest text-white/78 hover:text-[var(--primary)]">Cataluña</Link>
              <Link href="/andalucia" className="text-[0.75rem] uppercase tracking-widest text-white/78 hover:text-[var(--primary)]">Andalucía</Link>
              <Link href="/comunidad-valenciana" className="text-[0.75rem] uppercase tracking-widest text-white/78 hover:text-[var(--primary)]">Valencia</Link>
            </div>

            <p className="border-t border-white/12 pt-8 text-[0.7rem] uppercase tracking-widest text-white/45">
              © {new Date().getFullYear()} Hoy Es Fiesta. Todos los derechos reservados.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
