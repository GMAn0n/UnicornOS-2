import React from 'react';
import { ResizableWindow } from './ResizableWindow';
import './UwUScape.css';

interface UwUScapeProps {
  onClose: () => void;
  className?: string;
  style?: React.CSSProperties;
  isIframeApp?: boolean;
}

export default function UwUScape({ onClose, className, style }: UwUScapeProps) {
  return (
    <ResizableWindow
      title="UwUScape"
      onClose={onClose}
      appName="uwuscape"
      className={className}
      style={style}
      initialWidth={800}
      initialHeight={600}
      isIframeApp={true}
    >
      <div className="uwuscape-container">
        <iframe
          src="https://uwu.direct"
          title="UwUScape"
          className="uwuscape-iframe"
        />
      </div>
    </ResizableWindow>
  );
}