import { useEffect, useRef } from 'react';

export const useFocusTrap = (isActive: boolean) => {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isActive) return;

    const element = elementRef.current;
    if (!element) return;

    const focusableElements = element.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    };

    element.addEventListener('keydown', handleTab);
    
    // Focus the first element when activated
    // setTimeout to ensure render is complete and element is visible
    setTimeout(() => {
        firstElement?.focus();
    }, 50);

    return () => {
      element.removeEventListener('keydown', handleTab);
    };
  }, [isActive]);

  return elementRef;
};
