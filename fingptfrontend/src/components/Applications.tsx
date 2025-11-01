import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUpIcon } from 'lucide-react';
export function Applications() {
  return <div id="applications" className="relative py-20 px-6 bg-gradient-to-b from-transparent to-teal-50/50">
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{
        opacity: 0,
        y: 20
      }} whileInView={{
        opacity: 1,
        y: 0
      }} viewport={{
        once: true
      }} transition={{
        duration: 0.6
      }} className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-teal-600 to-orange-500 bg-clip-text text-transparent">
            FinGPT in Action
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Real-world application demonstrating the power of FinGPT
          </p>
        </motion.div>
        <motion.div initial={{
        opacity: 0,
        y: 30
      }} whileInView={{
        opacity: 1,
        y: 0
      }} viewport={{
        once: true
      }} transition={{
        duration: 0.6
      }} className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row gap-6 items-center bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
            <motion.div whileHover={{
            scale: 1.05,
            rotate: 5
          }} transition={{
            duration: 0.3
          }} className="w-24 h-24 bg-gradient-to-br from-teal-400 to-emerald-400 rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0">
              <TrendingUpIcon className="w-12 h-12 text-white" />
            </motion.div>
            <div className="flex-1">
              <h3 className="text-3xl font-bold text-gray-800 mb-3">
                Sentiment Analysis for Quantitative Trading
              </h3>
              <p className="text-gray-600 mb-4 text-lg leading-relaxed">
                Uses market feedback to fine-tune models and improve trading
                strategies with sentiment data.
              </p>
              <div className="flex flex-wrap gap-2">
                {['Market sentiment', 'Automated trading', 'Backtesting'].map(feature => <span key={feature} className="px-4 py-2 bg-teal-50 rounded-xl text-sm font-medium text-teal-700 border border-teal-100">
                      {feature}
                    </span>)}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>;
}