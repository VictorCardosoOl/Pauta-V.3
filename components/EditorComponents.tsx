
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
    <div className="flex-none flex items-center justify-between px-6 py-6 pt-[max(2rem,env(safe-area-inset-top))] md:px-12 md:py-8 bg-editorial-bg sticky top-0 z-20 border-b border-editorial-black">
      <div className="flex items-center gap-6 min-w-0">
        <button 
          onClick={onClose} 
          className="ml-[60px] md:ml-[40px] group flex items-center justify-center w-10 h-10 md:w-12 md:h-12 border border-editorial-black hover:bg-editorial-black hover:text-white transition-all active:scale-95 bg-transparent"
          title="Voltar (ESC)"
        >
             <ChevronLeft size={20} strokeWidth={1.5} className="relative -left-[1px]" />
        </button>
        
        <div className="flex flex-col min-w-0 gap-1">
           <div className="flex items-center gap-2">
             <span className="text-[10px] font-sans font-bold uppercase tracking-widest text-editorial-gray border border-editorial-gray/30 px-2 py-0.5 rounded-full">
                {template.channel === 'EMAIL' ? 'Email' : (template.channel === 'PROMPT' ? 'Prompt' : 'Chat')}
             </span>
           </div>
           <h1 className="text-xl md:text-3xl font-sans font-bold text-editorial-black truncate leading-none mt-1">
             {template.title}
           </h1>
        </div>
      </div>
      
      <div className="flex items-center gap-3">
        {hasVariables && (
           <button 
            onClick={onToggleVariables}
            className={`flex items-center gap-2 px-5 py-2.5 border transition-all duration-300 active:scale-95 ${
                showVariables 
                ? 'bg-editorial-black text-white border-editorial-black' 
                : 'bg-transparent text-editorial-black border-editorial-black hover:bg-editorial-black/5'
            }`}
            title="Personalizar"
          >
            <SlidersHorizontal size={16} strokeWidth={1.5} />
            <span className="text-[10px] font-sans font-bold uppercase tracking-widest hidden md:inline-block">Personalizar</span>
          </button>
        )}
        <button 
            onClick={onReset} 
            className="w-10 h-10 flex items-center justify-center text-editorial-black border border-editorial-black hover:bg-editorial-black hover:text-white transition-colors" 
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
    <div className={`h-full overflow-y-auto custom-scrollbar bg-editorial-bg ${className || 'p-8 md:p-10'}`}>
      <div className="flex items-center gap-2 text-editorial-black mb-8 border-b border-editorial-black pb-4">
        <Sparkles size={16} strokeWidth={1.25} />
        <span className="text-[10px] font-sans font-bold uppercase tracking-widest">Variáveis</span>
      </div>
      
      <div className="flex flex-col gap-8">
        {placeholders.map((placeholder) => {
          const inputType = getInputType(placeholder);
          const value = variableValues[placeholder] || '';
          
          return (
            <div key={placeholder} className="group">
               <label htmlFor={placeholder} className="block text-[10px] font-sans font-bold uppercase tracking-widest mb-3 ml-1 text-editorial-gray">
                  {placeholder.replace(/[\][]/g, '')}
               </label>
              <div className="relative">
                {inputType === 'textarea' ? (
                  <textarea
                    id={placeholder}
                    className="w-full bg-transparent border border-editorial-black rounded-none p-4 text-sm font-medium text-editorial-black focus:bg-white outline-none transition-all min-h-[6rem] resize-y placeholder:font-serif placeholder:italic placeholder:text-editorial-gray/50"
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
                    className="w-full bg-transparent border border-editorial-black rounded-none p-4 text-sm font-medium text-editorial-black focus:bg-white outline-none transition-all placeholder:font-serif placeholder:italic placeholder:text-editorial-gray/50"
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
  setSubject: (v: string) => void;
  content: string;
  setContent: (v: string) => void;
  secondaryContent: string;
  setSecondaryContent: (v: string) => void;
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
    <div className="w-full max-w-4xl 3xl:max-w-5xl mx-auto p-6 md:p-16 3xl:p-24 pb-40 flex flex-col gap-12">
      {isScenarioMode ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {scenarios.map((scene, idx) => (
            <div 
              key={idx} 
              className="editor-element p-10 bg-transparent border border-editorial-black hover:bg-white transition-all duration-300 flex flex-col h-full group"
            >
              <div className="flex justify-between items-center border-b border-editorial-black pb-5 mb-6">
                <div className="flex items-center gap-3">
                    <Quote size={18} strokeWidth={1.25} className="text-editorial-gray" />
                    <h3 className="text-[10px] font-sans font-bold uppercase tracking-widest text-editorial-black">{scene.title}</h3>
                </div>
                <button 
                  onClick={() => copyToClipboard(scene.text, `scene-${idx}`, true)} 
                  className={`text-[9px] font-sans font-bold uppercase tracking-widest px-3 py-1.5 border transition-all ${
                      isCopied(`scene-${idx}`) ? 'bg-editorial-black text-white border-editorial-black' : 'bg-transparent text-editorial-black border-editorial-black hover:bg-editorial-black hover:text-white'
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
              <div className="editor-element mb-12 p-8 bg-transparent border border-editorial-black transition-colors group focus-within:bg-white">
                <div className="flex items-center justify-between mb-4">
                   <label className="text-[9px] font-sans font-bold uppercase tracking-widest text-editorial-gray">Assunto</label>
                   <button 
                     onClick={() => copyToClipboard(subject, 'subject')}
                     className="flex items-center gap-2 text-[9px] font-sans font-medium tracking-wide text-editorial-black hover:text-white transition-colors bg-transparent px-3 py-1.5 border border-editorial-black hover:bg-editorial-black"
                   >
                     {isCopied('subject') ? <Check size={12}/> : <Copy size={12}/>}
                     {isCopied('subject') ? 'Copiado' : 'Copiar'}
                   </button>
                </div>
                <input 
                  value={subject} 
                  onChange={(e) => setSubject(e.target.value)} 
                  className="w-full bg-transparent text-2xl md:text-3xl font-serif italic text-editorial-black outline-none placeholder:text-editorial-gray/30 border-none p-0 focus:ring-0 leading-tight" 
                  placeholder="Insira o assunto..."
                />
              </div>
            )}
            
            <div className="editor-element relative group pl-2 md:pl-0">
                <RichTextEditor
                  content={content}
                  onChange={setContent}
                  placeholder="Escreva sua mensagem aqui..."
                  className="text-2xl md:text-3xl 3xl:text-4xl text-editorial-black leading-[1.6]"
                  isSerif={true}
                  focusedVariable={focusedVariable}
                />
            </div>
          </div>

          {/* Secondary Content */}
          {secondaryContent && (
            <div className="editor-element mt-16 pt-16 border-t border-editorial-black">
               <div className="flex items-center gap-3 mb-8 text-editorial-gray">
                  <AlignLeft size={16} strokeWidth={1.5} />
                  <span className="text-[10px] font-sans font-bold uppercase tracking-widest">{template.secondaryLabel || 'Conteúdo Adicional'}</span>
               </div>
               <div className="bg-transparent p-8 border border-editorial-black hover:bg-white transition-colors">
                   <RichTextEditor
                      content={secondaryContent}
                      onChange={setSecondaryContent}
                      placeholder="Conteúdo secundário..."
                      className="text-base text-editorial-black leading-relaxed"
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
