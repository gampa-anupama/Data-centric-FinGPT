import React, { useState } from 'react';
import { Sidebar } from '../components/Sidebar';
import { ChatInput } from '../components/ChatInput';
import { TrendingUpIcon, TrendingDownIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
const portfolioData = [{
  month: 'Jan',
  value: 45000
}, {
  month: 'Feb',
  value: 52000
}, {
  month: 'Mar',
  value: 48000
}, {
  month: 'Apr',
  value: 61000
}, {
  month: 'May',
  value: 58000
}, {
  month: 'Jun',
  value: 67000
}];
const alerts = [{
  type: 'positive',
  message: 'AAPL stock up 5.2% today',
  time: '2 hours ago'
}, {
  type: 'negative',
  message: 'Portfolio volatility increased',
  time: '5 hours ago'
}, {
  type: 'positive',
  message: 'Dividend payment received',
  time: '1 day ago'
}, {
  type: 'negative',
  message: 'TSLA below target price',
  time: '2 days ago'
}];
export function Portfolio() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  return <div className={`w-full min-h-screen flex transition-colors duration-300 ${isDarkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-[#FAF8F5] via-[#F0F4F8] to-[#E8F5F3]'}`}>
      <Sidebar isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
      <div className="flex-1 ml-64 flex flex-col h-screen">
        <div className="flex-1 overflow-y-auto p-6">
          <motion.div initial={{
          opacity: 0,
          y: 10
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.6
        }} className="max-w-6xl mx-auto">
            <h1 className="text-2xl font-bold mb-6 bg-gradient-to-r from-teal-600 to-teal-500 bg-clip-text text-transparent">
              Portfolio Dashboard
            </h1>
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <motion.div whileHover={{
              y: -2
            }} className="bg-white/60 backdrop-blur-sm p-4 rounded-xl border border-white/20">
                <p className="text-xs text-gray-600 mb-1">Total Value</p>
                <p className="text-2xl font-bold text-gray-800">$67,000</p>
                <p className="text-green-500 text-xs mt-1 flex items-center gap-1">
                  <TrendingUpIcon className="w-3 h-3" />
                  +12.5% this month
                </p>
              </motion.div>
              <motion.div whileHover={{
              y: -2
            }} className="bg-white/60 backdrop-blur-sm p-4 rounded-xl border border-white/20">
                <p className="text-xs text-gray-600 mb-1">Total Gain/Loss</p>
                <p className="text-2xl font-bold text-green-500">+$8,450</p>
                <p className="text-green-500 text-xs mt-1">+14.4% overall</p>
              </motion.div>
              <motion.div whileHover={{
              y: -2
            }} className="bg-white/60 backdrop-blur-sm p-4 rounded-xl border border-white/20">
                <p className="text-xs text-gray-600 mb-1">Active Positions</p>
                <p className="text-2xl font-bold text-gray-800">12</p>
                <p className="text-xs mt-1 text-gray-600">Across 4 sectors</p>
              </motion.div>
            </div>
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="bg-white/60 backdrop-blur-sm p-4 rounded-xl border border-white/20">
                <h3 className="text-sm font-bold mb-3 text-gray-800">
                  Portfolio Value
                </h3>
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={portfolioData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="month" stroke="#6b7280" style={{
                    fontSize: '12px'
                  }} />
                    <YAxis stroke="#6b7280" style={{
                    fontSize: '12px'
                  }} />
                    <Tooltip contentStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '12px'
                  }} />
                    <Line type="monotone" dataKey="value" stroke="#14B8A6" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="bg-white/60 backdrop-blur-sm p-4 rounded-xl border border-white/20">
                <h3 className="text-sm font-bold mb-3 text-gray-800">
                  Monthly Performance
                </h3>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={portfolioData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="month" stroke="#6b7280" style={{
                    fontSize: '12px'
                  }} />
                    <YAxis stroke="#6b7280" style={{
                    fontSize: '12px'
                  }} />
                    <Tooltip contentStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '12px'
                  }} />
                    <Bar dataKey="value" fill="#14B8A6" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div className="bg-white/60 backdrop-blur-sm p-4 rounded-xl border border-white/20">
              <h3 className="text-sm font-bold mb-3 text-gray-800">
                Alerts & Notifications
              </h3>
              <div className="space-y-2">
                {alerts.map((alert, index) => <div key={index} className={`p-3 rounded-lg flex items-start gap-2 text-sm ${alert.type === 'positive' ? 'bg-green-50/50 border border-green-100' : 'bg-red-50/50 border border-red-100'}`}>
                    {alert.type === 'positive' ? <TrendingUpIcon className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" /> : <TrendingDownIcon className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />}
                    <div className="flex-1">
                      <p className="font-medium text-gray-800">
                        {alert.message}
                      </p>
                      <p className="text-xs text-gray-600 mt-0.5">
                        {alert.time}
                      </p>
                    </div>
                  </div>)}
              </div>
            </div>
          </motion.div>
        </div>
        <ChatInput onSend={msg => console.log(msg)} isDarkMode={isDarkMode} />
      </div>
    </div>;
}