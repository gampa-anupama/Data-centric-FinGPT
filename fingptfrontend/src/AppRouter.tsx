import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { App } from './App';
import { Auth } from './pages/Auth';
import { ChatBot } from './pages/ChatBot';
import { ScrapData } from './pages/ScrapData';
import { Portfolio } from './pages/Portfolio';
import  DataDetails from './pages/DataDetails';
export function AppRouter() {
  return <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/chatbot" element={<ChatBot />} />
        <Route path="/scrape-data" element={<ScrapData />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/data-details" element={<DataDetails />} />
      </Routes>
    </BrowserRouter>;
}