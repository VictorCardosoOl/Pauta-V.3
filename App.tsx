
import React, { useMemo, useRef, useEffect, useState, useLayoutEffect, Component, ErrorInfo, ReactNode } from 'react';
import { Editor } from './components/Editor';
import { CommandMenu } from './components/CommandMenu';
import { EditorialSidebar } from './components/EditorialSidebar';
import { EditorialFeed } from './components/EditorialFeed';
import { CATEGORIES } from './constants';
import { motion, AnimatePresence } from 'framer-motion';
import { useDebounce } from './hooks/useDebounce';
import { useAppContext } from './hooks/useAppContext';
import { AppContextProvider } from './contexts/AppContext'; // Import Provider
import gsap from 'gsap';
import Lenis from '@studio-freight/lenis';

// --- ERROR BOUNDARY ---
class ErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean; error: Error | null }> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center h-screen bg-[#FDFCFB] text-[#1C1C1E] p-8 text-center">
          <h1 className="text-2xl font-serif italic mb-4">Algo deu errado.</h1>
          <p className="text-sm font-mono bg-red-50 text-red-600 p-4 rounded-lg max-w-2xl overflow-auto">
            {this.state.error?.message}
          </p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-6 px-6 py-2 bg-[#1C1C1E] text-white rounded-full text-sm font-bold uppercase tracking-wider hover:bg-black transition-colors"
          >
            Recarregar Página
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

// --- ANIMATION CONSTANTS ---
const TRANSITION_EASE = [0.16, 1, 0.3, 1]; // Power3.out - Snappy but smooth

const pageVariants = {
  listInitial: { opacity: 0, scale: 0.98 },
  listAnimate: { 
    opacity: 1, 
    scale: 1, 
    transition: { duration: 0.5, ease: TRANSITION_EASE } 
  },
  listExit: { 
    opacity: 0, 
    scale: 0.98,
    transition: { duration: 0.3, ease: "easeIn" } 
  },
  editorInitial: { opacity: 0, y: "20px" }, // Reduced movement distance
  editorAnimate: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.5, ease: TRANSITION_EASE } 
  },
  editorExit: { 
    opacity: 0,
    y: "20px", 
    transition: { duration: 0.3, ease: "easeIn" } 
  }
};

// --- MAIN APP CONTENT ---

const AppContent: React.FC = () => {
  const {
    selectedCategory, setSelectedCategory,
    selectedTemplate, setSelectedTemplate,
    searchQuery, setSearchQuery,
    isSearchModalOpen, setIsSearchModalOpen,
    templates
  } = useAppContext();

  const debouncedSearchQuery = useDebounce(searchQuery, 300);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const contentWrapperRef = useRef<HTMLDivElement>(null);
  
  // Optimized Pinned IDs State
  const [pinnedIds, setPinnedIds] = useState<string[]>(() => {
    if (typeof window === 'undefined') return [];
    try {
      const savedPins = localStorage.getItem('quickcomms-favorites');
      return savedPins ? JSON.parse(savedPins) : [];
    } catch (e) {
      console.error("Failed to parse favorites", e);
      return [];
    }
  });

  const togglePin = (id: string) => {
    setPinnedIds(prev => {
      const newPins = prev.includes(id) 
        ? prev.filter(pId => pId !== id) 
        : [...prev, id];
      
      localStorage.setItem('quickcomms-favorites', JSON.stringify(newPins));
      return newPins;
    });
  };

  // --- LENIS SCROLL (PERSISTENT) ---
  const lenisRef = useRef<Lenis | null>(null);
  const updateRef = useRef<((time: number) => void) | null>(null);

  useLayoutEffect(() => {
    if (selectedTemplate) return; 
    if (!scrollContainerRef.current || !contentWrapperRef.current) return;

    const lenis = new Lenis({
        wrapper: scrollContainerRef.current,
        content: contentWrapperRef.current,
        duration: 0.9, 
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        touchMultiplier: 2,
    });

    lenisRef.current = lenis;

    const update = (time: number) => {
      lenis.raf(time * 1000);
    };
    updateRef.current = update;
    
    gsap.ticker.add(update);

    return () => {
      if (updateRef.current) {
        gsap.ticker.remove(updateRef.current);
      }
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [selectedTemplate]); 

  // --- SCROLL RESET ON CHANGE ---
  useEffect(() => {
      if (!selectedTemplate && lenisRef.current) {
          lenisRef.current.scrollTo(0, { immediate: true });
      }
  }, [selectedCategory, debouncedSearchQuery, pinnedIds, selectedTemplate]);

  // --- SHORTCUTS ---
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchModalOpen(true);
      }
      if (e.key === 'Escape') {
        if (isSearchModalOpen) {
            e.preventDefault();
            setIsSearchModalOpen(false);
            return;
        }
        if (selectedTemplate) {
          e.preventDefault();
          setSelectedTemplate(null);
          return;
        }
        if (searchQuery) {
            setSearchQuery('');
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedTemplate, searchQuery, isSearchModalOpen, setSelectedTemplate, setSearchQuery, setIsSearchModalOpen]);

  const normalizeText = (str: string) => str ? str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase() : "";

  // Filter Logic
  const { pinnedTemplates, otherTemplates } = useMemo(() => {
    let baseList = templates || [];
    
    const query = normalizeText(debouncedSearchQuery.trim());
    if (query) {
       baseList = baseList.filter(t => {
         const fields = [t.title, t.description, t.content, t.subject, t.secondaryContent];
         return fields.some(field => normalizeText(field || '').includes(query));
       });
    } else if (selectedCategory !== 'all') {
      baseList = baseList.filter(t => t.category === selectedCategory);
    }

    // Always split for Editorial Layout
    return {
        pinnedTemplates: baseList.filter(t => pinnedIds.includes(t.id)),
        otherTemplates: baseList.filter(t => !pinnedIds.includes(t.id))
    };
  }, [selectedCategory, debouncedSearchQuery, pinnedIds, templates]);

  return (
    <div className="flex h-[100dvh] w-full overflow-hidden relative bg-editorial-bg text-editorial-black font-sans selection:bg-editorial-black selection:text-white">
      
      <CommandMenu />

      {/* NEW: Editorial Sidebar (Desktop) */}
      <EditorialSidebar 
        selectedCategory={selectedCategory} 
        onSelectCategory={(id) => {
           setSelectedCategory(id);
           setSearchQuery('');
           setSelectedTemplate(null);
        }} 
      />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-full overflow-hidden relative">
        {/* Mobile Header (Only visible on small screens) */}
        <div className="lg:hidden p-6 border-b border-editorial-black flex justify-between items-center bg-editorial-bg z-10">
           <div className="font-sans font-bold text-xl tracking-tighter uppercase">
              {selectedCategory === 'all' ? 'Pauta' : CATEGORIES.find(c => c.id === selectedCategory)?.name}
           </div>
           <button onClick={() => setIsSearchModalOpen(true)} className="p-2 border border-editorial-black rounded-full">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
           </button>
        </div>

        <div className="relative flex flex-col h-full overflow-hidden">
            <AnimatePresence mode="wait" initial={false}>
              {!selectedTemplate ? (
                <motion.div 
                  key="list-view"
                  variants={pageVariants}
                  initial="listInitial"
                  animate="listAnimate"
                  exit="listExit"
                  className="flex flex-col w-full h-full will-change-transform"
                >
                  <div ref={scrollContainerRef} className="flex-1 overflow-y-auto custom-scrollbar">
                    <div ref={contentWrapperRef} className="w-full h-full">
                      <EditorialFeed 
                        pinnedTemplates={pinnedTemplates}
                        otherTemplates={otherTemplates}
                        setSelectedTemplate={setSelectedTemplate}
                        selectedCategory={selectedCategory}
                        onPin={togglePin}
                        pinnedIds={pinnedIds}
                      />
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="editor-view"
                  variants={pageVariants}
                  initial="editorInitial"
                  animate="editorAnimate"
                  exit="editorExit"
                  className="absolute inset-0 z-20 bg-editorial-bg overflow-hidden flex flex-col will-change-transform"
                >
                   <Editor key={selectedTemplate.id} template={selectedTemplate} onClose={() => setSelectedTemplate(null)} />
                </motion.div>
              )}
            </AnimatePresence>
        </div>
      </main>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <AppContextProvider>
        <AppContent />
      </AppContextProvider>
    </ErrorBoundary>
  );
};

export default App;
