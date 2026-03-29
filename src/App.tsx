import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Background from './components/Background';
import { Market, TierIndex } from './data/pricingData';
import ServicesView from './components/ServicesView';
import PackagesView from './components/PackagesView';
import MobileSqftSelector from './components/MobileSqftSelector';
import DesktopSqftSelector from './components/DesktopSqftSelector';

export default function App() {
  const [market, setMarket] = useState<Market>('NJ');
  const [view, setView] = useState<'services' | 'packages'>('services');
  const [tierIndex, setTierIndex] = useState<TierIndex>(1); // Default to Tier 2 (1,501-3,500 sqft)

  return (
    <div className="min-h-screen relative flex flex-col font-sans bg-black text-[#D4D4D4] overflow-x-hidden">
      <Background />
      <Navbar />

      <main className="flex-grow pt-28 px-4 md:px-8 lg:px-12 max-w-7xl mx-auto w-full pb-[70px] md:pb-0">
        
        {/* HERO */}
        <div className="text-center mb-12">
          <h1 className="text-white text-[32px] md:text-[48px] font-bold mb-4">Our Services & Pricing</h1>
          <p className="text-[#D4D4D4] text-[16px] md:text-[18px]">Professional real estate media for every listing</p>
        </div>

        {/* TOGGLE ROW 1: Market Selector */}
        <div className="flex flex-col items-center mb-8">
          <div className="inline-flex bg-[#111] p-1 rounded-full border border-[#333] mb-4">
            <button
              onClick={() => setMarket('NJ')}
              className={`px-6 md:px-8 py-3 rounded-full text-[16px] font-bold transition-all duration-300 ${
                market === 'NJ' 
                  ? 'bg-[#c9a84c] text-black shadow-lg shadow-[#c9a84c]/20' 
                  : 'text-[#D4D4D4] hover:bg-[#333]'
              }`}
            >
              NJ & Boroughs
            </button>
            <button
              onClick={() => setMarket('MAN')}
              className={`px-6 md:px-8 py-3 rounded-full text-[16px] font-bold transition-all duration-300 ${
                market === 'MAN' 
                  ? 'bg-[#c9a84c] text-black shadow-lg shadow-[#c9a84c]/20' 
                  : 'text-[#D4D4D4] hover:bg-[#333]'
              }`}
            >
              Manhattan
            </button>
          </div>
          <p className="text-[#999999] text-[14px] text-center max-w-lg">
            {market === 'NJ' 
              ? "Pricing for New Jersey, Brooklyn, Queens, Bronx & Staten Island" 
              : "Pricing for all Manhattan locations · Includes $75 service fee on main photo & video services"}
          </p>
        </div>

        {/* TOGGLE ROW 2: View Selector */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex bg-[#111] p-1 rounded-full border border-[#333]">
            <button
              onClick={() => setView('services')}
              className={`px-8 py-3 rounded-full text-[16px] font-bold transition-all duration-300 ${
                view === 'services' 
                  ? 'bg-[#c9a84c] text-black shadow-lg shadow-[#c9a84c]/20' 
                  : 'text-[#D4D4D4] hover:bg-[#333]'
              }`}
            >
              SERVICES
            </button>
            <button
              onClick={() => setView('packages')}
              className={`px-8 py-3 rounded-full text-[16px] font-bold transition-all duration-300 ${
                view === 'packages' 
                  ? 'bg-[#c9a84c] text-black shadow-lg shadow-[#c9a84c]/20' 
                  : 'text-[#D4D4D4] hover:bg-[#333]'
              }`}
            >
              PACKAGES
            </button>
          </div>
        </div>

        {/* Desktop Sqft Selector (Visible on Desktop, Hidden on Mobile) */}
        <DesktopSqftSelector tierIndex={tierIndex} setTierIndex={setTierIndex} />

        {/* 5,000+ Sqft Banner */}
        {tierIndex === 5 && (
          <div className="bg-[#c9a84c]/10 border border-[#c9a84c]/30 rounded-xl p-6 mb-8 text-center max-w-3xl mx-auto animate-in fade-in slide-in-from-top-2 duration-500">
            <h3 className="text-[#c9a84c] text-[20px] font-bold mb-2">Custom Quote Required</h3>
            <p className="text-[#D4D4D4] text-[16px]">
              Properties over 5,000 sqft require a custom quote. Call <a href="tel:9176838034" className="text-white font-bold hover:underline">(917) 683-8034</a> or email <a href="mailto:contact@regalisrealtymedia.com" className="text-white font-bold hover:underline">contact@regalisrealtymedia.com</a>.
            </p>
          </div>
        )}

        {/* CONTENT AREA */}
        <div className="min-h-[600px]">
          {view === 'services' ? (
            <ServicesView market={market} tierIndex={tierIndex} />
          ) : (
            <PackagesView market={market} tierIndex={tierIndex} setTierIndex={setTierIndex} />
          )}
        </div>

      </main>
      <Footer />
      
      {/* Mobile Sqft Selector - Sticky Bottom */}
      <MobileSqftSelector tierIndex={tierIndex} setTierIndex={setTierIndex} />
    </div>
  );
}
