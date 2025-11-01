import React, { useEffect, useState } from 'react';
import { MoonIcon, SunIcon, PlusIcon, SearchIcon, TrendingUpIcon, DatabaseIcon, MessageSquareIcon, SparklesIcon, LogOutIcon, ChevronDownIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
interface SidebarProps {
  isDarkMode: boolean;
  setIsDarkMode: (value: boolean) => void;
}
export function Sidebar({
  isDarkMode,
  setIsDarkMode
}: SidebarProps) {
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState<string | null>(null);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [conversations] = useState(['Financial Analysis Q1 2024', 'Portfolio Review', 'Market Trends Discussion', 'Investment Strategy']);
  useEffect(() => {
    const role = localStorage.getItem('userRole');
    setUserRole(role);
  }, []);
  const handleLogout = () => {
    localStorage.removeItem('userRole');
    navigate('/auth');
  };
  return <div className={`w-64 h-screen flex flex-col border-r shadow-xl fixed left-0 top-0 transition-colors duration-300 ${isDarkMode ? 'bg-gray-900 border-gray-800' : 'bg-white/40 backdrop-blur-xl border-white/20'}`}>
      {/* Header */}
      <div className={`p-4 border-b transition-colors duration-300 ${isDarkMode ? 'border-gray-800' : 'border-white/10'}`}>
        <div className="flex items-center justify-between mb-4">
          <motion.div whileHover={{
          scale: 1.05
        }} transition={{
          duration: 0.2
        }} className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
            <div className="w-8 h-8 bg-gradient-to-br from-teal-400 to-teal-600 rounded-lg flex items-center justify-center shadow-md">
              <SparklesIcon className="w-4 h-4 text-white" />
            </div>
            <div>
              <h1 className="text-sm font-bold bg-gradient-to-r from-teal-600 to-teal-500 bg-clip-text text-transparent">
                FinGPT
              </h1>
            </div>
          </motion.div>
          <motion.button whileHover={{
          scale: 1.1
        }} whileTap={{
          scale: 0.9
        }} transition={{
          duration: 0.2
        }} onClick={() => setIsDarkMode(!isDarkMode)} className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300 ${isDarkMode ? 'bg-gray-800 text-gray-300 hover:bg-gray-750' : 'bg-white/50 backdrop-blur-sm text-gray-600 hover:bg-white/70 border border-white/20'}`}>
            {isDarkMode ? <SunIcon className="w-4 h-4" /> : <MoonIcon className="w-4 h-4" />}
          </motion.button>
        </div>
        <motion.button whileHover={{
        scale: 1.02
      }} whileTap={{
        scale: 0.98
      }} transition={{
        duration: 0.2
      }} className="w-full px-3 py-2 rounded-lg bg-gradient-to-r from-teal-500 to-teal-600 text-white text-sm hover:shadow-lg transition-all duration-300 flex items-center gap-2 justify-center font-medium">
          <PlusIcon className="w-4 h-4" />
          <span>New Chat</span>
        </motion.button>
      </div>
      {/* Search */}
      <div className="px-4 py-3">
        <div className="relative">
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input type="text" placeholder="Search..." className={`w-full pl-9 pr-3 py-2 text-sm rounded-lg transition-all duration-300 focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-transparent ${isDarkMode ? 'bg-gray-800 border border-gray-700 text-gray-200 placeholder-gray-500' : 'bg-white/50 backdrop-blur-sm border border-white/20 text-gray-800 placeholder-gray-400'}`} />
        </div>
      </div>
      {/* Quick Actions */}
      <div className="px-4 py-2 space-y-1">
        {userRole === 'investor' && <motion.button whileHover={{
        x: 2
      }} whileTap={{
        scale: 0.98
      }} transition={{
        duration: 0.2
      }} onClick={() => navigate('/portfolio')} className={`w-full px-3 py-2 rounded-lg transition-all duration-300 flex items-center gap-2 text-sm font-medium ${isDarkMode ? 'bg-gray-800 border border-gray-700 hover:bg-gray-750 text-gray-300' : 'bg-white/30 backdrop-blur-sm border border-white/20 hover:bg-white/50 text-gray-700'}`}>
            <TrendingUpIcon className="w-4 h-4" />
            <span>Portfolio</span>
          </motion.button>}
        {userRole === 'developer' && <motion.button whileHover={{
        x: 2
      }} whileTap={{
        scale: 0.98
      }} transition={{
        duration: 0.2
      }} onClick={() => navigate('/scrape-data')} className={`w-full px-3 py-2 rounded-lg transition-all duration-300 flex items-center gap-2 text-sm font-medium ${isDarkMode ? 'bg-gray-800 border border-gray-700 hover:bg-gray-750 text-gray-300' : 'bg-white/30 backdrop-blur-sm border border-white/20 hover:bg-white/50 text-gray-700'}`}>
            <DatabaseIcon className="w-4 h-4" />
            <span>Data Scraper</span>
          </motion.button>}
      </div>
      {/* Conversations - Scrollable */}
      <div className="flex-1 overflow-y-auto px-4 py-2">
        <div className="flex items-center justify-between mb-2">
          <h3 className={`text-xs font-semibold uppercase tracking-wide transition-colors duration-300 ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>
            Recent
          </h3>
          <span className="text-xs text-gray-400">{conversations.length}</span>
        </div>
        <div className="space-y-1">
          {conversations.map((conv, index) => <motion.button key={index} whileHover={{
          x: 2
        }} transition={{
          duration: 0.2
        }} className={`w-full p-2 rounded-lg transition-all duration-300 text-left flex items-center gap-2 group ${isDarkMode ? 'bg-gray-800/50 border border-gray-800 hover:bg-gray-800' : 'bg-white/20 backdrop-blur-sm border border-white/10 hover:bg-white/30'}`}>
              <MessageSquareIcon className="w-3 h-3 text-gray-600" />
              <span className={`text-xs truncate font-medium transition-colors duration-300 ${isDarkMode ? 'text-gray-400' : 'text-gray-700'}`}>
                {conv}
              </span>
            </motion.button>)}
        </div>
      </div>
      {/* Footer */}
      <div className={`p-4 border-t transition-colors duration-300 ${isDarkMode ? 'border-gray-800' : 'border-white/10'}`}>
        <div className="relative">
          <motion.button whileHover={{
          scale: 1.02
        }} whileTap={{
          scale: 0.98
        }} transition={{
          duration: 0.2
        }} onClick={() => setShowProfileMenu(!showProfileMenu)} className={`w-full flex items-center gap-2 p-2 rounded-lg transition-all duration-300 ${isDarkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white/30 backdrop-blur-sm border border-white/20'}`}>
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center text-white text-xs font-bold">
              JD
            </div>
            <div className="flex-1 min-w-0 text-left">
              <p className={`text-xs font-semibold truncate transition-colors duration-300 ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                John Doe
              </p>
              <p className="text-xs text-gray-500 truncate">
                {userRole === 'investor' ? 'Investor' : userRole === 'developer' ? 'Developer' : 'User'}
              </p>
            </div>
            <ChevronDownIcon className={`w-4 h-4 transition-transform duration-200 ${showProfileMenu ? 'rotate-180' : ''} ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`} />
          </motion.button>
          <AnimatePresence>
            {showProfileMenu && <motion.div initial={{
            opacity: 0,
            y: -10
          }} animate={{
            opacity: 1,
            y: 0
          }} exit={{
            opacity: 0,
            y: -10
          }} transition={{
            duration: 0.2
          }} className={`absolute bottom-full left-0 right-0 mb-2 rounded-lg overflow-hidden shadow-lg ${isDarkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'}`}>
                <motion.button whileHover={{
              x: 2
            }} transition={{
              duration: 0.2
            }} onClick={handleLogout} className={`w-full px-3 py-2 text-left text-sm flex items-center gap-2 transition-colors duration-200 ${isDarkMode ? 'text-gray-300 hover:bg-gray-750' : 'text-gray-700 hover:bg-gray-50'}`}>
                  <LogOutIcon className="w-4 h-4" />
                  <span>Logout</span>
                </motion.button>
              </motion.div>}
          </AnimatePresence>
        </div>
      </div>
    </div>;
}