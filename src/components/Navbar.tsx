import { motion, useScroll, useTransform } from 'motion/react';
import React, { useState, useEffect } from 'react';

export default function Navbar({ containerRef }: { containerRef: React.RefObject<HTMLDivElement> }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll({ container: containerRef });

  // Responsive state
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);
  
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // We use 1280px (xl) as the breakpoint to switch to the hamburger menu to ensure
  // zoom scaling and smaller desktops don't crash the links into the logo.
  const isMobile = windowWidth < 1280;

  // Logo scaling responsive to zoom
  const logoSize = useTransform(scrollY, [0, 280], isMobile ? [220, 120] : [340, 150]);
  const logoClip = useTransform(scrollY, [0, 280], ['circle(50% at 50% 50%)', 'circle(44% at 50% 50%)']);
  
  // Navigation padding
  const navPadding = useTransform(scrollY, [0, 280], isMobile ? ['8px 0', '4px 0'] : ['2px 0', '8px 0']);

  useEffect(() => {
    const updateScroll = () => {
      if (!containerRef.current) return;
      const currentScrollY = containerRef.current.scrollTop;
      
      setIsScrolled(currentScrollY > 150);

      if (currentScrollY < 10) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY) {
        setIsVisible(false); // Scrolling down
      } else {
        setIsVisible(true); // Scrolling up
      }

      setLastScrollY(currentScrollY);
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', updateScroll, { passive: true });
    }
    return () => {
      if (container) {
        container.removeEventListener('scroll', updateScroll);
      }
    };
  }, [lastScrollY, containerRef]);

  const navLinks = [
    { name: 'Portafolio', href: '#portafolio' },
    { name: 'Proceso', href: '#proceso' },
    { name: 'Filosofía', href: '#filosofia' },
    { name: 'Servicios', href: '#servicios' },
    { name: 'Estudio', href: '#estudio' },
  ];

  const CornerTicks = ({ color = "black" }: { color?: string }) => (
    <svg 
      className="absolute inset-[-8px] w-[calc(100%+16px)] h-[calc(100%+16px)] pointer-events-none overflow-visible hidden sm:block"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
    >
      <motion.path d="M 0 15 L 0 0 L 15 0" fill="none" stroke={color} strokeWidth="2" vectorEffect="non-scaling-stroke" variants={{ initial: { pathLength: 0, opacity: 0 }, hover: { pathLength: 1, opacity: 1 } }} transition={{ duration: 0.4, ease: "easeOut" }} />
      <motion.path d="M 85 0 L 100 0 L 100 15" fill="none" stroke={color} strokeWidth="2" vectorEffect="non-scaling-stroke" variants={{ initial: { pathLength: 0, opacity: 0 }, hover: { pathLength: 1, opacity: 1 } }} transition={{ duration: 0.4, ease: "easeOut" }} />
      <motion.path d="M 100 85 L 100 100 L 85 100" fill="none" stroke={color} strokeWidth="2" vectorEffect="non-scaling-stroke" variants={{ initial: { pathLength: 0, opacity: 0 }, hover: { pathLength: 1, opacity: 1 } }} transition={{ duration: 0.4, ease: "easeOut" }} />
      <motion.path d="M 15 100 L 0 100 L 0 85" fill="none" stroke={color} strokeWidth="2" vectorEffect="non-scaling-stroke" variants={{ initial: { pathLength: 0, opacity: 0 }, hover: { pathLength: 1, opacity: 1 } }} transition={{ duration: 0.4, ease: "easeOut" }} />
    </svg>
  );

  return (
    <motion.nav
      initial={{ opacity: 0 }}
      animate={{ 
        opacity: 1,
        y: isVisible ? 0 : -150
      }}
      transition={{ 
        opacity: { duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 1.4 },
        y: { duration: 0.5, ease: [0.16, 1, 0.3, 1] }
      }}
      style={{
        padding: navPadding,
      }}
      className={`fixed top-0 left-0 right-0 z-[100] flex items-center justify-center transition-all duration-500 ${
        isScrolled ? 'bg-dark/92 backdrop-blur-lg shadow-sm shadow-black/10' : 'bg-transparent'
      }`}
    >
      {/* 
        Wrap content in max-w-7xl to fix extreme ultrawide spreads, 
        and scale padding responsively based on viewport width to avoid zoom breaking.
      */}
      <div className="w-full max-w-[1600px] px-[clamp(1rem,3vw,3rem)] md:px-[clamp(2rem,4vw,6rem)]">
        
        {/* DESKTOP LAYOUT (xl and up) */}
        <div className="hidden xl:grid grid-cols-[1fr_auto_1fr] items-center w-full gap-[clamp(1rem,2vw,3rem)]">
          
          {/* Left Links */}
          <div className="flex justify-start items-center gap-[clamp(1rem,2vw,2.5rem)] min-w-0">
            {navLinks.slice(0, 3).map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="font-body text-[clamp(13px,1vw,16px)] font-medium tracking-[0.2em] uppercase text-[#f8f4f1]/85 hover:text-[#f8f4f1] transition-[color,opacity] relative group whitespace-nowrap"
                style={{ textShadow: '0 1px 8px rgba(0, 0, 0, 0.4)' }}
              >
                {link.name}
                <span className="absolute left-0 bottom-[-4px] w-0 h-[1px] bg-[#f8f4f1] transition-[width] duration-[400ms] group-hover:w-full" />
              </a>
            ))}
          </div>

          {/* Center Logo */}
          <div className="flex justify-center items-center px-4">
            <motion.img
              src={import.meta.env.BASE_URL + "images/logo.png"}
              alt="SGI Arquitectura"
              initial={{ opacity: 0, filter: 'invert(1) brightness(2) blur(10px)' }}
              animate={{ opacity: 1, filter: 'invert(1) brightness(2) blur(0px)' }}
              whileHover={{ filter: 'invert(1) brightness(2) blur(0px) drop-shadow(0 0 8px rgba(255,255,255,0.5))' }}
              transition={{ duration: 2, ease: "easeOut" }}
              style={{
                height: logoSize,
                width: logoSize,
                clipPath: logoClip,
                maxHeight: '35vh',
                maxWidth: '35vh'
              }}
              className="object-contain"
            />
          </div>

          {/* Right Links + CTA */}
          <div className="flex justify-end items-center gap-[clamp(1rem,2vw,2.5rem)] min-w-0">
            {navLinks.slice(3).map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="font-body text-[clamp(13px,1vw,16px)] font-medium tracking-[0.2em] uppercase text-[#f8f4f1]/85 hover:text-[#f8f4f1] transition-[color,opacity] relative group whitespace-nowrap"
                style={{ textShadow: '0 1px 8px rgba(0, 0, 0, 0.4)' }}
              >
                {link.name}
                <span className="absolute left-0 bottom-[-4px] w-0 h-[1px] bg-[#f8f4f1] transition-[width] duration-[400ms] group-hover:w-full" />
              </a>
            ))}
            <motion.a
              href="#contacto"
              initial="initial"
              whileHover="hover"
              className="relative inline-block font-body text-[clamp(11px,0.8vw,14px)] font-medium tracking-[0.15em] uppercase text-black bg-[#faebd7] border border-[#f8f4f1]/25 px-[clamp(12px,1.5vw,20px)] py-[clamp(6px,0.8vw,10px)] hover:bg-[#f8f4f1] hover:text-black hover:border-[#f8f4f1] whitespace-nowrap"
            >
              <CornerTicks color="black" />
              Agendar consulta
            </motion.a>
          </div>
        </div>

        {/* MOBILE/TABLET LAYOUT (below xl) */}
        <div className="xl:hidden flex items-center justify-between w-full min-h-[60px] md:min-h-[80px]">
          <div className="w-10 sm:w-16" /> {/* Spacer to balance the hamburger */}
          
          {/* Center Logo for Mobile */}
          <div className="flex justify-center items-center py-2 h-full flex-grow">
            <motion.img
              src={import.meta.env.BASE_URL + "images/logo.png"}
              alt="SGI Arquitectura"
              initial={{ opacity: 0, filter: 'invert(1) brightness(2) blur(10px)' }}
              animate={{ opacity: 1, filter: 'invert(1) brightness(2) blur(0px)' }}
              transition={{ duration: 2, ease: "easeOut" }}
              style={{
                height: logoSize,
                width: logoSize,
                clipPath: logoClip,
                maxHeight: '30vh',
                maxWidth: '30vh'
              }}
              className="object-contain sm:max-h-none"
            />
          </div>

          <button 
            className="z-[1002] flex flex-col gap-1.5 p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Menu"
          >
            <motion.span 
              animate={isMobileMenuOpen ? { rotate: 45, y: 7.5 } : { rotate: 0, y: 0 }}
              className="w-6 sm:w-8 h-[1.5px] bg-[#f8f4f1] block origin-center" 
            />
            <motion.span 
              animate={isMobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
              className="w-6 sm:w-8 h-[1.5px] bg-[#f8f4f1] block" 
            />
            <motion.span 
              animate={isMobileMenuOpen ? { rotate: -45, y: -7.5 } : { rotate: 0, y: 0 }}
              className="w-6 sm:w-8 h-[1.5px] bg-[#f8f4f1] block origin-center" 
            />
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <motion.div
        initial={{ clipPath: 'inset(0 0 100% 0)' }}
        animate={{ clipPath: isMobileMenuOpen ? 'inset(0 0 0 0)' : 'inset(0 0 100% 0)' }}
        transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        className="fixed inset-0 bg-dark z-[1000] flex flex-col items-center justify-center gap-6 sm:gap-9 xl:hidden overflow-y-auto pt-20 pb-10"
      >
        <motion.div 
          className="absolute inset-0 bg-[#f8f4f1]/5 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: isMobileMenuOpen ? 1 : 0 }}
          transition={{ delay: 0.4 }}
        />
        
        {navLinks.map((link) => (
          <a
            key={link.name}
            href={link.href}
            onClick={() => setIsMobileMenuOpen(false)}
            className="font-body text-2xl sm:text-3xl tracking-[0.25em] uppercase text-dark-fg/85 hover:text-white transition-colors"
          >
            {link.name}
          </a>
        ))}
        <motion.a
          href="#contacto"
          initial="initial"
          whileHover="hover"
          onClick={() => setIsMobileMenuOpen(false)}
          className="relative font-body text-xl sm:text-2xl tracking-[0.25em] uppercase text-black bg-[#faebd7] px-6 py-3 sm:px-8 sm:py-4 mt-4"
        >
          <CornerTicks color="black" />
          Agendar consulta
        </motion.a>
      </motion.div>
    </motion.nav>
  );
}
