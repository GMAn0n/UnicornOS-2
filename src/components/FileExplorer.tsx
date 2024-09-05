import React from 'react';
import './FileExplorer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faCalculator, faCalendarAlt, faStickyNote, faTerminal, faChartLine, faGlobe, faHorse, faSkullCrossbones, faUserSecret, faMask, faWater, faPaintbrush, faCoins, faGamepad } from '@fortawesome/free-solid-svg-icons';
import UnicornIcon from '../assets/unicorn-icon.svg';

interface FileExplorerProps {
  onAppClick: (app: string) => void;
  onClose: () => void;
}

interface AppIcon {
  name: string;
  icon: IconDefinition | 'custom';
  color: string;
}

export function FileExplorer({ onAppClick, onClose }: FileExplorerProps) {
  const apps: AppIcon[] = [
    { name: 'Calcuwulator', icon: faCalculator, color: '#FF6B6B' },
    { name: 'Calendar', icon: faCalendarAlt, color: '#4ECDC4' },
    { name: 'Notepad', icon: faStickyNote, color: '#FFD93D' },
    { name: 'Stickies', icon: faStickyNote, color: '#FF8C42' },
    { name: 'Paint', icon: faPaintbrush, color: '#E74C3C' },
    { name: 'Terminal', icon: faTerminal, color: '#000000' },
    { name: 'Bluwumbuwurg', icon: faChartLine, color: '#6A0572' },
    { name: 'UwUScape', icon: faGlobe, color: '#1A936F' },
    { name: 'Virtual Unicorn', icon: faHorse, color: '#FF69B4' },
    { name: 'Black Market Beta', icon: faSkullCrossbones, color: '#1E1E1E' },
    { name: 'Black Market V2', icon: faUserSecret, color: '#2C3E50' },
    { name: 'Black Market V3', icon: faMask, color: '#34495E' },
    { name: 'Black Market Liquidity', icon: faWater, color: '#3498DB' },
    { name: 'Purity Finance', icon: faCoins, color: '#F1C40F' },
    { name: 'Uwunicorn Black Market', icon: 'custom', color: '#8E44AD' },
    { name: 'Games', icon: faGamepad, color: '#E74C3C' },
  ];

  return (
    <div className="window file-explorer">
      <div className="window-header">
        <span>File Explorer</span>
        <button onClick={onClose}>×</button>
      </div>
      <div className="window-content">
        <div className="icon-grid">
          {apps.map((app) => (
            <button
              key={app.name}
              className="app-icon"
              onClick={() => onAppClick(app.name)}
            >
              {app.icon === 'custom' ? (
                <img src={UnicornIcon} alt="Unicorn Icon" className="icon" style={{ color: app.color }} />
              ) : (
                <FontAwesomeIcon icon={app.icon} className="icon" style={{ color: app.color }} />
              )}
              <span className="name">{app.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}