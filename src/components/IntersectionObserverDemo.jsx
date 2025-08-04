import React, { useState } from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

const IntersectionObserverDemo = () => {
  const [visibleItems, setVisibleItems] = useState(new Set());
  const [lazyLoadedItems, setLazyLoadedItems] = useState([]);

  // 基础可见性检测
  const {
    ref: basicRef,
    isIntersecting: isBasicVisible,
    entry: basicEntry,
  } = useIntersectionObserver({
    threshold: 0.5,
  });

  // 懒加载检测
  const {
    ref: lazyRef,
    isIntersecting: isLazyVisible,
  } = useIntersectionObserver({
    threshold: 0.1,
    triggerOnce: true,
  });

  // 无限滚动检测
  const {
    ref: infiniteRef,
    isIntersecting: isInfiniteVisible,
  } = useIntersectionObserver({
    threshold: 0,
    triggerOnce: false,
  });

  // 处理懒加载
  React.useEffect(() => {
    if (isLazyVisible && lazyLoadedItems.length < 20) {
      const newItems = Array.from({ length: 5 }, (_, i) => ({
        id: lazyLoadedItems.length + i + 1,
        title: `Lazy Item ${lazyLoadedItems.length + i + 1}`,
        content: `This item was loaded when it became visible.`,
      }));
      setLazyLoadedItems(prev => [...prev, ...newItems]);
    }
  }, [isLazyVisible, lazyLoadedItems.length]);

  // 处理无限滚动
  React.useEffect(() => {
    if (isInfiniteVisible) {
      // 模拟加载更多数据
      console.log('Loading more items...');
    }
  }, [isInfiniteVisible]);

  // 生成测试项目
  const generateItems = (count) => {
    return Array.from({ length: count }, (_, i) => ({
      id: i + 1,
      title: `Item ${i + 1}`,
      content: `This is the content for item ${i + 1}. It contains some text to make it more realistic.`,
    }));
  };

  const testItems = generateItems(10);

  return (
    <div style={{ padding: '20px', maxWidth: '800px' }}>
      <h2>useIntersectionObserver Hook Demo</h2>

      <div style={{ marginBottom: '40px' }}>
        <h3>基础可见性检测</h3>
        <div
          ref={basicRef}
          style={{
            height: '200px',
            background: isBasicVisible ? '#2ed573' : '#ff4757',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '18px',
            borderRadius: '8px',
            transition: 'background-color 0.3s ease',
          }}
        >
          {isBasicVisible ? '元素可见！' : '元素不可见'}
        </div>
        {basicEntry && (
          <div style={{ marginTop: '10px', fontSize: '14px', color: '#666' }}>
            交叉比例: {basicEntry.intersectionRatio.toFixed(2)}
          </div>
        )}
      </div>

      <div style={{ marginBottom: '40px' }}>
        <h3>懒加载列表</h3>
        <div style={{ maxHeight: '400px', overflowY: 'auto', border: '1px solid #ddd', borderRadius: '8px' }}>
          {lazyLoadedItems.map((item) => (
            <div
              key={item.id}
              style={{
                padding: '15px',
                borderBottom: '1px solid #eee',
                background: '#f8f9fa',
              }}
            >
              <h4>{item.title}</h4>
              <p>{item.content}</p>
            </div>
          ))}
          
          {/* 懒加载触发器 */}
          <div
            ref={lazyRef}
            style={{
              height: '20px',
              background: '#ffa502',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '12px',
            }}
          >
            {isLazyVisible ? '正在加载...' : '滚动到这里加载更多'}
          </div>
        </div>
        <p>已加载项目数: {lazyLoadedItems.length}</p>
      </div>

      <div style={{ marginBottom: '40px' }}>
        <h3>无限滚动模拟</h3>
        <div style={{ maxHeight: '300px', overflowY: 'auto', border: '1px solid #ddd', borderRadius: '8px' }}>
          {testItems.map((item) => (
            <div
              key={item.id}
              style={{
                padding: '15px',
                borderBottom: '1px solid #eee',
                background: '#f8f9fa',
              }}
            >
              <h4>{item.title}</h4>
              <p>{item.content}</p>
            </div>
          ))}
          
          {/* 无限滚动触发器 */}
          <div
            ref={infiniteRef}
            style={{
              height: '50px',
              background: isInfiniteVisible ? '#2ed573' : '#3742fa',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '14px',
            }}
          >
            {isInfiniteVisible ? '触发加载更多！' : '滚动到底部加载更多'}
          </div>
        </div>
      </div>

      <div style={{ marginBottom: '40px' }}>
        <h3>图片懒加载模拟</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '15px' }}>
          {Array.from({ length: 6 }, (_, i) => {
            const [isVisible, setIsVisible] = useState(false);
            const { ref: imageRef, isIntersecting: isImageVisible } = useIntersectionObserver({
              threshold: 0.1,
              triggerOnce: true,
            });

            React.useEffect(() => {
              if (isImageVisible) {
                setIsVisible(true);
              }
            }, [isImageVisible]);

            return (
              <div
                key={i}
                ref={imageRef}
                style={{
                  height: '150px',
                  background: isVisible ? '#2ed573' : '#ddd',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '8px',
                  color: isVisible ? 'white' : '#666',
                  fontSize: '14px',
                }}
              >
                {isVisible ? '图片已加载' : '图片未加载'}
              </div>
            );
          })}
        </div>
      </div>

      <div style={{ background: '#f8f9fa', padding: '15px', borderRadius: '8px' }}>
        <h4>useIntersectionObserver 应用场景：</h4>
        <ul>
          <li>图片懒加载</li>
          <li>无限滚动</li>
          <li>广告曝光统计</li>
          <li>动画触发</li>
          <li>性能优化</li>
          <li>用户体验提升</li>
        </ul>
      </div>
    </div>
  );
};

export default IntersectionObserverDemo;