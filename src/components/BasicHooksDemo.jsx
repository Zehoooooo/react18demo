import React, {
  useState,
  useEffect,
  useContext,
  useReducer,
  useCallback,
  useMemo,
  useRef,
  useImperativeHandle,
  forwardRef
} from 'react';

// 创建Context
const ThemeContext = React.createContext();

// 创建reducer
const counterReducer = (state, action) => {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    case 'reset':
      return { count: 0 };
    default:
      return state;
  }
};

// 子组件 - 展示useContext
const ThemeComponent = () => {
  const theme = useContext(ThemeContext);
  return (
    <div style={{ 
      padding: '10px', 
      backgroundColor: theme === 'dark' ? '#333' : '#f0f0f0',
      color: theme === 'dark' ? 'white' : 'black',
      borderRadius: '4px',
      margin: '10px 0'
    }}>
      当前主题: {theme}
    </div>
  );
};

// 子组件 - 展示forwardRef和useImperativeHandle
const ChildComponent = forwardRef((props, ref) => {
  const [count, setCount] = useState(0);
  
  useImperativeHandle(ref, () => ({
    increment: () => setCount(c => c + 1),
    getCount: () => count
  }));

  return (
    <div style={{ padding: '10px', border: '1px solid #ddd', borderRadius: '4px' }}>
      <p>子组件计数: {count}</p>
      <button onClick={() => setCount(c => c + 1)}>子组件内部增加</button>
    </div>
  );
});

// 主演示组件
const BasicHooksDemo = () => {
  // useState 演示
  const [count, setCount] = useState(0);
  const [name, setName] = useState('');
  const [theme, setTheme] = useState('light');
  
  // useReducer 演示
  const [state, dispatch] = useReducer(counterReducer, { count: 0 });
  
  // useRef 演示
  const inputRef = useRef(null);
  const childRef = useRef(null);
  
  // useEffect 演示
  useEffect(() => {
    console.log('useEffect: count changed to', count);
    
    return () => {
      console.log('useEffect cleanup');
    };
  }, [count]);
  
  useEffect(() => {
    console.log('useEffect: component mounted');
    return () => {
      console.log('useEffect: component unmounted');
    };
  }, []);
  
  // useCallback 演示
  const handleIncrement = useCallback(() => {
    setCount(c => c + 1);
  }, []);
  
  const handleDecrement = useCallback(() => {
    setCount(c => c - 1);
  }, []);
  
  // useMemo 演示
  const expensiveCalculation = useMemo(() => {
    console.log('执行昂贵计算...');
    return count * 2;
  }, [count]);
  
  const isEven = useMemo(() => {
    return count % 2 === 0;
  }, [count]);
  


  return (
    <ThemeContext.Provider value={theme}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h2 style={{ color: '#333', borderBottom: '2px solid #667eea', paddingBottom: '10px' }}>
          基础Hooks演示
        </h2>
        
        {/* useState 演示 */}
        <div style={{ marginBottom: '30px' }}>
          <h3 style={{ color: '#667eea' }}>1. useState Hook</h3>
          <div style={{ padding: '15px', backgroundColor: '#f8f9fa', borderRadius: '6px', marginBottom: '15px' }}>
            <p><strong>计数:</strong> {count}</p>
            <div style={{ marginBottom: '10px' }}>
              <button onClick={handleIncrement} style={{ marginRight: '10px' }}>增加</button>
              <button onClick={handleDecrement} style={{ marginRight: '10px' }}>减少</button>
              <button onClick={() => setCount(0)}>重置</button>
            </div>
            
            <div style={{ marginTop: '15px' }}>
              <label>
                <strong>姓名:</strong>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="请输入姓名"
                  style={{ marginLeft: '10px', padding: '5px', borderRadius: '4px', border: '1px solid #ddd' }}
                />
              </label>
              {name && <p>你好, {name}!</p>}
            </div>
          </div>
          
        </div>

        {/* useEffect 演示 */}
        <div style={{ marginBottom: '30px' }}>
          <h3 style={{ color: '#667eea' }}>2. useEffect Hook</h3>
          <div style={{ padding: '15px', backgroundColor: '#f8f9fa', borderRadius: '6px', marginBottom: '15px' }}>
            <p>当前计数: {count}</p>
            <p>页面标题会根据计数变化 (请查看浏览器标签页)</p>
            <p>请打开控制台查看useEffect的执行日志</p>
          </div>
          

        </div>

        {/* useReducer 演示 */}
        <div style={{ marginBottom: '30px' }}>
          <h3 style={{ color: '#667eea' }}>3. useReducer Hook</h3>
          <div style={{ padding: '15px', backgroundColor: '#f8f9fa', borderRadius: '6px', marginBottom: '15px' }}>
            <p><strong>Reducer计数:</strong> {state.count}</p>
            <div>
              <button onClick={() => dispatch({ type: 'increment' })} style={{ marginRight: '10px' }}>增加</button>
              <button onClick={() => dispatch({ type: 'decrement' })} style={{ marginRight: '10px' }}>减少</button>
              <button onClick={() => dispatch({ type: 'reset' })}>重置</button>
            </div>
          </div>
          

        </div>

        {/* useContext 演示 */}
        <div style={{ marginBottom: '30px' }}>
          <h3 style={{ color: '#667eea' }}>4. useContext Hook</h3>
          <div style={{ padding: '15px', backgroundColor: '#f8f9fa', borderRadius: '6px', marginBottom: '15px' }}>
            <div style={{ marginBottom: '10px' }}>
              <button 
                onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
                style={{ marginRight: '10px' }}
              >
                切换主题
              </button>
            </div>
            <ThemeComponent />
          </div>
          

        </div>

        {/* useCallback 演示 */}
        <div style={{ marginBottom: '30px' }}>
          <h3 style={{ color: '#667eea' }}>5. useCallback Hook</h3>
          <div style={{ padding: '15px', backgroundColor: '#f8f9fa', borderRadius: '6px', marginBottom: '15px' }}>
            <p>useCallback用于缓存函数，避免不必要的重新渲染</p>
            <p>当前计数: {count}</p>
            <div>
              <button onClick={handleIncrement} style={{ marginRight: '10px' }}>增加 (useCallback)</button>
              <button onClick={handleDecrement} style={{ marginRight: '10px' }}>减少 (useCallback)</button>
            </div>
          </div>
          

        </div>

        {/* useMemo 演示 */}
        <div style={{ marginBottom: '30px' }}>
          <h3 style={{ color: '#667eea' }}>6. useMemo Hook</h3>
          <div style={{ padding: '15px', backgroundColor: '#f8f9fa', borderRadius: '6px', marginBottom: '15px' }}>
            <p><strong>当前计数:</strong> {count}</p>
            <p><strong>计算结果 (count * 2):</strong> {expensiveCalculation}</p>
            <p><strong>是否为偶数:</strong> {isEven ? '是' : '否'}</p>
            <p style={{ fontSize: '12px', color: '#666' }}>
              注意: 打开控制台可以看到useMemo只在依赖项变化时才执行计算
            </p>
          </div>
          

        </div>

        {/* useRef 演示 */}
        <div style={{ marginBottom: '30px' }}>
          <h3 style={{ color: '#667eea' }}>7. useRef Hook</h3>
          <div style={{ padding: '15px', backgroundColor: '#f8f9fa', borderRadius: '6px', marginBottom: '15px' }}>
            <div style={{ marginBottom: '15px' }}>
              <input
                ref={inputRef}
                type="text"
                placeholder="输入框"
                style={{ marginRight: '10px', padding: '5px', borderRadius: '4px', border: '1px solid #ddd' }}
              />
              <button onClick={() => inputRef.current?.focus()}>聚焦输入框</button>
            </div>
            
            <div>
              <h4>forwardRef + useImperativeHandle 演示:</h4>
              <ChildComponent ref={childRef} />
              <div style={{ marginTop: '10px' }}>
                <button 
                  onClick={() => childRef.current?.increment()}
                  style={{ marginRight: '10px' }}
                >
                  从父组件增加子组件计数
                </button>
                <button 
                  onClick={() => alert(`子组件当前计数: ${childRef.current?.getCount()}`)}
                >
                  获取子组件计数
                </button>
              </div>
            </div>
          </div>
          

        </div>

        {/* 综合演示 */}
        <div style={{ marginBottom: '30px' }}>
          <h3 style={{ color: '#667eea' }}>8. 综合演示</h3>
          <div style={{ padding: '15px', backgroundColor: '#f8f9fa', borderRadius: '6px' }}>
            <p>这个演示展示了所有基础hooks的协同工作:</p>
            <ul>
              <li><strong>useState:</strong> 管理组件状态</li>
              <li><strong>useEffect:</strong> 处理副作用</li>
              <li><strong>useReducer:</strong> 复杂状态管理</li>
              <li><strong>useContext:</strong> 跨组件数据传递</li>
              <li><strong>useCallback:</strong> 函数缓存</li>
              <li><strong>useMemo:</strong> 值缓存</li>
              <li><strong>useRef:</strong> DOM引用和可变值</li>
              <li><strong>forwardRef + useImperativeHandle:</strong> 组件间通信</li>
            </ul>
          </div>
        </div>
      </div>
    </ThemeContext.Provider>
  );
};

export default BasicHooksDemo;