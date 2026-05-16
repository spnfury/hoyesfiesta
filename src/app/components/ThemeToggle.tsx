"use client";

import { useState } from "react";

// El tema inicial lo aplica un script inline en <head> (ver layout.tsx)
// antes de la hidratación, así que aquí leemos el estado desde el DOM
// de forma síncrona en el inicializador de useState — sin useEffect ni
// cascading renders.
function getInitialDark(): boolean {
  if (typeof document === "undefined") return false;
  return document.documentElement.classList.contains("dark");
}

export default function ThemeToggle() {
  const [dark, setDark] = useState(getInitialDark);

  function toggle() {
    const next = !dark;
    setDark(next);
    if (next) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("hef-theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("hef-theme", "light");
    }
  }

  return (
    <button
      onClick={toggle}
      className="theme-toggle"
      aria-label={dark ? "Modo claro" : "Modo oscuro"}
      title={dark ? "Modo claro" : "Modo oscuro"}
      suppressHydrationWarning
    >
      {dark ? "☀" : "☾"}
    </button>
  );
}
