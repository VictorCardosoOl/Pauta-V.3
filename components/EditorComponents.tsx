
import React, { memo } from 'react';
import { Template, CommunicationChannel } from '../types';
import { SlidersHorizontal, RefreshCw, Sparkles, Calendar, Clock, AlignLeft, Quote, Copy, Check, ChevronLeft } from 'lucide-react';
import { getInputType } from '../utils/textUtils';
import { useTemplateCopier } from '../hooks/useTemplateCopier';
import { RichTextEditor } from './RichTextEditor';

// --- HEADER COMPONENT ---
interface EditorHeaderProps {
  template: Template;
  onClose: () => void;
  showVariables: boolean;
  onToggleVariables: () => void;
  onReset: () => void;
  hasVariables: boolean;
}

export const EditorHeader = memo<EditorHeaderProps>(({ 
  template, onClose, showVariables, onToggleVariables, onReset, hasVariables 
}) => {
  return (
    <div className="editor-header">
      <div className="flex items-center gap-6 min-w-0">
        <button 
          onClick={onClose} 
          className="group editor-btn-back"
          title="Voltar (ESC)"
        >
             <ChevronLeft size={20} strokeWidth={1.5} className="relative -left-[1px] text-editorial-black" />
        </button>
        
        <div className="flex flex-col min-w-0 gap-1">
           <div className="flex items-center gap-2">
             <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-editorial-gray border border-editorial-gray/30 px-3 py-1 rounded-full">
                {template.channel === 'EMAIL' ? 'Email' : (template.channel === 'PROMPT' ? 'Prompt' : 'Chat')}
             </span>
           </div>
           <h1 className="text-xl md:text-3xl font-sans font-black text-editorial-black truncate leading-none mt-2">
             {template.title}
           </h1>
        </div>
      </div>
      
      <div className="flex items-center gap-3">
        {hasVariables && (
           <button 
            onClick={onToggleVariables}
            className={`flex items-center gap-2 px-5 py-2.5 border rounded-full transition-all duration-300 ${
                showVariables 
                ? 'bg-editorial-black text-white border-editorial-black scale-100 shadow-xl' 
                : 'bg-white shadow-sm text-editorial-black border-[#e0e0e0] hover:border-editorial-black scale-95 hover:scale-100'
            }`}
            title="Personalizar"
          >
            <SlidersHorizontal size={16} strokeWidth={1.5} />
            <span className="text-[10px] font-sans font-bold uppercase tracking-[0.2em] hidden md:inline-block">Personalizar</span>
          </button>
        )}
        <button 
            onClick={onReset} 
            className="w-10 h-10 flex items-center justify-center text-editorial-black border border-[#e0e0e0] bg-white shadow-sm rounded-full hover:border-editorial-black hover:bg-editorial-black/5 transition-all duration-300" 
            title="Resetar"
        >
          <RefreshCw size={18} strokeWidth={1.5} />
        </button>
      </div>
    </div>
  );
});

EditorHeader.displayName = 'EditorHeader';

// --- VARIABLE PANEL ---
interface VariablePanelProps {
  placeholders: string[];
  variableValues: Record<string, string>;
  onVariableChange: (placeholder: string, value: string) => void;
  isVisible: boolean;
  className?: string;
  onFocusVariable: (placeholder: string | null) => void;
}

export const VariablePanel = memo<VariablePanelProps>(({ placeholders, variableValues, onVariableChange, isVisible, className, onFocusVariable }) => {
  if (!isVisible || placeholders.length === 0) return null;

  return (
    <div className={`h-full overflow-y-auto custom-scrollbar bg-editorial-bg ${className || 'p-6 md:p-8'}`}>
      <div className="flex items-center gap-2 text-editorial-black mb-6 border-b border-[#e0e0e0] pb-3">
        <Sparkles size={16} strokeWidth={1.25} />
        <span className="text-[10px] font-sans font-semibold uppercase tracking-[0.2em]">Variáveis</span>
      </div>
      
      <div className="flex flex-col gap-8">
        {placeholders.map((placeholder) => {
          const inputType = getInputType(placeholder);
          const value = variableValues[placeholder] || '';
          
          return (
            <div key={placeholder} className="group">
               <label htmlFor={placeholder} className="block text-[10px] font-sans font-semibold uppercase tracking-[0.2em] mb-3 ml-1 text-editorial-gray">
                  {placeholder.replace(/[\][]/g, '')}
               </label>
              <div className="relative">
                {inputType === 'textarea' ? (
                  <textarea
                    id={placeholder}
                    className="w-full bg-transparent border border-[#e0e0e0] rounded-none p-4 text-[var(--text-base)] font-medium text-editorial-black focus:bg-white focus:border-editorial-black outline-none transition-all min-h-[6rem] resize-y placeholder:font-serif placeholder:italic placeholder:text-editorial-gray/50"
                    value={value}
                    onChange={(e) => onVariableChange(placeholder, e.target.value)}
                    onFocus={() => onFocusVariable(placeholder)}
                    onBlur={() => onFocusVariable(null)}
                    placeholder="Digitar valor..."
                  />
                ) : (
                  <input 
                    type={inputType}
                    id={placeholder}
                    className="w-full bg-transparent border border-[#e0e0e0] rounded-none p-4 text-[var(--text-base)] font-medium text-editorial-black focus:bg-white focus:border-editorial-black outline-none transition-all placeholder:font-serif placeholder:italic placeholder:text-editorial-gray/50"
                    value={value} 
                    onChange={(e) => onVariableChange(placeholder, e.target.value)}
                    onFocus={() => onFocusVariable(placeholder)}
                    onBlur={() => onFocusVariable(null)}
                    placeholder="Digitar valor..."
                  />
                )}
                {inputType === 'date' && <Calendar size={18} strokeWidth={1.25} className="absolute right-4 top-4 text-editorial-gray pointer-events-none" />}
                {inputType === 'time' && <Clock size={18} strokeWidth={1.25} className="absolute right-4 top-4 text-editorial-gray pointer-events-none" />}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
});

VariablePanel.displayName = 'VariablePanel';

// --- CONTENT AREA ---
interface Scenario {
  title: string;
  text: string;
}

interface ContentAreaProps {
  template: Template;
  subject: string;
  setSubject: (subject: string) => void;
  content: string;
  setContent: (content: string) => void;
  secondaryContent: string;
  setSecondaryContent: (content: string) => void;
  isScenarioMode: boolean;
  scenarios: Scenario[];
  focusedVariable: string | null;
}

export const ContentArea = memo<ContentAreaProps>(({
  template, subject, setSubject, content, setContent, secondaryContent, setSecondaryContent, isScenarioMode, scenarios, focusedVariable
}) => {
  const { copyToClipboard, isCopied } = useTemplateCopier();

  return (
    // Added 'editor-element' classes for GSAP staggering
    <div className="editor-workspace">
      {isScenarioMode ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {scenarios.map((scene, idx) => (
            <div 
              key={idx} 
              className="editor-element p-8 md:p-10 bg-white border border-[#e0e0e0] shadow-sm hover:shadow-md transition-all duration-300 flex flex-col h-full group"
            >
              <div className="flex justify-between items-center border-b border-[#e0e0e0] pb-5 mb-6">
                <div className="flex items-center gap-3">
                    <Quote size={18} strokeWidth={1.25} className="text-editorial-gray" />
                    <h3 className="text-[10px] font-sans font-semibold uppercase tracking-[0.2em] text-editorial-black">{scene.title}</h3>
                </div>
                <button 
                  onClick={() => copyToClipboard(scene.text, `scene-${idx}`, true)} 
                  className={`text-[9px] font-sans font-bold uppercase tracking-[0.2em] px-4 py-2 border rounded-full transition-all duration-300 ${
                      isCopied(`scene-${idx}`) ? 'bg-editorial-black text-white border-editorial-black' : 'bg-white shadow-sm text-editorial-black border-[#e0e0e0] hover:border-editorial-black'
                  }`}
                >
                  {isCopied(`scene-${idx}`) ? 'Copiado' : 'Copiar'}
                </button>
              </div>
              <div 
                className="text-editorial-black text-lg leading-loose font-serif italic flex-1 prose prose-p:my-2"
                dangerouslySetInnerHTML={{ __html: scene.text }}
              />
            </div>
          ))}
        </div>
      ) : (
        <>
          {/* Main Document */}
          <div className="flex flex-col w-full">
            {template.channel === CommunicationChannel.EMAIL && (
              <div className="editor-element mb-8 lg:mb-10 p-6 border-b border-[#e0e0e0] group transition-all duration-500">
                <div className="flex items-center justify-between mb-6">
                   <label className="font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-editorial-gray">Assunto / Subject</label>
                   <button 
                     onClick={() => copyToClipboard(subject, 'subject')}
                     className={`flex items-center gap-3 font-sans text-[9px] font-bold uppercase tracking-[0.2em] transition-colors bg-transparent px-5 py-2.5 rounded-full ${
                       isCopied('subject') ? 'bg-editorial-black text-white border border-editorial-black' : 'text-editorial-gray border border-[#e0e0e0] hover:border-editorial-black hover:text-editorial-black'
                     }`}
                   >
                     {isCopied('subject') ? <Check size={14}/> : <Copy size={14}/>}
                     {isCopied('subject') ? 'Copiado' : 'Copiar'}
                   </button>
                </div>
                <input 
                  value={subject} 
                  onChange={(e) => setSubject(e.target.value)} 
                  className="w-full bg-transparent text-[var(--text-3xl)] font-serif text-editorial-black outline-none placeholder:text-editorial-gray/30 border-none p-0 focus:ring-0 leading-tight" 
                  placeholder="The subject of the matter..."
                />
              </div>
            )}
            
            <div className="editor-element relative group pl-4 md:pl-0 mt-4">
                <RichTextEditor
                  content={content}
                  onChange={setContent}
                  placeholder="Escreva sua mensagem aqui..."
                  className="text-[var(--text-xl)] text-editorial-black leading-[1.6] font-serif font-light"
                  isSerif={true}
                  focusedVariable={focusedVariable}
                />
            </div>
          </div>

          {/* Secondary Content */}
          {secondaryContent && (
            <div className="editor-element mt-10 pt-10 border-t border-[#e0e0e0]">
               <div className="flex items-center gap-3 mb-6 text-editorial-gray">
                  <AlignLeft size={16} strokeWidth={1.5} />
                  <span className="text-[10px] font-sans font-semibold uppercase tracking-[0.2em]">{template.secondaryLabel || 'Conteúdo Adicional'}</span>
               </div>
               <div className="bg-transparent p-6 md:p-10 border border-[#e0e0e0] hover:bg-white transition-colors">
                   <RichTextEditor
                      content={secondaryContent}
                      onChange={setSecondaryContent}
                      placeholder="Conteúdo secundário..."
                      className="text-[var(--text-lg)] text-editorial-black leading-relaxed"
                      isSerif={false}
                      focusedVariable={focusedVariable}
                    />
               </div>
            </div>
          )}
        </>
      )}
    </div>
  );
});

ContentArea.displayName = 'ContentArea';
