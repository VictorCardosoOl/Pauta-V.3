import React from 'react';
import { CATEGORIES } from '../constants';
import { Github, Twitter } from 'lucide-react';

interface EditorialSidebarProps {
  selectedCategory: string;
  onSelectCategory: (id: string) => void;
}

export const EditorialSidebar: React.FC<EditorialSidebarProps> = ({ selectedCategory, onSelectCategory }) => {
  return (
    <aside className="hidden md:flex flex-col w-[200px] xl:w-[240px] border-r border-editorial-black h-full sticky top-0 shrink-0 bg-editorial-bg transition-all duration-300">
      {/* Brand - Only visible on Home (all categories) */}
      <div className="p-6 xl:p-8 border-b border-editorial-black h-[85px] xl:h-[105px] flex flex-col justify-center transition-all duration-300">
        {selectedCategory === 'all' ? (
          <>
            <h1 className="font-sans font-bold text-3xl xl:text-4xl tracking-tighter leading-none uppercase transition-all duration-300">
              Pauta
            </h1>
            <p className="mt-2 font-serif italic text-xs xl:text-sm text-editorial-gray transition-all duration-300">Studio Edition</p>
          </>
        ) : (
           <button 
             onClick={() => onSelectCategory('all')}
             className="font-sans text-[10px] xl:text-xs font-bold uppercase tracking-widest text-editorial-gray hover:text-editorial-black transition-colors flex items-center gap-2"
           >
             ← Voltar
           </button>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 flex flex-col p-6 xl:p-8 gap-4 xl:gap-6 overflow-y-auto custom-scrollbar transition-all duration-300">
        <div className="flex flex-col gap-3 xl:gap-4">
          <button 
            onClick={() => onSelectCategory('all')}
            className={`text-left font-sans text-xs xl:text-sm font-medium uppercase tracking-widest transition-all group flex items-center justify-between ${selectedCategory === 'all' ? 'text-editorial-black' : 'text-editorial-gray hover:text-editorial-black'}`}
          >
            <span>Visão Geral</span>
            {selectedCategory === 'all' && <span className="w-1.5 h-1.5 bg-editorial-black rounded-full" />}
          </button>
          
          <div className="h-px w-full bg-editorial-black/20 my-1 xl:my-2" />

          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`text-left font-sans text-xs xl:text-sm font-medium uppercase tracking-widest transition-all group flex items-center justify-between ${selectedCategory === cat.id ? 'text-editorial-black' : 'text-editorial-gray hover:text-editorial-black'}`}
            >
              <span>{cat.name}</span>
              <span className={`w-1.5 h-1.5 bg-editorial-black rounded-full transition-opacity ${selectedCategory === cat.id ? 'opacity-100' : 'opacity-0 group-hover:opacity-50'}`} />
            </button>
          ))}
        </div>
      </nav>

      {/* Footer Links */}
      <div className="p-6 xl:p-8 border-t border-editorial-black mt-auto transition-all duration-300">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <a href="#" className="text-editorial-black hover:text-editorial-gray transition-colors" title="Github">
              <Github size={20} strokeWidth={1.5} />
            </a>
            <a href="#" className="text-editorial-black hover:text-editorial-gray transition-colors" title="Twitter">
              <Twitter size={20} strokeWidth={1.5} />
            </a>
          </div>
          <div className="text-[9px] xl:text-[10px] uppercase tracking-widest text-editorial-gray">
            © 2026 Studio
          </div>
        </div>
      </div>
    </aside>
  );
};
