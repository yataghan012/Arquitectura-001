import { motion } from 'motion/react';
import { useState, useEffect } from 'react';

export default function Contact() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!isHovered) {
      setMousePos({ x: 0, y: 0 });
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      const wrap = document.getElementById('ctaMagnetic');
      if (!wrap) return;
      const rect = wrap.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      setMousePos({
        x: (e.clientX - cx) * 0.35,
        y: (e.clientY - cy) * 0.35,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isHovered]);

  return (
    <section id="contacto" className="min-h-[100dvh] md:h-screen w-full px-[24px] md:px-[96px] py-[80px] md:py-0 bg-dark flex flex-col justify-center overflow-hidden">
      <div className="max-w-[1400px] mx-auto w-full flex flex-col h-full py-[40px] md:py-[60px] justify-center">
        <div className="grid grid-cols-1 md:grid-cols-[7fr_4fr] gap-[48px] md:gap-[64px] items-end">
        <div>
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="text-[clamp(40px,5vw,72px)] font-light text-dark-fg leading-[1.05] mb-[32px] mt-[24px]"
          >
            Empecemos a<br />
            <em className="italic">proyectar juntos</em>
          </motion.h2>
          
          <motion.span
            initial={{ width: 0 }}
            whileInView={{ width: 64 }}
            transition={{ duration: 1.2, delay: 0.4 }}
            className="block h-[1px] bg-[#f8f4f1]/18 mb-[32px]"
          />
          
          <motion.p
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.5 }}
            className="font-body text-[25px] leading-[1.9] text-[#f8f4f1]/45 max-w-[600px]"
          >
            Contanos sobre tu proyecto. Agendá una consulta inicial sin cargo
            y exploremos las posibilidades de tu espacio.
          </motion.p>

          <motion.div
            id="ctaMagnetic"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.6 }}
            className="inline-block mt-[36px]"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <motion.a
              href="mailto:info@sgiarquitectura.com"
              initial="initial"
              whileHover="hover"
              className="relative inline-block border border-[#f8f4f1]/25 px-[36px] py-[14px] font-body text-[20px] tracking-[0.25em] uppercase text-dark-fg hover:bg-dark-fg hover:text-dark hover:border-dark-fg"
            >
              {/* Corner Ticks */}
              <svg 
                className="absolute inset-[-10px] w-[calc(100%+20px)] h-[calc(100%+20px)] pointer-events-none overflow-visible"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
              >
                <motion.path
                  d="M 0 15 L 0 0 L 15 0"
                  fill="none"
                  stroke="#f8f4f1"
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
                  stroke="#f8f4f1"
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
                  stroke="#f8f4f1"
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
                  stroke="#f8f4f1"
                  strokeWidth="2"
                  vectorEffect="non-scaling-stroke"
                  variants={{
                    initial: { pathLength: 0, opacity: 0 },
                    hover: { pathLength: 1, opacity: 1 }
                  }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                />
              </svg>
              Agendar consulta
            </motion.a>
          </motion.div>
        </div>

        <div className="flex flex-col gap-[28px]">
          {[
            { label: 'Email', value: 'info@sgiarquitectura.com' },
            { label: 'Teléfono', value: '+54 351 000 0000' },
            { label: 'Ubicación', value: 'Córdoba, Argentina' },
          ].map((info, i) => (
            <motion.div
              key={info.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.7 + i * 0.1 }}
            >
              <span className="font-body text-[16px] md:text-[20px] tracking-[0.35em] uppercase text-[#f8f4f1]/25 mb-[6px] block">
                {info.label}
              </span>
              <p className="font-body text-[20px] md:text-[26px] text-[#f8f4f1]/65">{info.value}</p>
            </motion.div>
          ))}
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1 }}
          >
            <span className="font-body text-[20px] tracking-[0.35em] uppercase text-[#f8f4f1]/25 mb-[6px] block">
              Redes
            </span>
            <div className="flex gap-[20px]">
              <a href="#" className="font-body text-[23px] text-[#f8f4f1]/65 hover:text-dark-fg transition-colors">Instagram</a>
              <a href="#" className="font-body text-[23px] text-[#f8f4f1]/65 hover:text-dark-fg transition-colors">LinkedIn</a>
            </div>
          </motion.div>
        </div>
      </div>

      <motion.footer
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
        className="border-t border-border-dark pt-[20px] mt-[40px] md:mt-[60px] flex flex-col md:flex-row items-center justify-between gap-[12px] text-center shrink-0"
      >
        <p className="font-body text-[15px] tracking-[0.2em] uppercase text-[#f8f4f1]/25">
          © 2025 SGI Arquitectura. Todos los derechos reservados.
        </p>
        <p className="font-body text-[15px] tracking-[0.2em] uppercase text-[#f8f4f1]/25">
          Córdoba, Argentina
        </p>
      </motion.footer>
      </div>
    </section>
  );
}
