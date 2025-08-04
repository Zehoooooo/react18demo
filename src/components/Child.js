import React, { useContext } from 'react';
import MyContext from '../context/MyContext';

function Child() {
    const user = useContext(MyContext);

    return (
        <div>
            <h3>子组件</h3>
            <p>用户名：{user.name}</p>
            <p>年龄：{user.age}</p>
        </div>
    );
}

export default Child;