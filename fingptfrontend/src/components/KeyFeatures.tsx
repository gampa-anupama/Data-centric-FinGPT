import React from 'react';
import { motion } from 'framer-motion';
import { GlobeIcon, SparklesIcon, CpuIcon, TrendingUpIcon, UnlockIcon } from 'lucide-react';
export function KeyFeatures() {
  const features = [{
    icon: GlobeIcon,
    title: '34+ Real-time Financial Data Sources',
    description: 'News, social media, filings, and research datasets',
    gradient: 'from-blue-400 to-cyan-400',
    stats: '99.9% uptime'
  }, {
    icon: SparklesIcon,
    title: 'Automated Data Cleaning & Filtering',
    description: 'Real-time curation and quality control',
    gradient: 'from-teal-400 to-emerald-400',
    stats: '< 1s latency'
  }, {
    icon: CpuIcon,
    title: 'Low-cost Fine-tuning using LoRA',
    description: 'Reduce training costs by 99.9%',
    gradient: 'from-orange-400 to-amber-400',
    stats: '$100s vs $2.67M'
  }, {
    icon: TrendingUpIcon,
    title: 'Reinforcement Learning with Stock Prices',
    description: 'RLSP for real-time model feedback',
    gradient: 'from-green-400 to-teal-400',
    stats: '+9.6% returns'
  }, {
    icon: UnlockIcon,
    title: 'Open-source & Accessible via API',
    description: 'Free for research and development',
    gradient: 'from-indigo-400 to-blue-400',
    stats: '100% open'
  }];
  return <div className="relative py-20 px-6">
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
          <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-teal-600 to-orange-500 bg-clip-text text-transparent">
            Key Features
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Everything you need to build financial AI applications
          </p>
        </motion.div>
        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {features.map((feature, index) => <motion.div key={feature.title} initial={{
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
          scale: 1.02
        }} className={`bg-white rounded-2xl p-6 shadow-lg border border-gray-100 ${index === features.length - 1 && features.length % 2 !== 0 ? 'md:col-span-2 md:max-w-2xl md:mx-auto' : ''}`}>
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 bg-gradient-to-br ${feature.gradient} rounded-xl flex items-center justify-center shadow-md flex-shrink-0`}>
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-lg font-bold text-gray-800 flex-1">
                      {feature.title}
                    </h3>
                    <span className={`px-3 py-1 bg-gradient-to-r ${feature.gradient} text-white text-xs font-bold rounded-full`}>
                      {feature.stats}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </div>
              </div>
            </motion.div>)}
        </div>
      </div>
    </div>;
}