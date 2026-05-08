import React from 'react';
import { CATEGORIES } from '../constants';

interface EditorialSidebarProps {
  selectedCategory: string;
  onSelectCategory: (id: string) => void;
}

export const EditorialSidebar: React.FC<EditorialSidebarProps> = ({ selectedCategory, onSelectCategory }) => {
  return (
    <aside className="hidden md:flex flex-col w-[260px] xl:w-[320px] border-r border-[#e0e0e0] h-full sticky top-0 shrink-0 bg-editorial-bg transition-all duration-300 relative z-30">
      
      {/* Brand - Modern Minimalist */}
      <div className="p-10 xl:p-14 border-b border-[#e0e0e0] flex items-center h-[120px] xl:h-[140px] transition-all duration-300">
        <div className="flex flex-col">
            <h1 className="font-sans font-black text-2xl xl:text-3xl tracking-tighter leading-none uppercase text-editorial-black transition-all duration-300">
              AntiGravity
            </h1>
            <p className="mt-2 font-serif italic text-sm text-editorial-gray">Awwwards Edition.</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 flex flex-col p-10 xl:p-14 gap-8 overflow-y-auto custom-scrollbar relative">
        
        {/* Index List */}
        <div className="flex flex-col gap-6">
          <button 
            onClick={() => onSelectCategory('all')}
            className={`text-left transition-all duration-500 flex items-center justify-between group ${selectedCategory === 'all' ? 'text-editorial-black translate-x-2' : 'text-editorial-gray hover:text-editorial-black hover:translate-x-2'}`}
          >
            <span className="font-sans text-xs xl:text-sm font-semibold uppercase tracking-[0.2em]">Visão Geral</span>
            {selectedCategory === 'all' && <span className="w-1.5 h-1.5 bg-editorial-black rounded-full" />}
          </button>
          
          <div className="h-px w-8 bg-[#e0e0e0] my-2" />

          {CATEGORIES.map((cat, idx) => (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`text-left transition-all duration-500 overflow-hidden relative flex flex-col items-start gap-1 group ${selectedCategory === cat.id ? 'translate-x-2' : 'hover:translate-x-2'}`}
            >
              <div className="flex items-center gap-4 w-full">
                  <span className={`font-serif italic text-lg transition-colors duration-500 ${selectedCategory === cat.id ? 'text-editorial-black' : 'text-editorial-gray/40 group-hover:text-editorial-black'}`}>
                      {(idx + 1).toString().padStart(2, '0')}.
                  </span>
                  <span className={`font-sans text-xs xl:text-sm font-semibold uppercase tracking-[0.2em] transition-colors duration-500 ${selectedCategory === cat.id ? 'text-editorial-black' : 'text-editorial-gray group-hover:text-editorial-black'}`}>
                      {cat.name}
                  </span>
              </div>
            </button>
          ))}
        </div>
      </nav>

      {/* Footer Copyright */}
      <div className="p-10 xl:p-14 border-t border-[#e0e0e0] mt-auto">
          <div className="flex flex-col gap-2">
              <div className="text-[10px] xl:text-[11px] font-semibold uppercase tracking-[0.2em] text-editorial-black">
                Design & Engineering
              </div>
              <div className="font-serif italic text-editorial-gray text-sm">
                Paris — New York
              </div>
          </div>
      </div>
    </aside>
  );
};
