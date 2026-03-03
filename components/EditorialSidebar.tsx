import React from 'react';
import { CATEGORIES } from '../constants';
import { ArrowUpRight } from 'lucide-react';

interface EditorialSidebarProps {
  selectedCategory: string;
  onSelectCategory: (id: string) => void;
}

export const EditorialSidebar: React.FC<EditorialSidebarProps> = ({ selectedCategory, onSelectCategory }) => {
  return (
    <aside className="hidden lg:flex flex-col w-[240px] border-r border-editorial-black h-full sticky top-0 shrink-0 bg-editorial-bg">
      {/* Brand - Only visible on Home (all categories) */}
      <div className="p-8 border-b border-editorial-black h-[105px] flex flex-col justify-center">
        {selectedCategory === 'all' ? (
          <>
            <h1 className="font-sans font-bold text-4xl tracking-tighter leading-none uppercase">
              Pauta
            </h1>
            <p className="mt-2 font-serif italic text-sm text-editorial-gray">Studio Edition</p>
          </>
        ) : (
           <button 
             onClick={() => onSelectCategory('all')}
             className="font-sans text-xs font-bold uppercase tracking-widest text-editorial-gray hover:text-editorial-black transition-colors flex items-center gap-2"
           >
             ← Voltar
           </button>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 flex flex-col p-8 gap-6 overflow-y-auto custom-scrollbar">
        <div className="flex flex-col gap-4">
          <button 
            onClick={() => onSelectCategory('all')}
            className={`text-left font-sans text-sm font-medium uppercase tracking-widest transition-all group flex items-center justify-between ${selectedCategory === 'all' ? 'text-editorial-black' : 'text-editorial-gray hover:text-editorial-black'}`}
          >
            <span>Visão Geral</span>
            {selectedCategory === 'all' && <span className="w-1.5 h-1.5 bg-editorial-black rounded-full" />}
          </button>
          
          <div className="h-px w-full bg-editorial-black/10 my-2" />

          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`text-left font-sans text-sm font-medium uppercase tracking-widest transition-all group flex items-center justify-between ${selectedCategory === cat.id ? 'text-editorial-black' : 'text-editorial-gray hover:text-editorial-black'}`}
            >
              <span>{cat.name}</span>
              <span className={`w-1.5 h-1.5 bg-editorial-black rounded-full transition-opacity ${selectedCategory === cat.id ? 'opacity-100' : 'opacity-0 group-hover:opacity-50'}`} />
            </button>
          ))}
        </div>
      </nav>

      {/* Footer Links */}
      <div className="p-8 border-t border-editorial-black mt-auto">
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
    </aside>
  );
};
