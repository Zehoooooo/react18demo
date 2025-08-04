import React, { useState, useMemo } from 'react';

const VirtualScrollDemo = () => {
  const [scrollTop, setScrollTop] = useState(0);
  const [containerHeight] = useState(400);
  const [itemHeight] = useState(50);
  const [totalItems] = useState(10000);

  // 计算可见区域的项目
  const visibleItems = useMemo(() => {
    const startIndex = Math.floor(scrollTop / itemHeight);
    const endIndex = Math.min(
      startIndex + Math.ceil(containerHeight / itemHeight) + 1,
      totalItems
    );
    
    return Array.from({ length: endIndex - startIndex }, (_, index) => ({
      id: startIndex + index,
      index: startIndex + index,
    }));
  }, [scrollTop, containerHeight, itemHeight, totalItems]);

  const totalHeight = totalItems * itemHeight;
  const offsetY = Math.floor(scrollTop / itemHeight) * itemHeight;

  const handleScroll = (e) => {
    setScrollTop(e.target.scrollTop);
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px' }}>
      <h2>虚拟滚动列表 Demo</h2>
      <p>渲染 {totalItems.toLocaleString()} 个项目，但只渲染可见区域的项目</p>
      
      <div style={{ marginBottom: '20px' }}>
        <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
          <span>总项目数: {totalItems.toLocaleString()}</span>
          <span>可见项目数: {visibleItems.length}</span>
          <span>滚动位置: {Math.round(scrollTop)}px</span>
        </div>
      </div>

      <div
        style={{
          height: containerHeight,
          overflow: 'auto',
          border: '1px solid #ddd',
          borderRadius: '8px',
          position: 'relative',
        }}
        onScroll={handleScroll}
      >
        <div style={{ height: totalHeight, position: 'relative' }}>
          <div
            style={{
              position: 'absolute',
              top: offsetY,
              left: 0,
              right: 0,
            }}
          >
            {visibleItems.map((item) => (
              <div
                key={item.id}
                style={{
                  height: itemHeight,
                  padding: '0 15px',
                  display: 'flex',
                  alignItems: 'center',
                  borderBottom: '1px solid #eee',
                  background: item.index % 2 === 0 ? '#f8f9fa' : '#ffffff',
                  fontSize: '14px',
                }}
              >
                <span style={{ fontWeight: 'bold', marginRight: '10px' }}>
                  #{item.index + 1}
                </span>
                <span>项目 {item.index + 1}</span>
                <span style={{ marginLeft: 'auto', color: '#666' }}>
                  虚拟渲染
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ marginTop: '20px', background: '#f8f9fa', padding: '15px', borderRadius: '8px' }}>
        <h4>虚拟滚动的优势：</h4>
        <ul>
          <li>只渲染可见区域的项目，大幅提升性能</li>
          <li>可以处理数万甚至数十万条数据</li>
          <li>内存占用低，滚动流畅</li>
          <li>适用于大数据列表、聊天记录等场景</li>
        </ul>
      </div>
    </div>
  );
};

export default VirtualScrollDemo; 