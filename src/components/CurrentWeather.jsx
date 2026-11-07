import { Droplets, Wind, Thermometer } from "lucide-react";
import { describeWeather } from "../utils/weatherCode";
import { getTheme } from "../utils/weatherTheme";
import { cn } from "../lib/utils";

export default function CurrentWeather({ place, current }) {
  const { label, Icon } = describeWeather(current.weather_code);
  const theme = getTheme(current.weather_code, current.is_day);

  return (
    <div className={cn("rounded-2xl bg-linear-to-br p-6 text-white shadow-lg", theme)}>
      <p className="text-lg">
        {place.name}
        {place.country ? `, ${place.country}` : ""}
      </p>
      <div className="mt-2 flex items-center gap-4">
        <Icon size={56} />
        <div>
          <p className="text-5xl font-bold">{Math.round(current.temperature_2m)}°C</p>
          <p>{label}</p>
        </div>
      </div>
      <div className="mt-4 flex flex-wrap gap-x-6 gap-y-1 text-sm">
        <span className="flex items-center gap-1">
          <Thermometer size={16} /> Cảm giác như {Math.round(current.apparent_temperature)}°C
        </span>
        <span className="flex items-center gap-1">
          <Droplets size={16} /> Độ ẩm {current.relative_humidity_2m}%
        </span>
        <span className="flex items-center gap-1">
          <Wind size={16} /> Gió {current.wind_speed_10m} km/h
        </span>
      </div>
    </div>
  );
}