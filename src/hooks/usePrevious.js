import { useRef, useEffect } from 'react';

/**
 * 高级的usePrevious hook
 * 用于获取前一个值，支持多个值的比较
 */
export const usePrevious = (value, deps = [value]) => {
  const ref = useRef();
  
  useEffect(() => {
    ref.current = value;
  }, deps);
  
  return ref.current;
};

/**
 * 获取多个值的前一个状态
 */
export const usePreviousValues = (values) => {
  const refs = useRef({});
  
  useEffect(() => {
    Object.keys(values).forEach(key => {
      if (refs.current[key] !== values[key]) {
        refs.current[key] = values[key];
      }
    });
  }, [values]);
  
  return refs.current;
};

/**
 * 比较当前值和前一个值
 */
export const useValueComparison = (value, compareFn = (prev, curr) => prev !== curr) => {
  const prevValue = usePrevious(value);
  const hasChanged = compareFn(prevValue, value);
  
  return {
    current: value,
    previous: prevValue,
    hasChanged,
    isFirstRender: prevValue === undefined,
  };
};