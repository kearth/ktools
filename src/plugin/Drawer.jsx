import React, { useState } from 'react';
import { Spin } from 'antd';

const Drawer = () => {
  const [loading, setLoading] = useState(true);

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      {loading && (
        <div style={{ 
          position: 'absolute', 
          top: '50%', 
          left: '50%', 
          transform: 'translate(-50%, -50%)' 
        }}>
          <Spin size="large" />
        </div>
      )}
      <iframe
        src="/drawio/index.html?embed=1&ui=min&spin=1&proto=json"
        style={{
          width: '100%',
          height: '100%',
          border: 'none',
          minHeight: 'calc(100vh - 64px)'
        }}
        allowFullScreen
        onLoad={() => setLoading(false)}
      />
    </div>
  );
};

export default Drawer;