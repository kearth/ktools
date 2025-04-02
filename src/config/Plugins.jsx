import React, { useState } from "react";

import {
    StarOutlined,
    AppstoreOutlined,
    LaptopOutlined,
    AndroidOutlined,
    AppleOutlined,
    RobotOutlined,
    ToolOutlined,
    ReadOutlined,
    CrownOutlined,
    SettingOutlined,
    BgColorsOutlined,  // 添加调色板图标
} from "@ant-design/icons";

// 开发工具
const PluginItems = [
    {
        key: "settings",
        label: "插件管理",
        icon: <SettingOutlined />,
    },
    {
        label: "开发工具",
        key: "devtools",
        icon: <ToolOutlined />,
    },
    {
        label: "画板",
        key: "drawer",
        icon: <BgColorsOutlined />,  // 使用调色板图标
    },
];

export default PluginItems;