import { motion } from 'motion/react';

const PHILOSOPHY_ITEMS = [
  { 
    title: 'Luz', 
    description: 'La luz como herramienta fundamental para esculpir el espacio y definir la atmósfera.',
    image: 'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&q=80&w=800',
    widthClass: 'w-full md:w-[calc(50%-8px)] lg:w-[calc(50%-1px)]'
  },
  { 
    title: 'Material', 
    description: 'La honestidad de los materiales en su estado puro, celebrando su textura y envejecimiento.',
    image: 'https://images.unsplash.com/photo-1516455590571-18256e5bb9ff?auto=format&fit=crop&q=80&w=800',
    widthClass: 'w-full md:w-[calc(50%-8px)] lg:w-[calc(50%-1px)]'
  },
  { 
    title: 'Contexto', 
    description: 'Arquitectura que dialoga con su entorno, respetando la historia y el paisaje local.',
    image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&q=80&w=800',
    widthClass: 'w-full md:w-[calc(50%-8px)] lg:w-[calc(25%-1.5px)]'
  },
  { 
    title: 'Habitabilidad', 
    description: 'Diseño centrado en el ser humano, creando espacios que mejoran la calidad de vida.',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800',
    widthClass: 'w-full md:w-full lg:w-[calc(75%-1.5px)]'
  },
];

export default function Philosophy() {
  return (
    <section id="filosofia" className="w-full px-[24px] md:px-[96px] py-[40px] md:py-[60px] bg-dark text-[#f8f4f1]">
      <div className="max-w-[1400px] mx-auto w-full">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="text-[clamp(32px,4vw,60px)] font-light leading-[1.1] mb-[40px] md:mb-[64px]"
        >
          Nuestra <em className="italic">Filosofía</em>
        </motion.h2>

        <div className="flex flex-wrap gap-2 md:gap-4 lg:gap-[2px]">
          {PHILOSOPHY_ITEMS.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
              className={`relative bg-dark p-[24px] md:p-[40px] flex flex-col justify-end group overflow-hidden cursor-pointer min-h-[200px] md:min-h-[300px] flex-grow ${item.widthClass}`}
              whileTap={{ scale: 0.98 }}
            >
              {/* Animated Borders (Option 6) */}
              <motion.div 
                initial={{ width: 0 }}
                whileInView={{ width: '100%' }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.5 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="absolute top-0 left-0 h-[1px] bg-[#f8f4f1]/20 z-20"
              />
              <motion.div 
                initial={{ height: 0 }}
                whileInView={{ height: '100%' }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.7 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="absolute top-0 right-0 w-[1px] bg-[#f8f4f1]/20 z-20"
              />
              <motion.div 
                initial={{ width: 0 }}
                whileInView={{ width: '100%' }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.9 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="absolute bottom-0 right-0 h-[1px] bg-[#f8f4f1]/20 z-20"
              />
              <motion.div 
                initial={{ height: 0 }}
                whileInView={{ height: '100%' }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 1.1 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="absolute bottom-0 left-0 w-[1px] bg-[#f8f4f1]/20 z-20"
              />

              {/* Atmospheric Background Image */}
              <div 
                className="absolute inset-0 z-0 opacity-[0.65] mix-blend-normal transition-all duration-[800ms] ease-out group-hover:opacity-[0.9] group-hover:scale-105"
                style={{ 
                  backgroundImage: `url(${item.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              />
              
              {/* Gradient Overlay for legibility (Option C: Solid Base Shadow) */}
              <div className="absolute inset-x-0 bottom-0 h-3/4 z-[1] bg-gradient-to-t from-dark via-dark/70 to-transparent opacity-100 transition-opacity duration-500 group-hover:opacity-90" />

              {/* Text Content Container (Option 1: Natural Flow) */}
              <div className="relative z-10 flex flex-col gap-4">
                <h3 className="text-[20px] md:text-[24px] font-medium tracking-[0.12em] uppercase text-white transition-transform duration-500 md:group-hover:-translate-y-1">
                  {item.title}
                </h3>
                <p className="font-body text-[14px] md:text-[16px] leading-[1.6] text-white/90 transition-all duration-500 opacity-100 md:opacity-0 md:group-hover:opacity-100 translate-y-0 md:translate-y-[10px] md:group-hover:translate-y-0 max-w-[90%]">
                  {item.description}
                </p>
              </div>
              
              {/* Decorative background reveal */}
              <div className="absolute inset-0 bg-[#f8f4f1]/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100 z-[2]" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
