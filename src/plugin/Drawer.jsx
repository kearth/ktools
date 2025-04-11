import React, { useState } from 'react';
import { Excalidraw, MainMenu, WelcomeScreen } from '@excalidraw/excalidraw';
import '@excalidraw/excalidraw/dist/prod/index.css';

// 不行就换tldraw
const Drawer = () => {
  const [excalidrawAPI, setExcalidrawAPI] = useState(null);

  return (
    <div style={{ 
      width: '100%', 
      height: 'calc(100vh - 64px)',
      position: 'relative'
    }}>
      <Excalidraw
        excalidrawAPI={(api) => setExcalidrawAPI(api)}
        langCode='zh-CN'     
        theme="light"
      />
    </div>
  );
};

export default Drawer;