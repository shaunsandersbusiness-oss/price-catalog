import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-regalis-dark py-10 border-t border-regalis-border mt-auto">
      <div className="max-w-7xl mx-auto px-6 flex flex-col items-center gap-4">
        <img 
          src="https://cdn.prod.website-files.com/6695980889d8d99cedb29bc7/66c7f601fff376e4c95274b3_Regalis%20Realty%20Main%20Logo%20(1).png" 
          alt="Regalis Realty Media" 
          className="max-w-[200px] w-full h-auto opacity-90"
          referrerPolicy="no-referrer"
        />
        <div className="text-center">
          <p className="text-regalis-gold text-[14px] font-medium tracking-wide">Regalis Realty Media</p>
          <p className="text-[#666666] text-[12px] mt-1">All rights reserved 2025</p>
        </div>
      </div>
    </footer>
  );
}
