import React, { useState } from "react";
import './Content.css'

// 
function Devtools() {
    const [selectedKey, setSelectedKey] = useState("overview");

    const handleMenuClick = (e) => {
        setSelectedKey(e.key);
        console.log("Selected:", e.key);
    };

    return (
        <div >
            <AreaConverter></AreaConverter>
        </div>
    );
};

export default Devtools;

const AreaConverter = () => {
    const [value, setValue] = useState(100);
    const [convertedValue, setConvertedValue] = useState(0);

    const convertArea = (value) => {
        // 假设转换单位：平方米 -> 平方公里
        return value / 1e6;
    };

    const handleConvert = () => {
        setConvertedValue(convertArea(value));
    };

    return (
        <div>
            <h3>面积单位转换</h3>
            <input
                type="number"
                value={value}
                onChange={(e) => setValue(e.target.value)}
            />
            <button onClick={handleConvert}>转换</button>
            <p>转换结果: {convertedValue} 平方公里</p>
        </div>
    );
};