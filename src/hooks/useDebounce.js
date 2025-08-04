import { useState, useEffect, useCallback, useRef } from 'react';

/**
 * 高级的useDebounce hook
 * 支持立即执行、取消、前缘防抖等功能
 */
export const useDebounce = (value, delay, options = {}) => {
  const {
    leading = false, // 是否在前缘执行
    trailing = true, // 是否在后缘执行
    maxWait = null, // 最大等待时间
  } = options;

  const [debouncedValue, setDebouncedValue] = useState(value);
  const timeoutRef = useRef(null);
  const lastCallTimeRef = useRef(0);
  const lastInvokeTimeRef = useRef(0);

  // 取消防抖
  const cancel = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  // 刷新防抖（立即执行）
  const flush = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
      setDebouncedValue(value);
      lastInvokeTimeRef.current = Date.now();
    }
  }, [value]);

  // 检查是否应该执行
  const shouldInvoke = useCallback(() => {
    const time = Date.now();
    const timeSinceLastCall = time - lastCallTimeRef.current;
    const timeSinceLastInvoke = time - lastInvokeTimeRef.current;

    return (
      lastCallTimeRef.current === 0 ||
      timeSinceLastCall >= delay ||
      timeSinceLastCall < 0 ||
      (maxWait !== null && timeSinceLastInvoke >= maxWait)
    );
  }, [delay, maxWait]);

  // 执行函数
  const invokeFunc = useCallback(() => {
    setDebouncedValue(value);
    lastInvokeTimeRef.current = Date.now();
  }, [value]);

  // 启动定时器
  const startTimer = useCallback((pendingFunc) => {
    cancel();
    timeoutRef.current = setTimeout(pendingFunc, delay);
  }, [delay, cancel]);

  // 主逻辑
  useEffect(() => {
    const time = Date.now();
    const isInvoking = shouldInvoke();

    if (isInvoking) {
      invokeFunc();
    } else if (timeoutRef.current === null) {
      if (leading && lastCallTimeRef.current === 0) {
        invokeFunc();
      }
      startTimer(() => {
        if (trailing) {
          invokeFunc();
        }
      });
    }

    lastCallTimeRef.current = time;
  }, [value, delay, shouldInvoke, invokeFunc, startTimer, leading, trailing]);

  // 清理定时器
  useEffect(() => {
    return () => {
      cancel();
    };
  }, [cancel]);

  return [debouncedValue, { cancel, flush }];
};
