import React, { useState, useEffect } from 'react';
import { TierIndex, TIERS } from '../data/pricingData';
import { ChevronDown, ChevronUp, Check } from 'lucide-react';

interface MobileSqftSelectorProps {
  tierIndex: TierIndex;
  setTierIndex: (index: TierIndex) => void;
}

export default function MobileSqftSelector({ tierIndex, setTierIndex }: MobileSqftSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Close sheet when clicking backdrop
  const handleBackdropClick = () => {
    setIsOpen(false);
  };

  // Toggle sheet
  const toggleSheet = () => {
    setIsOpen(!isOpen);
  };

  // Select tier and close
  const handleSelect = (index: TierIndex) => {
    setTierIndex(index);
    setIsOpen(false);
  };

  // Prevent body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <>
      {/* STICKY BUTTON */}
      <div 
        className="mobile-sqft-button md:hidden fixed bottom-0 left-0 right-0 z-[100] bg-[#0a0a0a]/95 backdrop-blur-xl border-t border-[#c9a84c]/20 px-5 py-3.5 flex items-center justify-between cursor-pointer"
        onClick={toggleSheet}
      >
        <span className="text-[#999] text-[14px]">🏠 Property Size:</span>
        <div className="flex items-center gap-2">
          <span className="text-white text-[15px] font-semibold">{TIERS[tierIndex]}</span>
          {isOpen ? <ChevronDown size={14} className="text-[#c9a84c]" /> : <ChevronUp size={14} className="text-[#c9a84c]" />}
        </div>
      </div>

      {/* BACKDROP */}
      <div 
        className={`sheet-backdrop fixed inset-0 z-[199] bg-black/60 transition-opacity duration-300 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={handleBackdropClick}
      />

      {/* BOTTOM SHEET */}
      <div 
        className={`mobile-sqft-sheet fixed bottom-0 left-0 right-0 z-[200] bg-[#111] rounded-t-[20px] border-t border-[#c9a84c]/20 px-5 pt-4 pb-8 transition-transform duration-300 ease-out ${isOpen ? 'translate-y-0' : 'translate-y-full'}`}
      >
        {/* Drag Handle */}
        <div className="w-10 h-1 bg-[#444] rounded-full mx-auto mb-5" />

        <h3 className="text-white text-[18px] font-bold mb-4">Select Property Size</h3>

        <div className="space-y-2.5">
          {TIERS.map((tier, index) => (
            <div 
              key={tier}
              onClick={() => handleSelect(index as TierIndex)}
              className={`sqft-option flex items-center justify-between p-4 rounded-[10px] border transition-all duration-200 cursor-pointer ${
                tierIndex === index 
                  ? 'bg-[#0a0a0a] border-[#c9a84c]/50 text-white' 
                  : 'bg-[#0a0a0a] border-[#1a1a1a] text-[#D4D4D4] active:bg-[#151515]'
              }`}
            >
              <span className="text-[16px]">{tier}</span>
              {tierIndex === index && <Check size={18} className="text-[#c9a84c] font-bold" />}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
