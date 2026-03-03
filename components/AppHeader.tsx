import React from 'react';
import { motion } from 'framer-motion';
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
  return (
    <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-16 mb-32 pt-20 px-2">
      <div className="max-w-5xl relative">
        {/* Decorative Line */}
        <motion.div 
            initial={{ width: 0 }}
            animate={{ width: 80 }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="absolute -top-8 left-0 h-[1px] bg-[#111111]" 
        />
        
        <motion.div 
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1, duration: 0.8 }}
          className="flex items-center gap-3 mb-6"
        >
            <span className="label-editorial text-[#666666] tracking-[0.3em] text-[11px]">
            {categoryInfo.subtitle}
            </span>
        </motion.div>
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="text-5xl md:text-7xl lg:text-[5.5rem] font-serif italic-editorial text-[#111111] leading-[0.9] tracking-tight -ml-[4px]"
        >
          {categoryInfo.title}
        </motion.h2>
      </div>

      {/* Minimal Search */}
      <div className="relative w-full xl:w-[400px] group pb-2">
         <div className={`absolute inset-y-0 left-0 pl-0 flex items-center pointer-events-none transition-colors duration-500 ${searchQuery ? 'text-[#111111]' : 'text-[#999999]'}`}>
            <Search size={16} strokeWidth={1.5} />
         </div>
         <input 
           ref={searchInputRef}
           type="text"
           placeholder="Filtrar modelos..."
           value={searchQuery}
           onChange={(e) => setSearchQuery(e.target.value)}
           className="w-full pl-8 pr-8 py-4 bg-transparent border-b border-[#E5E5E5] text-xl font-serif italic-editorial text-[#111111] focus:outline-none focus:border-[#111111] transition-colors duration-500 placeholder:text-[#CCCCCC] placeholder:font-serif placeholder:italic-editorial placeholder:font-light"
         />
         {searchQuery && (
           <button 
             onClick={() => { setSearchQuery(''); searchInputRef.current?.focus(); }} 
             className="absolute inset-y-0 right-0 flex items-center text-[#111111] hover:opacity-50 transition-opacity"
           >
             <X size={14} />
           </button>
         )}
      </div>
    </div>
  );
};
