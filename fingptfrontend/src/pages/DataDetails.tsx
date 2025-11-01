import React, { useState, createElement } from 'react';
import { Sidebar } from '../components/Sidebar';
import { motion } from 'framer-motion';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { DownloadIcon, ArrowLeftIcon } from 'lucide-react';
export function DataDetails() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const source = searchParams.get('source') || 'Unknown Source';
  const category = searchParams.get('category') || 'data';
  // Sample full dataset
  const fullData = Array.from({
    length: 50
  }, (_, i) => ({
    id: i + 1,
    title: `${source} Article ${i + 1}`,
    date: new Date(2024, 0, Math.floor(Math.random() * 28) + 1).toISOString().split('T')[0],
    source: source,
    sentiment: ['Positive', 'Negative', 'Neutral'][Math.floor(Math.random() * 3)],
    category: category,
    content: `Sample content for article ${i + 1} from ${source}`
  }));
  const handleDownload = () => {
    const csvContent = [['ID', 'Title', 'Date', 'Source', 'Sentiment', 'Category', 'Content'], ...fullData.map(row => [row.id, row.title, row.date, row.source, row.sentiment, row.category, row.content])].map(row => row.map(cell => `"${cell}"`).join(',')).join('\n');
    const blob = new Blob([csvContent], {
      type: 'text/csv'
    });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${source.replace(/\s+/g, '_')}_data.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };
  return <div className={`w-full min-h-screen flex transition-colors duration-300 ${isDarkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-[#FAF8F5] via-[#F0F4F8] to-[#E8F5F3]'}`}>
      <Sidebar isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
      <div className="flex-1 ml-64 h-screen overflow-y-auto p-6">
        <motion.div initial={{
        opacity: 0,
        y: 10
      }} animate={{
        opacity: 1,
        y: 0
      }} className="max-w-6xl mx-auto">
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button onClick={() => navigate('/scrape-data')} className="p-2 rounded-lg bg-white/60 backdrop-blur-sm text-gray-800 hover:bg-white/70 transition-all border border-white/20">
                <ArrowLeftIcon className="w-4 h-4" />
              </button>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-teal-600 to-teal-500 bg-clip-text text-transparent">
                  {source} - Full Data
                </h1>
                <p className="text-sm text-gray-600 mt-1">
                  {fullData.length} records
                </p>
              </div>
            </div>
            <motion.button whileHover={{
            scale: 1.02
          }} whileTap={{
            scale: 0.98
          }} onClick={handleDownload} className="px-4 py-2 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-lg hover:shadow-lg transition-all flex items-center gap-2 text-sm font-medium">
              <DownloadIcon className="w-4 h-4" />
              Download CSV
            </motion.button>
          </div>
          <div className="bg-white/60 backdrop-blur-sm rounded-xl border border-white/20 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-teal-50/50 border-b border-white/20 sticky top-0">
                  <tr>
                    <th className="p-3 text-left text-gray-800 font-semibold">
                      ID
                    </th>
                    <th className="p-3 text-left text-gray-800 font-semibold">
                      Title
                    </th>
                    <th className="p-3 text-left text-gray-800 font-semibold">
                      Date
                    </th>
                    <th className="p-3 text-left text-gray-800 font-semibold">
                      Source
                    </th>
                    <th className="p-3 text-left text-gray-800 font-semibold">
                      Sentiment
                    </th>
                    <th className="p-3 text-left text-gray-800 font-semibold">
                      Category
                    </th>
                    <th className="p-3 text-left text-gray-800 font-semibold">
                      Content
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {fullData.map((row, index) => <motion.tr key={row.id} initial={{
                  opacity: 0,
                  y: 10
                }} animate={{
                  opacity: 1,
                  y: 0
                }} transition={{
                  delay: index * 0.01
                }} className="border-b border-gray-100 hover:bg-white/30 transition-colors">
                      <td className="p-3 text-gray-600">{row.id}</td>
                      <td className="p-3 text-gray-600 max-w-xs truncate">
                        {row.title}
                      </td>
                      <td className="p-3 text-gray-600">{row.date}</td>
                      <td className="p-3 text-gray-600">{row.source}</td>
                      <td className="p-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${row.sentiment === 'Positive' ? 'bg-green-100 text-green-700' : row.sentiment === 'Negative' ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-700'}`}>
                          {row.sentiment}
                        </span>
                      </td>
                      <td className="p-3 text-gray-600">{row.category}</td>
                      <td className="p-3 text-gray-600 max-w-md truncate">
                        {row.content}
                      </td>
                    </motion.tr>)}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>
      </div>
    </div>;
}