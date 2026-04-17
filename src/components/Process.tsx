import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'motion/react';
import { PROJECTS } from '../constants';

export default function Process({ containerRef: scrollContainerRef }: { containerRef: React.RefObject<HTMLDivElement> }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  
  const sliderX = useMotionValue(50);
  const smoothSliderX = useSpring(sliderX, { damping: 30, stiffness: 200 });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    container: scrollContainerRef,
    offset: ["start end", "end start"]
  });

  const processProjects = PROJECTS.filter(p => p.process);
  const currentProject = processProjects[activeIndex];

  if (!currentProject || !currentProject.process) return null;

  const opacity = useTransform(scrollYProgress, [0.1, 0.3, 0.7, 0.9], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0.1, 0.5], [0.95, 1]);

  // Mobile scroll-based reveal
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 1024;
  const mobileClipPath = useTransform(scrollYProgress, [0.4, 0.7], ['inset(0 100% 0 0)', 'inset(0 0% 0 0)']);
  
  // Desktop drag-based reveal
  const desktopClipPath = useTransform(smoothSliderX, [0, 100], ['inset(0 100% 0 0)', 'inset(0 0% 0 0)']);
  const sliderLeft = useTransform(smoothSliderX, v => `${v}%`);

  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      if (!isDragging || !imageRef.current) return;
      const rect = imageRef.current.getBoundingClientRect();
      let x = ((e.clientX - rect.left) / rect.width) * 100;
      x = Math.max(0, Math.min(100, x));
      sliderX.set(x);
    };

    const handlePointerUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener('pointermove', handlePointerMove);
      window.addEventListener('pointerup', handlePointerUp);
    }

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
    };
  }, [isDragging, sliderX]);

  return (
    <section id="proceso" ref={containerRef} className="w-full relative px-[24px] md:px-[96px] py-[40px] md:py-[60px] bg-dark overflow-hidden">
      {/* Blueprint Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
        style={{ 
          backgroundImage: `linear-gradient(#f8f4f1 1px, transparent 1px), linear-gradient(90deg, #f8f4f1 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }} 
      />
      
      <div className="relative max-w-[1600px] mx-auto z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-[0.8fr_2.2fr] gap-[48px] md:gap-[80px] items-center">
          <motion.div style={{ opacity, scale }}>
            <span className="font-body text-[14px] md:text-[18px] tracking-[0.35em] uppercase text-[#f8f4f1]/25 mb-[24px] block">
              Narrativa Técnica
            </span>
            <h2 className="text-[clamp(40px,5vw,72px)] font-light text-dark-fg leading-[1.1] mb-[32px]">
              Del trazo a la <br />
              <em className="italic">realidad</em>
            </h2>
            
            <div className="min-h-[120px]">
              <motion.p 
                key={currentProject.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="font-body text-[18px] md:text-[22px] leading-[1.8] text-[#f8f4f1]/45 mb-[40px]"
              >
                {currentProject.process?.description}
              </motion.p>
            </div>
            
            <div className="flex flex-col gap-[24px] mb-[48px]">
              <div className="flex items-center gap-[16px]">
                <span className="w-[40px] h-[1px] bg-[#f8f4f1]/35" />
                <span className="font-body text-[14px] tracking-[0.2em] uppercase text-[#f8f4f1]/60">Boceto Inicial</span>
              </div>
              <div className="flex items-center gap-[16px]">
                <span className="w-[40px] h-[1px] bg-dark-fg" />
                <span className="font-body text-[14px] tracking-[0.2em] uppercase text-dark-fg">Obra Finalizada</span>
              </div>
            </div>

            {/* Project Navigation Buttons */}
            <div className="flex gap-[12px]">
              {processProjects.map((project, idx) => (
                <button
                  key={project.id}
                  onClick={() => setActiveIndex(idx)}
                  className={`group relative flex items-center justify-center w-[48px] h-[48px] rounded-full border transition-all duration-500 ${
                    activeIndex === idx 
                      ? 'bg-dark-fg border-dark-fg text-dark' 
                      : 'bg-transparent border-[#f8f4f1]/20 text-[#f8f4f1]/40 hover:border-[#f8f4f1]/60'
                  }`}
                >
                  <span className="font-body text-[12px] font-medium">{idx + 1}</span>
                  {activeIndex === idx && (
                    <motion.div 
                      layoutId="activeProcess"
                      className="absolute inset-[-4px] border border-dark-fg rounded-full"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </button>
              ))}
            </div>
          </motion.div>

          <div 
            ref={imageRef}
            className={`relative aspect-[3/2] lg:aspect-[16/9] group ${isDragging ? 'cursor-grabbing' : ''}`}
          >
            {/* Sketch Layer */}
            <motion.div 
              key={`sketch-${currentProject.id}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              transition={{ duration: 0.8 }}
              className="absolute inset-0 z-0 pointer-events-none"
            >
              <img 
                src={currentProject.process?.sketch} 
                alt="Sketch" 
                className="w-full h-full object-cover grayscale select-none"
              />
            </motion.div>
            
            {/* Final Build Layer */}
            <motion.div 
              key={`final-${currentProject.id}`}
              className="absolute inset-0 z-10 overflow-hidden pointer-events-none"
              style={{ clipPath: isMobile ? mobileClipPath : desktopClipPath }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              <img 
                src={currentProject.process?.final} 
                alt="Final Build" 
                className="w-full h-full object-cover select-none"
              />
            </motion.div>

            {/* Slider Line & Button */}
            {!isMobile && (
              <motion.div 
                className="absolute top-0 bottom-0 w-[2px] bg-[#f8f4f1] z-20"
                style={{ left: sliderLeft }}
              >
                {/* Slider Button */}
                <div 
                  className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-[48px] h-[48px] bg-dark rounded-full border border-[#f8f4f1]/20 flex items-center justify-center cursor-grab active:cursor-grabbing shadow-lg hover:scale-110 transition-transform touch-none"
                  onPointerDown={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setIsDragging(true);
                  }}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#f8f4f1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 8l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                </div>
              </motion.div>
            )}

            {/* Corner Ticks */}
            <svg className="absolute inset-[-10px] w-[calc(100%+20px)] h-[calc(100%+20px)] pointer-events-none overflow-visible z-30">
              <path d="M 0 20 L 0 0 L 20 0" fill="none" stroke="#f8f4f1" strokeWidth="1" opacity="0.3" />
              <path d="M 80 0 L 100 0 L 100 20" fill="none" stroke="#f8f4f1" strokeWidth="1" opacity="0.3" />
              <path d="M 100 80 L 100 100 L 80 100" fill="none" stroke="#f8f4f1" strokeWidth="1" opacity="0.3" />
              <path d="M 20 100 L 0 100 L 0 80" fill="none" stroke="#f8f4f1" strokeWidth="1" opacity="0.3" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
