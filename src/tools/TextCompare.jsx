import React, { useState, useEffect } from 'react';
import { Input, Card, Button, Space, message } from 'antd';
import { SwapOutlined, ClearOutlined } from '@ant-design/icons';
import { diffLines } from 'diff';
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';

const { TextArea } = Input;

export const TextCompare = () => {
  const [leftText, setLeftText] = useState('');
  const [rightText, setRightText] = useState('');
  const [diffResult, setDiffResult] = useState([]);

  const compareTexts = () => {
    if (!leftText || !rightText) {
      message.warning('请在两侧都输入文本后再进行比较');
      return;
    }

    const diff = diffLines(leftText, rightText);
    setDiffResult(diff);
  };

  const handleClear = () => {
    setLeftText('');
    setRightText('');
    setDiffResult([]);
  };

  useEffect(() => {
    Prism.highlightAll();
  }, [diffResult]);

  const renderDiff = () => {
    const leftContent = [];
    const rightContent = [];

    diffResult.forEach((part) => {
      if (part.removed) {
        leftContent.push(part);
      } else if (part.added) {
        rightContent.push(part);
      } else {
        leftContent.push(part);
        rightContent.push(part);
      }
    });

    const renderContent = (content, type) => (
      <div style={{ 
        margin: 0,
        padding: '12px',
        backgroundColor: '#1e1e1e',
        borderRadius: '4px',
        height: '100%',
        overflow: 'auto',
        fontSize: '14px',
        maxHeight: '500px',
        border: `1px solid ${type === 'left' ? '#ff4d4f' : '#52c41a'}`
      }}>
        {content.map((part, index) => (
          <div
            key={index}
            style={{
              backgroundColor: part.removed ? 'rgba(255, 0, 0, 0.15)' :
                             part.added ? 'rgba(0, 255, 0, 0.15)' :
                             'transparent',
              padding: '4px 8px',
              color: '#d4d4d4',
              display: 'flex',
              alignItems: 'flex-start'
            }}
          >
            <span style={{ 
              userSelect: 'none',
              marginRight: '8px',
              color: part.removed ? '#ff4d4f' :
                     part.added ? '#52c41a' :
                     '#d4d4d4',
              width: '15px',
              flexShrink: 0
            }}>
              {part.removed ? '-' :
               part.added ? '+' : ' '}
            </span>
            <span style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>
              {part.value}
            </span>
          </div>
        ))}
      </div>
    );

    return (
      <div style={{ 
        display: 'flex', 
        gap: '20px',
        marginTop: '20px'
      }}>
        <div style={{ flex: 1 }}>
          {renderContent(leftContent, 'left')}
        </div>
        <div style={{ flex: 1 }}>
          {renderContent(rightContent, 'right')}
        </div>
      </div>
    );
  };

  return (
    <Card style={{ margin: '20px' }} bodyStyle={{ padding: '20px', overflow: 'hidden' }}>
      <div style={{ marginBottom: '20px' }}>
        <Space>
          <Button type="primary" onClick={compareTexts} icon={<SwapOutlined />}>
            开始比较
          </Button>
          <Button onClick={handleClear} icon={<ClearOutlined />}>
            清空
          </Button>
        </Space>
      </div>
      
      <div style={{ display: 'flex', gap: '20px' }}>
        <div style={{ flex: 1 }}>
          <TextArea
            value={leftText}
            onChange={(e) => setLeftText(e.target.value)}
            placeholder="请输入第一段文本"
            style={{ height: 200 }}
          />
        </div>
        <div style={{ flex: 1 }}>
          <TextArea
            value={rightText}
            onChange={(e) => setRightText(e.target.value)}
            placeholder="请输入第二段文本"
            style={{ height: 200 }}
          />
        </div>
      </div>

      {diffResult.length > 0 && renderDiff()}
    </Card>
  );
};