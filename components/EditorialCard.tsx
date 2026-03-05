import React from 'react';
import { Template } from '../types';
import { ArrowUpRight, Pin, Copy, Edit, Check } from 'lucide-react';
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
        className="group relative flex flex-col w-full h-full cursor-pointer border-b border-editorial-black pb-12 mb-12"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
             <span className="font-sans text-xs font-bold uppercase tracking-widest bg-editorial-black text-white px-2 py-1">
               Destaque
             </span>
             {isPinned && <Pin size={14} className="fill-editorial-black text-editorial-black" />}
          </div>
          <span className="font-serif italic text-lg text-editorial-gray">
            {new Date().toLocaleDateString('pt-BR', { month: 'long', day: 'numeric', year: 'numeric' })}
          </span>
        </div>

        <div className="flex flex-col h-full">
          <h2 className="font-sans font-bold text-5xl md:text-7xl lg:text-8xl leading-[0.9] tracking-tighter mb-8 group-hover:underline decoration-2 underline-offset-8 max-w-4xl">
            {template.title}
          </h2>
          
          <div className="flex flex-col md:flex-row gap-8 md:gap-16 items-start">
             <p className="font-serif text-2xl md:text-3xl leading-relaxed text-editorial-gray line-clamp-4 flex-1">
               {template.description || template.content.substring(0, 200) + "..."}
             </p>
             
             <div className="mt-auto flex flex-col items-end gap-4 shrink-0">
               <div className="flex items-center gap-2">
                  <button 
                    onClick={handlePin}
                    className="p-3 rounded-full border border-editorial-black/20 hover:border-editorial-black hover:bg-editorial-black/5 transition-colors"
                    title={isPinned ? "Desafixar" : "Fixar"}
                  >
                    <Pin size={18} className={isPinned ? "fill-current" : ""} />
                  </button>
                  <button 
                    onClick={handleCopy}
                    className="p-3 rounded-full border border-editorial-black/20 hover:border-editorial-black hover:bg-editorial-black/5 transition-colors"
                    title="Copiar"
                  >
                    {isCopied(template.id) ? <Check size={18} /> : <Copy size={18} />}
                  </button>
                  <button 
                    onClick={handleEdit}
                    className="flex items-center gap-2 font-sans text-sm font-bold uppercase tracking-widest border border-editorial-black/20 px-6 py-3 rounded-full hover:border-editorial-black hover:bg-editorial-black/5 transition-colors"
                  >
                    Editar <Edit size={16} />
                  </button>
               </div>
             </div>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-5%" }}
      transition={{ duration: 0.6, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
      onClick={onClick}
      className="group flex flex-col border-t border-editorial-black py-8 cursor-pointer hover:bg-white/50 transition-colors px-4 -mx-4 h-full relative"
    >
      <div className="flex items-baseline justify-between mb-4">
        <span className="font-serif italic text-5xl text-editorial-black/10 group-hover:text-editorial-black transition-colors">
          {(index + 1).toString().padStart(2, '0')}
        </span>
        <div className="flex items-center gap-2">
           {isPinned && <Pin size={14} className="fill-editorial-black text-editorial-black" />}
           <span className="font-sans text-[10px] uppercase tracking-widest text-editorial-gray border border-editorial-gray/30 px-2 py-1 rounded-full">
             {template.category}
           </span>
        </div>
      </div>
      
      <h3 className="font-sans font-bold text-2xl md:text-3xl leading-tight mb-4 group-hover:underline decoration-1 underline-offset-4 pr-12">
        {template.title}
      </h3>
      
      <p className="font-serif text-lg text-editorial-gray line-clamp-3 mb-6 flex-1">
        {template.description}
      </p>

      <div className="mt-auto flex items-center justify-between border-t border-editorial-black/10 pt-4">
        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
           <button 
             onClick={handlePin}
             className="p-2 hover:bg-editorial-black/10 rounded-full transition-colors"
             title={isPinned ? "Desafixar" : "Fixar"}
           >
             <Pin size={16} className={isPinned ? "fill-editorial-black" : ""} />
           </button>
           <button 
             onClick={handleCopy}
             className="p-2 hover:bg-editorial-black/10 rounded-full transition-colors"
             title="Copiar"
           >
             {isCopied(template.id) ? <Check size={16} /> : <Copy size={16} />}
           </button>
        </div>
        
        <div className="flex items-center gap-2 group-hover:translate-x-0 translate-x-2 transition-transform">
           <span className="font-sans text-[10px] uppercase tracking-widest text-editorial-gray group-hover:text-editorial-black transition-colors">Editar</span>
           <ArrowUpRight size={18} className="opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
      </div>
    </motion.div>
  );
};
