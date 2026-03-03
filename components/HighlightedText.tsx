import React, { useMemo } from 'react';
import { getAccentInsensitiveRegex } from '../utils/textUtils';

interface HighlightedTextProps {
  text: string;
  highlight: string;
  className?: string;
}

export const HighlightedText = React.memo(({ text, highlight, className }: HighlightedTextProps) => {
  const regex = useMemo(() => {
    if (!highlight.trim()) return null;
    return getAccentInsensitiveRegex(highlight.trim());
  }, [highlight]);

  if (!highlight.trim() || !regex) return <span className={className}>{text}</span>;

  const parts = text.split(regex);
  return (
    <span className={className}>
      {parts.map((part, i) => 
        regex.test(part) ? (
          <span key={i} className="bg-[#E5E5E5] text-[#111111] font-medium px-0.5 rounded-[2px] mx-[1px]">
            {part}
          </span>
        ) : part
      )}
    </span>
  );
});
