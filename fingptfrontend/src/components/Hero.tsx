import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { SparklesIcon, TrendingUpIcon, DatabaseIcon, ZapIcon } from 'lucide-react';
export function Hero() {
  const navigate = useNavigate();
  return <div id="home" className="relative pt-32 pb-20 px-6">
      <div className="relative max-w-7xl mx-auto">
        <div className="text-center">
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.6
        }} className="inline-flex items-center gap-2 px-6 py-3 bg-white/60 backdrop-blur-sm rounded-full border border-teal-200 shadow-sm mb-8">
            <ZapIcon className="w-4 h-4 text-teal-600" />
            <span className="text-sm font-medium text-teal-700">
              Open-source Financial AI Framework
            </span>
          </motion.div>
          <motion.h1 initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.6,
          delay: 0.1
        }} className="text-6xl md:text-8xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-teal-600 to-teal-500 bg-clip-text text-transparent">
              Democratizing
            </span>
            <br />
            <span className="text-gray-800">Internet-scale</span>
            <br />
            <span className="bg-gradient-to-r from-orange-500 to-coral-500 bg-clip-text text-transparent">
              Financial Data
            </span>
          </motion.h1>
          <motion.p initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.6,
          delay: 0.2
        }} className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
            FinGPT automates real-time financial data collection from 34+
            sources, enabling low-cost fine-tuning of large language models for
            finance.
          </motion.p>
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.6,
          delay: 0.3
        }} className="flex flex-wrap items-center justify-center gap-4">
            <motion.button whileHover={{
            scale: 1.05,
            y: -2
          }} whileTap={{
            scale: 0.95
          }} onClick={() => navigate('/auth')} className="px-8 py-4 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-2xl font-semibold shadow-lg shadow-teal-200 hover:shadow-xl hover:shadow-teal-300 transition-all flex items-center gap-2">
              <SparklesIcon className="w-5 h-5" />
              Get Started Free
            </motion.button>
            <motion.button whileHover={{
            scale: 1.05,
            y: -2
          }} whileTap={{
            scale: 0.95
          }} className="px-8 py-4 bg-white text-gray-700 rounded-2xl font-semibold border-2 border-gray-200 hover:border-teal-300 shadow-md hover:shadow-lg transition-all">
              View on GitHub
            </motion.button>
          </motion.div>
          <motion.div initial={{
          opacity: 0,
          y: 40
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.8,
          delay: 0.4
        }} className="mt-20 grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[{
            icon: DatabaseIcon,
            label: '34+ Data Sources',
            value: 'Real-time',
            color: 'teal'
          }, {
            icon: TrendingUpIcon,
            label: 'Cost Reduction',
            value: '99.9%',
            color: 'orange'
          }, {
            icon: SparklesIcon,
            label: 'Model Accuracy',
            value: '+9.6%',
            color: 'blue'
          }].map((stat, index) => <motion.div key={stat.label} initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            delay: 0.5 + index * 0.1
          }} whileHover={{
            y: -5
          }} className="bg-white rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all border border-gray-100">
                <div className={`w-12 h-12 bg-gradient-to-br from-${stat.color}-400 to-${stat.color}-500 rounded-xl flex items-center justify-center mb-4 mx-auto shadow-md`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <p className="text-4xl font-bold text-gray-800 mb-1">
                  {stat.value}
                </p>
                <p className="text-sm text-gray-500">{stat.label}</p>
              </motion.div>)}
          </motion.div>
        </div>
      </div>
    </div>;
}