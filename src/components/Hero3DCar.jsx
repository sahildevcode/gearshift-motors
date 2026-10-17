import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Eye, RotateCw, Sparkles, Shield, Wrench, Zap, CheckCircle2 } from 'lucide-react';

export default function Hero3DCar({ onSelectPart, currentLanguage = 'en' }) {
  const mountRef = useRef(null);
  const [selectedColor, setSelectedColor] = useState('#e11d48'); // Default sport red
  const [isWireframe, setIsWireframe] = useState(false);
  const [isRotating, setIsRotating] = useState(true);
  const [activeInspection, setActiveInspection] = useState('full');
  const [hoveredPart, setHoveredPart] = useState(null);

  const carMaterialsRef = useRef([]);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const carGroupRef = useRef(null);
  const wheelsRef = useRef([]);

  const COLOR_PALETTE = [
    { name: 'Velocity Red', hex: '#e11d48', label: 'रेड' },
    { name: 'Stealth Black', hex: '#111827', label: 'ब्लैक' },
    { name: 'Hyper Blue', hex: '#2563eb', label: 'ब्लू' },
    { name: 'Cyber Silver', hex: '#94a3b8', label: 'सिल्वर' },
    { name: 'Racing Amber', hex: '#f59e0b', label: 'एम्बर' },
  ];

  const INSPECTION_POINTS = [
    { id: 'full', label: '360° Showroom', labelHi: '360° व्यू', camPos: { x: 4.8, y: 2.2, z: 4.8 }, target: { x: 0, y: 0.5, z: 0 } },
    { id: 'engine', label: 'V8 Engine & Turbo', labelHi: 'इंजन बे', camPos: { x: 1.8, y: 2.0, z: 2.5 }, target: { x: 0, y: 0.6, z: 1.6 } },
    { id: 'brakes', label: 'Ceramic Discs', labelHi: 'ब्रेक सिस्टम', camPos: { x: 2.4, y: 0.8, z: 1.6 }, target: { x: 1.2, y: 0.4, z: 1.2 } },
    { id: 'ac', label: 'Climate & Cabin', labelHi: 'एसी & केबिन', camPos: { x: 0, y: 2.8, z: 2.2 }, target: { x: 0, y: 0.8, z: 0.2 } },
    { id: 'exhaust', label: 'Dual Exhaust & Cat', labelHi: 'साइलेंसर & एग्जॉस्ट', camPos: { x: -1.8, y: 1.2, z: -3.2 }, target: { x: 0, y: 0.4, z: -2.0 } },
  ];

  useEffect(() => {
    const currentMount = mountRef.current;
    if (!currentMount) return;

    // 1. Scene, Camera, Renderer
    const width = currentMount.clientWidth;
    const height = currentMount.clientHeight;

    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.fog = new THREE.FogExp2(0x08090d, 0.035);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(4.8, 2.2, 4.8);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    currentMount.appendChild(renderer.domElement);

    // 2. Lighting System
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xfff5ea, 3.5);
    keyLight.position.set(5, 8, 5);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    scene.add(keyLight);

    const cyanRimLight = new THREE.DirectionalLight(0x06b6d4, 4.0);
    cyanRimLight.position.set(-6, 4, -4);
    scene.add(cyanRimLight);

    const orangeFillLight = new THREE.PointLight(0xf97316, 2.5, 20);
    orangeFillLight.position.set(0, 0.2, 0);
    scene.add(orangeFillLight);

    // 3. Studio Turntable Ground
    const platformGeo = new THREE.CylinderGeometry(3.6, 3.8, 0.15, 64);
    const platformMat = new THREE.MeshStandardMaterial({
      color: 0x111622,
      metalness: 0.8,
      roughness: 0.2
    });
    const platform = new THREE.Mesh(platformGeo, platformMat);
    platform.position.y = -0.08;
    platform.receiveShadow = true;
    scene.add(platform);

    // Glowing Neon Ring on Turntable
    const ringGeo = new THREE.RingGeometry(3.2, 3.28, 64);
    const ringMat = new THREE.MeshBasicMaterial({ color: 0xf97316, side: THREE.DoubleSide });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = -Math.PI / 2;
    ring.position.y = 0.001;
    scene.add(ring);

    // Secondary inner cyan ring
    const ring2Geo = new THREE.RingGeometry(2.2, 2.24, 64);
    const ring2Mat = new THREE.MeshBasicMaterial({ color: 0x06b6d4, side: THREE.DoubleSide });
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2.rotation.x = -Math.PI / 2;
    ring2.position.y = 0.002;
    scene.add(ring2);

    // Grid Floor
    const grid = new THREE.GridHelper(16, 24, 0xf97316, 0x1e293b);
    grid.position.y = -0.09;
    scene.add(grid);

    // 4. Car Hierarchy Model Construction
    const carGroup = new THREE.Group();
    carGroupRef.current = carGroup;
    scene.add(carGroup);

    // Car Paint Material
    const paintMaterial = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(selectedColor),
      metalness: 0.85,
      roughness: 0.18,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
      reflectivity: 0.9,
    });
    carMaterialsRef.current.push(paintMaterial);

    const darkTrimMaterial = new THREE.MeshStandardMaterial({
      color: 0x18181b,
      metalness: 0.6,
      roughness: 0.4
    });

    const carbonMaterial = new THREE.MeshStandardMaterial({
      color: 0x09090b,
      roughness: 0.7,
      metalness: 0.3
    });

    const glassMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x0f172a,
      metalness: 0.1,
      roughness: 0.05,
      transmission: 0.85,
      thickness: 0.5,
      transparent: true,
      opacity: 0.7
    });

    // Lower Main Body Hull
    const mainHullGeo = new THREE.BoxGeometry(2.1, 0.45, 4.4);
    // Bevel car front and rear
    const mainHull = new THREE.Mesh(mainHullGeo, paintMaterial);
    mainHull.position.y = 0.48;
    mainHull.castShadow = true;
    mainHull.receiveShadow = true;
    carGroup.add(mainHull);

    // Front Hood & Aerodynamic Nose
    const noseGeo = new THREE.BoxGeometry(1.95, 0.3, 1.4);
    const nose = new THREE.Mesh(noseGeo, paintMaterial);
    nose.position.set(0, 0.45, 1.8);
    nose.rotation.x = 0.06;
    nose.castShadow = true;
    carGroup.add(nose);

    // Cabin / Cockpit Roof
    const cabinGeo = new THREE.BoxGeometry(1.65, 0.48, 2.1);
    const cabin = new THREE.Mesh(cabinGeo, paintMaterial);
    cabin.position.set(0, 0.88, -0.15);
    cabin.castShadow = true;
    carGroup.add(cabin);

    // Front Windshield Glass
    const frontWindshieldGeo = new THREE.BoxGeometry(1.58, 0.42, 0.8);
    const frontWindshield = new THREE.Mesh(frontWindshieldGeo, glassMaterial);
    frontWindshield.position.set(0, 0.82, 0.75);
    frontWindshield.rotation.x = -0.55;
    carGroup.add(frontWindshield);

    // Rear Windshield Glass
    const rearWindshieldGeo = new THREE.BoxGeometry(1.58, 0.38, 0.8);
    const rearWindshield = new THREE.Mesh(rearWindshieldGeo, glassMaterial);
    rearWindshield.position.set(0, 0.82, -1.05);
    rearWindshield.rotation.x = 0.55;
    carGroup.add(rearWindshield);

    // Side Windows
    const sideWinLeft = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.36, 1.6), glassMaterial);
    sideWinLeft.position.set(0.81, 0.84, -0.15);
    carGroup.add(sideWinLeft);

    const sideWinRight = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.36, 1.6), glassMaterial);
    sideWinRight.position.set(-0.81, 0.84, -0.15);
    carGroup.add(sideWinRight);

    // Rear Aerodynamic Spoiler Wing
    const spoilerWingGeo = new THREE.BoxGeometry(1.9, 0.06, 0.35);
    const spoiler = new THREE.Mesh(spoilerWingGeo, carbonMaterial);
    spoiler.position.set(0, 0.98, -2.15);
    spoiler.castShadow = true;
    carGroup.add(spoiler);

    const spoilerLeftPillar = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.3, 0.12), carbonMaterial);
    spoilerLeftPillar.position.set(0.65, 0.82, -2.15);
    carGroup.add(spoilerLeftPillar);

    const spoilerRightPillar = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.3, 0.12), carbonMaterial);
    spoilerRightPillar.position.set(-0.65, 0.82, -2.15);
    carGroup.add(spoilerRightPillar);

    // Front Grill & Splitter
    const grillGeo = new THREE.BoxGeometry(1.5, 0.22, 0.1);
    const grill = new THREE.Mesh(grillGeo, darkTrimMaterial);
    grill.position.set(0, 0.32, 2.45);
    carGroup.add(grill);

    const splitter = new THREE.Mesh(new THREE.BoxGeometry(2.05, 0.04, 0.3), carbonMaterial);
    splitter.position.set(0, 0.18, 2.38);
    carGroup.add(splitter);

    // Headlights (High-intensity LED projector lights)
    const lightMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });
    const headLeft = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.12, 0.1), lightMat);
    headLeft.position.set(0.7, 0.46, 2.45);
    carGroup.add(headLeft);

    const headRight = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.12, 0.1), lightMat);
    headRight.position.set(-0.7, 0.46, 2.45);
    carGroup.add(headRight);

    // LED Headlight Beams forward
    const spotL = new THREE.SpotLight(0x38bdf8, 4, 8, Math.PI / 6, 0.5);
    spotL.position.set(0.7, 0.46, 2.5);
    spotL.target.position.set(0.7, 0, 7);
    carGroup.add(spotL);
    carGroup.add(spotL.target);

    const spotR = new THREE.SpotLight(0x38bdf8, 4, 8, Math.PI / 6, 0.5);
    spotR.position.set(-0.7, 0.46, 2.5);
    spotR.target.position.set(-0.7, 0, 7);
    carGroup.add(spotR);
    carGroup.add(spotR.target);

    // Rear Neon Tail-Light Strip
    const tailMat = new THREE.MeshBasicMaterial({ color: 0xef4444 });
    const tailLightStrip = new THREE.Mesh(new THREE.BoxGeometry(1.8, 0.08, 0.1), tailMat);
    tailLightStrip.position.set(0, 0.52, -2.22);
    carGroup.add(tailLightStrip);

    // Dual Exhaust Chrome Pipes
    const exhaustMat = new THREE.MeshStandardMaterial({ color: 0xd4d4d8, metalness: 0.95, roughness: 0.1 });
    const exL = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 0.25, 16), exhaustMat);
    exL.rotation.x = Math.PI / 2;
    exL.position.set(0.5, 0.24, -2.22);
    carGroup.add(exL);

    const exR = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 0.25, 16), exhaustMat);
    exR.rotation.x = Math.PI / 2;
    exR.position.set(-0.5, 0.24, -2.22);
    carGroup.add(exR);

    // Wheels Construction (4 Wheels with Sport Rims, Calipers, Tires)
    const wheelPositions = [
      { x: 1.08, y: 0.38, z: 1.35, isLeft: true },
      { x: -1.08, y: 0.38, z: 1.35, isLeft: false },
      { x: 1.08, y: 0.38, z: -1.35, isLeft: true },
      { x: -1.08, y: 0.38, z: -1.35, isLeft: false },
    ];

    const wheelMeshes = [];
    wheelPositions.forEach((pos) => {
      const wheelAssembly = new THREE.Group();
      wheelAssembly.position.set(pos.x, pos.y, pos.z);

      // Tire Rubber
      const tireGeo = new THREE.CylinderGeometry(0.38, 0.38, 0.26, 32);
      const tireMat = new THREE.MeshStandardMaterial({ color: 0x18181b, roughness: 0.8 });
      const tire = new THREE.Mesh(tireGeo, tireMat);
      tire.rotation.z = Math.PI / 2;
      tire.castShadow = true;
      wheelAssembly.add(tire);

      // Alloy Rim
      const rimGeo = new THREE.CylinderGeometry(0.26, 0.26, 0.28, 24);
      const rimMat = new THREE.MeshStandardMaterial({ color: 0x52525b, metalness: 0.9, roughness: 0.2 });
      const rim = new THREE.Mesh(rimGeo, rimMat);
      rim.rotation.z = Math.PI / 2;
      wheelAssembly.add(rim);

      // Red Sport Brake Caliper
      const caliperGeo = new THREE.BoxGeometry(0.08, 0.16, 0.14);
      const caliperMat = new THREE.MeshStandardMaterial({ color: 0xdc2626, metalness: 0.5, roughness: 0.3 });
      const caliper = new THREE.Mesh(caliperGeo, caliperMat);
      caliper.position.set(pos.isLeft ? -0.06 : 0.06, 0.12, 0);
      wheelAssembly.add(caliper);

      carGroup.add(wheelAssembly);
      wheelMeshes.push(wheelAssembly);
    });
    wheelsRef.current = wheelMeshes;

    // Underglow Neon Ground Light
    const underglowLight = new THREE.PointLight(0xf97316, 3.0, 3.2);
    underglowLight.position.set(0, 0.12, 0);
    carGroup.add(underglowLight);

    // 5. User Interaction (Orbit drag rotation & Wheel zoom)
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;
    let targetRotationY = 0;
    let targetRotationX = 0;

    const handlePointerDown = (e) => {
      isDragging = true;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const handlePointerMove = (e) => {
      if (!isDragging) return;
      const deltaX = e.clientX - prevMouseX;
      const deltaY = e.clientY - prevMouseY;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;

      targetRotationY += deltaX * 0.01;
      targetRotationX = Math.max(-0.2, Math.min(0.4, targetRotationX + deltaY * 0.005));
    };

    const handlePointerUp = () => {
      isDragging = false;
    };

    const handleWheel = (e) => {
      e.preventDefault();
      const zoomFactor = e.deltaY * 0.003;
      camera.position.z = Math.max(3.2, Math.min(8.5, camera.position.z + zoomFactor));
    };

    const domElem = renderer.domElement;
    domElem.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);
    domElem.addEventListener('wheel', handleWheel, { passive: false });

    // 6. Smooth Animation Loop
    let animId;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const delta = clock.getDelta();

      if (isRotating && !isDragging && activeInspection === 'full') {
        carGroup.rotation.y += 0.006;
      } else {
        carGroup.rotation.y += (targetRotationY - carGroup.rotation.y) * 0.08;
      }
      carGroup.rotation.x += (targetRotationX - carGroup.rotation.x) * 0.08;

      // Platform slight pulse
      const time = clock.getElapsedTime();
      underglowLight.intensity = 2.4 + Math.sin(time * 3) * 0.8;

      renderer.render(scene, camera);
    };

    animate();

    // 7. Handle Resize
    const handleResize = () => {
      if (!mountRef.current) return;
      const newW = mountRef.current.clientWidth;
      const newH = mountRef.current.clientHeight;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      domElem.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
      domElem.removeEventListener('wheel', handleWheel);
      cancelAnimationFrame(animId);
      if (renderer.domElement && currentMount.contains(renderer.domElement)) {
        currentMount.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  // Update Paint Color
  const handleColorChange = (hex) => {
    setSelectedColor(hex);
    if (carMaterialsRef.current) {
      carMaterialsRef.current.forEach((mat) => {
        mat.color.set(hex);
      });
    }
  };

  // Toggle Wireframe / Holographic Mode
  const handleToggleWireframe = () => {
    const nextState = !isWireframe;
    setIsWireframe(nextState);
    if (carMaterialsRef.current) {
      carMaterialsRef.current.forEach((mat) => {
        mat.wireframe = nextState;
      });
    }
  };

  // Switch inspection points
  const handleInspect = (pt) => {
    setActiveInspection(pt.id);
    if (onSelectPart) {
      onSelectPart(pt.id);
    }

    if (cameraRef.current) {
      // Smoothly animate camera position
      const cam = cameraRef.current;
      const startPos = { ...cam.position };
      const endPos = pt.camPos;
      const startTime = performance.now();
      const duration = 800; // ms

      const step = (now) => {
        const elapsed = now - startTime;
        const progress = Math.min(1, elapsed / duration);
        const ease = 0.5 - Math.cos(progress * Math.PI) / 2;

        cam.position.x = startPos.x + (endPos.x - startPos.x) * ease;
        cam.position.y = startPos.y + (endPos.y - startPos.y) * ease;
        cam.position.z = startPos.z + (endPos.z - startPos.z) * ease;
        cam.lookAt(pt.target.x, pt.target.y, pt.target.z);

        if (progress < 1) {
          requestAnimationFrame(step);
        }
      };
      requestAnimationFrame(step);
    }
  };

  return (
    <div className="relative w-full h-[520px] md:h-[620px] rounded-3xl overflow-hidden border border-slate-800 bg-gradient-to-b from-[#0d1117] via-[#090b10] to-[#06080b] shadow-2xl shadow-orange-950/20">
      {/* 3D Canvas Mount */}
      <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Floating Hologram HUD Overlay */}
      <div className="absolute top-4 left-4 z-10 pointer-events-none">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/80 border border-orange-500/30 backdrop-blur-md">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-orange-500"></span>
          </span>
          <span className="text-xs font-mono font-medium tracking-wider text-orange-400 uppercase">
            3D Diagnostic Simulator &bull; 60 FPS
          </span>
        </div>
      </div>

      {/* Interactive Controls Overlay (Bottom / Sides) */}
      <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
        {/* Wireframe Scanner Toggle */}
        <button
          onClick={handleToggleWireframe}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium border transition-all backdrop-blur-md ${
            isWireframe
              ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 shadow-lg shadow-cyan-500/20'
              : 'bg-slate-900/80 border-slate-700/80 text-slate-300 hover:border-slate-500'
          }`}
          title="Toggle X-Ray Wireframe"
        >
          <Zap className="w-4 h-4 text-cyan-400" />
          <span>{isWireframe ? 'X-Ray Active' : 'X-Ray Scanner'}</span>
        </button>

        {/* Rotate Toggle */}
        <button
          onClick={() => setIsRotating(!isRotating)}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium border transition-all backdrop-blur-md ${
            isRotating
              ? 'bg-orange-500/20 border-orange-500/50 text-orange-300'
              : 'bg-slate-900/80 border-slate-700/80 text-slate-300 hover:border-slate-500'
          }`}
          title="Toggle Turntable Rotation"
        >
          <RotateCw className={`w-4 h-4 text-orange-400 ${isRotating ? 'animate-spin' : ''}`} style={{ animationDuration: '6s' }} />
          <span>{isRotating ? 'Turntable: ON' : 'Turntable: PAUSED'}</span>
        </button>
      </div>

      {/* Part Inspection Switcher (Top center / Mobile scrollable) */}
      <div className="absolute top-16 md:top-4 left-1/2 -translate-x-1/2 z-10 flex items-center gap-1.5 p-1 rounded-2xl bg-slate-950/80 border border-slate-800 backdrop-blur-lg shadow-xl max-w-[94%] overflow-x-auto">
        {INSPECTION_POINTS.map((pt) => (
          <button
            key={pt.id}
            onClick={() => handleInspect(pt)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              activeInspection === pt.id
                ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-slate-950 shadow-md font-bold'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            {currentLanguage === 'hi' ? pt.labelHi : pt.label}
          </button>
        ))}
      </div>

      {/* Paint Color Studio Selector (Bottom Left) */}
      <div className="absolute bottom-4 left-4 z-10 flex items-center gap-2 p-2 rounded-2xl bg-slate-950/80 border border-slate-800/80 backdrop-blur-md">
        <span className="text-[11px] font-mono uppercase text-slate-400 pl-1">
          {currentLanguage === 'hi' ? 'रंग चुनें:' : 'Color:'}
        </span>
        <div className="flex items-center gap-1.5">
          {COLOR_PALETTE.map((col) => (
            <button
              key={col.hex}
              onClick={() => handleColorChange(col.hex)}
              className={`w-6 h-6 rounded-full border-2 transition-all transform hover:scale-115 ${
                selectedColor === col.hex ? 'border-white scale-110 shadow-lg' : 'border-transparent opacity-80 hover:opacity-100'
              }`}
              style={{ backgroundColor: col.hex }}
              title={col.name}
            />
          ))}
        </div>
      </div>

      {/* Drag & Zoom Hint (Bottom Right) */}
      <div className="absolute bottom-4 right-4 z-10 pointer-events-none hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/60 border border-slate-800 text-[11px] text-slate-400 backdrop-blur-md font-mono">
        <RotateCw className="w-3 h-3 text-orange-400" />
        <span>Drag to rotate 360&deg; &bull; Scroll to zoom</span>
      </div>
    </div>
  );
}
