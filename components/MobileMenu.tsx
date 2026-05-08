import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { CATEGORIES } from '../constants';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCategory: string;
  onSelectCategory: (id: string) => void;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose, selectedCategory, onSelectCategory }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            onClick={onClose}
            className="fixed inset-0 bg-white/80 backdrop-blur-md z-40 md:hidden"
          />
          
          {/* Menu Drawer */}
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 100 }}
            className="fixed inset-y-0 left-0 z-50 w-[85%] max-w-[340px] bg-editorial-bg border-r border-[#e0e0e0] flex flex-col md:hidden shadow-[-20px_0_40px_rgba(0,0,0,0.05)]"
          >
            {/* Header */}
            <div className="p-8 border-b border-[#e0e0e0] flex justify-between items-center bg-editorial-bg">
              <h2 className="font-sans font-black text-2xl uppercase tracking-tighter">AntiGravity</h2>
              <button 
                onClick={onClose}
                className="p-3 -mr-2 bg-[#f0f0f0] rounded-full hover:bg-editorial-black hover:text-white transition-colors"
              >
                <X size={20} strokeWidth={2} />
              </button>
            </div>

            {/* Navigation */}
            <nav className="flex-1 overflow-y-auto custom-scrollbar p-8 flex flex-col gap-6">
               <div className="flex flex-col gap-8">
                  <button 
                    onClick={() => {
                        onSelectCategory('all');
                        onClose();
                    }}
                    className={`text-left font-sans text-sm font-semibold uppercase tracking-[0.2em] transition-all flex items-center justify-between ${selectedCategory === 'all' ? 'text-editorial-black translate-x-2' : 'text-editorial-gray hover:text-editorial-black hover:translate-x-2'}`}
                  >
                    <span>Visão Geral</span>
                    {selectedCategory === 'all' && <span className="w-1.5 h-1.5 bg-editorial-black rounded-full" />}
                  </button>
                  
                  <div className="h-px w-8 bg-[#e0e0e0] my-2" />

                  {CATEGORIES.map((cat, idx) => (
                    <button
                      key={cat.id}
                      onClick={() => {
                          onSelectCategory(cat.id);
                          onClose();
                      }}
                      className={`text-left transition-all duration-300 flex flex-col items-start gap-1 ${selectedCategory === cat.id ? 'translate-x-2' : 'hover:translate-x-2'}`}
                    >
                        <div className="flex items-center gap-4 w-full">
                          <span className={`font-serif italic text-xl transition-colors duration-300 ${selectedCategory === cat.id ? 'text-editorial-black' : 'text-editorial-gray/40'}`}>
                              {(idx + 1).toString().padStart(2, '0')}.
                          </span>
                          <span className={`font-sans text-sm font-semibold uppercase tracking-[0.2em] transition-colors duration-300 ${selectedCategory === cat.id ? 'text-editorial-black' : 'text-editorial-gray'}`}>
                              {cat.name}
                          </span>
                        </div>
                    </button>
                  ))}
                </div>
            </nav>

            {/* Footer */}
            <div className="p-8 border-t border-[#e0e0e0] mt-auto">
                <div className="flex flex-col gap-2">
                  <div className="text-[10px] uppercase font-semibold tracking-[0.2em] text-editorial-black">
                    Design & Engineering
                  </div>
                  <div className="font-serif italic text-editorial-gray text-sm">
                    Paris — New York
                  </div>
                </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
