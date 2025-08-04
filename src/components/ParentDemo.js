import React, { useState, useCallback } from 'react';

// 子组件，接收 props
function Child({ msgFromParent, onSendToParent }) {
    const [childMsg, setChildMsg] = useState('');

    return (
        <div style={{ border: '1px solid #ccc', margin: 8, padding: 8 }}>
            <h3>子组件</h3>
            <p>父组件传来的消息：{msgFromParent}</p>
            <input
                value={childMsg}
                onChange={e => setChildMsg(e.target.value)}
                placeholder="输入要发给父组件的内容"
            />
            <button onClick={() => onSendToParent(childMsg)}>发送给父组件</button>
        </div>
    );
}

// 父组件
function ParentDemo() {
    const [parentMsg, setParentMsg] = useState('');
    const [msgFromChild, setMsgFromChild] = useState('');

    // 用 useCallback 包裹回调，只有 setMsgFromChild 变化时才会生成新函数
    const handleMsgFromChild = useCallback(
        (msg) => {
            setMsgFromChild(msg);
        },
        [] // 依赖项为空，setMsgFromChild 不会变
    );

    return (
        <div style={{ border: '2px solid #666', padding: 16 }}>
            <h2>父子组件传值 Demo（含 useCallback）</h2>
            <input
                value={parentMsg}
                onChange={e => setParentMsg(e.target.value)}
                placeholder="输入要发给子组件的内容"
            />
            <Child
                msgFromParent={parentMsg}
                onSendToParent={handleMsgFromChild}
            />
            <p>子组件传来的消息：{msgFromChild}</p>
        </div>
    );
}

export default ParentDemo;