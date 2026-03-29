import React from 'react';
import { motion } from 'motion/react';

interface ServiceCardProps {
  title: string;
  tagline?: string;
  description: string;
  price?: string; // Displayed in header
  children?: React.ReactNode; // For the table
  caveat?: string;
}

export default function ServiceCard({ title, tagline, description, price, children, caveat }: ServiceCardProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="bg-[#0a0a0a] border border-[#1a1a1a] rounded-xl p-6 md:p-8 flex flex-col gap-6"
    >
      <div className="flex flex-col md:flex-row md:justify-between md:items-baseline gap-2">
        <div className="flex flex-wrap items-baseline gap-2">
          <h3 className="text-white text-[22px] font-bold">{title}</h3>
          {tagline && <span className="text-[#999999] text-[18px] md:text-[22px] font-normal">— {tagline}</span>}
        </div>
        {price && <div className="text-[#c9a84c] text-[20px] font-bold whitespace-nowrap">{price}</div>}
      </div>

      <p className="text-[#D4D4D4] text-[15px] leading-[1.7]">
        {description}
      </p>

      {children && (
        <div className="mt-2">
          {children}
        </div>
      )}

      {caveat && (
        <p className="text-[#999999] text-[14px] italic mt-2">
          {caveat}
        </p>
      )}
    </motion.div>
  );
}
