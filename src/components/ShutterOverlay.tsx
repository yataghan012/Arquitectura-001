import { motion, AnimatePresence } from 'motion/react';
import { useEffect, useState } from 'react';

export default function ShutterOverlay() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  const panels = [0, 1, 2, 3];

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div 
          className="fixed inset-0 z-[9999] pointer-events-none flex flex-col md:flex-row"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, delay: 1 }}
        >
          {panels.map((i) => (
            <motion.div
              key={i}
              initial={{ scaleY: 1 }}
              animate={{ scaleY: 0 }}
              transition={{ 
                duration: 1.2, 
                ease: [0.76, 0, 0.24, 1],
                delay: 0.08 * i 
              }}
              style={{ originY: 0 }}
              className="flex-1 bg-[#0c0c0c] relative"
            >
              {/* Architectural edge line */}
              <div className="absolute right-0 top-0 bottom-0 w-[1px] bg-white/5" />
            </motion.div>
          ))}
          
          {/* Central Mark */}
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: [0, 1, 0], scale: [0.8, 1, 1.2] }}
              transition={{ duration: 1.4, times: [0, 0.4, 1], ease: "easeOut" }}
              className="relative w-[120px] h-[120px] flex items-center justify-center"
            >
              <div className="absolute inset-0 border border-white/10 rounded-full" />
              <div className="w-[60px] h-[1px] bg-white/20 rotate-45 absolute" />
              <div className="w-[60px] h-[1px] bg-white/20 -rotate-45 absolute" />
              <span className="font-body text-[10px] tracking-[0.5em] uppercase text-white/40 mt-[160px]">
                SGI / 2024
              </span>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
