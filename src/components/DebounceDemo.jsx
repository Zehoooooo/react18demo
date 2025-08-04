import React, { useState } from 'react';
import { useDebounce } from '../hooks/useDebounce';

const DebounceDemo = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [leadingValue, setLeadingValue] = useState('');
  const [maxWaitValue, setMaxWaitValue] = useState('');

  // 基础防抖
  const [debouncedSearchTerm, { cancel: cancelSearch, flush: flushSearch }] = useDebounce(
    searchTerm,
    500
  );

  // 前缘防抖（立即执行）
  const [debouncedLeadingValue] = useDebounce(leadingValue, 300, {
    leading: true,
    trailing: false,
  });

  // 最大等待时间防抖
  const [debouncedMaxWaitValue] = useDebounce(maxWaitValue, 1000, {
    maxWait: 2000, // 最多等待2秒
  });

  return (
    <div style={{ padding: '20px', maxWidth: '600px' }}>
      <h2>useDebounce Hook Demo</h2>

      <div style={{ marginBottom: '30px' }}>
        <h3>基础防抖（500ms）</h3>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="输入搜索内容..."
          style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
        />
        <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
          <button
            onClick={cancelSearch}
            style={{
              padding: '5px 10px',
              backgroundColor: '#ff4757',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            取消防抖
          </button>
          <button
            onClick={flushSearch}
            style={{
              padding: '5px 10px',
              backgroundColor: '#2ed573',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            立即执行
          </button>
        </div>
        <p>原始值: {searchTerm}</p>
        <p>防抖值: {debouncedSearchTerm}</p>
      </div>

      <div style={{ marginBottom: '30px' }}>
        <h3>前缘防抖（立即执行）</h3>
        <input
          type="text"
          value={leadingValue}
          onChange={(e) => setLeadingValue(e.target.value)}
          placeholder="输入内容会立即执行..."
          style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
        />
        <p>原始值: {leadingValue}</p>
        <p>防抖值: {debouncedLeadingValue}</p>
        <p style={{ fontSize: '12px', color: '#666' }}>
          注意：这个防抖会在输入时立即执行，而不是等待停止输入
        </p>
      </div>

      <div style={{ marginBottom: '30px' }}>
        <h3>最大等待时间防抖（最多等待2秒）</h3>
        <input
          type="text"
          value={maxWaitValue}
          onChange={(e) => setMaxWaitValue(e.target.value)}
          placeholder="输入内容，最多等待2秒..."
          style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
        />
        <p>原始值: {maxWaitValue}</p>
        <p>防抖值: {debouncedMaxWaitValue}</p>
        <p style={{ fontSize: '12px', color: '#666' }}>
          即使持续输入，2秒后也会执行
        </p>
      </div>

      <div style={{ background: '#f8f9fa', padding: '15px', borderRadius: '8px' }}>
        <h4>防抖应用场景：</h4>
        <ul>
          <li>搜索框输入</li>
          <li>窗口大小调整</li>
          <li>滚动事件处理</li>
          <li>API请求优化</li>
          <li>表单验证</li>
        </ul>
      </div>
    </div>
  );
};

export default DebounceDemo;
