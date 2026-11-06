import { cn } from "../lib/utils";
import { describeWeather } from "../utils/weatherCode";

export default function ForecastList({ daily }) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7">
      {daily.time.map((date, i) => {
        const { label, Icon } = describeWeather(daily.weather_code[i]);
        const day = new Date(date + "T00:00:00").toLocaleDateString("vi-VN", {
          weekday: "short",
          day: "2-digit",
          month: "2-digit",
        });
        return (
          <div
            key={date}
            className={cn(
              "flex flex-col items-center gap-1 rounded-xl bg-white p-3 text-center shadow-sm",
              i === 0 && "ring-2 ring-sky-400"
            )}
          >
            <p className="text-sm font-medium">{day}</p>
            <Icon className="text-sky-600" size={28} />
            <p className="text-xs text-slate-500">{label}</p>
            <p className="text-sm">
              <span className="font-semibold">{Math.round(daily.temperature_2m_max[i])}°</span>{" "}
              <span className="text-slate-500">{Math.round(daily.temperature_2m_min[i])}°</span>
            </p>
          </div>
        );
      })}
    </div>
  );
}