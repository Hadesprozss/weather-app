import { describeWeather } from "../utils/weatherCode";

export default function HourlyList({ hourly }) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2 dark:[color-scheme:dark]">
      {hourly.time.map((t, i) => {
        const { Icon } = describeWeather(hourly.weather_code[i]);
        return (
          <div
            key={t}
            className="flex min-w-17 flex-col items-center gap-1 rounded-xl bg-white p-3 text-center shadow-sm dark:bg-slate-800"
          >
            <p className="text-xs text-slate-500 dark:text-slate-400">{t.slice(11, 16)}</p>
            <Icon className="text-sky-600 dark:text-sky-300" size={24} />
            <p className="text-sm font-semibold">{Math.round(hourly.temperature_2m[i])}°</p>
            <p className="text-xs text-sky-600 dark:text-sky-300">
              {hourly.precipitation_probability[i]}%
            </p>
          </div>
        );
      })}
    </div>
  );
}