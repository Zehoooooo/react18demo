import React, { useState, useEffect } from 'react';
import { usePrevious, usePreviousValues, useValueComparison } from '../hooks/usePrevious';

const PreviousDemo = () => {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('');
  const [age, setAge] = useState(18);
  const [theme, setTheme] = useState('light');

  // 基础用法
  const previousCount = usePrevious(count);

  // 多值比较
  const previousValues = usePreviousValues({ name, age, theme });

  // 值比较
  const countComparison = useValueComparison(count);
  const nameComparison = useValueComparison(name, (prev, curr) => prev !== curr);

  // 复杂比较函数
  const ageComparison = useValueComparison(age, (prev, curr) => {
    if (prev === undefined) return false;
    return Math.abs(curr - prev) > 5; // 年龄变化超过5岁才算变化
  });

  // 记录变化历史
  const [changeHistory, setChangeHistory] = useState([]);

  useEffect(() => {
    if (countComparison.hasChanged && !countComparison.isFirstRender) {
      setChangeHistory(prev => [
        ...prev,
        {
          type: 'count',
          from: countComparison.previous,
          to: countComparison.current,
          timestamp: new Date().toLocaleTimeString(),
        },
      ]);
    }
  }, [countComparison]);

  useEffect(() => {
    if (nameComparison.hasChanged && !nameComparison.isFirstRender) {
      setChangeHistory(prev => [
        ...prev,
        {
          type: 'name',
          from: nameComparison.previous || '空',
          to: nameComparison.current,
          timestamp: new Date().toLocaleTimeString(),
        },
      ]);
    }
  }, [nameComparison]);

  return (
    <div style={{ padding: '20px', maxWidth: '800px' }}>
      <h2>usePrevious Hook Demo</h2>

      <div style={{ marginBottom: '30px' }}>
        <h3>基础用法</h3>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '15px' }}>
          <button
            onClick={() => setCount(prev => prev + 1)}
            style={{
              padding: '10px 20px',
              backgroundColor: '#2ed573',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            增加计数
          </button>
          <span>当前值: {count}</span>
          <span>前一个值: {previousCount ?? '无'}</span>
        </div>
        <div style={{ background: '#f8f9fa', padding: '10px', borderRadius: '4px' }}>
          <p>变化: {countComparison.hasChanged ? '是' : '否'}</p>
          <p>首次渲染: {countComparison.isFirstRender ? '是' : '否'}</p>
        </div>
      </div>

      <div style={{ marginBottom: '30px' }}>
        <h3>多值比较</h3>
        <div style={{ display: 'grid', gap: '10px', marginBottom: '15px' }}>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="输入姓名"
            style={{ padding: '8px' }}
          />
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(parseInt(e.target.value) || 0)}
            placeholder="输入年龄"
            style={{ padding: '8px' }}
          />
          <select
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            style={{ padding: '8px' }}
          >
            <option value="light">浅色主题</option>
            <option value="dark">深色主题</option>
            <option value="auto">自动主题</option>
          </select>
        </div>
        
        <div style={{ background: '#f8f9fa', padding: '15px', borderRadius: '8px' }}>
          <h4>当前值:</h4>
          <pre>{JSON.stringify({ name, age, theme }, null, 2)}</pre>
          <h4>前一个值:</h4>
          <pre>{JSON.stringify(previousValues, null, 2)}</pre>
        </div>
      </div>

      <div style={{ marginBottom: '30px' }}>
        <h3>自定义比较函数</h3>
        <div style={{ marginBottom: '15px' }}>
          <label>
            年龄: {age} 岁
            <input
              type="range"
              min="0"
              max="100"
              value={age}
              onChange={(e) => setAge(parseInt(e.target.value))}
              style={{ marginLeft: '10px' }}
            />
          </label>
        </div>
        
        <div style={{ background: '#f8f9fa', padding: '10px', borderRadius: '4px' }}>
          <p>年龄变化超过5岁: {ageComparison.hasChanged ? '是' : '否'}</p>
          <p>前一个年龄: {ageComparison.previous ?? '无'}</p>
          <p>当前年龄: {ageComparison.current}</p>
        </div>
      </div>

      <div style={{ marginBottom: '30px' }}>
        <h3>变化历史</h3>
        <div style={{ maxHeight: '200px', overflowY: 'auto', border: '1px solid #ddd', borderRadius: '8px' }}>
          {changeHistory.length === 0 ? (
            <div style={{ padding: '15px', textAlign: 'center', color: '#666' }}>
              还没有变化记录
            </div>
          ) : (
            changeHistory.map((change, index) => (
              <div
                key={index}
                style={{
                  padding: '10px',
                  borderBottom: '1px solid #eee',
                  background: '#f8f9fa',
                }}
              >
                <strong>{change.type}</strong>: {change.from} → {change.to}
                <span style={{ float: 'right', fontSize: '12px', color: '#666' }}>
                  {change.timestamp}
                </span>
              </div>
            ))
          )}
        </div>
        <button
          onClick={() => setChangeHistory([])}
          style={{
            marginTop: '10px',
            padding: '5px 10px',
            backgroundColor: '#ff4757',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          清除历史
        </button>
      </div>

      <div style={{ background: '#f8f9fa', padding: '15px', borderRadius: '8px' }}>
        <h4>usePrevious 应用场景：</h4>
        <ul>
          <li>值变化检测</li>
          <li>状态回滚</li>
          <li>动画触发</li>
          <li>数据对比</li>
          <li>调试和日志</li>
          <li>性能优化</li>
        </ul>
      </div>
    </div>
  );
};

export default PreviousDemo;