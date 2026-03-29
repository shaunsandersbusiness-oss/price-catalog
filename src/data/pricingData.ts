export type Market = 'NJ' | 'MAN';
export type TierIndex = 0 | 1 | 2 | 3 | 4 | 5;

export const TIERS = [
  "0–1,500 sqft","1,501–2,000 sqft","2,001–3,000 sqft",
  "3,001–4,000 sqft","4,001–5,000 sqft","5,000+ sqft",
];

export const PRICING_DATA = {
  NJ: {
    photography: {
      bronze:          [170, 215, 260, 320, 395, "Contact Us"],
      twilight:        [200, 215, 245, 285, 335, "Contact Us"],
      floorPlan:       [95,  95,  115, 145, 185, "Contact Us"],
      threeDTour:      [175, 175, 210, 250, 300, "Contact Us"],
      droneAddOn:      75,
      droneStandalone: 150,
    },
    video: {
      standard:           [300, 335, 375, 425, 500, "Contact Us"],
      cinematic:          [600, 635, 675, 725, 800, "Contact Us"],
      agentBranding:      600,
      communitySpotlight: 550,
      droneInVideo:       0,  // INCLUDED FREE in NJ
    },
    addOns: {
      virtualStaging: 25, virtualTwilight: 25, virtualRenovation: 30,
      objectRemoval: 15, sameDayDelivery: 35, nextDayVideo: 150, listingWebsite: 150,
    },
  },
  MAN: {
    photography: {
      bronze:          [245, 290, 335, 395, 470, "Contact Us"],
      twilight:        [275, 290, 320, 360, 410, "Contact Us"],
      floorPlan:       [95,  95,  115, 145, 185, "Contact Us"],
      threeDTour:      [175, 175, 210, 250, 300, "Contact Us"],
      droneAddOn:      100,
      droneStandalone: 250,
    },
    video: {
      standard:           [375, 410, 450, 500, 575, "Contact Us"],
      cinematic:          [675, 710, 750, 800, 875, "Contact Us"],
      agentBranding:      675,
      communitySpotlight: 625,
      droneInVideo:       100,  // $100 add-on in Manhattan
    },
    addOns: {
      virtualStaging: 25, virtualTwilight: 25, virtualRenovation: 30,
      objectRemoval: 15, sameDayDelivery: 35, nextDayVideo: 150, listingWebsite: 150,
    },
  },
};

// ── Pre-calculated bundle component sums (à la carte totals before discount) ──
export const SILVER_RAW: Record<Market, (number | string)[]> = {
  NJ:  [265, 310, 375, 465, 580, "Contact Us"],
  MAN: [340, 385, 450, 540, 655, "Contact Us"],
};
export const GOLD_RAW: Record<Market, (number | string)[]> = {
  NJ:  [515, 560, 660, 790,  955,  "Contact Us"],
  MAN: [615, 660, 760, 890, 1055, "Contact Us"],
};

// ── Pre-calculated DISCOUNTED package prices ──────────────────────────────────
// NEVER recalculate these — use these arrays directly for display.

// Essential = Silver × 0.90 (10% off)
export const ESSENTIAL_PRICES: Record<Market, (number | string)[]> = {
  NJ:  [240, 280, 340, 420,  520, "Contact Us"],
  MAN: [305, 345, 405, 485,  590, "Contact Us"],
};

// Gold Bundle = Gold × 0.90 (10% off, photo only)
export const GOLD_BUNDLE_PRICES: Record<Market, (number | string)[]> = {
  NJ:  [465, 505, 595,  710,  860, "Contact Us"],
  MAN: [555, 595, 685,  800,  950, "Contact Us"],
};

// Signature = (Gold + Standard) × 0.85 (15% off)
export const SIGNATURE_PRICES: Record<Market, (number | string)[]> = {
  NJ:  [695,  760,  880, 1035, 1235, "Contact Us"],
  MAN: [840,  910, 1030, 1180, 1385, "Contact Us"],
};

// Crown + Standard = (Gold + Cinematic + Standard) × 0.80 (20% off)
export const CROWN_STANDARD_PRICES: Record<Market, (number | string)[]> = {
  NJ:  [1130, 1225, 1370, 1550, 1805, "Contact Us"],
  MAN: [1330, 1425, 1570, 1750, 2005, "Contact Us"],
};

// Crown + Agent Branding = (Gold + Cinematic + Branding) × 0.80 (20% off)
export const CROWN_BRANDING_PRICES: Record<Market, (number | string)[]> = {
  NJ:  [1370, 1435, 1550, 1690, 1885, "Contact Us"],
  MAN: [1570, 1635, 1750, 1890, 2085, "Contact Us"],
};

// Crown + Community Spotlight = (Gold + Cinematic + Spotlight) × 0.80 (20% off)
export const CROWN_SPOTLIGHT_PRICES: Record<Market, (number | string)[]> = {
  NJ:  [1330, 1395, 1510, 1650, 1845, "Contact Us"],
  MAN: [1530, 1595, 1710, 1850, 2045, "Contact Us"],
};

