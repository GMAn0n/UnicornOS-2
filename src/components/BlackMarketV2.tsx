import React from 'react';
import './BlackMarketV2.css';

interface BlackMarketV2Props {
  onClose: () => void;
}

export default function BlackMarketV2({ onClose }: BlackMarketV2Props) {
  return (
    <div className="window black-market-v2">
      <div className="window-header">
        <span>Black Market V2</span>
        <button onClick={onClose}>×</button>
      </div>
      <div className="window-content">
        <iframe 
          src="https://unity-uwu.uwublk-market.pages.dev/" 
          title="Black Market V2"
          width="100%"
          height="100%"
          frameBorder="0"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
}