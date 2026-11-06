import { Droplets, Wind } from "lucide-react";
import { describeWeather } from "../utils/weatherCode";

export default function CurrentWeather({ place, current }) {
  const { label, Icon } = describeWeather(current.weather_code);

  return (
    <div className="rounded-2xl bg-sky-600 p-6 text-white shadow">
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
      <div className="mt-4 flex gap-6 text-sm">
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