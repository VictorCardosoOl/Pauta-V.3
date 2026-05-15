import React, { useRef } from 'react';
import { Template } from '../types';
import { Pin, Copy, Check, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTemplateCopier } from '../hooks/useTemplateCopier';
import gsap from 'gsap';

interface EditorialCardProps {
  template: Template;
  onClick: () => void;
  onPin: (id: string) => void;
  isPinned: boolean;
  index: number;
  isHero?: boolean;
}

export const EditorialCard: React.FC<EditorialCardProps> = ({ template, onClick, onPin, isPinned, index, isHero }) => {
  const { copyToClipboard, isCopied } = useTemplateCopier();

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    copyToClipboard(template.content, template.id);
  };

  const handlePin = (e: React.MouseEvent) => {
    e.stopPropagation();
    onPin(template.id);
    
    // Animate the icon
    const icon = e.currentTarget.querySelector('svg');
    if (icon) {
      gsap.to(icon, {
        scale: 1.35,
        duration: 0.15,
        yoyo: true,
        repeat: 1,
        ease: "power1.inOut"
      });
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick();
    }
  };

  const buttonsRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLElement>(null);
  const exploreTextRef = useRef<HTMLSpanElement>(null);
  const exploreIconRef = useRef<HTMLDivElement>(null);
  const arrowRef = useRef<SVGSVGElement>(null);
  
  const handleMouseEnter = () => {
    const tl = gsap.timeline({ defaults: { ease: "power4.out", duration: 0.6 } });

    // Sophisticated card scale and elevation
    if (cardRef.current) {
      tl.to(cardRef.current, {
        scale: 1.02,
        boxShadow: "0 30px 60px -12px rgba(0,0,0,0.08)",
        duration: 0.8,
      }, 0);
    }

    // Smooth button entrance
    if (buttonsRef.current) {
      tl.to(buttonsRef.current, {
        opacity: 1,
        x: 0,
      }, 0.1);
    }

    // Coordinated "Explorar" indicator
    if (exploreTextRef.current) {
      tl.to(exploreTextRef.current, {
        opacity: 1,
        x: 0,
      }, 0.05);
    }

    if (exploreIconRef.current) {
      tl.to(exploreIconRef.current, {
        backgroundColor: "#111111",
        borderColor: "#111111",
      }, 0.05);
    }

    if (arrowRef.current) {
      tl.to(arrowRef.current, {
        rotate: 0,
        color: "#ffffff",
      }, 0.05);
    }
  };

  const handleMouseLeave = () => {
    const tl = gsap.timeline({ defaults: { ease: "power4.inOut", duration: 0.4 } });

    if (cardRef.current) {
      tl.to(cardRef.current, {
        scale: 1,
        boxShadow: "0 0px 0px 0px rgba(0,0,0,0)",
      }, 0);
    }

    if (buttonsRef.current) {
      tl.to(buttonsRef.current, {
        opacity: 0,
        x: -16,
      }, 0);
    }

    if (exploreTextRef.current) {
      tl.to(exploreTextRef.current, {
        opacity: 0,
        x: 48,
      }, 0);
    }

    if (exploreIconRef.current) {
      tl.to(exploreIconRef.current, {
        backgroundColor: "transparent",
        borderColor: "rgba(74, 74, 74, 0.3)", // editorial-gray/30
      }, 0);
    }

    if (arrowRef.current) {
      tl.to(arrowRef.current, {
        rotate: -45,
        color: "#111111",
      }, 0);
    }
  };

  if (isHero) {
    return (
      <motion.article 
        ref={cardRef as any}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        onClick={onClick}
        onKeyDown={handleKeyDown}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onFocus={handleMouseEnter}
        onBlur={handleMouseLeave}
        role="button"
        tabIndex={0}
        aria-label={`Visualizar modelo em destaque: ${template.title}`}
        className="group relative flex flex-col w-full h-full cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-editorial-black"
      >
        <div aria-hidden="true" className="absolute -inset-10 bg-white/40 opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-3xl pointer-events-none rounded-[100px]"></div>
        
        <div className="relative z-10 flex flex-col h-full border border-editorial-gray/20 bg-white/50 backdrop-blur-md p-8 xl:p-12 hover:shadow-[0_40px_80px_-15px_rgba(0,0,0,0.05)] transition-shadow duration-700">
          <div className="flex items-center justify-between mb-12">
            <div className="flex items-center gap-4">
               <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.2em] bg-editorial-black text-white px-4 py-2 rounded-full">
                 Destaque Principal
               </span>
               {isPinned && <Pin size={16} className="fill-editorial-black text-editorial-black" aria-label="Fixado" />}
            </div>
            <time dateTime={new Date().toISOString()} className="font-serif italic text-[var(--text-lg)] text-editorial-gray">
              {new Date().toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}
            </time>
          </div>

          <h2 className="font-sans font-black text-[var(--text-6xl)] leading-[0.9] tracking-tighter mb-12 max-w-4xl text-editorial-black group-hover:text-editorial-gray transition-colors duration-700">
            {template.title}
          </h2>
          
          <div className="flex flex-col md:flex-row gap-12 md:gap-20 items-end mt-auto">
             <p className="font-serif text-[var(--text-xl)] leading-relaxed text-editorial-gray opacity-80 flex-1 max-w-2xl line-clamp-4">
               {template.description || template.content.substring(0, 500) + "..."}
             </p>
             
             <div 
               ref={buttonsRef}
               className="flex items-center gap-3 shrink-0 opacity-0 -translate-x-4"
             >
                <button 
                  onClick={handlePin}
                  aria-pressed={isPinned}
                  aria-label={isPinned ? "Desafixar modelo" : "Fixar modelo"}
                  className="p-4 rounded-full border border-editorial-gray/30 hover:border-editorial-black hover:bg-editorial-black hover:text-white transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-editorial-black"
                  title={isPinned ? "Desafixar" : "Fixar"}
                >
                  <Pin size={20} className={isPinned ? "fill-current" : ""} />
                </button>
                <button 
                  onClick={handleCopy}
                  aria-label="Copiar conteúdo do modelo"
                  className="p-4 rounded-full border border-editorial-gray/30 hover:border-editorial-black hover:bg-editorial-black hover:text-white transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-editorial-black"
                  title="Copiar"
                >
                  {isCopied(template.id) ? <Check size={20} /> : <Copy size={20} />}
                </button>
                <span 
                  aria-hidden="true"
                  className="flex items-center gap-3 font-sans text-xs font-bold uppercase tracking-[0.1em] bg-editorial-black text-white px-8 py-4 rounded-full hover:bg-editorial-gray transition-colors duration-500"
                >
                  Editar <ArrowRight size={16} />
                </span>
             </div>
          </div>
        </div>
      </motion.article>
    );
  }

  return (
    <motion.article 
      ref={cardRef as any}
      initial={{ opacity: 0, scale: 0.95, y: 30 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, margin: "-5%" }}
      transition={{ duration: 0.8, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleMouseEnter}
      onBlur={handleMouseLeave}
      role="button"
      tabIndex={0}
      aria-label={`Visualizar modelo: ${template.title}`}
      className="group flex flex-col cursor-pointer border border-[#e0e0e0] bg-white/40 hover:bg-white p-6 xl:p-8 h-full overflow-hidden relative focus-visible:outline-none focus-visible:border-editorial-black"
    >
      <div aria-hidden="true" className="absolute inset-0 bg-editorial-black transform scale-y-0 origin-bottom group-hover:scale-y-[0.02] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] pointer-events-none"></div>

      <div className="flex items-baseline justify-between mb-8 relative z-10 w-full">
        <span aria-hidden="true" className="font-serif italic text-[var(--text-4xl)] text-editorial-gray/20 group-hover:text-editorial-black transition-colors duration-700 font-light">
          {(index + 1).toString().padStart(2, '0')}
        </span>
        <div className="flex items-center gap-3">
           {isPinned && <Pin size={14} className="fill-editorial-black text-editorial-black" aria-label="Fixado" />}
           <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.15em] text-editorial-gray border border-editorial-gray/20 px-3 py-1.5 rounded-full">
             {template.category}
           </span>
        </div>
      </div>
      
      <h3 className="font-sans font-black text-[var(--text-2xl)] leading-[1.1] mb-6 group-hover:text-editorial-gray transition-colors duration-500 relative z-10 w-full break-words">
        {template.title}
      </h3>
      
      <p className="font-serif text-[var(--text-base)] text-editorial-gray opacity-70 line-clamp-4 mb-8 flex-1 relative z-10 w-full">
        {template.description || template.content.substring(0, 300) + "..."}
      </p>

      <div className="mt-auto flex items-center justify-between pt-6 relative z-10">
        <div 
          ref={buttonsRef}
          className="flex items-center gap-2 opacity-0 -translate-x-4"
        >
           <button 
             onClick={handlePin}
             aria-pressed={isPinned}
             aria-label={isPinned ? "Desafixar modelo" : "Fixar modelo"}
             className="p-3 bg-editorial-bg hover:bg-editorial-gray/10 rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-editorial-black"
             title={isPinned ? "Desafixar" : "Fixar"}
           >
             <Pin size={16} className={isPinned ? "fill-editorial-black" : ""} />
           </button>
           <button 
             onClick={handleCopy}
             aria-label="Copiar conteúdo do modelo"
             className="p-3 bg-editorial-bg hover:bg-editorial-gray/10 rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-editorial-black"
             title="Copiar"
           >
             {isCopied(template.id) ? <Check size={16} /> : <Copy size={16} />}
           </button>
        </div>
        
        <div aria-hidden="true" className="flex items-center gap-3 overflow-hidden ml-auto">
           <span 
             ref={exploreTextRef}
             className="font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-editorial-black transform translate-x-12 opacity-0"
           >
             Explorar
           </span>
           <div 
             ref={exploreIconRef}
             className="w-10 h-10 rounded-full border border-editorial-gray/30 flex items-center justify-center transition-colors duration-500"
           >
               <ArrowRight 
                 ref={arrowRef as any}
                 size={16} 
                 className="text-editorial-black -rotate-45" 
               />
           </div>
        </div>
      </div>
    </motion.article>
  );
};
