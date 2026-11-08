// Genuine Car Spare Parts & Accessories Data for KD Workshop
// High-grade OEM & Performance Parts with specs, warranty, fitment, and demo clips
import dpfImg from '../assets/dpf-clean-service.jpg';

export const CAR_PARTS_DATA = [
  {
    id: 'xrs-dpf-cleaner-kit',
    name: 'Original XRS Professional DPF Cleaner & Decarbonizing Kit',
    brand: 'XRS Chemical Labs',
    category: 'engine-oils',
    categoryLabel: 'Diesel & Exhaust Chemistry',
    badge: 'KD Workshop Verified',
    price: 1899,
    mrp: 2799,
    discountPercent: 32,
    rating: 5.0,
    reviewCount: 94,
    inStock: true,
    stockCount: 24,
    warranty: '100% Genuine XRS Sealed Product with Emission Test Pass Guarantee',
    fitment: [
      'Maruti Suzuki Swift, Dzire, Brezza, Ertiga, S-Cross DDiS Diesel',
      'Hyundai Creta, Venue, Verna 1.4 & 1.5 CRDi Diesel',
      'Tata Harrier, Safari, Nexon, Altroz Revotorq Diesel',
      'Mahindra Thar, Scorpio-N, XUV700 mHawk 2.2 Diesel',
      'Toyota Fortuner, Hilux & Innova Crysta GD Series Diesel'
    ],
    shortDesc: 'High-performance chemical flush for Diesel Particulate Filters. Clears stubborn carbon soot and ash without cutting or removing the exhaust silencer.',
    fullDesc: 'As used in our KD Workshop bays, the XRS Professional DPF Cleaner dissolves carbon soot, unburnt hydrocarbons, and ash clogged inside the ceramic honeycomb filter. Restores engine horsepower, eliminates sluggish turbo lag, improves fuel mileage by up to 18%, and stops heavy black exhaust smoke.',
    features: [
      'Dissolves heavy carbon soot inside the filter without cutting or welding silencer',
      'Restores factory exhaust backpressure and cures DPF choke warning lights',
      'Tested and verified by master mechanics at KD Workshop',
      'Safe for oxygen sensors, catalytic converters, and turbochargers',
      'Includes professional application nozzle and pressure hose'
    ],
    specifications: {
      'Volume': '1,000 ml High-Concentration Decoking Agent',
      'Application Type': 'Direct Pressure Sensor Port or Spray Gun Injection',
      'Compatibility': 'All BS-IV & BS-VI Diesel Cars with DPF / SCR systems',
      'Turnaround Time': '45 to 60 Mins Complete Treatment',
      'Formulation': 'Ashless organic solvent with Cerium Oxide nano-catalyst',
      'Country of Origin': 'India / Germany Tech'
    },
    images: [
      dpfImg,
      'https://images.unsplash.com/photo-1615906655593-ad0386982a0f?w=1000&auto=format&fit=crop&q=85'
    ],
    videoClip: {
      title: 'Live DPF Flushing Demonstration & Black Smoke Clear Test',
      duration: '0:45',
      thumbnail: dpfImg,
      description: 'See the live chemical reaction decoking soot honeycomb in our KD Workshop bay.'
    },
    inTheBox: [
      '1x XRS DPF Cleaner 1L Sealed Canister',
      '1x Flexible High-Pressure Application Hose',
      '1x DPF Treatment Service Record Sticker',
      '1x KD Workshop Free Installation Coupon'
    ]
  },
  {
    id: 'brembo-ceramic-brake-pads',
    name: 'Brembo Ceramic Low-Dust Front Brake Pads',
    brand: 'Brembo',
    category: 'brakes',
    categoryLabel: 'Braking System',
    badge: 'Bestseller',
    price: 3499,
    mrp: 4999,
    discountPercent: 30,
    rating: 4.9,
    reviewCount: 184,
    inStock: true,
    stockCount: 14,
    warranty: '2 Years / 30,000 KM Direct Replacement Warranty',
    fitment: [
      'Maruti Suzuki Swift, Dzire, Baleno (2018-2024)',
      'Hyundai Creta, i20, Verna (2019-2024)',
      'Tata Nexon, Altroz (2020-2024)',
      'Kia Seltos, Sonet (2020-2024)',
      'Honda City 4th & 5th Gen (2016-2024)'
    ],
    shortDesc: 'Premium ceramic compound formulation engineered for zero rotor gouging, near-zero brake dust, and whisper-quiet high-temperature braking.',
    fullDesc: 'Manufactured by Brembo in Italy, this ceramic brake pad set offers superior friction stability across all ambient temperatures (up to 650°C). Unlike aggressive metallic pads, Brembo ceramic compound dramatically reduces rotor wear and eliminates annoying high-pitch squeals. Includes pre-fitted stainless steel anti-rattle shims and acoustic wear indicators.',
    features: [
      'Zero brake dust formulation — keeps alloy wheels pristine clean',
      'Pre-fitted multi-layer vulcanized rubber shim eliminates squealing',
      'Consistent pedal bite from cold start up to 650°C fade resistance',
      'ECE R90 homologated and certified for Indian & European road conditions',
      'Direct OEM drop-in fit with zero caliper modifications needed'
    ],
    specifications: {
      'Manufacturer Part Number': 'P 54 041N',
      'Material Compound': 'Ceramic Friction Matrix with Kevlar fibers',
      'Pad Thickness': '17.2 mm (Brand New)',
      'Wear Indicator': 'Acoustic Wear Sensor included',
      'Brake System': 'Akebono / Bosch Caliper Compatible',
      'Country of Origin': 'Italy',
      'Recommended Brake Fluid': 'DOT 4 or DOT 5.1'
    },
    images: [
      'https://images.unsplash.com/photo-1600705722908-bab1e61c0b4d?w=1000&auto=format&fit=crop&q=85',
      'https://images.unsplash.com/photo-1486006920555-c77dce18193b?w=1000&auto=format&fit=crop&q=85',
      'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=1000&auto=format&fit=crop&q=85'
    ],
    videoClip: {
      title: 'Brembo Brake Bite & Thermal Dyno Stop Test',
      duration: '0:42',
      thumbnail: 'https://images.unsplash.com/photo-1600705722908-bab1e61c0b4d?w=800&auto=format&fit=crop&q=80',
      description: 'Watch the computerized friction coefficient test comparing stock metallic pads vs Brembo Ceramic under hard braking.'
    },
    inTheBox: [
      '4x Front Brake Pads (Inner & Outer for both front wheels)',
      '4x Anti-vibration Stainless Steel Shims (Pre-installed)',
      '1x High-temp Synthetic Caliper Pin Lubricant (5g sachet)',
      '1x Brembo Holographic Authenticity QR Certificate'
    ]
  },
  {
    id: 'castrol-edge-5w40-synthetic',
    name: 'Castrol EDGE 5W-40 Titanium Fully Synthetic Engine Oil (4L)',
    brand: 'Castrol',
    category: 'engine-oils',
    categoryLabel: 'Engine Oils & Lubricants',
    badge: 'Popular Choice',
    price: 2899,
    mrp: 3899,
    discountPercent: 26,
    rating: 4.9,
    reviewCount: 312,
    inStock: true,
    stockCount: 28,
    warranty: '100% Genuine Sealed Can Guarantee with Castrol QR Verify',
    fitment: [
      'All Turbo-Petrol & Naturally Aspirated Engines (Maruti, Hyundai, Honda, Tata)',
      'CRDi & Multijet Diesel Engines (Creta, Harrier, Safari, Swift DDiS)',
      'German Performance Cars (Volkswagen TSI, Skoda TSI, BMW, Audi)'
    ],
    shortDesc: 'Fluid TITANIUM Technology transforms its structure under pressure to double film strength, preventing oil breakdown and friction loss.',
    fullDesc: 'Castrol EDGE 5W-40 with patented Fluid TITANIUM is the premier choice for modern high-output turbo engines that run at extreme combustion pressures. It physically transforms its structure at peak load points to keep metal components separated, reducing power-robbing friction by up to 20%. Extends engine life and guarantees effortless sub-zero cold starts.',
    features: [
      'Fluid TITANIUM technology doubles oil film strength under severe engine stress',
      'Maximizes short and long-term engine horsepower and throttle response',
      'Tested against rigorous European ACEA A3/B4 and API SP industry standards',
      'Reduces harmful engine sludge and piston varnish deposits',
      'Delivers unmatched thermal stability across harsh Indian summer heatwaves'
    ],
    specifications: {
      'Viscosity Grade': 'SAE 5W-40',
      'Base Oil Type': '100% Group IV Fully Synthetic with Titanium Molecules',
      'Volume': '4 Litres Sealed Canister',
      'API Standards': 'API SP / SN PLUS / SN / CF',
      'ACEA Standards': 'ACEA A3/B3, A3/B4',
      'OEM Approvals': 'VW 502 00 / 505 00, BMW Longlife-01, MB-Approval 229.5',
      'Drain Interval': '10,000 KM to 15,000 KM or 1 Year'
    },
    images: [
      'https://images.unsplash.com/photo-1615906655593-ad0386982a0f?w=1000&auto=format&fit=crop&q=85',
      'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=1000&auto=format&fit=crop&q=85'
    ],
    videoClip: {
      title: 'Engine Idle Sound & Cold Start Comparison with Castrol EDGE',
      duration: '0:35',
      thumbnail: 'https://images.unsplash.com/photo-1615906655593-ad0386982a0f?w=800&auto=format&fit=crop&q=80',
      description: 'Decibel meter reading showing a 4.2 dB noise reduction in engine valvetrain clatter after flushing and filling Castrol EDGE 5W-40.'
    },
    inTheBox: [
      '1x 4L Castrol EDGE 5W-40 Sealed Canister',
      '1x Free Workshop Oil Service Funnel',
      '1x Next Service Due Mileage Reminder Door Sticker'
    ]
  },
  {
    id: 'philips-ultinon-pro-led-headlight',
    name: 'Philips Ultinon Pro9100 LED Headlight Bulb Conversion Kit',
    brand: 'Philips Automotive',
    category: 'lighting',
    categoryLabel: 'Lighting & Visibility',
    badge: '350% Brighter',
    price: 4999,
    mrp: 7499,
    discountPercent: 33,
    rating: 4.8,
    reviewCount: 147,
    inStock: true,
    stockCount: 19,
    warranty: '3 Years Official Philips India Replacement Warranty',
    fitment: [
      'Available in H4, H7, H11, HB3 (9005), HB4 (9006) Socket Sizes',
      'Fits 95% Indian Cars (Brezza, Swift, Creta, Seltos, Thar, Fortuner, Nexon)'
    ],
    shortDesc: 'Up to 350% brighter white light on dark highways with OEM Lumileds TopContact LEDs and precision beam cut-off that never blinds oncoming traffic.',
    fullDesc: 'Tired of dim, yellowish halogen headlamps on Indian highways? Philips Ultinon Pro9100 sets the benchmark for aftermarket automotive lighting. Emits a clean, daylight-like 5800 Kelvin pure white beam that illuminates road potholes, lane markings, and pedestrians up to 250 meters away without causing glare to oncoming drivers. Features integrated AirBoost active fan cooling.',
    features: [
      '350% brighter road illumination compared to standard legal halogen bulbs',
      '5,800 Kelvin pure white light matches the luxury look of German luxury cars',
      'Patented SafeBeam technology produces sharp cut-off line with zero glare',
      'AirBoost thermal management ensures over 5,000 hours of continuous operation',
      'CANBus error-free driver included — zero dashboard bulb warnings'
    ],
    specifications: {
      'Bulb Types Available': 'H4 (Dual Beam) / H7 / H11 / 9005',
      'Color Temperature': '5,800 Kelvin Pure White',
      'Luminous Flux': '3,600 Lumens per Pair',
      'Operating Voltage': '12V - 24V DC Compatible',
      'Cooling Technology': 'Ultra-quiet Micro Mag-Lev Fan with AirBoost copper core',
      'Lifespan': 'Up to 5,000 Hours (Approx. 8-10 Years of Daily Driving)'
    },
    images: [
      'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=1000&auto=format&fit=crop&q=85',
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1000&auto=format&fit=crop&q=85'
    ],
    videoClip: {
      title: 'Night Highway Driving Beam Comparison: Stock Halogen vs Philips LED',
      duration: '0:48',
      thumbnail: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=800&auto=format&fit=crop&q=80',
      description: 'Dashcam footage on an unlit state highway demonstrating the massive 200m visibility boost and razor-sharp beam cutoff.'
    },
    inTheBox: [
      '2x Philips Ultinon Pro9100 LED Headlamp Bulbs',
      '2x Integrated CANBus Anti-Flicker Ballast Drivers',
      '4x High-temp Cable Zip Ties',
      '1x Comprehensive DIY Installation Manual & Warranty Card'
    ]
  },
  {
    id: 'kn-high-flow-washable-air-filter',
    name: 'K&N High-Flow Washable Lifetime Performance Air Filter',
    brand: 'K&N Engineering',
    category: 'filters',
    categoryLabel: 'Air & Cabin Filters',
    badge: 'Million Mile Warranty',
    price: 4499,
    mrp: 5999,
    discountPercent: 25,
    rating: 4.9,
    reviewCount: 220,
    inStock: true,
    stockCount: 11,
    warranty: 'K&N 10-Year / 1.6 Million Kilometer Limited Warranty',
    fitment: [
      'Maruti Suzuki Swift, Baleno, Jimny, Grand Vitara (1.2L & 1.5L Petrol)',
      'Hyundai Creta 1.5 MPI & Turbo, i20 N-Line (2020-2024)',
      'Tata Nexon & Altroz Revotron (2018-2024)',
      'Mahindra Thar Petrol / Diesel & Scorpio-N (2020-2024)'
    ],
    shortDesc: 'Designed to increase airflow by up to 50%, providing noticeably crisper throttle response and improved fuel economy without sacrificing engine protection.',
    fullDesc: 'Unlike disposable paper filters that must be replaced every 10,000 km, K&N High-Flow Air Filters are constructed from 4 to 6 layers of premium surgical cotton gauze layered between epoxy-coated aluminum wire mesh. Treated with specially engineered tacking oil to capture micro-dust particles while providing up to 50% more air volume into the intake manifold.',
    features: [
      'Delivers up to 50% more airflow for immediate, punchy throttle pick-up',
      'Washable and reusable — clean every 50,000 km, never buy a paper filter again',
      'Guaranteed to increase horsepower and torque across the entire rev range',
      'Protects engine against 99% of abrasive dust and dirt particles',
      'Direct drop-in replacement into your car factory airbox in under 5 minutes'
    ],
    specifications: {
      'Filter Material': 'Multi-layer Cotton Gauze with Cross-Woven Wire Mesh',
      'Filter Shape': 'OEM Drop-In Panel (Model Specific Fit)',
      'Pre-Oiled': 'Factory Pre-Oiled with K&N Red Tacky Oil, Ready to Install',
      'Cleaning Interval': 'Clean Every 50,000 Kilometers under Normal Conditions',
      'Emissions Legal': '50-State Legal / ARAI Approved'
    },
    images: [
      'https://images.unsplash.com/photo-1486006920555-c77dce18193b?w=1000&auto=format&fit=crop&q=85',
      'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=1000&auto=format&fit=crop&q=85'
    ],
    videoClip: {
      title: 'Intake Roar & 0-100 Acceleration Dyno Test with K&N Filter',
      duration: '0:38',
      thumbnail: 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?w=800&auto=format&fit=crop&q=80',
      description: 'Hear the deep intake induction sound and see dyno power curve comparison showing +3.8 BHP gain on Maruti 1.5L K-Series engine.'
    },
    inTheBox: [
      '1x K&N High-Flow Performance Air Filter',
      '1x "Do Not Discard" Warning Sticker for Workshop Technicians',
      '1x K&N Hologram Shield Decal',
      '1x Warranty Card & Installation Guide'
    ]
  },
  {
    id: 'meguiars-ceramic-glaze-wax-kit',
    name: "Meguiar's Hybrid Ceramic Liquid Wax & Paint Glaze Kit",
    brand: "Meguiar's USA",
    category: 'detailing',
    categoryLabel: 'Detailing & Glazing',
    badge: 'Pro Detailer Choice',
    price: 2499,
    mrp: 3499,
    discountPercent: 28,
    rating: 4.9,
    reviewCount: 96,
    inStock: true,
    stockCount: 22,
    warranty: '100% Guaranteed Mirror-Like Water Beading Protection for 6 Months',
    fitment: [
      'Safe for all automotive clear coats, single-stage paints, gloss vinyl wraps & ceramic coatings',
      'Works wonders on dark and black cars (removes micro swirl marks)'
    ],
    shortDesc: 'Advanced SiO2 hybrid ceramic technology creates an ultra-durable chemical bond on your car paint, sealing in a wet-look mirror gloss and insane water beading.',
    fullDesc: 'Get professional ceramic coating gloss and hydrophobic rain protection right at home or during your workshop visit. Meguiars Hybrid Ceramic Liquid Wax blends pure Carnauba wax warmth with cutting-edge Silicon Dioxide (SiO2) ceramic durability. Protects against bird droppings, acid rain, harsh UV sun fading, and road grime for up to 6 months per application.',
    features: [
      'SiO2 Hybrid Ceramic Sealant forms a rock-hard shield on clear coat',
      'Creates instant self-cleaning effect — dust and mud wash away with plain water',
      'Deep, wet-look reflective shine that hides light towel swirl marks',
      'Does not whiten or stain exterior black plastic and rubber mouldings',
      'Can be applied easily by hand with the included foam pad or dual-action polisher'
    ],
    specifications: {
      'Volume': '473 ml (16 fl oz) — Enough for 6 full car treatments',
      'Chemical Technology': 'Silicon Dioxide (SiO2) Hybrid Polymer Matrix',
      'Protection Duration': 'Up to 6 Months per Coat',
      'Curing Time': 'Wipe off in 5-10 minutes, fully water-resistant in 2 hours',
      'Country of Origin': 'USA'
    },
    images: [
      'https://images.unsplash.com/photo-1607860108855-64acf2078ed9?w=1000&auto=format&fit=crop&q=85',
      'https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?w=1000&auto=format&fit=crop&q=85'
    ],
    videoClip: {
      title: 'Insane Water-Beading & Angle Sheet Test on Deep Black Bonnet',
      duration: '0:30',
      thumbnail: 'https://images.unsplash.com/photo-1607860108855-64acf2078ed9?w=800&auto=format&fit=crop&q=80',
      description: 'Watch high-pressure water beads literally roll off like mercury beads on a treated hood, leaving zero standing water.'
    },
    inTheBox: [
      '1x Meguiar\'s Hybrid Ceramic Liquid Wax (473ml Bottle)',
      '1x Premium Ergonomic Foam Applicator Pad',
      '1x Ultra-plush 800 GSM Edgeless Microfiber Buffing Towel'
    ]
  }
];

// Product Category Filters
export const PART_CATEGORIES = [
  { id: 'all', label: 'All Spare Parts' },
  { id: 'engine-oils', label: 'DPF & Engine Chemistry' },
  { id: 'brakes', label: 'Braking Systems' },
  { id: 'lighting', label: 'LED Headlights' },
  { id: 'filters', label: 'Air & Cabin Filters' },
  { id: 'detailing', label: 'Glaze & Detailing' }
];
