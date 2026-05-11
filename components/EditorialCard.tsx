import React from 'react';
import { Template } from '../types';
import { ArrowUpRight, Pin, Copy, Edit, Check, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTemplateCopier } from '../hooks/useTemplateCopier';

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
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClick();
  };

  if (isHero) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        onClick={onClick}
        className="group relative flex flex-col w-full cursor-pointer"
      >
        <div className="absolute -inset-10 bg-white/40 opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-3xl pointer-events-none rounded-[100px]"></div>
        
        <div className="relative z-10 flex flex-col border border-editorial-gray/20 bg-white/50 backdrop-blur-md p-10 xl:p-14 hover:shadow-[0_40px_80px_-15px_rgba(0,0,0,0.05)] transition-shadow duration-700">
          <div className="flex items-center justify-between mb-16">
            <div className="flex items-center gap-4">
               <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.2em] bg-editorial-black text-white px-4 py-2 rounded-full">
                 Destaque Principal
               </span>
               {isPinned && <Pin size={16} className="fill-editorial-black text-editorial-black" />}
            </div>
            <span className="font-serif italic text-[var(--text-lg)] text-editorial-gray">
              {new Date().toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}
            </span>
          </div>

          <h2 className="font-sans font-black text-[var(--text-6xl)] leading-[0.9] tracking-tighter mb-12 max-w-4xl text-editorial-black group-hover:text-editorial-gray transition-colors duration-700">
            {template.title}
          </h2>
          
          <div className="flex flex-col md:flex-row gap-12 md:gap-20 items-end mt-8">
             <p className="font-serif text-[var(--text-xl)] leading-relaxed text-editorial-gray opacity-80 flex-1 max-w-2xl line-clamp-4">
               {template.description || template.content.substring(0, 500) + "..."}
             </p>
             
             <div className="flex items-center gap-3 shrink-0">
                <button 
                  onClick={handlePin}
                  className="p-4 rounded-full border border-editorial-gray/30 hover:border-editorial-black hover:bg-editorial-black hover:text-white transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
                  title={isPinned ? "Desafixar" : "Fixar"}
                >
                  <Pin size={20} className={isPinned ? "fill-current" : ""} />
                </button>
                <button 
                  onClick={handleCopy}
                  className="p-4 rounded-full border border-editorial-gray/30 hover:border-editorial-black hover:bg-editorial-black hover:text-white transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
                  title="Copiar"
                >
                  {isCopied(template.id) ? <Check size={20} /> : <Copy size={20} />}
                </button>
                <button 
                  onClick={handleEdit}
                  className="flex items-center gap-3 font-sans text-xs font-bold uppercase tracking-[0.1em] bg-editorial-black text-white px-8 py-4 rounded-full hover:bg-editorial-gray transition-colors duration-500"
                >
                  Editar <Edit size={16} />
                </button>
             </div>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95, y: 30 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, margin: "-5%" }}
      transition={{ duration: 0.8, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
      onClick={onClick}
      className="group flex flex-col cursor-pointer border border-[#e0e0e0] bg-white/40 hover:bg-white p-8 xl:p-10 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] h-full overflow-hidden relative"
    >
      <div className="absolute inset-0 bg-editorial-black transform scale-y-0 origin-bottom group-hover:scale-y-[0.02] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] pointer-events-none"></div>

      <div className="flex items-baseline justify-between mb-10 relative z-10 w-full">
        <span className="font-serif italic text-[var(--text-4xl)] text-editorial-gray/20 group-hover:text-editorial-black transition-colors duration-700 font-light">
          {(index + 1).toString().padStart(2, '0')}
        </span>
        <div className="flex items-center gap-3">
           {isPinned && <Pin size={14} className="fill-editorial-black text-editorial-black" />}
           <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.15em] text-editorial-gray border border-editorial-gray/20 px-3 py-1.5 rounded-full">
             {template.category}
           </span>
        </div>
      </div>
      
      <h3 className="font-sans font-black text-[var(--text-2xl)] leading-[1.1] mb-6 group-hover:text-editorial-gray transition-colors duration-500 relative z-10 w-full break-words">
        {template.title}
      </h3>
      
      <p className="font-serif text-[var(--text-base)] text-editorial-gray opacity-70 line-clamp-4 mb-10 flex-1 relative z-10 w-full">
        {template.description || template.content.substring(0, 300) + "..."}
      </p>

      <div className="mt-auto flex items-center justify-between pt-6 relative z-10">
        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -translate-x-4 group-hover:translate-x-0 ease-[cubic-bezier(0.16,1,0.3,1)]">
           <button 
             onClick={handlePin}
             className="p-3 bg-editorial-bg hover:bg-editorial-gray/10 rounded-full transition-colors"
             title={isPinned ? "Desafixar" : "Fixar"}
           >
             <Pin size={16} className={isPinned ? "fill-editorial-black" : ""} />
           </button>
           <button 
             onClick={handleCopy}
             className="p-3 bg-editorial-bg hover:bg-editorial-gray/10 rounded-full transition-colors"
             title="Copiar"
           >
             {isCopied(template.id) ? <Check size={16} /> : <Copy size={16} />}
           </button>
        </div>
        
        <div className="flex items-center gap-3 overflow-hidden ml-auto">
           <span className="font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-editorial-black transform translate-x-12 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]">Explorar</span>
           <div className="w-10 h-10 rounded-full border border-editorial-gray/30 flex items-center justify-center group-hover:bg-editorial-black group-hover:border-editorial-black transition-colors duration-500">
               <ArrowRight size={16} className="text-editorial-black group-hover:text-white transition-colors duration-500 -rotate-45 group-hover:rotate-0" />
           </div>
        </div>
      </div>
    </motion.div>
  );
};
