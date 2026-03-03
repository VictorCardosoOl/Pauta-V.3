import React, { useEffect } from 'react';
import { useEditor, EditorContent, mergeAttributes } from '@tiptap/react';
import { Mark } from '@tiptap/core';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import { Bold, Italic, List, ListOrdered } from 'lucide-react';

// Custom Mark for Variables
const VariableMark = Mark.create({
  name: 'variable',
  
  addAttributes() {
    return {
      variable: {
        default: null,
        parseHTML: element => element.getAttribute('data-variable'),
        renderHTML: attributes => {
          return {
            'data-variable': attributes.variable,
          }
        },
      },
      class: {
        default: 'variable-mark',
      }
    }
  },

  parseHTML() {
    return [
      {
        tag: 'span[data-variable]',
      },
    ]
  },

  renderHTML({ HTMLAttributes }) {
    return ['span', mergeAttributes(HTMLAttributes), 0]
  },
})

interface RichTextEditorProps {
  content: string;
  onChange: (content: string) => void;
  placeholder?: string;
  className?: string;
  isSerif?: boolean;
  focusedVariable?: string | null;
}

export const RichTextEditor: React.FC<RichTextEditorProps> = ({ content, onChange, placeholder, className, isSerif = true, focusedVariable }) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: placeholder,
        emptyEditorClass: 'is-editor-empty before:content-[attr(data-placeholder)] before:text-editorial-gray/20 before:float-left before:pointer-events-none',
      }),
      VariableMark,
    ],
    content: content,
    editorProps: {
      attributes: {
        class: `outline-none min-h-[150px] ${className || ''} ${isSerif ? 'font-serif italic' : 'font-sans'}`,
      },
    },
    onUpdate: ({ editor }) => {
        onChange(editor.getHTML());
    },
  });

  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
        editor.commands.setContent(content);
    }
  }, [content, editor]);

  // Dynamic Highlighting via CSS Injection
  // We inject a style tag that targets the specific variable being focused
  // This is more performant than re-rendering the editor content
  useEffect(() => {
    if (!editor || !focusedVariable) return;
    
    // We need to escape the variable name for CSS selector if it contains brackets
    // e.g. [Nome] -> span[data-variable="[Nome]"]
    // CSS attribute selectors handle special chars fine inside quotes
    
    const styleId = 'variable-highlight-style';
    let styleEl = document.getElementById(styleId) as HTMLStyleElement;
    
    if (!styleEl) {
      styleEl = document.createElement('style');
      styleEl.id = styleId;
      document.head.appendChild(styleEl);
    }
    
    // Use !important to override default styles if needed, but background-color usually wins
    // Using the pastel highlight color defined in tailwind config (editorial-highlight)
    // We can use the CSS variable if available, or hardcode the hex for now since we defined it in index.html
    // Actually, index.html defines it in tailwind config, which generates classes.
    // It doesn't automatically generate CSS variables unless we use @theme or similar.
    // But we can use the hex code directly: #FFF9C4
    
    // Also adding a transition for smoothness
    styleEl.innerHTML = `
      span[data-variable="${focusedVariable}"] {
        background-color: #FFF9C4;
        border-radius: 2px;
        box-shadow: 0 0 0 2px #FFF9C4;
        transition: background-color 0.2s ease, box-shadow 0.2s ease;
      }
    `;
    
    return () => {
      if (styleEl) {
         styleEl.innerHTML = '';
      }
    };
  }, [focusedVariable, editor]);

  if (!editor) return null;

  return (
    <div className="relative group flex flex-col">
      {/* Fixed Toolbar */}
      <div className="flex items-center gap-2 border-b border-editorial-black/10 pb-3 mb-4 opacity-50 group-focus-within:opacity-100 transition-opacity">
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`p-2 rounded hover:bg-editorial-black/5 transition-colors ${editor.isActive('bold') ? 'bg-editorial-black/10 text-editorial-black' : 'text-editorial-gray'}`}
          title="Negrito"
        >
          <Bold size={16} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`p-2 rounded hover:bg-editorial-black/5 transition-colors ${editor.isActive('italic') ? 'bg-editorial-black/10 text-editorial-black' : 'text-editorial-gray'}`}
          title="Itálico"
        >
          <Italic size={16} />
        </button>
        <div className="w-px h-4 bg-editorial-black/10 mx-1" />
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`p-2 rounded hover:bg-editorial-black/5 transition-colors ${editor.isActive('bulletList') ? 'bg-editorial-black/10 text-editorial-black' : 'text-editorial-gray'}`}
          title="Lista"
        >
          <List size={16} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`p-2 rounded hover:bg-editorial-black/5 transition-colors ${editor.isActive('orderedList') ? 'bg-editorial-black/10 text-editorial-black' : 'text-editorial-gray'}`}
          title="Lista Numerada"
        >
          <ListOrdered size={16} />
        </button>
      </div>
      <EditorContent editor={editor} />
    </div>
  );
};
