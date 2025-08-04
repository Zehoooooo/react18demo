import React, { useEffect } from 'react';
import ReactECharts from 'echarts-for-react';

const PerformanceChart = () => {
  // Generate sample data
  const years = ['19年', '20年', '21年', '22年', '23年', '24年', '25年'];
  
  // Excellent performance percentages for each year
  const excellent = [80, 85, 82, 88, 87, 90, 90];
  
  // Good performance percentages for each year
  const good = [12, 8, 10, 7, 8, 5, 5];
  
  // Pass performance percentages for each year
  const pass = [5, 4, 5, 3, 3, 3, 3];
  
  // Fail performance percentages for each year
  const fail = [3, 3, 3, 2, 2, 2, 2];
  
  // Line chart data - performance rate
  const performanceRate = [35, 45, 40, 47, 47, 55, 56];

  const option = {
    title: {
      text: '日常表现评价',
      left: 'left',
      textStyle: {
        fontSize: 18,
        fontWeight: 'bold'
      }
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    legend: {
      data: ['优秀', '良好', '合格', '不合格', '能行率'],
      bottom: 0
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '12%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: years
    },
    yAxis: [
      {
        type: 'value',
        name: '比例',
        min: 0,
        max: 100,
        interval: 10,
        axisLabel: {
          formatter: '{value}%'
        }
      },
      {
        type: 'value',
        name: '能行率',
        min: 0,
        max: 60,
        interval: 10,
        axisLabel: {
          formatter: '{value}%'
        }
      }
    ],
    series: [
      {
        name: '优秀',
        type: 'bar',
        stack: 'total',
        emphasis: {
          focus: 'series'
        },
        data: excellent,
        color: '#3E78C1'
      },
      {
        name: '良好',
        type: 'bar',
        stack: 'total',
        emphasis: {
          focus: 'series'
        },
        data: good,
        color: '#F79747'
      },
      {
        name: '合格',
        type: 'bar',
        stack: 'total',
        emphasis: {
          focus: 'series'
        },
        data: pass,
        color: '#F7D547'
      },
      {
        name: '不合格',
        type: 'bar',
        stack: 'total',
        emphasis: {
          focus: 'series'
        },
        data: fail,
        color: '#71C36B'
      },
      {
        name: '能行率',
        type: 'line',
        yAxisIndex: 1,
        data: performanceRate,
        smooth: true,
        symbol: 'circle',
        symbolSize: 8,
        lineStyle: {
          width: 3,
          color: '#1EC3B4'
        },
        itemStyle: {
          color: '#1EC3B4'
        }
      }
    ]
  };

  return (
    <div style={{ width: '100%', height: '500px', padding: '20px' }}>
      <ReactECharts 
        option={option} 
        style={{ height: '100%', width: '100%' }}
        opts={{ renderer: 'canvas' }}
      />
    </div>
  );
};

export default PerformanceChart; 