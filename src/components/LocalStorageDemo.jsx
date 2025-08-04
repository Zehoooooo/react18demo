import React, { useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

const LocalStorageDemo = () => {
  const [inputValue, setInputValue] = useState('');
  
  // 基础用法
  const [basicValue, setBasicValue] = useLocalStorage('basic-key', '');
  
  // 带加密的用法
  const [encryptedValue, setEncryptedValue] = useLocalStorage('encrypted-key', '', {
    encrypt: true,
  });
  
  // 带过期时间的用法（5秒后过期）
  const [expiringValue, setExpiringValue] = useLocalStorage('expiring-key', '', {
    expireTime: 5000,
  });
  
  // 复杂对象存储
  const [userData, setUserData] = useLocalStorage('user-data', {
    name: '',
    email: '',
    preferences: {
      theme: 'light',
      language: 'zh-CN',
    },
  });

  const handleUpdateUserData = (field, value) => {
    setUserData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleUpdatePreferences = (key, value) => {
    setUserData(prev => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        [key]: value,
      },
    }));
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px' }}>
      <h2>useLocalStorage Hook Demo</h2>
      
      <div style={{ marginBottom: '20px' }}>
        <h3>基础用法</h3>
        <input
          type="text"
          value={basicValue}
          onChange={(e) => setBasicValue(e.target.value)}
          placeholder="输入内容会自动保存到localStorage"
          style={{ width: '100%', padding: '8px' }}
        />
        <p>当前值: {basicValue}</p>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h3>加密存储</h3>
        <input
          type="text"
          value={encryptedValue}
          onChange={(e) => setEncryptedValue(e.target.value)}
          placeholder="输入内容会加密存储"
          style={{ width: '100%', padding: '8px' }}
        />
        <p>当前值: {encryptedValue}</p>
        <p style={{ fontSize: '12px', color: '#666' }}>
          在浏览器开发者工具的Application标签页中查看，数据是加密的
        </p>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h3>带过期时间的存储（5秒后过期）</h3>
        <input
          type="text"
          value={expiringValue}
          onChange={(e) => setExpiringValue(e.target.value)}
          placeholder="输入内容5秒后过期"
          style={{ width: '100%', padding: '8px' }}
        />
        <p>当前值: {expiringValue}</p>
        <p style={{ fontSize: '12px', color: '#666' }}>
          5秒后刷新页面，这个值会消失
        </p>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h3>复杂对象存储</h3>
        <div style={{ display: 'grid', gap: '10px' }}>
          <input
            type="text"
            value={userData.name}
            onChange={(e) => handleUpdateUserData('name', e.target.value)}
            placeholder="用户名"
            style={{ padding: '8px' }}
          />
          <input
            type="email"
            value={userData.email}
            onChange={(e) => handleUpdateUserData('email', e.target.value)}
            placeholder="邮箱"
            style={{ padding: '8px' }}
          />
          <select
            value={userData.preferences.theme}
            onChange={(e) => handleUpdatePreferences('theme', e.target.value)}
            style={{ padding: '8px' }}
          >
            <option value="light">浅色主题</option>
            <option value="dark">深色主题</option>
          </select>
          <select
            value={userData.preferences.language}
            onChange={(e) => handleUpdatePreferences('language', e.target.value)}
            style={{ padding: '8px' }}
          >
            <option value="zh-CN">中文</option>
            <option value="en-US">English</option>
          </select>
        </div>
        <pre style={{ background: '#f5f5f5', padding: '10px', borderRadius: '4px' }}>
          {JSON.stringify(userData, null, 2)}
        </pre>
      </div>

      <div style={{ marginTop: '20px' }}>
        <button
          onClick={() => {
            localStorage.clear();
            window.location.reload();
          }}
          style={{
            padding: '10px 20px',
            backgroundColor: '#ff4757',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          清除所有localStorage并刷新
        </button>
      </div>
    </div>
  );
};

export default LocalStorageDemo;