import React, { useState, useEffect, useMemo } from 'react';
import { mockUsers } from '../mockData'

export default function Manshow() {
    const [data, setData] = useState(0)
    const [search, setSearch] = useState('')
    
    useEffect(() => {
        setData(data + 1)
    }, [])
    
    const changeInput = (e) => {
        setSearch(e.target.value)
    }
    
    // 只对过滤数据使用 useMemo，这是合理的
    const filterData = useMemo(() => {
        return mockUsers.filter(item => item.name.includes(search))
    }, [search])
    
    return (
        <div>
            <h1>{data}</h1>
            <input type="text" value={search} onChange={changeInput} />
            <ul>
                {filterData.map(item => (
                    <li key={item.id}>
                        <img src={item.avatar} alt={item.name} />
                        <span>{item.name}</span>
                        <span>{item.email}</span>
                        <span>{item.phone}</span>
                        <span>{item.department}</span>
                        <span>{item.position}</span>
                        <span>{item.role}</span>
                        <span>{item.status}</span>
                    </li>
                ))}
            </ul>
            <button onClick={() => setData(data + 1)}>+1</button>
        </div>
    )
}