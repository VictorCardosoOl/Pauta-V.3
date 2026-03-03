import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ArrowRight, CornerDownLeft, FileText, Layers, Hash, Copy, Check } from 'lucide-react';
import { useAppContext } from '../hooks/useAppContext';
import { CommunicationChannel, Template } from '../types';
import { useFocusTrap } from '../hooks/useFocusTrap';

const CommandMenuContent: React.FC = () => {
  const { setIsSearchModalOpen, setSelectedTemplate, templates } = useAppContext();
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  
  const focusTrapRef = useFocusTrap(true);

  // Focus input when opened
  useEffect(() => {
    const timer = setTimeout(() => inputRef.current?.focus(), 50);
    return () => clearTimeout(timer);
  }, []);

  // Filter Logic
  const filteredItems = useMemo(() => {
    const safeTemplates = templates || [];
    if (!query.trim()) return safeTemplates.slice(0, 5); // Show recent/top 5 initially
    
    const normalize = (str: string) => str ? str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase() : "";
    const q = normalize(query.trim());

    return safeTemplates.filter(t => {
      const fields = [t.title, t.description, t.content, t.subject, t.secondaryContent];
      return fields.some(field => normalize(field || '').includes(q));
    });
  }, [query, templates]);

  const handleSelect = useCallback((template: Template) => {
    setSelectedTemplate(template);
    setIsSearchModalOpen(false);
  }, [setSelectedTemplate, setIsSearchModalOpen]);

  const handleCopy = async (e: React.MouseEvent, template: Template) => {
    e.stopPropagation();
    if (!template.content) return;

    try {
      await navigator.clipboard.writeText(template.content);
      setCopiedId(template.id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };

  // Handle Keyboard Navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(prev => (prev + 1) % filteredItems.length);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(prev => (prev - 1 + filteredItems.length) % filteredItems.length);
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filteredItems[selectedIndex]) {
          handleSelect(filteredItems[selectedIndex]);
        }
      } else if (e.key === 'Escape') {
        setIsSearchModalOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [filteredItems, selectedIndex, setIsSearchModalOpen, handleSelect]);

  // Scroll selected item into view
  useEffect(() => {
    if (listRef.current && listRef.current.children[selectedIndex]) {
        const selectedElement = listRef.current.children[selectedIndex] as HTMLElement;
        if (selectedElement) {
            selectedElement.scrollIntoView({ block: 'nearest' });
        }
    }
  }, [selectedIndex]);

  const getIcon = (channel: CommunicationChannel) => {
      switch(channel) {
          case CommunicationChannel.EMAIL: return <FileText size={14} />;
          case CommunicationChannel.PROMPT: return <Hash size={14} />;
          default: return <Layers size={14} />;
      }
  };

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setSelectedIndex(0);
  };

  return (
    <motion.div
      ref={focusTrapRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[100]"
    >
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-white/90 backdrop-blur-sm"
        onClick={() => setIsSearchModalOpen(false)}
      />

      {/* Modal Container */}
      <div className="absolute inset-0 flex items-start justify-center pt-[15vh] px-4 pointer-events-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.98, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.98, y: 10 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-2xl 2xl:max-w-3xl bg-white shadow-2xl border border-[#E5E5E5] overflow-hidden pointer-events-auto flex flex-col max-h-[60vh]"
        >
          {/* Search Header */}
          <div className="flex items-center px-6 py-5 border-b border-[#E5E5E5] shrink-0">
            <Search className="text-[#999999] mr-4" size={20} strokeWidth={1.5} />
            <input
              ref={inputRef}
              type="text"
              placeholder="Buscar comando, template ou texto..."
              className="flex-1 bg-transparent text-xl text-[#111111] placeholder:text-[#CCCCCC] outline-none font-serif italic-editorial"
              value={query}
              onChange={handleQueryChange}
            />
            <div className="hidden md:flex items-center gap-2">
                <span className="text-[9px] font-bold text-[#999999] border border-[#E5E5E5] px-2 py-1 tracking-widest uppercase">ESC</span>
            </div>
          </div>

          {/* Results List */}
          <div ref={listRef} className="overflow-y-auto custom-scrollbar p-2">
            {filteredItems.length === 0 ? (
              <div className="py-16 text-center text-[#999999]">
                <p className="text-sm font-serif italic">Nenhum resultado encontrado.</p>
              </div>
            ) : (
              filteredItems.map((item, idx) => (
                <div
                  key={item.id}
                  className={`
                    w-full flex items-center justify-between p-4 transition-colors duration-200 group text-left border-b border-transparent relative
                    ${idx === selectedIndex ? 'bg-[#FAFAFA]' : 'hover:bg-[#FAFAFA]'}
                  `}
                  onMouseEnter={() => setSelectedIndex(idx)}
                >
                  <button 
                    onClick={() => handleSelect(item)}
                    className="flex-1 flex items-center gap-5 min-w-0 text-left"
                  >
                    <div className={`
                        w-8 h-8 flex items-center justify-center shrink-0 border transition-colors
                        ${idx === selectedIndex ? 'border-[#111111] text-[#111111]' : 'border-[#E5E5E5] text-[#CCCCCC]'}
                    `}>
                        {getIcon(item.channel)}
                    </div>
                    <div className="min-w-0">
                       <h4 className={`text-base font-serif italic-editorial truncate ${idx === selectedIndex ? 'text-[#111111]' : 'text-[#666666]'}`}>
                         {item.title}
                       </h4>
                       <p className="text-[10px] uppercase tracking-wider text-[#999999] truncate max-w-[300px] mt-1">
                         {item.description || item.subject || 'Sem descrição'}
                       </p>
                    </div>
                  </button>

                  <div className="flex items-center gap-3">
                    {/* Copy Button */}
                    <button
                        onClick={(e) => handleCopy(e, item)}
                        className={`
                            w-8 h-8 flex items-center justify-center rounded-full border border-transparent
                            transition-all duration-200
                            ${copiedId === item.id 
                                ? 'text-emerald-600 bg-emerald-50 opacity-100' 
                                : 'text-[#999999] hover:text-[#111111] hover:bg-white hover:border-[#E5E5E5] opacity-0 group-hover:opacity-100'
                            }
                        `}
                        title="Copiar conteúdo"
                    >
                        {copiedId === item.id ? <Check size={14} /> : <Copy size={14} />}
                    </button>

                    {idx === selectedIndex && (
                        <div className="hidden md:flex items-center text-[#111111] text-[9px] font-bold tracking-[0.2em] uppercase gap-3">
                            <CornerDownLeft size={12} strokeWidth={1.5} />
                        </div>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
          
          {/* Footer */}
          <div className="bg-[#FAFAFA] border-t border-[#E5E5E5] px-6 py-3 flex justify-between items-center text-[9px] text-[#999999] uppercase tracking-widest">
             <span>{filteredItems.length} resultados</span>
             <div className="flex gap-4">
                <span className="flex items-center gap-1"><ArrowRight size={10} className="rotate-[-90deg]"/> <ArrowRight size={10} className="rotate-90deg"/> Navegar</span>
                <span className="flex items-center gap-1"><CornerDownLeft size={10}/> Abrir</span>
             </div>
          </div>

        </motion.div>
      </div>
    </motion.div>
  );
};

export const CommandMenu: React.FC = () => {
  const { isSearchModalOpen } = useAppContext();

  return (
    <AnimatePresence>
      {isSearchModalOpen && <CommandMenuContent />}
    </AnimatePresence>
  );
};



