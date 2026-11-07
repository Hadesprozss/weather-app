import { useEffect, useState } from "react";
import { getOverview } from "../services/weatherService";
import { describeWeather } from "../utils/weatherCode";
import { getTheme } from "../utils/weatherTheme";
import { cn } from "../lib/utils";

export default function CitiesOverview({ cities, onSelect }) {
  const [items, setItems] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;
    getOverview(cities)
      .then((data) => {
        if (!cancelled) setItems(data);
      })
      .catch(() => {
        if (!cancelled) setError(true);
      });
    return () => {
      cancelled = true;
    };
  }, [cities]);

  if (error) {
    return (
      <p className="text-sm text-slate-500 dark:text-slate-400">
        Không tải được thời tiết các thành phố.
      </p>
    );
  }

  return (
    <section>
      <h2 className="mb-3 text-lg font-semibold">Thời tiết các thành phố</h2>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {cities.map((city, i) => {
          const cur = items?.[i]?.current;
          if (!cur) {
            return (
              <div
                key={city.id}
                className="h-24 animate-pulse rounded-xl bg-slate-300 dark:bg-slate-700"
              />
            );
          }
          const { label, Icon } = describeWeather(cur.weather_code);
          return (
            <button
              key={city.id}
              onClick={() => onSelect(city)}
              className={cn(
                "flex items-center justify-between rounded-xl bg-linear-to-br p-3 text-left text-white shadow transition hover:scale-[1.02]",
                getTheme(cur.weather_code, cur.is_day)
              )}
            >
              <div>
                <p className="font-medium">{city.name}</p>
                <p className="text-xs opacity-90">{label}</p>
                <p className="mt-1 text-2xl font-bold">{Math.round(cur.temperature_2m)}°</p>
              </div>
              <Icon size={32} />
            </button>
          );
        })}
      </div>
    </section>
  );
}