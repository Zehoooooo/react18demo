import React, { useState, useMemo } from 'react';

function UseMemoDemo() {
    const [count, setCount] = useState(0);
    const [text, setText] = useState('');

    // 只有 count 变化时，expensiveResult 才会重新计算
    // 1. 缓存耗时计算结果
    // 2. 缓存过滤/排序结果
    // 3. 缓存对象/数组，避免子组件不必要渲染
    // 4. 依赖项变化时重新计算
    // 5. 与 useCallback 配合（useCallback 本质上是 useMemo 的语法糖）
    const expensiveResult = useMemo(() => {
        console.log('执行了耗时计算');
        let sum = 0;
        for (let i = 0; i < 100; i++) {
            sum += i;
        }
        return sum + count;
    }, [count]);

    return (
        <div>
            <h2>useMemo 示例</h2>
            <p>耗时计算结果：{expensiveResult}</p>
            <button onClick={() => setCount(count + 1)}>count +1</button>
            <input
                value={text}
                onChange={e => setText(e.target.value)}
                placeholder="输入不会触发耗时计算"
            />
        </div>
    );
}

export default UseMemoDemo;