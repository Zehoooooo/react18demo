import React, { useState } from 'react';

const QRCodeDemo = () => {
  const [qrType, setQrType] = useState('text');
  const [qrData, setQrData] = useState('');
  const [qrSize, setQrSize] = useState(200);
  const [qrColor, setQrColor] = useState('#000000');
  const [bgColor, setBgColor] = useState('#FFFFFF');
  const [qrImage, setQrImage] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  // WiFi配置
  const [wifiData, setWifiData] = useState({
    ssid: '',
    password: '',
    encryption: 'WPA',
    hidden: false
  });

  // 联系人信息
  const [contactData, setContactData] = useState({
    name: '',
    phone: '',
    email: '',
    company: '',
    title: ''
  });

  // 生成二维码的函数
  const generateQRCode = async (data) => {
    setIsGenerating(true);
    
    try {
      // 验证数据长度（二维码有容量限制）
      if (data.length > 2000) {
        alert('数据内容过长，请减少内容');
        setIsGenerating(false);
        return;
      }
      
      // 使用在线QR码生成API
      const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=${qrSize}x${qrSize}&data=${encodeURIComponent(data)}&color=${qrColor.replace('#', '')}&bgcolor=${bgColor.replace('#', '')}&format=png&margin=2`;
      
      // 模拟生成延迟
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // 验证图片是否可以加载
      const img = new Image();
      img.onload = () => {
        setQrImage(qrUrl);
      };
      img.onerror = () => {
        alert('二维码生成失败，请检查网络连接或重试');
      };
      img.src = qrUrl;
      
    } catch (error) {
      console.error('生成二维码失败:', error);
      alert('生成二维码失败，请重试');
    } finally {
      setIsGenerating(false);
    }
  };

  // 根据类型生成数据
  const getQRData = () => {
    switch (qrType) {
      case 'text':
        return qrData;
      case 'url':
        return qrData.startsWith('http') ? qrData : `https://${qrData}`;
      case 'wifi':
        const { ssid, password, encryption, hidden } = wifiData;
        // 修复WiFi二维码格式，确保所有字段都正确编码
        const wifiString = `WIFI:T:${encryption};S:${ssid || ''};P:${password || ''};H:${hidden ? 'true' : 'false'};`;
        return wifiString;
      case 'contact':
        const { name, phone, email, company, title } = contactData;
        // 确保vCard格式正确，过滤空值
        const vCardLines = [
          'BEGIN:VCARD',
          'VERSION:3.0',
          name && `FN:${name}`,
          phone && `TEL:${phone}`,
          email && `EMAIL:${email}`,
          company && `ORG:${company}`,
          title && `TITLE:${title}`,
          'END:VCARD'
        ].filter(Boolean); // 过滤掉空值
        return vCardLines.join('\n');
      case 'email':
        return `mailto:${qrData}`;
      case 'phone':
        return `tel:${qrData}`;
      default:
        return qrData;
    }
  };

  // 生成二维码
  const handleGenerate = () => {
    const data = getQRData();
    // 添加数据验证
    if (!data.trim()) {
      alert('请输入内容');
      return;
    }
    
    // 特殊验证
    if (qrType === 'wifi' && !wifiData.ssid.trim()) {
      alert('请输入WiFi名称');
      return;
    }
    
    if (qrType === 'contact' && !contactData.name.trim()) {
      alert('请输入联系人姓名');
      return;
    }
    
    generateQRCode(data);
  };

  // 下载二维码
  const downloadQRCode = () => {
    if (qrImage) {
      const link = document.createElement('a');
      link.href = qrImage;
      link.download = `qrcode-${Date.now()}.png`;
      link.click();
    }
  };

  // 渲染不同类型的输入表单
  const renderInputForm = () => {
    switch (qrType) {
      case 'wifi':
        return (
          <div style={{ display: 'grid', gap: '10px' }}>
            <input
              type="text"
              placeholder="WiFi名称 (SSID)"
              value={wifiData.ssid}
              onChange={(e) => setWifiData(prev => ({ ...prev, ssid: e.target.value }))}
              style={{ padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
            />
            <input
              type="password"
              placeholder="WiFi密码"
              value={wifiData.password}
              onChange={(e) => setWifiData(prev => ({ ...prev, password: e.target.value }))}
              style={{ padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
            />
            <select
              value={wifiData.encryption}
              onChange={(e) => setWifiData(prev => ({ ...prev, encryption: e.target.value }))}
              style={{ padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
            >
              <option value="WPA">WPA/WPA2</option>
              <option value="WEP">WEP</option>
              <option value="nopass">无密码</option>
            </select>
            <label style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <input
                type="checkbox"
                checked={wifiData.hidden}
                onChange={(e) => setWifiData(prev => ({ ...prev, hidden: e.target.checked }))}
              />
              隐藏网络
            </label>
          </div>
        );

      case 'contact':
        return (
          <div style={{ display: 'grid', gap: '10px' }}>
            <input
              type="text"
              placeholder="姓名"
              value={contactData.name}
              onChange={(e) => setContactData(prev => ({ ...prev, name: e.target.value }))}
              style={{ padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
            />
            <input
              type="tel"
              placeholder="电话号码"
              value={contactData.phone}
              onChange={(e) => setContactData(prev => ({ ...prev, phone: e.target.value }))}
              style={{ padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
            />
            <input
              type="email"
              placeholder="邮箱地址"
              value={contactData.email}
              onChange={(e) => setContactData(prev => ({ ...prev, email: e.target.value }))}
              style={{ padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
            />
            <input
              type="text"
              placeholder="公司"
              value={contactData.company}
              onChange={(e) => setContactData(prev => ({ ...prev, company: e.target.value }))}
              style={{ padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
            />
            <input
              type="text"
              placeholder="职位"
              value={contactData.title}
              onChange={(e) => setContactData(prev => ({ ...prev, title: e.target.value }))}
              style={{ padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
            />
          </div>
        );

      default:
        return (
          <input
            type="text"
            value={qrData}
            onChange={(e) => setQrData(e.target.value)}
            placeholder={`输入${qrType === 'url' ? '网址' : qrType === 'email' ? '邮箱地址' : qrType === 'phone' ? '电话号码' : '文本内容'}`}
            style={{ padding: '8px', border: '1px solid #ddd', borderRadius: '4px', width: '100%' }}
          />
        );
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '900px' }}>
      <h2>二维码生成器 Demo</h2>
      <p>生成各种类型的二维码，支持文本、URL、WiFi配置、联系人信息等</p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', marginBottom: '30px' }}>
        {/* 左侧：配置面板 */}
        <div>
          <h3>二维码配置</h3>
          
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
              二维码类型
            </label>
            <select
              value={qrType}
              onChange={(e) => setQrType(e.target.value)}
              style={{ padding: '8px', border: '1px solid #ddd', borderRadius: '4px', width: '100%' }}
            >
              <option value="text">文本</option>
              <option value="url">网址</option>
              <option value="wifi">WiFi配置</option>
              <option value="contact">联系人信息</option>
              <option value="email">邮箱地址</option>
              <option value="phone">电话号码</option>
            </select>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
              内容
            </label>
            {renderInputForm()}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '20px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontSize: '12px' }}>
                二维码颜色
              </label>
              <input
                type="color"
                value={qrColor}
                onChange={(e) => setQrColor(e.target.value)}
                style={{ width: '100%', height: '40px', border: '1px solid #ddd', borderRadius: '4px' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontSize: '12px' }}>
                背景颜色
              </label>
              <input
                type="color"
                value={bgColor}
                onChange={(e) => setBgColor(e.target.value)}
                style={{ width: '100%', height: '40px', border: '1px solid #ddd', borderRadius: '4px' }}
              />
            </div>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
              尺寸: {qrSize}px
            </label>
            <input
              type="range"
              min="100"
              max="400"
              value={qrSize}
              onChange={(e) => setQrSize(parseInt(e.target.value))}
              style={{ width: '100%' }}
            />
          </div>

          <button
            onClick={handleGenerate}
            disabled={isGenerating}
            style={{
              padding: '12px 24px',
              backgroundColor: isGenerating ? '#ccc' : '#2ed573',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: isGenerating ? 'not-allowed' : 'pointer',
              width: '100%',
              fontSize: '16px'
            }}
          >
            {isGenerating ? '生成中...' : '生成二维码'}
          </button>
        </div>

        {/* 右侧：预览区域 */}
        <div>
          <h3>二维码预览</h3>
          
          <div style={{
            border: '2px dashed #ddd',
            borderRadius: '8px',
            padding: '20px',
            textAlign: 'center',
            minHeight: '300px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#f8f9fa'
          }}>
            {isGenerating ? (
              <div>
                <div style={{ fontSize: '48px', marginBottom: '10px' }}>⏳</div>
                <p>正在生成二维码...</p>
              </div>
            ) : qrImage ? (
              <div>
                <img
                  src={qrImage}
                  alt="生成的二维码"
                  style={{
                    maxWidth: '100%',
                    maxHeight: '250px',
                    border: '1px solid #ddd',
                    borderRadius: '4px'
                  }}
                />
                <div style={{ marginTop: '15px' }}>
                  <button
                    onClick={downloadQRCode}
                    style={{
                      padding: '8px 16px',
                      backgroundColor: '#3742fa',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      marginRight: '10px'
                    }}
                  >
                    📥 下载二维码
                  </button>
                  <button
                    onClick={() => setQrImage('')}
                    style={{
                      padding: '8px 16px',
                      backgroundColor: '#ff4757',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer'
                    }}
                  >
                    🗑️ 清除
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <div style={{ fontSize: '48px', marginBottom: '10px' }}>📱</div>
                <p>点击"生成二维码"按钮开始</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div style={{ background: '#f8f9fa', padding: '15px', borderRadius: '8px' }}>
        <h4>二维码生成器功能特性：</h4>
        <ul>
          <li>多种二维码类型：文本、URL、WiFi、联系人、邮箱、电话</li>
          <li>自定义颜色和尺寸</li>
          <li>实时预览</li>
          <li>一键下载</li>
          <li>WiFi配置自动生成</li>
          <li>联系人信息vCard格式</li>
          <li>响应式设计</li>
        </ul>
      </div>
    </div>
  );
};

export default QRCodeDemo; 