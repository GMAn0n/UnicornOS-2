import React from 'react';
import './BlackMarketBeta.css';

interface BlackMarketBetaProps {
  onClose: () => void;
}

export default function BlackMarketBeta({ onClose }: BlackMarketBetaProps) {
  return (
    <div className="window black-market-beta">
      <div className="window-header">
        <span>Black Market Beta</span>
        <button onClick={onClose}>×</button>
      </div>
      <div className="window-content">
        <iframe 
          src="https://unity-lp.uwu-direct.pages.dev/" 
          title="Black Market Beta"
          width="100%"
          height="100%"
          frameBorder="0"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
}