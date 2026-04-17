import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate, AnimatePresence } from 'motion/react';

const HERO_TEXTS = [
  { line1: 'Espacios', line2: 'que trascienden' },
  { line1: 'Habitar', line2: 'la luz' },
  { line1: 'Materia en', line2: 'equilibrio' },
  { line1: 'Diseño sin', line2: 'concesiones' },
  { line1: 'Refugios', line2: 'para el ser' }
];

export default function Hero() {
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const [textIndex, setTextIndex] = useState(0);
  
  // Normalized mouse (-1 to 1) for parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Absolute mouse (px) for spotlight
  const absMouseX = useMotionValue(typeof window !== 'undefined' ? window.innerWidth / 2 : 0);
  const absMouseY = useMotionValue(typeof window !== 'undefined' ? window.innerHeight / 2 : 0);

  // Smooth springs for cinematic parallax
  const springConfig = { damping: 30, stiffness: 100, mass: 0.8 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);
  const smoothAbsX = useSpring(absMouseX, { damping: 40, stiffness: 150 });
  const smoothAbsY = useSpring(absMouseY, { damping: 40, stiffness: 150 });

  useEffect(() => {
    setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    const handleResize = () => setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener('resize', handleResize);
    
    const interval = setInterval(() => {
      setTextIndex((prev) => (prev + 1) % HERO_TEXTS.length);
    }, 5000);

    return () => {
      window.removeEventListener('resize', handleResize);
      clearInterval(interval);
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (windowSize.width === 0) return;
    // Normalize mouse position from -1 to 1
    const x = (e.clientX / windowSize.width) * 2 - 1;
    const y = (e.clientY / windowSize.height) * 2 - 1;
    mouseX.set(x);
    mouseY.set(y);
    
    // Absolute position
    absMouseX.set(e.clientX);
    absMouseY.set(e.clientY);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    absMouseX.set(windowSize.width / 2);
    absMouseY.set(windowSize.height / 2);
  };

  // Parallax Transforms (Different depths)
  const bgX = useTransform(smoothX, [-1, 1], ['-3%', '3%']);
  const bgY = useTransform(smoothY, [-1, 1], ['-3%', '3%']);

  const textX = useTransform(smoothX, [-1, 1], ['3%', '-3%']);
  const textY = useTransform(smoothY, [-1, 1], ['3%', '-3%']);

  const fgLeftX = useTransform(smoothX, [-1, 1], ['-15%', '15%']);
  const fgLeftY = useTransform(smoothY, [-1, 1], ['-15%', '15%']);
  
  const fgRightX = useTransform(smoothX, [-1, 1], ['-15%', '15%']);
  const fgRightY = useTransform(smoothY, [-1, 1], ['-15%', '15%']);

  const fgTopX = useTransform(smoothX, [-1, 1], ['-5%', '5%']);
  const fgTopY = useTransform(smoothY, [-1, 1], ['-15%', '15%']);

  const spotlightBackground = useMotionTemplate`radial-gradient(circle 800px at ${smoothAbsX}px ${smoothAbsY}px, rgba(255,255,255,0.08), transparent 80%)`;

  const noiseSvg = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`;

  return (
    <section 
      id="inicio" 
      className="relative min-h-[100svh] w-full overflow-hidden bg-dark flex flex-col items-center justify-center md:snap-start md:snap-always"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* LAYER 1: Deep Background */}
      <motion.div 
        className="absolute inset-[-10%] w-[120%] h-[120%] z-0"
        style={{ x: bgX, y: bgY }}
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
      >
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-60"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=2000)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-dark/20 via-dark/40 to-dark/90" />
        <div className="absolute inset-0 bg-gradient-to-r from-dark/60 via-transparent to-dark/60" />
        
        {/* Reactive Spotlight */}
        <motion.div 
          className="absolute inset-0 z-[5] mix-blend-screen pointer-events-none"
          style={{ background: spotlightBackground }}
        />
      </motion.div>

      {/* LAYER 2: Midground Text */}
      <motion.div 
        className="relative z-10 flex flex-col items-center justify-center w-full px-4 sm:px-8 pointer-events-none pt-[12vh] md:pt-[15vh] lg:pt-[200px]"
        style={{ x: textX, y: textY }}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="relative flex items-center justify-center w-full min-h-[160px] md:min-h-[240px]">
          <AnimatePresence mode="wait">
            <motion.h1 
              key={textIndex}
              initial={{ opacity: 0, filter: 'blur(8px)', scale: 0.95 }}
              animate={{ opacity: 1, filter: 'blur(0px)', scale: 1 }}
              exit={{ opacity: 0, filter: 'blur(8px)', scale: 1.05 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="text-[clamp(2.5rem,7vw,7.5rem)] font-extralight text-dark-fg leading-[1.05] tracking-tight text-center mix-blend-plus-lighter w-full break-words"
            >
              {HERO_TEXTS[textIndex].line1}<br />
              <em className="italic font-extralight block">{HERO_TEXTS[textIndex].line2}</em>
            </motion.h1>
          </AnimatePresence>
        </div>
      </motion.div>

      {/* LAYER 3: Foreground Architectural Framing (Glass Walls) */}
      
      {/* Left Glass Wall */}
      <motion.div
        initial={{ x: '-100%' }}
        animate={{ x: 0 }}
        transition={{ duration: 1.8, ease: [0.76, 0, 0.24, 1], delay: 0.2 }}
        className="absolute top-[-10%] left-[-15%] sm:left-[-10%] w-[15vw] sm:w-[20vw] lg:w-[25vw] min-w-[60px] sm:min-w-[120px] h-[120%] z-20 pointer-events-none"
      >
        <motion.div 
          className="w-full h-full bg-dark/30 backdrop-blur-2xl shadow-[30px_0_60px_rgba(0,0,0,0.7)] relative overflow-hidden"
          style={{ 
            x: fgLeftX, 
            y: fgLeftY, 
            rotate: '2deg',
            boxShadow: 'inset 1px 0 0 rgba(255,255,255,0.15), 30px 0 60px rgba(0,0,0,0.7)'
          }}
        >
           <div className="absolute inset-0 opacity-[0.12] mix-blend-overlay" style={{ backgroundImage: noiseSvg }} />
           <div className="absolute inset-0 bg-gradient-to-r from-white/5 via-transparent to-transparent" />
           <div className="absolute inset-0 bg-gradient-to-r from-dark via-dark/60 to-transparent" />
        </motion.div>
      </motion.div>
      
      {/* Right Glass Wall */}
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        transition={{ duration: 1.8, ease: [0.76, 0, 0.24, 1], delay: 0.2 }}
        className="absolute top-[-10%] right-[-15%] sm:right-[-10%] w-[15vw] sm:w-[20vw] lg:w-[25vw] min-w-[60px] sm:min-w-[120px] h-[120%] z-20 pointer-events-none"
      >
        <motion.div 
          className="w-full h-full bg-dark/30 backdrop-blur-2xl shadow-[-30px_0_60px_rgba(0,0,0,0.7)] relative overflow-hidden"
          style={{ 
            x: fgRightX, 
            y: fgRightY, 
            rotate: '-2deg',
            boxShadow: 'inset -1px 0 0 rgba(255,255,255,0.15), -30px 0 60px rgba(0,0,0,0.7)'
          }}
        >
           <div className="absolute inset-0 opacity-[0.12] mix-blend-overlay" style={{ backgroundImage: noiseSvg }} />
           <div className="absolute inset-0 bg-gradient-to-l from-white/5 via-transparent to-transparent" />
           <div className="absolute inset-0 bg-gradient-to-l from-dark via-dark/60 to-transparent" />
        </motion.div>
      </motion.div>

      {/* Top Beam */}
      <motion.div 
        className="absolute top-[-5%] left-[-10%] w-[120%] h-[15vh] min-h-[80px] bg-gradient-to-b from-[#050505] to-transparent z-20 pointer-events-none"
        style={{ x: fgTopX, y: fgTopY, rotate: '-1deg' }}
      />
    </section>
  );
}
