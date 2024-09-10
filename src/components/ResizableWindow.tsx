import React, { useState, useEffect, useRef } from 'react';
import { Rnd, DraggableData, Position, ResizableDelta } from 'react-rnd';
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
  const minWidth = 200;
  const minHeight = 100;

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [size, setSize] = useState({
    width: Math.max(typeof initialWidth === 'number' ? initialWidth : parseInt(initialWidth as string), minWidth),
    height: Math.max(typeof initialHeight === 'number' ? initialHeight : parseInt(initialHeight as string), minHeight)
  });
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const windowRef = useRef<Rnd>(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      if (windowRef.current) {
        windowRef.current.updatePosition({ x: position.x, y: position.y });
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [position]);

  useEffect(() => {
    if (!isMobile) {
      const desktopWidth = Math.min(800, window.innerWidth * 0.8); // Max of 800px or 80% of viewport width
      const desktopHeight = Math.min(600, (window.innerHeight - 40) * 0.8); // Max of 600px or 80% of viewport height minus menu bar
      
      setSize({ width: desktopWidth, height: desktopHeight });
      
      // Set initial position for all apps
      setPosition({
        x: (window.innerWidth - desktopWidth) / 2,
        y: Math.max(50, (window.innerHeight - desktopHeight) / 2) // Ensure it's at least 50px from the top
      });
    }
  }, [isMobile]);

  useEffect(() => {
    const handleGlobalMouseUp = () => {
      if (isDragging) {
        setIsDragging(false);
      }
    };

    window.addEventListener('mouseup', handleGlobalMouseUp);
    return () => {
      window.removeEventListener('mouseup', handleGlobalMouseUp);
    };
  }, [isDragging]);

  const windowClassName = `resizable-window ${appName} window ${appName} ${isIframeApp ? 'iframe-app' : ''} ${isDragging ? 'react-draggable-dragging' : ''} ${className || ''}`;

  const handleDragStart = (_e: any, _data: DraggableData) => {
    setIsDragging(true);
  };

  const handleDrag = (_e: any, data: DraggableData) => {
    setPosition({ x: data.x, y: data.y });
  };

  const handleDragStop = (_e: any, data: DraggableData) => {
    setIsDragging(false);
    setPosition({ x: data.x, y: data.y });
  };

  const handleResize = (_e: MouseEvent | TouchEvent, _direction: string, ref: HTMLElement, delta: ResizableDelta, position: Position) => {
    setSize({
      width: parseInt(ref.style.width, 10),
      height: parseInt(ref.style.height, 10),
    });
    setPosition(position);
  };

  const isFullscreen = isMobile && isFullscreenOnMobile && !isIframeApp;

  const handleClose = (e: React.MouseEvent<HTMLButtonElement> | React.TouchEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onClose();
  };

  const getBounds = (): { left: number; top: number; right: number; bottom: number } => {
    const maxRight = window.innerWidth + size.width * 0.75;
    const maxBottom = window.innerHeight + size.height * 0.75;
    return {
      left: -size.width * 0.75,
      top: -size.height * 0.5,
      right: maxRight,
      bottom: maxBottom,
    };
  };

  return (
    <Rnd
      ref={windowRef}
      size={{ width: size.width, height: size.height }}
      position={position}
      onDragStart={handleDragStart}
      onDrag={handleDrag}
      onDragStop={handleDragStop}
      onResizeStop={handleResize}
      minWidth={minWidth}
      minHeight={minHeight}
      dragHandleClassName="resizable-window-header"
      disableDragging={isFullscreen}
      enableResizing={!isFullscreen}
      className={windowClassName}
      style={{
        ...style,
        display: 'flex',
        flexDirection: 'column',
        ...(isFullscreen ? {
          width: '100%',
          height: 'calc(100% - 40px)',
          position: 'fixed',
          top: 40,
          left: 0
        } : {})
      }}
    >
      <div className="resizable-window-header">
        <span className="window-title">{title}</span>
        <button 
          className="close-button" 
          onClick={handleClose}
          onTouchEnd={handleClose}
        >
          ×
        </button>
      </div>
      <div 
        className="resizable-window-content"
        onMouseDown={onFocus}
        onTouchStart={onFocus}
      >
        {children}
      </div>
    </Rnd>
  );
}