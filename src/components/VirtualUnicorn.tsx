import React from 'react';
import './VirtualUnicorn.css';

interface VirtualUnicornProps {
  onClose: () => void;
}

export default function VirtualUnicorn({ onClose }: VirtualUnicornProps) {
  return (
    <div className="window virtual-unicorn">
      <div className="window-header">
        <span>Virtual Unicorn</span>
        <button onClick={onClose}>×</button>
      </div>
      <div className="window-content">
        <iframe 
          src="https://unicorn.meme" 
          title="Virtual Unicorn"
          width="100%"
          height="100%"
          frameBorder="0"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
}