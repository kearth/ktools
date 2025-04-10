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
    ClockCircleOutlined,
} from "@ant-design/icons";

const PluginItems = [
    {
        label: "开发工具",
        key: "devtools",
        icon: <ToolOutlined />,
    },
    // {
    //     label: "画板",
    //     key: "drawer",
    //     icon: <BgColorsOutlined />,
    // },
    {
        key: "settings",
        label: "插件管理",
        icon: <SettingOutlined />,
    },
];

export default PluginItems;