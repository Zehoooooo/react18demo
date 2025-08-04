import React, { useState } from 'react';
import { useAsync } from '../hooks/useAsync';

const AsyncDemo = () => {
  const [userId, setUserId] = useState(1);

  // 模拟API调用
  const fetchUser = async (params, signal) => {
    // 模拟网络延迟
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));
    
    // 检查是否被取消
    if (signal?.aborted) {
      throw new Error('Request cancelled');
    }

    // 模拟随机错误
    if (Math.random() < 0.3) {
      throw new Error('Random error occurred');
    }

    const response = await fetch(`https://jsonplaceholder.typicode.com/users/${params.userId || userId}`, {
      signal,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  };

  // 基础用法
  const {
    data: userData,
    loading: userLoading,
    error: userError,
    execute: fetchUserData,
    cancel: cancelUserFetch,
    retry: retryUserFetch,
  } = useAsync(fetchUser, [userId], {
    immediate: false,
    retryCount: 2,
    retryDelay: 1000,
    onSuccess: (data) => console.log('User fetched successfully:', data),
    onError: (error) => console.error('User fetch failed:', error),
  });

  // 带缓存的用法
  const {
    data: cachedUserData,
    loading: cachedUserLoading,
    error: cachedUserError,
    execute: fetchCachedUser,
    clearCache: clearUserCache,
  } = useAsync(fetchUser, [userId], {
    immediate: false,
    cacheTime: 30000, // 30秒缓存
  });

  // 模拟批量操作
  const batchOperation = async (params, signal) => {
    const results = [];
    for (let i = 1; i <= 3; i++) {
      if (signal?.aborted) break;
      
      await new Promise(resolve => setTimeout(resolve, 500));
      results.push({ id: i, name: `Item ${i}`, completed: true });
    }
    return results;
  };

  const {
    data: batchData,
    loading: batchLoading,
    error: batchError,
    execute: executeBatch,
    cancel: cancelBatch,
  } = useAsync(batchOperation, [], {
    immediate: false,
  });

  return (
    <div style={{ padding: '20px', maxWidth: '800px' }}>
      <h2>useAsync Hook Demo</h2>

      <div style={{ marginBottom: '30px' }}>
        <h3>基础异步操作</h3>
        <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
          <input
            type="number"
            value={userId}
            onChange={(e) => setUserId(parseInt(e.target.value) || 1)}
            min="1"
            max="10"
            style={{ padding: '8px', width: '80px' }}
          />
          <button
            onClick={() => fetchUserData({ userId })}
            disabled={userLoading}
            style={{
              padding: '8px 16px',
              backgroundColor: '#2ed573',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: userLoading ? 'not-allowed' : 'pointer',
              opacity: userLoading ? 0.6 : 1,
            }}
          >
            {userLoading ? '加载中...' : '获取用户'}
          </button>
          <button
            onClick={cancelUserFetch}
            disabled={!userLoading}
            style={{
              padding: '8px 16px',
              backgroundColor: '#ff4757',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: !userLoading ? 'not-allowed' : 'pointer',
              opacity: !userLoading ? 0.6 : 1,
            }}
          >
            取消
          </button>
          <button
            onClick={retryUserFetch}
            disabled={!userError}
            style={{
              padding: '8px 16px',
              backgroundColor: '#ffa502',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: !userError ? 'not-allowed' : 'pointer',
              opacity: !userError ? 0.6 : 1,
            }}
          >
            重试
          </button>
        </div>

        {userLoading && <p>加载中...</p>}
        {userError && (
          <div style={{ color: '#ff4757', marginBottom: '10px' }}>
            错误: {userError.message}
          </div>
        )}
        {userData && (
          <div style={{ background: '#f8f9fa', padding: '15px', borderRadius: '8px' }}>
            <h4>用户信息:</h4>
            <pre>{JSON.stringify(userData, null, 2)}</pre>
          </div>
        )}
      </div>

      <div style={{ marginBottom: '30px' }}>
        <h3>带缓存的异步操作</h3>
        <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
          <button
            onClick={() => fetchCachedUser({ userId })}
            disabled={cachedUserLoading}
            style={{
              padding: '8px 16px',
              backgroundColor: '#3742fa',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: cachedUserLoading ? 'not-allowed' : 'pointer',
              opacity: cachedUserLoading ? 0.6 : 1,
            }}
          >
            {cachedUserLoading ? '加载中...' : '获取用户（带缓存）'}
          </button>
          <button
            onClick={clearUserCache}
            style={{
              padding: '8px 16px',
              backgroundColor: '#ff6348',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            清除缓存
          </button>
        </div>

        {cachedUserLoading && <p>加载中...</p>}
        {cachedUserError && (
          <div style={{ color: '#ff4757', marginBottom: '10px' }}>
            错误: {cachedUserError.message}
          </div>
        )}
        {cachedUserData && (
          <div style={{ background: '#f8f9fa', padding: '15px', borderRadius: '8px' }}>
            <h4>缓存用户信息:</h4>
            <pre>{JSON.stringify(cachedUserData, null, 2)}</pre>
          </div>
        )}
      </div>

      <div style={{ marginBottom: '30px' }}>
        <h3>批量操作</h3>
        <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
          <button
            onClick={() => executeBatch()}
            disabled={batchLoading}
            style={{
              padding: '8px 16px',
              backgroundColor: '#2ed573',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: batchLoading ? 'not-allowed' : 'pointer',
              opacity: batchLoading ? 0.6 : 1,
            }}
          >
            {batchLoading ? '执行中...' : '执行批量操作'}
          </button>
          <button
            onClick={cancelBatch}
            disabled={!batchLoading}
            style={{
              padding: '8px 16px',
              backgroundColor: '#ff4757',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: !batchLoading ? 'not-allowed' : 'pointer',
              opacity: !batchLoading ? 0.6 : 1,
            }}
          >
            取消
          </button>
        </div>

        {batchLoading && <p>批量操作执行中...</p>}
        {batchError && (
          <div style={{ color: '#ff4757', marginBottom: '10px' }}>
            错误: {batchError.message}
          </div>
        )}
        {batchData && (
          <div style={{ background: '#f8f9fa', padding: '15px', borderRadius: '8px' }}>
            <h4>批量操作结果:</h4>
            <pre>{JSON.stringify(batchData, null, 2)}</pre>
          </div>
        )}
      </div>

      <div style={{ background: '#f8f9fa', padding: '15px', borderRadius: '8px' }}>
        <h4>useAsync 特性：</h4>
        <ul>
          <li>自动加载状态管理</li>
          <li>错误处理和重试机制</li>
          <li>请求取消功能</li>
          <li>数据缓存支持</li>
          <li>成功/失败回调</li>
          <li>依赖项自动重新执行</li>
        </ul>
      </div>
    </div>
  );
};

export default AsyncDemo;