import React from 'react';
import { motion } from 'framer-motion';
import { UsersIcon, DollarSignIcon, RocketIcon } from 'lucide-react';
export function Future() {
  const goals = [{
    icon: UsersIcon,
    title: 'Democratize FinLLMs',
    description: 'Make financial AI accessible to researchers and small developers worldwide',
    gradient: 'from-blue-400 to-cyan-400',
    metric: '10K+ users'
  }, {
    icon: DollarSignIcon,
    title: 'Reduce Costs',
    description: 'Lower model adaptation costs from millions to hundreds of dollars',
    gradient: 'from-teal-400 to-emerald-400',
    metric: '99.9% savings'
  }, {
    icon: RocketIcon,
    title: 'Enable Innovation',
    description: 'Foster community-driven financial AI innovation and collaboration',
    gradient: 'from-orange-400 to-amber-400',
    metric: '100% open'
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
            Open Financial AI Ecosystem
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Building the future of accessible financial AI
          </p>
        </motion.div>
        <div className="max-w-5xl mx-auto">
          {goals.map((goal, index) => <motion.div key={goal.title} initial={{
          opacity: 0,
          y: 30
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} transition={{
          delay: index * 0.15
        }} whileHover={{
          x: 10
        }} className="mb-8 last:mb-0">
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 flex items-center gap-6">
                <div className={`w-20 h-20 bg-gradient-to-br ${goal.gradient} rounded-2xl flex items-center justify-center shadow-md flex-shrink-0`}>
                  <goal.icon className="w-10 h-10 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-2xl font-bold text-gray-800">
                      {goal.title}
                    </h3>
                    <span className={`px-4 py-1 bg-gradient-to-r ${goal.gradient} text-white text-sm font-bold rounded-full`}>
                      {goal.metric}
                    </span>
                  </div>
                  <p className="text-gray-600">{goal.description}</p>
                </div>
              </div>
            </motion.div>)}
        </div>
      </div>
    </div>;
}