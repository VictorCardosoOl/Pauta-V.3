import React, { useState, ReactNode, useEffect } from 'react';
import { Template } from '../types';
import { INITIAL_TEMPLATES } from '../constants';
import { AppContext } from './AppContextObject';

export const AppContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isSearchModalOpen, setIsSearchModalOpen] = useState<boolean>(false);

  // Initialize templates from localStorage or fallback to INITIAL_TEMPLATES
  const [templates] = useState<Template[]>(() => {
    if (typeof window === 'undefined') return INITIAL_TEMPLATES;
    try {
      const saved = localStorage.getItem('quickcomms-templates');
      return saved ? JSON.parse(saved) : INITIAL_TEMPLATES;
    } catch (e) {
      console.error("Failed to load templates", e);
      return INITIAL_TEMPLATES;
    }
  });

  // Persist templates on change
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('quickcomms-templates', JSON.stringify(templates));
    }
  }, [templates]);

  return (
    <AppContext.Provider
      value={{
        selectedCategory,
        setSelectedCategory,
        selectedTemplate,
        setSelectedTemplate,
        searchQuery,
        setSearchQuery,
        isSearchModalOpen,
        setIsSearchModalOpen,
        templates
      }}
    >
      {children}
    </AppContext.Provider>
  );
};