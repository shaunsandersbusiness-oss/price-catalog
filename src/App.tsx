import { useEffect, useRef, useState } from 'react';
import Background from './components/Background';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

const STARTING_PRICES = {
  NJ: {
    bronze: '$170', twilight: '$200', floorPlan: '$95', threeDTour: '$175',
    droneAddon: '$75', standard: '$300', cinematic: '$600',
    agentBranding: '$600', communitySpotlight: '$550',
    virtualStaging: '$25/photo', sameDayDelivery: '$35',
  },
  Manhattan: {
    bronze: '$245', twilight: '$275', floorPlan: '$95', threeDTour: '$175',
    droneAddon: '$100', standard: '$375', cinematic: '$675',
    agentBranding: '$675', communitySpotlight: '$625',
    virtualStaging: '$25/photo', sameDayDelivery: '$35',
  }
};

const PDF_URLS = {
  NJ: 'https://drive.google.com/file/d/16fxR2Dl-VftC1aMAGVlUesIJM09LnQGH/view?usp=drive_link',
  Manhattan: 'https://drive.google.com/drive/folders/1kX-mSXuCVf9HgaTG_tsqaXjlWsfUEtnX?usp=sharing',
};

function FadeInSection({ children, className = '' }: { children: React.ReactNode, className?: string }) {
  const [isVisible, setVisible] = useState(false);
  const domRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setVisible(true);
          if (domRef.current) observer.unobserve(domRef.current);
        }
      });
    }, { threshold: 0.1 });
    
    if (domRef.current) {
      observer.observe(domRef.current);
    }
    
    return () => {
      if (domRef.current) observer.unobserve(domRef.current);
    };
  }, []);

  return (
    <div
      className={`fade-in-section ${isVisible ? 'is-visible' : ''} ${className}`}
      ref={domRef}
    >
      {children}
    </div>
  );
}

function DownloadButton({ href, download, text, ariaLabel }: { href: string, download: string, text: string, ariaLabel?: string }) {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleClick = () => {
    setIsDownloading(true);
    setTimeout(() => setIsDownloading(false), 800);
  };

  return (
    <a
      href={href}
      download={download}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      aria-label={ariaLabel}
      className={`block w-full text-center py-3 rounded-md font-semibold text-[15px] ${
        text.includes('NJ') 
          ? 'bg-[#c9a84c] text-black btn-gold' 
          : 'bg-[#111] text-[#c9a84c] border border-[#c9a84c] btn-outline'
      }`}
    >
      {isDownloading ? 'Downloading...' : text}
    </a>
  );
}

export default function App() {
  const [activeTab, setActiveTab] = useState<'NJ' | 'Manhattan'>('NJ');
  const [tabOpacity, setTabOpacity] = useState(1);

  useEffect(() => {
    document.title = 'Price Catalog & Downloads | Regalis Realty Media';
  }, []);

  const handleTabChange = (tab: 'NJ' | 'Manhattan') => {
    if (tab === activeTab) return;
    setTabOpacity(0);
    setTimeout(() => {
      setActiveTab(tab);
      setTabOpacity(1);
    }, 200);
  };

  const NJ_ROWS = [
    { service: 'Bronze Photos',          price: '$170' },
    { service: 'Twilight Photos',         price: '$200' },
    { service: 'Floor Plan',             price: '$95' },
    { service: '3D Tour',                price: '$175' },
    { service: 'Drone Add-On',           price: '$75' },
    { service: 'Regalis Standard Video', price: '$300' },
    { service: 'Regalis Cinematic Video',price: '$600' },
    { service: 'Agent Branding Video',   price: '$600' },
    { service: 'Community Spotlight',    price: '$550' },
    { service: 'Virtual Staging',        price: '$25/photo' },
    { service: 'Same-Day Delivery',      price: '$35' },
  ];

  const MAN_ROWS = [
    { service: 'Bronze Photos',          price: '$245' },
    { service: 'Twilight Photos',        price: '$275' },
    { service: 'Floor Plan',            price: '$95' },
    { service: '3D Tour',               price: '$175' },
    { service: 'Drone Add-On',          price: '$100' },
    { service: 'Regalis Standard Video',price: '$375' },
    { service: 'Regalis Cinematic Video',price: '$675' },
    { service: 'Agent Branding Video',  price: '$675' },
    { service: 'Community Spotlight',   price: '$625' },
    { service: 'Virtual Staging',       price: '$25/photo' },
    { service: 'Same-Day Delivery',     price: '$35' },
  ];

  const rows = activeTab === 'NJ' ? NJ_ROWS : MAN_ROWS;

  return (
    <div className="min-h-screen flex flex-col relative">
      <Background />
      <Navbar />

      <main className="flex-grow relative z-10">
        {/* HERO SECTION */}
        <section aria-label="Page introduction">
          <FadeInSection className="flex flex-col items-center justify-center px-6 text-center" style={{ minHeight: 'calc(100vh - 70px)' }}>
            <span className="text-[#c9a84c] text-[12px] uppercase tracking-[2px] font-semibold mb-4">
              PRICE SHEETS & RESOURCES
            </span>
            <h1 className="text-white text-[32px] md:text-[48px] font-bold mb-6 leading-tight">
              Download Our Price Catalog
            </h1>
            <p className="text-[#D4D4D4] text-[18px] max-w-[600px] mx-auto mb-8 leading-relaxed">
              Everything you need to present Regalis services to your clients.<br className="hidden md:block" />
              Download the official 2026 price sheet for your market.
            </p>
            <div className="w-[80px] h-[1px] bg-[#c9a84c] opacity-30"></div>
          </FadeInSection>
        </section>

        {/* DOWNLOAD CARDS SECTION */}
        <section aria-label="Download price sheets">
          <h2 className="sr-only">Download Price Sheets</h2>
          <div className="max-w-[1000px] mx-auto px-6 pb-24">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* CARD 1 — NJ & Boroughs */}
              <div role="article" aria-label="NJ & Boroughs Price Sheet Download">
                <FadeInSection className="download-card bg-[#0a0a0a] border border-[#1a1a1a] rounded-[12px] p-[40px] md:p-[48px] flex flex-col justify-between min-h-[320px]">
                  <div className="mb-10 flex-grow">
                    <span className="inline-block bg-[#c9a84c] text-black text-[11px] font-bold px-3 py-1 rounded-full tracking-wider mb-8">
                      NJ & BOROUGHS
                    </span>
                    
                    {/* Minimal geometric accent */}
                    <div className="flex flex-col gap-1.5 mb-8 opacity-60">
                      <div className="h-[2px] w-8 bg-[#c9a84c]"></div>
                      <div className="h-[2px] w-12 bg-[#c9a84c]"></div>
                      <div className="h-[2px] w-6 bg-[#c9a84c]"></div>
                    </div>

                    <h2 className="text-white text-[24px] font-bold mb-2">NJ & Boroughs Price Sheet</h2>
                    <p className="text-[#999] text-[15px]">New Jersey · Brooklyn · Queens · Bronx · Staten Island</p>
                  </div>

                  <div className="mt-auto">
                    <DownloadButton 
                      href={PDF_URLS.NJ} 
                      download="Regalis_NJ_Boroughs_Price_Sheet_2026.pdf" 
                      text="Download NJ Price Sheet →" 
                      ariaLabel="Download NJ and Boroughs Price Sheet PDF"
                    />
                    <p className="text-center text-[#999] text-[12px] mt-4">PDF · 2 pages · 2026 Edition</p>
                  </div>
                </FadeInSection>
              </div>

              {/* CARD 2 — Manhattan */}
              <div role="article" aria-label="Manhattan Price Sheet Download">
                <FadeInSection className="download-card bg-[#0a0a0a] border border-[#1a1a1a] rounded-[12px] p-[40px] md:p-[48px] flex flex-col justify-between min-h-[320px]">
                  <div className="mb-10 flex-grow">
                    <span className="inline-block border border-[#c9a84c] text-[#c9a84c] text-[11px] font-bold px-3 py-1 rounded-full tracking-wider mb-8">
                      MANHATTAN
                    </span>
                    
                    {/* Minimal geometric accent */}
                    <div className="flex flex-col gap-1.5 mb-8 opacity-60 items-end w-12">
                      <div className="h-[2px] w-6 bg-[#c9a84c]"></div>
                      <div className="h-[2px] w-12 bg-[#c9a84c]"></div>
                      <div className="h-[2px] w-8 bg-[#c9a84c]"></div>
                    </div>

                    <h2 className="text-white text-[24px] font-bold mb-2">Manhattan Price Sheet</h2>
                    <p className="text-[#999] text-[15px]">All Manhattan Locations</p>
                  </div>

                  <div className="mt-auto">
                    <DownloadButton 
                      href={PDF_URLS.Manhattan} 
                      download="Regalis_Manhattan_Price_Sheet_2026.pdf" 
                      text="Download Manhattan Price Sheet →" 
                      ariaLabel="Download Manhattan Price Sheet PDF"
                    />
                    <p className="text-center text-[#999] text-[12px] mt-4">PDF · 2 pages · 2026 Edition · Includes $75 market fee info</p>
                  </div>
                </FadeInSection>
              </div>
            </div>
          </div>
        </section>

        {/* WHAT'S IN THE CATALOG SECTION */}
        <section aria-label="What is included in the price sheets">
          <div className="max-w-[1200px] mx-auto px-6 pb-24">
            <FadeInSection className="text-center mb-12">
              <h2 className="text-white text-[32px] font-bold mb-3">What's Included</h2>
              <p className="text-[#999] text-[16px]">Every service, every tier, every package — in one shareable PDF.</p>
            </FadeInSection>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <FadeInSection className="bg-[#0a0a0a] border border-[#1a1a1a] rounded-xl p-8 text-center">
                <div className="w-12 h-12 mx-auto mb-6 flex items-center justify-center border border-[#c9a84c] rounded-lg opacity-80">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#c9a84c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                    <line x1="16" y1="13" x2="8" y2="13"></line>
                    <line x1="16" y1="17" x2="8" y2="17"></line>
                    <polyline points="10 9 9 9 8 9"></polyline>
                  </svg>
                </div>
                <h3 className="text-white text-[18px] font-bold mb-3">Complete Pricing</h3>
                <p className="text-[#999] text-[14px] leading-relaxed">Every service tier from 0–5,000+ sqft for both markets. No hidden fees, no surprises.</p>
              </FadeInSection>

              <FadeInSection className="bg-[#0a0a0a] border border-[#1a1a1a] rounded-xl p-8 text-center">
                <div className="w-12 h-12 mx-auto mb-6 flex items-center justify-center border border-[#c9a84c] rounded-lg opacity-80">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#c9a84c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
                    <polyline points="2 17 12 22 22 17"></polyline>
                    <polyline points="2 12 17 22 12"></polyline>
                  </svg>
                </div>
                <h3 className="text-white text-[18px] font-bold mb-3">Package Breakdowns</h3>
                <p className="text-[#999] text-[14px] leading-relaxed">Essential, Signature, and Crown packages with exact discounted prices for every sqft tier.</p>
              </FadeInSection>

              <FadeInSection className="bg-[#0a0a0a] border border-[#1a1a1a] rounded-xl p-8 text-center">
                <div className="w-12 h-12 mx-auto mb-6 flex items-center justify-center border border-[#c9a84c] rounded-lg opacity-80">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#c9a84c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="19" y1="5" x2="5" y2="19"></line>
                    <circle cx="6.5" cy="6.5" r="2.5"></circle>
                    <circle cx="17.5" cy="17.5" r="2.5"></circle>
                  </svg>
                </div>
                <h3 className="text-white text-[18px] font-bold mb-3">Discount Guide</h3>
                <p className="text-[#999] text-[14px] leading-relaxed">How the 10%, 15%, and 20% discount tiers work, what triggers each, and what's included free.</p>
              </FadeInSection>
            </div>
          </div>
        </section>

        {/* PRICING SNAPSHOT SECTION */}
        <section aria-label="Quick reference pricing">
          <div className="max-w-[800px] mx-auto px-6 pb-32">
            <FadeInSection className="text-center mb-8">
              <h2 className="text-white text-[24px] font-bold mb-6">Quick Reference — Starting Prices</h2>
              
              <div className="flex flex-col sm:flex-row justify-center gap-2 sm:gap-4 mb-8">
                <button 
                  onClick={() => handleTabChange('NJ')}
                  className={`px-6 py-2.5 rounded-full text-[14px] font-semibold transition-all duration-300 w-full sm:w-auto ${
                    activeTab === 'NJ' 
                      ? 'bg-[#c9a84c] text-black' 
                      : 'bg-[#111] text-[#999] border border-[#222] hover:text-white'
                  }`}
                >
                  NJ & Boroughs
                </button>
                <button 
                  onClick={() => handleTabChange('Manhattan')}
                  className={`px-6 py-2.5 rounded-full text-[14px] font-semibold transition-all duration-300 w-full sm:w-auto ${
                    activeTab === 'Manhattan' 
                      ? 'bg-[#c9a84c] text-black' 
                      : 'bg-[#111] text-[#999] border border-[#222] hover:text-white'
                  }`}
                >
                  Manhattan
                </button>
              </div>
            </FadeInSection>

            <FadeInSection>
              <div className="w-full overflow-x-auto rounded-xl border border-[#1a1a1a]">
                <div 
                  className="tab-content"
                  style={{ opacity: tabOpacity }}
                >
                  <div className="w-full" style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
                    <table style={{
                      width: '100%',
                      tableLayout: 'fixed',
                      borderCollapse: 'collapse',
                    }}>
                      <colgroup>
                        <col style={{ width: '65%' }} />
                        <col style={{ width: '35%' }} />
                      </colgroup>
                      <thead>
                        <tr>
                          <th style={{
                            background: '#c9a84c',
                            color: '#000000',
                            fontWeight: 700,
                            fontSize: '12px',
                            letterSpacing: '0.05em',
                            padding: '10px 14px',
                            textAlign: 'left',
                          }}>
                            SERVICE
                          </th>
                          <th style={{
                            background: '#c9a84c',
                            color: '#000000',
                            fontWeight: 700,
                            fontSize: '12px',
                            letterSpacing: '0.05em',
                            padding: '10px 14px',
                            textAlign: 'right',
                          }}>
                            STARTING AT
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {rows.map((row, i) => (
                          <tr key={row.service} style={{
                            background: i % 2 === 0 ? '#0a0a0a' : '#111111',
                            borderBottom: '1px solid #1a1a1a',
                          }}>
                            <td style={{
                              padding: '11px 14px',
                              fontSize: '14px',
                              color: '#D4D4D4',
                            }}>
                              {row.service}
                            </td>
                            <td style={{
                              padding: '11px 14px',
                              fontSize: '14px',
                              color: '#c9a84c',
                              fontWeight: 700,
                              textAlign: 'right',
                            }}>
                              {row.price}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <p className="text-center text-[#999] text-[13px] mt-6 max-w-[600px] mx-auto leading-relaxed">
                Full tiered pricing for all sqft sizes is in the downloadable PDF. Properties over 5,000 sqft — call (917) 683-8034 for a custom quote.
              </p>
            </FadeInSection>
          </div>
        </section>

        {/* BOTTOM CTA STRIP */}
        <section aria-label="Book a shoot">
          <div className="w-full bg-[#0a0a0a] border-t border-[#c9a84c] py-[60px] px-6">
            <FadeInSection className="max-w-[800px] mx-auto text-center">
              <h2 className="text-white text-[28px] font-bold mb-3">Ready to Book Your Shoot?</h2>
              <p className="text-[#D4D4D4] text-[16px] mb-8">Questions about pricing? We're happy to walk you through everything.</p>
              
              <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
                <a 
                  href="https://www.regalisrealtymedia.com/calendar" 
                  className="bg-[#c9a84c] text-black font-semibold py-3 px-8 rounded-md btn-gold text-[15px]"
                >
                  Book a Shoot →
                </a>
                <a 
                  href="https://pricing.regalisrealtymedia.com" 
                  className="bg-transparent text-[#c9a84c] border border-[#c9a84c] font-semibold py-3 px-8 rounded-md btn-outline text-[15px]"
                >
                  View Interactive Pricing →
                </a>
              </div>
              
              <p className="text-[#999] text-[14px]">
                Or call (917) 683-8034 <span className="mx-2">·</span> contact@regalisrealtymedia.com
              </p>
            </FadeInSection>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
