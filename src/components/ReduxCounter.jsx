import React, { useState } from 'react';
// useSelector 用于读取 Redux 状态，useDispatch 用于派发 action
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement, addByAmount } from '../store';

function ReduxCounter() {
  // 读取 Redux 中 counter 的 value
  const count = useSelector(state => state.counter.value);
  // 获取 dispatch 方法
  const dispatch = useDispatch();
  // 本地状态，记录输入框的数值
  const [amount, setAmount] = useState(0);

  return (
    <div style={{border: '1px solid #aaa', padding: 16, margin: 16}}>
      <h2>Redux 计数器 Demo</h2>
      <p>当前计数：{count}</p>
      {/* 派发 decrement 和 increment action */}
      <button onClick={() => dispatch(decrement())}>-1</button>
      <button onClick={() => dispatch(increment())} style={{marginLeft: 8}}>+1</button>
      <div style={{marginTop: 8}}>
        {/* 输入框，输入要增加的数值 */}
        <input
          type="number"
          value={amount}
          onChange={e => setAmount(Number(e.target.value))}
          style={{width: 60}}
        />
        {/* 派发 addByAmount action，增加指定数值 */}
        <button onClick={() => dispatch(addByAmount(amount))} style={{marginLeft: 8}}>
          增加指定数值
        </button>
      </div>
    </div>
  );
}

export default ReduxCounter;