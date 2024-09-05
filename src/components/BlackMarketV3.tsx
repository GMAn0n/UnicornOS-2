import React from 'react';
import './BlackMarketV3.css';

interface BlackMarketV3Props {
  onClose: () => void;
}

export default function BlackMarketV3({ onClose }: BlackMarketV3Props) {
  return (
    <div className="window black-market-v3">
      <div className="window-header">
        <span>Black Market V3</span>
        <button onClick={onClose}>×</button>
      </div>
      <div className="window-content">
        <iframe 
          src="https://unity-bug-fixes.uwublk-market.pages.dev/" 
          title="Black Market V3"
          width="100%"
          height="100%"
          frameBorder="0"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
}