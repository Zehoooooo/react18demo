import React, { useState, useEffect } from 'react';

const ThemeToggleDemo = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // 主题配置
  const themes = {
    light: {
      background: '#ffffff',
      text: '#333333',
      primary: '#2ed573',
      secondary: '#3742fa',
      accent: '#ffa502',
      surface: '#f8f9fa',
      border: '#ddd',
      shadow: '0 2px 8px rgba(0,0,0,0.1)',
    },
    dark: {
      background: '#1a1a1a',
      text: '#ffffff',
      primary: '#2ed573',
      secondary: '#3742fa',
      accent: '#ffa502',
      surface: '#2d2d2d',
      border: '#444',
      shadow: '0 2px 8px rgba(0,0,0,0.3)',
    },
  };

  const currentTheme = themes[isDarkMode ? 'dark' : 'light'];

  // 切换主题
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  // 应用主题到body
  useEffect(() => {
    document.body.style.backgroundColor = currentTheme.background;
    document.body.style.color = currentTheme.text;
  }, [currentTheme]);

  const containerStyle = {
    padding: '20px',
    maxWidth: '800px',
    background: currentTheme.background,
    color: currentTheme.text,
    transition: 'all 0.3s ease',
  };

  const cardStyle = {
    background: currentTheme.surface,
    border: `1px solid ${currentTheme.border}`,
    borderRadius: '8px',
    padding: '20px',
    marginBottom: '20px',
    boxShadow: currentTheme.shadow,
    transition: 'all 0.3s ease',
  };

  const buttonStyle = {
    padding: '10px 20px',
    background: currentTheme.primary,
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '14px',
    transition: 'all 0.3s ease',
  };

  const toggleButtonStyle = {
    ...buttonStyle,
    background: currentTheme.secondary,
    marginBottom: '20px',
  };

  return (
    <div style={containerStyle}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2>主题切换 Demo</h2>
        <button onClick={toggleTheme} style={toggleButtonStyle}>
          {isDarkMode ? '🌞 切换到浅色模式' : '🌙 切换到深色模式'}
        </button>
      </div>

      <div style={cardStyle}>
        <h3>当前主题：{isDarkMode ? '深色模式' : '浅色模式'}</h3>
        <p>点击右上角按钮切换主题，体验不同的视觉效果。</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginBottom: '20px' }}>
        <div style={cardStyle}>
          <h4>主要功能</h4>
          <ul>
            <li>一键切换深色/浅色主题</li>
            <li>平滑的过渡动画</li>
            <li>自动应用到整个页面</li>
            <li>响应式设计</li>
          </ul>
        </div>

        <div style={cardStyle}>
          <h4>主题特性</h4>
          <ul>
            <li>背景色自适应</li>
            <li>文字颜色对比</li>
            <li>阴影效果调整</li>
            <li>边框颜色变化</li>
          </ul>
        </div>
      </div>

      <div style={cardStyle}>
        <h3>示例内容</h3>
        <p>这是一个示例段落，展示了在深色和浅色主题下的文字显示效果。主题切换功能在现代Web应用中非常常见，可以提供更好的用户体验。</p>
        
        <div style={{ marginTop: '15px' }}>
          <button style={buttonStyle}>主要按钮</button>
          <button style={{ ...buttonStyle, background: currentTheme.secondary, marginLeft: '10px' }}>
            次要按钮
          </button>
          <button style={{ ...buttonStyle, background: currentTheme.accent, marginLeft: '10px' }}>
            强调按钮
          </button>
        </div>
      </div>

      <div style={cardStyle}>
        <h3>代码示例</h3>
        <div style={{
          background: currentTheme.surface,
          border: `1px solid ${currentTheme.border}`,
          borderRadius: '4px',
          padding: '15px',
          fontFamily: 'monospace',
          fontSize: '14px',
          overflow: 'auto',
        }}>
          {`// 主题配置
const themes = {
  light: {
    background: '#ffffff',
    text: '#333333',
    // ... 更多颜色
  },
  dark: {
    background: '#1a1a1a', 
    text: '#ffffff',
    // ... 更多颜色
  }
};

// 切换主题
const toggleTheme = () => {
  setIsDarkMode(!isDarkMode);
};`}
        </div>
      </div>

      <div style={{ background: currentTheme.surface, padding: '15px', borderRadius: '8px', border: `1px solid ${currentTheme.border}` }}>
        <h4>主题切换的应用场景：</h4>
        <ul>
          <li>用户偏好设置</li>
          <li>系统主题跟随</li>
          <li>可访问性支持</li>
          <li>夜间模式</li>
          <li>品牌主题定制</li>
        </ul>
      </div>
    </div>
  );
};

export default ThemeToggleDemo; 