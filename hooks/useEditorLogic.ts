import { useState, useMemo, useCallback } from 'react';
import { Template } from '../types';
import { 
  processStaticTags, 
  getInputType, 
  formatValueForText, 
  calculateDuration, 
  generateOSFromDate,
  extractPlaceholders,
  processConditionalLogic
} from '../utils/textUtils';

export const useEditorLogic = (template: Template) => {
  // Lazy initialization: Process text ONCE before the first render to avoid mount flickering/re-renders.
  const [subject, setSubject] = useState<string>(() => processStaticTags(template.subject || ''));
  const [content, setContent] = useState<string>(() => processStaticTags(template.content));
  const [secondaryContent, setSecondaryContent] = useState<string>(() => processStaticTags(template.secondaryContent || ''));
  
  // Keep raw copies for variable replacement reference
  const [rawContent] = useState<string>(() => processStaticTags(template.content));
  const [rawSecondaryContent] = useState<string>(() => processStaticTags(template.secondaryContent || ''));
  
  const [variableValues, setVariableValues] = useState<Record<string, string>>({});
  
  // Initialize showVariables based on screen width
  const [showVariables, setShowVariables] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth >= 1024;
    }
    return true;
  });

  // Identify Scenario Mode
  const isScenarioMode = useMemo(() => template.content.includes('[CENÁRIO:'), [template.content]);

  // Extract placeholders - Uses robust parser from textUtils
  const placeholders = useMemo(() => {
    const allText = `${template.subject || ''} ${template.content} ${template.secondaryContent || ''}`;
    return extractPlaceholders(allText);
  }, [template.content, template.subject, template.secondaryContent]);

  const updateContentWithVariables = useCallback((baseText: string, values: Record<string, string>) => {
    // 1. Process Conditional Logic first
    let result = processConditionalLogic(baseText, values);
    
    // 2. Optimization: Only iterate if we have placeholders
    if (placeholders.length === 0) return result;

    placeholders.forEach(ph => {
      const type = getInputType(ph);
      const rawVal = values[ph];
      
      // Always wrap in span, even if empty (keeps placeholder visible if needed, or just empty span)
      // But if rawVal is empty, we might want to keep the placeholder text?
      // The previous logic kept the placeholder if rawVal was empty (because if (rawVal) check).
      // Let's keep that behavior but wrap it.
      
      if (rawVal) {
        const formattedVal = formatValueForText(rawVal, type);
        // Wrap in span for highlighting
        // We use a specific class 'variable-mark' and data attribute
        const replacement = `<span data-variable="${ph}" class="variable-mark">${formattedVal}</span>`;
        result = result.split(ph).join(replacement);
      } else {
        // If no value, keep placeholder but wrap it so we can highlight it too?
        // User asked to highlight text corresponding to variable.
        // If variable is empty, maybe highlight the placeholder?
        // Let's wrap the placeholder too.
        const replacement = `<span data-variable="${ph}" class="variable-mark placeholder-mark">${ph}</span>`;
        result = result.split(ph).join(replacement);
      }
    });
    return result;
  }, [placeholders]);

  const handleVariableChange = useCallback((placeholder: string, inputValue: string) => {
    setVariableValues(prev => {
      const newValues = { ...prev, [placeholder]: inputValue };

      // Business Logic: Smart Calculations
      if (placeholder === '[Horário Início]' || placeholder === '[Horário Fim]') {
        const start = placeholder === '[Horário Início]' ? inputValue : newValues['[Horário Início]'];
        const end = placeholder === '[Horário Fim]' ? inputValue : newValues['[Horário Fim]'];
        if (start && end) {
          newValues['[Duração]'] = calculateDuration(start, end);
        }
      } else if (placeholder === '[Data]') {
        newValues['[Número OS]'] = generateOSFromDate(inputValue);
      } else if (placeholder === '[Data Extenso]') {
        // Auto-format date if user types just the day number (1-31)
        const day = parseInt(inputValue, 10);
        // Only format if:
        // 1. It's a valid day (1-31)
        // 2. AND (it has 2 digits OR the day is > 3)
        // This prevents "1" from immediately becoming "1st..." preventing "13"
        if (!isNaN(day) && day >= 1 && day <= 31 && (inputValue.length === 2 || day > 3)) {
          const now = new Date();
          const date = new Date(now.getFullYear(), now.getMonth(), day);
          
          // Format: "Terça-feira, 13 de janeiro de 2026"
          const formatter = new Intl.DateTimeFormat('pt-BR', { 
            weekday: 'long', 
            day: 'numeric', 
            month: 'long', 
            year: 'numeric' 
          });
          
          let formatted = formatter.format(date);
          // Capitalize first letter
          formatted = formatted.charAt(0).toUpperCase() + formatted.slice(1);
          
          newValues['[Data Extenso]'] = formatted;
        }
      } else if (placeholder === '[Tipo]') {
        // Automate phrase based on meeting type
        const type = inputValue.toLowerCase().trim();
        let phrase = 'para a nossa Reunião por Videoconferência'; // Default
        
        if (type.includes('alinhamento')) {
          phrase = `para o nosso ${inputValue} por Videoconferência`;
        } else if (type.includes('treinamento')) {
          phrase = `para o nosso ${inputValue} por Videoconferência`;
        } else if (type.includes('reunião') || type.includes('reuniao')) {
           phrase = `para a nossa ${inputValue} por Videoconferência`;
        } else if (inputValue) {
           // Generic fallback trying to be smart or just use the input
           phrase = `para a nossa ${inputValue} por Videoconferência`;
        }
        
        newValues['[Frase Conexão]'] = phrase;
      }

      // Batch updates to avoid multiple re-renders
      // Note: We use functional updates or current state references if needed, 
      // but here we are deriving from rawContent which is stable.
      setContent(updateContentWithVariables(rawContent, newValues));
      setSecondaryContent(updateContentWithVariables(rawSecondaryContent, newValues));
      setSubject(updateContentWithVariables(template.subject || '', newValues));
      
      return newValues;
    });
  }, [rawContent, rawSecondaryContent, template.subject, updateContentWithVariables]);

  const handleReset = useCallback(() => {
    if (!window.confirm('Restaurar texto original?')) return;
    
    // Recalculate static tags cleanly
    const pContent = processStaticTags(template.content);
    const pSecondary = processStaticTags(template.secondaryContent || '');
    
    setContent(pContent);
    setSecondaryContent(pSecondary);
    setSubject(processStaticTags(template.subject || ''));
    setVariableValues({});
  }, [template]);

  // Extract Scenarios - Memoized
  const scenarios = useMemo(() => {
    if (!isScenarioMode) return [];
    return content.split('[').reduce<{title: string, text: string}[]>((acc, seg) => {
      if (seg.startsWith('CENÁRIO:')) {
        const endBracket = seg.indexOf(']');
        if (endBracket !== -1) {
          acc.push({
            title: seg.substring(8, endBracket).trim(),
            text: seg.substring(endBracket + 1).trim()
          });
        }
      }
      return acc;
    }, []);
  }, [content, isScenarioMode]);

  return {
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
  };
};