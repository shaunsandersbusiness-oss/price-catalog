import React from 'react';
import { Check, Minus } from 'lucide-react';
import { Market, TierIndex, TIERS } from '../data/pricingData';

interface ComparisonTableProps {
  market: Market;
  tierIndex: TierIndex;
}

export default function ComparisonTable({ market, tierIndex }: ComparisonTableProps) {
  
  const renderCheck = (isGold = false) => (
    <div className="flex justify-center">
      <Check size={20} className={isGold ? "text-[#c9a84c]" : "text-[#c9a84c]"} />
    </div>
  );

  const renderDash = () => (
    <div className="flex justify-center">
      <Minus size={20} className="text-[#444444]" />
    </div>
  );

  const renderText = (text: string) => (
    <span className="text-[#D4D4D4] text-[14px]">{text}</span>
  );

  return (
    <div className="w-full">
      <div className="overflow-x-auto rounded-xl border border-[#1a1a1a]">
        <table className="w-full min-w-[800px] border-collapse border-spacing-0">
          <thead>
            <tr>
              <th className="bg-[#111] text-[#c9a84c] text-[12px] font-bold uppercase tracking-wider p-4 text-left w-1/4">
                SERVICE
              </th>
              <th className="bg-[#111] text-[#c9a84c] text-[12px] font-bold uppercase tracking-wider p-4 text-center w-1/4">
                ESSENTIAL
              </th>
              <th className="bg-[#111] bg-opacity-100 text-[#c9a84c] text-[12px] font-bold uppercase tracking-wider p-4 text-center w-1/4" style={{ backgroundColor: '#161616' }}>
                SIGNATURE
              </th>
              <th className="bg-[#111] text-[#c9a84c] text-[12px] font-bold uppercase tracking-wider p-4 text-center w-1/4">
                CROWN
              </th>
            </tr>
          </thead>
          <tbody>
            {[
              { label: 'Silver Photos', ess: true, sig: false, crn: false },
              { label: 'Gold Photos', ess: false, sig: true, crn: true },
              { label: 'Floor Plan', ess: true, sig: true, crn: true },
              { label: 'Custom Listing Website', ess: true, sig: true, crn: true },
              { label: 'Drone Photos', ess: false, sig: true, crn: true },
              { label: '3D Tour', ess: false, sig: true, crn: true },
              { label: 'Standard Video', ess: false, sig: true, crn: 'Included (Choice)' },
              { label: 'Cinematic Video', ess: false, sig: false, crn: true },
              { label: 'Agent Branding OR Community Spotlight Video', ess: false, sig: false, crn: 'Choice (+$200)' },
            ].map((row, idx) => (
              <tr key={idx} className={idx % 2 === 0 ? 'bg-[#0a0a0a]' : 'bg-[#0f0f0f]'}>
                <td className="p-4 border-t border-[#1a1a1a] text-[#D4D4D4] text-[15px] font-medium">
                  {row.label}
                </td>
                <td className="p-4 border-t border-[#1a1a1a] text-center">
                  {typeof row.ess === 'boolean' ? (row.ess ? renderCheck() : renderDash()) : renderText(row.ess)}
                </td>
                <td className="p-4 border-t border-[#1a1a1a] text-center bg-[#c9a84c] bg-opacity-5">
                  {typeof row.sig === 'boolean' ? (row.sig ? renderCheck(true) : renderDash()) : renderText(row.sig)}
                </td>
                <td className="p-4 border-t border-[#1a1a1a] text-center">
                  {typeof row.crn === 'boolean' ? (row.crn ? renderCheck() : renderDash()) : renderText(row.crn)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
