import React from "react";
import * as AntdIcons from "@ant-design/icons";
import * as Tools from '../tools';
import pluginsConfig from './plugins.config.json';

// 图标映射函数
const getIcon = (iconName) => {
    const Icon = AntdIcons[iconName];
    return Icon ? <Icon style={{ fontSize: '24px' }} /> : null;
};

// 组件映射函数
const getComponent = (componentName) => {
    return Tools[componentName];
};

// 处理配置
const processPlugins = (plugins) => {
    return plugins.map(plugin => ({
        ...plugin,
        icon: getIcon(plugin.icon),
        tools: plugin.tools?.map(tool => ({
            ...tool,
            icon: getIcon(tool.icon),
            component: getComponent(tool.component)
        }))
    }));
};

const PluginItems = processPlugins(pluginsConfig.plugins);

export default PluginItems;