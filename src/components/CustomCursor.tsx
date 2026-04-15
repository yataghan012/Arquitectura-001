import { motion, useSpring } from 'motion/react';
import { useEffect, useState } from 'react';

export default function CustomCursor() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);

  const cursorX = useSpring(0, { damping: 20, stiffness: 250 });
  const cursorY = useSpring(0, { damping: 20, stiffness: 250 });
  const ringX = useSpring(0, { damping: 25, stiffness: 150 });
  const ringY = useSpring(0, { damping: 25, stiffness: 150 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      ringX.set(e.clientX);
      ringY.set(e.clientY);

      const target = e.target as HTMLElement;
      setIsPointer(
        window.getComputedStyle(target).cursor === 'pointer' ||
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') !== null ||
        target.closest('button') !== null ||
        target.closest('.project-card') !== null
      );
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [cursorX, cursorY, ringX, ringY]);

  return (
    <div className="hidden md:block pointer-events-none fixed inset-0 z-[9999] cursor-none mix-blend-difference">
      {/* Horizontal Line */}
      <motion.div
        style={{ x: mousePos.x, y: mousePos.y }}
        animate={{
          width: isPointer ? 40 : 24,
          height: 2,
          backgroundColor: isPointer ? '#ffffff' : 'rgba(255, 255, 255, 0.7)',
        }}
        className="fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2"
      />
      {/* Vertical Line */}
      <motion.div
        style={{ x: mousePos.x, y: mousePos.y }}
        animate={{
          width: 2,
          height: isPointer ? 40 : 24,
          backgroundColor: isPointer ? '#ffffff' : 'rgba(255, 255, 255, 0.7)',
        }}
        className="fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2"
      />
    </div>
  );
}
