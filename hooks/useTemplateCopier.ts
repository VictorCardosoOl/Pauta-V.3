
import { useState, useCallback } from 'react';

interface UseTemplateCopierReturn {
  copyToClipboard: (text: string, key: string) => Promise<void>;
  isCopied: (key: string) => boolean;
}

/**
 * Sanitizes and formats text for HTML clipboard insertion.
 */
const formatForHtmlClipboard = (text: string): string => {
  const escapeMap: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };

  const escapedText = text.replace(/[&<>"']/g, (m) => escapeMap[m]);

  return escapedText
    .replace(/\t/g, "&nbsp;&nbsp;&nbsp;&nbsp;")
    .replace(/\n/g, "<br>")
    .replace(/\*([\s\S]*?)\*/g, "<b>$1</b>") // Bold
    .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2">$1</a>'); // Links
};

export const useTemplateCopier = (): UseTemplateCopierReturn => {
  const [copiedStates, setCopiedStates] = useState<Record<string, boolean>>({});

  const isCopied = useCallback((key: string) => !!copiedStates[key], [copiedStates]);

  const copyToClipboard = useCallback(async (textToCopy: string, key: string, isHtml = false) => {
    if (!textToCopy) return;

    try {
      let htmlContent;
      let plainText;

      if (isHtml) {
        htmlContent = textToCopy;
        // Strip HTML tags for plain text fallback
        plainText = textToCopy.replace(/<[^>]*>/g, '');
      } else {
        htmlContent = formatForHtmlClipboard(textToCopy);
        plainText = textToCopy;
      }

      const fullHtml = `
        <span style="font-family: 'Calibri', 'Segoe UI', sans-serif; font-size: 11pt; color: #000000; line-height: 1.5;">
          ${htmlContent}
        </span>
      `;

      const clipboardItem = new ClipboardItem({
        'text/plain': new Blob([plainText], { type: 'text/plain' }),
        'text/html': new Blob([fullHtml], { type: 'text/html' })
      });

      await navigator.clipboard.write([clipboardItem]);
    } catch {
      // Fallback for browsers/contexts with restricted ClipboardItem support
      try {
        await navigator.clipboard.writeText(isHtml ? textToCopy.replace(/<[^>]*>/g, '') : textToCopy);
      } catch {
        // Silent fail or toast notification logic here
        return; 
      }
    }

    setCopiedStates(prev => ({ ...prev, [key]: true }));
    setTimeout(() => {
      setCopiedStates(prev => ({ ...prev, [key]: false }));
    }, 2000);
  }, []);

  return { copyToClipboard, isCopied };
};
