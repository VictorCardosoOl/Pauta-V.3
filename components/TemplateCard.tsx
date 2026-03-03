import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Pin, Copy, Check } from 'lucide-react';
import { Template } from '../types';
import { HighlightedText } from './HighlightedText';

interface TemplateCardProps {
  template: Template;
  searchQuery: string;
  onClick: () => void;
  index: number;
  isPinned: boolean;
  onTogglePin: (id: string) => void;
}

export const TemplateCard: React.FC<TemplateCardProps> = ({ template, searchQuery, onClick, index, isPinned, onTogglePin }) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!template.content) return;

    try {
      await navigator.clipboard.writeText(template.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <motion.div
      role="button"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      onClick={onClick}
      className="
        group relative flex flex-col items-start text-left p-10 h-full w-full 
        bg-white 
        border border-[#E5E5E5]
        rounded-[24px]
        hover:border-[#111111]
        transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]
        will-change-transform
        cursor-pointer
        focus-visible:ring-1 focus-visible:ring-black focus-visible:ring-offset-4 outline-none
      "
    >
      {/* Copy Button */}
      <button 
        onClick={handleCopy}
        className={`
          absolute top-8 right-20 z-10 w-8 h-8 flex items-center justify-center rounded-full border border-transparent
          transition-all duration-300
          focus-visible:opacity-100 focus-visible:bg-black/5
          ${copied 
            ? 'text-emerald-600 bg-emerald-50 opacity-100' 
            : 'text-[#999999] opacity-0 group-hover:opacity-100 hover:text-[#111111] hover:border-[#E5E5E5]'
          }
        `}
        title="Copiar conteúdo"
        aria-label="Copiar conteúdo"
      >
        {copied ? <Check size={14} strokeWidth={1.5} /> : <Copy size={14} strokeWidth={1} />}
      </button>

      {/* Pin Button */}
      <button 
        onClick={(e) => {
          e.stopPropagation();
          onTogglePin(template.id);
        }}
        className={`
          absolute top-8 right-8 z-10 w-8 h-8 flex items-center justify-center rounded-full border border-transparent
          transition-all duration-300
          focus-visible:opacity-100 focus-visible:bg-black/5
          ${isPinned 
            ? 'text-[#111111] opacity-100' 
            : 'text-[#999999] opacity-0 group-hover:opacity-100 hover:text-[#111111] hover:border-[#E5E5E5]'
          }
        `}
        title={isPinned ? "Remover dos favoritos" : "Fixar nos favoritos"}
        aria-label={isPinned ? "Remover dos favoritos" : "Fixar nos favoritos"}
      >
        <Pin size={14} strokeWidth={isPinned ? 1.5 : 1} className={isPinned ? "fill-current" : ""} />
      </button>

      <div className="w-full flex flex-col h-full pointer-events-none">
        
        {/* Header: Minimal Tag */}
        <div className="flex items-center gap-3 mb-8">
          <span className="text-[9px] font-medium tracking-[0.2em] uppercase text-[#999999] border-b border-transparent group-hover:border-[#111111] group-hover:text-[#111111] transition-colors duration-500 pb-0.5">
            {template.channel === 'EMAIL' ? 'Email' : (template.channel === 'PROMPT' ? 'Prompt' : 'Chat')}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-3xl md:text-4xl font-serif italic-editorial text-[#111111] mb-6 leading-[1.05] w-full pr-8 group-hover:translate-x-1 transition-transform duration-500">
            <HighlightedText text={template.title} highlight={searchQuery} />
        </h3>
        
        {/* Description */}
        <p className="text-[13px] leading-[1.8] text-[#666666] line-clamp-3 font-sans w-full font-light group-hover:text-[#333333] transition-colors duration-500">
            <HighlightedText text={template.description || ''} highlight={searchQuery} />
        </p>

        {/* Footer: Action */}
        <div className="mt-auto pt-10 w-full flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 group-focus-visible:opacity-100">
            <span className="text-[9px] font-medium uppercase tracking-[0.2em] text-[#111111]">
              Ler mais
            </span>
            <ArrowRight size={12} className="text-[#111111] -translate-x-2 group-hover:translate-x-0 transition-transform duration-500" />
        </div>
      </div>
    </motion.div>
  );
};
