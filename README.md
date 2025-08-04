# React 18 高级自定义 Hooks 实践项目

这是一个用于练习 React 18 和函数组件、hooks 的工程，包含了多个高级自定义 hooks 的实现和用法演示。

## 🚀 项目特性

- **React 18** - 使用最新的 React 特性
- **函数组件** - 完全基于函数组件开发
- **自定义 Hooks** - 实现多个实用的自定义 hooks
- **现代化 UI** - 美观的用户界面设计
- **交互式演示** - 每个 hook 都有完整的演示组件

## 📦 安装和运行

```bash
# 安装依赖
npm install

# 启动开发服务器
npm start

# 构建生产版本
npm run build
```

## 🎯 自定义 Hooks 详解

### 1. useLocalStorage Hook

一个功能强大的 localStorage 管理 hook，支持加密、过期时间、跨标签页同步等功能。

#### 基础用法
```javascript
const [value, setValue, removeValue] = useLocalStorage('key', initialValue);
```

#### 高级用法
```javascript
// 带加密的存储
const [encryptedValue, setEncryptedValue] = useLocalStorage('encrypted-key', '', {
  encrypt: true,
});

// 带过期时间的存储（5秒后过期）
const [expiringValue, setExpiringValue] = useLocalStorage('expiring-key', '', {
  expireTime: 5000,
});

// 复杂对象存储
const [userData, setUserData] = useLocalStorage('user-data', {
  name: '',
  email: '',
  preferences: {
    theme: 'light',
    language: 'zh-CN',
  },
});
```

#### 特性
- ✅ 类型安全的数据存储
- ✅ 数据加密支持
- ✅ 自动过期机制
- ✅ 跨标签页同步
- ✅ 错误处理
- ✅ 复杂对象支持

### 2. useDebounce Hook

高级防抖 hook，支持立即执行、取消、前缘防抖等功能。

#### 基础用法
```javascript
const [debouncedValue, { cancel, flush }] = useDebounce(value, 500);
```

#### 高级用法
```javascript
// 前缘防抖（立即执行）
const [debouncedValue] = useDebounce(value, 300, {
  leading: true,
  trailing: false,
});

// 最大等待时间防抖
const [debouncedValue] = useDebounce(value, 1000, {
  maxWait: 2000, // 最多等待2秒
});
```

#### 特性
- ✅ 可配置的防抖延迟
- ✅ 前缘/后缘执行控制
- ✅ 最大等待时间限制
- ✅ 取消和立即执行功能
- ✅ 内存泄漏防护

### 3. useAsync Hook

强大的异步操作管理 hook，支持重试、取消、缓存等功能。

#### 基础用法
```javascript
const {
  data,
  loading,
  error,
  execute,
  cancel,
  retry,
} = useAsync(asyncFunction, dependencies, options);
```

#### 高级用法
```javascript
// 带重试和缓存的异步操作
const {
  data: userData,
  loading: userLoading,
  error: userError,
  execute: fetchUser,
  cancel: cancelFetch,
  retry: retryFetch,
  clearCache,
} = useAsync(fetchUser, [userId], {
  immediate: false,
  retryCount: 2,
  retryDelay: 1000,
  cacheTime: 30000, // 30秒缓存
  onSuccess: (data) => console.log('Success:', data),
  onError: (error) => console.error('Error:', error),
});
```

#### 特性
- ✅ 自动加载状态管理
- ✅ 错误处理和重试机制
- ✅ 请求取消功能
- ✅ 数据缓存支持
- ✅ 成功/失败回调
- ✅ 依赖项自动重新执行

### 4. useIntersectionObserver Hook

元素可见性检测 hook，用于懒加载、无限滚动等功能。

#### 基础用法
```javascript
const {
  ref,
  isIntersecting,
  entry,
  observe,
  unobserve,
  reset,
} = useIntersectionObserver(options);
```

#### 高级用法
```javascript
// 懒加载检测
const {
  ref: lazyRef,
  isIntersecting: isLazyVisible,
} = useIntersectionObserver({
  threshold: 0.1,
  triggerOnce: true,
});

// 无限滚动检测
const {
  ref: infiniteRef,
  isIntersecting: isInfiniteVisible,
} = useIntersectionObserver({
  threshold: 0,
  triggerOnce: false,
});
```

#### 特性
- ✅ 可配置的交叉阈值
- ✅ 一次性触发模式
- ✅ 冻结可见状态
- ✅ 观察器生命周期管理
- ✅ 性能优化

### 5. usePrevious Hook

获取前一个值的 hook，支持多个值的比较和自定义比较函数。

#### 基础用法
```javascript
const previousValue = usePrevious(value);
```

#### 高级用法
```javascript
// 多值比较
const previousValues = usePreviousValues({ name, age, theme });

// 值比较
const comparison = useValueComparison(value, (prev, curr) => prev !== curr);

// 自定义比较函数
const ageComparison = useValueComparison(age, (prev, curr) => {
  if (prev === undefined) return false;
  return Math.abs(curr - prev) > 5; // 年龄变化超过5岁才算变化
});
```

#### 特性
- ✅ 获取前一个值
- ✅ 多值比较支持
- ✅ 自定义比较函数
- ✅ 变化检测
- ✅ 首次渲染检测

## 🎨 演示组件

项目包含了完整的演示组件，展示每个 hook 的实际用法：

- **LocalStorageDemo** - useLocalStorage 的各种用法演示
- **DebounceDemo** - useDebounce 的防抖效果演示
- **AsyncDemo** - useAsync 的异步操作演示
- **IntersectionObserverDemo** - useIntersectionObserver 的可见性检测演示
- **PreviousDemo** - usePrevious 的值比较演示

## 🛠️ 技术栈

- **React 18** - 最新的 React 版本
- **React Hooks** - 函数组件状态管理
- **Redux Toolkit** - 状态管理
- **ECharts** - 数据可视化
- **CSS-in-JS** - 内联样式

## 📁 项目结构

```
src/
├── hooks/                    # 自定义 hooks
│   ├── useLocalStorage.js   # localStorage 管理
│   ├── useDebounce.js       # 防抖功能
│   ├── useAsync.js          # 异步操作管理
│   ├── useIntersectionObserver.js # 可见性检测
│   └── usePrevious.js       # 前一个值获取
├── components/              # 演示组件
│   ├── LocalStorageDemo.jsx
│   ├── DebounceDemo.jsx
│   ├── AsyncDemo.jsx
│   ├── IntersectionObserverDemo.jsx
│   └── PreviousDemo.jsx
├── context/                 # React Context
├── store.js                 # Redux store
└── App.jsx                  # 主应用组件
```

## 🎯 应用场景

### useLocalStorage
- 用户偏好设置存储
- 表单数据持久化
- 购物车数据保存
- 主题设置管理

### useDebounce
- 搜索框输入优化
- 窗口大小调整处理
- 滚动事件优化
- API 请求防抖

### useAsync
- API 数据获取
- 文件上传处理
- 批量操作管理
- 数据同步操作

### useIntersectionObserver
- 图片懒加载
- 无限滚动列表
- 广告曝光统计
- 动画触发控制

### usePrevious
- 值变化检测
- 状态回滚功能
- 动画触发
- 调试和日志记录

## 🚀 最佳实践

1. **性能优化**
   - 使用 useCallback 和 useMemo 优化性能
   - 合理使用依赖项数组
   - 避免不必要的重新渲染

2. **错误处理**
   - 为异步操作添加错误边界
   - 提供用户友好的错误信息
   - 实现重试机制

3. **用户体验**
   - 添加加载状态指示
   - 提供取消操作功能
   - 实现数据缓存

4. **代码组织**
   - 将复杂逻辑提取到自定义 hooks
   - 保持组件的简洁性
   - 使用 TypeScript 提高类型安全

## 🤝 贡献

欢迎提交 Issue 和 Pull Request 来改进这个项目！

## 📄 许可证

MIT License

---

**注意**: 这是一个学习项目，展示了 React 18 和自定义 hooks 的高级用法。在实际生产环境中使用时，请根据具体需求进行调整和优化。