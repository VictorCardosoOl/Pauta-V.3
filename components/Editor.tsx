
import React, { useRef, useLayoutEffect } from 'react';
import { Template } from '../types';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { useEditorLogic } from '../hooks/useEditorLogic';
import { EditorHeader, VariablePanel, ContentArea } from './EditorComponents';
import { Copy, Check, Layers, X } from 'lucide-react';
import { useTemplateCopier } from '../hooks/useTemplateCopier';
import gsap from 'gsap';
import Lenis from '@studio-freight/lenis';
import { useFocusTrap } from '../hooks/useFocusTrap';

interface EditorProps {
  template: Template;
  onClose: () => void;
}

// Container slide-up animation (Page Transition)
const containerVariants: Variants = {
  hidden: { opacity: 0, y: "100%" },
  visible: {
    opacity: 1,
    y: "0%",
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1] // Power3.out
    }
  },
  exit: {
    opacity: 0,
    y: "100%",
    transition: {
      duration: 0.4,
      ease: [0.16, 1, 0.3, 1]
    }
  }
};

const fabVariants: Variants = {
  hidden: { opacity: 0, scale: 0.8, y: 20 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    y: 0,
    transition: { duration: 0.4, ease: "backOut", delay: 0.6 }
  }
};

export const Editor: React.FC<EditorProps> = ({ template, onClose }) => {
  const {
    subject, setSubject,
    content, setContent,
    secondaryContent, setSecondaryContent,
    variableValues,
    showVariables, setShowVariables,
    handleVariableChange,
    handleReset,
    placeholders,
    scenarios,
    isScenarioMode
  } = useEditorLogic(template);

  const { copyToClipboard, isCopied } = useTemplateCopier();
  const hasVariables = placeholders.length > 0;
  
  const [isMobile, setIsMobile] = React.useState(false);
  const [focusedVariable, setFocusedVariable] = React.useState<string | null>(null);
  
  // Refs for Scroll & Animation
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const contentWrapperRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // --- 1. SMOOTH SCROLL INSIDE EDITOR ---
  useLayoutEffect(() => {
    if (!scrollContainerRef.current || !contentWrapperRef.current) return;

    const lenis = new Lenis({
      wrapper: scrollContainerRef.current,
      content: contentWrapperRef.current,
      duration: 0.8, // Slightly faster
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      touchMultiplier: 2,
    });

    // Use Lenis's own RAF if no complex GSAP ScrollTrigger is needed
    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  // --- 2. GSAP ENTRANCE CHOREOGRAPHY ---
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
        // Wait for page transition to finish (approx 0.5s)
        const timeline = gsap.timeline({ delay: 0.5 });

        // Header falls in smoothly
        timeline.from(headerRef.current, {
            y: -10,
            opacity: 0,
            duration: 0.4,
            ease: "power2.out"
        });

        // Content elements stagger up - Simplified
        timeline.from(".editor-element", {
            y: 20,
            opacity: 0,
            duration: 0.5,
            stagger: 0.05, // Faster stagger
            ease: "power2.out",
            clearProps: "transform" // Only clear transform to avoid layout shifts
        }, "-=0.2");

        // Sidebar slides in
        if (hasVariables && !isMobile) {
            timeline.from(".variable-panel", {
                x: 10,
                opacity: 0,
                duration: 0.4,
                ease: "power2.out"
            }, "-=0.3");
        }
    });

    return () => ctx.revert();
  }, [hasVariables, isMobile]);

  const handleCopyAll = () => {
    const fullText = subject ? `Assunto: ${subject}\n\n${content}` : content;
    copyToClipboard(fullText, 'copy-all');
  };

  const focusTrapRef = useFocusTrap(true);

  return (
    <motion.div 
      ref={focusTrapRef}
      className="h-full flex flex-col relative overflow-hidden bg-editorial-bg"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      tabIndex={-1}
    >
      {/* Header - Fixed */}
      <div ref={headerRef} className="z-20 shrink-0 relative">
        <EditorHeader 
          template={template} 
          onClose={onClose} 
          showVariables={showVariables}
          onToggleVariables={() => setShowVariables(!showVariables)}
          onReset={handleReset}
          hasVariables={hasVariables}
        />
      </div>

      {/* Main Layout */}
      <div className="flex-1 flex flex-row overflow-hidden relative min-h-0">
        
        {/* Content Area (Lenis Scroll Container) */}
        <div ref={scrollContainerRef} className="flex-1 h-full overflow-y-auto custom-scrollbar relative"> 
           {/* Content Wrapper for Lenis */}
           <div ref={contentWrapperRef} className="min-h-full pb-[calc(6rem+env(safe-area-inset-bottom))] md:pb-0">
             <ContentArea 
               template={template}
               subject={subject} setSubject={setSubject}
               content={content} setContent={setContent}
               secondaryContent={secondaryContent} setSecondaryContent={setSecondaryContent}
               isScenarioMode={isScenarioMode}
               scenarios={scenarios}
               focusedVariable={focusedVariable}
             />
           </div>
        </div>

        {/* Variable Panel (Desktop) */}
        {hasVariables && !isMobile && (
           <motion.div 
             initial={false}
             animate={{ 
                width: showVariables ? 380 : 0,
                opacity: showVariables ? 1 : 0
             }}
             transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
             className="hidden lg:block h-full border-l border-editorial-black relative overflow-hidden shrink-0 bg-editorial-bg variable-panel"
           >
             <div className="absolute inset-0 w-[380px] h-full overflow-y-auto custom-scrollbar">
                <VariablePanel 
                  placeholders={placeholders} 
                  variableValues={variableValues} 
                  onVariableChange={handleVariableChange} 
                  isVisible={true} 
                  onFocusVariable={setFocusedVariable}
                />
             </div>
           </motion.div>
        )}

        {/* Mobile Variables Modal */}
        <AnimatePresence>
          {isMobile && hasVariables && showVariables && (
            <>
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-editorial-black/20 backdrop-blur-sm z-40 lg:hidden"
                onClick={() => setShowVariables(false)}
              />
              <motion.div 
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="fixed inset-x-0 bottom-0 z-50 bg-editorial-bg border-t border-editorial-black shadow-2xl h-[75vh] flex flex-col overflow-hidden lg:hidden"
              >
                <div className="flex items-center justify-between px-6 py-5 border-b border-editorial-black shrink-0">
                  <h3 className="text-sm font-bold text-editorial-black uppercase tracking-wider">Personalização</h3>
                  <button onClick={() => setShowVariables(false)} className="p-2 hover:bg-editorial-black/5 text-editorial-black transition-colors">
                    <X size={18} />
                  </button>
                </div>
                <div className="flex-1 overflow-y-auto custom-scrollbar pb-[env(safe-area-inset-bottom)]">
                   <VariablePanel 
                      placeholders={placeholders} 
                      variableValues={variableValues} 
                      onVariableChange={handleVariableChange} 
                      isVisible={true}
                      className="p-6 pb-24"
                      onFocusVariable={setFocusedVariable}
                   />
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* FABs */}
        {!isScenarioMode && (
          <div className="absolute bottom-[calc(2rem+env(safe-area-inset-bottom))] right-6 md:bottom-8 md:right-8 z-30 flex flex-col items-end gap-4 pointer-events-none">
            {secondaryContent && (
              <motion.button 
                variants={fabVariants}
                initial="hidden"
                animate="visible"
                onClick={() => copyToClipboard(secondaryContent, 'sec-float')} 
                className={`
                  pointer-events-auto flex items-center gap-3 px-6 py-4 border rounded-full shadow-sm transition-all duration-200 active:scale-95
                  ${isCopied('sec-float') 
                    ? 'bg-editorial-black text-white border-editorial-black' 
                    : 'bg-editorial-bg text-editorial-black border-editorial-black/20 hover:border-editorial-black hover:bg-editorial-black/5'}
                `}
              >
                {isCopied('sec-float') ? <Check size={18} /> : <Layers size={18} />}
                <span className="text-xs font-bold uppercase tracking-wider">
                  {isCopied('sec-float') ? 'Copiado' : (template.secondaryLabel || 'Protocolo')}
                </span>
              </motion.button>
            )}

            <motion.button 
              variants={fabVariants}
              initial="hidden"
              animate="visible"
              onClick={handleCopyAll} 
              className={`
                pointer-events-auto flex items-center gap-3 px-8 py-4 border rounded-full shadow-sm transition-all duration-200 active:scale-95
                ${isCopied('copy-all') 
                  ? 'bg-editorial-black text-white border-editorial-black' 
                  : 'bg-editorial-black text-white border-editorial-black hover:bg-editorial-black/90'}
              `}
            >
              {isCopied('copy-all') ? <Check size={20} /> : <Copy size={20} />}
              <span className="text-sm font-bold uppercase tracking-widest">
                {isCopied('copy-all') ? 'Copiado' : 'Copiar Tudo'}
              </span>
            </motion.button>
          </div>
        )}
      </div>
    </motion.div>
  );
};
