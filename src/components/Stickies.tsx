import React, { useState, useEffect, useCallback, useRef } from 'react';
import './Stickies.css';

interface StickiesProps {
  onClose: () => void;
  onNewSticky: () => void;
  stickiesCount: number;
}

interface Sticky {
  id: number;
  content: string;
  color: string;
  position: { x: number; y: number };
}

export default function Stickies({ onClose, onNewSticky, stickiesCount }: StickiesProps) {
  const [stickies, setStickies] = useState<Sticky[]>([]);
  const [lastColor, setLastColor] = useState('');
  const prevStickiesCountRef = useRef(0);
  const isInitialMount = useRef(true);
  const hasSavedStickies = useRef(false);

  const saveStickiesToLocalStorage = useCallback((updatedStickies: Sticky[]) => {
    localStorage.setItem('stickies', JSON.stringify(updatedStickies));
  }, []);

  const getRandomPosition = (): { x: number; y: number } => {
    const x = Math.random() * (window.innerWidth - 200);
    const y = Math.random() * (window.innerHeight - 200);
    return { x, y };
  };

  const getRandomPastelColor = useCallback((): string => {
    const hue = Math.floor(Math.random() * 360);
    const saturation = 70 + Math.random() * 10; // 70-80%
    const lightness = 80 + Math.random() * 10; // 80-90%
    const newColor = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
    if (newColor === lastColor) {
      return getRandomPastelColor(); // Recursively try again if it's the same as the last color
    }
    setLastColor(newColor);
    return newColor;
  }, [lastColor]);

  const addSticky = useCallback(() => {
    const newSticky: Sticky = {
      id: Date.now(),
      content: '',
      color: getRandomPastelColor(),
      position: getRandomPosition(),
    };
    setStickies(prevStickies => {
      const updatedStickies = [...prevStickies, newSticky];
      saveStickiesToLocalStorage(updatedStickies);
      return updatedStickies;
    });
  }, [getRandomPastelColor, saveStickiesToLocalStorage]);

  useEffect(() => {
    const savedStickies = localStorage.getItem('stickies');
    if (savedStickies) {
      setStickies(JSON.parse(savedStickies));
      hasSavedStickies.current = true;
    } else if (isInitialMount.current) {
      addSticky();
    }
    isInitialMount.current = false;
  }, [addSticky]);

  useEffect(() => {
    if (!isInitialMount.current && stickiesCount > prevStickiesCountRef.current) {
      if (hasSavedStickies.current) {
        hasSavedStickies.current = false;
      } else {
        addSticky();
      }
    }
    prevStickiesCountRef.current = stickiesCount;
  }, [stickiesCount, addSticky]);

  const updateSticky = useCallback((id: number, content: string) => {
    setStickies(prevStickies => {
      const updatedStickies = prevStickies.map(sticky => 
        sticky.id === id ? { ...sticky, content } : sticky
      );
      saveStickiesToLocalStorage(updatedStickies);
      return updatedStickies;
    });
  }, [saveStickiesToLocalStorage]);

  const moveSticky = useCallback((id: number, position: { x: number; y: number }) => {
    setStickies(prevStickies => {
      const updatedStickies = prevStickies.map(sticky => 
        sticky.id === id ? { ...sticky, position } : sticky
      );
      saveStickiesToLocalStorage(updatedStickies);
      return updatedStickies;
    });
  }, [saveStickiesToLocalStorage]);

  const deleteSticky = useCallback((id: number) => {
    setStickies(prevStickies => {
      const updatedStickies = prevStickies.filter(sticky => sticky.id !== id);
      saveStickiesToLocalStorage(updatedStickies);
      if (updatedStickies.length === 0) {
        onClose();
      }
      return updatedStickies;
    });
  }, [saveStickiesToLocalStorage, onClose]);

  return (
    <div className="stickies-container">
      {stickies.map(sticky => (
        <div
          key={sticky.id}
          className="sticky"
          style={{
            backgroundColor: sticky.color,
            left: `${sticky.position.x}px`,
            top: `${sticky.position.y}px`,
          }}
          draggable
          onDragEnd={(e) => moveSticky(sticky.id, { x: e.clientX, y: e.clientY })}
        >
          <textarea
            value={sticky.content}
            onChange={(e) => updateSticky(sticky.id, e.target.value)}
            placeholder="Type your note here..."
          />
          <button 
            className="delete-sticky" 
            onClick={() => deleteSticky(sticky.id)}
          >
            ×
          </button>
        </div>
      ))}
    </div>
  );
}