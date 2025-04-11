
import React, { useState } from "react";
import { Tabs, Card, Button, Space } from 'antd';
import { 
    SettingOutlined, 
    AppstoreOutlined, 
    PlusOutlined, 
    ImportOutlined, 
    ShopOutlined,
    DeleteOutlined 
} from '@ant-design/icons';
import plugins from '../config/plugins.config.json';
import '../styles/Setting.css';

function Settings() {
    const [activeTab, setActiveTab] = useState('current');

    const renderPluginCard = (plugin) => {
        if (plugin.key === 'settings') return null;
        
        const isDevTools = plugin.key === 'devtools';
        
        return (
            <Card 
                key={plugin.key}
                style={{ marginBottom: 16 }}
                actions={[
                    <Button type="text" icon={<SettingOutlined />} disabled={isDevTools}>配置</Button>,
                    <Button type="text" danger icon={<DeleteOutlined />} disabled={isDevTools}>移除</Button>
                ]}
            >
                <Card.Meta
                    avatar={React.createElement(plugin.icon)}
                    title={plugin.label}
                    description={
                        plugin.key === 'devtools' ? '内置开发工具集合，包含常用的开发辅助工具' :
                        plugin.key === 'drawer' ? '流程图绘制工具，支持绘制各类图表' :
                        plugin.description || '暂无描述'
                    }
                />
            </Card>
        );
    };

    const items = [
        {
            key: 'current',
            label: '当前插件',
            children: (
                <div className="plugin-list">
                    {plugins.plugins
                        .filter(p => p.key !== 'settings')
                        .map(renderPluginCard)}
                </div>
            )
        },
        {
            key: 'store',
            label: '插件商店',
            children: <div>插件商店功能开发中...</div>
        },
        {
            key: 'custom',
            label: '自定义插件',
            children: (
                <div>
                    <Space style={{ width: '100%', justifyContent: 'center', marginBottom: 20 }}>
                        <Button type="primary" icon={<PlusOutlined />}>
                            新增插件
                        </Button>
                        <Button icon={<ImportOutlined />}>
                            导入插件
                        </Button>
                    </Space>
                    <div className="custom-plugin-list">
                        暂无自定义插件
                    </div>
                </div>
            )
        }
    ];

    return (
        <div id="settings">
            <Tabs
                activeKey={activeTab}
                onChange={setActiveTab}
                items={items}
            />
        </div>
    );
}

export default Settings;