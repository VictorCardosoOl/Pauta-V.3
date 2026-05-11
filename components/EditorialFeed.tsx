import React from 'react';
import { Template } from '../types';
import { EditorialCard } from './EditorialCard';
import { CATEGORIES } from '../constants';

interface EditorialFeedProps {
  pinnedTemplates: Template[];
  otherTemplates: Template[];
  setSelectedTemplate: (t: Template) => void;
  selectedCategory: string;
  onPin: (id: string) => void;
  pinnedIds: string[];
}

export const EditorialFeed: React.FC<EditorialFeedProps> = ({ pinnedTemplates, otherTemplates, setSelectedTemplate, selectedCategory, onPin, pinnedIds }) => {
  const isAllCategory = selectedCategory === 'all';
  const heroTemplate = isAllCategory ? (pinnedTemplates[0] || otherTemplates[0]) : null;
  const listTemplates = isAllCategory 
    ? (pinnedTemplates[0] ? otherTemplates : otherTemplates.slice(1))
    : [...pinnedTemplates, ...otherTemplates];

  const categoryName = isAllCategory 
    ? 'The Archive.' 
    : CATEGORIES.find(c => c.id === selectedCategory)?.name || 'Coleção';

  return (
    <div className="flex flex-col w-full bg-editorial-bg min-h-screen">
      {/* Main Content (Hero + Feed) */}
      <div className="flex-1 flex flex-col p-6 md:p-10 lg:p-16 xl:p-24 w-full mx-auto relative">
        
        {/* Pre-title Label */}
        <div className="mb-4">
            <span className="font-sans text-[10px] md:text-xs font-semibold tracking-[0.3em] uppercase text-editorial-gray">
                — {new Date().getFullYear()} / Q2 Collection
            </span>
        </div>

        {/* Hero Section */}
        {isAllCategory && heroTemplate && (
          <div className="mb-24 pb-20 border-b border-[#e0e0e0] mt-12 md:mt-20">
            <h1 className="font-sans font-black text-[14vw] md:text-[10vw] xl:text-[9vw] leading-[0.8] tracking-tighter text-editorial-black uppercase whitespace-pre-line mix-blend-darken">
              {categoryName}
            </h1>
            <p className="font-serif italic text-[var(--text-xl)] text-editorial-gray max-w-2xl mt-8 mb-16">
              Um acervo meticulosamente curado de prompts, ferramentas e lógicas de IA para otimização de comunicação e engenharia de software criativa.
            </p>
            
            <div className="grid grid-cols-1 lg:grid-cols-[2.5fr_1fr] gap-16 xl:gap-24 items-start">
              {/* Hero Card */}
              <div className="group relative">
                <EditorialCard 
                  template={heroTemplate} 
                  onClick={() => setSelectedTemplate(heroTemplate)} 
                  onPin={onPin}
                  isPinned={pinnedIds.includes(heroTemplate.id)}
                  index={0} 
                  isHero={true} 
                />
              </div>

              {/* Secondary Column (Desktop Only) - Featured Articles */}
              <div className="hidden lg:flex flex-col gap-10 border-l border-[#e0e0e0] pl-10 xl:pl-16">
                 <div className="font-serif italic text-4xl mb-4 font-light text-editorial-black">Selecionados</div>
                 {listTemplates.slice(0, 3).map((template, idx) => (
                    <div key={template.id} onClick={() => setSelectedTemplate(template)} className="group cursor-pointer border-b border-[#e0e0e0] pb-8 last:border-none">
                       <div className="flex items-center gap-4 mb-3">
                           <div className="font-sans font-medium text-sm text-editorial-gray">No. {(idx + 1).toString().padStart(2, '0')}</div>
                           <div className="flex-1 h-[1px] bg-[#e0e0e0] group-hover:bg-editorial-black transition-colors duration-500"></div>
                       </div>
                       <h3 className="font-sans font-bold text-xl xl:text-2xl leading-tight mb-3 group-hover:text-editorial-gray transition-colors duration-500">{template.title}</h3>
                       <p className="font-serif text-lg text-editorial-gray opacity-80 line-clamp-2">{template.description}</p>
                    </div>
                 ))}
                 <button className="mt-auto flex items-center justify-between gap-4 font-sans text-xs font-semibold uppercase tracking-[0.2em] group hover:text-editorial-gray transition-colors self-start border border-editorial-black px-6 py-3 rounded-full overflow-hidden relative">
                    <span className="relative z-10 transition-colors group-hover:text-white">Explorar Índices</span>
                    <div className="absolute inset-0 bg-editorial-black transform scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"></div>
                 </button>
              </div>
            </div>
          </div>
        )}

        {!isAllCategory && (
          <div className="mb-20 pb-12 border-b border-[#e0e0e0] mt-12 md:mt-20">
            <h1 className="font-sans font-black text-[12vw] md:text-[8vw] leading-[0.8] tracking-tighter text-editorial-black uppercase whitespace-pre-line mix-blend-darken">
              {categoryName}
            </h1>
            <p className="font-serif italic text-[var(--text-xl)] text-editorial-gray mt-6">
               Visualizando entradas da coleção indexada.
            </p>
          </div>
        )}

        {/* Grid Feed (Below Hero) */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-x-12 gap-y-24 xl:gap-x-16 xl:gap-y-28">
           {(isAllCategory ? listTemplates.slice(3) : listTemplates).map((template, idx) => (
              <EditorialCard 
                key={template.id} 
                template={template} 
                onClick={() => setSelectedTemplate(template)} 
                onPin={onPin}
                isPinned={pinnedIds.includes(template.id)}
                index={isAllCategory ? idx + 3 : idx} // Offset index correctly
                isHero={false}
              />
           ))}
        </div>

        {/* Footer Area */}
        <div className="mt-40 border-t border-[#e0e0e0] flex flex-col items-center justify-center relative overflow-hidden min-h-[50vh] xl:min-h-[60vh] w-full">
           <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-editorial-black/[0.03] to-transparent pointer-events-none"></div>
           <div className="font-sans font-black text-[15vw] leading-none tracking-tighter uppercase text-editorial-black/[0.04] select-none text-center mix-blend-darken">
              AntiGravity.
           </div>
           <div className="absolute bottom-16 font-serif italic text-2xl text-editorial-gray">
              Design is thinking made visual.
           </div>
        </div>
      </div>
    </div>
  );
};
