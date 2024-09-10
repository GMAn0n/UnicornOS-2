import React, { useState, useCallback } from 'react';
import { MenuBar } from './components/MenuBar';
import { FileExplorer } from './components/FileExplorer';
import { ResizableWindow } from './components/ResizableWindow';
import Stickies from './components/Stickies';
import Bluwumbuwurg from './components/Bluwumbuwurg';
import UwUScape from './components/UwUScape';
import VirtualUnicorn from './components/VirtualUnicorn';
import BlackMarketBeta from './components/BlackMarketBeta';
import BlackMarketV2 from './components/BlackMarketV2';
import BlackMarketV3 from './components/BlackMarketV3';
import BlackMarketLiquidity from './components/BlackMarketLiquidity';
import PurityFinance from './components/PurityFinance';
import BuwutCamp from './components/BuwutCamp';
import Terminal from './components/Terminal';
import Calcuwulator from './components/Calcuwulator';
import Calendar from './components/Calendar';
import Notepad from './components/Notepad';
import Paint from './components/Paint';
import MemojiMinesweeper from './components/MemojiMinesweeper';
import Tetris from './components/Tetris';
import UnicornPinball from './components/UnicornPinball';
import './App.css';

function App() {
  const [showFileExplorer, setShowFileExplorer] = useState(false);
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [openApps, setOpenApps] = useState<string[]>([]);
  const [stickiesCount, setStickiesCount] = useState(0);
  const [showStickies, setShowStickies] = useState(false);
  const [zIndex, setZIndex] = useState(1000);

  const handleNewSticky = useCallback(() => {
    setShowStickies(true);
    setStickiesCount(prevCount => prevCount + 1);
  }, []);

  const handleAppClick = (appName: string) => {
    if (!openApps.includes(appName)) {
      setOpenApps(prevApps => [...prevApps, appName]);
    }
    if (appName === 'Stickies') {
      setShowStickies(true);
      handleNewSticky();
    }
  };

  const handleAppClose = (appName: string) => {
    setOpenApps(openApps.filter(app => app !== appName));
    if (appName === 'Stickies') {
      setShowStickies(false);
    }
  };

  const renderApp = (appName: string) => {
    const isIframeApp = ['Bluwumbuwurg', 'UwUScape', 'Virtual Unicorn', 'Black Market Beta', 'Black Market V2', 'Black Market V3', 'Black Market Liquidity', 'Purity Finance', 'Buwut Camp', 'Terminal'].includes(appName);
    const className = `window ${appName.toLowerCase().replace(/\s+/g, '-')} ${isIframeApp ? 'iframe-app' : ''}`;

    const commonProps = {
      onClose: () => handleAppClose(appName),
      className,
      isIframeApp,
      style: { zIndex: zIndex + openApps.indexOf(appName) },
      onFocus: () => {
        const newZIndex = zIndex + openApps.length;
        setZIndex(newZIndex);
        const updatedApps = openApps.filter(app => app !== appName);
        setOpenApps([...updatedApps, appName]);
      },
    };

    switch (appName) {
      case 'Calcuwulator':
        return <Calcuwulator {...commonProps} />;
      case 'Calendar':
        return (
          <Calendar
            {...commonProps}
            onClose={() => handleAppClose('Calendar')} // Ensure we're using the correct app name
          />
        );
      case 'Notepad':
        return <Notepad {...commonProps} />;
      case 'Paint':
        return <Paint {...commonProps} />;
      case 'Memoji Minesweeper':
        return (
          <ResizableWindow
            title="Multiplayer Memoji Minesweeper"
            onClose={() => handleAppClose(appName)}
            appName={appName.toLowerCase().replace(/\s+/g, '-')}
            initialWidth={400}
            initialHeight={500}
            isIframeApp={false}
            onFocus={() => {
              const newZIndex = zIndex + openApps.length;
              setZIndex(newZIndex);
              const updatedApps = openApps.filter(app => app !== appName);
              setOpenApps([...updatedApps, appName]);
            }}
          >
            <MemojiMinesweeper onClose={() => handleAppClose(appName)} />
          </ResizableWindow>
        );
      case 'Bluwumbuwurg':
        return <Bluwumbuwurg {...commonProps} />;
      case 'UwUScape':
        return <UwUScape {...commonProps} />;
      case 'Virtual Unicorn':
        return <VirtualUnicorn {...commonProps} />;
      case 'Black Market Beta':
        return <BlackMarketBeta {...commonProps} />;
      case 'Black Market V2':
        return <BlackMarketV2 {...commonProps} />;
      case 'Black Market V3':
        return <BlackMarketV3 {...commonProps} />;
      case 'Black Market Liquidity':
        return <BlackMarketLiquidity {...commonProps} />;
      case 'Purity Finance':
        return <PurityFinance {...commonProps} />;
      case 'Buwut Camp':
        return <BuwutCamp {...commonProps} />;
      case 'Terminal':
        return <Terminal {...commonProps} />;
      case 'Stickies':
        return showStickies ? (
          <Stickies
            key={stickiesCount}
            onClose={() => handleAppClose('Stickies')}
            onNewSticky={handleNewSticky}
            stickiesCount={stickiesCount}
          />
        ) : null;
      case 'Tetris':
        return <Tetris {...commonProps} />;
      case 'Unicorn Pinball':
        return <UnicornPinball {...commonProps} />;
      default:
        return null;
    }
  };

  const handleHardDiskClick = () => {
    setShowFileExplorer(true);
  };

  return (
    <div className="App">
      <MenuBar 
        onFileExplorerClick={() => setShowFileExplorer(true)}
        isWalletConnected={isWalletConnected}
        onWalletToggle={() => setIsWalletConnected(!isWalletConnected)}
        isStickiesOpen={showStickies}
        onNewStickyClick={handleNewSticky}
        version="3.11"
      />
      <div className="desktop">
        <button className="hard-disk-icon" onClick={handleHardDiskClick}>
          <span className="icon-emoji">💾</span>
          <span className="icon-text">Hard Drive</span>
        </button>
        {showFileExplorer && (
          <FileExplorer
            onClose={() => setShowFileExplorer(false)}
            onAppClick={handleAppClick}
            isFullscreenOnMobile
          />
        )}
        <div className="app-container">
          {openApps.map(appName => renderApp(appName))}
        </div>
      </div>
    </div>
  );
}

export default App;