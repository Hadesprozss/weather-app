import { useEffect, useRef, useState } from "react";
import { CloudSun, FileSpreadsheet, Moon, Sun } from "lucide-react";
import SearchBox from "./components/SearchBox";
import CityChips from "./components/CityChips";
import CurrentWeather from "./components/CurrentWeather";
import HourlyList from "./components/HourlyList";
import ForecastList from "./components/ForecastList";
import CitiesOverview from "./components/CitiesOverview";
import Skeleton from "./components/Skeleton";
import { getForecast } from "./services/weatherService";
import { exportForecast } from "./utils/exportExcel";
import { QUICK_CITIES } from "./data/cities";
import { useRecentCities } from "./hooks/useRecentCities";
import { useDarkMode } from "./hooks/useDarkMode";

export default function App() {
  const [place, setPlace] = useState(null);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true); // true để lần đầu vào trang hiện khung chờ
  const [error, setError] = useState("");
  const { recent, add } = useRecentCities();
  const [dark, toggleDark] = useDarkMode();
  const latest = useRef(0); // chống kết quả cũ ghi đè kết quả mới khi bấm nhanh

  const handleSelect = async (p, remember = true) => {
    const id = ++latest.current;
    setPlace(p);
    setData(null);
    setError("");
    setLoading(true);
    if (remember) add(p);
    try {
      const result = await getForecast(p.latitude, p.longitude);
      if (id === latest.current) setData(result);
    } catch {
      if (id === latest.current) setError("Không lấy được dữ liệu thời tiết. Vui lòng thử lại.");
    } finally {
      if (id === latest.current) setLoading(false);
    }
  };

  // A: tự tải thời tiết khi mở trang (nơi tra gần nhất, chưa có thì Hà Nội)
  useEffect(() => {
    handleSelect(recent[0] ?? QUICK_CITIES[0], false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Bấm thẻ ở bảng bên dưới thì xem chi tiết và cuộn lên đầu trang
  const pickFromOverview = (city) => {
    handleSelect(city);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-sky-50 text-slate-800 dark:bg-slate-900 dark:text-slate-100">
      <main className="mx-auto max-w-4xl space-y-5 p-4">
        <header className="flex items-center justify-between">
          <h1 className="flex items-center gap-2 text-2xl font-bold text-sky-700 dark:text-sky-300">
            <CloudSun /> Tra cứu thời tiết
          </h1>
          <button
            onClick={toggleDark}
            aria-label="Chuyển giao diện sáng/tối"
            className="rounded-full bg-white p-2 shadow-sm hover:bg-sky-100 dark:bg-slate-800 dark:hover:bg-slate-700"
          >
            {dark ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </header>

        <SearchBox onSelect={handleSelect} />

        <div className="space-y-3">
          <CityChips cities={QUICK_CITIES} onSelect={handleSelect} activeId={place?.id} />
          {recent.length > 0 && (
            <div>
              <p className="mb-2 text-sm text-slate-500 dark:text-slate-400">Tìm gần đây</p>
              <CityChips cities={recent} onSelect={handleSelect} activeId={place?.id} />
            </div>
          )}
        </div>

        {loading && <Skeleton />}
        {error && <p className="text-red-600 dark:text-red-400">{error}</p>}

        {data && (
          <>
            <CurrentWeather place={place} current={data.current} />

            <h2 className="text-lg font-semibold">Dự báo 24 giờ tới</h2>
            <HourlyList hourly={data.hourly} />

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

        {/* B: bảng thời tiết các thành phố */}
        <CitiesOverview cities={QUICK_CITIES} onSelect={pickFromOverview} />

        {/* D: ghi nguồn dữ liệu */}
        <footer className="border-t border-slate-200 pt-4 text-center text-sm text-slate-500 dark:border-slate-700 dark:text-slate-400">
          Dữ liệu thời tiết bởi{" "}
          <a
            href="https://open-meteo.com/"
            target="_blank"
            rel="noreferrer"
            className="text-sky-600 underline hover:text-sky-700 dark:text-sky-300"
          >
            Open-Meteo.com
          </a>
        </footer>
      </main>
    </div>
  );
}