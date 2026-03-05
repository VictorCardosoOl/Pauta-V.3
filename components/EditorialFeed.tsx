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
    ? 'Pauta' 
    : CATEGORIES.find(c => c.id === selectedCategory)?.name || 'Categoria';

  return (
    <div className="flex flex-col md:flex-row w-full bg-editorial-bg min-h-full">
      {/* Main Content (Hero + Feed) */}
      <div className="flex-1 flex flex-col p-8 md:p-12 lg:p-16 border-r border-editorial-black">
        
        {/* Hero Section */}
        {isAllCategory && heroTemplate && (
          <div className="mb-16 pb-16 border-b border-editorial-black">
            <h1 className="font-sans font-black text-[10vw] md:text-[8vw] leading-[0.8] tracking-tighter mb-8 text-editorial-black uppercase whitespace-pre-line">
              {categoryName}
            </h1>
            
            <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-12 items-start">
              {/* Hero Card */}
              <EditorialCard 
                template={heroTemplate} 
                onClick={() => setSelectedTemplate(heroTemplate)} 
                onPin={onPin}
                isPinned={pinnedIds.includes(heroTemplate.id)}
                index={0} 
                isHero={true} 
              />

              {/* Secondary Column (Desktop Only) - Featured Articles */}
              <div className="hidden lg:flex flex-col gap-8 border-l border-editorial-black pl-8 h-full">
                 <div className="font-serif italic text-3xl mb-8">Artigos em Destaque</div>
                 {listTemplates.slice(0, 3).map((template, idx) => (
                    <div key={template.id} onClick={() => setSelectedTemplate(template)} className="group cursor-pointer border-b border-editorial-black/20 pb-8 last:border-none">
                       <div className="font-sans font-bold text-5xl mb-4 text-editorial-black/20 group-hover:text-editorial-black transition-colors">{(idx + 1).toString().padStart(2, '0')}</div>
                       <h3 className="font-sans font-bold text-2xl leading-tight mb-3 group-hover:underline decoration-1 underline-offset-4">{template.title}</h3>
                       <p className="font-serif text-lg text-editorial-gray line-clamp-2">{template.description}</p>
                    </div>
                 ))}
                 <button className="mt-auto flex items-center gap-2 font-sans text-xs font-bold uppercase tracking-widest hover:translate-x-2 transition-transform self-end border-b border-editorial-black/20 hover:border-editorial-black pb-1">
                    Ver Todos →
                 </button>
              </div>
            </div>
          </div>
        )}

        {!isAllCategory && (
          <div className="mb-12 pb-8 border-b border-editorial-black">
            <h1 className="font-sans font-black text-[8vw] md:text-[6vw] leading-[0.8] tracking-tighter text-editorial-black uppercase whitespace-pre-line">
              {categoryName}
            </h1>
          </div>
        )}

        {/* Grid Feed (Below Hero) */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-12 gap-y-20">
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
        <div className="mt-32 pt-16 border-t border-editorial-black flex flex-col md:flex-row justify-between items-end">
           <div className="font-sans font-black text-[15vw] leading-none tracking-tighter uppercase text-editorial-black/10 select-none">
              Pauta
           </div>
           <div className="flex flex-col items-end gap-4">
              <div className="font-serif italic text-xl">Assine nossa newsletter</div>
              <div className="flex border-b border-editorial-black pb-2 w-64">
                 <input type="email" placeholder="Digite seu email" className="bg-transparent outline-none w-full font-sans text-sm placeholder:text-editorial-gray/50" />
                 <button className="font-sans text-xs font-bold uppercase tracking-widest">Enviar</button>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};
