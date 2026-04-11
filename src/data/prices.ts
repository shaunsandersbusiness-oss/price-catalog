export interface PriceRow {
  service: string;
  prices: (string | number)[];
  description?: string;
  isHeader?: boolean;
}

export interface AddOn {
  service: string;
  price: string;
}

export interface CatalogData {
  market: string;
  year: string;
  sqftRanges: string[];
  photography: {
    rows: PriceRow[];
    addOns: AddOn[];
    floorPlans: PriceRow[];
    twilight: {
      description: string;
      rows: PriceRow[];
      addOns: AddOn[];
    };
  };
  video: {
    quickTour: {
      description: string;
      rows: PriceRow[];
    };
    standardCinematic: {
      description: string;
      rows: PriceRow[];
    };
    brandCommunity: {
      description: string;
      rows: PriceRow[];
    };
    addOns: AddOn[];
  };
  otherServices: AddOn[];
  packages: {
    description: string;
    rows: {
      name: string;
      svc: number | string;
      discount: string;
      included: string;
    }[];
    essential: {
      description: string;
      includes: string;
      rows: PriceRow[];
    };
    signature: {
      description: string;
      includes: string;
      rows: PriceRow[];
    };
    crown: {
      description: string;
      includes: string;
      rows: PriceRow[];
    };
    summary: {
      rows: PriceRow[];
    };
    comparison: {
      rows: {
        service: string;
        essential: string;
        signature: string;
        crown: string;
      }[];
    };
  };
}

const SQFT_RANGES = [
  "0-1,500 sqft",
  "1,501-3,500 sqft",
  "3,501-5,000 sqft",
  "5,001-7,000 sqft",
  "7,001-10,000 sqft",
  "10,001+ sqft"
];

export const NJ_DATA: CatalogData = {
  market: "NJ & Boroughs",
  year: "2026",
  sqftRanges: SQFT_RANGES,
  photography: {
    rows: [
      { service: "Bronze — Photos Only", prices: [170, 215, 275, 375, 465, "Contact Us"] },
      { service: "Silver — Photos + Floor Plan (10% Off)", prices: [220, 260, 360, 515, 665, "Contact Us"] },
      { service: "Gold — Photos + Floor Plan + Drone + 3D Tour + 2 Twilight Exteriors (10% Off)", prices: [395, 435, 580, 790, 1005, "Contact Us"] }
    ],
    addOns: [
      { service: "Virtual Staging", price: "$15 / photo" },
      { service: "Same-Day Edited Delivery", price: "$75 flat" },
      { service: "Drone (Add-On to Any Photo Package)", price: "$50" },
      { service: "Drone Stills (Standalone)", price: "$150" }
    ],
    floorPlans: [
      { service: "Floor Plan (Marketing Materials)", prices: [75, 125, 195, 275, "Contact Us"] },
      { service: "3D Interactive Tour (incl. Interactive Floor Plan)", prices: [145, 195, 255, 325, "Contact Us"] }
    ],
    twilight: {
      description: "Separate return visit for golden-hour magic. Available with any package or a la carte.",
      rows: [
        { service: "Twilight Photos", prices: [200, 225, 275, 325, 375, "Contact Us"] }
      ],
      addOns: [
        { service: "Virtual Twilight (Photo)", price: "$25 / photo" }
      ]
    }
  },
  video: {
    quickTour: {
      description: "15–45 sec walkthrough set to music. Shot during photo visit. No drone, no text, no agent.",
      rows: [
        { service: "Quick Tour", prices: ["$150 flat", "H or V"] } // Special format for this table
      ]
    },
    standardCinematic: {
      description: "All videos available in horizontal & vertical formats. Drone footage included. Agent intro optional.",
      rows: [
        { service: "Regalis Standard", prices: [300, 365, 400, 475, 575, "Contact Us"] },
        { service: "Regalis Cinematic", prices: [500, 560, 600, 685, 815, "Contact Us"] }
      ]
    },
    brandCommunity: {
      description: "Same cinematic-level production — color grading, bespoke text, sound design. Not listing-focused.",
      rows: [
        { service: "Agent Branding Video", prices: ["$600", "Required", "Optional"] },
        { service: "Community Spotlight", prices: ["$500", "Optional", "Included"] }
      ]
    },
    addOns: [
      { service: "Virtual Renovation / Staging Integration", price: "$30 / scene" }
    ]
  },
  otherServices: [
    { service: "Listing Website", price: "Included free" }
  ],
  packages: {
    description: "Photos only = 10% off • Any photo + video = 15% off • Gold photo + video = 20% off • Crown = 30% off",
    rows: [
      { name: "Essential", svc: 4, discount: "15% off", included: "Silver Photos + Quick Tour Video + Listing Website" },
      { name: "Signature ★", svc: 7, discount: "20% off", included: "Gold Photos + Cinematic Reel + 2 Twilight Exteriors + Listing Website" },
      { name: "Crown", svc: 8, discount: "30% off", included: "Gold Photos + Cinematic + Standard OR Branding OR Spotlight + 2 Twilight Exteriors + Website" }
    ],
    essential: {
      description: "A clean, professional launch.",
      includes: "Silver Photos (Floor Plan) + Quick Tour Video (H or V, set to music) + Listing Website",
      rows: [
        { service: "Regular", prices: [395, 440, 550, 720, 890, "Contact Us"] },
        { service: "Package Price", prices: [335, 375, 470, 610, 755, "Contact Us"] },
        { service: "You Save", prices: [60, 65, 80, 110, 135, "—"] }
      ]
    },
    signature: {
      description: "Most Popular — 20% Off. Every angle covered.",
      includes: "Gold Photos (Floor Plan + Drone + 3D Tour) + 2 Twilight Exterior Photos + Regalis Cinematic (H or V, drone in video, cinematic color grading, bespoke text, sound design) + Listing Website",
      rows: [
        { service: "Regular", prices: [940, 1045, 1245, 1560, 1930, "Contact Us"] },
        { service: "Package Price", prices: [750, 835, 995, 1250, 1545, "Contact Us"] },
        { service: "You Save", prices: [190, 210, 250, 310, 385, "—"] }
      ]
    },
    crown: {
      description: "The full arsenal.",
      includes: "Gold Photos (Floor Plan + Drone + 3D Tour) + 2 Twilight Exterior Photos + Cinematic Reel + Standard OR Agent Branding OR Community Spotlight + Listing Website",
      rows: [
        { service: "Regular", prices: [1540, 1645, 1845, 2160, 2530, "Contact Us"] },
        { service: "Package Price", prices: [1080, 1150, 1290, 1510, 1770, "Contact Us"] },
        { service: "You Save", prices: [460, 495, 555, 650, 760, "—"] }
      ]
    },
    summary: {
      rows: [
        { service: "Essential (15% off)", prices: [335, 375, 470, 610, 755, "Contact Us"] },
        { service: "Signature (20% off)", prices: [750, 835, 995, 1250, 1545, "Contact Us"] },
        { service: "Crown (30% off)", prices: [1080, 1150, 1290, 1510, 1770, "Contact Us"] }
      ]
    },
    comparison: {
      rows: [
        { service: "Interior & Exterior Photos", essential: "Silver", signature: "Gold", crown: "Gold" },
        { service: "Floor Plan (Marketing)", essential: "✓ (Silver)", signature: "✓ (Gold)", crown: "✓ (Gold)" },
        { service: "Drone Aerial Stills", essential: "—", signature: "✓ (Gold)", crown: "✓ (Gold)" },
        { service: "3D Tour + Interactive Floor Plan", essential: "—", signature: "✓ (Gold)", crown: "✓ (Gold)" },
        { service: "2 Twilight Exterior Photos", essential: "—", signature: "✓", crown: "✓" },
        { service: "Quick Tour Video", essential: "✓", signature: "—", crown: "—" },
        { service: "Regalis Cinematic", essential: "—", signature: "✓", crown: "✓" },
        { service: "Standard, Branding, or Spotlight (pick 1)", essential: "—", signature: "—", crown: "✓" },
        { service: "Drone in Video", essential: "—", signature: "✓", crown: "✓" },
        { service: "Listing Website", essential: "✓", signature: "✓", crown: "✓" }
      ]
    }
  }
};

export const MANHATTAN_DATA: CatalogData = {
  market: "Manhattan",
  year: "2026",
  sqftRanges: SQFT_RANGES,
  photography: {
    rows: [
      { service: "Bronze — Photos Only", prices: [245, 290, 350, 450, 540, "Contact Us"] },
      { service: "Silver — Photos + Floor Plan (10% Off)", prices: [290, 330, 430, 580, 735, "Contact Us"] },
      { service: "Gold — Photos + Floor Plan + Drone + 3D Tour + 2 Twilight Exteriors (10% Off)", prices: [510, 550, 695, 900, 1115, "Contact Us"] }
    ],
    addOns: [
      { service: "Virtual Staging", price: "$15 / photo" },
      { service: "Same-Day Edited Delivery", price: "$75 flat" },
      { service: "Drone (Add-On to Any Photo Package)", price: "$100" },
      { service: "Drone Stills (Standalone)", price: "$250" }
    ],
    floorPlans: [
      { service: "Floor Plan (Marketing Materials)", prices: [75, 125, 195, 275, "Contact Us"] },
      { service: "3D Interactive Tour (incl. Interactive Floor Plan)", prices: [145, 195, 255, 325, "Contact Us"] }
    ],
    twilight: {
      description: "Separate return visit for golden-hour magic. Available with any package or a la carte.",
      rows: [
        { service: "Twilight Photos", prices: [275, 300, 350, 400, 450, "Contact Us"] }
      ],
      addOns: [
        { service: "Virtual Twilight (Photo)", price: "$25 / photo" }
      ]
    }
  },
  video: {
    quickTour: {
      description: "15–45 sec walkthrough set to music. Shot during photo visit. No drone, no text, no agent.",
      rows: [
        { service: "Quick Tour", prices: ["$225 flat", "H or V"] }
      ]
    },
    standardCinematic: {
      description: "All videos available in horizontal & vertical formats. Agent intro optional. Drone not included — available as add-on.",
      rows: [
        { service: "Regalis Standard", prices: [375, 440, 475, 550, 650, "Contact Us"] },
        { service: "Regalis Cinematic", prices: [575, 635, 675, 760, 890, "Contact Us"] }
      ]
    },
    brandCommunity: {
      description: "Same cinematic-level production — color grading, bespoke text, sound design. Not listing-focused. Drone not included — available as add-on.",
      rows: [
        { service: "Agent Branding Video", prices: ["$675", "Required"] },
        { service: "Community Spotlight", prices: ["$575", "Optional"] }
      ]
    },
    addOns: [
      { service: "Drone Footage in Video (Add-On)", price: "$100" },
      { service: "Virtual Renovation / Staging Integration", price: "$30 / scene" }
    ]
  },
  otherServices: [
    { service: "Listing Website", price: "Included free" }
  ],
  packages: {
    description: "Photos only = 10% off • Any photo + video = 15% off • Gold photo + video = 20% off • Crown = 30% off",
    rows: [
      { name: "Essential", svc: 4, discount: "15% off", included: "Silver Photos + Quick Tour Video + Listing Website" },
      { name: "Signature ★", svc: 7, discount: "20% off", included: "Gold Photos + Cinematic Reel + 2 Twilight Exteriors + Listing Website" },
      { name: "Crown", svc: 8, discount: "30% off", included: "Gold Photos + Cinematic + Standard OR Branding OR Spotlight + 2 Twilight Exteriors + Website" }
    ],
    essential: {
      description: "A clean, professional launch.",
      includes: "Silver Photos (Floor Plan) + Quick Tour Video (H or V, set to music) + Listing Website",
      rows: [
        { service: "Regular", prices: [545, 590, 700, 870, 1040, "Contact Us"] },
        { service: "Package Price", prices: [465, 500, 595, 740, 885, "Contact Us"] },
        { service: "You Save", prices: [80, 90, 105, 130, 155, "—"] }
      ]
    },
    signature: {
      description: "Most Popular — 20% Off. Every angle covered.",
      includes: "Gold Photos (Floor Plan + Drone + 3D Tour) + 2 Twilight Exterior Photos + Regalis Cinematic (H or V, cinematic color grading, bespoke text, sound design) + Listing Website",
      rows: [
        { service: "Regular", prices: [1140, 1245, 1445, 1760, 2130, "Contact Us"] },
        { service: "Package Price", prices: [910, 995, 1155, 1410, 1705, "Contact Us"] },
        { service: "You Save", prices: [230, 250, 290, 350, 425, "—"] }
      ]
    },
    crown: {
      description: "The full arsenal.",
      includes: "Gold Photos (Floor Plan + Drone + 3D Tour) + 2 Twilight Exterior Photos + Cinematic Reel + Standard OR Agent Branding OR Community Spotlight + Listing Website",
      rows: [
        { service: "Regular", prices: [1815, 1920, 2120, 2435, 2805, "Contact Us"] },
        { service: "Package Price", prices: [1270, 1345, 1485, 1705, 1965, "Contact Us"] },
        { service: "You Save", prices: [545, 575, 635, 730, 840, "—"] }
      ]
    },
    summary: {
      rows: [
        { service: "Essential (15% off)", prices: [465, 500, 595, 740, 885, "Contact Us"] },
        { service: "Signature (20% off)", prices: [910, 995, 1155, 1410, 1705, "Contact Us"] },
        { service: "Crown (30% off)", prices: [1270, 1345, 1485, 1705, 1965, "Contact Us"] }
      ]
    },
    comparison: {
      rows: [
        { service: "Interior & Exterior Photos", essential: "Silver", signature: "Gold", crown: "Gold" },
        { service: "Floor Plan (Marketing)", essential: "✓ (Silver)", signature: "✓ (Gold)", crown: "✓ (Gold)" },
        { service: "Drone Aerial Stills", essential: "—", signature: "✓ (Gold)", crown: "✓ (Gold)" },
        { service: "3D Tour + Interactive Floor Plan", essential: "—", signature: "✓ (Gold)", crown: "✓ (Gold)" },
        { service: "2 Twilight Exterior Photos", essential: "—", signature: "✓", crown: "✓" },
        { service: "Quick Tour Video", essential: "✓", signature: "—", crown: "—" },
        { service: "Regalis Cinematic", essential: "—", signature: "✓", crown: "✓" },
        { service: "Standard, Branding, or Spotlight (pick 1)", essential: "—", signature: "—", crown: "✓" },
        { service: "Listing Website", essential: "✓", signature: "✓", crown: "✓" }
      ]
    }
  }
};
