import React from 'react';
import { useDispatch } from 'react-redux';
import { increment } from '../store';


const ExampleHookComponent = () => {
    // 获取 dispatch 方法
    const dispatch = useDispatch();
    return (
        <div>
            <h1>另一个组件的加一</h1>
            <button onClick={() => dispatch(increment())}>+1</button>
        </div>
    );
};

export default ExampleHookComponent;