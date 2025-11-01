import React, { useState } from 'react';
import { Sidebar } from '../components/Sidebar';
import { ChatInput } from '../components/ChatInput';
import { motion } from 'framer-motion';
import { SparklesIcon, TrendingUpIcon, DatabaseIcon, BotIcon } from 'lucide-react';
export function ChatBot() {
  const [messages, setMessages] = useState<Array<{
    role: string;
    content: string;
  }>>([]);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const handleSendMessage = (content: string) => {
    setMessages([...messages, {
      role: 'user',
      content
    }]);
  };
  const suggestionCards = [{
    icon: TrendingUpIcon,
    title: 'Analyze Market Trends',
    description: 'Get insights on current market sentiment and trading opportunities',
    gradient: 'from-blue-400 to-cyan-400'
  }, {
    icon: DatabaseIcon,
    title: 'Query Financial Data',
    description: 'Access real-time data from 34+ sources for comprehensive analysis',
    gradient: 'from-teal-400 to-emerald-400'
  }, {
    icon: BotIcon,
    title: 'Portfolio Optimization',
    description: 'Get AI-powered recommendations to optimize your investment portfolio',
    gradient: 'from-orange-400 to-amber-400'
  }];
  return <div className={`w-full min-h-screen flex transition-colors duration-300 ${isDarkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-[#FAF8F5] via-[#F0F4F8] to-[#E8F5F3]'}`}>
      <Sidebar isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
      <div className="flex-1 ml-64 flex flex-col h-screen">
        <div className="flex-1 overflow-y-auto p-6">
          {messages.length === 0 ? <div className="h-full flex items-center justify-center">
              <div className="max-w-4xl w-full">
                <motion.div initial={{
              opacity: 0,
              y: 20
            }} animate={{
              opacity: 1,
              y: 0
            }} transition={{
              duration: 0.6
            }} className="text-center mb-12">
                  <motion.div initial={{
                scale: 0
              }} animate={{
                scale: 1
              }} transition={{
                type: 'spring',
                duration: 0.6
              }} className="inline-flex items-center justify-center mb-6">
                    <div className="w-20 h-20 bg-gradient-to-br from-teal-400 to-teal-600 rounded-2xl flex items-center justify-center shadow-xl">
                      <SparklesIcon className="w-10 h-10 text-white" />
                    </div>
                  </motion.div>
                  <motion.h1 initial={{
                opacity: 0,
                y: 10
              }} animate={{
                opacity: 1,
                y: 0
              }} transition={{
                delay: 0.2,
                duration: 0.6
              }} className={`text-4xl md:text-5xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                    Hi, Ready to Achieve Great Things?
                  </motion.h1>
                  <motion.p initial={{
                opacity: 0,
                y: 10
              }} animate={{
                opacity: 1,
                y: 0
              }} transition={{
                delay: 0.3,
                duration: 0.6
              }} className={`text-lg ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Ask me anything about finance, investments, or data analysis
                  </motion.p>
                </motion.div>
                <div className="grid md:grid-cols-3 gap-4">
                  {suggestionCards.map((card, index) => <motion.button key={card.title} initial={{
                opacity: 0,
                y: 20
              }} animate={{
                opacity: 1,
                y: 0
              }} transition={{
                delay: 0.4 + index * 0.1,
                duration: 0.6
              }} whileHover={{
                y: -5,
                scale: 1.02
              }} whileTap={{
                scale: 0.98
              }} onClick={() => handleSendMessage(card.description)} className={`p-6 rounded-2xl text-left transition-all duration-300 ${isDarkMode ? 'bg-gray-800 hover:bg-gray-750 border border-gray-700' : 'bg-white/60 backdrop-blur-sm hover:bg-white/80 border border-white/20 shadow-lg hover:shadow-xl'}`}>
                      <div className={`w-12 h-12 bg-gradient-to-br ${card.gradient} rounded-xl flex items-center justify-center mb-4 shadow-md`}>
                        <card.icon className="w-6 h-6 text-white" />
                      </div>
                      <h3 className={`text-base font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                        {card.title}
                      </h3>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        {card.description}
                      </p>
                    </motion.button>)}
                </div>
              </div>
            </div> : <div className="max-w-3xl mx-auto space-y-4">
              {messages.map((message, index) => <motion.div key={index} initial={{
            opacity: 0,
            y: 10
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.3
          }} className={`${message.role === 'user' ? 'ml-auto max-w-md' : 'max-w-md'}`}>
                  <div className={`px-4 py-3 rounded-xl text-sm ${message.role === 'user' ? 'bg-gradient-to-r from-teal-500 to-teal-600 text-white' : isDarkMode ? 'bg-gray-800 text-gray-200 border border-gray-700' : 'bg-white/60 backdrop-blur-sm text-gray-800 border border-white/20'}`}>
                    <p>{message.content}</p>
                  </div>
                </motion.div>)}
            </div>}
        </div>
        <ChatInput onSend={handleSendMessage} isDarkMode={isDarkMode} />
      </div>
    </div>;
}