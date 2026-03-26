"use client";

import { useState, useEffect } from "react";

export default function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    // Check for saved preference or system preference
    const saved = localStorage.getItem("hef-theme");
    if (saved === "dark") {
      setDark(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

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
    >
      {dark ? "☀" : "☾"}
    </button>
  );
}
