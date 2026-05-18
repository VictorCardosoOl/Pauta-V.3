import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X } from 'lucide-react';

interface AppHeaderProps {
  categoryInfo: { title: string; subtitle: string };
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  searchInputRef: React.RefObject<HTMLInputElement>;
}

export const AppHeader: React.FC<AppHeaderProps> = ({
  categoryInfo,
  searchQuery,
  setSearchQuery,
  searchInputRef
}) => {
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);

  useEffect(() => {
    if (isSearchExpanded && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchExpanded]);

  const handleToggleSearch = () => {
    if (isSearchExpanded) {
      setSearchQuery('');
      setIsSearchExpanded(false);
    } else {
      setIsSearchExpanded(true);
    }
  };

  return (
    <div className="app-header-container">
      <div className="max-w-5xl relative">
        {/* Decorative Line */}
        <motion.div 
            initial={{ width: 0 }}
            animate={{ width: 80 }}
            transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
            className="absolute -top-8 left-0 h-[1px] bg-[#111111]" 
        />
        
        <motion.div 
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.05, duration: 0.4 }}
          className="flex items-center gap-3 mb-4"
        >
            <span className="label-editorial text-[#666666] tracking-[0.3em] text-[10px]">
            {categoryInfo.subtitle}
            </span>
        </motion.div>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5, ease: 'easeOut' }}
          className="text-4xl md:text-6xl lg:text-[4.5rem] font-serif italic-editorial text-[#111111] leading-[0.9] tracking-tight -ml-[4px]"
        >
          {categoryInfo.title}
        </motion.h1>
      </div>

      {/* Animated Search */}
      <div className="relative flex items-center justify-end h-14 min-w-[56px] xl:w-[400px]">
        <AnimatePresence initial={false}>
          {isSearchExpanded ? (
            <motion.div
              key="search-box"
              initial={{ width: 56, opacity: 0, x: 20 }}
              animate={{ width: '100%', opacity: 1, x: 0 }}
              exit={{ width: 56, opacity: 0, x: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300, duration: 0.4 }}
              className="absolute right-0 flex items-center w-full"
            >
              <div className={`absolute left-6 flex items-center pointer-events-none transition-colors duration-300 ${searchQuery ? 'text-[#111111]' : 'text-[#999999]'}`}>
                <Search size={16} strokeWidth={1.5} />
              </div>
              <input 
                ref={searchInputRef}
                type="text"
                placeholder="Filtrar modelos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
              <button 
                onClick={handleToggleSearch} 
                className="absolute right-6 flex items-center text-[#111111] hover:opacity-50 transition-opacity p-2"
                aria-label="Fecar busca"
              >
                <X size={16} />
              </button>
            </motion.div>
          ) : (
            <motion.button
              key="search-trigger"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleToggleSearch}
              className="search-btn-trigger"
              aria-label="Abrir busca"
            >
              <Search size={20} strokeWidth={1.5} />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
