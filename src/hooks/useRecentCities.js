import { useState } from "react";

const KEY = "recent-cities";

function load() {
  try {
    return JSON.parse(localStorage.getItem(KEY)) ?? [];
  } catch {
    return [];
  }
}

export function useRecentCities() {
  const [recent, setRecent] = useState(load);

  const add = (place) => {
    const next = [place, ...recent.filter((p) => p.id !== place.id)].slice(0, 5);
    setRecent(next);
    try {
      localStorage.setItem(KEY, JSON.stringify(next));
    } catch {
      /* bỏ qua nếu trình duyệt chặn lưu trữ */
    }
  };

  return { recent, add };
}