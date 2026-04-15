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

  const isMobile = windowWidth < 768;
  const isTablet = windowWidth >= 768 && windowWidth < 1200; // Increased threshold for tablet/zoom

  const logoSize = useTransform(scrollY, [0, 280], isMobile ? [120, 80] : [300, 180]);
  const logoClip = useTransform(scrollY, [0, 280], ['circle(50% at 50% 50%)', 'circle(44% at 50% 50%)']);
  const spacerWidth = useTransform(scrollY, [0, 280], isMobile ? [120, 80] : [300, 180]);
  const navPadding = useTransform(scrollY, [0, 280], isMobile ? ['12px 0', '6px 0'] : ['94px 0', '20px 0']);
  const navHeight = useTransform(scrollY, [0, 280], isMobile ? ['90px', '80px'] : ['auto', '180px']);

  useEffect(() => {
    const updateScroll = () => {
      if (!containerRef.current) return;
      const currentScrollY = containerRef.current.scrollTop;
      
      // Determine if we are at the top
      setIsScrolled(currentScrollY > 150);

      // Show/Hide logic based on direction
      if (currentScrollY < 10) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY) {
        // Scrolling down
        setIsVisible(false);
      } else {
        // Scrolling up
        setIsVisible(true);
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
      <motion.path
        d="M 0 15 L 0 0 L 15 0"
        fill="none"
        stroke={color}
        strokeWidth="2"
        vectorEffect="non-scaling-stroke"
        variants={{
          initial: { pathLength: 0, opacity: 0 },
          hover: { pathLength: 1, opacity: 1 }
        }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      />
      <motion.path
        d="M 85 0 L 100 0 L 100 15"
        fill="none"
        stroke={color}
        strokeWidth="2"
        vectorEffect="non-scaling-stroke"
        variants={{
          initial: { pathLength: 0, opacity: 0 },
          hover: { pathLength: 1, opacity: 1 }
        }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      />
      <motion.path
        d="M 100 85 L 100 100 L 85 100"
        fill="none"
        stroke={color}
        strokeWidth="2"
        vectorEffect="non-scaling-stroke"
        variants={{
          initial: { pathLength: 0, opacity: 0 },
          hover: { pathLength: 1, opacity: 1 }
        }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      />
      <motion.path
        d="M 15 100 L 0 100 L 0 85"
        fill="none"
        stroke={color}
        strokeWidth="2"
        vectorEffect="non-scaling-stroke"
        variants={{
          initial: { pathLength: 0, opacity: 0 },
          hover: { pathLength: 1, opacity: 1 }
        }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      />
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
        height: navHeight,
      }}
      className={`fixed top-0 left-0 right-0 z-[100] flex items-center justify-center transition-all duration-500 ${
        isScrolled ? 'bg-dark/92 backdrop-blur-lg' : 'bg-transparent'
      }`}
    >
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
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 object-contain"
      />

      <div className="w-full px-4 md:px-8 lg:px-16 xl:px-24">
        <motion.div 
          className="hidden md:grid grid-cols-[1fr_auto_1fr] items-center w-full"
        >
          {/* Left Side Links */}
          <div className="flex justify-start lg:justify-center items-center">
            <ul className="flex gap-4 lg:gap-8 xl:gap-12 list-none">
              {navLinks.slice(0, 3).map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="font-body text-[14px] lg:text-[18px] xl:text-[21px] font-medium tracking-[0.2em] lg:tracking-[0.25em] uppercase text-[#f8f4f1]/85 hover:text-[#f8f4f1] transition-all relative group whitespace-nowrap"
                    style={{ textShadow: '0 1px 8px rgba(0, 0, 0, 0.4)' }}
                  >
                    {link.name}
                    <span className="absolute left-0 bottom-[-4px] w-0 h-[1px] bg-[#f8f4f1] transition-all duration-400 group-hover:w-full" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Center Spacer for Logo */}
          <motion.div style={{ width: spacerWidth }} className="shrink-0" />

          {/* Right Side Links + CTA */}
          <div className="flex justify-end lg:justify-center items-center">
            <div className="flex items-center gap-4 lg:gap-8 xl:gap-12">
              <ul className="flex gap-4 lg:gap-8 xl:gap-12 list-none">
                {navLinks.slice(3).map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="font-body text-[14px] lg:text-[18px] xl:text-[21px] font-medium tracking-[0.2em] lg:tracking-[0.25em] uppercase text-[#f8f4f1]/85 hover:text-[#f8f4f1] transition-all relative group whitespace-nowrap"
                      style={{ textShadow: '0 1px 8px rgba(0, 0, 0, 0.4)' }}
                    >
                      {link.name}
                      <span className="absolute left-0 bottom-[-4px] w-0 h-[1px] bg-[#f8f4f1] transition-all duration-400 group-hover:w-full" />
                    </a>
                  </li>
                ))}
              </ul>

              <motion.a
                href="#contacto"
                initial="initial"
                whileHover="hover"
                className="relative inline-block font-body text-[12px] lg:text-[16px] xl:text-[19px] font-medium tracking-[0.15em] lg:tracking-[0.25em] uppercase text-black bg-[#faebd7] border border-[#f8f4f1]/25 px-3 py-2 lg:px-[18px] lg:py-[8px] xl:px-[22px] xl:py-[10px] hover:bg-[#f8f4f1] hover:text-black hover:border-[#f8f4f1] whitespace-nowrap"
              >
                <CornerTicks color="black" />
                {isTablet ? 'Contacto' : 'Agendar consulta'}
              </motion.a>
            </div>
          </div>
        </motion.div>

        {/* Mobile Header */}
        <div className="md:hidden flex items-center justify-between w-full h-[60px]">
          <div className="w-10" /> {/* Spacer to balance the hamburger */}
          
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
        className="fixed inset-0 bg-dark z-[1000] flex flex-col items-center justify-center gap-9 md:hidden"
      >
        {/* Shutter panels for immersive effect */}
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
            className="font-body text-2xl tracking-[0.25em] uppercase text-dark-fg/85 hover:text-white transition-colors"
          >
            {link.name}
          </a>
        ))}
        <motion.a
          href="#contacto"
          initial="initial"
          whileHover="hover"
          onClick={() => setIsMobileMenuOpen(false)}
          className="relative font-body text-xl tracking-[0.25em] uppercase text-black bg-[#faebd7] px-8 py-4"
        >
          <CornerTicks color="black" />
          Agendar consulta
        </motion.a>
      </motion.div>
    </motion.nav>
  );
}
