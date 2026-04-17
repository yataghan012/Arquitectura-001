import { motion } from 'motion/react';
import React, { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';

export default function Contact() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  
  // Form State
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormState('submitting');
    
    const formData = new FormData(e.currentTarget);
    // Agrega aquí The Web3Forms access key cuando crees tu cuenta
    // Mientras tanto, esto simula una alerta exitosa.
    formData.append("access_key", "YOUR_ACCESS_KEY_HERE");

    try {
      // Simulación de envío de 1.5s
      await new Promise(resolve => setTimeout(resolve, 1500));
      setFormState('success');
      (e.target as HTMLFormElement).reset();
      
      // Ocultar mensaje tras 5 segundos
      setTimeout(() => setFormState('idle'), 5000);
      
    } catch (error) {
      setFormState('error');
      setTimeout(() => setFormState('idle'), 4000);
    }
  };

  return (
    <section id="contacto" className="w-full px-[24px] md:px-[6vw] py-[40px] md:py-[60px] bg-dark">
      <div className="max-w-[1600px] mx-auto w-full flex flex-col h-full py-[20px] md:py-[40px]">
        
        {/* Contact Header */}
        <div className="mb-[60px] md:mb-[100px]">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="text-[clamp(40px,5vw,72px)] font-light text-dark-fg leading-[1.05]"
          >
            Empecemos a<br />
            <em className="italic">proyectar juntos</em>
          </motion.h2>
          
          <motion.span
            initial={{ width: 0 }}
            whileInView={{ width: 64 }}
            transition={{ duration: 1.2, delay: 0.4 }}
            className="block h-[1px] bg-[#f8f4f1]/18 mt-[32px]"
          />
        </div>

        {/* Contact Grid: Form + Info */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] xl:grid-cols-[1fr_500px] gap-[64px] lg:gap-[120px]">
          
          {/* Left Column: Form */}
          <div>
            <motion.form 
              onSubmit={handleSubmit}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.3 }}
              className="flex flex-col gap-[40px]"
            >
              {/* Name & Email Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-[40px]">
                <div className="relative group">
                  <input 
                    type="text" 
                    id="name"
                    name="name"
                    required
                    placeholder="Tu nombre completo"
                    className="w-full bg-transparent border-b border-[#f8f4f1]/30 py-[16px] text-[#f8f4f1] font-body text-[18px] md:text-[22px] focus:outline-none focus:border-[#f8f4f1] transition-colors placeholder:text-[#f8f4f1]/20 rounded-none"
                  />
                </div>
                <div className="relative group">
                  <input 
                    type="email" 
                    id="email"
                    name="email"
                    required
                    placeholder="Tu correo electrónico"
                    className="w-full bg-transparent border-b border-[#f8f4f1]/30 py-[16px] text-[#f8f4f1] font-body text-[18px] md:text-[22px] focus:outline-none focus:border-[#f8f4f1] transition-colors placeholder:text-[#f8f4f1]/20 rounded-none"
                  />
                </div>
              </div>

              {/* Message */}
              <div className="relative group">
                <textarea 
                  id="message"
                  name="message"
                  required
                  rows={4}
                  placeholder="Contanos sobre tu proyecto: dimensiones, ubicación, estilo buscado..."
                  className="w-full bg-transparent border-b border-[#f8f4f1]/30 py-[16px] text-[#f8f4f1] font-body text-[18px] md:text-[22px] focus:outline-none focus:border-[#f8f4f1] transition-colors placeholder:text-[#f8f4f1]/20 resize-none min-h-[140px] rounded-none"
                />
              </div>

              {/* Submit Button & Status */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mt-[20px]">
                <motion.div
                  id="ctaMagnetic"
                  className="inline-block"
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                >
                  <button
                    type="submit"
                    disabled={formState === 'submitting'}
                    className="relative inline-block border border-[#f8f4f1]/25 px-[36px] py-[16px] font-body text-[16px] md:text-[20px] tracking-[0.25em] uppercase text-[#f8f4f1] hover:bg-[#f8f4f1] hover:text-dark hover:border-[#f8f4f1] transition-colors disabled:opacity-50 disabled:pointer-events-none"
                  >
                    {formState === 'submitting' ? (
                      <span className="flex items-center gap-3">
                        <Loader2 className="w-5 h-5 animate-spin" /> 
                        Enviando
                      </span>
                    ) : (
                      'Enviar mensaje'
                    )}
                  </button>
                </motion.div>

                {formState === 'success' && (
                  <motion.p 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-green-400 font-body text-[16px] tracking-[0.1em]"
                  >
                    Tu mensaje fue enviado con éxito.
                  </motion.p>
                )}
                {formState === 'error' && (
                  <motion.p 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-red-400 font-body text-[16px] tracking-[0.1em]"
                  >
                    Hubo un error. Vuelve a intentarlo.
                  </motion.p>
                )}
              </div>
            </motion.form>
          </div>

          {/* Right Column: Info */}
          <div className="flex flex-col gap-[36px] pl-0 lg:pl-[40px] xl:pl-[80px] lg:border-l lg:border-[#f8f4f1]/10">
            {[
              { label: 'Email', value: 'info@sgiarquitectura.com' },
              { label: 'Teléfono', value: '+54 351 000 0000' },
              { label: 'Estudio', value: 'Nueva Córdoba, Arg' },
            ].map((info, i) => (
              <motion.div
                key={info.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.5 + i * 0.1 }}
              >
                <span className="font-body text-[15px] md:text-[18px] tracking-[0.35em] uppercase text-[#f8f4f1]/25 mb-[8px] block">
                  {info.label}
                </span>
                <p className="font-body text-[18px] md:text-[24px] text-[#f8f4f1]/70">{info.value}</p>
              </motion.div>
            ))}
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.8 }}
              className="mt-[20px]"
            >
              <span className="font-body text-[15px] md:text-[18px] tracking-[0.35em] uppercase text-[#f8f4f1]/25 mb-[8px] block">
                Redes
              </span>
              <div className="flex gap-[24px]">
                <a href="#" className="font-body text-[18px] md:text-[22px] text-[#f8f4f1]/70 hover:text-white hover:underline underline-offset-4 transition-all">Instagram</a>
                <a href="#" className="font-body text-[18px] md:text-[22px] text-[#f8f4f1]/70 hover:text-white hover:underline underline-offset-4 transition-all">LinkedIn</a>
              </div>
            </motion.div>
          </div>

        </div>

        <motion.footer
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="border-t border-[#f8f4f1]/10 pt-[24px] mt-[80px] md:mt-[120px] flex flex-col sm:flex-row items-center justify-between gap-[16px] text-center shrink-0"
        >
          <p className="font-body text-[13px] md:text-[15px] tracking-[0.2em] uppercase text-[#f8f4f1]/25">
            © 2025 SGI Arquitectura. Todos los derechos reservados.
          </p>
          <p className="font-body text-[13px] md:text-[15px] tracking-[0.2em] uppercase text-[#f8f4f1]/25">
             ESTUDIO
          </p>
        </motion.footer>
      </div>
    </section>
  );
}
