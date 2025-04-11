import React, { useState } from 'react';
import { Input, Select, Tabs } from 'antd';

const { Option } = Select;
const { TabPane } = Tabs;

const units = {
  storage: [
    { value: 'bit', label: '比特(bit)' },
    { value: 'B', label: '字节(B)' },
    { value: 'KB', label: '千字节(KB)' },
    { value: 'MB', label: '兆字节(MB)' },
    { value: 'GB', label: '千兆字节(GB)' },
    { value: 'TB', label: '太字节(TB)' },
    { value: 'PB', label: '拍字节(PB)' },
    { value: 'EB', label: '艾字节(EB)' },
  ],
  length: [
    { value: 'nm', label: '纳米(nm)' },
    { value: 'um', label: '微米(μm)' },
    { value: 'mm', label: '毫米(mm)' },
    { value: 'cm', label: '厘米(cm)' },
    { value: 'm', label: '米(m)' },
    { value: 'km', label: '千米(km)' },
  ],
  mass: [
    { value: 'mg', label: '毫克(mg)' },
    { value: 'g', label: '克(g)' },
    { value: 'kg', label: '千克(kg)' },
    { value: 't', label: '吨(t)' },
  ],
  area: [
    { value: 'mm2', label: '平方毫米(mm²)' },
    { value: 'cm2', label: '平方厘米(cm²)' },
    { value: 'm2', label: '平方米(m²)' },
    { value: 'km2', label: '平方千米(km²)' },
    { value: 'ha', label: '公顷(ha)' },
  ],
  volume: [
    { value: 'ml', label: '毫升(ml)' },
    { value: 'l', label: '升(l)' },
    { value: 'm3', label: '立方米(m³)' },
  ],
  power: [
    { value: 'w', label: '瓦特(W)' },
    { value: 'kw', label: '千瓦(kW)' },
    { value: 'cal', label: '卡路里(cal)' },
    { value: 'kcal', label: '千卡(kcal)' },
    { value: 'j', label: '焦耳(J)' },
    { value: 'kj', label: '千焦(kJ)' },
  ],
  speed: [
    { value: 'mps', label: '米/秒(m/s)' },
    { value: 'kmph', label: '千米/时(km/h)' },
    { value: 'kn', label: '节(kn)' },
  ],
  density: [
    { value: 'kgpm3', label: '千克/立方米(kg/m³)' },
    { value: 'gpcm3', label: '克/立方厘米(g/cm³)' },
  ],
  force: [
    { value: 'n', label: '牛顿(N)' },
    { value: 'kn', label: '千牛(kN)' },
    { value: 'kgf', label: '千克力(kgf)' },
  ],
};

const conversions = {
  storage: (value, fromUnit, toUnit) => {
    const unitToBytes = {
      'bit': 1/8,
      'B': 1,
      'KB': 1024,
      'MB': 1024 * 1024,
      'GB': 1024 * 1024 * 1024,
      'TB': 1024 * 1024 * 1024 * 1024,
      'PB': 1024 * 1024 * 1024 * 1024 * 1024,
      'EB': 1024 * 1024 * 1024 * 1024 * 1024 * 1024,
    };
    const bytes = value * unitToBytes[fromUnit];
    return bytes / unitToBytes[toUnit];
  },
  length: (value, fromUnit, toUnit) => {
    const unitToMeter = {
      'nm': 1e-9,
      'um': 1e-6,
      'mm': 1e-3,
      'cm': 1e-2,
      'm': 1,
      'km': 1e3,
    };
    const meters = value * unitToMeter[fromUnit];
    return meters / unitToMeter[toUnit];
  },
  mass: (value, fromUnit, toUnit) => {
    const unitToGram = {
      'mg': 0.001,
      'g': 1,
      'kg': 1000,
      't': 1000000,
    };
    const grams = value * unitToGram[fromUnit];
    return grams / unitToGram[toUnit];
  },
  area: (value, fromUnit, toUnit) => {
    const unitToM2 = {
      'mm2': 1e-6,
      'cm2': 1e-4,
      'm2': 1,
      'km2': 1e6,
      'ha': 10000,
    };
    const m2 = value * unitToM2[fromUnit];
    return m2 / unitToM2[toUnit];
  },
  volume: (value, fromUnit, toUnit) => {
    const unitToML = {
      'ml': 1,
      'l': 1000,
      'm3': 1000000,
    };
    const ml = value * unitToML[fromUnit];
    return ml / unitToML[toUnit];
  },
  power: (value, fromUnit, toUnit) => {
    const unitToJoule = {
      'w': 1,
      'kw': 1000,
      'cal': 4.184,
      'kcal': 4184,
      'j': 1,
      'kj': 1000,
    };
    const joules = value * unitToJoule[fromUnit];
    return joules / unitToJoule[toUnit];
  },
  speed: (value, fromUnit, toUnit) => {
    const unitToMPS = {
      'mps': 1,
      'kmph': 1/3.6,
      'kn': 0.514444,
    };
    const mps = value * unitToMPS[fromUnit];
    return mps / unitToMPS[toUnit];
  },
  density: (value, fromUnit, toUnit) => {
    const unitToKGPM3 = {
      'kgpm3': 1,
      'gpcm3': 1000,
    };
    const kgpm3 = value * unitToKGPM3[fromUnit];
    return kgpm3 / unitToKGPM3[toUnit];
  },
  force: (value, fromUnit, toUnit) => {
    const unitToN = {
      'n': 1,
      'kn': 1000,
      'kgf': 9.80665,
    };
    const newtons = value * unitToN[fromUnit];
    return newtons / unitToN[toUnit];
  },
};

export const UnitConverter = () => {
  const [inputValue, setInputValue] = useState('');
  const [selectedType, setSelectedType] = useState('storage');
  const [fromUnit, setFromUnit] = useState('GB');
  const [toUnit, setToUnit] = useState('MB');
  const [result, setResult] = useState('0');

  const handleConvert = (value, type, from, to) => {
    if (!value) {
      setResult('0');
      return;
    }
    const converted = conversions[type](parseFloat(value), from, to);
    setResult(converted.toFixed(6));
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    handleConvert(value, selectedType, fromUnit, toUnit);
  };

  const handleTypeChange = (type) => {
    setSelectedType(type);
    setFromUnit(units[type][0].value);
    setToUnit(units[type][1].value);
    handleConvert(inputValue, type, units[type][0].value, units[type][1].value);
  };

  const handleFromUnitChange = (value) => {
    setFromUnit(value);
    handleConvert(inputValue, selectedType, value, toUnit);
  };

  const handleToUnitChange = (value) => {
    setToUnit(value);
    handleConvert(inputValue, selectedType, fromUnit, value);
  };

  return (
    <div style={{ padding: '20px' }}>
      <Tabs defaultActiveKey="storage" onChange={handleTypeChange}>
        <TabPane tab="存储" key="storage" />
        <TabPane tab="长度" key="length" />
        <TabPane tab="质量" key="mass" />
        <TabPane tab="面积" key="area" />
        <TabPane tab="体积" key="volume" />
        <TabPane tab="功率/热量" key="power" />
        <TabPane tab="速度" key="speed" />
        <TabPane tab="密度" key="density" />
        <TabPane tab="力" key="force" />
      </Tabs>

      <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginTop: '20px' }}>
        <Input
          style={{ width: '200px' }}
          value={inputValue}
          onChange={handleInputChange}
          placeholder="请输入数值"
        />
        <Select value={fromUnit} onChange={handleFromUnitChange} style={{ width: 120 }}>
          {units[selectedType].map(unit => (
            <Option key={unit.value} value={unit.value}>{unit.label}</Option>
          ))}
        </Select>
        <span>→</span>
        <Input
          style={{ width: '200px' }}
          value={result}
          readOnly
        />
        <Select value={toUnit} onChange={handleToUnitChange} style={{ width: 120 }}>
          {units[selectedType].map(unit => (
            <Option key={unit.value} value={unit.value}>{unit.label}</Option>
          ))}
        </Select>
      </div>
    </div>
  );
};