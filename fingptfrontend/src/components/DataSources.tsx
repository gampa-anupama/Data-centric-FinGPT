import React from 'react';
import { motion } from 'framer-motion';
export function DataSources() {
  const sources = {
    News: ['Yahoo Finance', 'CNBC', 'Reuters', 'Seeking Alpha', 'Eastmoney'],
    'Social Media': ['Twitter (X)', 'Reddit', 'StockTwits', 'Weibo'],
    Filings: ['SEC', 'Juchao', 'Astock'],
    'Research Datasets': ['FiQA-SA', 'FPB', 'StockNet', 'CHRNN', 'Astock']
  };
  return <div id="data-sources" className="relative py-20 px-6 bg-gradient-to-b from-transparent to-teal-50/50">
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{
        opacity: 0,
        y: 20
      }} whileInView={{
        opacity: 1,
        y: 0
      }} viewport={{
        once: true
      }} className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-teal-600 to-teal-500 bg-clip-text text-transparent">
            Data Sources
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            34+ curated sources across news, social media, filings, and datasets
          </p>
        </motion.div>
        <div className="grid md:grid-cols-2 gap-8">
          {Object.entries(sources).map(([category, items], index) => <motion.div key={category} initial={{
          opacity: 0,
          x: index % 2 === 0 ? -20 : 20
        }} whileInView={{
          opacity: 1,
          x: 0
        }} viewport={{
          once: true
        }} transition={{
          delay: index * 0.1
        }} whileHover={{
          scale: 1.02
        }} className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all border border-gray-100">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">
                {category}
              </h3>
              <div className="flex flex-wrap gap-3">
                {items.map(item => <motion.span key={item} whileHover={{
              scale: 1.05
            }} className="px-4 py-2 bg-teal-50 text-teal-700 rounded-xl text-sm font-medium border border-teal-100 hover:border-teal-200 hover:bg-teal-100 transition-all">
                    {item}
                  </motion.span>)}
              </div>
            </motion.div>)}
        </div>
      </div>
    </div>;
}