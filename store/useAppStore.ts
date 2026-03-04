import { create } from 'zustand';
import { Template } from '../types';
import { INITIAL_TEMPLATES } from '../constants';

interface AppState {
  // UI State
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  selectedTemplate: Template | null;
  setSelectedTemplate: (template: Template | null) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  isSearchModalOpen: boolean;
  setIsSearchModalOpen: (isOpen: boolean) => void;

  // Data State
  templates: Template[];
  setTemplates: (templates: Template[]) => void;
}

const getInitialTemplates = (): Template[] => {
  if (typeof window === 'undefined') return INITIAL_TEMPLATES;
  try {
    const saved = localStorage.getItem('quickcomms-templates');
    return saved ? JSON.parse(saved) : INITIAL_TEMPLATES;
  } catch (e) {
    console.error("Failed to load templates", e);
    return INITIAL_TEMPLATES;
  }
};

export const useAppStore = create<AppState>((set) => ({
  // UI State
  selectedCategory: 'all',
  setSelectedCategory: (category) => set({ selectedCategory: category }),
  
  selectedTemplate: null,
  setSelectedTemplate: (template) => set({ selectedTemplate: template }),
  
  searchQuery: '',
  setSearchQuery: (query) => set({ searchQuery: query }),
  
  isSearchModalOpen: false,
  setIsSearchModalOpen: (isOpen) => set({ isSearchModalOpen: isOpen }),

  // Data State
  templates: getInitialTemplates(),
  setTemplates: (templates) => {
    set({ templates });
    if (typeof window !== 'undefined') {
      localStorage.setItem('quickcomms-templates', JSON.stringify(templates));
    }
  },
}));
