import React, { useState, useEffect, useRef } from 'react';

const WebSocketDemo = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState('未连接');
  const wsRef = useRef(null);

  // 模拟WebSocket服务器
  const mockWebSocket = {
    send: (message) => {
      // 模拟服务器响应
      setTimeout(() => {
        const response = {
          type: 'server',
          content: `服务器收到: ${message}`,
          timestamp: new Date().toLocaleTimeString(),
        };
        setMessages(prev => [...prev, response]);
      }, 500);
    },
    close: () => {
      setIsConnected(false);
      setConnectionStatus('已断开');
    }
  };

  const connect = () => {
    setIsConnected(true);
    setConnectionStatus('已连接');
    wsRef.current = mockWebSocket; // 初始化WebSocket引用
    setMessages(prev => [...prev, {
      type: 'system',
      content: '已连接到模拟WebSocket服务器',
      timestamp: new Date().toLocaleTimeString(),
    }]);
  };

  const disconnect = () => {
    if (wsRef.current) {
      wsRef.current.close();
      wsRef.current = null; // 清空引用
    }
    setIsConnected(false);
    setConnectionStatus('已断开');
    setMessages(prev => [...prev, {
      type: 'system',
      content: '已断开连接',
      timestamp: new Date().toLocaleTimeString(),
    }]);
  };

  const sendMessage = () => {
    if (!inputMessage.trim() || !isConnected || !wsRef.current) return;

    const message = {
      type: 'user',
      content: inputMessage,
      timestamp: new Date().toLocaleTimeString(),
    };

    setMessages(prev => [...prev, message]);
    wsRef.current.send(inputMessage);
    setInputMessage('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px' }}>
      <h2>WebSocket 实时通信 Demo</h2>
      <p>模拟WebSocket实时通信功能，支持消息发送和接收</p>

      <div style={{ marginBottom: '20px' }}>
        <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
          <button
            onClick={connect}
            disabled={isConnected}
            style={{
              padding: '10px 20px',
              backgroundColor: isConnected ? '#ccc' : '#2ed573',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: isConnected ? 'not-allowed' : 'pointer',
            }}
          >
            连接
          </button>
          <button
            onClick={disconnect}
            disabled={!isConnected}
            style={{
              padding: '10px 20px',
              backgroundColor: !isConnected ? '#ccc' : '#ff4757',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: !isConnected ? 'not-allowed' : 'pointer',
            }}
          >
            断开
          </button>
          <span style={{ 
            padding: '10px 15px', 
            backgroundColor: isConnected ? '#2ed573' : '#ff4757',
            color: 'white',
            borderRadius: '4px',
            fontSize: '14px'
          }}>
            状态: {connectionStatus}
          </span>
        </div>
      </div>

      <div style={{ 
        height: '400px', 
        border: '1px solid #ddd', 
        borderRadius: '8px',
        display: 'flex',
        flexDirection: 'column'
      }}>
        <div style={{ 
          flex: 1, 
          overflowY: 'auto', 
          padding: '15px',
          background: '#f8f9fa'
        }}>
          {messages.length === 0 ? (
            <div style={{ textAlign: 'center', color: '#666', marginTop: '50px' }}>
              还没有消息，请先连接服务器
            </div>
          ) : (
            messages.map((message, index) => (
              <div
                key={index}
                style={{
                  marginBottom: '10px',
                  padding: '10px',
                  borderRadius: '8px',
                  background: message.type === 'user' ? '#2ed573' : 
                           message.type === 'server' ? '#3742fa' : '#ffa502',
                  color: 'white',
                  maxWidth: '70%',
                  marginLeft: message.type === 'user' ? 'auto' : '0',
                }}
              >
                <div style={{ fontSize: '12px', opacity: 0.8, marginBottom: '5px' }}>
                  {message.type === 'user' ? '你' : 
                   message.type === 'server' ? '服务器' : '系统'}
                </div>
                <div>{message.content}</div>
                <div style={{ fontSize: '10px', opacity: 0.7, marginTop: '5px' }}>
                  {message.timestamp}
                </div>
              </div>
            ))
          )}
        </div>
        
        <div style={{ 
          padding: '15px', 
          borderTop: '1px solid #ddd',
          display: 'flex',
          gap: '10px'
        }}>
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="输入消息..."
            disabled={!isConnected}
            style={{
              flex: 1,
              padding: '10px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '14px'
            }}
          />
          <button
            onClick={sendMessage}
            disabled={!isConnected || !inputMessage.trim()}
            style={{
              padding: '10px 20px',
              backgroundColor: (!isConnected || !inputMessage.trim()) ? '#ccc' : '#2ed573',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: (!isConnected || !inputMessage.trim()) ? 'not-allowed' : 'pointer',
            }}
          >
            发送
          </button>
        </div>
      </div>

      <div style={{ marginTop: '20px', background: '#f8f9fa', padding: '15px', borderRadius: '8px' }}>
        <h4>WebSocket 应用场景：</h4>
        <ul>
          <li>实时聊天应用</li>
          <li>在线游戏</li>
          <li>股票价格实时更新</li>
          <li>协作编辑工具</li>
          <li>实时通知系统</li>
          <li>在线客服</li>
        </ul>
      </div>
    </div>
  );
};

export default WebSocketDemo; 