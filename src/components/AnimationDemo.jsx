import React, { useState, useEffect } from 'react';

const AnimationDemo = () => {
  const [activeAnimations, setActiveAnimations] = useState(new Set());
  const [slideDirection, setSlideDirection] = useState('right');
  const [bounceCount, setBounceCount] = useState(0);
  const [rotation, setRotation] = useState(0);

  // 自动旋转动画
  useEffect(() => {
    const interval = setInterval(() => {
      setRotation(prev => prev + 1);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  const toggleAnimation = (animationName) => {
    setActiveAnimations(prev => {
      const newSet = new Set(prev);
      if (newSet.has(animationName)) {
        newSet.delete(animationName);
      } else {
        newSet.add(animationName);
      }
      return newSet;
    });
  };

  const triggerBounce = () => {
    setBounceCount(prev => prev + 1);
  };

  const triggerSlide = (direction) => {
    setSlideDirection(direction);
    setActiveAnimations(prev => new Set([...prev, 'slide']));
    setTimeout(() => {
      setActiveAnimations(prev => {
        const newSet = new Set(prev);
        newSet.delete('slide');
        return newSet;
      });
    }, 1000);
  };

  const animationStyles = {
    fade: {
      animation: activeAnimations.has('fade') ? 'fadeInOut 2s ease-in-out' : 'none',
    },
    slide: {
      animation: activeAnimations.has('slide') ? `slide${slideDirection.charAt(0).toUpperCase() + slideDirection.slice(1)} 1s ease-in-out` : 'none',
    },
    scale: {
      animation: activeAnimations.has('scale') ? 'scaleInOut 1.5s ease-in-out' : 'none',
    },
    bounce: {
      animation: `bounce 0.6s ease-in-out ${bounceCount}`,
    },
    rotate: {
      transform: `rotate(${rotation}deg)`,
      transition: 'transform 0.05s linear',
    },
    pulse: {
      animation: activeAnimations.has('pulse') ? 'pulse 1s ease-in-out infinite' : 'none',
    },
    shake: {
      animation: activeAnimations.has('shake') ? 'shake 0.5s ease-in-out' : 'none',
    },
  };

  const boxStyle = {
    width: '100px',
    height: '100px',
    background: '#2ed573',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    fontWeight: 'bold',
    margin: '10px',
    cursor: 'pointer',
    userSelect: 'none',
  };

  return (
    <div style={{ padding: '20px', maxWidth: '900px' }}>
      <h2>动画效果 Demo</h2>
      <p>点击动画名称来触发对应的动画效果</p>

      <style>
        {`
          @keyframes fadeInOut {
            0% { opacity: 0; }
            50% { opacity: 1; }
            100% { opacity: 0; }
          }
          
          @keyframes slideRight {
            0% { transform: translateX(-100px); opacity: 0; }
            100% { transform: translateX(0); opacity: 1; }
          }
          
          @keyframes slideLeft {
            0% { transform: translateX(100px); opacity: 0; }
            100% { transform: translateX(0); opacity: 1; }
          }
          
          @keyframes slideUp {
            0% { transform: translateY(100px); opacity: 0; }
            100% { transform: translateY(0); opacity: 1; }
          }
          
          @keyframes slideDown {
            0% { transform: translateY(-100px); opacity: 0; }
            100% { transform: translateY(0); opacity: 1; }
          }
          
          @keyframes scaleInOut {
            0% { transform: scale(0); }
            50% { transform: scale(1.2); }
            100% { transform: scale(1); }
          }
          
          @keyframes bounce {
            0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
            40% { transform: translateY(-30px); }
            60% { transform: translateY(-15px); }
          }
          
          @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.1); }
            100% { transform: scale(1); }
          }
          
          @keyframes shake {
            0%, 100% { transform: translateX(0); }
            10%, 30%, 50%, 70%, 90% { transform: translateX(-10px); }
            20%, 40%, 60%, 80% { transform: translateX(10px); }
          }
        `}
      </style>

      <div style={{ marginBottom: '30px' }}>
        <h3>动画控制面板</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '20px' }}>
          {[
            { name: 'fade', label: '淡入淡出' },
            { name: 'scale', label: '缩放' },
            { name: 'pulse', label: '脉冲' },
            { name: 'shake', label: '抖动' },
          ].map(anim => (
            <button
              key={anim.name}
              onClick={() => toggleAnimation(anim.name)}
              style={{
                padding: '8px 16px',
                background: activeAnimations.has(anim.name) ? '#2ed573' : '#3742fa',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '14px',
              }}
            >
              {anim.label}
            </button>
          ))}
        </div>

        <div style={{ marginBottom: '20px' }}>
          <h4>滑动方向控制：</h4>
          <div style={{ display: 'flex', gap: '10px' }}>
            {['left', 'right', 'up', 'down'].map(direction => (
              <button
                key={direction}
                onClick={() => triggerSlide(direction)}
                style={{
                  padding: '8px 16px',
                  background: '#ffa502',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '14px',
                }}
              >
                滑动{direction === 'left' ? '左' : direction === 'right' ? '右' : direction === 'up' ? '上' : '下'}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h4>弹跳动画：</h4>
          <button
            onClick={triggerBounce}
            style={{
              padding: '8px 16px',
              background: '#ff6b6b',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '14px',
            }}
          >
            触发弹跳 (已触发 {bounceCount} 次)
          </button>
        </div>
      </div>

      <div style={{ marginBottom: '30px' }}>
        <h3>动画效果展示</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
          <div style={{ ...boxStyle, ...animationStyles.fade }}>
            淡入淡出
          </div>
          
          <div style={{ ...boxStyle, ...animationStyles.slide }}>
            滑动
          </div>
          
          <div style={{ ...boxStyle, ...animationStyles.scale }}>
            缩放
          </div>
          
          <div style={{ ...boxStyle, ...animationStyles.bounce }}>
            弹跳
          </div>
          
          <div style={{ ...boxStyle, ...animationStyles.pulse }}>
            脉冲
          </div>
          
          <div style={{ ...boxStyle, ...animationStyles.shake }}>
            抖动
          </div>
          
          <div style={{ ...boxStyle, ...animationStyles.rotate }}>
            旋转
          </div>
        </div>
      </div>

      <div style={{ marginBottom: '30px' }}>
        <h3>动画组合效果</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
          <div style={{ 
            ...boxStyle, 
            background: '#ff6b6b',
            ...animationStyles.fade,
            ...animationStyles.scale,
          }}>
            淡入+缩放
          </div>
          
          <div style={{ 
            ...boxStyle, 
            background: '#4ecdc4',
            ...animationStyles.pulse,
            ...animationStyles.rotate,
          }}>
            脉冲+旋转
          </div>
          
          <div style={{ 
            ...boxStyle, 
            background: '#45b7d1',
            ...animationStyles.shake,
            ...animationStyles.bounce,
          }}>
            抖动+弹跳
          </div>
        </div>
      </div>

      <div style={{ background: '#f8f9fa', padding: '15px', borderRadius: '8px' }}>
        <h4>React动画实现要点：</h4>
        <ul>
          <li>使用CSS动画提升性能</li>
          <li>通过React状态控制动画触发</li>
          <li>组合多个动画效果</li>
          <li>使用useEffect管理动画生命周期</li>
          <li>响应式动画设计</li>
          <li>动画状态管理</li>
        </ul>
      </div>
    </div>
  );
};

export default AnimationDemo; 