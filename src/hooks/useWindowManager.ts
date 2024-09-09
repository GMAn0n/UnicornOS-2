import { useState, useCallback } from 'react';

const useWindowManager = () => {
  const [windows, setWindows] = useState<string[]>([]);
  const [baseZIndex] = useState(1200);

  const openWindow = useCallback((appName: string) => {
    setWindows(prev => [...prev.filter(w => w !== appName), appName]);
  }, []);

  const closeWindow = useCallback((appName: string) => {
    setWindows(prev => prev.filter(w => w !== appName));
  }, []);

  const getZIndex = useCallback((appName: string) => {
    const index = windows.indexOf(appName);
    return index === -1 ? baseZIndex : baseZIndex + index + 1;
  }, [windows, baseZIndex]);

  return { openWindow, closeWindow, getZIndex };
};

export default useWindowManager;