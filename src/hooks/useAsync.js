import { useState, useEffect, useCallback, useRef } from 'react';

/**
 * 高级的useAsync hook
 * 用于处理异步操作，支持重试、取消、缓存等功能
 */
export const useAsync = (asyncFunction, dependencies = [], options = {}) => {
  const {
    immediate = true, // 是否立即执行
    retryCount = 0, // 重试次数
    retryDelay = 1000, // 重试延迟
    cacheTime = 0, // 缓存时间（毫秒）
    onSuccess = null,
    onError = null,
  } = options;

  const [state, setState] = useState({
    data: null,
    loading: false,
    error: null,
  });

  const [retryAttempts, setRetryAttempts] = useState(0);
  const abortControllerRef = useRef(null);
  const cacheRef = useRef(new Map());
  const lastFetchTimeRef = useRef(0);

  // 检查缓存
  const getCachedData = useCallback((cacheKey) => {
    if (cacheTime <= 0) return null;
    
    const cached = cacheRef.current.get(cacheKey);
    if (cached && Date.now() - cached.timestamp < cacheTime) {
      return cached.data;
    }
    return null;
  }, [cacheTime]);

  // 设置缓存
  const setCachedData = useCallback((cacheKey, data) => {
    if (cacheTime > 0) {
      cacheRef.current.set(cacheKey, {
        data,
        timestamp: Date.now(),
      });
    }
  }, [cacheTime]);

  // 生成缓存键
  const getCacheKey = useCallback(() => {
    return JSON.stringify(dependencies);
  }, [dependencies]);

  // 执行异步函数
  const execute = useCallback(async (params = {}) => {
    const cacheKey = getCacheKey();
    const cachedData = getCachedData(cacheKey);
    
    if (cachedData) {
      setState({
        data: cachedData,
        loading: false,
        error: null,
      });
      return cachedData;
    }

    // 取消之前的请求
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    // 创建新的AbortController
    abortControllerRef.current = new AbortController();

    setState(prev => ({ ...prev, loading: true, error: null }));
    setRetryAttempts(0);

    try {
      const result = await asyncFunction(params, abortControllerRef.current.signal);
      
      if (abortControllerRef.current.signal.aborted) {
        return;
      }

      setState({
        data: result,
        loading: false,
        error: null,
      });

      setCachedData(cacheKey, result);
      onSuccess?.(result);
      lastFetchTimeRef.current = Date.now();

      return result;
    } catch (error) {
      if (abortControllerRef.current.signal.aborted) {
        return;
      }

      const isRetryable = retryAttempts < retryCount && 
        (error.name !== 'AbortError' && error.name !== 'CancelError');

      if (isRetryable) {
        setRetryAttempts(prev => prev + 1);
        setTimeout(() => {
          execute(params);
        }, retryDelay);
        return;
      }

      setState({
        data: null,
        loading: false,
        error,
      });

      onError?.(error);
      throw error;
    }
  }, [asyncFunction, dependencies, getCacheKey, getCachedData, setCachedData, retryAttempts, retryCount, retryDelay, onSuccess, onError]);

  // 取消请求
  const cancel = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
  }, []);

  // 重试
  const retry = useCallback((params = {}) => {
    setRetryAttempts(0);
    return execute(params);
  }, [execute]);

  // 清除缓存
  const clearCache = useCallback(() => {
    cacheRef.current.clear();
  }, []);

  // 立即执行
  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, [execute, immediate]);

  // 清理函数
  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  return {
    ...state,
    execute,
    cancel,
    retry,
    clearCache,
    retryAttempts,
    lastFetchTime: lastFetchTimeRef.current,
  };
};