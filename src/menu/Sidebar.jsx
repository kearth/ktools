import React, { useState } from "react";
import { Menu } from "antd";
import '../styles/Sidebar.css'
import PluginItems from '../config/Plugins'
import logo from "../assets/logo.png";
// 导入主题
import { darkTheme, lightTheme } from '../Theme';


function Sidebar({ selectedKey, setSelectedKey, isDarkMode }) {

    const handleMenuClick = (e) => {
        setSelectedKey(e.key);
    };

    return (
        <div id="sidebar" style={{ 
            backgroundColor: isDarkMode ? darkTheme.token.colorBgContainer : lightTheme.token.colorBgContainer
        }}>
            <div id="logo">
                <img src={logo} alt="Logo" />
            </div>
            <Menu
                mode="inline"
                selectedKeys={[selectedKey]}
                defaultSelectedKeys={['devtools']}
                onClick={handleMenuClick}
                style={{
                    borderRight: 0,
                    fontSize: "16px",
                    backgroundColor: 'transparent'
                }}
                items={PluginItems}
                theme={isDarkMode ? darkTheme.components.Menu :lightTheme.components.Menu}
            />
        </div>
    );
};

export default Sidebar;