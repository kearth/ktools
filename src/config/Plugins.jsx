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
];

export default PluginItems;