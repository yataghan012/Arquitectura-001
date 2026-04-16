import { motion, useScroll, useSpring } from 'motion/react';
import { RefObject } from 'react';

export default function ScrollProgress({ containerRef }: { containerRef: RefObject<HTMLElement> }) {
  const { scrollYProgress } = useScroll({ container: containerRef });
  
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="fixed top-0 right-0 w-[3px] h-full z-[9999] pointer-events-none mix-blend-difference">
      {/* Track (fondo sutil) */}
      <div className="absolute inset-0 w-full h-full bg-white/10" />
      
      {/* Barra de progreso */}
      <motion.div
        className="absolute top-0 right-0 w-full h-full bg-white origin-top"
        style={{ scaleY }}
      />
    </div>
  );
}
