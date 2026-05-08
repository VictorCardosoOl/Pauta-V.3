import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ArrowRight, CornerDownLeft, FileText, Layers, Hash, Copy, Check } from 'lucide-react';
import { useAppStore } from '../store/useAppStore';
import { CommunicationChannel, Template } from '../types';
import { useFocusTrap } from '../hooks/useFocusTrap';

const CommandMenuContent: React.FC = () => {
  const { setIsSearchModalOpen, setSelectedTemplate, templates } = useAppStore();
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
          <div className="flex items-center px-8 py-8 border-b border-[#E5E5E5] shrink-0 bg-white relative">
            <Search className="text-editorial-black/40 mr-6" size={24} strokeWidth={1.5} />
            <input
              ref={inputRef}
              type="text"
              placeholder="Buscar arquivo..."
              className="flex-1 bg-transparent text-[var(--text-3xl)] text-editorial-black placeholder:text-editorial-gray/40 outline-none font-serif italic"
              value={query}
              onChange={handleQueryChange}
            />
            <div className="hidden md:flex items-center gap-2 relative z-10">
                <span className="text-[10px] font-semibold text-editorial-gray border border-editorial-gray/20 rounded-full px-3 py-1 tracking-[0.1em] uppercase">ESC</span>
            </div>
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-editorial-black/[0.02] to-transparent pointer-events-none"></div>
          </div>

          {/* Results List */}
          <div ref={listRef} className="overflow-y-auto custom-scrollbar p-6">
            {filteredItems.length === 0 ? (
              <div className="py-24 text-center text-editorial-gray">
                <p className="text-xl font-serif italic opacity-60">Nenhum resultado encontrado.</p>
              </div>
            ) : (
              filteredItems.map((item, idx) => (
                <div
                  key={item.id}
                  className={`
                    w-full flex items-center justify-between p-6 transition-all duration-300 group text-left relative overflow-hidden rounded-md cursor-pointer
                    ${idx === selectedIndex ? 'bg-editorial-bg' : 'hover:bg-editorial-bg/50'}
                  `}
                  onMouseEnter={() => setSelectedIndex(idx)}
                >
                  <button 
                    onClick={() => handleSelect(item)}
                    className="flex-1 flex items-center gap-6 min-w-0 text-left z-10 relative"
                  >
                    <div className={`
                        w-10 h-10 flex items-center justify-center shrink-0 border rounded-full transition-all duration-300
                        ${idx === selectedIndex ? 'border-editorial-black text-editorial-black' : 'border-[#E5E5E5] text-editorial-gray'}
                    `}>
                        {getIcon(item.channel)}
                    </div>
                    <div className="min-w-0 flex-1">
                       <h4 className={`text-[var(--text-xl)] font-serif italic truncate transition-colors duration-300 ${idx === selectedIndex ? 'text-editorial-black' : 'text-editorial-gray'}`}>
                         {item.title}
                       </h4>
                       <p className={`text-[10px] uppercase font-semibold tracking-[0.2em] truncate max-w-[300px] mt-2 transition-colors duration-300 ${idx === selectedIndex ? 'text-editorial-black/60' : 'text-editorial-gray/60'}`}>
                         {item.category}
                       </p>
                    </div>
                  </button>

                  <div className="flex items-center gap-4 z-10 relative">
                    {/* Copy Button */}
                    <button
                        onClick={(e) => handleCopy(e, item)}
                        className={`
                            w-10 h-10 flex items-center justify-center rounded-full border border-[#E5E5E5] bg-white
                            transition-all duration-300
                            ${copiedId === item.id 
                                ? 'text-emerald-600 border-emerald-200 bg-emerald-50 opacity-100 scale-110' 
                                : 'text-editorial-gray hover:text-editorial-black hover:border-editorial-black opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0'
                            }
                        `}
                        title="Copiar conteúdo"
                    >
                        {copiedId === item.id ? <Check size={16} /> : <Copy size={16} />}
                    </button>

                    {idx === selectedIndex && (
                        <div className="hidden md:flex items-center text-editorial-black opacity-40">
                            <ArrowRight size={20} strokeWidth={1.5} />
                        </div>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
          
          {/* Footer */}
          <div className="bg-white border-t border-[#E5E5E5] px-8 py-6 flex justify-between items-center text-[10px] text-editorial-gray font-semibold uppercase tracking-[0.2em]">
             <span>{filteredItems.length} Encontrados</span>
             <div className="flex gap-6">
                <span className="flex items-center gap-2"><div className="flex -space-x-1"><ArrowRight size={12} className="rotate-[-90deg]"/><ArrowRight size={12} className="rotate-90"/></div> Mover</span>
                <span className="flex items-center gap-2"><CornerDownLeft size={12}/> Abrir</span>
             </div>
          </div>

        </motion.div>
      </div>
    </motion.div>
  );
};

export const CommandMenu: React.FC = () => {
  const { isSearchModalOpen } = useAppStore();

  return (
    <AnimatePresence>
      {isSearchModalOpen && <CommandMenuContent />}
    </AnimatePresence>
  );
};



