import React, { useState } from 'react';
import { Card, Row, Col, Modal } from 'antd';
import PluginItems from '../config/Plugins';

const Devtools = () => {
  const [selectedTool, setSelectedTool] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  // 从PluginItems中获取开发工具的配置
  const tools = PluginItems.find(item => item.key === 'devtools')?.tools || [];

  const handleToolClick = (tool) => {
    setSelectedTool(tool);
    setModalVisible(true);
  };

  return (
    <div style={{ 
      padding: '20px',
      backgroundColor: '#f8f9fa',
      minHeight: '100vh',
      margin: '-20px',
    }}>
      <Row gutter={[16, 16]}>
        {tools.map(tool => (
          <Col xs={24} sm={12} md={8} lg={6} key={tool.key}>
            <Card
              hoverable
              onClick={() => handleToolClick(tool)}
              style={{ 
                textAlign: 'center',
                backgroundColor: '#fff',
                border: '1px solid #e9ecef',
                boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
              }}
            >
              <div style={{ marginBottom: '12px' }}>{tool.icon}</div>
              <div style={{ fontWeight: 'bold' }}>{tool.title}</div>
              <div style={{ fontSize: '12px', color: '#666' }}>{tool.description}</div>
            </Card>
          </Col>
        ))}
      </Row>

      <Modal
        title={selectedTool?.title}
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        width={800}
        footer={null}
      >
        {selectedTool?.component && <selectedTool.component />}
      </Modal>
    </div>
  );
};

export default Devtools;