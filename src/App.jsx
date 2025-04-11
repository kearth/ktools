
// Fix the React import
import React, { useState, Suspense, lazy, useEffect } from 'react'
// 修改导入语句
import { ConfigProvider, Switch } from 'antd'
import { BulbOutlined, BulbFilled } from '@ant-design/icons'
import Sidebar from './menu/Sidebar'
import './styles/app.css'
// 修改导入语句，从Theme.jsx导入两套主题

// 使用 lazy 加载插件组件
const Devtools = lazy(() => import('./plugin/Devtools'))
const Settings = lazy(() => import('./plugin/Setting'))
const Drawer = lazy(() => import('./plugin/Drawer'))

// 插件配置
const PLUGINS = {
  devtools: {
    key: 'devtools',
    component: Devtools
  },
  settings: {
    key: 'settings',
    component: Settings
  },
  drawer: {
    key: 'drawer',
    component: Drawer 
  }
}

// Fix the ErrorBoundary component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true }
  }

  render() {
    if (this.state.hasError) {
      return <div>插件加载失败，请刷新页面重试。</div>
    }
    return this.props.children
  }
}

// ResizeHandle 组件调整宽度
const ResizeHandle = () => (
  <div
    style={{
      width: '2px',
      cursor: 'col-resize',
      background: 'transparent',  // 改为透明
      height: '100%',
      transition: 'background-color 0.2s'
    }}
  />
);

function App() {
  const [selectedKey, setSelectedKey] = useState('devtools')
  const [sidebarWidth, setSidebarWidth] = useState(200)
  const [isDragging, setIsDragging] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)

  const handleMouseDown = () => {
    setIsDragging(true);
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (isDragging) {
        const newWidth = e.clientX;
        setSidebarWidth(Math.max(150, Math.min(400, newWidth)));
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  // 渲染当前选中的插件
  const renderContent = () => {
    const PluginComponent = PLUGINS[selectedKey]?.component
    if (!PluginComponent) return null

    return (
      <ErrorBoundary>
        <Suspense fallback={<div>加载中...</div>}>
          <PluginComponent />
        </Suspense>
      </ErrorBoundary>
    )
  }

  return (
    <ConfigProvider>  {/* 移除theme配置 */}
      <div className="app-container">
        <div style={{ 
          width: `${sidebarWidth}px`, 
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          userSelect: 'none',
          position: 'relative'
        }}>
          <Sidebar 
            selectedKey={selectedKey} 
            setSelectedKey={setSelectedKey}
            isDarkMode={isDarkMode}
          />
          <div 
            style={{ 
              position: 'absolute',
              right: '-1px',  // 从-2px改为-1px
              top: 0,
              bottom: 0,
              width: '2px',   // 从4px减小到2px
              cursor: 'col-resize',
              zIndex: 100,
              backgroundColor: isDarkMode ? '#3a3a3f' : '#f0f0f0'  // 暗黑模式下改为hover时的背景色
            }}
            onMouseDown={handleMouseDown}
          >
            <ResizeHandle />
          </div>
        </div>

        <div style={{ 
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          backgroundColor: '#f8f9fa',
          position: 'relative'
        }}>
          {/* 添加导航栏 */}
          <div style={{
            height: '48px',
            backgroundColor: isDarkMode ? '#2a2a2f' : '#fff',  // 根据模式切换背景色
            borderBottom: `1px solid ${isDarkMode ? '#1f1f24' : '#f0f0f0'}`,  // 边框颜色也相应调整
            display: 'flex',
            alignItems: 'center',
            padding: '0 16px',
            justifyContent: 'flex-end'
          }}>
            <Switch
              checkedChildren="☀️"
              unCheckedChildren="🌙"
              checked={isDarkMode}
              onChange={(checked) => setIsDarkMode(checked)}
            />
          </div>

          {/* 内容区域 */}
          <div style={{ 
              flex: 1, 
              overflow: 'auto',
              padding: '24px',  /* 添加内边距 */
          }}>
              {renderContent()}
          </div>
        </div>
      </div>
    </ConfigProvider>
  )
}

export default App
