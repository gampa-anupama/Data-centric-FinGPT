import React from 'react';
import { Navbar } from '../components/Navbar';
import { Hero } from '../components/Hero';
import { Overview } from '../components/Overview';
import { Framework } from '../components/Framework';
import { KeyFeatures } from '../components/KeyFeatures';
import { DataSources } from '../components/DataSources';
import { Applications } from '../components/Applications';
import { Future } from '../components/Future';
import { Footer } from '../components/Footer';
export function Home() {
  return <div className="w-full min-h-screen bg-gradient-to-br from-[#FAF8F5] via-[#F0F4F8] to-[#E8F5F3]">
      <Navbar />
      <Hero />
      <Overview />
      <Framework />
      <KeyFeatures />
      <DataSources />
      <Applications />
      <Future />
      <Footer />
    </div>;
}