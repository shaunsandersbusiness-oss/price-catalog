import React from 'react';
import { Market, PRICING_DATA, TierIndex } from '../data/pricingData';
import ServiceCard from './ServiceCard';
import PriceTable from './PriceTable';
import { ArrowRight } from 'lucide-react';

interface ServicesViewProps {
  market: Market;
  tierIndex: TierIndex;
}

export default function ServicesView({ market, tierIndex }: ServicesViewProps) {
  const currentData = PRICING_DATA[market];

  return (
    <div className="space-y-20 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* SECTION 1: PHOTOGRAPHY */}
      <section>
        <h2 className="text-white text-[32px] font-bold mb-10 text-center">Photography</h2>
        <div className="space-y-8">
          <ServiceCard 
            title="Bronze Photos" 
            tagline="Interior & Exterior HDR Photography"
            description="Professional HDR photos of every room, key exterior angles, and detail shots. Each image is individually edited with window pull (natural outdoor views through windows), sky replacement for overcast days, and full color correction. Delivered in MLS-ready dimensions and high-resolution for print materials within 24 hours."
          >
            <PriceTable market={market} njPrices={PRICING_DATA.NJ.photography.bronze} manPrices={PRICING_DATA.MAN.photography.bronze} highlightIndex={tierIndex} />
          </ServiceCard>

          <ServiceCard 
            title="Twilight Photos" 
            tagline="Golden Hour Exterior Photography"
            description="On-location exterior photography shot during golden hour/dusk. Warm interior glow against dramatic sky tones creates aspirational curb appeal imagery that stops scrollers and generates clicks. This is real on-site photography — not digital manipulation. Requires scheduling around sunset timing."
          >
            <PriceTable market={market} njPrices={PRICING_DATA.NJ.photography.twilight} manPrices={PRICING_DATA.MAN.photography.twilight} highlightIndex={tierIndex} />
          </ServiceCard>
        </div>
      </section>

      {/* SECTION 2: FLOOR PLAN */}
      <section>
        <h2 className="text-white text-[32px] font-bold mb-10 text-center">Floor Plan</h2>
        <ServiceCard 
          title="Floor Plan" 
          tagline="2D Marketing Layout"
          description="Clean, branded 2D floor plan with room labels, approximate dimensions, and total square footage. Formatted for MLS uploads, print materials, and digital marketing. Helps buyers understand the home's layout before ever walking through the door."
          caveat="Floor Plan pricing is the same in NJ and Manhattan — no service fee on this add-on."
        >
          <PriceTable market={market} njPrices={PRICING_DATA.NJ.photography.floorPlan} manPrices={PRICING_DATA.MAN.photography.floorPlan} highlightIndex={tierIndex} />
        </ServiceCard>
      </section>

      {/* SECTION 3: 3D TOUR */}
      <section>
        <h2 className="text-white text-[32px] font-bold mb-10 text-center">3D Tour</h2>
        <ServiceCard 
          title="3D Tour" 
          tagline="Interactive Virtual Walkthrough"
          description="Matterport-style interactive 3D walkthrough that lets buyers explore the home room by room from their phone or computer. They control the view — walking through, looking around, and getting a true sense of the space. Zillow-compatible and embeddable on any listing website. The asset that qualifies out-of-area buyers and reduces unnecessary showings."
          caveat="3D Tour pricing is the same in NJ and Manhattan — no service fee on this add-on."
        >
          <PriceTable market={market} njPrices={PRICING_DATA.NJ.photography.threeDTour} manPrices={PRICING_DATA.MAN.photography.threeDTour} highlightIndex={tierIndex} />
        </ServiceCard>
      </section>

      {/* SECTION 4: DRONE */}
      <section>
        <h2 className="text-white text-[32px] font-bold mb-10 text-center">Drone Photography</h2>
        <div className="bg-[#0a0a0a] border border-[#1a1a1a] rounded-xl p-6 md:p-8">
          <div className="flex flex-col md:flex-row md:justify-between md:items-baseline gap-2 mb-6">
             <h3 className="text-white text-[22px] font-bold">Drone Aerial Photography</h3>
          </div>
          <p className="text-[#D4D4D4] text-[15px] leading-[1.7] mb-6">
            Professional aerial shots showing the property from above — the lot, the yard, the neighborhood context, proximity to amenities, and surrounding landscape. Provides scale, context, and a "wow factor" that ground-level photos cannot deliver.
          </p>
          <div className="overflow-x-auto rounded-xl border border-[#1a1a1a]">
            <table className="w-full border-collapse border-spacing-0">
              <thead>
                <tr>
                  <th className="bg-[#111] text-[#c9a84c] text-[12px] font-bold uppercase p-4 text-left">Service</th>
                  <th className="bg-[#111] text-[#c9a84c] text-[12px] font-bold uppercase p-4 text-center">{market === 'NJ' ? 'NJ' : 'Manhattan'}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-4 border-t border-[#1a1a1a] text-[#D4D4D4] text-[15px]">Drone Photo Add-On (with existing photo package)</td>
                  <td className="p-4 border-t border-[#1a1a1a] text-[#D4D4D4] text-[15px] text-center">
                    ${market === 'NJ' ? PRICING_DATA.NJ.photography.droneAddOn : PRICING_DATA.MAN.photography.droneAddOn}
                  </td>
                </tr>
                <tr className="bg-[#0f0f0f]">
                  <td className="p-4 border-t border-[#1a1a1a] text-[#D4D4D4] text-[15px]">Drone Standalone (no photo package required)</td>
                  <td className="p-4 border-t border-[#1a1a1a] text-[#D4D4D4] text-[15px] text-center">
                    ${market === 'NJ' ? PRICING_DATA.NJ.photography.droneStandalone : PRICING_DATA.MAN.photography.droneStandalone}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* SECTION 5: VIDEO */}
      <section>
        <div className="text-center mb-10">
          <h2 className="text-white text-[32px] font-bold mb-2">Video</h2>
          <p className="text-[#999] text-[16px]">Professional video production for your property listings and brand</p>
        </div>
        
        <div className="space-y-8">
          <ServiceCard 
            title="Regalis Standard" 
            tagline="Professional Listing Video (45-75 seconds)"
            description="A polished listing walkthrough with licensed music, smooth transitions, branded intro and outro, and professional editing. The reliable, versatile listing video — it showcases the property beautifully and works everywhere: MLS, YouTube, agent websites, email campaigns, and social media. Drone footage included free in NJ."
          >
            <PriceTable market={market} njPrices={PRICING_DATA.NJ.video.standard} manPrices={PRICING_DATA.MAN.video.standard} highlightIndex={tierIndex} />
          </ServiceCard>

          <ServiceCard 
            title="Regalis Cinematic" 
            tagline="Premium Listing Film (60-90 seconds)"
            description='The flagship video product. Fully produced cinematic listing film featuring professional stabilized camera movement, cinematic color grading, bespoke text overlays with property details, branded intro and outro, and custom sound design with licensed music. Available in horizontal (MLS, YouTube, email) or vertical (Reels, TikTok, Stories) format. This is the video that elevates a listing from "on the market" to "must see." Drone footage included free in NJ.'
          >
            <PriceTable market={market} njPrices={PRICING_DATA.NJ.video.cinematic} manPrices={PRICING_DATA.MAN.video.cinematic} highlightIndex={tierIndex} />
          </ServiceCard>

          <ServiceCard 
            title="Agent Branding Video" 
            tagline="Your Personal Brand Film"
            description="A professionally produced video featuring YOU — your story, your market expertise, your personality, and your value proposition. Designed for your website homepage, social media profiles, ad campaigns, and listing presentations. This is the video that introduces you to potential clients and builds trust before you ever meet them. It positions you as a polished, credible professional in a market full of agents with nothing but a headshot and a tagline."
            price={market === 'NJ' ? '$600' : '$675'}
          />

          <ServiceCard 
            title="Community Spotlight" 
            tagline="Neighborhood Highlight Film"
            description="A cinematic tour of the neighborhood or community you serve. Coffee shops, parks, schools, restaurants, nightlife, commuter routes — whatever makes your market special. Perfect for social media content, listing presentations, and establishing yourself as THE local expert. Pair this with your listing Cinematic and you're not just selling a house — you're selling a lifestyle."
            price={market === 'NJ' ? '$550' : '$625'}
          />

          <div className="bg-[#0a0a0a] border border-[#1a1a1a] rounded-xl p-6 md:p-8">
            <h3 className="text-white text-[22px] font-bold mb-4">Drone in Video</h3>
            <div className="overflow-x-auto rounded-xl border border-[#1a1a1a]">
              <table className="w-full border-collapse border-spacing-0">
                <thead>
                  <tr>
                    <th className="bg-[#111] text-[#c9a84c] text-[12px] font-bold uppercase p-4 text-center">NJ</th>
                    <th className="bg-[#111] text-[#c9a84c] text-[12px] font-bold uppercase p-4 text-center">Manhattan</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-4 border-t border-[#1a1a1a] text-[#D4D4D4] text-[15px] text-center font-bold text-[#c9a84c]">Included FREE in all videos</td>
                    <td className="p-4 border-t border-[#1a1a1a] text-[#D4D4D4] text-[15px] text-center font-bold text-[#c9a84c]">$100 add-on per video</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-[#999999] text-[14px] italic mt-4">
              In NJ, drone footage is included at no extra charge in every video (Standard, Cinematic, Agent Branding, Community Spotlight). In Manhattan, drone in video is a $100 add-on.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 6: À LA CARTE ADD-ONS */}
      <section>
        <div className="text-center mb-10">
          <h2 className="text-white text-[32px] font-bold mb-2">À La Carte Add-Ons</h2>
          <p className="text-[#999] text-[16px]">Enhance any service or package</p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          {[
            { name: 'Virtual Staging', price: '$25/photo', desc: 'Digitally furnish empty rooms with realistic, high-quality furniture and decor. Modern, contemporary, traditional, or farmhouse styles available.' },
            { name: 'Virtual Twilight', price: '$25/photo', desc: 'Convert any daytime exterior photo into a stunning twilight/dusk shot with warm glow and dramatic sky. No return visit needed.' },
            { name: 'Virtual Renovation', price: '$30/scene', desc: 'Digital renovation rendering — update kitchens, bathrooms, or living spaces with modern finishes to show buyers the potential.' },
            { name: 'Object / Clutter Removal', price: '$15/photo', desc: 'Digitally remove unwanted items, clutter, or personal belongings from photos to create a cleaner presentation.' },
            { name: 'Same-Day Photo Delivery', price: '$35', desc: 'Fully edited photos delivered the same day. Shoot must be completed by 1:00 PM EST.' },
            { name: 'Next-Day Video Delivery', price: '$150', desc: 'Expedited video editing and delivery within 24 hours of the shoot.' },
            { name: 'Custom Listing Website', price: '$150 standalone', desc: 'Branded single-property website with gallery, video, property details, and agent info. FREE with any photo or video service.' },
          ].map((addon, i) => (
            <div key={i} className="bg-[#0a0a0a] border border-[#1a1a1a] rounded-xl p-6 flex flex-col">
              <div className="flex justify-between items-baseline mb-3">
                <h3 className="text-white text-[18px] font-bold">{addon.name}</h3>
                <span className="text-[#c9a84c] font-bold">{addon.price}</span>
              </div>
              <p className="text-[#D4D4D4] text-[14px] leading-relaxed">{addon.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 7: HOW DISCOUNTS WORK */}
      <section className="bg-[#0a0a0a] border border-[#1a1a1a] rounded-xl p-8 md:p-12">
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
