
// Fix the React import
import React, { useState, Suspense, lazy } from 'react'
import { Splitter, ConfigProvider } from 'antd'
import Sidebar from './menu/Sidebar'
import './App.css'
import theme from './Theme'

// 使用 lazy 加载插件组件
const Devtools = lazy(() => import('./plugin/Devtools'))
const Settings = lazy(() => import('./plugin/Setting'))

// 插件配置
const PLUGINS = {
  devtools: {
    key: 'devtools',
    component: Devtools
  },
  settings: {
    key: 'settings',
    component: Settings
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

function App() {
  const [selectedKey, setSelectedKey] = useState('devtools')

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
    <ConfigProvider theme={theme}>
      <div className="app-container">
        <Splitter vertical>
          <Splitter.Panel 
            defaultSize={150} 
            resizable={false}
            className="sidebar-panel"
          >
            <Sidebar 
              selectedKey={selectedKey} 
              setSelectedKey={setSelectedKey} 
            />
          </Splitter.Panel>
          <Splitter.Panel className="content-panel">
            {renderContent()}
          </Splitter.Panel>
        </Splitter>
      </div>
    </ConfigProvider>
  )
}

export default App
