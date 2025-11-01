import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SparklesIcon, MailIcon, LockIcon, UserIcon, TrendingUpIcon, CodeIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
type UserRole = 'investor' | 'developer' | null;
export function Auth() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [selectedRole, setSelectedRole] = useState<UserRole>(null);
  const navigate = useNavigate();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedRole) {
      localStorage.setItem('userRole', selectedRole);
      navigate('/chatbot');
    }
  };
  return <div className="min-h-screen bg-gradient-to-br from-[#FAF8F5] via-[#F0F4F8] to-[#E8F5F3] flex items-center justify-center p-6">
      <motion.div initial={{
      opacity: 0,
      y: 20
    }} animate={{
      opacity: 1,
      y: 0
    }} className="w-full max-w-md">
        <div className="text-center mb-6">
          <motion.div initial={{
          scale: 0
        }} animate={{
          scale: 1
        }} transition={{
          type: 'spring',
          duration: 0.6
        }} className="inline-flex items-center gap-2 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-teal-400 to-teal-600 rounded-xl flex items-center justify-center shadow-md">
              <SparklesIcon className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-teal-600 to-teal-500 bg-clip-text text-transparent">
              FinGPT
            </span>
          </motion.div>
          <h2 className="text-2xl font-bold text-gray-800 mb-1">
            {isSignUp ? 'Create your account' : 'Welcome back'}
          </h2>
          <p className="text-sm text-gray-600">
            {isSignUp ? 'Start your financial AI journey' : 'Continue your financial AI journey'}
          </p>
        </div>
        <motion.div initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        delay: 0.1
      }} className="bg-white/60 backdrop-blur-xl rounded-xl p-6 border border-white/20">
          {isSignUp && !selectedRole && <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Select Your Role
              </label>
              <div className="grid grid-cols-2 gap-3">
                <motion.button whileHover={{
              scale: 1.02
            }} whileTap={{
              scale: 0.98
            }} onClick={() => setSelectedRole('investor')} className="p-4 rounded-xl bg-white/50 backdrop-blur-sm border-2 border-white/20 hover:border-teal-300 transition-all text-center">
                  <TrendingUpIcon className="w-8 h-8 text-teal-600 mx-auto mb-2" />
                  <div className="text-sm font-bold text-gray-800">
                    Investor
                  </div>
                  <div className="text-xs text-gray-600 mt-1">
                    Portfolio & Trading
                  </div>
                </motion.button>
                <motion.button whileHover={{
              scale: 1.02
            }} whileTap={{
              scale: 0.98
            }} onClick={() => setSelectedRole('developer')} className="p-4 rounded-xl bg-white/50 backdrop-blur-sm border-2 border-white/20 hover:border-orange-300 transition-all text-center">
                  <CodeIcon className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                  <div className="text-sm font-bold text-gray-800">
                    Developer
                  </div>
                  <div className="text-xs text-gray-600 mt-1">
                    API & Data Access
                  </div>
                </motion.button>
              </div>
            </div>}
          {(!isSignUp || selectedRole) && <form onSubmit={handleSubmit} className="space-y-4">
              {isSignUp && selectedRole && <div className="mb-4 p-3 rounded-lg bg-teal-50/50 border border-teal-100 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {selectedRole === 'investor' ? <TrendingUpIcon className="w-4 h-4 text-teal-600" /> : <CodeIcon className="w-4 h-4 text-orange-600" />}
                    <span className="text-sm font-medium text-gray-700">
                      {selectedRole === 'investor' ? 'Investor Account' : 'Developer Account'}
                    </span>
                  </div>
                  <button type="button" onClick={() => setSelectedRole(null)} className="text-xs text-teal-600 hover:text-teal-700">
                    Change
                  </button>
                </div>}
              {isSignUp && <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <div className="relative">
                    <UserIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-teal-600" />
                    <input type="text" placeholder="John Doe" className="w-full pl-9 pr-3 py-2 text-sm bg-white/50 backdrop-blur-sm border border-white/20 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-transparent transition-all" />
                  </div>
                </div>}
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Email
                </label>
                <div className="relative">
                  <MailIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-teal-600" />
                  <input type="email" placeholder="you@example.com" className="w-full pl-9 pr-3 py-2 text-sm bg-white/50 backdrop-blur-sm border border-white/20 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-transparent transition-all" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <LockIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-teal-600" />
                  <input type="password" placeholder="••••••••" className="w-full pl-9 pr-3 py-2 text-sm bg-white/50 backdrop-blur-sm border border-white/20 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-transparent transition-all" />
                </div>
              </div>
              <motion.button whileHover={{
            scale: 1.02
          }} whileTap={{
            scale: 0.98
          }} type="submit" className="w-full py-2 text-sm bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-lg font-medium shadow-md hover:shadow-lg transition-all">
                {isSignUp ? 'Sign Up' : 'Sign In'}
              </motion.button>
              <div className="relative my-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="px-2 bg-white/60 text-gray-500">
                    Or continue with
                  </span>
                </div>
              </div>
              <motion.button whileHover={{
            scale: 1.02
          }} whileTap={{
            scale: 0.98
          }} type="button" className="w-full py-2 text-sm bg-white/50 backdrop-blur-sm border border-white/20 rounded-lg font-medium text-gray-700 hover:bg-white/70 transition-all flex items-center justify-center gap-2">
                <img src="https://www.google.com/favicon.ico" alt="Google" className="w-4 h-4" />
                Google
              </motion.button>
            </form>}
          <div className="mt-4 text-center">
            <button onClick={() => {
            setIsSignUp(!isSignUp);
            setSelectedRole(null);
          }} className="text-xs text-gray-600 hover:text-teal-600 transition-colors">
              {isSignUp ? 'Already have an account? Sign in' : "Don't have an account? Sign up"}
            </button>
          </div>
        </motion.div>
      </motion.div>
    </div>;
}