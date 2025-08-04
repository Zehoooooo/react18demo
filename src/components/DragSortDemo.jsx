import React, { useState } from 'react';

const DragSortDemo = () => {
  const [items, setItems] = useState([
    { id: 1, text: '第一个项目', color: '#ff6b6b' },
    { id: 2, text: '第二个项目', color: '#4ecdc4' },
    { id: 3, text: '第三个项目', color: '#45b7d1' },
    { id: 4, text: '第四个项目', color: '#96ceb4' },
    { id: 5, text: '第五个项目', color: '#feca57' },
    { id: 6, text: '第六个项目', color: '#ff9ff3' },
  ]);

  const [draggedItem, setDraggedItem] = useState(null);
  const [dragOverItem, setDragOverItem] = useState(null);

  const handleDragStart = (e, item) => {
    setDraggedItem(item);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e, item) => {
    e.preventDefault();
    if (draggedItem && draggedItem.id !== item.id) {
      setDragOverItem(item);
    }
  };

  const handleDrop = (e, dropItem) => {
    e.preventDefault();
    if (draggedItem && draggedItem.id !== dropItem.id) {
      const newItems = [...items];
      const draggedIndex = newItems.findIndex(item => item.id === draggedItem.id);
      const dropIndex = newItems.findIndex(item => item.id === dropItem.id);
      
      // 移除拖拽的项目
      const [removed] = newItems.splice(draggedIndex, 1);
      // 在目标位置插入
      newItems.splice(dropIndex, 0, removed);
      
      setItems(newItems);
    }
    setDraggedItem(null);
    setDragOverItem(null);
  };

  const handleDragEnd = () => {
    setDraggedItem(null);
    setDragOverItem(null);
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px' }}>
      <h2>拖拽排序 Demo</h2>
      <p>拖拽项目来重新排序列表</p>
      
      <div style={{ marginBottom: '20px' }}>
        <div style={{ 
          padding: '10px', 
          background: '#f8f9fa', 
          borderRadius: '8px',
          fontSize: '14px'
        }}>
          <strong>操作说明：</strong>
          <ul style={{ margin: '5px 0 0 20px' }}>
            <li>点击并拖拽任意项目</li>
            <li>将项目拖到目标位置</li>
            <li>释放鼠标完成排序</li>
          </ul>
        </div>
      </div>

      <div style={{ marginBottom: '20px' }}>
        {items.map((item, index) => (
          <div
            key={item.id}
            draggable
            onDragStart={(e) => handleDragStart(e, item)}
            onDragOver={(e) => handleDragOver(e, item)}
            onDrop={(e) => handleDrop(e, item)}
            onDragEnd={handleDragEnd}
            style={{
              padding: '15px',
              margin: '8px 0',
              background: item.color,
              color: 'white',
              borderRadius: '8px',
              cursor: 'grab',
              userSelect: 'none',
              transform: draggedItem?.id === item.id ? 'rotate(5deg) scale(1.02)' : 'none',
              opacity: draggedItem?.id === item.id ? 0.8 : 1,
              border: dragOverItem?.id === item.id ? '2px dashed white' : 'none',
              transition: 'all 0.2s ease',
              boxShadow: draggedItem?.id === item.id ? '0 4px 8px rgba(0,0,0,0.2)' : '0 2px 4px rgba(0,0,0,0.1)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontWeight: 'bold' }}>{item.text}</span>
              <span style={{ fontSize: '12px', opacity: 0.8 }}>
                位置: {index + 1}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div style={{ background: '#f8f9fa', padding: '15px', borderRadius: '8px' }}>
        <h4>拖拽排序的应用场景：</h4>
        <ul>
          <li>任务管理应用中的任务排序</li>
          <li>图片画廊的排序</li>
          <li>菜单项的自定义排序</li>
          <li>购物车商品排序</li>
          <li>文件管理器的文件排序</li>
        </ul>
      </div>
    </div>
  );
};

export default DragSortDemo; 