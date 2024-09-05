import React, { useState } from 'react';
import { MenuBar } from './components/MenuBar';
import { FileExplorer } from './components/FileExplorer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHdd } from '@fortawesome/free-solid-svg-icons';
import './App.css';

// Import all your application components here
import Calcuwulator from './components/Calcuwulator';
import Calendar from './components/Calendar';
import Notepad from './components/Notepad';
import Stickies from './components/Stickies';
import Terminal from './components/Terminal';
import Bluwumbuwurg from './components/Bluwumbuwurg';
import UwUScape from './components/UwUScape';
import VirtualUnicorn from './components/VirtualUnicorn';
import BlackMarketBeta from './components/BlackMarketBeta';
import BlackMarketV2 from './components/BlackMarketV2';
import BlackMarketV3 from './components/BlackMarketV3';
import BlackMarketLiquidity from './components/BlackMarketLiquidity';
import Paint from './components/Paint';
import UwunicornBlackMarket from './components/UwunicornBlackMarket';
import PurityFinance from './components/PurityFinance';
import Games from './components/Games';

function App() {
  const [isFileExplorerOpen, setIsFileExplorerOpen] = useState(false);
  const [openApps, setOpenApps] = useState<string[]>([]);
  const [isWalletConnected, setIsWalletConnected] = useState(false);

  const openFileExplorer = () => {
    setIsFileExplorerOpen(true);
  };

  const closeFileExplorer = () => {
    setIsFileExplorerOpen(false);
  };

  const handleAppClick = (appName: string) => {
    if (!openApps.includes(appName)) {
      setOpenApps([...openApps, appName]);
    }
  };

  const closeApp = (appName: string) => {
    setOpenApps(openApps.filter(app => app !== appName));
  };

  const toggleWalletConnection = () => {
    setIsWalletConnected(!isWalletConnected);
  };

  const renderApp = (appName: string) => {
    switch (appName.toLowerCase()) {
      case 'calcuwulator': return <Calcuwulator onClose={() => closeApp('Calcuwulator')} />;
      case 'calendar': return <Calendar onClose={() => closeApp('Calendar')} />;
      case 'notepad': return <Notepad onClose={() => closeApp('Notepad')} />;
      case 'stickies': return <Stickies onClose={() => closeApp('Stickies')} />;
      case 'terminal': return <Terminal onClose={() => closeApp('Terminal')} />;
      case 'bluwumbuwurg': return <Bluwumbuwurg onClose={() => closeApp('Bluwumbuwurg')} />;
      case 'uwuscape': return <UwUScape onClose={() => closeApp('UwUScape')} />;
      case 'virtual unicorn': return <VirtualUnicorn onClose={() => closeApp('Virtual Unicorn')} />;
      case 'black market beta': return <BlackMarketBeta onClose={() => closeApp('Black Market Beta')} />;
      case 'black market v2': return <BlackMarketV2 onClose={() => closeApp('Black Market V2')} />;
      case 'black market v3': return <BlackMarketV3 onClose={() => closeApp('Black Market V3')} />;
      case 'black market liquidity': return <BlackMarketLiquidity onClose={() => closeApp('Black Market Liquidity')} />;
      case 'paint': return <Paint onClose={() => closeApp('Paint')} />;
      case 'uwunicorn black market': return <UwunicornBlackMarket onClose={() => closeApp('Uwunicorn Black Market')} />;
      case 'purity finance': return <PurityFinance onClose={() => closeApp('Purity Finance')} />;
      case 'games': return <Games onClose={() => closeApp('Games')} />;
      default: return null;
    }
  };

  return (
    <div className="App">
      <MenuBar 
        onFileExplorerClick={openFileExplorer}
        isWalletConnected={isWalletConnected}
        onWalletToggle={toggleWalletConnection}
      />
      <div className="desktop">
        <button className="desktop-icon" onClick={openFileExplorer}>
          <FontAwesomeIcon icon={faHdd} size="3x" />
          <span>Hard Disk</span>
        </button>
      </div>
      {isFileExplorerOpen && (
        <FileExplorer
          onAppClick={handleAppClick}
          onClose={closeFileExplorer}
        />
      )}
      {openApps.map(app => renderApp(app))}
    </div>
  );
}

export default App;