import React, { useState, useCallback, useMemo, useEffect } from 'react';

// 子组件 - 用于演示useCallback的性能优化
const ExpensiveChild = React.memo(({ onIncrement, onDecrement, count, label }) => {
  console.log(`${label} 组件重新渲染了`);
  
  return (
    <div style={{ 
      padding: '15px', 
      border: '2px solid #ddd', 
      borderRadius: '6px', 
      margin: '10px 0',
      backgroundColor: '#f9f9f9'
    }}>
      <h4>{label}</h4>
      <p>计数: {count}</p>
      <div>
        <button onClick={onIncrement} style={{ marginRight: '10px' }}>增加</button>
        <button onClick={onDecrement}>减少</button>
      </div>
    </div>
  );
});

// 模拟昂贵计算
const expensiveCalculation = (count) => {
  console.log('执行昂贵计算...');
  let result = 0;
  for (let i = 0; i < 1000000; i++) {
    result += count;
  }
  return result;
};

const UseCallbackDetailedDemo = () => {
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);
  const [count3, setCount3] = useState(0);
  const [name, setName] = useState('');
  const [renderCount, setRenderCount] = useState(0);

  // 强制重新渲染
  const forceRender = () => {
    setRenderCount(prev => prev + 1);
  };

  // 1. 基础用法 - 没有依赖项
  const handleIncrement1 = useCallback(() => {
    setCount1(c => c + 1);
  }, []); // 空依赖数组，函数永远不会改变

  const handleDecrement1 = useCallback(() => {
    setCount1(c => c - 1);
  }, []);

  // 2. 有依赖项的用法
  const handleIncrement2 = useCallback(() => {
    setCount2(c => c + 1);
  }, [count2]); // 依赖count2，当count2变化时函数会重新创建

  const handleDecrement2 = useCallback(() => {
    setCount2(c => c - 1);
  }, [count2]);

  // 3. 多个依赖项
  const handleIncrement3 = useCallback(() => {
    setCount3(c => c + 1);
  }, [count3, name]); // 依赖count3和name

  const handleDecrement3 = useCallback(() => {
    setCount3(c => c - 1);
  }, [count3, name]);

  // 4. 函数依赖
  const createMessage = useCallback((value) => {
    return `当前计数: ${value}, 姓名: ${name}`;
  }, [name]); // 依赖name

  // 5. 对象依赖 - 错误用法
  const wrongObject = { id: 1 }; // 每次渲染都会创建新对象
  const handleWrongCallback = useCallback(() => {
    console.log('这个函数每次都会重新创建');
  }, [wrongObject]); // 错误：对象每次都是新的

  // 6. 对象依赖 - 正确用法
  const correctObject = useMemo(() => ({ id: 1 }), []); // 使用useMemo缓存对象
  const handleCorrectCallback = useCallback(() => {
    console.log('这个函数不会重新创建');
  }, [correctObject]); // 正确：对象被缓存

  // 7. 模拟API调用
  const fetchData = useCallback(async (id) => {
    console.log(`开始获取数据，ID: ${id}`);
    // 模拟API调用
    await new Promise(resolve => setTimeout(resolve, 1000));
    return { id, data: `数据 ${id}` };
  }, []); // 没有依赖项，函数永远不会改变

  // 8. 事件处理器的useCallback
  const handleNameChange = useCallback((e) => {
    setName(e.target.value);
  }, []);

  // 9. 条件性回调
  const handleConditionalCallback = useCallback((value) => {
    if (count1 > 5) {
      console.log('计数大于5，执行特殊逻辑');
      return value * 2;
    } else {
      console.log('计数小于等于5，执行普通逻辑');
      return value;
    }
  }, [count1]); // 依赖count1

  // 10. 递归回调
  const handleRecursiveCallback = useCallback((n) => {
    if (n <= 1) return 1;
    return n * handleRecursiveCallback(n - 1);
  }, []); // 注意：这里没有依赖项，但函数内部调用了自己

  // 使用useEffect监听函数变化
  useEffect(() => {
    console.log('handleIncrement1 函数改变了');
  }, [handleIncrement1]);

  useEffect(() => {
    console.log('handleIncrement2 函数改变了');
  }, [handleIncrement2]);

  useEffect(() => {
    console.log('handleIncrement3 函数改变了');
  }, [handleIncrement3]);

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '20px' }}>
      <h2 style={{ color: '#333', borderBottom: '2px solid #667eea', paddingBottom: '10px' }}>
        useCallback 详细用法演示
      </h2>

      {/* 控制面板 */}
      <div style={{ marginBottom: '20px', padding: '15px', backgroundColor: '#e3f2fd', borderRadius: '6px' }}>
        <h3>控制面板</h3>
        <div style={{ marginBottom: '10px' }}>
          <label>
            <strong>姓名:</strong>
            <input
              type="text"
              value={name}
              onChange={handleNameChange}
              placeholder="输入姓名"
              style={{ marginLeft: '10px', padding: '5px', borderRadius: '4px', border: '1px solid #ddd' }}
            />
          </label>
        </div>
        <button onClick={forceRender} style={{ marginRight: '10px' }}>
          强制重新渲染 (当前: {renderCount})
        </button>
        <button onClick={() => fetchData(count1)}>
          模拟API调用
        </button>
      </div>

      {/* 1. 基础用法演示 */}
      <div style={{ marginBottom: '30px' }}>
        <h3 style={{ color: '#667eea' }}>1. 基础用法 - 无依赖项</h3>
        <div style={{ padding: '15px', backgroundColor: '#f8f9fa', borderRadius: '6px' }}>
          <p><strong>说明:</strong> 空依赖数组，函数永远不会重新创建</p>
          <p><strong>当前计数:</strong> {count1}</p>
          <ExpensiveChild
            label="无依赖项 (不会重新渲染)"
            count={count1}
            onIncrement={handleIncrement1}
            onDecrement={handleDecrement1}
          />
        </div>
      </div>

      {/* 2. 有依赖项演示 */}
      <div style={{ marginBottom: '30px' }}>
        <h3 style={{ color: '#667eea' }}>2. 有依赖项 - 会重新创建</h3>
        <div style={{ padding: '15px', backgroundColor: '#f8f9fa', borderRadius: '6px' }}>
          <p><strong>说明:</strong> 依赖count2，当count2变化时函数会重新创建</p>
          <p><strong>当前计数:</strong> {count2}</p>
          <ExpensiveChild
            label="有依赖项 (会重新渲染)"
            count={count2}
            onIncrement={handleIncrement2}
            onDecrement={handleDecrement2}
          />
        </div>
      </div>

      {/* 3. 多个依赖项演示 */}
      <div style={{ marginBottom: '30px' }}>
        <h3 style={{ color: '#667eea' }}>3. 多个依赖项</h3>
        <div style={{ padding: '15px', backgroundColor: '#f8f9fa', borderRadius: '6px' }}>
          <p><strong>说明:</strong> 依赖count3和name，任一变化都会重新创建函数</p>
          <p><strong>当前计数:</strong> {count3}</p>
          <p><strong>当前姓名:</strong> {name || '未输入'}</p>
          <ExpensiveChild
            label="多依赖项"
            count={count3}
            onIncrement={handleIncrement3}
            onDecrement={handleDecrement3}
          />
        </div>
      </div>

      {/* 4. 函数依赖演示 */}
      <div style={{ marginBottom: '30px' }}>
        <h3 style={{ color: '#667eea' }}>4. 函数依赖</h3>
        <div style={{ padding: '15px', backgroundColor: '#f8f9fa', borderRadius: '6px' }}>
          <p><strong>说明:</strong> createMessage函数依赖name，name变化时函数重新创建</p>
          <p><strong>消息:</strong> {createMessage(count1)}</p>
          <button onClick={() => console.log(createMessage(count1))}>
            调用createMessage函数
          </button>
        </div>
      </div>

      {/* 5. 错误用法演示 */}
      <div style={{ marginBottom: '30px' }}>
        <h3 style={{ color: '#ff6b6b' }}>5. 错误用法 - 对象依赖</h3>
        <div style={{ padding: '15px', backgroundColor: '#ffe6e6', borderRadius: '6px' }}>
          <p><strong>问题:</strong> 对象每次渲染都是新的，导致函数总是重新创建</p>
          <button onClick={handleWrongCallback}>错误用法按钮</button>
          <p style={{ fontSize: '12px', color: '#666' }}>
            打开控制台查看函数是否重新创建
          </p>
        </div>
      </div>

      {/* 6. 正确用法演示 */}
      <div style={{ marginBottom: '30px' }}>
        <h3 style={{ color: '#51cf66' }}>6. 正确用法 - 使用useMemo</h3>
        <div style={{ padding: '15px', backgroundColor: '#e8f5e8', borderRadius: '6px' }}>
          <p><strong>解决方案:</strong> 使用useMemo缓存对象，避免不必要的重新创建</p>
          <button onClick={handleCorrectCallback}>正确用法按钮</button>
          <p style={{ fontSize: '12px', color: '#666' }}>
            打开控制台查看函数是否重新创建
          </p>
        </div>
      </div>

      {/* 7. 条件性回调演示 */}
      <div style={{ marginBottom: '30px' }}>
        <h3 style={{ color: '#667eea' }}>7. 条件性回调</h3>
        <div style={{ padding: '15px', backgroundColor: '#f8f9fa', borderRadius: '6px' }}>
          <p><strong>说明:</strong> 根据count1的值执行不同的逻辑</p>
          <p><strong>当前计数:</strong> {count1}</p>
          <button onClick={() => {
            const result = handleConditionalCallback(count1);
            console.log(`条件性回调结果: ${result}`);
          }}>
            执行条件性回调
          </button>
        </div>
      </div>

      {/* 8. 递归回调演示 */}
      <div style={{ marginBottom: '30px' }}>
        <h3 style={{ color: '#667eea' }}>8. 递归回调</h3>
        <div style={{ padding: '15px', backgroundColor: '#f8f9fa', borderRadius: '6px' }}>
          <p><strong>说明:</strong> 递归函数使用useCallback</p>
          <button onClick={() => {
            const result = handleRecursiveCallback(5);
            console.log(`5的阶乘: ${result}`);
          }}>
            计算5的阶乘
          </button>
        </div>
      </div>

      {/* 9. 性能对比 */}
      <div style={{ marginBottom: '30px' }}>
        <h3 style={{ color: '#667eea' }}>9. 性能对比</h3>
        <div style={{ padding: '15px', backgroundColor: '#f8f9fa', borderRadius: '6px' }}>
          <p><strong>useCallback vs 普通函数:</strong></p>
          <ul>
            <li><strong>useCallback:</strong> 只有当依赖项变化时才重新创建函数</li>
            <li><strong>普通函数:</strong> 每次组件重新渲染都会创建新函数</li>
            <li><strong>性能影响:</strong> 当函数作为props传递给子组件时，useCallback可以避免不必要的重新渲染</li>
          </ul>
          <p style={{ fontSize: '12px', color: '#666' }}>
            提示: 打开浏览器控制台查看组件重新渲染的日志
          </p>
        </div>
      </div>

      {/* 10. 最佳实践 */}
      <div style={{ marginBottom: '30px' }}>
        <h3 style={{ color: '#667eea' }}>10. useCallback 最佳实践</h3>
        <div style={{ padding: '15px', backgroundColor: '#f8f9fa', borderRadius: '6px' }}>
          <ul>
            <li><strong>何时使用:</strong> 当函数作为props传递给React.memo包装的子组件时</li>
            <li><strong>依赖项:</strong> 包含函数内部使用的所有变量、props和state</li>
            <li><strong>避免过度优化:</strong> 不是所有函数都需要useCallback</li>
            <li><strong>对象依赖:</strong> 使用useMemo缓存对象，避免每次创建新对象</li>
            <li><strong>空依赖数组:</strong> 当函数不依赖任何外部变量时使用</li>
          </ul>
        </div>
      </div>

      {/* 11. 常见陷阱 */}
      <div style={{ marginBottom: '30px' }}>
        <h3 style={{ color: '#ff6b6b' }}>11. 常见陷阱</h3>
        <div style={{ padding: '15px', backgroundColor: '#ffe6e6', borderRadius: '6px' }}>
          <ul>
            <li><strong>忘记依赖项:</strong> 可能导致闭包陷阱，使用过期的值</li>
            <li><strong>过度使用:</strong> 不是所有函数都需要缓存，过度优化可能适得其反</li>
            <li><strong>对象依赖:</strong> 直接使用对象字面量作为依赖项</li>
            <li><strong>函数依赖:</strong> 忘记将函数本身添加到依赖数组中</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default UseCallbackDetailedDemo; 