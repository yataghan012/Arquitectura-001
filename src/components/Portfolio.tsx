import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { PROJECTS } from '../constants';
import { Project } from '../types';

interface PortfolioProps {
  onProjectClick: (project: Project) => void;
}

export default function Portfolio({ onProjectClick }: PortfolioProps) {
  const [filter, setFilter] = useState<'all' | 'Residencial' | 'Comercial' | 'Institucional'>('all');

  const filteredProjects = PROJECTS.filter(p => filter === 'all' || p.category === filter);

  const categories = ['all', 'Residencial', 'Comercial', 'Institucional'] as const;

  return (
    <section id="portafolio" className="min-h-screen w-full px-[24px] md:px-[96px] py-[80px] md:py-[120px] bg-bg flex flex-col justify-center">
      <div className="max-w-[1400px] mx-auto w-full flex flex-col h-full">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-[24px] shrink-0">
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.2 }}
              className="text-[clamp(40px,5vw,64px)] font-light text-fg leading-[1.1]"
            >
              Portafolio
            </motion.h2>
          </div>
          <motion.span
            initial={{ width: 0 }}
            whileInView={{ width: 120 }}
            transition={{ duration: 1.2, delay: 0.4 }}
            className="hidden md:block h-[1px] bg-border"
          />
        </div>

        <div className="flex gap-[16px] md:gap-[24px] mb-[24px] flex-wrap shrink-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`font-body text-[14px] md:text-[18px] tracking-[0.2em] uppercase bg-none border-none pb-[4px] transition-colors border-b ${
                filter === cat ? 'text-fg border-fg' : 'text-muted border-transparent hover:text-fg'
              }`}
            >
              {cat === 'all' ? 'Todos' : cat}
            </button>
          ))}
        </div>

        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[20px] md:gap-[24px]">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project, i) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              exit={{ opacity: 0, scale: 0.97 }}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: i * 0.1 }}
              onClick={() => onProjectClick(project)}
              className={`flex flex-col group project-card h-full ${project.featured ? 'md:col-span-2' : ''}`}
            >
              <div className={`relative overflow-hidden shadow-sm transition-shadow duration-500 group-hover:shadow-2xl flex-grow ${project.featured ? 'aspect-[4/3] md:aspect-[16/9] md:max-h-[58vh]' : 'aspect-[4/3]'}`}>
                {/* Internal Shutter Reveal for Image */}
                <motion.div 
                  initial={{ scaleY: 1 }}
                  whileInView={{ scaleY: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, ease: [0.76, 0, 0.24, 1], delay: 0.2 + i * 0.1 }}
                  style={{ originY: 0 }}
                  className="absolute inset-0 bg-dark z-10 pointer-events-none"
                />
                <img
                  src={project.images[0]}
                  alt={project.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.06]"
                />
                <div 
                  className="absolute inset-0 flex items-end p-[20px] clip-path-inset-[100%_0_0_0] transition-all duration-[650ms] ease-out group-hover:clip-path-inset-[0%_0_0_0]"
                  style={{ background: 'linear-gradient(to top, rgba(12, 12, 12, 0.75) 0%, rgba(12, 12, 12, 0.05) 60%, transparent 100%)' }}
                >
                  <span className="font-body text-[20px] md:text-[27px] tracking-[0.3em] uppercase text-dark-fg opacity-0 translate-y-[8px] transition-all duration-[400ms] delay-150 group-hover:opacity-100 group-hover:translate-y-0">
                    Ver proyecto →
                  </span>
                </div>
              </div>
              <div className="flex items-start justify-between mt-[14px] pb-[4px] shrink-0">
                <div>
                  <h3 className="text-[18px] md:text-[22px] font-normal text-fg leading-[1.2]">{project.title}</h3>
                  <p className="font-body text-[11px] tracking-[0.2em] uppercase text-muted mt-[4px]">{project.category}</p>
                </div>
                <div className="text-right">
                  <p className="font-body text-[12px] text-muted leading-[1.6]">{project.year}</p>
                  <p className="font-body text-[12px] text-muted leading-[1.6]">{project.area}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
      </div>
    </section>
  );
}
