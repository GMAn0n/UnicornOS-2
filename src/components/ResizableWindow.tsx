import React, { useState, useEffect } from 'react';
import Draggable from 'react-draggable';
import { Resizable } from 're-resizable';
import './ResizableWindow.css';

interface ResizableWindowProps {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
  appName: string;
  initialWidth: string | number;
  initialHeight: string | number;
  isFullscreenOnMobile?: boolean;
  className?: string;
  style?: React.CSSProperties;
  isIframeApp?: boolean;
  onFocus?: () => void;
}

export function ResizableWindow({
  title,
  onClose,
  children,
  appName,
  initialWidth,
  initialHeight,
  isFullscreenOnMobile = true,
  className,
  style,
  isIframeApp = false,
  onFocus
}: ResizableWindowProps) {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [windowSize, setWindowSize] = useState({ width: initialWidth, height: initialHeight });
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const windowStyle = isMobile && isFullscreenOnMobile
    ? { width: '100%', height: 'calc(100% - 40px)', position: 'fixed' as const, top: 40, left: 0 }
    : { ...windowSize, position: 'absolute' as const };

  const desktopOffset = !isMobile ? 40 : 0;
  const mobileOffset = isMobile ? 40 : 0;

  const windowClassName = `resizable-window ${appName} ${isMobile && isFullscreenOnMobile ? 'fullscreen-mobile' : ''} ${isIframeApp ? 'iframe-app' : ''} ${className || ''}`;

  const handleDrag = (e: any, data: { x: number; y: number }) => {
    setPosition({ x: data.x, y: data.y });
  };

  const handleResize = (e: MouseEvent | TouchEvent, direction: string, ref: HTMLElement, d: { width: number; height: number }) => {
    setWindowSize(prevSize => {
      let newWidth = typeof prevSize.width === 'number' ? prevSize.width : parseInt(prevSize.width);
      let newHeight = typeof prevSize.height === 'number' ? prevSize.height : parseInt(prevSize.height);
      let newX = position.x;
      let newY = position.y;

      if (direction.includes('left')) {
        newWidth -= d.width;
        newX += d.width;
      } else if (direction.includes('right')) {
        newWidth += d.width;
      }

      if (direction.includes('top')) {
        newHeight -= d.height;
        newY += d.height;
      } else if (direction.includes('bottom')) {
        newHeight += d.height;
      }

      setPosition({ x: newX, y: newY });
      return { width: newWidth, height: newHeight };
    });
  };

  return (
    <Draggable
      handle=".resizable-window-header"
      position={position}
      onDrag={handleDrag}
      disabled={isMobile && isFullscreenOnMobile}
    >
      <Resizable
        size={windowSize}
        onResize={handleResize}
        minWidth={200}
        minHeight={100}
        bounds="window"
        enable={{
          top: !isMobile,
          right: !isMobile,
          bottom: !isMobile,
          left: !isMobile,
          topRight: !isMobile,
          bottomRight: !isMobile,
          bottomLeft: !isMobile,
          topLeft: !isMobile
        }}
      >
        <div 
          className={windowClassName}
          style={{
            ...style,
            ...windowStyle,
            zIndex: 1200,
            marginTop: isMobile ? mobileOffset : desktopOffset,
          }}
          onMouseDown={onFocus}
          onTouchStart={onFocus}
        >
          <div className="resizable-window-inner">
            <div className="resizable-window-header">
              <span className="window-title">{title}</span>
              <button className="close-button" onClick={onClose}>×</button>
            </div>
            <div className="resizable-window-content">
              {children}
            </div>
          </div>
        </div>
      </Resizable>
    </Draggable>
  );
}