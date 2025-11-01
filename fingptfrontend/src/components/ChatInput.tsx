import React, { useState } from 'react';
import { SendIcon, PaperclipIcon, ImageIcon } from 'lucide-react';
import { motion } from 'framer-motion';
interface ChatInputProps {
  onSend: (message: string) => void;
  isDarkMode: boolean;
}
export function ChatInput({
  onSend,
  isDarkMode
}: ChatInputProps) {
  const [message, setMessage] = useState('');
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSend(message);
      setMessage('');
    }
  };
  return <div className="border-t border-white/20 bg-white/40 backdrop-blur-xl p-4">
      <form onSubmit={handleSubmit} className="max-w-3xl mx-auto">
        <div className="flex items-end gap-2 px-3 py-2 rounded-xl bg-white/60 backdrop-blur-sm border border-white/20">
          <div className="flex gap-1">
            <motion.button whileHover={{
            scale: 1.1
          }} whileTap={{
            scale: 0.9
          }} type="button" className="p-1.5 rounded-lg hover:bg-white/50 transition-colors">
              <PaperclipIcon className="w-4 h-4 text-gray-600" />
            </motion.button>
            <motion.button whileHover={{
            scale: 1.1
          }} whileTap={{
            scale: 0.9
          }} type="button" className="p-1.5 rounded-lg hover:bg-white/50 transition-colors">
              <ImageIcon className="w-4 h-4 text-gray-600" />
            </motion.button>
          </div>
          <input type="text" value={message} onChange={e => setMessage(e.target.value)} placeholder="Type your message..." className="flex-1 bg-transparent outline-none text-sm text-gray-800 placeholder-gray-500 px-2" />
          <motion.button whileHover={{
          scale: 1.05
        }} whileTap={{
          scale: 0.95
        }} type="submit" className="p-1.5 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-lg hover:shadow-md transition-all">
            <SendIcon className="w-4 h-4" />
          </motion.button>
        </div>
      </form>
    </div>;
}