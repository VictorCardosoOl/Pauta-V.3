import { createContext } from 'react';
import { Template } from '../types';

export interface AppContextType {
  selectedCategory: string;
  setSelectedCategory: (id: string) => void;
  selectedTemplate: Template | null;
  setSelectedTemplate: (template: Template | null) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  isSearchModalOpen: boolean;
  setIsSearchModalOpen: (isOpen: boolean) => void;
  
  // Template Management Logic
  templates: Template[];
}

export const AppContext = createContext<AppContextType | undefined>(undefined);
