import React from 'react';
import './PurityFinance.css';

interface PurityFinanceProps {
  onClose: () => void;
}

export default function PurityFinance({ onClose }: PurityFinanceProps) {
  return (
    <div className="window purity-finance">
      <div className="window-header">
        <span>Purity Finance</span>
        <button onClick={onClose}>×</button>
      </div>
      <div className="window-content">
        <iframe 
          src="https://www.purity.finance/" 
          title="Purity Finance"
          width="100%"
          height="100%"
          frameBorder="0"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
}