import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const API_BASE_URL = "http://127.0.0.1:8000";

interface NewsRecord {
  [key: string]: any;
}

const DataDetails: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const source = params.get("source") || "";

  const [data, setData] = useState<NewsRecord[]>([]);
  const [meta, setMeta] = useState<{ message?: string; rows?: number }>({});
  const [error, setError] = useState<string | null>(null);
  const [showFull, setShowFull] = useState(false);

  // Map frontend names → backend routes
  const sourceMap: Record<string, string> = {
    "CCTV News": "cctv-news",
    "Finnhub News": "finnhub-news",
    "AAPL News": "aapl-news",
    "CNBC News": "cnbc-news",
    "Yahoo News": "yahoo-news",
  };

  const backendSource =
    sourceMap[source] || source.toLowerCase().replace(/\s+/g, "-");

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Fetching from:", `${API_BASE_URL}/${backendSource}`);
        const res = await fetch(`${API_BASE_URL}/${backendSource}`);
        if (!res.ok) throw new Error("Failed to fetch data");

        const json = await res.json();

        if (json.error) {
          setError(json.error);
          setData([]);
        } else {
          setData(json.preview || []);
          setMeta({ message: json.message, rows: json.rows });
          setError(null);
        }
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to fetch data.");
      }
    };

    fetchData();
  }, [source]);

  // ✅ Download CSV handler
  const handleDownload = () => {
    const downloadUrl = `${API_BASE_URL}/${backendSource}/download`;
    window.open(downloadUrl, "_blank"); // open CSV in new tab or trigger download
  };

  return (
    <div className="min-h-screen bg-[#f6f9fc] p-8">
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-2xl p-6">
        <button
          onClick={() => navigate(-1)}
          className="mb-4 px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
        >
          ← Back
        </button>

        <h1 className="text-2xl font-bold text-[#009688] mb-2">
          {source} - Data
        </h1>

        <p className="text-gray-500 mb-4">
          {meta.rows ? `${meta.rows} records found` : "0 records"}
        </p>

        {error ? (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg">
            ⚠️ {error}
          </div>
        ) : data.length === 0 ? (
          <div className="text-gray-600 text-center py-10">
            ⏳ Loading or no data available...
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse border border-gray-300 rounded-lg">
                <thead>
                  <tr className="bg-[#009688] text-white">
                    {Object.keys(data[0]).map((key) => (
                      <th
                        key={key}
                        className="px-4 py-2 border border-gray-300 text-left"
                      >
                        {key}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {(showFull ? data : data.slice(0, 2)).map((row, i) => (
                    <tr
                      key={i}
                      className="hover:bg-gray-50 transition border-b border-gray-200"
                    >
                      {Object.values(row).map((value, j) => (
                        <td key={j} className="px-4 py-2 text-sm text-gray-700">
                          {String(value)}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Toggle and download buttons */}
            <div className="flex justify-between mt-6">
              <button
                onClick={() => setShowFull(!showFull)}
                className="px-4 py-2 bg-[#009688] text-white rounded-lg hover:bg-[#00796b] transition"
              >
                {showFull ? "Hide Full Details" : "View Full Details"}
              </button>

              <button
                onClick={handleDownload}
                className="px-4 py-2 bg-[#009688] text-white rounded-lg hover:bg-[#e68900] transition"
              >
                Download CSV
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default DataDetails;
