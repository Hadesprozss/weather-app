import { useEffect, useState } from "react";

export function useDarkMode() {
  const [dark, setDark] = useState(() => {
    try {
      const saved = localStorage.getItem("dark");
      if (saved !== null) return saved === "1";
    } catch {
      /* bỏ qua */
    }
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    try {
      localStorage.setItem("dark", dark ? "1" : "0");
    } catch {
      /* bỏ qua */
    }
  }, [dark]);

  return [dark, () => setDark((d) => !d)];
}