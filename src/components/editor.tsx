'use client';

import React, { useEffect, useRef } from 'react';
import EditorJS, { OutputData } from '@editorjs/editorjs';

// Dynamically import the tools to avoid SSR issues
const tools = {
  paragraph: require('@editorjs/paragraph'),
  header: require('@editorjs/header'),
  list: require('@editorjs/list'),
  embed: require('@editorjs/embed'),
  image: require('@editorjs/image'),
};

interface EditorProps {
  onChange: (data: OutputData) => void;
  data: OutputData;
}

const Editor: React.FC<EditorProps> = ({ onChange, data }) => {
  const editorRef = useRef<EditorJS | null>(null);

  useEffect(() => {
    if (!editorRef.current) {
      const editor = new EditorJS({
        holder: 'editorjs',
        tools: {
          paragraph: {
            class: tools.paragraph,
            inlineToolbar: true,
          },
          header: tools.header,
          list: tools.list,
          embed: tools.embed,
          image: tools.image,
        },
        data: data,
        async onChange(api) {
          const savedData = await api.saver.save();
          onChange(savedData);
        },
        placeholder: 'Start writing...',
        autofocus: true,
      });
      editorRef.current = editor;
    }

    return () => {
      if (editorRef.current && editorRef.current.destroy) {
        editorRef.current.destroy();
        editorRef.current = null;
      }
    };
  }, [data, onChange]);

  return <div id="editorjs" className="prose prose-lg dark:prose-invert max-w-none min-h-[400px]" />;
};

export default Editor;
