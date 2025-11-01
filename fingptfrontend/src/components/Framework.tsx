import React from 'react';
import { motion } from 'framer-motion';
import { DatabaseIcon, FilterIcon, BrainIcon, RocketIcon } from 'lucide-react';
export function Framework() {
  const layers = [{
    icon: DatabaseIcon,
    title: 'Data Source Layer',
    description: 'Collects data from 34+ Internet sources',
    details: ['Real-time news feeds', 'Social media APIs', 'Financial filings', 'Market datasets'],
    gradient: 'from-blue-400 to-cyan-400'
  }, {
    icon: FilterIcon,
    title: 'Data Curation Layer',
    description: 'Cleans and filters data in real time',
    details: ['Noise reduction', 'Quality validation', 'Format standardization', 'Duplicate removal'],
    gradient: 'from-teal-400 to-emerald-400'
  }, {
    icon: BrainIcon,
    title: 'LLM Layer',
    description: 'Fine-tunes models efficiently using LoRA',
    details: ['Low-cost training', 'Domain adaptation', 'Model optimization', 'Performance tuning'],
    gradient: 'from-orange-400 to-amber-400'
  }, {
    icon: RocketIcon,
    title: 'Application Layer',
    description: 'Real-world use cases like trading and robo-advisors',
    details: ['Trading strategies', 'Portfolio management', 'Risk analysis', 'Market insights'],
    gradient: 'from-rose-400 to-pink-400'
  }];
  return <div id="framework" className="relative py-20 px-6 bg-gradient-to-b from-teal-50/50 to-transparent">
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
          <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-teal-600 to-teal-500 bg-clip-text text-transparent">
            The FinGPT Framework
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A 4-layer architecture for democratizing financial AI
          </p>
        </motion.div>
        <div className="relative max-w-4xl mx-auto">
          {/* Vertical Timeline */}
          <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-teal-400 via-orange-400 to-rose-400 transform -translate-x-1/2 hidden md:block"></div>
          {layers.map((layer, index) => <motion.div key={layer.title} initial={{
          opacity: 0,
          x: index % 2 === 0 ? -50 : 50
        }} whileInView={{
          opacity: 1,
          x: 0
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.6,
          delay: index * 0.15
        }} className="relative mb-16 last:mb-0">
              <div className={`flex ${index % 2 === 0 ? 'md:justify-start' : 'md:justify-end'}`}>
                <div className="md:w-[calc(50%-2rem)]">
                  <motion.div whileHover={{
                y: -5,
                scale: 1.02
              }} transition={{
                duration: 0.3
              }} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                    <div className={`flex items-start gap-4 ${index % 2 !== 0 ? 'flex-row-reverse text-right' : ''}`}>
                      <div className={`w-14 h-14 bg-gradient-to-br ${layer.gradient} rounded-xl flex items-center justify-center shadow-md flex-shrink-0`}>
                        <layer.icon className="w-7 h-7 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="text-xs font-bold text-teal-600 mb-1">
                          Layer {index + 1}
                        </div>
                        <h3 className="text-xl font-bold text-gray-800 mb-2">
                          {layer.title}
                        </h3>
                        <p className="text-sm text-gray-600 mb-3">
                          {layer.description}
                        </p>
                        <div className="space-y-1">
                          {layer.details.map(detail => <div key={detail} className={`flex items-center gap-2 ${index % 2 !== 0 ? 'flex-row-reverse justify-end' : ''}`}>
                              <div className="w-1 h-1 bg-teal-500 rounded-full"></div>
                              <span className="text-xs text-gray-600">
                                {detail}
                              </span>
                            </div>)}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
              {/* Timeline dot */}
              <div className="hidden md:block absolute top-8 left-1/2 w-4 h-4 bg-white border-4 border-teal-500 rounded-full transform -translate-x-1/2 z-10"></div>
            </motion.div>)}
        </div>
      </div>
    </div>;
}