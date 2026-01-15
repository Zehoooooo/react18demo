import { useState, useEffect, useCallback } from 'react';

/**
 * 高级的useLocalStorage hook
 * 支持类型安全、过期时间、加密等功能
 */
export const useLocalStorage = (key, initialValue, options = {}) => {
  const {
    encrypt = false,
    expireTime = null, // 过期时间（毫秒）
    serializer = JSON.stringify,
    deserializer = JSON.parse,
  } = options;

  // 加密函数
  const encryptData = useCallback((data) => {
    if (!encrypt) return data;
    // 简单的base64加密，实际项目中可以使用更安全的加密方法
    return btoa(JSON.stringify(data));
  }, [encrypt]);

  // 解密函数
  const decryptData = useCallback((data) => {
    if (!encrypt) return data;
    try {
      return JSON.parse(atob(data));
    } catch {
      return null;
    }
  }, [encrypt]);

  // 检查是否过期
  const isExpired = useCallback((storedData) => {
    if (!expireTime || !storedData?.timestamp) return false;
    return Date.now() - storedData.timestamp > expireTime;
  }, [expireTime]);

  // 从localStorage获取数据
  const getStoredValue = useCallback(() => {
    try {
      const item = window.localStorage.getItem(key);
      if (item === null) return initialValue;
      
      const decryptedData = decryptData(item);
      const parsedData = deserializer(decryptedData);
      
      // 检查是否过期
      if (isExpired(parsedData)) {
        window.localStorage.removeItem(key);
        return initialValue;
      }
      
      return parsedData.data || parsedData;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  }, [key, initialValue, decryptData, deserializer, isExpired]);

  // 状态管理
  const [storedValue, setStoredValue] = useState(getStoredValue);

  // 设置值的函数
  const setValue = useCallback((value) => {
    try {
      // 允许值是一个函数，这样我们就有了与useState相同的API
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      
      // 保存到状态
      setStoredValue(valueToStore);
      
      // 保存到localStorage
      const dataToStore = {
        data: valueToStore,
        timestamp: Date.now(),
      };
      
      const serializedData = serializer(dataToStore);
      const encryptedData = encryptData(serializedData);
      window.localStorage.setItem(key, encryptedData);
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  }, [key, storedValue, serializer, encryptData]);

  // 清除数据的函数
  const removeValue = useCallback(() => {
    try {
      window.localStorage.removeItem(key);
      setStoredValue(initialValue);
    } catch (error) {
      console.error(`Error removing localStorage key "${key}":`, error);
    }
  }, [key, initialValue]);


  // 监听storage事件（跨标签页同步）
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === key && e.newValue !== null) {
        const decryptedData = decryptData(e.newValue);
        const parsedData = deserializer(decryptedData);
        if (!isExpired(parsedData)) {
          setStoredValue(parsedData.data || parsedData);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [key, decryptData, deserializer, isExpired]);

  return [storedValue, setValue, removeValue];
};