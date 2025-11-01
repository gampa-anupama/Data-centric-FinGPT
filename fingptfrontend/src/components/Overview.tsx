import React from 'react';
import { motion } from 'framer-motion';
import { AlertCircleIcon, TrendingDownIcon, TargetIcon } from 'lucide-react';
export function Overview() {
  return <div id="about" className="relative py-20 px-6">
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
            Why FinGPT?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Solving the fundamental challenges of financial AI
          </p>
        </motion.div>
        <div className="grid md:grid-cols-3 gap-8">
          {[{
          icon: AlertCircleIcon,
          title: 'The Problem',
          description: 'General-purpose LLMs like GPT-4 fail in finance because financial data is domain-specific, time-sensitive, and noisy.',
          gradient: 'from-red-400 to-orange-400'
        }, {
          icon: TrendingDownIcon,
          title: 'The Challenge',
          description: 'Few open financial datasets. Proprietary models like BloombergGPT are closed-source and cost $2.67M to train.',
          gradient: 'from-orange-400 to-amber-400'
        }, {
          icon: TargetIcon,
          title: "FinGPT's Goal",
          description: 'Democratize access to Internet-scale financial data for FinLLMs through open-source frameworks.',
          gradient: 'from-teal-400 to-cyan-400'
        }].map((item, index) => <motion.div key={item.title} initial={{
          opacity: 0,
          y: 20
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} transition={{
          delay: index * 0.1
        }} whileHover={{
          y: -10
        }} className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all border border-gray-100">
              <div className={`w-16 h-16 bg-gradient-to-br ${item.gradient} rounded-2xl flex items-center justify-center mb-6 shadow-md`}>
                <item.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                {item.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {item.description}
              </p>
            </motion.div>)}
        </div>
      </div>
    </div>;
}