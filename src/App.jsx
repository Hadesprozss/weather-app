import { useState } from "react";
import { CloudSun, FileSpreadsheet, Loader2 } from "lucide-react";
import SearchBox from "./components/SearchBox";
import CurrentWeather from "./components/CurrentWeather";
import ForecastList from "./components/ForecastList";
import { getForecast } from "./services/weatherService";
import { exportForecast } from "./utils/exportExcel";

export default function App() {
  const [place, setPlace] = useState(null);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSelect = async (p) => {
    setPlace(p);
    setData(null);
    setError("");
    setLoading(true);
    try {
      setData(await getForecast(p.latitude, p.longitude));
    } catch {
      setError("Không lấy được dữ liệu thời tiết. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-sky-50 text-slate-800">
      <main className="mx-auto max-w-4xl space-y-5 p-4">
        <h1 className="flex items-center gap-2 text-2xl font-bold text-sky-700">
          <CloudSun /> Tra cứu thời tiết
        </h1>

        <SearchBox onSelect={handleSelect} />

        {loading && (
          <p className="flex items-center gap-2 text-slate-600">
            <Loader2 className="animate-spin" size={18} /> Đang tải dữ liệu...
          </p>
        )}
        {error && <p className="text-red-600">{error}</p>}

        {data && (
          <>
            <CurrentWeather place={place} current={data.current} />
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Dự báo 7 ngày</h2>
              <button
                onClick={() => exportForecast(place.name, data.daily)}
                className="flex items-center gap-2 rounded-xl bg-emerald-600 px-3 py-2 text-sm text-white hover:bg-emerald-700"
              >
                <FileSpreadsheet size={16} /> Xuất Excel
              </button>
            </div>
            <ForecastList daily={data.daily} />
          </>
        )}
      </main>
    </div>
  );
}