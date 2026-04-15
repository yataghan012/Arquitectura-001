import { motion, AnimatePresence } from 'motion/react';
import { useEffect, useState } from 'react';

const SLIDES = [
  import.meta.env.BASE_URL + 'sitio original/assets/about-slide-1.png',
  import.meta.env.BASE_URL + 'sitio original/assets/about-slide-2.png',
  import.meta.env.BASE_URL + 'sitio original/assets/about-slide-3.png',
];

const STATS = [
  { value: 12, suffix: '+', label: 'Años de experiencia' },
  { value: 85, suffix: '', label: 'Proyectos realizados' },
  { value: 15, suffix: 'k', label: 'm² diseñados' },
];

function CountUp({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 1800;
    const startTime = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(easeOut * value));
      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  }, [value]);

  return <>{count}{suffix}</>;
}

export default function About() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="estudio" className="min-h-[100dvh] md:h-screen w-full bg-bg overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-2 h-full">
        {/* Visual Column */}
        <div className="relative overflow-hidden hidden md:block h-full">
          <div className="h-full overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.img
                key={currentSlide}
                src={SLIDES[currentSlide]}
                initial={{ opacity: 0, scale: 1.02 }}
                animate={{ opacity: 1, scale: 1.06 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.8, ease: 'easeInOut' }}
                className="absolute inset-0 w-full h-full object-cover brightness-[0.55]"
              />
            </AnimatePresence>
            <div className="absolute bottom-12 left-12 flex flex-col gap-1">
              <span className="font-display text-[64px] font-light text-dark-fg/85 leading-none tracking-tight">SGI</span>
              <span className="font-display text-[64px] font-light text-dark-fg/85 leading-none tracking-tight">Arquitectura</span>
            </div>
          </div>
        </div>

        {/* Content Column */}
        <div className="p-[40px_24px] md:p-[60px_80px] flex flex-col justify-center h-full">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="text-[clamp(36px,5vw,64px)] font-light text-fg leading-[1.1] mb-[32px]"
          >
            Cada espacio<br />
            <em className="italic">cuenta algo</em>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3 }}
            className="font-body text-[14px] md:text-[18px] leading-[1.8] text-muted mb-[20px] max-w-[800px]"
          >
            SGI Arquitectura nace en Córdoba con una premisa clara: que la arquitectura no es solo
            estructura, sino la experiencia de quien la habita. Trabajamos con departamentos,
            PyMEs y edificios municipales entendiendo que cada proyecto tiene su propia narrativa,
            su escala y sus desafíos técnicos únicos.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.4 }}
            className="font-body text-[14px] md:text-[18px] leading-[1.8] text-muted mb-[24px] max-w-[800px]"
          >
            Nuestro proceso integra diseño y ejecución técnica desde el primer trazo,
            eliminando la distancia entre la idea y la obra construida.
          </motion.p>

          <div className="flex flex-col md:flex-row gap-0 mt-[32px] border-t border-border">
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.9, delay: 0.5 + i * 0.1 }}
                className={`flex-1 py-[20px] md:py-[28px] border-b md:border-b-0 md:border-r border-border md:pr-[24px] last:border-none last:pl-0 md:last:pl-[24px] first:pl-0 relative overflow-hidden`}
              >
                {/* Shutter Reveal for Stat */}
                <motion.div 
                  initial={{ scaleX: 1 }}
                  whileInView={{ scaleX: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, ease: [0.76, 0, 0.24, 1], delay: 0.3 + i * 0.1 }}
                  style={{ originX: 0 }}
                  className="absolute inset-0 bg-dark z-10 pointer-events-none"
                />
                <span className="font-display text-[36px] md:text-[48px] font-light text-fg tabular-nums leading-none block">
                  <CountUp value={stat.value} suffix={stat.suffix} />
                </span>
                <span className="font-body text-[11px] tracking-[0.2em] uppercase text-muted mt-[8px] block">
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
