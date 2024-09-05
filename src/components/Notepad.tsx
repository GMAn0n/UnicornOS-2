import React, { useState, useEffect } from 'react';
import './Notepad.css';

interface NotepadProps {
  onClose: () => void;
}

export default function Notepad({ onClose }: NotepadProps) {
  const [content, setContent] = useState('');

  useEffect(() => {
    const savedContent = localStorage.getItem('notepadContent');
    if (savedContent) {
      setContent(savedContent);
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = e.target.value;
    setContent(newContent);
    localStorage.setItem('notepadContent', newContent);
  };

  const saveNote = () => {
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'note.txt';
    a.click();
  };

  return (
    <div className="window notepad">
      <div className="window-header">
        <span>Notepad</span>
        <button onClick={onClose}>×</button>
      </div>
      <div className="window-content">
        <textarea value={content} onChange={handleChange}></textarea>
        <button onClick={saveNote}>Save</button>
      </div>
    </div>
  );
}