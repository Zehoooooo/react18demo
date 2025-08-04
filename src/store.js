import { configureStore, createSlice } from '@reduxjs/toolkit';

// 创建一个 counter 的 slice，包含状态和操作方法
const counterSlice = createSlice({
  name: 'counter', // slice 名称
  initialState: { value: 0 }, // 初始状态
  reducers: {
    // 加1
    increment: state => { state.value += 1 },
    // 减1
    decrement: state => { state.value -= 1 },
    // 增加指定数值
    addByAmount: (state, action) => { 
        state.value += action.payload 
    }
  }
});

// 导出 action 方法，组件里可以直接用
export const { increment, decrement, addByAmount } = counterSlice.actions;

// 创建 Redux store，把 counterSlice 加入 reducer
const store = configureStore({
  reducer: {
    counter: counterSlice.reducer
  }
});

export default store;