import { cn } from "../lib/utils";

export default function CityChips({ cities, onSelect, activeId }) {
  return (
    <div className="flex flex-wrap gap-2">
      {cities.map((c) => (
        <button
          key={c.id}
          onClick={() => onSelect(c)}
          className={cn(
            "rounded-full border px-3 py-1 text-sm transition",
            "border-sky-200 bg-white text-sky-700 hover:bg-sky-100",
            "dark:border-slate-600 dark:bg-slate-800 dark:text-sky-300 dark:hover:bg-slate-700",
            activeId === c.id &&
              "border-sky-600 bg-sky-600 text-white hover:bg-sky-600 dark:border-sky-600 dark:bg-sky-600 dark:text-white"
          )}
        >
          {c.name}
        </button>
      ))}
    </div>
  );
}