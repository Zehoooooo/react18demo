import React, { useState } from 'react';
import MyContext from '../context/MyContext';
import Child from './Child';

function ContextDemo() {
    const [user, setUser] = useState({ name: '张三', age: 20 });

    return (
        <MyContext.Provider value={user}>
            <h2>Context Demo</h2>
            <Child />
        </MyContext.Provider>
    );
}

export default ContextDemo;