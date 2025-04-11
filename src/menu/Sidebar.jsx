import React, { useState } from "react";
import { Menu } from "antd";
import '../styles/Sidebar.css'
import PluginItems from '../config/Plugins'
import logo from "../assets/logo.png";

function Sidebar({ selectedKey, setSelectedKey, isDarkMode }) {
    const handleMenuClick = (e) => {
        setSelectedKey(e.key);
    };

    return (
        <div id="sidebar" className={isDarkMode ? 'sidebar-dark' : 'sidebar-light'}>
            <div id="logo">
                <img src={logo} alt="Logo" />
                <span className="logo-text">KTOOLS</span>
            </div>
            <Menu
                mode="inline"
                selectedKeys={[selectedKey]}
                defaultSelectedKeys={['devtools']}
                onClick={handleMenuClick}
                className={isDarkMode ? 'dark-mode-menu' : ''}
                style={{
                    borderRight: 0,
                    fontSize: "16px",
                    backgroundColor: 'transparent'
                }}
                items={PluginItems}
            />
        </div>
    );
};

export default Sidebar;