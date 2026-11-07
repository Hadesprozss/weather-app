import { Droplets } from "lucide-react";
import { cn } from "../lib/utils";
import { describeWeather } from "../utils/weatherCode";

export default function ForecastList({ daily }) {
  const weekMin = Math.min(...daily.temperature_2m_min);
  const weekMax = Math.max(...daily.temperature_2m_max);
  const range = weekMax - weekMin || 1;

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7">
      {daily.time.map((date, i) => {
        const { label, Icon } = describeWeather(daily.weather_code[i]);
        const min = daily.temperature_2m_min[i];
        const max = daily.temperature_2m_max[i];
        const left = ((min - weekMin) / range) * 100;
        const width = Math.max(((max - min) / range) * 100, 10);
        const day = new Date(date + "T00:00:00").toLocaleDateString("vi-VN", {
          weekday: "short",
          day: "2-digit",
          month: "2-digit",
        });

        return (
          <div
            key={date}
            className={cn(
              "flex flex-col items-center gap-1 rounded-xl bg-white p-3 text-center shadow-sm dark:bg-slate-800",
              i === 0 && "ring-2 ring-sky-400"
            )}
          >
            <p className="text-sm font-medium">{day}</p>
            <Icon className="text-sky-600 dark:text-sky-300" size={28} />
            <p className="text-xs text-slate-500 dark:text-slate-400">{label}</p>
            <p className="flex items-center gap-1 text-xs text-sky-600 dark:text-sky-300">
              <Droplets size={12} /> {daily.precipitation_probability_max[i]}%
            </p>
            <div className="mt-1 h-1.5 w-full rounded-full bg-slate-200 dark:bg-slate-700">
              <div
                className="h-full rounded-full bg-linear-to-r from-sky-400 to-orange-400"
                style={{ marginLeft: `${left}%`, width: `${width}%` }}
              />
            </div>
            <p className="text-sm">
              <span className="font-semibold">{Math.round(max)}°</span>{" "}
              <span className="text-slate-500 dark:text-slate-400">{Math.round(min)}°</span>
            </p>
          </div>
        );
      })}
    </div>
  );
}