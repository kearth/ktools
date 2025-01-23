import React, { useState } from "react";
import { Menu } from "antd";
import './Sidebar.css'
import PluginItems from '../config/Plugins'
import logo from "../assets/logo.png";


function Sidebar({ selectedKey, setSelectedKey }) {

    const handleMenuClick = (e) => {
        setSelectedKey(e.key);
    };

    return (
        <div id="sidebar">
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
                    // width: "150px"
                }}
                items={PluginItems}
            />
        </div>
    );
};

export default Sidebar;