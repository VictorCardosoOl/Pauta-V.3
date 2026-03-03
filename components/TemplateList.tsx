import React from 'react';
import { Pin } from 'lucide-react';
import { TemplateCard } from './TemplateCard';
import { Template } from '../types';

interface TemplateListProps {
  pinnedTemplates: Template[];
  otherTemplates: Template[];
  debouncedSearchQuery: string;
  setSelectedTemplate: (template: Template | null) => void;
  togglePin: (id: string) => void;
  pinnedIds: string[];
}

export const TemplateList: React.FC<TemplateListProps> = ({
  pinnedTemplates,
  otherTemplates,
  debouncedSearchQuery,
  setSelectedTemplate,
  togglePin,
  pinnedIds
}) => {
  return (
    <>
      {/* Pinned Templates Section (Only on All + No Search) */}
      {pinnedTemplates.length > 0 && (
        <div className="mb-24">
            <div className="flex items-center gap-3 mb-10 pb-4 border-b border-[#E5E5E5]">
              <Pin size={16} strokeWidth={1.5} className="text-[#111111]" />
              <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#111111]">
                  Favoritos
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-5 gap-6 md:gap-10">
                {pinnedTemplates.map((template, idx) => (
                  <TemplateCard 
                    key={template.id} 
                    template={template} 
                    searchQuery={debouncedSearchQuery}
                    onClick={() => setSelectedTemplate(template)}
                    index={idx}
                    isPinned={true}
                    onTogglePin={togglePin}
                  />
                ))}
            </div>
        </div>
      )}

      {/* All Templates Section */}
      <div className="min-h-[50vh] pb-12">
        {pinnedTemplates.length > 0 && (
           <div className="flex items-center gap-3 mb-10 pb-4 border-b border-[#E5E5E5]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#CCCCCC]" />
              <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#999999]">
                  Todos os Modelos
              </h3>
           </div>
        )}

        {(otherTemplates.length === 0 && pinnedTemplates.length === 0) ? (
            <div className="flex flex-col items-center justify-center py-32 text-center opacity-40">
              <span className="text-4xl mb-4 text-[#111111]">✦</span>
              <p className="font-serif italic-editorial text-2xl text-[#111111]">Nenhum modelo encontrado</p>
            </div>
        ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-5 gap-6 md:gap-10">
               {otherTemplates.map((template, idx) => (
                  <TemplateCard 
                    key={template.id} 
                    template={template} 
                    searchQuery={debouncedSearchQuery}
                    onClick={() => setSelectedTemplate(template)}
                    index={idx}
                    isPinned={pinnedIds.includes(template.id)}
                    onTogglePin={togglePin}
                  />
               ))}
            </div>
        )}
      </div>
    </>
  );
};
