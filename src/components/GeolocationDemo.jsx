import React, { useState } from 'react';

const GeolocationDemo = () => {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [watchId, setWatchId] = useState(null);
  const [locationHistory, setLocationHistory] = useState([]);

  const getCurrentLocation = () => {
    setIsLoading(true);
    setError(null);

    if (!navigator.geolocation) {
      setError('浏览器不支持地理位置功能');
      setIsLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude, accuracy } = position.coords;
        const newLocation = {
          latitude,
          longitude,
          accuracy,
          timestamp: new Date().toLocaleTimeString(),
        };
        
        setLocation(newLocation);
        setLocationHistory(prev => [...prev, newLocation]);
        setIsLoading(false);
      },
      (error) => {
        let errorMessage = '获取位置失败';
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = '用户拒绝了位置请求';
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = '位置信息不可用';
            break;
          case error.TIMEOUT:
            errorMessage = '获取位置超时';
            break;
          default:
            errorMessage = '未知错误';
        }
        setError(errorMessage);
        setIsLoading(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000,
      }
    );
  };

  const startWatching = () => {
    if (!navigator.geolocation) {
      setError('浏览器不支持地理位置功能');
      return;
    }

    const id = navigator.geolocation.watchPosition(
      (position) => {
        const { latitude, longitude, accuracy } = position.coords;
        const newLocation = {
          latitude,
          longitude,
          accuracy,
          timestamp: new Date().toLocaleTimeString(),
        };
        
        setLocation(newLocation);
        setLocationHistory(prev => [...prev, newLocation]);
      },
      (error) => {
        let errorMessage = '监听位置失败';
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = '用户拒绝了位置请求';
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = '位置信息不可用';
            break;
          case error.TIMEOUT:
            errorMessage = '获取位置超时';
            break;
          default:
            errorMessage = '未知错误';
        }
        setError(errorMessage);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000,
      }
    );

    setWatchId(id);
  };

  const stopWatching = () => {
    if (watchId) {
      navigator.geolocation.clearWatch(watchId);
      setWatchId(null);
    }
  };

  const clearHistory = () => {
    setLocationHistory([]);
  };

  const getGoogleMapsUrl = (lat, lng) => {
    return `https://www.google.com/maps?q=${lat},${lng}`;
  };

  const getBaiduMapsUrl = (lat, lng) => {
    return `https://api.map.baidu.com/marker?location=${lat},${lng}&title=当前位置&content=我的位置&output=html`;
  };

  return (
    <div style={{ padding: '20px', maxWidth: '900px' }}>
      <h2>地理位置 Demo</h2>
      <p>获取用户当前位置，支持实时监听和位置历史记录</p>

      <div style={{ marginBottom: '30px' }}>
        <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
          <button
            onClick={getCurrentLocation}
            disabled={isLoading}
            style={{
              padding: '10px 20px',
              backgroundColor: isLoading ? '#ccc' : '#2ed573',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: isLoading ? 'not-allowed' : 'pointer',
            }}
          >
            {isLoading ? '获取中...' : '获取当前位置'}
          </button>
          
          {!watchId ? (
            <button
              onClick={startWatching}
              style={{
                padding: '10px 20px',
                backgroundColor: '#3742fa',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              开始监听位置
            </button>
          ) : (
            <button
              onClick={stopWatching}
              style={{
                padding: '10px 20px',
                backgroundColor: '#ff4757',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              停止监听
            </button>
          )}
        </div>

        {error && (
          <div style={{
            padding: '10px',
            backgroundColor: '#ffe6e6',
            border: '1px solid #ff4757',
            borderRadius: '4px',
            color: '#ff4757',
            marginBottom: '20px'
          }}>
            ❌ {error}
          </div>
        )}

        {location && (
          <div style={{
            padding: '20px',
            backgroundColor: '#f0fff0',
            border: '1px solid #2ed573',
            borderRadius: '8px',
            marginBottom: '20px'
          }}>
            <h3>当前位置</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
              <div>
                <strong>纬度:</strong> {location.latitude.toFixed(6)}
              </div>
              <div>
                <strong>经度:</strong> {location.longitude.toFixed(6)}
              </div>
              <div>
                <strong>精度:</strong> ±{location.accuracy.toFixed(1)}米
              </div>
              <div>
                <strong>时间:</strong> {location.timestamp}
              </div>
            </div>
            
            <div style={{ marginTop: '15px', display: 'flex', gap: '10px' }}>
              <a
                href={getGoogleMapsUrl(location.latitude, location.longitude)}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  padding: '8px 16px',
                  backgroundColor: '#4285f4',
                  color: 'white',
                  textDecoration: 'none',
                  borderRadius: '4px',
                  fontSize: '14px'
                }}
              >
                🌍 在Google地图中查看
              </a>
              <a
                href={getBaiduMapsUrl(location.latitude, location.longitude)}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  padding: '8px 16px',
                  backgroundColor: '#3385ff',
                  color: 'white',
                  textDecoration: 'none',
                  borderRadius: '4px',
                  fontSize: '14px'
                }}
              >
                🗺️ 在百度地图中查看
              </a>
            </div>
          </div>
        )}
      </div>

      {locationHistory.length > 0 && (
        <div style={{ marginBottom: '30px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
            <h3>位置历史记录 ({locationHistory.length})</h3>
            <button
              onClick={clearHistory}
              style={{
                padding: '5px 10px',
                backgroundColor: '#ff4757',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '12px'
              }}
            >
              清除历史
            </button>
          </div>
          
          <div style={{ maxHeight: '300px', overflowY: 'auto', border: '1px solid #ddd', borderRadius: '8px' }}>
            {locationHistory.slice().reverse().map((loc, index) => (
              <div
                key={index}
                style={{
                  padding: '10px',
                  borderBottom: '1px solid #eee',
                  background: index === 0 ? '#f0fff0' : '#fff',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <strong>位置 {locationHistory.length - index}:</strong>
                    <br />
                    <span style={{ fontSize: '12px', color: '#666' }}>
                      纬度: {loc.latitude.toFixed(6)}, 经度: {loc.longitude.toFixed(6)}
                    </span>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '12px', color: '#666' }}>
                      {loc.timestamp}
                    </div>
                    <div style={{ fontSize: '12px', color: '#666' }}>
                      精度: ±{loc.accuracy.toFixed(1)}m
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div style={{ background: '#f8f9fa', padding: '15px', borderRadius: '8px' }}>
        <h4>地理位置功能特性：</h4>
        <ul>
          <li>获取当前位置</li>
          <li>实时位置监听</li>
          <li>位置历史记录</li>
          <li>精度信息显示</li>
          <li>地图链接生成</li>
          <li>错误处理</li>
          <li>权限管理</li>
        </ul>
      </div>
    </div>
  );
};

export default GeolocationDemo; 