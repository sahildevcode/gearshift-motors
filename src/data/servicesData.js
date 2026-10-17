// Detailed services list for car repair workshop
export const WORKSHOP_SERVICES = [
  {
    id: 'periodic',
    title: 'Periodic Maintenance & Oil Change',
    titleHi: 'नियमित कार सर्विस & ऑयल चेंज',
    tagline: 'Preserve Engine Longevity & Peak Fuel Economy',
    icon: 'Wrench',
    priceStarting: '₹2,199',
    avgTime: '90 Mins',
    color: 'from-amber-500/20 to-orange-500/10',
    borderColor: 'border-amber-500/30',
    accentColor: '#f59e0b',
    includes: [
      '100% Fully Synthetic Engine Oil Replacement',
      'OEM Oil & Fuel Filter Replacement',
      '40-Point Electronic & Mechanical Inspection',
      'Brake Dust Cleaning & Fluid Top-Up',
      'Foam Spa Wash with Interior Vacuuming'
    ],
    symptomsAddressed: [
      'Engine feels sluggish or noisy',
      'Drop in mileage/fuel efficiency',
      'Odometer crossed 10,000 KM since last service',
      'Oil dipstick shows dark black gritty oil'
    ]
  },
  {
    id: 'denting-painting',
    title: 'Denting, Painting & Scratch Repair',
    titleHi: 'डेंटिंग, पेंटिंग & स्क्रैच रिपेयर',
    tagline: 'Dust-Free German Spray Booth with Exact Computer Match',
    icon: 'Flame',
    priceStarting: '₹1,499 / panel',
    avgTime: 'Same Day - 24 Hours',
    color: 'from-rose-500/20 to-red-500/10',
    borderColor: 'border-rose-500/30',
    accentColor: '#f43f5e',
    includes: [
      'Pinpoint Paintless Dent Removal (PDR)',
      'DuPont / PPG Paint with 100% Color Shade Match',
      'Undercoat Epoxy Anti-Rust Primer',
      'Dust-Free Temperature Controlled Spray Booth',
      '2-Year Paint Peel-Off & Gloss Warranty'
    ],
    symptomsAddressed: [
      'Bumper scratches and fender scrapes',
      'Deep door panel dents from minor fender-benders',
      'Sun-faded clear coat and oxidized paint',
      'Cashless insurance claims assistance for accidents'
    ]
  },
  {
    id: 'ac-electrical',
    title: 'Super Chill AC & Electrical Lab',
    titleHi: 'कार एसी रिपेयर & गैस रिफिलिंग',
    tagline: 'Instant Arctic Sub-6°C Cabin Chilling',
    icon: 'Snowflake',
    priceStarting: '₹1,999',
    avgTime: '2 Hours',
    color: 'from-cyan-500/20 to-blue-500/10',
    borderColor: 'border-cyan-500/30',
    accentColor: '#06b6d4',
    includes: [
      'AC Refrigerant Gas (R134a) Machine Evacuation & Fill',
      'Compressor Oil & PAG Lubrication Top-Up',
      'Condenser & Cooling Coil Pressure Jet Wash',
      'Anti-Bacterial Ozone Odor Disinfection',
      'High-Pressure Nitrogen Leak Diagnostic'
    ],
    symptomsAddressed: [
      'AC blowing warm or humid air',
      'Foul sour musty smell when AC turns on',
      'Hissing or rattling noise from compressor pulley',
      'Weak air flow through vents'
    ]
  },
  {
    id: 'engine-transmission',
    title: 'Engine Diagnostic & Gearbox Overhaul',
    titleHi: 'इंजन डायग्नोस्टिक्स & गियरबॉक्स ओवरहॉल',
    tagline: 'OBD-II Computerized Scanning & Transmission Rebuild',
    icon: 'Cpu',
    priceStarting: '₹4,499',
    avgTime: '4 - 8 Hours',
    color: 'from-purple-500/20 to-indigo-500/10',
    borderColor: 'border-purple-500/30',
    accentColor: '#a855f7',
    includes: [
      'Bosch Computerized Scan for DTC Error Codes',
      'ECU / ECM Live Sensor Parameter Verification',
      'Clutch Plate, Flywheel & Pressure Plate Replacement',
      'Timing Belt / Chain Tensioner Calibration',
      'Cylinder Head Gasket & Valve Seal Overhaul'
    ],
    symptomsAddressed: [
      'Check Engine Light or EPC Warning illuminated',
      'Hard gear shifting, clutch slipping or juddering',
      'Excessive white or black smoke from exhaust',
      'Engine overheating or coolant loss'
    ]
  },
  {
    id: 'brakes-suspension',
    title: 'Precision Brakes & Suspension Tuning',
    titleHi: 'सस्पेंशन & डिस्क ब्रेक रिपेयर',
    tagline: 'Zero Noise, Gliding Comfort & Instant Stopping Power',
    icon: 'ShieldAlert',
    priceStarting: '₹1,899',
    avgTime: '2 Hours',
    color: 'from-emerald-500/20 to-teal-500/10',
    borderColor: 'border-emerald-500/30',
    accentColor: '#10b981',
    includes: [
      'Front & Rear Ceramic Disc Pads Inspection & Fitment',
      'High-Precision Disc Rotor Skimming on Computer Lathe',
      'Shock Absorber, Strut & Coil Spring Replacement',
      'Bushing, Lower Arm, Tie Rod End & Ball Joint Check',
      'ABS Speed Sensor Verification & Brake Bleeding'
    ],
    symptomsAddressed: [
      'High-pitched squealing or metal grinding on braking',
      'Steering wheel vibrates when applying brakes at high speed',
      'Thudding / clunking noise when driving over potholes',
      'Car drifting or bottoming out on speed bumps'
    ]
  },
  {
    id: 'tyres-wheel',
    title: '3D Laser Wheel Alignment & Balancing',
    titleHi: '3D व्हील अलाइनमेंट & टायर केयर',
    tagline: 'Laser Precision Camber, Caster & Toe Angle Tuning',
    icon: 'Disc',
    priceStarting: '₹499',
    avgTime: '45 Mins',
    color: 'from-sky-500/20 to-blue-500/10',
    borderColor: 'border-sky-500/30',
    accentColor: '#0ea5e9',
    includes: [
      'High-Def 4-Camera Laser Sensor 3D Wheel Alignment',
      'Digital Dynamic Wheel Weight Balancing',
      'Pure Dry Nitrogen Tyre Inflation (32 PSI)',
      'Tyre Tread Depth & Uneven Wear Analysis',
      'Rim Bend Inspection'
    ],
    symptomsAddressed: [
      'Car pulling automatically to left or right on straight road',
      'Steering vibration felt at 70-100 km/h speeds',
      'Rapid uneven tyre shoulder wear',
      'Heavy or non-centering steering feel'
    ]
  },
  {
    id: 'ceramic-detailing',
    title: '9H Ceramic Coating, PPF & Car Spa',
    titleHi: 'सिरेमिक कोटिंग & लग्जरी कार स्पा',
    tagline: 'Extreme Hydrophobic Water Beading & Deep Mirror Shine',
    icon: 'Sparkles',
    priceStarting: '₹8,999',
    avgTime: '1 - 2 Days',
    color: 'from-yellow-500/20 to-amber-500/10',
    borderColor: 'border-yellow-500/30',
    accentColor: '#eab308',
    includes: [
      '3-Step Machine Paint Correction (Removes 95% Swirls)',
      'Japanese / German 9H Quartz Ceramic Coating',
      'Hydrophobic Rain Repellent on All Window Glasses',
      'Interior Deep Steam Sanitization & Leather Feed',
      'High-Gloss Alloy Wheel Barrier Layer'
    ],
    symptomsAddressed: [
      'Dull, hazy paint full of swirl marks and spiderweb scratches',
      'Water spots and bird drop etching on car body',
      'Stained leather or fabric seats with lingering odors',
      'Desire for enduring showroom glass finish'
    ]
  },
  {
    id: 'roadside-sos',
    title: '24/7 Roadside Rescue & On-Site Mobile Van',
    titleHi: '24/7 रोडसाइड असिस्टेंस & इमरजेंसी टोइंग',
    tagline: 'Mechanic at Your Location within 30 Minutes',
    icon: 'Radio',
    priceStarting: '₹799',
    avgTime: '30 Mins Arrival',
    color: 'from-red-600/30 to-rose-600/10',
    borderColor: 'border-red-500/50',
    accentColor: '#ef4444',
    includes: [
      'Instant Emergency Battery Jump-Start (Heavy-Duty Boost)',
      'Puncture Repair & Stepney Tyre Swap at Location',
      'Flatbed Hydraulic Tow Truck Service to Workshop',
      'Emergency Fuel Delivery (Petrol / Diesel 5L)',
      'Key Lockout & Minor On-Road Mechanical Assistance'
    ],
    symptomsAddressed: [
      'Car won\'t crank, dead battery click sounds',
      'Puncture on highway with no spare tyre or jack',
      'Overheated engine stalled in heavy traffic',
      'Accident or breakdown requiring safe flatbed towing'
    ]
  }
];

export const DIAGNOSTIC_SYMPTOMS = [
  {
    id: 'brake_squeal',
    title: 'Squealing / Grinding sound when braking',
    titleHi: 'ब्रेक दबाने पर चीखने या रगड़ने की आवाज',
    part: 'Brakes',
    urgency: 'High',
    urgencyColor: 'text-red-400 bg-red-950/60 border-red-800',
    cameraTarget: { x: -1.4, y: 0.3, z: 1.2 },
    cause: 'Brake pads worn down to metal indicator pins; scored disc rotor surface.',
    solution: 'Install new ceramic brake pads, skim disc rotors, grease caliper slides.',
    estimatedCost: '₹1,899 - ₹2,999',
    timeRequired: '90 Mins'
  },
  {
    id: 'warm_ac',
    title: 'AC is blowing warm or stale air',
    titleHi: 'एसी ठंडा नहीं कर रहा, केवल गर्म हवा आ रही है',
    part: 'AC & Cooling',
    urgency: 'Medium',
    urgencyColor: 'text-amber-400 bg-amber-950/60 border-amber-800',
    cameraTarget: { x: 0, y: 0.5, z: 1.5 },
    cause: 'Low refrigerant gas pressure from micro-leakage, clogged cabin filter or blocked condenser.',
    solution: 'Pressure leak test, R134a pure gas refill, chemical foam clean of condenser coil.',
    estimatedCost: '₹1,999 - ₹2,799',
    timeRequired: '2 Hours'
  },
  {
    id: 'engine_vibe',
    title: 'Car vibrating at high speed (70-100 km/h)',
    titleHi: 'हाई स्पीड पर कार और स्टीयरिंग का कांपना',
    part: 'Suspension & Tyres',
    urgency: 'Medium',
    urgencyColor: 'text-amber-400 bg-amber-950/60 border-amber-800',
    cameraTarget: { x: 1.4, y: 0.3, z: 1.2 },
    cause: 'Wheel weights fell off causing dynamic imbalance, or bent alloy wheel rim.',
    solution: 'High-speed computerized 4-wheel dynamic balancing and 3D laser alignment.',
    estimatedCost: '₹599 - ₹999',
    timeRequired: '45 Mins'
  },
  {
    id: 'check_engine',
    title: 'Check Engine Warning light illuminated',
    titleHi: 'मीटर में चेक इंजन लाइट (पीली बत्ती) जल रही है',
    part: 'Engine & Sensors',
    urgency: 'Critical',
    urgencyColor: 'text-red-400 bg-red-950/60 border-red-800',
    cameraTarget: { x: 0, y: 0.6, z: 1.4 },
    cause: 'O2 sensor fault, misfiring spark plug, faulty MAF sensor, or catalytic converter blockage.',
    solution: 'OBD-II digital diagnostic scanner hookup, read live trouble code, sensor replacement.',
    estimatedCost: '₹499 (Scan) + Part Cost',
    timeRequired: '30 Mins (Diagnostic)'
  },
  {
    id: 'dead_battery',
    title: 'Engine clicking, won\'t start in morning',
    titleHi: 'सुबह कार स्टार्ट नहीं हो रही, सिर्फ टिक-टिक आवाज',
    part: 'Battery & Starter',
    urgency: 'High',
    urgencyColor: 'text-red-400 bg-red-950/60 border-red-800',
    cameraTarget: { x: -0.8, y: 0.7, z: 1.2 },
    cause: 'Dead battery cells, sulfated terminals, or alternator failing to charge battery.',
    solution: 'CCA battery load test, terminal cleaning, on-spot jump start or new Exide/Amaron battery.',
    estimatedCost: '₹799 (Jump) / ₹3,999+ (New)',
    timeRequired: '30 Mins'
  }
];

export const WORKSHOP_STATS = [
  { value: '18,500+', label: 'Cars Repaired & Serviced', labelHi: 'कार्स की सफल रिपेयरिंग' },
  { value: '4.9 ★', label: 'Average Google Rating (3,400+ reviews)', labelHi: 'गूगल रेटिंग (3400+ समीक्षाएं)' },
  { value: '100%', label: 'Genuine OEM / OES Spare Parts', labelHi: '100% असली ओरिजिनल पार्ट्स' },
  { value: '30 Min', label: 'Roadside Assistance Emergency Dispatch', labelHi: 'रोडसाइड असिस्टेंस डिस्पैच' }
];
