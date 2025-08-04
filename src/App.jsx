import React, { useState } from 'react';
import ExampleHookComponent from './components/ExampleHookComponent';
import HooksDemo from './components/HooksDemo';
import ParentDemo from './components/ParentDemo';
import UseMemoDemo from './components/UseMemoDemo';
import ReduxCounter from './components/ReduxCounter';
import PerformanceChart from './components/PerformanceChart';
import LocalStorageDemo from './components/LocalStorageDemo';
import DebounceDemo from './components/DebounceDemo';
import AsyncDemo from './components/AsyncDemo';
import IntersectionObserverDemo from './components/IntersectionObserverDemo';
import PreviousDemo from './components/PreviousDemo';

function App() {
  const [activeDemo, setActiveDemo] = useState('localStorage');

  const demos = [
    { id: 'localStorage', name: 'useLocalStorage', component: LocalStorageDemo },
    { id: 'debounce', name: 'useDebounce', component: DebounceDemo },
    { id: 'async', name: 'useAsync', component: AsyncDemo },
    { id: 'intersection', name: 'useIntersectionObserver', component: IntersectionObserverDemo },
    { id: 'previous', name: 'usePrevious', component: PreviousDemo },
    { id: 'performance', name: 'Performance Chart', component: PerformanceChart },
    { id: 'redux', name: 'Redux Counter', component: ReduxCounter },
    { id: 'example', name: 'Example Hook', component: ExampleHookComponent },
    { id: 'hooks', name: 'Hooks Demo', component: HooksDemo },
    { id: 'parent', name: 'Parent Demo', component: ParentDemo },
    { id: 'memo', name: 'UseMemo Demo', component: UseMemoDemo },
  ];

  const ActiveComponent = demos.find(demo => demo.id === activeDemo)?.component;

  return (
    <div style={{ minHeight: '100vh', background: '#f8f9fa' }}>
      <div style={{ 
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        padding: '20px',
        marginBottom: '20px'
      }}>
        <h1 style={{ margin: 0, textAlign: 'center' }}>React 18 Hooks Practice</h1>
        <p style={{ textAlign: 'center', margin: '10px 0 0 0', opacity: 0.9 }}>
          高级自定义Hooks用法演示
        </p>
      </div>

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
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
            gap: '10px' 
          }}>
            {demos.map((demo) => (
              <button
                key={demo.id}
                onClick={() => setActiveDemo(demo.id)}
                style={{
                  padding: '10px 15px',
                  backgroundColor: activeDemo === demo.id ? '#667eea' : '#f8f9fa',
                  color: activeDemo === demo.id ? 'white' : '#333',
                  border: '1px solid #ddd',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  fontSize: '14px',
                }}
              >
                {demo.name}
              </button>
            ))}
          </div>
        </div>

        {/* 当前选中的Demo */}
        <div style={{ 
          background: 'white', 
          borderRadius: '8px', 
          padding: '20px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          minHeight: '500px'
        }}>
          {ActiveComponent && <ActiveComponent />}
        </div>
      </div>
    </div>
  );
}

export default App;