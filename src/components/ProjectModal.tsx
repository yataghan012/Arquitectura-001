import { motion, AnimatePresence } from 'motion/react';
import { Project } from '../types';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  if (!project) return null;

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % project.images.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + project.images.length) % project.images.length);

  return (
    <AnimatePresence>
      {project && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-dark/92 backdrop-blur-xl"
          />
          
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.97 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 w-[100vw] h-[100dvh] md:w-[90vw] md:h-[85vh] max-w-[1400px] bg-bg flex flex-col md:flex-row overflow-hidden"
          >
            {/* Shutter Entrance Effect for Modal */}
            <motion.div 
              initial={{ scaleX: 1 }}
              animate={{ scaleX: 0 }}
              transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.2 }}
              style={{ originX: 1 }}
              className="absolute inset-0 bg-dark z-[100] pointer-events-none"
            />
            <button
              onClick={onClose}
              className="absolute top-[24px] right-[24px] z-20 p-[8px] text-fg opacity-50 hover:opacity-100 transition-opacity"
            >
              <X size={24} />
            </button>

            <div className="flex-grow relative bg-[#0c0c0c] overflow-hidden order-2 md:order-1 h-[50%] md:h-auto">
              <div 
                className="h-full flex transition-transform duration-800 ease-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {project.images.map((img, i) => (
                  <div key={i} className="shrink-0 w-full h-full flex items-center justify-center">
                    <img src={img} alt={project.title} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>

              <div className="absolute bottom-[32px] left-[32px] flex gap-[12px]">
                <button
                  onClick={prevSlide}
                  className="w-[48px] h-[48px] bg-white/6 backdrop-blur-sm border border-white/8 text-white flex items-center justify-center hover:bg-white/14 hover:border-white/20 transition-all"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  onClick={nextSlide}
                  className="w-[48px] h-[48px] bg-white/6 backdrop-blur-sm border border-white/8 text-white flex items-center justify-center hover:bg-white/14 hover:border-white/20 transition-all"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
              
              <div className="absolute bottom-[40px] right-[32px] font-body text-[10px] tracking-[0.3em] text-white/30">
                {currentSlide + 1} / {project.images.length}
              </div>
            </div>

            <div className="w-full md:w-[380px] bg-bg p-[32px_24px] md:p-[56px_40px] flex flex-col justify-start md:justify-between border-l border-border shrink-0 overflow-y-auto order-1 md:order-2 h-[50%] md:h-auto">
              <div>
                <span className="font-body text-[10px] tracking-[0.35em] uppercase text-muted mb-[20px] block">
                  {project.category}
                </span>
                <h2 className="text-[28px] md:text-[40px] font-light leading-[1.1] mb-[24px]">{project.title}</h2>
                <p className="font-body text-[13px] leading-[1.9] text-muted mb-[40px]">
                  {project.description}
                </p>
              </div>
              
              <div className="border-t border-border pt-[24px]">
                {[
                  { label: 'Ubicación', value: project.location },
                  { label: 'Año', value: project.year },
                  { label: 'Superficie', value: project.area },
                  ...(project.technicalDetails ? [
                    { label: 'Materiales', value: project.technicalDetails.materials.join(', ') },
                    { label: 'Cliente', value: project.technicalDetails.client || 'Privado' },
                    { label: 'Estado', value: project.technicalDetails.status }
                  ] : [])
                ].map((info) => (
                  <div key={info.label} className="flex justify-between items-start mb-[14px] gap-4">
                    <span className="font-body text-[10px] uppercase tracking-[0.15em] text-muted shrink-0 mt-1">{info.label}</span>
                    <span className="font-body text-[13px] font-medium text-right">{info.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
