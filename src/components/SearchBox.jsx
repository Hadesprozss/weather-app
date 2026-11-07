import { useState } from "react";
import { Search, MapPin, Loader2 } from "lucide-react";
import { searchCity } from "../services/weatherService";

export default function SearchBox({ onSelect }) {
  const [text, setText] = useState("");
  const [results, setResults] = useState([]);
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = text.trim();
    if (!name) return;
    setLoading(true);
    setError("");
    try {
      setResults(await searchCity(name));
      setSearched(true);
    } catch {
      setResults([]);
      setError("Không kết nối được dịch vụ. Hãy kiểm tra mạng và thử lại.");
    } finally {
      setLoading(false);
    }
  };

  const pick = (place) => {
    setText(place.name);
    setResults([]);
    setSearched(false);
    onSelect(place);
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Nhập tên thành phố, ví dụ: Đà Nẵng"
          className="flex-1 rounded-xl border border-sky-200 bg-white px-4 py-2 outline-none focus:ring-2 focus:ring-sky-400 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100"
        />
        <button
          type="submit"
          disabled={loading}
          className="flex items-center gap-2 rounded-xl bg-sky-600 px-4 py-2 text-white hover:bg-sky-700 disabled:opacity-60"
        >
          {loading ? <Loader2 className="animate-spin" size={18} /> : <Search size={18} />}
          Tìm
        </button>
      </form>

      {error && <p className="mt-3 text-red-600 dark:text-red-400">{error}</p>}

      {searched && results.length === 0 && (
        <p className="mt-3 text-slate-600 dark:text-slate-300">
          Không tìm thấy địa danh nào khớp với "{text}". Hãy thử tên thành phố hoặc thị xã.
        </p>
      )}

      {results.length > 0 && (
        <ul className="mt-3 overflow-hidden rounded-xl border border-sky-100 bg-white dark:border-slate-700 dark:bg-slate-800">
          {results.map((p) => (
            <li key={p.id}>
              <button
                onClick={() => pick(p)}
                className="flex w-full items-center gap-2 px-4 py-2 text-left hover:bg-sky-50 dark:hover:bg-slate-700"
              >
                <MapPin size={16} className="text-sky-600 dark:text-sky-300" />
                {p.name}
                <span className="text-sm text-slate-500 dark:text-slate-400">
                  {[p.admin1, p.country].filter(Boolean).join(", ")}
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}