import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowUpRight } from 'lucide-react';
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
            onClick={onClose}
            className="fixed inset-0 bg-editorial-black/20 backdrop-blur-sm z-40 lg:hidden"
          />
          
          {/* Menu Drawer */}
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 left-0 z-50 w-[80%] max-w-[300px] bg-editorial-bg border-r border-editorial-black flex flex-col lg:hidden shadow-2xl"
          >
            {/* Header */}
            <div className="p-6 border-b border-editorial-black flex justify-between items-center">
              <h2 className="font-sans font-bold text-xl uppercase tracking-tighter">Menu</h2>
              <button 
                onClick={onClose}
                className="p-2 -mr-2 hover:bg-editorial-black/5 rounded-full transition-colors"
              >
                <X size={24} strokeWidth={1.5} />
              </button>
            </div>

            {/* Navigation */}
            <nav className="flex-1 overflow-y-auto custom-scrollbar p-6 flex flex-col gap-6">
               <div className="flex flex-col gap-4">
                  <button 
                    onClick={() => {
                        onSelectCategory('all');
                        onClose();
                    }}
                    className={`text-left font-sans text-lg font-medium uppercase tracking-widest transition-all group flex items-center justify-between ${selectedCategory === 'all' ? 'text-editorial-black' : 'text-editorial-gray hover:text-editorial-black'}`}
                  >
                    <span>Visão Geral</span>
                    {selectedCategory === 'all' && <span className="w-1.5 h-1.5 bg-editorial-black rounded-full" />}
                  </button>
                  
                  <div className="h-px w-full bg-editorial-black/20 my-2" />

                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => {
                          onSelectCategory(cat.id);
                          onClose();
                      }}
                      className={`text-left font-sans text-lg font-medium uppercase tracking-widest transition-all group flex items-center justify-between ${selectedCategory === cat.id ? 'text-editorial-black' : 'text-editorial-gray hover:text-editorial-black'}`}
                    >
                      <span>{cat.name}</span>
                      <span className={`w-1.5 h-1.5 bg-editorial-black rounded-full transition-opacity ${selectedCategory === cat.id ? 'opacity-100' : 'opacity-0 group-hover:opacity-50'}`} />
                    </button>
                  ))}
                </div>
            </nav>

            {/* Footer */}
            <div className="p-6 border-t border-editorial-black mt-auto">
                <div className="flex flex-col gap-3">
                  <a href="#" className="font-serif italic text-lg hover:underline decoration-1 underline-offset-4 flex items-center gap-2 group">
                    Github <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                  <a href="#" className="font-serif italic text-lg hover:underline decoration-1 underline-offset-4 flex items-center gap-2 group">
                    Twitter <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                  <div className="mt-4 text-[10px] uppercase tracking-widest text-editorial-gray">
                    © 2026 Studio
                  </div>
                </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
