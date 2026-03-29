import React from 'react';
import { Market, TierIndex, TIERS } from '../data/pricingData';

interface PriceTableProps {
  market: Market;
  njPrices?: (number | string)[];
  manPrices?: (number | string)[];
  njFlat?: number | string;
  manFlat?: number | string;
  labels?: string[]; // If we want to override row labels (e.g. "NJ", "Manhattan")
  showBothMarkets?: boolean; // If true, show both NJ and MAN rows regardless of current market (used for some tables)
  highlightIndex?: number; // Index of the column to highlight (for mobile sqft selector)
}

export default function PriceTable({ 
  market, 
  njPrices, 
  manPrices, 
  njFlat, 
  manFlat,
  showBothMarkets = false,
  highlightIndex
}: PriceTableProps) {
  
  // Helper to format price
  const fmt = (p: number | string | undefined) => {
    if (p === undefined) return '—';
    if (typeof p === 'string') return p;
    return `$${p}`;
  };

  const renderRow = (label: string, prices?: (number | string)[], flat?: number | string) => {
    if (flat !== undefined) {
      return (
        <tr>
          <td className="font-medium text-[#D4D4D4] border-t border-[#1a1a1a] p-4 text-left">{label}</td>
          <td colSpan={5} className="text-[#D4D4D4] border-t border-[#1a1a1a] p-4 text-center">
            {fmt(flat)}
          </td>
        </tr>
      );
    }
    
    if (prices) {
      return (
        <tr>
          <td className="font-medium text-[#D4D4D4] border-t border-[#1a1a1a] p-4 text-left">{label}</td>
          {prices.map((p, i) => (
            <td 
              key={i} 
              className={`border-t border-[#1a1a1a] p-4 text-center transition-colors duration-300 ${
                highlightIndex === i 
                  ? 'text-[#c9a84c] font-bold bg-[#c9a84c]/5' 
                  : 'text-[#D4D4D4]'
              }`}
            >
              {fmt(p)}
            </td>
          ))}
        </tr>
      );
    }
    return null;
  };

  // Logic to decide what rows to show
  // If showBothMarkets is true, we show both rows.
  // Otherwise, we might only show the current market's row, OR if the data structure implies a comparison table, we adapt.
  // The prompt implies "Display each service as a card with description + price table".
  // For tiered services, it shows a table with columns for sqft.
  // The prompt examples show:
  // | | 0-1,500 | ... |
  // | NJ | $170 | ... |
  // | Manhattan | $245 | ... |
  
  // So it seems we should show BOTH markets in the table for comparison, or maybe just the active one?
  // "Switching markets updates ALL prices on the entire page instantly"
  // This implies we should ONLY show the active market's price, OR highlight it.
  // However, the prompt example for "Bronze Photos" explicitly shows:
  // | | 0-1,500 ...
  // | NJ | $170 ...
  // | Manhattan | $245 ...
  
  // Wait, if the toggle updates "ALL prices", maybe it means the single price displayed in the header?
  // But the table example clearly lists both.
  // Let's look at the "Market Toggle" section: "Switching markets updates ALL prices on the entire page instantly".
  // This usually implies hiding the irrelevant market data to reduce cognitive load.
  // BUT the table example in Section 3 shows both rows.
  // I will stick to the "Market Toggle" rule as the primary interaction model: Show only the active market in the tables to keep it clean, 
  // UNLESS the table is specifically designed to compare (which is rare in this context).
  // Actually, re-reading Section 3 example:
  // | | 0-1,500 ... |
  // | NJ | $170 ... |
  // | Manhattan | $245 ... |
  // This might be for the prompt's explanation. 
  // If I have a global toggle, showing both is redundant and confusing.
  // I will show ONLY the active market row in the table.
  
  const activePrices = market === 'NJ' ? njPrices : manPrices;
  const activeFlat = market === 'NJ' ? njFlat : manFlat;
  const activeLabel = market === 'NJ' ? 'NJ' : 'Manhattan';

  // Get current price for mobile view
  const currentPrice = activeFlat !== undefined 
    ? activeFlat 
    : (activePrices && highlightIndex !== undefined ? activePrices[highlightIndex] : undefined);

  return (
    <>
      {/* MOBILE: Single Price Display */}
      <div className="md:hidden mt-4 p-4 bg-[#111] rounded-lg border border-[#1a1a1a] flex justify-between items-center">
        <span className="text-[#999] text-[14px] font-medium">Price ({TIERS[highlightIndex !== undefined ? highlightIndex : 1]})</span>
        <span key={currentPrice} className="text-[#c9a84c] text-[18px] font-bold animate-in fade-in duration-300">
          {fmt(currentPrice)}
        </span>
      </div>

      {/* DESKTOP: Full Table */}
      <div className="hidden md:block overflow-x-auto rounded-xl border border-[#1a1a1a]">
        <table className="w-full border-collapse border-spacing-0 min-w-[600px]">
          <thead>
            <tr>
              <th className="bg-[#111] text-[#c9a84c] text-[12px] font-bold uppercase tracking-wider p-4 text-left">
                Market
              </th>
              {TIERS.map((tier, index) => (
                <th 
                  key={tier} 
                  className={`bg-[#111] text-[12px] font-bold uppercase tracking-wider p-4 text-center transition-colors duration-300 ${
                    highlightIndex === index ? 'text-[#c9a84c]' : 'text-[#c9a84c]/70'
                  }`}
                >
                  {tier.replace(' sqft', '')}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {renderRow(activeLabel, activePrices, activeFlat)}
          </tbody>
        </table>
      </div>
    </>
  );
}
