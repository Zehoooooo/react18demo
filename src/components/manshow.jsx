import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { mockUsers } from '../mockData'

export default function Manshow() {
    const [data, setData] = useState(0)
    const [search, setSearch] = useState('')
    const [selectedUser, setSelectedUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const inputRef = useRef(null)
    
    // 1. 组件挂载时执行 (componentDidMount)
    useEffect(() => {
        console.log('组件挂载 - 相当于 componentDidMount')
        console.log('初始用户数据:', mockUsers)
        
        // 模拟异步数据加载
        setTimeout(() => {
            setLoading(false)
            console.log('数据加载完成')
        }, 1000)
        
        // 清理函数 (componentWillUnmount)
        return () => {
            console.log('组件卸载 - 相当于 componentWillUnmount')
        }
    }, []) // 空依赖数组，只在挂载时执行一次
    
    // 2. 组件更新时执行 (componentDidUpdate)
    useEffect(() => {
        console.log('组件更新 - 相当于 componentDidUpdate')
        console.log('当前数据:', data)
        console.log('当前搜索:', search)
        console.log('inputRef--------', inputRef)
    }) // 没有依赖数组，每次渲染都执行
    
    // 3. 特定状态变化时执行
    useEffect(() => {
        console.log('data 状态变化:', data)
    }, [data]) // 只在 data 变化时执行
    
    useEffect(() => {
        console.log('search 状态变化:', search)
    }, [search]) // 只在 search 变化时执行
    
    // 4. 模拟 componentDidMount + componentDidUpdate
    useEffect(() => {
        if (!loading) {
            console.log('数据加载完成后的逻辑')
        }
    }, [loading])
    
    // 5. 模拟 getDerivedStateFromProps
    useEffect(() => {
        console.log('props 变化时的处理 (getDerivedStateFromProps)')
        // 这里可以处理 props 变化时的状态更新
    }, [mockUsers]) // 当 mockUsers 变化时执行
    
    // 使用 useCallback 缓存搜索输入处理函数
    const handleSearchChange = useCallback((e) => {
        setSearch(e.target.value)
    }, [])

    // 使用 useCallback 缓存用户选择函数
    const handleUserSelect = useCallback((user) => {
        setSelectedUser(user)
        console.log('选中的用户:', user.name)
    }, [])
    
    // 使用 useCallback 缓存数据更新函数
    const handleDataUpdate = useCallback(() => {
        setData(prevData => prevData + 1)
    }, [])
    
    // 只对过滤数据使用 useMemo，这是合理的
    const filterData = useMemo(() => {
        return mockUsers.filter(item => item.name.includes(search))
    }, [search])
    
    // 6. 模拟 shouldComponentUpdate
    const shouldUpdate = useMemo(() => {
        console.log('检查是否需要更新')
        return filterData.length > 0
    }, [filterData])
    
    if (loading) {
        return <div>加载中...</div>
    }
    
    return (
        <div>
            <h1>{data}</h1>
            <input ref={inputRef} type="text" value={search} onChange={handleSearchChange} />
            
            {/* 显示选中的用户 */}
            {selectedUser && (
                <div style={{ 
                    padding: '10px', 
                    backgroundColor: '#e8f5e8', 
                    margin: '10px 0',
                    borderRadius: '4px'
                }}>
                    <h3>选中的用户:</h3>
                    <p>姓名: {selectedUser.name}</p>
                    <p>邮箱: {selectedUser.email}</p>
                    <p>部门: {selectedUser.department}</p>
                </div>
            )}
            
            <ul>
                {filterData.map(item => (
                    <li key={item.id} style={{ 
                        padding: '10px', 
                        margin: '5px 0',
                        border: '1px solid #ddd',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        backgroundColor: selectedUser?.id === item.id ? '#f0f8ff' : 'white'
                    }}>
                        <img src={item.avatar} alt={item.name} style={{ width: '40px', height: '40px', borderRadius: '50%', marginRight: '10px' }} />
                        <span>{item.name}</span>
                        <span>{item.email}</span>
                        <span>{item.phone}</span>
                        <span>{item.department}</span>
                        <span>{item.position}</span>
                        <span>{item.role}</span>
                        <span>{item.status}</span>
                        
                        {/* 使用 useCallback 缓存的函数 */}
                        <button 
                            onClick={() => handleUserSelect(item)}
                            style={{ 
                                marginLeft: '10px',
                                padding: '5px 10px',
                                backgroundColor: '#667eea',
                                color: 'white',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: 'pointer'
                            }}
                        >
                            选择用户
                        </button>
                    </li>
                ))}
            </ul>
            
            {/* 使用 useCallback 缓存的函数 */}
            <button onClick={handleDataUpdate}>+1</button>
            
            {/* 生命周期状态显示 */}
            <div style={{ 
                marginTop: '20px', 
                padding: '10px', 
                backgroundColor: '#f0f0f0',
                borderRadius: '4px',
                fontSize: '12px'
            }}>
                <h4>生命周期状态:</h4>
                <p>数据: {data}</p>
                <p>搜索: {search}</p>
                <p>过滤结果数量: {filterData.length}</p>
                <p>是否需要更新: {shouldUpdate ? '是' : '否'}</p>
            </div>
        </div>
    )
}
