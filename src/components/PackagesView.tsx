import React, { useState } from 'react';
import { 
  Market, 
  TierIndex, 
  TIERS, 
  PRICING_DATA, 
  ESSENTIAL_PRICES,
  SIGNATURE_PRICES,
  CROWN_STANDARD_PRICES,
  CROWN_BRANDING_PRICES,
  CROWN_SPOTLIGHT_PRICES
} from '../data/pricingData';
import ComparisonTable from './ComparisonTable';
import { Check, ArrowRight, Star } from 'lucide-react';

interface PackagesViewProps {
  market: Market;
  tierIndex: TierIndex;
  setTierIndex: (index: TierIndex) => void;
}

export default function PackagesView({ market, tierIndex, setTierIndex }: PackagesViewProps) {
  const [crownVideoChoice, setCrownVideoChoice] = useState<'standard' | 'agentBranding' | 'communitySpotlight'>('agentBranding');
  
  const currentData = PRICING_DATA[market];

  const getCrownPrice = () => {
    if (crownVideoChoice === 'standard') return CROWN_STANDARD_PRICES[market][tierIndex];
    if (crownVideoChoice === 'agentBranding') return CROWN_BRANDING_PRICES[market][tierIndex];
    return CROWN_SPOTLIGHT_PRICES[market][tierIndex];
  };

  const getSavings = (raw: number, discounted: number | string) => {
    if (typeof discounted === 'string') return 0;
    return raw - discounted;
  };
  
  // Calculate savings for packages dynamically based on components
  const isContactUs = tierIndex === 5;

  // Essential: Bronze + Floor Plan
  const essentialRaw = isContactUs ? 0 : (currentData.photography.bronze[tierIndex] as number) + (currentData.photography.floorPlan[tierIndex] as number);
  const essentialPrice = ESSENTIAL_PRICES[market][tierIndex];
  const essentialSavings = isContactUs ? 0 : getSavings(essentialRaw, essentialPrice);

  // Signature: Gold Photos + Standard Video
  const signatureRaw = isContactUs ? 0 : (currentData.photography.bronze[tierIndex] as number) + 
                       (currentData.photography.floorPlan[tierIndex] as number) + 
                       (currentData.photography.threeDTour[tierIndex] as number) + 
                       (currentData.photography.droneAddOn as number) + 
                       (currentData.video.standard[tierIndex] as number);
  const signaturePrice = SIGNATURE_PRICES[market][tierIndex];
  const signatureSavings = isContactUs ? 0 : getSavings(signatureRaw, signaturePrice);

  // Crown: Gold Photos + Cinematic + Choice Video
  let crownChoicePrice = 0;
  if (!isContactUs) {
    if (crownVideoChoice === 'standard') crownChoicePrice = currentData.video.standard[tierIndex] as number;
    else if (crownVideoChoice === 'agentBranding') crownChoicePrice = currentData.video.agentBranding as number;
    else crownChoicePrice = currentData.video.communitySpotlight as number;
  }

  const crownRaw = isContactUs ? 0 : (currentData.photography.bronze[tierIndex] as number) + 
                   (currentData.photography.floorPlan[tierIndex] as number) + 
                   (currentData.photography.threeDTour[tierIndex] as number) + 
                   (currentData.photography.droneAddOn as number) + 
                   (currentData.video.cinematic[tierIndex] as number) + 
                   crownChoicePrice;
  const crownPrice = getCrownPrice();
  const crownSavings = isContactUs ? 0 : getSavings(crownRaw, crownPrice);

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* HERO FOR PACKAGES VIEW */}
      <div className="text-center mb-10">
        <h2 className="text-white text-[36px] font-bold mb-6">Save When You Bundle</h2>
        <div className="flex flex-wrap justify-center gap-3">
          <span className="px-4 py-1 rounded-full border border-[#333] bg-[#111] text-[#D4D4D4] text-[14px]">Photos only = 10% off</span>
          <span className="px-4 py-1 rounded-full border border-[#333] bg-[#111] text-[#D4D4D4] text-[14px]">Photo + Video = 15% off</span>
          <span className="px-4 py-1 rounded-full bg-[#c9a84c] text-black font-bold text-[14px]">Crown = 20% off</span>
        </div>
      </div>

      {/* THREE PACKAGE CARDS */}
      <div className="grid lg:grid-cols-3 gap-6 items-start mb-20">
        
        {/* ESSENTIAL */}
        <PackageCard 
          title="Essential"
          badge="10% OFF"
          subtitle="The smart starter — photos and floor plan at 10% off"
          price={essentialPrice}
          savings={essentialSavings}
          popular
        >
          <FeatureItem title="Silver Photos — Interior & Exterior HDR Photography">
            Professional HDR photos of every room plus exterior angles. Includes window pull, sky replacement, and color correction. <span className="italic text-[#999]">Silver means: Bronze photo service + Floor Plan bundled together.</span>
          </FeatureItem>
          <FeatureItem title="Floor Plan — 2D Marketing Layout">
            Clean, branded 2D floor plan with room labels, dimensions, and total square footage. Formatted for MLS and print.
          </FeatureItem>
          <FeatureItem title="Custom Listing Website" free>
            Branded single-property website with gallery, video, property details, and agent contact info.
          </FeatureItem>
        </PackageCard>

        {/* SIGNATURE */}
        <PackageCard 
          title="Signature"
          badge="15% OFF"
          subtitle="The complete package — every visual asset a listing needs"
          price={signaturePrice}
          savings={signatureSavings}
          bestValue
        >
          <FeatureItem title="Gold Photos — The Full Visual Toolkit">
            Everything in Silver (HDR photos + floor plan), PLUS professional drone aerial photography AND interactive 3D virtual tour. Gold gives the listing every visual format a buyer could want. <span className="italic text-[#999]">Gold means: Bronze photos + Floor Plan + 3D Tour + Drone Photo bundled together.</span>
          </FeatureItem>
          <FeatureItem title="3D Tour — Interactive Virtual Walkthrough">
            Matterport-style 3D walkthrough. Buyers navigate room to room on any device. Zillow-compatible and embeddable.
          </FeatureItem>
          <FeatureItem title="Drone Aerial Photography">
            Professional aerial shots showing the property, lot, neighborhood, and surrounding context from above.
          </FeatureItem>
          <FeatureItem title="Regalis Standard — Professional Listing Video">
            Polished listing walkthrough (45-75s) with licensed music, smooth transitions, branded intro and outro, and professional editing. {market === 'NJ' ? 'Drone footage included in NJ.' : 'Drone in video is a $100 add-on in Manhattan.'}
          </FeatureItem>
          <FeatureItem title="Custom Listing Website" free />
        </PackageCard>

        {/* CROWN */}
        <PackageCard 
          title="Crown"
          badge="20% OFF"
          subtitle="Maximum impact — every photo, two professional videos, and full digital presence"
          price={crownPrice}
          savings={crownSavings}
          maximumImpact
          isCrown
        >
          <FeatureItem title="Gold Photos — The Full Visual Toolkit">
            Bronze HDR photos + floor plan + drone + 3D tour — the complete photography package.
          </FeatureItem>
          <FeatureItem title="Regalis Cinematic — Premium Listing Film">
            Fully produced cinematic video (60-90s) with stabilized movement, cinematic color grading, bespoke text overlays, branded intro/outro, and custom sound design. Available horizontal or vertical.
          </FeatureItem>
          
          <div className="my-4 p-4 bg-[#111] rounded-lg border border-[#333]">
            <p className="text-white font-bold mb-3 text-[14px]">PLUS Choose One Additional Video:</p>
            <div className="space-y-2">
              <label className="flex items-start gap-3 cursor-pointer group">
                <input 
                  type="radio" 
                  name="crownVideo" 
                  checked={crownVideoChoice === 'standard'}
                  onChange={() => setCrownVideoChoice('standard')}
                  className="mt-1 accent-[#c9a84c]"
                />
                <div className={`p-2 rounded border transition-all ${crownVideoChoice === 'standard' ? 'border-[#c9a84c] bg-[#c9a84c]/5' : 'border-transparent'}`}>
                  <span className="text-white font-medium text-[14px] group-hover:text-[#c9a84c] transition-colors">Option A — Regalis Standard (Included)</span>
                  <p className="text-[#999] text-[12px] leading-tight mt-1">Polished, professional listing walkthrough (45-75s) with music, transitions, and branded intro/outro. Great for MLS, YouTube, and email campaigns. With Crown you get BOTH the Cinematic for hero marketing and the Standard for broad distribution.</p>
                </div>
              </label>
              <label className="flex items-start gap-3 cursor-pointer group">
                <input 
                  type="radio" 
                  name="crownVideo" 
                  checked={crownVideoChoice === 'agentBranding'}
                  onChange={() => setCrownVideoChoice('agentBranding')}
                  className="mt-1 accent-[#c9a84c]"
                />
                <div className={`p-2 rounded border transition-all ${crownVideoChoice === 'agentBranding' ? 'border-[#c9a84c] bg-[#c9a84c]/5' : 'border-transparent'}`}>
                  <span className="text-white font-medium text-[14px] group-hover:text-[#c9a84c] transition-colors">Option B — Agent Branding Video (+$200)</span>
                  <p className="text-[#999] text-[12px] leading-tight mt-1">Professionally produced video featuring YOU — your story, expertise, and value proposition. For your website, social profiles, ad campaigns, and listing presentations.</p>
                </div>
              </label>
              <label className="flex items-start gap-3 cursor-pointer group">
                <input 
                  type="radio" 
                  name="crownVideo" 
                  checked={crownVideoChoice === 'communitySpotlight'}
                  onChange={() => setCrownVideoChoice('communitySpotlight')}
                  className="mt-1 accent-[#c9a84c]"
                />
                <div className={`p-2 rounded border transition-all ${crownVideoChoice === 'communitySpotlight' ? 'border-[#c9a84c] bg-[#c9a84c]/5' : 'border-transparent'}`}>
                  <span className="text-white font-medium text-[14px] group-hover:text-[#c9a84c] transition-colors">Option C — Community Spotlight (+$200)</span>
                  <p className="text-[#999] text-[12px] leading-tight mt-1">Cinematic neighborhood tour showcasing the lifestyle and amenities of your market. Coffee shops, parks, schools, restaurants. Positions you as the local expert.</p>
                </div>
              </label>
            </div>
          </div>

          <FeatureItem title="2 Twilight Exterior Photos" free />
          <FeatureItem title="Custom Listing Website" free />
        </PackageCard>

      </div>

      {/* COMPARISON TABLE */}
      <section className="mb-20">
        <h2 className="text-white text-[28px] font-bold mb-6 text-center">What's Included</h2>
        <ComparisonTable market={market} tierIndex={tierIndex} />
      </section>

      {/* ALL PACKAGES AT A GLANCE */}
      <section className="mb-20 max-w-2xl mx-auto">
        <h2 className="text-white text-[28px] font-bold mb-6 text-center">All Packages at a Glance</h2>
        <div className="overflow-x-auto rounded-xl border border-[#1a1a1a]">
          <table className="w-full border-collapse border-spacing-0">
            <thead>
              <tr>
                <th className="bg-[#111] text-[#c9a84c] text-[12px] font-bold uppercase p-4 text-left">PACKAGE ({TIERS[tierIndex]})</th>
                <th className="bg-[#111] text-[#c9a84c] text-[12px] font-bold uppercase p-4 text-center">PRICE</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-4 border-t border-[#1a1a1a] text-[#D4D4D4] text-[15px]">Essential (10% off)</td>
                <td className="p-4 border-t border-[#1a1a1a] text-white font-bold text-[15px] text-center">{typeof essentialPrice === 'number' ? `$${essentialPrice}` : essentialPrice}</td>
              </tr>
              <tr className="bg-[#0f0f0f]">
                <td className="p-4 border-t border-[#1a1a1a] text-[#D4D4D4] text-[15px]">Signature (15% off)</td>
                <td className="p-4 border-t border-[#1a1a1a] text-white font-bold text-[15px] text-center">{typeof signaturePrice === 'number' ? `$${signaturePrice}` : signaturePrice}</td>
              </tr>
              <tr>
                <td className="p-4 border-t border-[#1a1a1a] text-[#D4D4D4] text-[15px]">Crown (20% off)</td>
                <td className="p-4 border-t border-[#1a1a1a] text-white font-bold text-[15px] text-center">{typeof crownPrice === 'number' ? `$${crownPrice}` : crownPrice}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* HOW DISCOUNTS WORK */}
      <section className="mb-20 bg-[#0a0a0a] border border-[#1a1a1a] rounded-xl p-8 md:p-12">
        <h2 className="text-white text-[32px] font-bold mb-8 text-center">How Discounts Work</h2>
        <p className="text-[#D4D4D4] text-center mb-8 max-w-2xl mx-auto">
          Discounts are applied automatically when you combine services. The more you bundle, the more you save:
        </p>
        
        <div className="overflow-x-auto rounded-xl border border-[#1a1a1a] mb-8">
          <table className="w-full border-collapse border-spacing-0 min-w-[600px]">
            <thead>
              <tr>
                <th className="bg-[#111] text-[#c9a84c] text-[12px] font-bold uppercase p-4 text-left">Combination</th>
                <th className="bg-[#111] text-[#c9a84c] text-[12px] font-bold uppercase p-4 text-left">Discount</th>
              </tr>
            </thead>
            <tbody>
              {[
                { combo: 'Any photo package + any photo add-on (no video)', disc: '10% off entire order' },
                { combo: 'Any photo package + any video', disc: '15% off entire order' },
                { combo: 'Gold photos + Cinematic + second video (Crown)', disc: '20% off entire order' },
              ].map((row, i) => (
                <tr key={i} className={i % 2 === 0 ? 'bg-[#0a0a0a]' : 'bg-[#0f0f0f]'}>
                  <td className="p-4 border-t border-[#1a1a1a] text-[#D4D4D4] text-[15px]">{row.combo}</td>
                  <td className="p-4 border-t border-[#1a1a1a] text-white font-bold text-[15px]">{row.disc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="space-y-2 text-center text-[#D4D4D4] text-[15px]">
          <p>The discount applies to your <strong>entire order</strong> — every service and add-on. Bronze photos are required for any discount.</p>
          <p>At the 20% tier, you also receive 2 Twilight Exterior Photos at no additional charge.</p>
          <p>A Custom Listing Website is <strong>FREE</strong> with any photo or video service at all discount tiers.</p>
        </div>

        <div className="text-center mt-8">
          <a href="https://calculator.regalisrealtymedia.com" className="text-[#c9a84c] font-bold hover:underline inline-flex items-center gap-1">
            Build a custom quote with our Price Calculator <ArrowRight size={16} />
          </a>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="text-center pb-20 mt-20">
        <h2 className="text-white text-[36px] font-bold mb-2">Ready to Book?</h2>
        <p className="text-[#D4D4D4] text-[18px] mb-8">Choose a package or build your own — we'll handle the rest.</p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
          <a 
            href="https://www.regalisrealtymedia.com/calendar"
            className="bg-[#c9a84c] text-black text-[16px] font-bold px-8 py-4 rounded-lg hover:bg-[#b0923e] transition-colors"
          >
            Book a Shoot →
          </a>
          <a 
            href="https://calculator.regalisrealtymedia.com"
            className="border border-[#c9a84c] text-[#c9a84c] text-[16px] font-bold px-8 py-4 rounded-lg hover:bg-[#c9a84c]/10 transition-colors"
          >
            Build Custom Quote →
          </a>
        </div>
        <p className="text-[#999999] text-[14px]">(917) 683-8034</p>
      </section>

    </div>
  );
}

function PackageCard({ 
  title, 
  badge, 
  subtitle, 
  price, 
  savings, 
  children, 
  popular = false,
  bestValue = false,
  maximumImpact = false,
  isCrown = false
}: { 
  title: string, 
  badge: string, 
  subtitle: string, 
  price: number | string, 
  savings: number, 
  children: React.ReactNode,
  popular?: boolean,
  bestValue?: boolean,
  maximumImpact?: boolean,
  isCrown?: boolean
}) {
  return (
    <div className={`relative flex flex-col h-full bg-[#0a0a0a] border rounded-xl p-8 transition-all duration-300 ${
      popular || bestValue || maximumImpact ? 'border-[#c9a84c] shadow-[0_8px_32px_rgba(201,168,76,0.1)] transform md:-translate-y-4 z-10' : 'border-[#1a1a1a]'
    }`}>
      {popular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#c9a84c] text-black text-[12px] font-bold px-3 py-1 rounded-full shadow-lg whitespace-nowrap flex items-center gap-1">
          <Star size={12} fill="black" /> MOST POPULAR
        </div>
      )}
      {bestValue && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#c9a84c] text-black text-[12px] font-bold px-3 py-1 rounded-full shadow-lg whitespace-nowrap flex items-center gap-1">
          <Star size={12} fill="black" /> BEST VALUE
        </div>
      )}
      {maximumImpact && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#c9a84c] text-black text-[12px] font-bold px-3 py-1 rounded-full shadow-lg whitespace-nowrap flex items-center gap-1">
          <Star size={12} fill="black" /> MAXIMUM IMPACT
        </div>
      )}
      
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-[28px] text-white font-bold">{title}</h3>
        <span className={`text-[12px] font-bold px-2 py-1 rounded border ${
          isCrown ? 'bg-[#c9a84c] text-black border-[#c9a84c]' : 'bg-transparent text-[#c9a84c] border-[#c9a84c]'
        }`}>
          {badge}
        </span>
      </div>
      
      <p className="text-[#c9a84c] text-[14px] italic mb-6">{subtitle}</p>
      
      <div className="space-y-4 mb-8 flex-grow">
        {children}
      </div>
      
      <div className="mt-auto pt-6 border-t border-[#1a1a1a] bg-[#111] -mx-8 -mb-8 p-8 rounded-b-xl text-center">
        <p className="text-[#999] text-[11px] uppercase mb-1 tracking-widest">PACKAGE PRICE</p>
        <div className="flex flex-col items-center mb-2">
          <span className="text-white text-[36px] font-bold leading-none">{typeof price === 'number' ? `$${price}` : price}</span>
          {typeof price === 'number' && savings > 0 && (
            <span className="text-[#c9a84c] text-[12px] font-bold mt-1">You Save ${savings}</span>
          )}
        </div>
        <a 
          href="https://www.regalisrealtymedia.com/calendar"
          className="block w-full text-center bg-[#c9a84c] text-black font-bold py-3 rounded-lg hover:bg-[#b0923e] transition-colors mt-4"
        >
          BOOK NOW →
        </a>
      </div>
    </div>
  );
}

function FeatureItem({ title, children, free = false }: { title: string, children?: React.ReactNode, free?: boolean }) {
  return (
    <div className="flex gap-3">
      <div className="mt-1 flex-shrink-0">
        <Check size={18} className="text-[#c9a84c]" />
      </div>
      <div>
        <h4 className="text-white font-semibold text-[16px] leading-tight mb-1">
          {title} {free && <span className="text-[#c9a84c] italic font-normal">(Included FREE)</span>}
        </h4>
        {children && <p className="text-[#B0B0B0] text-[14px] leading-[1.6]">{children}</p>}
      </div>
    </div>
  );
}
