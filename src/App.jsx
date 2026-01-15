// React 18 核心导入
// useState: 基础状态管理
// useTransition: React 18 并发特性，处理非紧急更新
// Suspense: React 18 用于处理异步操作的组件
import React, { useState, useTransition, Suspense } from 'react';

// 组件导入（按字母顺序排列，便于查找和维护）
// 动画相关组件
import AnimationDemo from './components/AnimationDemo';
// 异步处理组件
import AsyncDemo from './components/AsyncDemo';
// 基础 Hooks 演示
import BasicHooksDemo from './components/BasicHooksDemo';
// 数据可视化组件
import DataVisualizationDemo from './components/DataVisualizationDemo';
// 防抖 Hook 演示
import DebounceDemo from './components/DebounceDemo';
// 拖拽排序组件
import DragSortDemo from './components/DragSortDemo';
// 示例 Hook 组件
import ExampleHookComponent from './components/ExampleHookComponent';
// 文件上传组件
import FileUploadDemo from './components/FileUploadDemo';
// 表单验证组件
import FormValidationDemo from './components/FormValidationDemo';
// 函数组件基础演示
import FunctionComponentDemo from './components/FunctionComponentDemo';
// 地理位置组件
import GeolocationDemo from './components/GeolocationDemo';
// Hooks 综合演示
import HooksDemo from './components/HooksDemo';
// 交叉观察器 Hook 演示
import IntersectionObserverDemo from './components/IntersectionObserverDemo';
// 本地存储 Hook 演示
import LocalStorageDemo from './components/LocalStorageDemo';
// 自定义组件
import Manshow from './components/manshow';
// 模拟数据演示
import MockDataDemo from './components/MockDataDemo';
// 父子组件通信演示
import ParentDemo from './components/ParentDemo';
// 性能图表组件
import PerformanceChart from './components/PerformanceChart';
// 前值保存 Hook 演示
import PreviousDemo from './components/PreviousDemo';
// 二维码生成组件
import QRCodeDemo from './components/QRCodeDemo';
// Redux 计数器组件
import ReduxCounter from './components/ReduxCounter';
// 主题切换组件
import ThemeToggleDemo from './components/ThemeToggleDemo';
// useCallback 详细演示
import UseCallbackDetailedDemo from './components/UseCallbackDetailedDemo';
// useMemo 演示
import UseMemoDemo from './components/UseMemoDemo';
// 虚拟滚动组件
import VirtualScrollDemo from './components/VirtualScrollDemo';
// WebSocket 通信组件
import WebSocketDemo from './components/WebSocketDemo';

/**
 * 错误边界组件（基于类组件）
 * 注意：目前错误边界只能用类组件实现，这是React的限制
 * 作用：捕获并处理子组件树中的JavaScript错误
 * 特点：
 * 1. 防止错误传播到整个应用
 * 2. 提供友好的错误提示
 * 3. 支持错误恢复（重试功能）
 */
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ 
          padding: '20px', 
          backgroundColor: '#fee', 
          border: '1px solid #fcc', 
          borderRadius: '8px',
          margin: '20px'
        }}>
          <h2>组件渲染出错了！</h2>
          <p>{this.state.error?.toString()}</p>
          <button 
            onClick={() => this.setState({ hasError: false, error: null })} 
            style={{
              padding: '10px 20px',
              backgroundColor: '#667eea',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            重试
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

/**
 * Demo 配置数组
 * 🌟 函数组件优化技巧：将静态数据移到组件外部
 * 好处：
 * 1. 避免每次渲染重新创建数组，减少内存占用
 * 2. 提高渲染性能，因为React不需要每次比较这个数组
 * 3. 使组件代码更清晰，分离静态配置和动态逻辑
 */
const demos = [
  { id: 'basicHooks', name: '基础Hooks演示', component: BasicHooksDemo },
  { id: 'functionComponent', name: '函数组件基础', component: FunctionComponentDemo },
  { id: 'useCallback', name: 'useCallback详解', component: UseCallbackDetailedDemo },
  { id: 'localStorage', name: 'useLocalStorage', component: LocalStorageDemo },
  { id: 'debounce', name: 'useDebounce', component: DebounceDemo },
  { id: 'async', name: 'useAsync', component: AsyncDemo },
  { id: 'intersection', name: 'useIntersectionObserver', component: IntersectionObserverDemo },
  { id: 'previous', name: 'usePrevious', component: PreviousDemo },
  { id: 'virtualScroll', name: '虚拟滚动', component: VirtualScrollDemo },
  { id: 'dragSort', name: '拖拽排序', component: DragSortDemo },
  { id: 'formValidation', name: '表单验证', component: FormValidationDemo },
  { id: 'themeToggle', name: '主题切换', component: ThemeToggleDemo },
  { id: 'animation', name: '动画效果', component: AnimationDemo },
  { id: 'websocket', name: 'WebSocket通信', component: WebSocketDemo },
  { id: 'fileUpload', name: '文件上传', component: FileUploadDemo },
  { id: 'geolocation', name: '地理位置', component: GeolocationDemo },
  { id: 'qrcode', name: '二维码生成器', component: QRCodeDemo },
  { id: 'performance', name: 'Performance Chart', component: PerformanceChart },
  { id: 'redux', name: 'Redux Counter', component: ReduxCounter },
  { id: 'example', name: 'Example Hook', component: ExampleHookComponent },
  { id: 'hooks', name: 'Hooks Demo', component: HooksDemo },
  { id: 'parent', name: 'Parent Demo', component: ParentDemo },
  { id: 'memo', name: 'UseMemo Demo', component: UseMemoDemo },
  { id: 'mock', name: 'Mock Data Demo', component: MockDataDemo },
  { id: 'dataVisualization', name: 'Data Visualization Demo', component: DataVisualizationDemo },
  { id: 'manshow', name: 'Manshow', component: Manshow },
];

/**
 * 🌟 React 函数组件核心概念 🌟
 * 
 * 函数组件是React中定义组件的主要方式，它是一个纯JavaScript函数：
 * 1. 接收 props 对象作为输入
 * 2. 返回 React 元素（JSX）作为输出
 * 3. 使用 Hooks 管理状态和副作用
 * 
 * 🎯 函数组件的优势：
 * - 代码更简洁，易于阅读和维护
 * - 更好的性能（React 16.8+）
 * - 更容易测试
 * - 支持所有React特性（通过Hooks）
 * 
 * 📌 React.memo 优化：
 * - 作用：缓存组件渲染结果，避免不必要的重渲染
 * - 原理：浅比较组件的props，只有当props变化时才重新渲染
 * - 适用场景：组件渲染成本高，或频繁渲染但props变化少
 */
const App = React.memo(function App() {
  /**
   * 🌟 useState Hook - 状态管理 🌟
   * 
   * 作用：在函数组件中添加状态管理
   * 语法：const [state, setState] = useState(initialValue)
   * 
   * 参数说明：
   * - initialValue: 状态的初始值（只在首次渲染时使用）
   * 
   * 返回值：
   * - state: 当前状态值
   * - setState: 更新状态的函数
   * 
   * 📌 使用要点：
   * - 不能在条件语句、循环或嵌套函数中调用useState
   * - setState是异步的，多次调用会被合并
   * - 可以使用函数式更新处理依赖于当前状态的更新
   */
  const [activeDemo, setActiveDemo] = useState('basicHooks');
  
  /**
   * 🌟 useTransition Hook - React 18 并发特性 🌟
   * 
   * 作用：区分紧急和非紧急更新，保持UI响应性
   * 语法：const [isPending, startTransition] = useTransition()
   * 
   * 返回值：
   * - isPending: 布尔值，表示是否有正在进行的过渡更新
   * - startTransition: 函数，用于包裹非紧急更新
   * 
   * 📌 函数组件中的使用场景：
   * - 组件切换
   * - 数据筛选/排序
   * - 其他耗时但非紧急的操作
   */
  const [isPending, startTransition] = useTransition();

  /**
   * 🌟 函数组件中的逻辑处理 🌟
   * 
   * 在函数组件中，你可以直接编写JavaScript逻辑：
   * - 数据处理
   * - 条件判断
   * - 函数调用
   * - 等等
   * 
   * 注意：这些逻辑会在每次组件渲染时执行
   */
  const ActiveComponent = demos.find(demo => demo.id === activeDemo)?.component;

  /**
   * 🌟 函数组件的返回值 - JSX 🌟
   * 
   * JSX是React的语法扩展，允许你在JavaScript中编写类似HTML的代码
   * 
   * 📌 关键点：
   * - 只能返回一个根元素
   * - 使用驼峰命名法（如className而不是class）
   * - 可以嵌入JavaScript表达式（使用{}）
   * - 支持条件渲染和列表渲染
   */
  return (
    <div style={{ minHeight: '100vh', background: '#f8f9fa' }}>
      {/* 页面标题区域 */}
      <div style={{ 
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        padding: '20px',
        marginBottom: '20px'
      }}>
        <h1 style={{ margin: 0, textAlign: 'center' }}>React 函数组件实战</h1>
        <p style={{ textAlign: 'center', margin: '10px 0 0 0', opacity: 0.9 }}>
          从基础到高级，全面学习React函数组件和Hooks
        </p>
      </div>

      {/* 主内容区域 */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
        {/* 导航菜单 */}
        <div style={{ 
          background: 'white', 
          borderRadius: '8px', 
          padding: '15px', 
          marginBottom: '20px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          <h3 style={{ margin: '0 0 15px 0', color: '#333' }}>选择Demo:</h3>
          
          {/* 🌟 列表渲染 - map函数 🌟 */}
          {/* 在函数组件中，使用map()方法渲染列表 */}
          {/* 每个列表项必须有唯一的key属性 */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
            gap: '10px' 
          }}>
            {demos.map((demo) => (
              <button
                key={demo.id}  // 🔑 key属性：帮助React识别列表项的变化
                onClick={() => {
                  // 🌟 事件处理 🌟
                  // 在函数组件中，事件处理函数直接定义在组件内部
                  // 使用startTransition处理非紧急更新
                  startTransition(() => {
                    setActiveDemo(demo.id);
                  });
                }}
                style={{
                  padding: '10px 15px',
                  backgroundColor: activeDemo === demo.id ? '#667eea' : '#f8f9fa',
                  color: activeDemo === demo.id ? 'white' : '#333',
                  border: '1px solid #ddd',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  fontSize: '14px',
                  opacity: isPending && activeDemo !== demo.id ? 0.7 : 1,
                }}
                disabled={isPending}
              >
                {demo.name}
                {isPending && activeDemo !== demo.id && ' (加载中...)'}
              </button>
            ))}
          </div>
        </div>

        {/* 当前选中的Demo展示区域 */}
        <div style={{ 
          background: 'white', 
          borderRadius: '8px', 
          padding: '20px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          minHeight: '500px'
        }}>
          {/* 错误边界包装 */}
          <ErrorBoundary>
            {/* 🌟 Suspense 组件 - 处理异步操作 🌟 */}
            <Suspense fallback={
              <div style={{ 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center', 
                height: '400px',
                fontSize: '18px',
                color: '#666'
              }}>
                <div>
                  <div style={{ 
                    width: '40px', 
                    height: '40px', 
                    border: '4px solid #f3f3f3', 
                    borderTop: '4px solid #667eea', 
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite',
                    margin: '0 auto 15px'
                  }}></div>
                  组件加载中...
                </div>
              </div>
            }>
              {/* 🌟 条件渲染 🌟 */}
              {/* 在函数组件中，使用JavaScript条件运算符或逻辑与(&&)进行条件渲染 */}
              {ActiveComponent ? <ActiveComponent /> : (
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'center', 
                  alignItems: 'center', 
                  height: '400px',
                  fontSize: '18px',
                  color: '#999'
                }}>
                  请选择一个Demo开始学习函数组件
                </div>
              )}
            </Suspense>
          </ErrorBoundary>
        </div>
      </div>
    </div>
  );
});

/**
 * 🌟 组件导出 🌟
 * 
 * 在React中，组件需要导出才能被其他组件使用
 * 
 * 导出方式：
 * 1. 默认导出（export default）：一个文件只能有一个默认导出
 * 2. 命名导出（export const）：一个文件可以有多个命名导出
 * 
 * 这里使用默认导出，因为App是应用的主组件
 */
export default App;