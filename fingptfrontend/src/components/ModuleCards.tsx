import React from 'react';
import { MessageSquareIcon, TrendingUpIcon, DatabaseIcon } from 'lucide-react';
import { motion } from 'framer-motion';
const modules = [{
  icon: MessageSquareIcon,
  title: 'AI Chatbot',
  description: 'Interact with our intelligent chatbot to get instant financial insights, analysis, and answers to your queries.',
  color: 'from-blue-600 to-cyan-600',
  delay: 0.2
}, {
  icon: TrendingUpIcon,
  title: 'Portfolio Manager',
  description: 'Track and manage your investments with real-time data, interactive charts, and personalized alerts.',
  color: 'from-slate-700 to-blue-700',
  delay: 0.3
}, {
  icon: DatabaseIcon,
  title: 'Data Scraper',
  description: 'Access financial news, social media trends, filings, and datasets from multiple sources in one place.',
  color: 'from-slate-800 to-blue-800',
  delay: 0.4
}];
export function ModuleCards() {
  return <div id="features" className="max-w-7xl mx-auto px-6 py-16">
      <motion.h2 initial={{
      y: 20,
      opacity: 0
    }} whileInView={{
      y: 0,
      opacity: 1
    }} viewport={{
      once: true
    }} transition={{
      duration: 0.6
    }} className="text-4xl font-bold text-center mb-12 text-gray-800">
        Powerful Features
      </motion.h2>
      <div className="grid md:grid-cols-3 gap-8">
        {modules.map((module, index) => <motion.div key={module.title} initial={{
        y: 50,
        opacity: 0
      }} whileInView={{
        y: 0,
        opacity: 1
      }} viewport={{
        once: true
      }} transition={{
        duration: 0.6,
        delay: module.delay
      }} whileHover={{
        y: -10,
        transition: {
          duration: 0.2
        }
      }} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer">
            <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${module.color} flex items-center justify-center mb-6`}>
              <module.icon className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-4 text-gray-800">
              {module.title}
            </h3>
            <p className="text-gray-600 leading-relaxed">
              {module.description}
            </p>
            <motion.button whileHover={{
          x: 5
        }} className="mt-6 text-blue-900 font-semibold flex items-center gap-2 hover:gap-3 transition-all">
              Learn More
              <span>→</span>
            </motion.button>
          </motion.div>)}
      </div>
    </div>;
}