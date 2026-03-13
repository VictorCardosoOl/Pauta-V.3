
import { useState, useCallback } from 'react';

interface UseTemplateCopierReturn {
  copyToClipboard: (text: string, key: string, isHtml?: boolean) => Promise<void>;
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

/**
 * Strips internal editor attributes and classes from HTML for clean pasting.
 */
const cleanHtmlForClipboard = (html: string): string => {
  if (!html) return '';
  
  return html
    // Remove variable highlighting spans but keep content (match by data-variable or class)
    .replace(/<span[^>]*(?:data-variable|class="[^"]*variable-mark[^"]*")[^>]*>([\s\S]*?)<\/span>/gi, '$1')
    // Remove data attributes
    .replace(/\sdata-[a-z0-9-]+="[^"]*"/gi, '')
    // Remove internal classes
    .replace(/\sclass="[^"]*"/gi, '')
    // Remove empty spans
    .replace(/<span>([\s\S]*?)<\/span>/gi, '$1');
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
        // Clean HTML for clipboard (remove editor-specific tags/classes)
        htmlContent = cleanHtmlForClipboard(textToCopy);
        
        // Convert <br> and paragraph endings to newlines for plain text fallback
        let tempText = textToCopy.replace(/<br\s*\/?>/gi, '\n');
        tempText = tempText.replace(/<\/p>/gi, '\n\n');
        tempText = tempText.replace(/<li[^>]*>/gi, '• ');
        tempText = tempText.replace(/<\/li>/gi, '\n');
        
        // Strip remaining HTML tags
        plainText = tempText.replace(/<[^>]*>/g, '');
        
        // Decode common HTML entities for plain text
        plainText = plainText
          .replace(/&nbsp;/g, ' ')
          .replace(/&amp;/g, '&')
          .replace(/&lt;/g, '<')
          .replace(/&gt;/g, '>')
          .replace(/&quot;/g, '"')
          .replace(/&#039;/g, "'");
      } else {
        htmlContent = formatForHtmlClipboard(textToCopy);
        // For plain text, we might want to strip markdown-like bold if it exists
        plainText = textToCopy.replace(/\*([\s\S]*?)\*/g, "$1");
      }

      const fullHtml = `
        <div style="font-family: 'Calibri', 'Segoe UI', sans-serif; font-size: 11pt; color: #000000; line-height: 1.5;">
          ${htmlContent}
        </div>
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
