import React from 'react';
import './UwUScape.css';

interface UwUScapeProps {
  onClose: () => void;
}

export default function UwUScape({ onClose }: UwUScapeProps) {
  return (
    <div className="window uwuscape">
      <div className="window-header">
        <span>UwUScape</span>
        <button onClick={onClose}>×</button>
      </div>
      <div className="window-content">
        <iframe 
          src="https://uwu.direct" 
          title="UwUScape"
          width="100%"
          height="100%"
          frameBorder="0"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
}