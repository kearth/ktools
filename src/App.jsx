import { useState } from 'react'
import Sidebar from './menu/Sidebar'
import './App.css'

import Devtools from './plugin/Devtools'
import Settings from './plugin/Setting'
import { Flex, Splitter } from 'antd'


function App() {
  // 定义一个状态来保存当前选中的插件 key
  const [selectedKey, setSelectedKey] = useState('devtools');

  // 根据 selectedKey 渲染不同的插件内容
  const renderContent = () => {
    switch (selectedKey) {
      case 'settings':
        return <Settings />;
      default:
        return <Devtools />;
    }
  };

  return (
    <Splitter vertical>
      <Splitter.Panel defaultSize={150} resizable={false}>
        <Sidebar selectedKey={selectedKey} setSelectedKey={setSelectedKey} />
      </Splitter.Panel>
      <Splitter.Panel >
        {renderContent()}
      </Splitter.Panel>
    </Splitter>
  )
}
export default App
