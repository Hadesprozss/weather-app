import axios from "axios";

const GEO_URL = "https://geocoding-api.open-meteo.com/v1/search";
const FORECAST_URL = "https://api.open-meteo.com/v1/forecast";

// GET 1: tìm thành phố theo tên -> danh sách địa điểm (rỗng nếu không thấy)
export async function searchCity(name) {
  const res = await axios.get(GEO_URL, {
    params: { name, count: 10, language: "vi" },
  });
  return res.data.results ?? [];
}

// GET 2: lấy thời tiết hiện tại + dự báo 7 ngày theo tọa độ
export async function getForecast(latitude, longitude) {
  const res = await axios.get(FORECAST_URL, {
    params: {
      latitude,
      longitude,
      current:
        "temperature_2m,apparent_temperature,relative_humidity_2m,weather_code,wind_speed_10m,is_day",
      hourly: "temperature_2m,weather_code,precipitation_probability",
      daily:
        "weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max",
      timezone: "auto",
      forecast_days: 7,
      forecast_hours: 24,
    },
  });
  return res.data;
}

// GET 3: lấy thời tiết hiện tại của nhiều thành phố chỉ bằng MỘT lần gọi
export async function getOverview(cities) {
  const res = await axios.get(FORECAST_URL, {
    params: {
      latitude: cities.map((c) => c.latitude).join(","),
      longitude: cities.map((c) => c.longitude).join(","),
      current: "temperature_2m,weather_code,is_day",
      timezone: "auto",
    },
  });
  // Nhiều tọa độ thì API trả về mảng; chỉ một tọa độ thì trả về đối tượng
  return Array.isArray(res.data) ? res.data : [res.data];
}