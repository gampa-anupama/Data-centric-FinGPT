import React, { useState, Component } from 'react';
import { Sidebar } from '../components/Sidebar';
import { ChevronDownIcon, ChevronRightIcon, ExternalLinkIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
const dataSources = {
  news: ['CNN', 'BBC', 'Reuters', 'Bloomberg', 'Financial Times'],
  socialMedia: ['Twitter', 'Reddit', 'LinkedIn', 'StockTwits'],
  filings: ['SEC Edgar', 'Companies House', 'SEDAR'],
  datasets: ['Yahoo Finance', 'Alpha Vantage', 'Quandl', 'Federal Reserve']
};
export function ScrapData() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [expandedSources, setExpandedSources] = useState<Record<string, boolean>>({});
  const navigate = useNavigate();
  const toggleSource = (source: string) => {
    setExpandedSources(prev => ({
      ...prev,
      [source]: !prev[source]
    }));
  };
  const categories = [{
    id: 'news',
    label: 'News',
    icon: '📰'
  }, {
    id: 'socialMedia',
    label: 'Social Media',
    icon: '💬'
  }, {
    id: 'filings',
    label: 'Filings',
    icon: '📄'
  }, {
    id: 'datasets',
    label: 'Datasets',
    icon: '📊'
  }];
  return <div className={`w-full min-h-screen flex transition-colors duration-300 ${isDarkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-[#FAF8F5] via-[#F0F4F8] to-[#E8F5F3]'}`}>
      <Sidebar isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
      <div className="flex-1 ml-64 h-screen overflow-y-auto p-6">
        <motion.div initial={{
        opacity: 0,
        y: 10
      }} animate={{
        opacity: 1,
        y: 0
      }} className="max-w-5xl mx-auto">
          <h1 className="text-2xl font-bold mb-6 bg-gradient-to-r from-teal-600 to-teal-500 bg-clip-text text-transparent">
            Data Scraper
          </h1>
          {!selectedCategory ? <div className="grid md:grid-cols-2 gap-4">
              {categories.map(category => <motion.button key={category.id} whileHover={{
            y: -2
          }} whileTap={{
            scale: 0.98
          }} onClick={() => setSelectedCategory(category.id)} className="bg-white/60 backdrop-blur-sm p-6 rounded-xl border border-white/20 hover:bg-white/70 transition-all text-left">
                  <div className="text-4xl mb-2">{category.icon}</div>
                  <h3 className="text-lg font-bold text-gray-800">
                    {category.label}
                  </h3>
                </motion.button>)}
            </div> : <div>
              <button onClick={() => setSelectedCategory(null)} className="mb-4 px-4 py-2 rounded-lg bg-white/60 backdrop-blur-sm text-gray-800 hover:bg-white/70 transition-all border border-white/20 text-sm font-medium">
                ← Back
              </button>
              <div className="space-y-3">
                {dataSources[selectedCategory as keyof typeof dataSources].map(source => <div key={source} className="bg-white/60 backdrop-blur-sm rounded-xl border border-white/20 overflow-hidden">
                      <div className="p-4 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <button onClick={() => toggleSource(source)} className="p-1 rounded-lg hover:bg-white/50 transition-colors">
                            {expandedSources[source] ? <ChevronDownIcon className="w-4 h-4 text-gray-800" /> : <ChevronRightIcon className="w-4 h-4 text-gray-800" />}
                          </button>
                          <h3 className="text-sm font-semibold text-gray-800">
                            {source}
                          </h3>
                        </div>
                        <button className="px-4 py-1.5 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-lg hover:shadow-md transition-all text-sm font-medium">
                          Scrape Data
                        </button>
                      </div>
                      <AnimatePresence>
                        {expandedSources[source] && <motion.div initial={{
                  height: 0,
                  opacity: 0
                }} animate={{
                  height: 'auto',
                  opacity: 1
                }} exit={{
                  height: 0,
                  opacity: 0
                }} className="border-t border-white/20">
                            <div className="p-4">
                              <div className="mb-3 p-3 rounded-lg bg-teal-50/50 border border-teal-100">
                                <div className="flex items-center justify-between mb-2">
                                  <h4 className="font-semibold text-gray-800 text-sm">
                                    📌 Main Highlights
                                  </h4>
                                  <button onClick={() => navigate(`/data-details?source=${encodeURIComponent(source)}&category=${selectedCategory}`)} className="flex items-center gap-1 text-xs text-teal-600 hover:text-teal-700 font-medium">
                                    View Full Details
                                    <ExternalLinkIcon className="w-3 h-3" />
                                  </button>
                                </div>
                                <ul className="space-y-0.5 text-xs text-gray-600">
                                  <li>
                                    • Market sentiment shows positive trends
                                  </li>
                                  <li>• Technology sector leading growth</li>
                                  <li>• Increased trading volume detected</li>
                                </ul>
                              </div>
                              <div className="overflow-x-auto">
                                <table className="w-full text-sm">
                                  <thead className="bg-gray-50/50 rounded-lg">
                                    <tr>
                                      <th className="p-2 text-left text-gray-800 font-semibold">
                                        Title
                                      </th>
                                      <th className="p-2 text-left text-gray-800 font-semibold">
                                        Date
                                      </th>
                                      <th className="p-2 text-left text-gray-800 font-semibold">
                                        Source
                                      </th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {[1, 2, 3].map(i => <tr key={i} className="border-t border-gray-100">
                                        <td className="p-2 text-gray-600">
                                          Sample Article {i}
                                        </td>
                                        <td className="p-2 text-gray-600">
                                          2024-01-15
                                        </td>
                                        <td className="p-2 text-gray-600">
                                          {source}
                                        </td>
                                      </tr>)}
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </motion.div>}
                      </AnimatePresence>
                    </div>)}
              </div>
            </div>}
        </motion.div>
      </div>
    </div>;
}