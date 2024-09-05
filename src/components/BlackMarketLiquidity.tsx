import React from 'react';
import './BlackMarketLiquidity.css';

interface BlackMarketLiquidityProps {
  onClose: () => void;
}

export default function BlackMarketLiquidity({ onClose }: BlackMarketLiquidityProps) {
  return (
    <div className="window black-market-liquidity">
      <div className="window-header">
        <span>Black Market Liquidity Management</span>
        <button onClick={onClose}>×</button>
      </div>
      <div className="window-content">
        <iframe 
          src="https://uwublkmktalphatestpreviewhos.uwu-direct.pages.dev/" 
          title="Black Market Liquidity Management"
          width="100%"
          height="100%"
          frameBorder="0"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
}