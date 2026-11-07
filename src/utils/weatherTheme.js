// Trả về class Tailwind của dải màu nền (viết đủ class để Tailwind nhận ra)
export function getTheme(code, isDay = 1) {
  if (!isDay) return "from-slate-800 to-indigo-950";
  if (code <= 1) return "from-sky-400 to-blue-600";
  if (code <= 3) return "from-slate-400 to-slate-600";
  if (code >= 45 && code <= 48) return "from-slate-300 to-slate-500";
  if ((code >= 51 && code <= 67) || (code >= 80 && code <= 82))
    return "from-slate-500 to-blue-800";
  if (code >= 71 && code <= 77) return "from-sky-200 to-slate-400";
  if (code >= 95) return "from-purple-700 to-slate-900";
  return "from-sky-500 to-blue-700";
}