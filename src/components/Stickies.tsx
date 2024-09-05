import React, { useState, useEffect } from 'react';
import './Stickies.css';

interface StickiesProps {
  onClose: () => void;
}

interface Sticky {
  id: number;
  content: string;
  color: string;
  position: { x: number; y: number };
}

export default function Stickies({ onClose }: StickiesProps) {
  const [stickies, setStickies] = useState<Sticky[]>([]);

  useEffect(() => {
    loadStickies();
  }, []);

  const loadStickies = () => {
    const savedStickies = localStorage.getItem('stickies');
    if (savedStickies) {
      setStickies(JSON.parse(savedStickies));
    }
  };

  const saveStickiesToLocalStorage = (updatedStickies: Sticky[]) => {
    localStorage.setItem('stickies', JSON.stringify(updatedStickies));
  };

  const addSticky = () => {
    const newSticky: Sticky = {
      id: Date.now(),
      content: '',
      color: getRandomPastelColor(),
      position: { x: 50, y: 50 },
    };
    const updatedStickies = [...stickies, newSticky];
    setStickies(updatedStickies);
    saveStickiesToLocalStorage(updatedStickies);
  };

  const updateSticky = (id: number, content: string) => {
    const updatedStickies = stickies.map(sticky => 
      sticky.id === id ? { ...sticky, content } : sticky
    );
    setStickies(updatedStickies);
    saveStickiesToLocalStorage(updatedStickies);
  };

  const moveSticky = (id: number, position: { x: number; y: number }) => {
    const updatedStickies = stickies.map(sticky => 
      sticky.id === id ? { ...sticky, position } : sticky
    );
    setStickies(updatedStickies);
    saveStickiesToLocalStorage(updatedStickies);
  };

  const deleteSticky = (id: number) => {
    const updatedStickies = stickies.filter(sticky => sticky.id !== id);
    setStickies(updatedStickies);
    saveStickiesToLocalStorage(updatedStickies);
  };

  const getRandomPastelColor = () => {
    const hue = Math.floor(Math.random() * 360);
    return `hsl(${hue}, 100%, 80%)`;
  };

  return (
    <>
      <div className="stickies-controls">
        <button onClick={addSticky}>New Sticky</button>
        <button onClick={onClose}>Close</button>
      </div>
      {stickies.map(sticky => (
        <div
          key={sticky.id}
          className="sticky"
          style={{
            backgroundColor: sticky.color,
            left: sticky.position.x,
            top: sticky.position.y,
          }}
          draggable
          onDragEnd={(e) => moveSticky(sticky.id, { x: e.clientX, y: e.clientY })}
        >
          <textarea
            value={sticky.content}
            onChange={(e) => updateSticky(sticky.id, e.target.value)}
          />
          <button className="delete-sticky" onClick={() => deleteSticky(sticky.id)}>×</button>
        </div>
      ))}
    </>
  );
}