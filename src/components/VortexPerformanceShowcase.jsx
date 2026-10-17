import React, { useState, useEffect, useRef } from 'react';
import { Play, ArrowRight, Download, CheckCircle2, Phone, Mail, ChevronRight } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

export default function VortexPerformanceShowcase({ currentLanguage = 'en', onOpenBooking, onOpenBrandsPage }) {
  const [activeTelemetryTab, setActiveTelemetryTab] = useState('SPEED');
  const [activeAeroSpeed, setActiveAeroSpeed] = useState(150);
  const [isFilmOpen, setIsFilmOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const canvasRef = useRef(null);
  const aeroCanvasRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Inquiry Form State
  const [inquiryForm, setInquiryForm] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: 'Track Day & Performance Overhaul',
    details: ''
  });
  const [inquirySubmitted, setInquirySubmitted] = useState(false);

  const TELEMETRY_TABS = ['SPEED', 'G FORCE', 'THROTTLE', 'BRAKE', 'RPM', 'TEMPERATURE'];

  // 1. Live Interactive Waveform Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationId;
    let offset = 0;

    const renderGraph = () => {
      const w = canvas.width = canvas.parentElement.clientWidth;
      const h = canvas.height = 200;

      ctx.clearRect(0, 0, w, h);

      // Clean Sub-Grid lines
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
      ctx.lineWidth = 1;
      for (let x = 0; x < w; x += 40) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }
      for (let y = 0; y < h; y += 40) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      // Smooth Telemetry Waveform Curve
      ctx.beginPath();
      ctx.strokeStyle = '#f97316'; // Vibrant motorsport orange
      ctx.lineWidth = 2.5;

      const points = [];
      const step = 6;
      const freq = activeTelemetryTab === 'RPM' ? 0.045 : activeTelemetryTab === 'BRAKE' ? 0.022 : 0.032;
      const amp = activeTelemetryTab === 'G FORCE' ? 32 : 52;

      for (let x = 0; x <= w; x += step) {
        const y = h / 2 + Math.sin((x + offset) * freq) * amp + Math.cos(x * 0.012) * (amp * 0.35);
        points.push({ x, y });
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Translucent Orange Under-Gradient
      ctx.lineTo(w, h);
      ctx.lineTo(0, h);
      ctx.closePath();
      const grad = ctx.createLinearGradient(0, 0, 0, h);
      grad.addColorStop(0, 'rgba(249, 115, 22, 0.22)');
      grad.addColorStop(1, 'rgba(249, 115, 22, 0.0)');
      ctx.fillStyle = grad;
      ctx.fill();

      // Peak Indicator dot
      if (points.length > 0) {
        const peak = points[Math.floor(points.length * 0.72)];
        ctx.beginPath();
        ctx.arc(peak.x, peak.y, 4.5, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.fill();
        ctx.strokeStyle = '#f97316';
        ctx.lineWidth = 2.5;
        ctx.stroke();
      }

      offset += 1.4;
      animationId = requestAnimationFrame(renderGraph);
    };

    renderGraph();
    return () => cancelAnimationFrame(animationId);
  }, [activeTelemetryTab]);

  // 2. High-Precision Wind Tunnel Aerodynamic Streamlines Animation (Replaces the boat dashes)
  useEffect(() => {
    const canvas = aeroCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;
    let time = 0;

    // Define 7 smooth continuous aerodynamic streamlines following the car profile
    const renderWindTunnel = () => {
      const w = canvas.width = canvas.parentElement.clientWidth;
      const h = canvas.height = 240;

      ctx.clearRect(0, 0, w, h);

      // Base wind tunnel flow lines
      const streamLines = [
        { baseY: 45, curveAmp: 25, startX: 0 },
        { baseY: 75, curveAmp: 35, startX: 30 },
        { baseY: 105, curveAmp: 42, startX: 10 },
        { baseY: 135, curveAmp: 38, startX: 50 },
        { baseY: 165, curveAmp: 28, startX: 20 },
        { baseY: 195, curveAmp: 18, startX: 40 },
      ];

      streamLines.forEach((line, index) => {
        ctx.beginPath();
        const speed = (activeAeroSpeed / 100) * 8;
        const lineOffset = (time * speed + line.startX * 4) % w;

        // Draw flowing aerodynamic curve over vehicle
        for (let x = 0; x <= w; x += 10) {
          // Curvature mimicking sports car roofline: rise over hood (x: 200-400), peak at cockpit (400-550), drop to rear wing (550-700)
          let y = line.baseY;
          if (x > 180 && x < 420) {
            // Hood & Windshield rise
            y -= Math.sin(((x - 180) / 240) * Math.PI) * line.curveAmp;
          } else if (x >= 420 && x < 680) {
            // Roof & Rear Spoiler downforce compression
            y -= Math.cos(((x - 420) / 260) * Math.PI) * (line.curveAmp * 0.85);
          }

          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }

        // Animated neon dash
        ctx.strokeStyle = `rgba(249, 115, 22, ${0.18 + (index % 3) * 0.12})`;
        ctx.lineWidth = 1.6;
        ctx.stroke();

        // Glowing Flow Tracer Bullet
        const tracerX = lineOffset;
        let tracerY = line.baseY;
        if (tracerX > 180 && tracerX < 420) {
          tracerY -= Math.sin(((tracerX - 180) / 240) * Math.PI) * line.curveAmp;
        } else if (tracerX >= 420 && tracerX < 680) {
          tracerY -= Math.cos(((tracerX - 420) / 260) * Math.PI) * (line.curveAmp * 0.85);
        }

        // Draw glowing tracer particle
        const particleGrad = ctx.createRadialGradient(tracerX, tracerY, 0, tracerX, tracerY, 18);
        particleGrad.addColorStop(0, 'rgba(255, 255, 255, 0.95)');
        particleGrad.addColorStop(0.3, 'rgba(249, 115, 22, 0.8)');
        particleGrad.addColorStop(1, 'rgba(249, 115, 22, 0)');
        ctx.fillStyle = particleGrad;
        ctx.beginPath();
        ctx.arc(tracerX, tracerY, 18, 0, Math.PI * 2);
        ctx.fill();
      });

      time += 0.8;
      animId = requestAnimationFrame(renderWindTunnel);
    };

    renderWindTunnel();
    return () => cancelAnimationFrame(animId);
  }, [activeAeroSpeed]);

  const FEATURED_BUILDS = [
    {
      id: 'gt-r',
      name: 'VORTEX GT-R',
      tag: 'TRACK WEAPON',
      hp: '820 HP',
      weight: '1,250 KG',
      spec: 'FIA HOMOLOGATED',
      image: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?w=800&auto=format&fit=crop&q=85',
      desc: 'Purpose-built carbon widebody for sprint race domination and surgical apex cornering.'
    },
    {
      id: 'gt3x',
      name: 'VORTEX GT3X',
      tag: 'ENDURANCE READY',
      hp: '750 HP',
      weight: '1,280 KG',
      spec: '24H TESTED',
      image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&auto=format&fit=crop&q=85',
      desc: 'Reinforced cooling jackets and dry-sump lubrication calibrated for brutal 24-hour endurance.'
    },
    {
      id: 'cs',
      name: 'VORTEX CS',
      tag: 'CLUBSPORT',
      hp: '600 HP',
      weight: '1,150 KG',
      spec: 'TRACK FOCUSED',
      image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&auto=format&fit=crop&q=85',
      desc: 'The ultimate gentleman driver track-day machine with street legality and surgical precision.'
    }
  ];

  const DRIVER_REVIEWS = [
    {
      name: 'MARCUS HOLLOWAY',
      title: 'PROFESSIONAL DRIVER',
      quote: 'The balance, the grip, the confidence — this car lets me push harder, lap after lap.',
      img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80'
    },
    {
      name: 'LIAM O’CONNOR',
      title: 'ENDURANCE CHAMPION',
      quote: 'Every detail is track-focused. You can feel the precision engineering in every corner entry.',
      img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80'
    },
    {
      name: 'ALEX RIVERA',
      title: 'GT3 DRIVER',
      quote: 'Fast out of the box. Built to win straight out of the garage. Unbelievable brake stability.',
      img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80'
    }
  ];

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setInquirySubmitted(true);
    if (onOpenBooking) onOpenBooking(inquiryForm);
  };

  return (
    <div className="relative bg-[#000000] text-white selection:bg-orange-500 selection:text-black">
      
      {/* ============================================================== */}
      {/* 1. HERO SECTION (BUILT FOR LAP TIMES. ENGINEERED TO WIN.) */}
      {/* Full-bleed background image layout */}
      {/* ============================================================== */}
      <section id="hero" className="relative min-h-screen flex flex-col justify-between pt-28 sm:pt-32 pb-10 overflow-hidden w-full">
        
        {/* Full-Bleed Background Image (Supercar) with Parallax Scroll */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=2200&auto=format&fit=crop&q=90"
            alt="Vortex Track Supercar"
            style={{ transform: `translateY(${Math.min(scrollY * 0.35, 260)}px) scale(1.06)` }}
            className="w-full h-full object-cover object-[75%_center] md:object-right-center lg:object-center brightness-[0.70] contrast-[1.15] will-change-transform transition-transform duration-75 ease-out"
          />
          {/* Deep Dark Motorsport Vignettes for 100% Typography Legibility */}
          {/* Left-to-right pitch black gradient for text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/85 md:via-black/70 to-black/30" />
          {/* Top-to-bottom gradient for seamless transparent navbar and footer blend */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/80" />
          {/* Ambient orange glow in background */}
          <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-orange-600/10 blur-[150px] rounded-full" />
        </div>

        {/* Hero Content Container */}
        <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-8 lg:px-12 flex-1 flex flex-col justify-between">
          
          {/* Main Headline & Description */}
          <ScrollReveal animation="fade-up" duration={900} className="max-w-2xl space-y-6 text-left py-4">
            <h1 className="font-syncopate text-4xl sm:text-6xl lg:text-7xl font-bold uppercase tracking-tight leading-[1.03] text-white drop-shadow-2xl">
              BUILT FOR <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-amber-400 to-yellow-500">
                LAP TIMES.
              </span> <br />
              ENGINEERED <br />
              TO WIN.
            </h1>

            <p className="font-space text-slate-300 text-xs sm:text-sm tracking-wide leading-relaxed max-w-lg drop-shadow">
              Track-focused machines. Zero compromises. Every component. Every detail. Every lap. Precision maintenance and race-grade engine overhauls.
            </p>

            {/* Dual Buttons (EXPLORE BUILDS & WATCH FILM) */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#builds"
                className="py-3.5 px-8 rounded-sm bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-500 hover:to-orange-400 text-black font-rajdhani font-black text-xs uppercase tracking-widest shadow-xl shadow-orange-600/30 hover:scale-105 transition-all flex items-center gap-2"
              >
                <span>EXPLORE BUILDS</span>
                <ArrowRight className="w-3.5 h-3.5 stroke-[3]" />
              </a>

              <button
                onClick={() => setIsFilmOpen(true)}
                className="py-3.5 px-6 rounded-sm bg-black/60 backdrop-blur-md border border-white/20 hover:border-white text-white font-rajdhani font-bold text-xs uppercase tracking-widest hover:bg-white/10 transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>WATCH FILM</span>
                <Play className="w-3.5 h-3.5 fill-white" />
              </button>
            </div>

            {/* Quick Car Brands & Pricing Access Button */}
            <div className="pt-4 max-w-lg">
              <button
                onClick={onOpenBrandsPage}
                className="w-full p-3.5 sm:p-4 rounded-xl bg-black/70 hover:bg-black/90 backdrop-blur-xl border border-white/15 hover:border-orange-500/60 flex items-center justify-between text-left transition-all cursor-pointer group/btn shadow-2xl"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🚗</span>
                  <div>
                    <span className="font-mono-tech text-xs font-bold text-white group-hover/btn:text-orange-400 block tracking-wide">
                      CHECK CAR BRAND SERVICE & PRICING
                    </span>
                    <span className="font-space text-[11px] text-slate-400">
                      Maruti, Hyundai, Tata, Mahindra, Toyota, BMW, Mercedes rates &rarr;
                    </span>
                  </div>
                </div>
                <div className="w-8 h-8 rounded-full bg-orange-500 text-black flex items-center justify-center font-bold flex-shrink-0 group-hover/btn:scale-110 transition-transform">
                  <ArrowRight className="w-4 h-4 stroke-[3]" />
                </div>
              </button>
            </div>

          </ScrollReveal>

          {/* HUD Telemetry Metric Ticker Bar (Placed on bottom with dark glassmorphic styling) */}
          <ScrollReveal animation="fade-up" delay={200} duration={800} className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 pt-8 border-t border-white/15 mt-8 font-mono-tech">
            
            <div className="flex items-center gap-3 p-3.5 rounded-sm bg-black/70 backdrop-blur-md border border-white/10 hover:border-orange-500/40 transition-colors">
              <span className="text-orange-500 text-lg">⏱</span>
              <div>
                <div className="text-base sm:text-lg font-black text-white">01:37.542</div>
                <div className="text-[10px] uppercase text-slate-400">LAP TIME</div>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3.5 rounded-sm bg-black/70 backdrop-blur-md border border-white/10 hover:border-orange-500/40 transition-colors">
              <span className="text-orange-500 text-lg">⚡</span>
              <div>
                <div className="text-base sm:text-lg font-black text-white">168 MPH</div>
                <div className="text-[10px] uppercase text-slate-400">MAX SPEED</div>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3.5 rounded-sm bg-black/70 backdrop-blur-md border border-white/10 hover:border-orange-500/40 transition-colors">
              <span className="text-orange-500 text-lg">🎯</span>
              <div>
                <div className="text-base sm:text-lg font-black text-white">1.45G</div>
                <div className="text-[10px] uppercase text-slate-400">LATERAL G</div>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3.5 rounded-sm bg-black/70 backdrop-blur-md border border-white/10 hover:border-orange-500/40 transition-colors">
              <span className="text-orange-500 text-lg">🔥</span>
              <div>
                <div className="text-base sm:text-lg font-black text-white">820 HP</div>
                <div className="text-[10px] uppercase text-slate-400">DYNO POWER</div>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3.5 rounded-sm bg-black/70 backdrop-blur-md border border-white/10 hover:border-orange-500/40 transition-colors col-span-2 sm:col-span-1">
              <span className="text-orange-500 text-lg">📊</span>
              <div>
                <div className="text-base sm:text-lg font-black text-white">6,900 RPM</div>
                <div className="text-[10px] uppercase text-slate-400">REDLINE PEAK</div>
              </div>
            </div>

          </ScrollReveal>

        </div>

      </section>

      {/* ============================================================== */}
      {/* 2. BUILDS: FEATURED BUILDS GRID (Matches Navbar item #2) */}
      {/* ============================================================== */}
      <section id="builds" className="py-20 px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto border-t border-white/5">
        <ScrollReveal animation="fade-up" duration={800} className="mb-10">
          <span className="font-mono-tech text-[10px] uppercase text-orange-500 tracking-widest block mb-1">
            FEATURED BUILDS & PERFORMANCE PACKAGES
          </span>
          <h2 className="font-syncopate text-2xl sm:text-3xl font-bold uppercase text-white tracking-tight">
            MOTORSPORT WEAPONS
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {FEATURED_BUILDS.map((build, index) => (
            <ScrollReveal
              key={build.id}
              animation="fade-up"
              delay={index * 150}
              duration={850}
              className="h-full"
            >
              <div className="group h-full rounded-xl bg-[#090b0e] border border-white/10 overflow-hidden shadow-2xl flex flex-col justify-between hover:border-orange-500/60 hover:shadow-[0_0_30px_rgba(249,115,22,0.22)] transition-all duration-300">
                <div>
                  <div className="p-5 pb-3">
                    <h3 className="font-syncopate text-lg font-bold uppercase text-white tracking-wide">
                      {build.name}
                    </h3>
                    <span className="font-mono-tech text-[10px] uppercase text-orange-400 tracking-wider">
                      {build.tag}
                    </span>
                  </div>

                  <div className="relative h-44 overflow-hidden">
                    <img
                      src={build.image}
                      alt={build.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#090b0e] via-transparent to-transparent pointer-events-none" />
                  </div>

                  <div className="grid grid-cols-3 gap-2 px-5 py-3 text-center border-t border-b border-white/5 font-mono-tech text-[11px]">
                    <div>
                      <div className="font-bold text-white">{build.hp}</div>
                      <div className="text-[9px] text-slate-500">POWER</div>
                    </div>
                    <div>
                      <div className="font-bold text-white">{build.weight}</div>
                      <div className="text-[9px] text-slate-500">WEIGHT</div>
                    </div>
                    <div>
                      <div className="font-bold text-orange-400">{build.spec}</div>
                      <div className="text-[9px] text-slate-500">CLASS</div>
                    </div>
                  </div>

                  <p className="font-space px-5 py-3 text-xs text-slate-400 leading-relaxed">
                    {build.desc}
                  </p>
                </div>

                {/* Orange Bottom Button (Exact match from screenshot) */}
                <a
                  href="#inquiry"
                  className="w-full py-3.5 px-4 bg-orange-600 hover:bg-orange-500 text-black font-rajdhani font-black text-xs uppercase tracking-widest transition-colors cursor-pointer text-center block"
                >
                  VIEW BUILD &bull; INQUIRE
                </a>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ============================================================== */}
      {/* 3. PERFORMANCE: REAL DATA. REAL RESULTS. (Matches Navbar item #3) */}
      {/* ============================================================== */}
      <section id="telemetry" className="py-20 px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto border-t border-white/5">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          <ScrollReveal animation="slide-left" duration={850} className="lg:col-span-4 space-y-4">
            <span className="font-mono-tech text-[10px] uppercase text-orange-500 tracking-widest block">
              PERFORMANCE TELEMETRY
            </span>
            <h2 className="font-syncopate text-3xl sm:text-4xl font-bold uppercase text-white tracking-tight">
              REAL DATA. <br />
              REAL RESULTS.
            </h2>
            <p className="font-space text-slate-400 text-xs sm:text-sm leading-relaxed">
              Our systems don't just perform on paper. They perform where it matters — on track, dyno ramps, and real-world asphalt.
            </p>
            <a
              href="#inquiry"
              className="font-mono-tech text-xs uppercase tracking-wider text-orange-400 hover:text-white flex items-center gap-1.5 pt-2 transition-colors cursor-pointer"
            >
              <span>VIEW FULL DATA LOGS</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </ScrollReveal>

          <ScrollReveal animation="slide-right" duration={850} className="lg:col-span-8 p-6 rounded-xl bg-[#090b0e] border border-white/10 shadow-2xl hover:border-orange-500/40 transition-colors">
            {/* Telemetry Mode Tabs */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-white/10 mb-4 font-mono-tech">
              <div className="flex flex-wrap gap-1.5">
                {TELEMETRY_TABS.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTelemetryTab(tab)}
                    className={`px-3.5 py-1.5 rounded-sm text-[11px] font-bold tracking-wider transition-all cursor-pointer ${
                      activeTelemetryTab === tab
                        ? 'bg-orange-500 text-black shadow-md'
                        : 'text-slate-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              <div className="text-right text-[11px]">
                <span className="text-slate-500 block">BEST LAP: <strong className="text-orange-400 font-bold">01:37.542</strong></span>
                <span className="text-slate-500 text-[10px]">CIRCUIT OF THE AMERICAS &bull; 92°F / DRY</span>
              </div>
            </div>

            {/* Live Canvas Graph */}
            <div className="relative w-full h-[200px] overflow-hidden rounded-sm">
              <canvas ref={canvasRef} className="w-full h-full block" />
            </div>
          </ScrollReveal>

        </div>
      </section>

      {/* ============================================================== */}
      {/* 4. SPECIFICATIONS & ENGINE SECTION */}
      {/* ============================================================== */}
      <section id="engineering" className="py-20 px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto border-t border-white/5">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Dyno Table */}
          <ScrollReveal animation="slide-left" duration={850} className="lg:col-span-5 p-6 rounded-xl bg-[#090b0e] border border-white/10 shadow-2xl hover:border-orange-500/40 transition-colors">
            <span className="font-mono-tech text-[10px] uppercase text-orange-500 tracking-widest block mb-4">
              SPECIFICATIONS & DYNO DATA
            </span>

            <div className="space-y-3 font-mono-tech text-xs">
              <div className="flex justify-between py-1.5 border-b border-white/5">
                <span className="text-slate-500">ENGINE</span>
                <span className="text-white font-bold">4.0L Twin-Turbo V8</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-white/5">
                <span className="text-slate-500">POWER</span>
                <span className="text-orange-400 font-bold">820 HP @ 6,900 RPM</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-white/5">
                <span className="text-slate-500">TORQUE</span>
                <span className="text-white font-bold">780 Nm @ 5,500 RPM</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-white/5">
                <span className="text-slate-500">WEIGHT</span>
                <span className="text-white font-bold">1,250 KG</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-white/5">
                <span className="text-slate-500">DRIVETRAIN</span>
                <span className="text-white font-bold">RWD Track Spec</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-white/5">
                <span className="text-slate-500">TRANSMISSION</span>
                <span className="text-white font-bold">6-Speed Sequential</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-white/5">
                <span className="text-slate-500">0-100 KM/H</span>
                <span className="text-orange-400 font-bold">2.7 SECONDS</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-slate-500">TOP SPEED</span>
                <span className="text-white font-bold">188 MPH (302 KM/H)</span>
              </div>
            </div>

            <button
              onClick={() => alert('VORTEX Engine Dyno Calibration Sheet Downloaded (PDF)!')}
              className="w-full mt-6 py-3 px-4 rounded-sm bg-white/5 hover:bg-white/10 border border-white/10 text-white font-rajdhani font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-orange-400" />
              <span>DOWNLOAD SPEC SHEET</span>
            </button>
          </ScrollReveal>

          {/* Right Engineered For Advantage */}
          <ScrollReveal animation="slide-right" duration={850} className="lg:col-span-7 space-y-6">
            <h2 className="font-syncopate text-3xl sm:text-4xl font-bold uppercase text-white tracking-tight">
              ENGINEERED <br />
              <span className="text-orange-500">FOR ADVANTAGE</span>
            </h2>

            <p className="font-space text-slate-400 text-xs sm:text-sm leading-relaxed max-w-lg">
              From CFD-optimized aero to motorsport-grade suspension, every element is engineered to deliver surgical speed, lateral stability, and unyielding driver confidence.
            </p>

            {/* Custom Clean Vector Icons */}
            <div className="grid grid-cols-3 gap-4 pt-4">
              <div className="p-4 rounded-xl bg-[#090b0e] border border-white/5 text-center hover:border-orange-500/50 hover:scale-105 transition-all">
                <svg viewBox="0 0 48 48" className="w-7 h-7 mx-auto mb-2 text-orange-500" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M6 16C16 16 22 28 42 28M6 24C14 24 20 32 42 32M6 32C18 32 24 20 42 20" strokeLinecap="round" />
                </svg>
                <span className="font-mono-tech text-[10px] font-bold text-white block uppercase">CFD AERODYNAMICS</span>
                <span className="font-mono-tech text-[9px] text-slate-500">Wind-Tunnel Verified</span>
              </div>

              <div className="p-4 rounded-xl bg-[#090b0e] border border-white/5 text-center hover:border-orange-500/50 hover:scale-105 transition-all">
                <svg viewBox="0 0 48 48" className="w-7 h-7 mx-auto mb-2 text-orange-500" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <rect x="20" y="6" width="8" height="36" rx="2" />
                  <path d="M14 14C24 10 24 20 34 16M14 24C24 20 24 30 34 26M14 34C24 30 24 40 34 36" strokeLinecap="round" />
                </svg>
                <span className="font-mono-tech text-[10px] font-bold text-white block uppercase">MOTORSPORT SUSPENSION</span>
                <span className="font-mono-tech text-[9px] text-slate-500">Active Dynamic Damping</span>
              </div>

              <div className="p-4 rounded-xl bg-[#090b0e] border border-white/5 text-center hover:border-orange-500/50 hover:scale-105 transition-all">
                <svg viewBox="0 0 48 48" className="w-7 h-7 mx-auto mb-2 text-orange-500" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polygon points="24,6 40,16 40,32 24,42 8,32 8,16" />
                  <line x1="24" y1="6" x2="24" y2="42" />
                  <line x1="8" y1="16" x2="40" y2="32" />
                </svg>
                <span className="font-mono-tech text-[10px] font-bold text-white block uppercase">CARBON FIBER CHASSIS</span>
                <span className="font-mono-tech text-[9px] text-slate-500">Peak Torque Rigidity</span>
              </div>
            </div>
          </ScrollReveal>

        </div>
      </section>

      {/* ============================================================== */}
      {/* 5. AERO BY DESIGN / DOWNFORCE (Clean Studio Car & CFD Streamlines) */}
      {/* ============================================================== */}
      <section id="aerodynamics" className="py-20 px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto border-t border-white/5">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <ScrollReveal animation="slide-left" duration={850} className="lg:col-span-4 space-y-3">
            <span className="font-mono-tech text-[10px] uppercase text-orange-500 tracking-widest block">
              AERO BY DESIGN
            </span>
            <h2 className="font-syncopate text-3xl font-bold uppercase text-white tracking-tight">
              DOWNFORCE. <br />
              WHERE IT COUNTS.
            </h2>
            <p className="font-space text-slate-400 text-xs sm:text-sm leading-relaxed">
              Every curve, vent, and surface is shaped by telemetry. More grip. More stability. Faster corner exit speeds.
            </p>

            <div className="pt-2 font-mono-tech">
              <span className="text-[11px] text-slate-400 block mb-1">
                WIND TUNNEL SPEED: <strong className="text-orange-400 font-bold">{activeAeroSpeed} MPH</strong>
              </span>
              <input
                type="range"
                min="60"
                max="220"
                value={activeAeroSpeed}
                onChange={(e) => setActiveAeroSpeed(Number(e.target.value))}
                className="w-full accent-orange-500 cursor-pointer"
              />
            </div>
          </ScrollReveal>

          {/* Pure Dark Studio Supercar with Authentic Continuous Streamlines (No boats!) */}
          <ScrollReveal animation="scale-up" duration={900} className="lg:col-span-8 p-6 rounded-xl bg-[#07080a] border border-white/10 shadow-2xl relative overflow-hidden">
            
            <div className="relative w-full h-[240px] rounded-lg overflow-hidden flex items-center justify-center bg-black">
              {/* Dynamic CFD Streamlines Canvas */}
              <canvas ref={aeroCanvasRef} className="absolute inset-0 w-full h-full block z-20 pointer-events-none" />
              
              {/* Clean Dark Supercar Side Silhouette (No Boats / Clean Pitch Black Studio) */}
              <img
                src="https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?w=1600&auto=format&fit=crop&q=85"
                alt="Race Car Studio Profile"
                className="w-full h-full object-cover object-center filter brightness-90 contrast-125 z-10"
              />

              {/* Dark lateral vignette blending into pure black */}
              <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black pointer-events-none z-15" />
            </div>

            {/* Downforce Metrics (Exact from screenshot) */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-4 border-t border-white/10 text-center font-mono-tech">
              <div>
                <div className="text-base sm:text-lg font-black text-white">1,850 KG</div>
                <div className="text-[9px] text-slate-500 uppercase">DOWNFORCE @ 150 MPH</div>
              </div>
              <div>
                <div className="text-base sm:text-lg font-black text-white">0.28 Cd</div>
                <div className="text-[9px] text-slate-500 uppercase">DRAG COEFFICIENT</div>
              </div>
              <div>
                <div className="text-base sm:text-lg font-black text-orange-400">+32%</div>
                <div className="text-[9px] text-slate-500 uppercase">SPLITTER FLOW</div>
              </div>
              <div>
                <div className="text-base sm:text-lg font-black text-orange-400">+18%</div>
                <div className="text-[9px] text-slate-500 uppercase">DIFFUSER EFFICIENCY</div>
              </div>
            </div>

          </ScrollReveal>

        </div>
      </section>

      {/* ============================================================== */}
      {/* 6. BUILT. TESTED. PROVEN. (Before & After Transformation) */}
      {/* ============================================================== */}
      <section id="workshop" className="py-20 px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto border-t border-white/5">
        <ScrollReveal animation="fade-up" duration={800} className="mb-8 flex flex-wrap items-center justify-between gap-4 font-mono-tech">
          <div>
            <span className="text-[10px] uppercase text-orange-500 tracking-widest block mb-1">
              BUILT. TESTED. PROVEN.
            </span>
            <h2 className="font-syncopate text-2xl sm:text-3xl font-bold uppercase text-white tracking-tight">
              THE WORKSHOP TRANSFORMATION
            </h2>
          </div>

          <div className="flex items-center gap-4 p-2.5 rounded bg-orange-950/40 border border-orange-500/40 text-[11px]">
            <div>LAP IMPROVEMENT: <strong className="text-orange-400 font-bold">-4.823 SECONDS</strong></div>
            <div>&bull;</div>
            <div>DOWNFORCE: <strong className="text-emerald-400 font-bold">+41% GAIN</strong></div>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ScrollReveal animation="slide-left" delay={100} duration={850}>
            <div className="p-4 rounded-xl bg-[#090b0e] border border-white/10 hover:border-white/30 transition-all h-full">
              <span className="font-mono-tech text-[10px] uppercase text-slate-500 block mb-2 font-bold">
                BEFORE THE BUILD (STOCK STREET SPEC)
              </span>
              <div className="relative h-60 rounded-lg overflow-hidden mb-3">
                <img
                  src="https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?w=800&auto=format&fit=crop&q=85"
                  alt="Before build"
                  className="w-full h-full object-cover filter grayscale contrast-125 hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 px-2 py-0.5 rounded bg-black/80 font-mono-tech text-[10px] text-slate-300">
                  STOCK ENGINE &bull; 410 HP
                </div>
              </div>
              <p className="font-space text-xs text-slate-400">
                Standard factory tolerances, street suspension damping, prone to thermal brake fade under repeated track laps.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal animation="slide-right" delay={200} duration={850}>
            <div className="p-4 rounded-xl bg-[#090b0e] border border-orange-500/40 shadow-xl shadow-orange-950/30 hover:border-orange-500 hover:shadow-[0_0_30px_rgba(249,115,22,0.2)] transition-all h-full">
              <span className="font-mono-tech text-[10px] uppercase text-orange-400 block mb-2 font-bold">
                AFTER THE BUILD (RACE-SPEC WEAPON)
              </span>
              <div className="relative h-60 rounded-lg overflow-hidden mb-3">
                <img
                  src="https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?w=800&auto=format&fit=crop&q=85"
                  alt="After build"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 px-2 py-0.5 rounded bg-orange-600 font-mono-tech text-[10px] text-black font-bold">
                  VORTEX REBUILD &bull; 820 HP
                </div>
              </div>
              <p className="font-space text-xs text-slate-300">
                Forged internals, twin sequential turbos, 100% genuine motorsport components, and 2-year performance warranty.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 7. DRIVER FEEDBACK (Driver Testimonials) */}
      {/* ============================================================== */}
      <section id="reviews" className="py-20 px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto border-t border-white/5">
        <ScrollReveal animation="fade-up" duration={800} className="mb-8">
          <span className="font-mono-tech text-[10px] uppercase text-orange-500 tracking-widest block mb-2">
            DRIVER FEEDBACK & PODIUM TESTIMONIALS
          </span>
          <h2 className="font-syncopate text-2xl sm:text-3xl font-bold uppercase text-white tracking-tight">
            TRUSTED AT 180 MPH
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {DRIVER_REVIEWS.map((drv, i) => (
            <ScrollReveal key={i} animation="fade-up" delay={i * 150} duration={850} className="h-full">
              <div className="h-full p-6 rounded-xl bg-[#090b0e] border border-white/10 hover:border-orange-500/50 hover:shadow-[0_0_25px_rgba(249,115,22,0.15)] transition-all flex flex-col justify-between">
                <p className="font-space text-xs sm:text-sm text-slate-300 italic mb-6 leading-relaxed">
                  "{drv.quote}"
                </p>
                <div className="flex items-center gap-3 pt-4 border-t border-white/5 font-mono-tech">
                  <img src={drv.img} alt={drv.name} className="w-10 h-10 rounded-full object-cover border border-orange-500" />
                  <div>
                    <h4 className="text-xs font-bold text-white uppercase">{drv.name}</h4>
                    <span className="text-[10px] text-orange-400">{drv.title}</span>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ============================================================== */}
      {/* 6. CAR BRANDS (Matches Navbar Item #6) */}
      {/* ============================================================== */}
      <section id="brands-pricing" className="py-20 px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto border-t border-white/5">
        <ScrollReveal animation="scale-up" duration={900}>
          <div className="p-8 sm:p-12 rounded-2xl bg-[#090b0e] border border-orange-500/40 relative overflow-hidden shadow-2xl hover:border-orange-500/70 hover:shadow-[0_0_40px_rgba(249,115,22,0.25)] transition-all">
            <div className="absolute top-0 right-0 w-96 h-96 bg-orange-600/15 blur-[130px] pointer-events-none rounded-full" />
            
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8 space-y-3">
                <span className="font-mono-tech text-[10px] uppercase text-orange-500 tracking-widest block font-bold">
                  MULTI-BRAND CAR WORKSHOP & RATE CALCULATOR
                </span>
                <h2 className="font-syncopate text-2xl sm:text-4xl font-bold uppercase text-white tracking-tight leading-tight">
                  SELECT YOUR BRAND & <br />
                  <span className="text-orange-500">GET INSTANT ESTIMATE</span>
                </h2>
                <p className="font-space text-slate-300 text-xs sm:text-sm leading-relaxed max-w-xl">
                  Need service or mechanical repairs for your Maruti Suzuki, Hyundai, Tata, Mahindra, Toyota, Honda, Kia, BMW or Mercedes? Click below to view transparent prices, turnaround time guarantees, genuine parts warranty, and 1-click slot booking on our dedicated pricing page.
                </p>

                {/* Supported brands tags */}
                <div className="flex flex-wrap gap-2 pt-2 font-mono-tech text-[10px] text-slate-400">
                  <span className="px-2 py-1 rounded bg-black/80 border border-white/10">Maruti Suzuki</span>
                  <span className="px-2 py-1 rounded bg-black/80 border border-white/10">Hyundai</span>
                  <span className="px-2 py-1 rounded bg-black/80 border border-white/10">Tata Motors</span>
                  <span className="px-2 py-1 rounded bg-black/80 border border-white/10">Mahindra 4x4</span>
                  <span className="px-2 py-1 rounded bg-black/80 border border-white/10">Toyota</span>
                  <span className="px-2 py-1 rounded bg-black/80 border border-white/10">BMW / Merc / Audi</span>
                </div>
              </div>

              <div className="lg:col-span-4 flex flex-col gap-3">
                <button
                  onClick={onOpenBrandsPage}
                  className="w-full py-4 px-6 rounded-sm bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-500 hover:to-orange-400 text-black font-rajdhani font-black text-xs uppercase tracking-widest shadow-xl shadow-orange-600/30 hover:scale-105 transition-all cursor-pointer flex items-center justify-center gap-2.5"
                >
                  <span>OPEN CAR BRANDS PAGE</span>
                  <ArrowRight className="w-4 h-4 stroke-[3]" />
                </button>
                <span className="font-mono-tech text-[10px] text-center text-slate-500">
                  100% Genuine OEM Spares &bull; Zero Advance Payment
                </span>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* ============================================================== */}
      {/* 7. INQUIRY FORM: READY TO BUILD YOUR WEAPON? LET'S MAKE IT HAPPEN (Matches Navbar #7) */}
      {/* ============================================================== */}
      <section id="inquiry" className="py-24 px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto border-t border-white/5">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          <ScrollReveal animation="slide-left" duration={850} className="lg:col-span-5 space-y-4">
            <span className="font-mono-tech text-[10px] uppercase text-orange-500 tracking-widest block">
              READY TO BUILD YOUR WEAPON?
            </span>
            <h2 className="font-syncopate text-3xl sm:text-4xl font-bold uppercase text-white tracking-tight leading-tight">
              LET'S MAKE IT <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-400">
                HAPPEN.
              </span>
            </h2>
            <p className="font-space text-slate-400 text-xs sm:text-sm leading-relaxed">
              Tell us about your car and goals. Our master mechanics and performance dyno calibrators will build a machine that's engineered for you.
            </p>

            <div className="pt-6 border-t border-white/10 space-y-3 font-mono-tech text-xs">
              <div className="flex items-center gap-2 text-slate-300">
                <Phone className="w-4 h-4 text-orange-500" />
                <span>HOTLINE: <strong>+91 98765 43210 / +1 (888) 4-VORTEX</strong></span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <Mail className="w-4 h-4 text-orange-500" />
                <span>EMAIL: <strong>service@vortexperformance.com</strong></span>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal animation="slide-right" duration={850} className="lg:col-span-7">
            {inquirySubmitted ? (
              <div className="p-8 rounded-xl bg-[#090b0e] border border-emerald-500/50 text-center">
                <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto mb-3" />
                <h3 className="font-syncopate text-lg font-bold text-white mb-2">INQUIRY DISPATCHED!</h3>
                <p className="font-space text-xs text-slate-400 max-w-sm mx-auto mb-4">
                  Our chief race engineer will contact you on WhatsApp / Phone within 15 minutes with a dyno spec consultation.
                </p>
                <button
                  onClick={() => setInquirySubmitted(false)}
                  className="px-4 py-2 rounded bg-slate-800 text-xs text-slate-300 font-mono-tech"
                >
                  Submit Another Project
                </button>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="p-6 sm:p-8 rounded-xl bg-[#090b0e] border border-white/10 shadow-2xl space-y-4 hover:border-orange-500/40 transition-colors">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-mono-tech text-[10px] uppercase text-slate-400 mb-1">FULL NAME *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. John Wick / Rohan Mehra"
                      value={inquiryForm.name}
                      onChange={(e) => setInquiryForm({ ...inquiryForm, name: e.target.value })}
                      className="w-full py-3 px-3.5 rounded bg-black border border-white/10 text-white font-space text-xs focus:outline-none focus:border-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block font-mono-tech text-[10px] uppercase text-slate-400 mb-1">EMAIL ADDRESS *</label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. pilot@racecars.com"
                      value={inquiryForm.email}
                      onChange={(e) => setInquiryForm({ ...inquiryForm, email: e.target.value })}
                      className="w-full py-3 px-3.5 rounded bg-black border border-white/10 text-white font-space text-xs focus:outline-none focus:border-orange-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-mono-tech text-[10px] uppercase text-slate-400 mb-1">PHONE NUMBER *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={inquiryForm.phone}
                      onChange={(e) => setInquiryForm({ ...inquiryForm, phone: e.target.value })}
                      className="w-full py-3 px-3.5 rounded bg-black border border-white/10 text-white font-space text-xs focus:outline-none focus:border-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block font-mono-tech text-[10px] uppercase text-slate-400 mb-1">PROJECT TYPE ▾</label>
                    <select
                      value={inquiryForm.projectType}
                      onChange={(e) => setInquiryForm({ ...inquiryForm, projectType: e.target.value })}
                      className="w-full py-3 px-3.5 rounded bg-black border border-white/10 text-white font-space text-xs focus:outline-none focus:border-orange-500"
                    >
                      <option value="Track Day & Performance Overhaul">Track Day & Performance Overhaul</option>
                      <option value="Engine Rebuild & Turbo Tuning">Engine Rebuild & Turbo Tuning</option>
                      <option value="Periodic Synthetic Maintenance">Periodic Synthetic Maintenance</option>
                      <option value="Brake & Suspension Overhaul">Brake & Suspension Overhaul</option>
                      <option value="Super Chill AC & Electrical">Super Chill AC & Electrical</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-mono-tech text-[10px] uppercase text-slate-400 mb-1">TELL US ABOUT YOUR PROJECT</label>
                  <textarea
                    rows="3"
                    placeholder="Describe your car model, current issues or desired horsepower target..."
                    value={inquiryForm.details}
                    onChange={(e) => setInquiryForm({ ...inquiryForm, details: e.target.value })}
                    className="w-full py-2.5 px-3.5 rounded bg-black border border-white/10 text-white font-space text-xs focus:outline-none focus:border-orange-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 px-6 rounded bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-500 hover:to-orange-400 text-black font-rajdhani font-black text-xs uppercase tracking-widest shadow-xl shadow-orange-600/30 transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>SUBMIT INQUIRY</span>
                  <ArrowRight className="w-4 h-4 stroke-[3]" />
                </button>
              </form>
            )}
          </ScrollReveal>

        </div>
      </section>

      {/* Video Modal */}
      {isFilmOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-md">
          <div className="relative w-full max-w-3xl rounded-xl bg-[#090b0e] border border-orange-500/40 p-6">
            <button
              onClick={() => setIsFilmOpen(false)}
              className="absolute top-4 right-4 font-mono-tech text-xs px-3 py-1 bg-white/10 rounded text-white cursor-pointer"
            >
              CLOSE &times;
            </button>
            <h3 className="font-syncopate text-base font-bold text-white mb-2">VORTEX WORKSHOP FILM &bull; PIT LANE SPRINT</h3>
            <div className="relative h-72 sm:h-96 rounded-lg overflow-hidden bg-black flex items-center justify-center">
              <img
                src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1600&auto=format&fit=crop&q=85"
                alt="Film preview"
                className="w-full h-full object-cover opacity-75"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4 bg-black/60">
                <div className="w-16 h-16 rounded-full bg-orange-500 flex items-center justify-center text-black mb-3 shadow-2xl animate-pulse">
                  <Play className="w-8 h-8 fill-black translate-x-0.5" />
                </div>
                <span className="text-white font-mono-tech text-xs uppercase font-bold tracking-widest">
                  PRECISION DYNO RUN &bull; 820 HP AT 6,900 RPM
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
