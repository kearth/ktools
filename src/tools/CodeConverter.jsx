import React, { useState } from 'react';
import { Input, Card, Button, Space, message } from 'antd';
import CryptoJS from 'crypto-js';
import { SwapOutlined, ClearOutlined } from '@ant-design/icons';

const { TextArea } = Input;

const codeTypes = [
  { key: 'utf8', label: 'UTF-8编码/解码' },
  { key: 'url', label: 'URL编码/解码' },
  { key: 'base64', label: 'Base64编码/解码' },
  { key: 'md5', label: 'MD5加密' },
  { key: 'unicode', label: 'Unicode编码/解码' },
];

export const CodeConverter = () => {
  const [leftText, setLeftText] = useState('');
  const [rightText, setRightText] = useState('');
  const [selectedType, setSelectedType] = useState('utf8');

  const handleEncode = () => {
    try {
      let result = '';
      switch (selectedType) {
        case 'utf8':
          result = leftText.split('').map(char => {
            const codePoint = char.codePointAt(0);
            return `&#x${codePoint.toString(16).toUpperCase()};`;
          }).join('');
          break;
        case 'base64':
          // 使用更现代的方法处理 Base64
          const encoder = new TextEncoder();
          const data = encoder.encode(leftText);
          result = btoa(String.fromCharCode(...new Uint8Array(data)));
          break;
        case 'url':
          result = encodeURIComponent(leftText);
          break;
        case 'md5':
          // 修改 MD5 实现
          const md5Hash = CryptoJS.MD5(leftText);
          result = md5Hash.toString(CryptoJS.enc.Hex).toLowerCase();
          break;
        case 'unicode':
          result = leftText.split('').map(char => 
            `\\u${char.charCodeAt(0).toString(16).padStart(4, '0')}`
          ).join('');
          break;
      }
      setRightText(result);
    } catch (error) {
      message.error('编码转换失败');
    }
  };

  const handleDecode = () => {
    try {
      let result = '';
      switch (selectedType) {
        case 'utf8':
          result = rightText.replace(/&#x([0-9A-F]+);/gi, (_, p1) => 
            String.fromCodePoint(parseInt(p1, 16))
          );
          break;
        case 'base64':
          // 使用更现代的方法处理 Base64 解码
          const binaryStr = atob(rightText);
          const bytes = new Uint8Array(binaryStr.length);
          for (let i = 0; i < binaryStr.length; i++) {
            bytes[i] = binaryStr.charCodeAt(i);
          }
          const decoder = new TextDecoder();
          result = decoder.decode(bytes);
          break;
        case 'url':
          result = decodeURIComponent(rightText);
          break;
        case 'unicode':
          result = rightText.replace(/\\u([0-9a-fA-F]{4})/g, (_, hex) => 
            String.fromCharCode(parseInt(hex, 16))
          );
          break;
        case 'md5':
          message.info('MD5是单向加密，无法解密');
          return;
      }
      setLeftText(result);
    } catch (error) {
      message.error('解码转换失败');
    }
  };

  const handleClear = () => {
    setLeftText('');
    setRightText('');
  };

  return (
    <Card style={{ margin: '20px' }}>
      <div style={{ 
        display: 'flex', 
        gap: '8px', 
        flexWrap: 'wrap',
        marginBottom: '20px' 
      }}>
        {codeTypes.map(type => (
          <div
            key={type.key}
            onMouseEnter={() => setSelectedType(type.key)}
            style={{
              padding: '8px 16px',
              borderRadius: '4px',
              cursor: 'pointer',
              backgroundColor: selectedType === type.key ? '#1677ff' : 'transparent',
              color: selectedType === type.key ? '#fff' : 'inherit',
              transition: 'all 0.3s',
              border: '1px solid #d9d9d9',
            }}
          >
            {type.label}
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', gap: '20px' }}>
        <div style={{ flex: 1 }}>
          <TextArea
            value={leftText}
            onChange={(e) => setLeftText(e.target.value)}
            placeholder="请输入要转换的文本"
            style={{ height: 200, marginBottom: 16 }}
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '10px' }}>
          <Button type="primary" onClick={handleEncode} icon={<SwapOutlined />}>
            编码 →
          </Button>
          <Button onClick={handleDecode} icon={<SwapOutlined />}>
            ← 解码
          </Button>
          <Button onClick={handleClear} icon={<ClearOutlined />}>
            清空
          </Button>
        </div>
        <div style={{ flex: 1 }}>
          <TextArea
            value={rightText}
            onChange={(e) => setRightText(e.target.value)}
            placeholder="转换结果"
            style={{ height: 200, marginBottom: 16 }}
          />
        </div>
      </div>
    </Card>
  );
};