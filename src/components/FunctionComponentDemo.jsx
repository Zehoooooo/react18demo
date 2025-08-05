import React, { useState } from 'react';

// 1. 普通函数组件
function Greeting(props) {
  return <h3>你好, {props.name}!</h3>;
}

// 2. 箭头函数组件
const Welcome = (props) => {
  return <h3>欢迎, {props.name}!</h3>;
};

// 3. 带默认props的组件
const UserCard = ({ name = '匿名用户', age = 18, email = '无邮箱' }) => {
  return (
    <div style={{ 
      padding: '15px', 
      border: '1px solid #ddd', 
      borderRadius: '6px', 
      margin: '10px 0',
      backgroundColor: '#f9f9f9'
    }}>
      <h4>用户信息</h4>
      <p><strong>姓名:</strong> {name}</p>
      <p><strong>年龄:</strong> {age}</p>
      <p><strong>邮箱:</strong> {email}</p>
    </div>
  );
};

// 4. 条件渲染组件
const ConditionalComponent = ({ isLoggedIn, username }) => {
  if (isLoggedIn) {
    return (
      <div style={{ color: 'green', padding: '10px', backgroundColor: '#e8f5e8', borderRadius: '4px' }}>
        <h4>欢迎回来, {username}!</h4>
        <p>您已成功登录系统</p>
      </div>
    );
  } else {
    return (
      <div style={{ color: 'orange', padding: '10px', backgroundColor: '#fff3cd', borderRadius: '4px' }}>
        <h4>请先登录</h4>
        <p>您需要登录才能访问此功能</p>
      </div>
    );
  }
};

// 5. 列表渲染组件
const TodoList = ({ todos }) => {
  return (
    <div>
      <h4>待办事项列表</h4>
      {todos.length === 0 ? (
        <p style={{ color: '#666', fontStyle: 'italic' }}>暂无待办事项</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {todos.map((todo, index) => (
            <li 
              key={index}
              style={{ 
                padding: '8px 12px', 
                margin: '5px 0', 
                backgroundColor: todo.completed ? '#d4edda' : '#f8d7da',
                borderRadius: '4px',
                textDecoration: todo.completed ? 'line-through' : 'none'
              }}
            >
              {todo.text}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

// 6. 事件处理组件
const EventHandlingComponent = () => {
  const [count, setCount] = useState(0);
  const [inputValue, setInputValue] = useState('');

  const handleClick = () => {
    setCount(count + 1);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`提交的值: ${inputValue}`);
  };

  return (
    <div style={{ padding: '15px', backgroundColor: '#f8f9fa', borderRadius: '6px' }}>
      <h4>事件处理演示</h4>
      <div style={{ marginBottom: '15px' }}>
        <p>点击次数: {count}</p>
        <button onClick={handleClick}>点击我</button>
      </div>
      
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="输入一些内容"
          style={{ marginRight: '10px', padding: '5px', borderRadius: '4px', border: '1px solid #ddd' }}
        />
        <button type="submit">提交</button>
      </form>
    </div>
  );
};

// 7. 组合组件
const Header = ({ title }) => (
  <header style={{ 
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    padding: '15px',
    borderRadius: '6px',
    marginBottom: '15px'
  }}>
    <h2 style={{ margin: 0 }}>{title}</h2>
  </header>
);

const Footer = ({ text }) => (
  <footer style={{ 
    backgroundColor: '#f8f9fa',
    padding: '10px',
    borderRadius: '6px',
    marginTop: '15px',
    textAlign: 'center',
    color: '#666'
  }}>
    {text}
  </footer>
);

// 8. 高阶组件示例
const withLoading = (WrappedComponent) => {
  return function WithLoadingComponent({ isLoading, ...props }) {
    if (isLoading) {
      return (
        <div style={{ 
          padding: '20px', 
          textAlign: 'center', 
          backgroundColor: '#f8f9fa',
          borderRadius: '6px'
        }}>
          <p>加载中...</p>
        </div>
      );
    }
    return <WrappedComponent {...props} />;
  };
};

const DataComponent = ({ data }) => (
  <div style={{ padding: '15px', backgroundColor: '#e8f5e8', borderRadius: '6px' }}>
    <h4>数据展示</h4>
    <p>{data}</p>
  </div>
);

const DataComponentWithLoading = withLoading(DataComponent);

// 主演示组件
const FunctionComponentDemo = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const sampleTodos = [
    { text: '学习React Hooks', completed: true },
    { text: '完成项目作业', completed: false },
    { text: '阅读技术文档', completed: false }
  ];

  const toggleLogin = () => {
    if (isLoggedIn) {
      setIsLoggedIn(false);
      setUsername('');
    } else {
      setUsername('张三');
      setIsLoggedIn(true);
    }
  };

  const simulateLoading = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 2000);
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <Header title="函数组件基础用法演示" />
      
      {/* 1. 基础函数组件 */}
      <div style={{ marginBottom: '30px' }}>
        <h3 style={{ color: '#667eea' }}>1. 基础函数组件</h3>
        <div style={{ padding: '15px', backgroundColor: '#f8f9fa', borderRadius: '6px' }}>
          <Greeting name="React开发者" />
          <Welcome name="前端工程师" />
        </div>
      </div>

      {/* 2. Props传递 */}
      <div style={{ marginBottom: '30px' }}>
        <h3 style={{ color: '#667eea' }}>2. Props传递</h3>
        <div style={{ padding: '15px', backgroundColor: '#f8f9fa', borderRadius: '6px' }}>
          <UserCard name="李四" age={25} email="lisi@example.com" />
          <UserCard name="王五" age={30} />
          <UserCard />
        </div>
      </div>

      {/* 3. 条件渲染 */}
      <div style={{ marginBottom: '30px' }}>
        <h3 style={{ color: '#667eea' }}>3. 条件渲染</h3>
        <div style={{ padding: '15px', backgroundColor: '#f8f9fa', borderRadius: '6px' }}>
          <button onClick={toggleLogin} style={{ marginBottom: '10px' }}>
            {isLoggedIn ? '退出登录' : '登录'}
          </button>
          <ConditionalComponent isLoggedIn={isLoggedIn} username={username} />
        </div>
      </div>

      {/* 4. 列表渲染 */}
      <div style={{ marginBottom: '30px' }}>
        <h3 style={{ color: '#667eea' }}>4. 列表渲染</h3>
        <div style={{ padding: '15px', backgroundColor: '#f8f9fa', borderRadius: '6px' }}>
          <TodoList todos={sampleTodos} />
        </div>
      </div>

      {/* 5. 事件处理 */}
      <div style={{ marginBottom: '30px' }}>
        <h3 style={{ color: '#667eea' }}>5. 事件处理</h3>
        <EventHandlingComponent />
      </div>

      {/* 6. 高阶组件 */}
      <div style={{ marginBottom: '30px' }}>
        <h3 style={{ color: '#667eea' }}>6. 高阶组件</h3>
        <div style={{ padding: '15px', backgroundColor: '#f8f9fa', borderRadius: '6px' }}>
          <button onClick={simulateLoading} style={{ marginBottom: '10px' }}>
            模拟加载
          </button>
          <DataComponentWithLoading 
            isLoading={isLoading} 
            data="这是从服务器获取的数据" 
          />
        </div>
      </div>

      {/* 7. 组件组合 */}
      <div style={{ marginBottom: '30px' }}>
        <h3 style={{ color: '#667eea' }}>7. 组件组合</h3>
        <div style={{ padding: '15px', backgroundColor: '#f8f9fa', borderRadius: '6px' }}>
          <p>这个练习展示了如何将多个小组件组合成一个完整的界面</p>
          <div style={{ border: '1px solid #ddd', borderRadius: '6px', overflow: 'hidden' }}>
            <Header title="组合组件示例" />
            <div style={{ padding: '15px' }}>
              <p>这是主要内容区域</p>
              <p>可以包含任何其他组件</p>
            </div>
            <Footer text="© 2025 React函数组件练习" />
          </div>
        </div>
      </div>

      {/* 8. 最佳实践总结 */}
      <div style={{ marginBottom: '30px' }}>
        <h3 style={{ color: '#667eea' }}>8. 函数组件最佳实践</h3>
        <div style={{ padding: '15px', backgroundColor: '#f8f9fa', borderRadius: '6px' }}>
          <ul>
            <li><strong>组件命名:</strong> 使用PascalCase命名组件</li>
            <li><strong>Props解构:</strong> 使用解构赋值简化props访问</li>
            <li><strong>默认值:</strong> 为props提供合理的默认值</li>
            <li><strong>条件渲染:</strong> 使用三元运算符或逻辑与运算符</li>
            <li><strong>列表渲染:</strong> 始终为列表项提供唯一的key</li>
            <li><strong>事件处理:</strong> 使用箭头函数或bind方法绑定this</li>
            <li><strong>组件组合:</strong> 将复杂组件拆分为小组件</li>
            <li><strong>高阶组件:</strong> 用于代码复用和逻辑抽象</li>
          </ul>
        </div>
      </div>

      <Footer text="函数组件演示完成 - 感谢学习React!" />
    </div>
  );
};

export default FunctionComponentDemo; 