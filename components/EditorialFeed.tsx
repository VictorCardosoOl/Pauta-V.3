import React, { useMemo } from 'react';
import { Template } from '../types';
import { EditorialCard } from './EditorialCard';
import { CATEGORIES } from '../constants';
import { useVirtualizer } from '@tanstack/react-virtual';
import { useWindowColumns } from '../hooks/useWindowColumns';
import { AppHeader } from './AppHeader';

interface EditorialFeedProps {
  pinnedTemplates: Template[];
  otherTemplates: Template[];
  setSelectedTemplate: (t: Template) => void;
  selectedCategory: string;
  onPin: (id: string) => void;
  pinnedIds: string[];
  scrollRef?: React.RefObject<HTMLDivElement>;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  searchInputRef: React.RefObject<HTMLInputElement>;
}

export const EditorialFeed: React.FC<EditorialFeedProps> = ({ 
  pinnedTemplates, otherTemplates, setSelectedTemplate, selectedCategory, onPin, pinnedIds, scrollRef,
  searchQuery, setSearchQuery, searchInputRef
}) => {
  const isAllCategory = selectedCategory === 'all';
  
  // Get up to 2 hero templates if in 'all' category
  const heroTemplates = useMemo(() => {
    if (!isAllCategory) return [];
    if (pinnedTemplates.length >= 2) return pinnedTemplates.slice(0, 2);
    if (pinnedTemplates.length === 1) return [pinnedTemplates[0], otherTemplates[0]];
    return otherTemplates.slice(0, 2);
  }, [isAllCategory, pinnedTemplates, otherTemplates]);

  const listTemplates = useMemo(() => {
    if (!isAllCategory) return [...pinnedTemplates, ...otherTemplates];
    
    // If we are showing heroes, we need to remove those specific items from the list
    const heroIds = heroTemplates.map(t => t.id);
    return otherTemplates.filter(t => !heroIds.includes(t.id));
  }, [isAllCategory, pinnedTemplates, otherTemplates, heroTemplates]);

  const categoryName = isAllCategory 
    ? 'The Archive.' 
    : CATEGORIES.find(c => c.id === selectedCategory)?.name || 'Coleção';

  // --- VIRTUALIZATION LOGIC ---
  const cols = useWindowColumns();
  const feedItems = isAllCategory ? listTemplates.slice(3) : listTemplates;
  const rowCount = Math.ceil(feedItems.length / cols);
  
  const gapX = cols >= 3 ? 64 : 48; // Estimate 64px (4rem) for xl+ gap, 48px for md
  const gapY = cols >= 3 ? 80 : 64; // Reduced from 112/96
  
  const virtualizer = useVirtualizer({
    count: rowCount,
    getScrollElement: () => scrollRef?.current || null,
    estimateSize: () => 350 + gapY, // Reduced from 400
    overscan: 2,
  });

  return (
    <div className="flex flex-col w-full bg-editorial-bg min-h-screen">
      {/* Main Content (Header + Feed) */}
      <div className="flex-1 flex flex-col p-6 md:p-10 lg:p-12 xl:p-20 w-full mx-auto relative">
        
        <AppHeader 
          categoryInfo={{
            title: categoryName,
            subtitle: isAllCategory ? `— ${new Date().getFullYear()} / Q2 Collection` : 'Visualizando entradas da coleção indexada.'
          }}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          searchInputRef={searchInputRef}
        />

        {/* Hero Section (Only if No Search) */}
        {!searchQuery && isAllCategory && heroTemplates.length > 0 && (
          <div className="mb-10 pb-10 border-b border-[#e0e0e0] mt-0">
            <div className="grid grid-cols-1 lg:grid-cols-[2.5fr_1fr] gap-12 xl:gap-20 items-start">
              {/* Hero Column */}
              <div className="flex flex-col gap-12 group relative">
                {heroTemplates.map((template, hIdx) => (
                  <EditorialCard 
                    key={template.id} 
                    template={template} 
                    onClick={() => setSelectedTemplate(template)} 
                    onPin={onPin}
                    isPinned={pinnedIds.includes(template.id)}
                    index={hIdx} 
                    isHero={hIdx === 0} 
                  />
                ))}
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

        {/* Virtualized Grid Feed */}
        <div 
          style={{
            height: `${virtualizer.getTotalSize()}px`,
            width: '100%',
            position: 'relative',
          }}
        >
          {virtualizer.getVirtualItems().map((virtualRow) => {
            const rowIndex = virtualRow.index;
            const itemsInRow = feedItems.slice(rowIndex * cols, rowIndex * cols + cols);
            
            return (
              <div
                key={virtualRow.key}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: `${virtualRow.size - gapY}px`, // Subtract gap from size if we want
                  transform: `translateY(${virtualRow.start}px)`,
                }}
                className={`grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-x-12 gap-y-0 xl:gap-x-16`}
              >
                {itemsInRow.map((template, colIdx) => {
                  const absoluteIdx = rowIndex * cols + colIdx;
                  const displayIdx = isAllCategory ? absoluteIdx + 3 : absoluteIdx;
                  
                  return (
                    <EditorialCard 
                      key={template.id} 
                      template={template} 
                      onClick={() => setSelectedTemplate(template)} 
                      onPin={onPin}
                      isPinned={pinnedIds.includes(template.id)}
                      index={displayIdx}
                      isHero={false}
                    />
                  );
                })}
              </div>
            );
          })}
        </div>

        {/* Footer Area */}
        <div className="mt-24 border-t border-[#e0e0e0] flex flex-col items-center justify-center relative overflow-hidden min-h-[40vh] xl:min-h-[50vh] w-full">
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

