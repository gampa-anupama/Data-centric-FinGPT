import React, { useState } from 'react';
import { SparklesIcon, MenuIcon, XIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
export function Navbar() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuItems = [{
    label: 'Home',
    href: '#home'
  }, {
    label: 'About',
    href: '#about'
  }, {
    label: 'Framework',
    href: '#framework'
  }, {
    label: 'Data Sources',
    href: '#data-sources'
  }, {
    label: 'Applications',
    href: '#applications'
  }, {
    label: 'Contact',
    href: '#contact'
  }];
  return <motion.nav initial={{
    y: -100
  }} animate={{
    y: 0
  }} className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-teal-100/50 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <motion.div whileHover={{
          scale: 1.05
        }} className="flex items-center gap-3 cursor-pointer">
            <div className="w-12 h-12 bg-gradient-to-br from-teal-400 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg shadow-teal-200">
              <SparklesIcon className="w-7 h-7 text-white" />
            </div>
            <div>
              <span className="text-2xl font-bold bg-gradient-to-r from-teal-600 to-teal-500 bg-clip-text text-transparent">
                FinGPT
              </span>
              <p className="text-xs text-gray-500">AI-Powered Finance</p>
            </div>
          </motion.div>
          <div className="hidden md:flex items-center gap-8">
            {menuItems.map(item => <a key={item.label} href={item.href} className="text-gray-600 hover:text-teal-600 transition-colors font-medium relative group">
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-teal-500 group-hover:w-full transition-all duration-300"></span>
              </a>)}
          </div>
          <div className="hidden md:flex items-center gap-4">
            <motion.button whileHover={{
            scale: 1.05
          }} whileTap={{
            scale: 0.95
          }} onClick={() => navigate('/auth')} className="px-8 py-3 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-2xl font-semibold shadow-lg shadow-teal-200 hover:shadow-xl hover:shadow-teal-300 transition-all">
              Get Started
            </motion.button>
          </div>
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden p-2 rounded-xl bg-teal-50 text-teal-600">
            {isMenuOpen ? <XIcon className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
          </button>
        </div>
        <AnimatePresence>
          {isMenuOpen && <motion.div initial={{
          opacity: 0,
          height: 0
        }} animate={{
          opacity: 1,
          height: 'auto'
        }} exit={{
          opacity: 0,
          height: 0
        }} className="md:hidden mt-4 space-y-2 bg-white rounded-2xl p-4 shadow-lg">
              {menuItems.map(item => <a key={item.label} href={item.href} className="block py-2 text-gray-600 hover:text-teal-600 transition-colors" onClick={() => setIsMenuOpen(false)}>
                  {item.label}
                </a>)}
              <button onClick={() => navigate('/auth')} className="w-full mt-4 px-6 py-2 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-xl font-semibold">
                Get Started
              </button>
            </motion.div>}
        </AnimatePresence>
      </div>
    </motion.nav>;
}