import React from 'react';
import './Bluwumbuwurg.css';

interface BluwumbuwurgProps {
  onClose: () => void;
}

export default function Bluwumbuwurg({ onClose }: BluwumbuwurgProps) {
  return (
    <div className="window bluwumbuwurg">
      <div className="window-header">
        <span>Bluwumbuwurg</span>
        <button onClick={onClose}>×</button>
      </div>
      <div className="window-content">
        <iframe 
          src="https://uwu.pro" 
          title="Bluwumbuwurg"
          width="100%"
          height="100%"
          frameBorder="0"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
}