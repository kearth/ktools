import React, { useState, useEffect } from 'react';
import { Button, Space, Typography, Input, Select, message, App } from 'antd';
import { SyncOutlined, CopyOutlined, FieldTimeOutlined  } from '@ant-design/icons';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { Highlight, themes } from 'prism-react-renderer';

dayjs.extend(utc);
dayjs.extend(timezone);

const { Title, Text } = Typography;

const TIMEZONES = [
  { value: 'Asia/Shanghai', label: '上海 (GMT+8)' },
  { value: 'America/New_York', label: '纽约 (GMT-4)' },
  { value: 'Europe/London', label: '伦敦 (GMT+1)' },
  { value: 'Asia/Tokyo', label: '东京 (GMT+9)' },
  { value: 'UTC', label: 'UTC' }
];

// 修改默认导出方式
const TimeConverter = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [currentTimestamp, setCurrentTimestamp] = useState(Date.now());
  const [running, setRunning] = useState(true);
  const [currentUnit, setCurrentUnit] = useState('毫秒');
  const [timestampInputUnit, setTimestampInputUnit] = useState('秒');
  const [dateToTimestampUnit, setDateToTimestampUnit] = useState('毫秒');
  const [timestampInput, setTimestampInput] = useState('');
  const [dateInput, setDateInput] = useState('');
  const [convertedDate, setConvertedDate] = useState('');
  const [convertedTimestamp, setConvertedTimestamp] = useState('');
  const [selectedTimezone, setSelectedTimezone] = useState('Asia/Shanghai');
  const [dateInputTimezone, setDateInputTimezone] = useState('Asia/Shanghai');

  const displayTimestamp = currentUnit === '毫秒' ? currentTimestamp : Math.floor(currentTimestamp / 1000);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(displayTimestamp.toString());
      messageApi.success('已复制到剪贴板');
    } catch (err) {
      messageApi.error('复制失败');
    }
  };

  const handleTimestampUnitChange = (value) => {
    setTimestampInputUnit(value);
    if (timestampInput) {
      const newValue = value === '毫秒' ? 
        Number(timestampInput) * 1000 : 
        Math.floor(Number(timestampInput) / 1000);
      setTimestampInput(newValue.toString());
    }
  };

  const handleDateToTimestampUnitChange = (value) => {
    setDateToTimestampUnit(value);
    if (convertedTimestamp) {
      const newValue = value === '毫秒' ? 
        Number(convertedTimestamp) * 1000 : 
        Math.floor(Number(convertedTimestamp) / 1000);
      setConvertedTimestamp(newValue.toString());
    }
  };

  const handleTimestampToDate = () => {
    if (!timestampInput) return;
    const timestamp = Number(timestampInput);
    if (isNaN(timestamp)) {
      messageApi.error('请输入有效的数字');
      return;
    }
    // 根据输入单位调整时间戳
    const finalTimestamp = timestampInputUnit === '秒' ? timestamp * 1000 : timestamp;
    const date = dayjs(finalTimestamp).tz(selectedTimezone);
    if (!date.isValid()) {
      messageApi.error('无效的时间戳');
      return;
    }
    setConvertedDate(date.format('YYYY-MM-DD HH:mm:ss'));
  };

  const handleDateToTimestamp = () => {
    if (!dateInput) return;
    const date = dayjs.tz(dateInput, dateInputTimezone);
    if (!date.isValid()) {
      messageApi.error('请输入有效的日期时间格式');
      return;
    }
    const timestamp = date.valueOf();
    setConvertedTimestamp(
      dateToTimestampUnit === '秒' ? 
      Math.floor(timestamp / 1000).toString() : 
      timestamp.toString()
    );
  };

  useEffect(() => {
    if (timestampInput && convertedDate) {
      handleTimestampToDate();
    }
  }, [timestampInputUnit, selectedTimezone]);

  useEffect(() => {
    if (dateInput && convertedTimestamp) {
      handleDateToTimestamp();
    }
  }, [dateToTimestampUnit, dateInputTimezone]);

  const handleCodeCopy = async (code, lang) => {
    try {
      await navigator.clipboard.writeText(code);
      messageApi.success(`已复制 ${lang} 代码`);
    } catch (err) {
      messageApi.error('复制失败');
    }
  };

  useEffect(() => {
    let timer;
    if (running) {
      timer = setInterval(() => {
        setCurrentTimestamp(Date.now());
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [running]);

  return (
    <App>
      {contextHolder}
      <div style={{ 
        padding: '24px',
        maxWidth: '800px',
        margin: '0 auto',
        background: '#fff',
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
        border: '1px solid #f0f0f0'
      }}>
        <div style={{ marginBottom: 24 }}>
          <Title level={5} style={{ marginTop: 0, marginBottom: 16 }}>当前时间戳</Title>
          <div style={{ 
            background: '#fafafa', 
            padding: '16px 24px',
            borderRadius: '8px',
            border: '1px solid #f0f0f0'
          }}>
            <Space size="large">
              <Text style={{ fontSize: '24px', color: '#1677ff' }}>
                {displayTimestamp}
                <span style={{ fontSize: '14px', marginLeft: '4px', color: '#666' }}>
                  {currentUnit}
                </span>
              </Text>
              <Space>
                <Button icon={<SyncOutlined />} onClick={() => setCurrentUnit(prev => prev === '毫秒' ? '秒' : '毫秒')}>
                  切换单位
                </Button>
                <Button icon={<CopyOutlined />} onClick={handleCopy}>复制</Button>
                <Button 
                  type="primary"
                  style={{ backgroundColor: running ? '#ff4d4f' : '#52c41a' }}
                  onClick={() => setRunning(!running)}
                >
                  {running ? '停止' : '开始'}
                </Button>
              </Space>
            </Space>
          </div>
        </div>

        <div style={{ marginBottom: 24 }}>
          <Space direction="vertical" size="middle" style={{ width: '100%' }}>
            <div style={{ 
              background: '#fafafa', 
              padding: '16px 24px',
              borderRadius: '8px',
              border: '1px solid #f0f0f0'
            }}>
              <Space direction="vertical" style={{ width: '100%' }} size="middle">
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <FieldTimeOutlined style={{ marginRight: 8 }} />
                  <Text strong>时间戳转日期时间</Text>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Input placeholder="输入时间戳" value={timestampInput} onChange={(e) => setTimestampInput(e.target.value)} style={{ width: '130px' }} />
                  <Select value={timestampInputUnit} style={{ width: '100px' }} options={[{ value: '秒', label: '秒(s)' }, { value: '毫秒', label: '毫秒(ms)' }]} onChange={handleTimestampUnitChange} />
                  <Button type="primary" onClick={handleTimestampToDate}>转换</Button>
                  <Input value={convertedDate} readOnly style={{ width: '160px' }} />
                  <Select value={selectedTimezone} style={{ width: '130px' }} options={TIMEZONES} onChange={setSelectedTimezone} />
                </div>
              </Space>
            </div>

            <div style={{ 
              background: '#fafafa', 
              padding: '16px 24px',
              borderRadius: '8px',
              border: '1px solid #f0f0f0'
            }}>
              <Space direction="vertical" style={{ width: '100%' }} size="middle">
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Input placeholder="YYYY-MM-DD HH:mm:ss" value={dateInput} onChange={(e) => setDateInput(e.target.value)} style={{ width: '180px' }} />
                  <Select value={dateInputTimezone} style={{ width: '130px' }} options={TIMEZONES} onChange={setDateInputTimezone} />
                  <Button type="primary" onClick={handleDateToTimestamp}>转换</Button>
                  <Input value={convertedTimestamp} readOnly style={{ width: '130px' }} />
                  <Select value={dateToTimestampUnit} style={{ width: '100px' }} options={[{ value: '秒', label: '秒(s)' }, { value: '毫秒', label: '毫秒(ms)' }]} onChange={handleDateToTimestampUnitChange} />
                </div>
              </Space>
            </div>
          </Space>
        </div>

        <div style={{ 
          marginBottom: 24,
          background: '#fafafa',
          padding: '24px',
          borderRadius: '8px',
          border: '1px solid #f0f0f0'
        }}>
          <Title level={5} style={{ marginBottom: 16 }}>简介</Title>
          <Space direction="vertical" size="middle" style={{ width: '100%' }}>
            <Text>
              时间戳，是从1970年1月1日（UTC/GMT的午夜）开始所经过的秒数（不考虑闰秒），用于表示一个时间点。
              然而，这种格式对于人类阅读并不友好，因此需要转换成可读的日期和时间格式。
            </Text>

            <div>
              <Title level={5}>北京时间</Title>
              <Text>
                中国采用北京时间（UTC+8）作为全国统一的标准时间。
              </Text>
            </div>

            <div>
              <Title level={5}>夏令时</Title>
              <Text>
                1986年至1991年，中华人民共和国在全国范围实行了六年夏令时，每年从4月中旬的第一个星期日2时（北京时间）到9月中旬第一个星期日的凌晨2时（北京夏令时）。
                除1986年因是实行夏令时的第一年，从5月4日开始到9月14日结束外，其它年份均按规定的时段施行。夏令时实施期间，将时间向后调快一小时。1992年4月5日后不再实行。
              </Text>
            </div>

            <div>
              <Title level={5}>JDK 的夏令时问题</Title>
              <Text>
                夏令时的起止，是政令对日历描述的人为干预。每年均可能发生变化，JDK 如何感知这个规律并在系统上加以体现的？穷举所有变化，并配置在 JDK 中。
              </Text>
              <Text>
                不同版本下 Asia/Shanghai 时区夏令时起始时间不同，早期维护者认为中国标准时间的夏令时切换发生在0时，而后来又经证明发生在2时，新版本 JDK 及时修正了这个问题。
              </Text>
              <Text type="secondary" style={{ marginTop: 8 }}>
                详见：<a href="https://bugs.openjdk.org/browse/JDK-8074806" target="_blank" rel="noopener noreferrer">
                  Timezone Data Versions in the JRE Software
                </a>
              </Text>
            </div>
          </Space>
        </div>

        <div style={{ marginBottom: 24 }}>
          <Title level={5}>获取时间戳的代码示例</Title>
          <div style={{ 
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            width: '100%' 
          }}>
            {[
              { lang: 'JavaScript', code: 'Math.floor(Date.now() / 1000)  // 秒' },
              { lang: 'Python', code: 'import time\ntime.time()  # 秒' },
              { lang: 'Java', code: 'System.currentTimeMillis() / 1000L;  // 秒' },
              { lang: 'Go', code: 'time.Now().Unix()  // 秒' },
              { lang: 'PHP', code: 'time();  // 秒' },
              { lang: 'C#', code: 'DateTimeOffset.UtcNow.ToUnixTimeSeconds();  // 秒' },
              { lang: 'Ruby', code: 'Time.now.to_i  # 秒' },
              { lang: 'Swift', code: 'Int(Date().timeIntervalSince1970)  // 秒' },
              { lang: 'Rust', code: 'SystemTime::now().duration_since(UNIX_EPOCH).unwrap().as_secs()  // 秒' },
              { lang: 'SQL', code: 'SELECT UNIX_TIMESTAMP();  -- 秒' },
              { lang: 'Shell', code: 'date +%s  # 秒' }
            ].map(({ lang, code }) => (
              <div key={lang} style={{ 
                background: '#282a36',  // Dracula 背景色
                border: '1px solid #44475a',  // Dracula 边框色
                borderRadius: '4px',
                overflow: 'hidden'
              }}>
                <div style={{
                  padding: '8px 16px',
                  borderBottom: '1px solid #44475a',
                  background: '#1e1f29',  // 稍深一点的背景色
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <Text strong style={{ color: '#f8f8f2' }}>{lang}</Text>
                  <Button 
                    type="text" 
                    icon={<CopyOutlined style={{ color: '#f8f8f2' }} />}
                    onClick={() => handleCodeCopy(code, lang)}
                  >
                    复制
                  </Button>
                </div>
                <Highlight
                  theme={themes.dracula}  // 使用 dracula 主题
                  code={code}
                  language={lang.toLowerCase()}
                >
                  {({ tokens, getLineProps, getTokenProps }) => (
                    <pre style={{
                      margin: 0,
                      padding: '16px',
                      background: 'transparent'
                    }}>
                      {tokens.map((line, i) => (
                        <div key={i} {...getLineProps({ line })}>
                          {line.map((token, key) => (
                            <span key={key} {...getTokenProps({ token })} />
                          ))}
                        </div>
                      ))}
                    </pre>
                  )}
                </Highlight>
              </div>
            ))}
          </div>
        </div>
      </div>
    </App>
  );
};

// 修改为命名导出
export { TimeConverter };