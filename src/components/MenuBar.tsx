import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import './MenuBar.css';

interface MenuBarProps {
  onFileExplorerClick: () => void;
  isWalletConnected: boolean;
  onWalletToggle: () => void;
}

export function MenuBar({ onFileExplorerClick, isWalletConnected, onWalletToggle }: MenuBarProps) {
  const [isFileMenuOpen, setIsFileMenuOpen] = useState(false);

  const toggleFileMenu = () => {
    setIsFileMenuOpen(!isFileMenuOpen);
  };

  return (
    <div className="menu-bar">
      <div className="menu-icon">
        <FontAwesomeIcon icon={faHome} color="#FFA500" />
      </div>
      <div className="menu-item" onClick={toggleFileMenu}>
        File
        {isFileMenuOpen && (
          <div className="dropdown-menu">
            <button onClick={onFileExplorerClick}>Open File Explorer</button>
            <button onClick={onWalletToggle}>
              {isWalletConnected ? 'Disconnect Wallet' : 'Connect Wallet'}
            </button>
          </div>
        )}
      </div>
      {/* Add other menu items as needed */}
    </div>
  );
}