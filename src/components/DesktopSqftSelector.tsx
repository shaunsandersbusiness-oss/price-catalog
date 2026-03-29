import React from 'react';
import { TierIndex, TIERS } from '../data/pricingData';

interface DesktopSqftSelectorProps {
  tierIndex: TierIndex;
  setTierIndex: (index: TierIndex) => void;
}

export default function DesktopSqftSelector({ tierIndex, setTierIndex }: DesktopSqftSelectorProps) {
  return (
    <div className="hidden md:flex justify-center gap-2 mb-8 flex-wrap">
      {TIERS.map((tier, index) => (
        <button
          key={tier}
          onClick={() => setTierIndex(index as TierIndex)}
          className={`px-5 py-2.5 rounded-full text-[14px] font-medium transition-all duration-200 border whitespace-nowrap ${
            tierIndex === index
              ? 'bg-[#c9a84c]/10 border-[#c9a84c] text-[#c9a84c]'
              : 'bg-[#111] border-[#333] text-[#999] hover:border-[#c9a84c]/40 hover:text-[#D4D4D4]'
          }`}
        >
          {tier}
        </button>
      ))}
    </div>
  );
}
