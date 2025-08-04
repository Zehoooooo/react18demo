import React, { useState, useEffect, useRef } from 'react';

function HooksDemo() {
    // useState 示例
    const [text, setText] = useState('');
    // useRef 示例
    const inputRef = useRef(null);
    // useEffect 示例
    useEffect(() => {
        setText('欢迎使用 React Hooks！');
        // 清理函数示例
        return () => {
            console.log('组件卸载或更新时执行清理');
        }
    });
    useEffect(() => {
        document.title = `输入了: ${text}`;
    }, [text]);

    const focusInput = () => {
        inputRef.current && inputRef.current.focus();
    };

    return (
        <div>
            <h2>Hooks 综合练习</h2>
            <input
                ref={inputRef}
                value={text}
                onChange={e => setText(e.target.value)}
                placeholder="输入点什么"
            />
            <button onClick={focusInput}>聚焦输入框</button>
            <p>你输入了: {text}</p>
        </div>
    );
}

export default HooksDemo;