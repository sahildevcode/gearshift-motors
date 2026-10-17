// Comprehensive data for Indian & Global Car Brands, models, and service pricing

export const CAR_BRANDS = [
  {
    id: 'maruti',
    name: 'Maruti Suzuki',
    country: 'India / Japan',
    badge: 'Popular & Low Maintenance',
    logoSvg: `
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full h-full">
        <circle cx="50" cy="50" r="45" stroke="#ef4444" stroke-width="6"/>
        <path d="M28 65L45 28L60 55L72 28" stroke="#ef4444" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    `,
    models: [
      { name: 'Swift', segment: 'Hatchback', baseMultiplier: 1.0 },
      { name: 'Baleno', segment: 'Premium Hatchback', baseMultiplier: 1.05 },
      { name: 'Brezza', segment: 'Compact SUV', baseMultiplier: 1.15 },
      { name: 'Grand Vitara', segment: 'Mid-size SUV', baseMultiplier: 1.3 },
      { name: 'Dzire', segment: 'Sedan', baseMultiplier: 1.05 },
      { name: 'Ertiga', segment: 'MPV', baseMultiplier: 1.2 },
    ],
    pricing: {
      basic: { price: 2199, time: '90 Mins', dealerPrice: 3800 },
      standard: { price: 3899, time: '3 Hours', dealerPrice: 6500 },
      comprehensive: { price: 6299, time: '5 Hours', dealerPrice: 10500 },
      acService: { price: 2499, time: '2 Hours', dealerPrice: 4200 },
      brakeOverhaul: { price: 1899, time: '2 Hours', dealerPrice: 3200 },
      ceramicCoating: { price: 11999, time: '24 Hours', dealerPrice: 22000 }
    }
  },
  {
    id: 'hyundai',
    name: 'Hyundai',
    country: 'South Korea',
    badge: 'Feature-Rich Specialist',
    logoSvg: `
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full h-full">
        <ellipse cx="50" cy="50" rx="46" ry="36" stroke="#3b82f6" stroke-width="6"/>
        <path d="M35 68V32L65 68V32" stroke="#3b82f6" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    `,
    models: [
      { name: 'Creta', segment: 'SUV', baseMultiplier: 1.25 },
      { name: 'i20', segment: 'Hatchback', baseMultiplier: 1.1 },
      { name: 'Venue', segment: 'Compact SUV', baseMultiplier: 1.18 },
      { name: 'Verna', segment: 'Sedan', baseMultiplier: 1.22 },
      { name: 'Tucson', segment: 'Premium SUV', baseMultiplier: 1.6 }
    ],
    pricing: {
      basic: { price: 2499, time: '90 Mins', dealerPrice: 4200 },
      standard: { price: 4499, time: '3.5 Hours', dealerPrice: 7500 },
      comprehensive: { price: 7499, time: '5 Hours', dealerPrice: 12500 },
      acService: { price: 2799, time: '2 Hours', dealerPrice: 4800 },
      brakeOverhaul: { price: 2199, time: '2.5 Hours', dealerPrice: 3900 },
      ceramicCoating: { price: 13999, time: '24 Hours', dealerPrice: 26000 }
    }
  },
  {
    id: 'tata',
    name: 'Tata Motors',
    country: 'India',
    badge: '5-Star Safety Tough Build',
    logoSvg: `
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full h-full">
        <circle cx="50" cy="50" r="45" stroke="#06b6d4" stroke-width="6"/>
        <path d="M25 40C38 32 62 32 75 40M50 35V72" stroke="#06b6d4" stroke-width="7" stroke-linecap="round"/>
      </svg>
    `,
    models: [
      { name: 'Nexon', segment: 'Compact SUV', baseMultiplier: 1.2 },
      { name: 'Harrier', segment: 'Full-size SUV', baseMultiplier: 1.45 },
      { name: 'Safari', segment: 'Flagship SUV', baseMultiplier: 1.55 },
      { name: 'Punch', segment: 'Micro SUV', baseMultiplier: 1.1 },
      { name: 'Altroz', segment: 'Hatchback', baseMultiplier: 1.12 },
      { name: 'Tiago / Tigor', segment: 'Hatchback/Sedan', baseMultiplier: 1.0 }
    ],
    pricing: {
      basic: { price: 2399, time: '90 Mins', dealerPrice: 4000 },
      standard: { price: 4299, time: '3 Hours', dealerPrice: 7200 },
      comprehensive: { price: 7199, time: '5 Hours', dealerPrice: 11900 },
      acService: { price: 2699, time: '2 Hours', dealerPrice: 4600 },
      brakeOverhaul: { price: 2299, time: '2.5 Hours', dealerPrice: 3800 },
      ceramicCoating: { price: 13499, time: '24 Hours', dealerPrice: 25000 }
    }
  },
  {
    id: 'mahindra',
    name: 'Mahindra',
    country: 'India',
    badge: '4x4 & Rugged SUV Specialist',
    logoSvg: `
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full h-full">
        <path d="M22 68L38 32H62L78 68L50 50L22 68Z" stroke="#e11d48" stroke-width="6" stroke-linejoin="round"/>
      </svg>
    `,
    models: [
      { name: 'Thar / Thar Roxx', segment: 'Off-Road 4x4', baseMultiplier: 1.4 },
      { name: 'Scorpio-N / Classic', segment: 'Tough SUV', baseMultiplier: 1.38 },
      { name: 'XUV700', segment: 'Luxury Tech SUV', baseMultiplier: 1.5 },
      { name: 'XUV 3XO', segment: 'Compact SUV', baseMultiplier: 1.18 },
      { name: 'Bolero Neo', segment: 'Utility SUV', baseMultiplier: 1.15 }
    ],
    pricing: {
      basic: { price: 2699, time: '90 Mins', dealerPrice: 4600 },
      standard: { price: 4799, time: '3.5 Hours', dealerPrice: 8200 },
      comprehensive: { price: 7999, time: '6 Hours', dealerPrice: 13500 },
      acService: { price: 2899, time: '2.5 Hours', dealerPrice: 5100 },
      brakeOverhaul: { price: 2499, time: '3 Hours', dealerPrice: 4200 },
      ceramicCoating: { price: 14999, time: '24 Hours', dealerPrice: 28000 }
    }
  },
  {
    id: 'toyota',
    name: 'Toyota',
    country: 'Japan',
    badge: 'Bulletproof Reliability',
    logoSvg: `
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full h-full">
        <ellipse cx="50" cy="50" rx="46" ry="36" stroke="#f59e0b" stroke-width="6"/>
        <ellipse cx="50" cy="42" rx="28" ry="16" stroke="#f59e0b" stroke-width="5"/>
        <line x1="50" y1="26" x2="50" y2="76" stroke="#f59e0b" stroke-width="5"/>
      </svg>
    `,
    models: [
      { name: 'Fortuner', segment: 'Premium Heavy SUV', baseMultiplier: 1.7 },
      { name: 'Innova Crysta / Hycross', segment: 'Premium MPV', baseMultiplier: 1.5 },
      { name: 'Urban Cruiser Hyryder', segment: 'Hybrid SUV', baseMultiplier: 1.3 },
      { name: 'Glanza', segment: 'Hatchback', baseMultiplier: 1.05 },
      { name: 'Camry', segment: 'Luxury Hybrid Sedan', baseMultiplier: 1.8 }
    ],
    pricing: {
      basic: { price: 2899, time: '90 Mins', dealerPrice: 4900 },
      standard: { price: 5199, time: '3.5 Hours', dealerPrice: 8900 },
      comprehensive: { price: 8699, time: '6 Hours', dealerPrice: 14900 },
      acService: { price: 3199, time: '2.5 Hours', dealerPrice: 5500 },
      brakeOverhaul: { price: 2699, time: '3 Hours', dealerPrice: 4600 },
      ceramicCoating: { price: 15999, time: '24 Hours', dealerPrice: 30000 }
    }
  },
  {
    id: 'honda',
    name: 'Honda',
    country: 'Japan',
    badge: 'i-VTEC Engine Smoothness',
    logoSvg: `
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full h-full">
        <rect x="15" y="15" width="70" height="70" rx="14" stroke="#6366f1" stroke-width="6"/>
        <path d="M30 30V70M70 30V70M30 48H70" stroke="#6366f1" stroke-width="8" stroke-linecap="round"/>
      </svg>
    `,
    models: [
      { name: 'City (Gen 5)', segment: 'Sedan', baseMultiplier: 1.25 },
      { name: 'Amaze', segment: 'Compact Sedan', baseMultiplier: 1.05 },
      { name: 'Elevate', segment: 'Mid-size SUV', baseMultiplier: 1.28 },
      { name: 'Civic', segment: 'Executive Sedan', baseMultiplier: 1.45 }
    ],
    pricing: {
      basic: { price: 2399, time: '90 Mins', dealerPrice: 4100 },
      standard: { price: 4399, time: '3 Hours', dealerPrice: 7400 },
      comprehensive: { price: 7299, time: '5 Hours', dealerPrice: 12200 },
      acService: { price: 2699, time: '2 Hours', dealerPrice: 4700 },
      brakeOverhaul: { price: 2299, time: '2.5 Hours', dealerPrice: 3900 },
      ceramicCoating: { price: 13999, time: '24 Hours', dealerPrice: 26000 }
    }
  },
  {
    id: 'kia',
    name: 'Kia',
    country: 'South Korea',
    badge: 'Modern Tech & Styling',
    logoSvg: `
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full h-full">
        <ellipse cx="50" cy="50" rx="46" ry="34" stroke="#10b981" stroke-width="6"/>
        <text x="50" y="58" font-size="28" font-weight="900" fill="#10b981" text-anchor="middle" font-family="sans-serif">KIA</text>
      </svg>
    `,
    models: [
      { name: 'Seltos', segment: 'Mid SUV', baseMultiplier: 1.25 },
      { name: 'Sonet', segment: 'Compact SUV', baseMultiplier: 1.15 },
      { name: 'Carens', segment: 'MPV', baseMultiplier: 1.28 },
      { name: 'EV6', segment: 'Electric Supercar', baseMultiplier: 1.8 }
    ],
    pricing: {
      basic: { price: 2499, time: '90 Mins', dealerPrice: 4300 },
      standard: { price: 4499, time: '3.5 Hours', dealerPrice: 7600 },
      comprehensive: { price: 7499, time: '5 Hours', dealerPrice: 12800 },
      acService: { price: 2799, time: '2 Hours', dealerPrice: 4900 },
      brakeOverhaul: { price: 2299, time: '2.5 Hours', dealerPrice: 3900 },
      ceramicCoating: { price: 13999, time: '24 Hours', dealerPrice: 27000 }
    }
  },
  {
    id: 'volkswagen',
    name: 'Volkswagen / Skoda',
    country: 'Germany / Czech',
    badge: 'TSI Turbo & German Engineering',
    logoSvg: `
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full h-full">
        <circle cx="50" cy="50" r="45" stroke="#38bdf8" stroke-width="6"/>
        <path d="M28 35L42 70L50 48L58 70L72 35M35 35L50 65L65 35" stroke="#38bdf8" stroke-width="5" stroke-linecap="round"/>
      </svg>
    `,
    models: [
      { name: 'Virtus / Slavia', segment: 'Turbo Sedan', baseMultiplier: 1.35 },
      { name: 'Taigun / Kushaq', segment: 'German SUV', baseMultiplier: 1.38 },
      { name: 'Polo TSI / Vento', segment: 'Hatchback/Sedan', baseMultiplier: 1.25 },
      { name: 'Octavia / Superb', segment: 'Executive Sedan', baseMultiplier: 1.7 }
    ],
    pricing: {
      basic: { price: 2999, time: '2 Hours', dealerPrice: 5600 },
      standard: { price: 5499, time: '4 Hours', dealerPrice: 9900 },
      comprehensive: { price: 8999, time: '6 Hours', dealerPrice: 16500 },
      acService: { price: 3499, time: '2.5 Hours', dealerPrice: 6200 },
      brakeOverhaul: { price: 2999, time: '3 Hours', dealerPrice: 5200 },
      ceramicCoating: { price: 15999, time: '24 Hours', dealerPrice: 32000 }
    }
  },
  {
    id: 'luxury-german',
    name: 'BMW / Mercedes / Audi',
    country: 'Germany',
    badge: 'Luxury Specialist & Diagnostic Lab',
    logoSvg: `
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full h-full">
        <circle cx="50" cy="50" r="44" stroke="#fbbf24" stroke-width="6"/>
        <line x1="50" y1="6" x2="50" y2="94" stroke="#fbbf24" stroke-width="4"/>
        <line x1="6" y1="50" x2="94" y2="50" stroke="#fbbf24" stroke-width="4"/>
        <circle cx="50" cy="50" r="22" stroke="#fbbf24" stroke-width="4"/>
      </svg>
    `,
    models: [
      { name: 'BMW 3-Series / X1', segment: 'Luxury Sports', baseMultiplier: 2.2 },
      { name: 'Mercedes C-Class / GLA', segment: 'Luxury Executive', baseMultiplier: 2.3 },
      { name: 'Audi A4 / Q3', segment: 'Luxury Quattro', baseMultiplier: 2.1 },
      { name: 'BMW 5-Series / X5', segment: 'Flagship Luxury', baseMultiplier: 2.8 },
      { name: 'Mercedes E-Class / GLC', segment: 'Flagship Luxury', baseMultiplier: 2.9 }
    ],
    pricing: {
      basic: { price: 6999, time: '2.5 Hours', dealerPrice: 16000 },
      standard: { price: 12999, time: '5 Hours', dealerPrice: 29000 },
      comprehensive: { price: 21999, time: '8 Hours', dealerPrice: 48000 },
      acService: { price: 6499, time: '3.5 Hours', dealerPrice: 14000 },
      brakeOverhaul: { price: 7999, time: '4 Hours', dealerPrice: 18000 },
      ceramicCoating: { price: 24999, time: '36 Hours', dealerPrice: 55000 }
    }
  }
];

export const SERVICE_PACKAGES = [
  {
    key: 'basic',
    name: 'Express Periodic Service',
    nameHi: 'एक्सप्रेस बेसिक सर्विस',
    desc: 'Quick oil change, vital fluids, and 25-point safety inspection for smooth city driving.',
    badge: 'Popular for Daily Commuters',
    features: [
      'Engine Oil Replacement (Castrol / Motul 100% Synthetic)',
      'Oil Filter Replacement (OEM Grade)',
      'Air Filter Clean & Dust Blow',
      '25-Point Comprehensive Visual Health Check',
      'Coolant & Brake Fluid Top-Up',
      'Exterior Pressure Foam Wash & Vacuum'
    ],
    warranty: '3 Months / 3,000 KM'
  },
  {
    key: 'standard',
    name: 'Standard Comprehensive Service',
    nameHi: 'स्टैंडर्ड फुल मेंटेनेंस सर्विस',
    desc: 'Recommended every 10,000 KM. Complete engine tune-up, filter changes & brake check.',
    badge: 'Most Recommended (Best Value)',
    features: [
      'Everything in Express Basic Service',
      'Air Filter Replacement (Brand New OEM)',
      'AC Cabin Filter Clean / Disinfection',
      '4-Wheel Brake Pad Cleaning, Inspection & Bleeding',
      'Spark Plug Cleaning & Gap Calibration (Petrol)',
      'Computerized OBD-II Engine Diagnostics & Sensor Scan',
      'Wheel Alignment & Balancing (Weight balancing included)',
      'Engine Bay Degreasing & Dressing'
    ],
    warranty: '6 Months / 10,000 KM'
  },
  {
    key: 'comprehensive',
    name: 'Major Engine & Mechanical Overhaul',
    nameHi: 'मेजर ओवरहॉल & फुल इंस्पेक्शन',
    desc: 'Deep rejuvenation for peak performance, smooth gear shifts, and zero vibrations.',
    badge: 'Complete Peace of Mind',
    features: [
      'Everything in Standard Comprehensive Service',
      'Coolant Drain & Complete 100% Flush Replacement',
      'Brake Fluid Complete Flush (DOT-4 Premium)',
      'Throttle Body Ultrasonic Deep Cleaning',
      'Suspension Bushing & Strut Mount Torque Inspection',
      'Fuel Injector Cleaning & Flow Test',
      'Battery Health Diagnostic & Terminal Greasing',
      'Full Body Underbody Anti-Rust Inspection',
      'Interior Deep Steam Sanitization & Dashboard Polish'
    ],
    warranty: '1 Year / 15,000 KM'
  },
  {
    key: 'acService',
    name: 'Super Chill AC Service & Antibacterial',
    nameHi: 'सुपर चिल्ड एसी रिपेयर & सर्विस',
    desc: 'Freeze cabin fast in high heat. Odor-free, ice-cold cooling with gas recharge.',
    badge: 'Ice Cold Cooling Guaranteed',
    features: [
      'Complete AC Gas Recovery & R134a Pure Gas Refill',
      'High-grade PAG Compressor Lubricant Oil Top-Up',
      'Condenser Coil Chemical Pressure Wash',
      'Cooling Coil De-misting & Antibacterial Foam Flush',
      'AC Filter / Pollen Filter Replacement',
      'Vent Temperature Thermometer Test (Sub 6°C verified)'
    ],
    warranty: '6 Months Leak-Free Guarantee'
  },
  {
    key: 'brakeOverhaul',
    name: 'Performance Brake & Suspension Overhaul',
    nameHi: 'ब्रेक & सस्पेंशन रिपेयरिंग',
    desc: 'Zero brake squeal, razor-sharp stopping power, and butter-smooth shock absorption.',
    badge: 'Maximum Stopping Safety',
    features: [
      'Ceramic / Semi-Metallic Front & Rear Brake Pad Check',
      'Rotor Disc Skimming & Lathe Turning (removes vibration)',
      'Caliper Pin Greasing with High-Temp Synthetic Lubricant',
      'Master Cylinder Pressure & ABS Sensor Health Check',
      'Power Steering Fluid Top-Up',
      'Suspension Link Rods & Ball Joint Rigidity Verification'
    ],
    warranty: '6 Months / 8,000 KM'
  },
  {
    key: 'ceramicCoating',
    name: '9H Diamond Ceramic Coating & Detailing',
    nameHi: '9H सिरेमिक कोटिंग & बॉडी डिटेलिंग',
    desc: 'Mirror-like glass gloss, hydrophobic water repelling, and UV/swirl mark protection.',
    badge: 'Showroom Glass Finish',
    features: [
      'Multi-Stage Clay Bar Decontamination',
      '3-Step Rotary Paint Correction (95% Swirl Mark Removal)',
      '9H German Dual-Layer Ceramic Shield Coating',
      'Alloy Wheel Ceramic Coating & Tyre Dressing',
      'Hydrophobic Windshield Glass Rain Repellent',
      'Interior Leather Conditioning & Odor Eliminator'
    ],
    warranty: '2 Years Gloss & Hydrophobic Warranty'
  }
];
