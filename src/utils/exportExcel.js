import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { describeWeather } from "./weatherCode";

export function exportForecast(placeName, daily) {
  const rows = daily.time.map((date, i) => ({
    "Ngày": date,
    "Thời tiết": describeWeather(daily.weather_code[i]).label,
    "Thấp nhất (°C)": daily.temperature_2m_min[i],
    "Cao nhất (°C)": daily.temperature_2m_max[i],
    "Xác suất mưa (%)": daily.precipitation_probability_max[i],
  }));

  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(rows), "Dự báo 7 ngày");
  const buffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });

  saveAs(
    new Blob([buffer], { type: "application/octet-stream" }),
    `du-bao-${placeName.replace(/\s+/g, "-")}.xlsx`
  );
}