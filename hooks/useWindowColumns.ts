import { useState, useEffect } from 'react';

export function useWindowColumns() {
  const [cols, setCols] = useState(1);

  useEffect(() => {
    function handleResize() {
      const w = window.innerWidth;
      if (w >= 1536) setCols(4);
      else if (w >= 1280) setCols(3);
      else if (w >= 768) setCols(2);
      else setCols(1);
    }
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return cols;
}
