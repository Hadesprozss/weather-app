import axios from "axios";

const GEO_URL = "https://geocoding-api.open-meteo.com/v1/search";
const FORECAST_URL = "https://api.open-meteo.com/v1/forecast";

// GET 1: tìm thành phố theo tên -> danh sách địa điểm (rỗng nếu không thấy)
export async function searchCity(name) {
  const res = await axios.get(GEO_URL, {
    params: { name, count: 5, language: "vi" },
  });
  return res.data.results ?? [];
}

// GET 2: lấy thời tiết hiện tại + dự báo 7 ngày theo tọa độ
export async function getForecast(latitude, longitude) {
  const res = await axios.get(FORECAST_URL, {
    params: {
      latitude,
      longitude,
      current: "temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m",
      daily: "weather_code,temperature_2m_max,temperature_2m_min",
      timezone: "auto",
      forecast_days: 7,
    },
  });
  return res.data;
}