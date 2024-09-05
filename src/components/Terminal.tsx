import React from 'react';
import './Terminal.css';

interface TerminalProps {
  onClose: () => void;
}

export default function Terminal({ onClose }: TerminalProps) {
  return (
    <div className="window terminal">
      <div className="window-header">
        <span>Terminal</span>
        <button onClick={onClose}>×</button>
      </div>
      <div className="window-content">
        <iframe 
          src="https://unicornterminal.meme" 
          title="Terminal"
          width="100%"
          height="100%"
          frameBorder="0"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
}