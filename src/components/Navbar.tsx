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

  // We use 1024px (lg) as the breakpoint to switch to the hamburger menu.
  // This guarantees that even at high zoom levels, the desktop menu won't break,
  // it will just gracefully switch to the mobile menu.
  const isMobile = windowWidth < 1024;

  // Logo scaling
  const logoSize = useTransform(scrollY, [0, 280], isMobile ? [150, 90] : [280, 140]);
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
      className="absolute inset-[-8px] w-[calc(100%+16px)] h-[calc(100%+16px)] pointer-events-none overflow-visible"
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
        isScrolled ? 'bg-dark/92 backdrop-blur-lg' : 'bg-transparent'
      }`}
    >
      <div className="w-full px-6 lg:px-12 xl:px-24">
        
        {/* DESKTOP LAYOUT (lg and up) */}
        <div className="hidden lg:grid grid-cols-[1fr_auto_1fr] items-center w-full">
          
          {/* Left Links */}
          <div className="flex justify-start items-center gap-4 xl:gap-10">
            {navLinks.slice(0, 3).map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="font-body text-[16px] xl:text-[20px] font-medium tracking-[0.2em] uppercase text-[#f8f4f1]/85 hover:text-[#f8f4f1] transition-[color,opacity] relative group whitespace-nowrap"
                style={{ textShadow: '0 1px 8px rgba(0, 0, 0, 0.4)' }}
              >
                {link.name}
                <span className="absolute left-0 bottom-[-4px] w-0 h-[1px] bg-[#f8f4f1] transition-[width] duration-[400ms] group-hover:w-full" />
              </a>
            ))}
          </div>

          {/* Center Logo */}
          <div className="flex justify-center items-center px-8">
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
              }}
              className="object-contain"
            />
          </div>

          {/* Right Links + CTA */}
          <div className="flex justify-end items-center gap-4 xl:gap-10">
            {navLinks.slice(3).map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="font-body text-[16px] xl:text-[20px] font-medium tracking-[0.2em] uppercase text-[#f8f4f1]/85 hover:text-[#f8f4f1] transition-[color,opacity] relative group whitespace-nowrap"
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
              className="relative inline-block font-body text-[12px] xl:text-[16px] font-medium tracking-[0.15em] uppercase text-black bg-[#faebd7] border border-[#f8f4f1]/25 px-[14px] py-[8px] xl:px-[20px] xl:py-[10px] hover:bg-[#f8f4f1] hover:text-black hover:border-[#f8f4f1] whitespace-nowrap"
            >
              <CornerTicks color="black" />
              Agendar consulta
            </motion.a>
          </div>
        </div>

        {/* MOBILE/TABLET LAYOUT (below lg) */}
        <div className="lg:hidden flex items-center justify-between w-full min-h-[80px]">
          <div className="w-10" /> {/* Spacer to balance the hamburger */}
          
          {/* Center Logo for Mobile */}
          <div className="flex justify-center items-center py-2">
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
              }}
              className="object-contain"
            />
          </div>

          <button 
            className="z-[1002] flex flex-col gap-1.5 p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Menu"
          >
            <motion.span 
              animate={isMobileMenuOpen ? { rotate: 45, y: 7.5 } : { rotate: 0, y: 0 }}
              className="w-6 h-[1.5px] bg-[#f8f4f1] block" 
            />
            <motion.span 
              animate={isMobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
              className="w-6 h-[1.5px] bg-[#f8f4f1] block" 
            />
            <motion.span 
              animate={isMobileMenuOpen ? { rotate: -45, y: -7.5 } : { rotate: 0, y: 0 }}
              className="w-6 h-[1.5px] bg-[#f8f4f1] block" 
            />
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <motion.div
        initial={{ clipPath: 'inset(0 0 100% 0)' }}
        animate={{ clipPath: isMobileMenuOpen ? 'inset(0 0 0 0)' : 'inset(0 0 100% 0)' }}
        transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        className="fixed inset-0 bg-dark z-[1000] flex flex-col items-center justify-center gap-9 lg:hidden"
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
            className="font-body text-3xl tracking-[0.25em] uppercase text-dark-fg/85 hover:text-white transition-colors"
          >
            {link.name}
          </a>
        ))}
        <motion.a
          href="#contacto"
          initial="initial"
          whileHover="hover"
          onClick={() => setIsMobileMenuOpen(false)}
          className="relative font-body text-2xl tracking-[0.25em] uppercase text-black bg-[#faebd7] px-8 py-4 mt-4"
        >
          <CornerTicks color="black" />
          Agendar consulta
        </motion.a>
      </motion.div>
    </motion.nav>
  );
}
