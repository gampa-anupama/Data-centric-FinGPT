import React from 'react';
import { motion } from 'framer-motion';
import { GithubIcon, TwitterIcon, LinkedinIcon, MailIcon } from 'lucide-react';
export function Footer() {
  return <footer id="contact" className="relative py-16 px-6 border-t border-gray-200 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="text-2xl font-bold bg-gradient-to-r from-teal-600 to-teal-500 bg-clip-text text-transparent mb-4">
              FinGPT
            </h3>
            <p className="text-gray-600 mb-4">
              Democratizing Internet-scale Financial Data
            </p>
            <div className="flex gap-4">
              {[{
              icon: GithubIcon,
              href: 'https://github.com/AI4Finance-Foundation/FinNLP'
            }, {
              icon: TwitterIcon,
              href: '#'
            }, {
              icon: LinkedinIcon,
              href: '#'
            }].map((social, index) => <motion.a key={index} whileHover={{
              scale: 1.1,
              y: -2
            }} href={social.href} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-teal-50 rounded-xl flex items-center justify-center border border-teal-100 hover:border-teal-200 hover:bg-teal-100 transition-all">
                  <social.icon className="w-5 h-5 text-teal-600" />
                </motion.a>)}
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-gray-800 mb-4">Resources</h4>
            <ul className="space-y-2">
              {['Documentation', 'API Reference', 'Tutorials', 'Examples'].map(item => <li key={item}>
                    <a href="#" className="text-gray-600 hover:text-teal-600 transition-colors">
                      {item}
                    </a>
                  </li>)}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gray-800 mb-4">Community</h4>
            <ul className="space-y-2">
              {['GitHub', 'Discord', 'Forum', 'Blog'].map(item => <li key={item}>
                  <a href="#" className="text-gray-600 hover:text-teal-600 transition-colors">
                    {item}
                  </a>
                </li>)}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gray-800 mb-4">Contact</h4>
            <p className="text-gray-600 mb-2">Columbia University</p>
            <p className="text-gray-600 mb-2">Rice University</p>
            <p className="text-gray-600 mb-4">AI4Finance Foundation</p>
            <a href="mailto:contact@fingpt.ai" className="flex items-center gap-2 text-teal-600 hover:text-teal-700">
              <MailIcon className="w-4 h-4" />
              contact@fingpt.ai
            </a>
          </div>
        </div>
        <div className="pt-8 border-t border-gray-200 text-center">
          <p className="text-gray-600 text-sm mb-2">
            © 2024 FinGPT. Open-source under MIT License.
          </p>
          <p className="text-gray-500 text-xs">
            Disclaimer: For research and educational use only. Not financial
            advice.
          </p>
        </div>
      </div>
    </footer>;
}