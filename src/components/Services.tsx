import { motion } from 'motion/react';
import { SERVICES } from '../constants';

export default function Services() {
  return (
    <section id="servicios" className="min-h-screen w-full px-[24px] md:px-[96px] py-[80px] md:py-[120px] bg-dark flex flex-col justify-center">
      <div className="mb-[32px] md:mb-[48px]">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="text-[clamp(40px,5vw,64px)] font-light text-dark-fg leading-[1.1]"
        >
          Servicios
        </motion.h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 border-t border-border-dark">
        {SERVICES.map((service, i) => (
          <motion.div
            key={service.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2 + i * 0.1 }}
            className="border-b border-border-dark py-[28px] md:p-[36px_40px_36px_0] relative overflow-hidden group"
          >
            {/* Shutter Reveal for Service */}
            <motion.div 
              initial={{ scaleX: 1 }}
              whileInView={{ scaleX: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1], delay: 0.3 + i * 0.1 }}
              style={{ originX: 0 }}
              className="absolute inset-0 bg-dark z-10 pointer-events-none"
            />
            <div className="absolute bottom-0 left-0 h-[1px] w-0 bg-[#f8f4f1]/50 transition-all duration-700 ease-out group-hover:w-full" />
            
            <div className="flex items-baseline gap-[20px] mb-0">
              <span className="font-body text-[20px] tracking-[0.3em] text-[#f8f4f1]/25 shrink-0">
                {service.number}
              </span>
              <h3 className="text-[clamp(45px,3vw,60px)] font-normal text-dark-fg flex-grow transition-transform duration-400 ease-out group-hover:translate-x-[6px]">
                {service.title}
              </h3>
              <span className="text-[20px] text-[#f8f4f1]/20 transition-all duration-300 ease-out shrink-0 group-hover:text-[#f8f4f1]/70 group-hover:translate-x-[4px] group-hover:-translate-y-[4px]">
                ↗
              </span>
            </div>
            
            <p className="font-body text-[16px] md:text-[22px] leading-[1.8] text-[#f8f4f1]/45 max-w-[600px] max-h-0 overflow-hidden opacity-0 mt-0 transition-all duration-500 ease-out group-hover:max-h-[120px] group-hover:opacity-100 group-hover:mt-[16px] md:block hidden">
              {service.description}
            </p>
            {/* Mobile always visible */}
            <p className="font-body text-[16px] md:text-[22px] leading-[1.8] text-[#f8f4f1]/45 mt-[12px] md:hidden">
              {service.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
