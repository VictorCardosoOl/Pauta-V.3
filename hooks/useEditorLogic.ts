import { useState, useMemo, useCallback } from 'react';
import { Template } from '../types';
import { 
  processStaticTags, 
  getInputType, 
  formatValueForText, 
  calculateDuration, 
  generateOSFromDate,
  extractPlaceholders,
  processConditionalLogic,
  formatTextToHtml
} from '../utils/textUtils';

export const useEditorLogic = (template: Template) => {
  // Lazy initialization: Process text ONCE before the first render to avoid mount flickering/re-renders.
  const [subject, setSubject] = useState<string>(() => processStaticTags(template.subject || ''));
  // Format content to HTML (convert newlines to <br>) for RichTextEditor
  const [content, setContent] = useState<string>(() => formatTextToHtml(processStaticTags(template.content)));
  const [secondaryContent, setSecondaryContent] = useState<string>(() => formatTextToHtml(processStaticTags(template.secondaryContent || '')));
  
  // Keep raw copies for variable replacement reference - ALSO formatted as HTML to match structure
  const [rawContent] = useState<string>(() => formatTextToHtml(processStaticTags(template.content)));
  const [rawSecondaryContent] = useState<string>(() => formatTextToHtml(processStaticTags(template.secondaryContent || '')));
  
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

  const updateContentWithVariables = useCallback((baseText: string, values: Record<string, string>, isHtml: boolean = true) => {
    // 1. Process Conditional Logic first
    let result = processConditionalLogic(baseText, values);
    
    // 2. Optimization: Only iterate if we have placeholders
    if (placeholders.length === 0) return result;

    placeholders.forEach(ph => {
      const type = getInputType(ph);
      const rawVal = values[ph];
      
      if (rawVal) {
        const formattedVal = formatValueForText(rawVal, type);
        if (isHtml) {
          // Escape < and > in the user input to prevent HTML injection issues in Tiptap
          const escapedVal = formattedVal.replace(/</g, '&lt;').replace(/>/g, '&gt;');
          // Wrap in span for highlighting
          const replacement = `<span data-variable="${ph}" class="variable-mark">${escapedVal}</span>`;
          result = result.split(ph).join(replacement);
        } else {
          result = result.split(ph).join(formattedVal);
        }
      } else {
        if (isHtml) {
          const escapedPh = ph.replace(/</g, '&lt;').replace(/>/g, '&gt;');
          const replacement = `<span data-variable="${ph}" class="variable-mark placeholder-mark">${escapedPh}</span>`;
          result = result.split(ph).join(replacement);
        } else {
          result = result.split(ph).join(ph);
        }
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
      setContent(updateContentWithVariables(rawContent, newValues, true));
      setSecondaryContent(updateContentWithVariables(rawSecondaryContent, newValues, true));
      setSubject(updateContentWithVariables(template.subject || '', newValues, false));
      
      return newValues;
    });
  }, [rawContent, rawSecondaryContent, template.subject, updateContentWithVariables]);

  const handleReset = useCallback(() => {
    if (!window.confirm('Restaurar texto original?')) return;
    
    // Recalculate static tags cleanly
    const pContent = formatTextToHtml(processStaticTags(template.content));
    const pSecondary = formatTextToHtml(processStaticTags(template.secondaryContent || ''));
    
    setContent(pContent);
    setSecondaryContent(pSecondary);
    setSubject(processStaticTags(template.subject || ''));
    setVariableValues({});
  }, [template]);

  // Extract Scenarios - Robust Regex Parser
  const scenarios = useMemo(() => {
    if (!isScenarioMode) return [];
    
    // Regex to match [CENÁRIO: Title] Content
    // It looks for [CENÁRIO: followed by anything until ]
    // Then captures everything until the next [CENÁRIO: or end of string
    const scenarioRegex = /\[CENÁRIO:\s*([^\]]+)\]([\s\S]*?)(?=\[CENÁRIO:|$)/gi;
    const matches = [...content.matchAll(scenarioRegex)];
    
    return matches.map(match => ({
      title: match[1].trim(),
      text: match[2].trim()
    }));
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