import React, { useEffect, useState } from 'react';
import { MapPin, Building2, ArrowRight, Download } from 'lucide-react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Background from './components/Background';
import { motion } from 'motion/react';
import { usePDF } from '@react-pdf/renderer';
import { CatalogPDF } from './components/CatalogPDF';
import { NJ_DATA, MANHATTAN_DATA } from './data/prices';

const DownloadButton = ({ document, fileName, label }: { document: React.ReactElement, fileName: string, label: string }) => {
  const [instance] = usePDF({ document });

  if (instance.loading) {
    return (
      <button className="block w-full bg-regalis-gold hover:bg-[#b89a44] text-black font-bold text-[16px] py-4 rounded-lg text-center opacity-50 cursor-not-allowed">
        Generating PDF...
      </button>
    );
  }

  return (
    <a 
      href={instance.url!} 
      download={fileName}
      target="_blank"
      rel="noreferrer"
      className="block w-full bg-regalis-gold hover:bg-[#b89a44] text-black font-bold text-[16px] py-4 rounded-lg text-center transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
    >
      {label}
    </a>
  );
};

export default function App() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-regalis-black text-regalis-silver font-sans selection:bg-regalis-gold/30">
      <Background />
      <Navbar />

      <main className="flex-grow relative z-10">
        <div className="max-w-7xl mx-auto px-6 py-12 md:py-20">
          
          {/* Header Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center mb-12 md:mb-16"
          >
            <h1 className="text-3xl md:text-[48px] font-bold text-white mb-4 tracking-tight">
              Download Our Price Catalog
            </h1>
            <p className="text-[18px] text-regalis-muted max-w-2xl mx-auto">
              Choose your market and download a complete PDF of our services and pricing.
            </p>
          </motion.div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto mb-16">
            
            {/* NJ Card */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
              className="bg-regalis-dark border border-regalis-border border-t-4 border-t-regalis-gold rounded-xl p-8 md:p-10 flex flex-col h-full hover:bg-[#0f0f0f] transition-colors duration-300"
            >
              <div className="mb-6">
                <div className="w-12 h-12 rounded-full bg-regalis-gold/10 flex items-center justify-center mb-4">
                  <MapPin className="text-regalis-gold w-6 h-6" />
                </div>
                <h2 className="text-[28px] font-bold text-white mb-2">NJ & Boroughs</h2>
                <p className="text-[16px] text-regalis-muted font-medium mb-4">New Jersey, Brooklyn, Queens, Bronx, Staten Island</p>
                <p className="text-[15px] text-regalis-silver leading-relaxed">
                  Complete pricing for all photography, video, bundles, and packages for NJ and the outer boroughs.
                </p>
              </div>
              
              <div className="mt-auto">
                {isClient ? (
                  <DownloadButton 
                    document={<CatalogPDF data={NJ_DATA} />}
                    fileName="Regalis_NJ_Boroughs_Price_Sheet_2026.pdf"
                    label="Download NJ & Boroughs PDF ↓"
                  />
                ) : (
                  <button className="block w-full bg-regalis-gold hover:bg-[#b89a44] text-black font-bold text-[16px] py-4 rounded-lg text-center opacity-50 cursor-not-allowed">
                    Loading...
                  </button>
                )}
                <p className="text-center text-[12px] text-[#666] mt-3">PDF • Updated 2026</p>
              </div>
            </motion.div>

            {/* Manhattan Card */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="bg-regalis-dark border border-regalis-border border-t-4 border-t-regalis-gold rounded-xl p-8 md:p-10 flex flex-col h-full hover:bg-[#0f0f0f] transition-colors duration-300"
            >
              <div className="mb-6">
                <div className="w-12 h-12 rounded-full bg-regalis-gold/10 flex items-center justify-center mb-4">
                  <Building2 className="text-regalis-gold w-6 h-6" />
                </div>
                <h2 className="text-[28px] font-bold text-white mb-2">Manhattan</h2>
                <p className="text-[16px] text-regalis-muted font-medium mb-4">All Manhattan locations</p>
                <p className="text-[15px] text-regalis-silver leading-relaxed">
                  Complete pricing for all photography, video, bundles, and packages for Manhattan properties. Includes the Manhattan service fee breakdown.
                </p>
              </div>
              
              <div className="mt-auto">
                {isClient ? (
                  <DownloadButton 
                    document={<CatalogPDF data={MANHATTAN_DATA} />}
                    fileName="Regalis_Manhattan_Price_Sheet_2026.pdf"
                    label="Download Manhattan PDF ↓"
                  />
                ) : (
                  <button className="block w-full bg-regalis-gold hover:bg-[#b89a44] text-black font-bold text-[16px] py-4 rounded-lg text-center opacity-50 cursor-not-allowed">
                    Loading...
                  </button>
                )}
                <p className="text-center text-[12px] text-[#666] mt-3">PDF • Updated 2026</p>
              </div>
            </motion.div>

          </div>

          {/* Additional Links */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col items-center gap-4 text-center"
          >
            <a 
              href="https://calculator.regalisrealtymedia.com" 
              className="group flex items-center gap-2 text-regalis-silver hover:text-regalis-gold transition-colors text-[15px]"
            >
              Want to build a custom quote? Try our Calculator 
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a 
              href="https://pricing.regalisrealtymedia.com" 
              className="group flex items-center gap-2 text-regalis-silver hover:text-regalis-gold transition-colors text-[15px]"
            >
              View pricing details online: See Full Pricing
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a 
              href="https://www.regalisrealtymedia.com/calendar" 
              className="group flex items-center gap-2 text-regalis-silver hover:text-regalis-gold transition-colors text-[15px]"
            >
              Questions? Contact Us
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </a>
          </motion.div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
