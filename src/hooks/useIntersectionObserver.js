import { useEffect, useRef, useState, useCallback } from 'react';

/**
 * 高级的useIntersectionObserver hook
 * 用于元素可见性检测，支持懒加载、无限滚动等功能
 */
export const useIntersectionObserver = (options = {}) => {
  const {
    threshold = 0,
    root = null,
    rootMargin = '0px',
    freezeOnceVisible = false, // 一旦可见就冻结
    triggerOnce = false, // 只触发一次
  } = options;

  const [isIntersecting, setIsIntersecting] = useState(false);
  const [entry, setEntry] = useState(null);
  const elementRef = useRef(null);
  const observerRef = useRef(null);
  const hasTriggeredRef = useRef(false);

  // 创建观察器
  const createObserver = useCallback(() => {
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    observerRef.current = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        
        if (!entry) return;

        const isIntersecting = entry.isIntersecting;
        
        // 如果设置了只触发一次且已经触发过，则不再更新
        if (triggerOnce && hasTriggeredRef.current) {
          return;
        }

        // 如果设置了冻结且已经可见，则不再更新
        if (freezeOnceVisible && hasTriggeredRef.current && isIntersecting) {
          return;
        }

        setIsIntersecting(isIntersecting);
        setEntry(entry);

        if (isIntersecting) {
          hasTriggeredRef.current = true;
        }
      },
      {
        threshold,
        root,
        rootMargin,
      }
    );
  }, [threshold, root, rootMargin, triggerOnce, freezeOnceVisible]);

  // 开始观察
  const observe = useCallback(() => {
    if (elementRef.current && observerRef.current) {
      observerRef.current.observe(elementRef.current);
    }
  }, []);

  // 停止观察
  const unobserve = useCallback(() => {
    if (elementRef.current && observerRef.current) {
      observerRef.current.unobserve(elementRef.current);
    }
  }, []);

  // 重置状态
  const reset = useCallback(() => {
    hasTriggeredRef.current = false;
    setIsIntersecting(false);
    setEntry(null);
  }, []);

  // 初始化观察器
  useEffect(() => {
    createObserver();
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [createObserver]);

  // 当元素ref变化时重新观察
  useEffect(() => {
    if (elementRef.current && observerRef.current) {
      observe();
    }
    return () => {
      unobserve();
    };
  }, [observe, unobserve]);

  return {
    ref: elementRef,
    isIntersecting,
    entry,
    observe,
    unobserve,
    reset,
  };
};
