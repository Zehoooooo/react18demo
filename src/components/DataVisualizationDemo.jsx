import React, { useState, useMemo } from 'react';
// import { mockProducts, mockOrders, mockStats, mockChartData, mockUsers } from '../mockData';

// const DataVisualizationDemo = () => {
//   const [selectedCategory, setSelectedCategory] = useState('all');
//   const [sortBy, setSortBy] = useState('sales');
//   const [viewMode, setViewMode] = useState('chart');

//   // 计算统计数据
//   const calculatedStats = useMemo(() => {
//     const totalRevenue = mockOrders.reduce((sum, order) => sum + order.totalAmount, 0);
//     const totalOrders = mockOrders.length;
//     const avgOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;
    
//     const categoryStats = mockProducts.reduce((acc, product) => {
//       if (!acc[product.category]) {
//         acc[product.category] = { count: 0, revenue: 0, avgPrice: 0 };
//       }
//       acc[product.category].count++;
//       acc[product.category].revenue += product.price * product.sold;
//       acc[product.category].avgPrice += product.price;
//       return acc;
//     }, {});

//     // 计算平均价格
//     Object.keys(categoryStats).forEach(category => {
//       categoryStats[category].avgPrice = categoryStats[category].avgPrice / categoryStats[category].count;
//     });

//     return { totalRevenue, totalOrders, avgOrderValue, categoryStats };
//   }, []);

//   // 过滤和排序产品
//   const filteredProducts = useMemo(() => {
//     let filtered = selectedCategory === 'all' 
//       ? mockProducts 
//       : mockProducts.filter(p => p.category === selectedCategory);

//     // 排序
//     filtered.sort((a, b) => {
//       switch (sortBy) {
//         case 'sales':
//           return b.sold - a.sold;
//         case 'price':
//           return b.price - a.price;
//         case 'rating':
//           return b.rating - a.rating;
//         case 'name':
//           return a.name.localeCompare(b.name);
//         default:
//           return 0;
//       }
//     });

//     return filtered;
//   }, [selectedCategory, sortBy]);

//   // 订单状态统计
//   const orderStatusStats = useMemo(() => {
//     return mockOrders.reduce((acc, order) => {
//       acc[order.status] = (acc[order.status] || 0) + 1;
//       return acc;
//     }, {});
//   }, []);

//   // 用户活跃度统计
//   const userActivityStats = useMemo(() => {
//     const now = new Date();
//     const activeUsers = mockUsers.filter(user => {
//       const lastLogin = new Date(user.lastLogin);
//       const daysSinceLogin = (now - lastLogin) / (1000 * 60 * 60 * 24);
//       return daysSinceLogin <= 7;
//     });

//     return {
//       total: mockUsers.length,
//       active: activeUsers.length,
//       inactive: mockUsers.length - activeUsers.length,
//       adminCount: mockUsers.filter(u => u.role === 'admin').length,
//       userCount: mockUsers.filter(u => u.role === 'user').length
//     };
//   }, []);

//   const renderSalesChart = () => (
//     <div style={{ padding: '20px', backgroundColor: '#f9f9f9', borderRadius: '6px', marginBottom: '20px' }}>
//       <h3>销售趋势图</h3>
//       <div style={{ height: '300px', position: 'relative' }}>
//         {mockChartData.salesChart.map((item, index) => {
//           const maxSales = Math.max(...mockChartData.salesChart.map(d => d.sales));
//           const height = (item.sales / maxSales) * 200;
//           return (
//             <div key={index} style={{ 
//               display: 'inline-block', 
//               width: '60px', 
//               margin: '0 5px',
//               textAlign: 'center'
//             }}>
//               <div style={{
//                 height: `${height}px`,
//                 backgroundColor: '#667eea',
//                 borderRadius: '4px 4px 0 0',
//                 marginBottom: '5px'
//               }}></div>
//               <div style={{ fontSize: '12px' }}>¥{item.sales}</div>
//               <div style={{ fontSize: '10px', color: '#666' }}>{item.date}</div>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );

//   const renderCategoryChart = () => (
//     <div style={{ padding: '20px', backgroundColor: '#f9f9f9', borderRadius: '6px', marginBottom: '20px' }}>
//       <h3>分类销售占比</h3>
//       <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
//         {mockChartData.categoryChart.map((item, index) => (
//           <div key={index} style={{ textAlign: 'center' }}>
//             <div style={{
//               width: '100px',
//               height: '100px',
//               borderRadius: '50%',
//               backgroundColor: `hsl(${index * 60}, 70%, 60%)`,
//               display: 'flex',
//               alignItems: 'center',
//               justifyContent: 'center',
//               margin: '0 auto 10px',
//               color: 'white',
//               fontSize: '18px',
//               fontWeight: 'bold'
//             }}>
//               {item.percentage}%
//             </div>
//             <div>{item.category}</div>
//             <div style={{ fontSize: '12px', color: '#666' }}>¥{item.sales.toLocaleString()}</div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );

//   const renderProductTable = () => (
//     <div style={{ padding: '20px', backgroundColor: '#f9f9f9', borderRadius: '6px', marginBottom: '20px' }}>
//       <h3>商品数据表</h3>
      
//       {/* 筛选和排序控件 */}
//       <div style={{ marginBottom: '15px', display: 'flex', gap: '10px', alignItems: 'center' }}>
//         <select 
//           value={selectedCategory} 
//           onChange={(e) => setSelectedCategory(e.target.value)}
//           style={{ padding: '5px', borderRadius: '4px' }}
//         >
//           <option value="all">所有分类</option>
//           <option value="electronics">电子产品</option>
//           <option value="clothing">服装</option>
//           <option value="home">家居</option>
//         </select>
        
//         <select 
//           value={sortBy} 
//           onChange={(e) => setSortBy(e.target.value)}
//           style={{ padding: '5px', borderRadius: '4px' }}
//         >
//           <option value="sales">按销量排序</option>
//           <option value="price">按价格排序</option>
//           <option value="rating">按评分排序</option>
//           <option value="name">按名称排序</option>
//         </select>

//         <div>
//           <button 
//             onClick={() => setViewMode('chart')}
//             style={{ 
//               padding: '5px 10px', 
//               backgroundColor: viewMode === 'chart' ? '#667eea' : '#f0f0f0',
//               color: viewMode === 'chart' ? 'white' : 'black',
//               border: 'none',
//               borderRadius: '4px',
//               marginRight: '5px'
//             }}
//           >
//             图表
//           </button>
//           <button 
//             onClick={() => setViewMode('table')}
//             style={{ 
//               padding: '5px 10px', 
//               backgroundColor: viewMode === 'table' ? '#667eea' : '#f0f0f0',
//               color: viewMode === 'table' ? 'white' : 'black',
//               border: 'none',
//               borderRadius: '4px'
//             }}
//           >
//             表格
//           </button>
//         </div>
//       </div>

//       {viewMode === 'table' ? (
//         <table style={{ width: '100%', borderCollapse: 'collapse' }}>
//           <thead>
//             <tr style={{ backgroundColor: '#f0f0f0' }}>
//               <th style={{ padding: '10px', textAlign: 'left', border: '1px solid #ddd' }}>商品名称</th>
//               <th style={{ padding: '10px', textAlign: 'left', border: '1px solid #ddd' }}>价格</th>
//               <th style={{ padding: '10px', textAlign: 'left', border: '1px solid #ddd' }}>销量</th>
//               <th style={{ padding: '10px', textAlign: 'left', border: '1px solid #ddd' }}>评分</th>
//               <th style={{ padding: '10px', textAlign: 'left', border: '1px solid #ddd' }}>库存</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredProducts.map(product => (
//               <tr key={product.id}>
//                 <td style={{ padding: '10px', border: '1px solid #ddd' }}>{product.name}</td>
//                 <td style={{ padding: '10px', border: '1px solid #ddd' }}>¥{product.price}</td>
//                 <td style={{ padding: '10px', border: '1px solid #ddd' }}>{product.sold}</td>
//                 <td style={{ padding: '10px', border: '1px solid #ddd' }}>{product.rating} ⭐</td>
//                 <td style={{ padding: '10px', border: '1px solid #ddd' }}>{product.stock}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       ) : (
//         <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '15px' }}>
//           {filteredProducts.map(product => (
//             <div key={product.id} style={{ 
//               padding: '15px', 
//               backgroundColor: 'white', 
//               borderRadius: '6px',
//               border: '1px solid #ddd'
//             }}>
//               <img src={product.images[0]} alt={product.name} style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '4px' }} />
//               <h4>{product.name}</h4>
//               <p style={{ color: '#e74c3c', fontWeight: 'bold' }}>¥{product.price}</p>
//               <p>销量: {product.sold} | 评分: {product.rating} ⭐</p>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );

//   const renderOrderStats = () => (
//     <div style={{ padding: '20px', backgroundColor: '#f9f9f9', borderRadius: '6px', marginBottom: '20px' }}>
//       <h3>订单状态统计</h3>
//       <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '15px' }}>
//         {Object.entries(orderStatusStats).map(([status, count]) => (
//           <div key={status} style={{ 
//             padding: '15px', 
//             backgroundColor: 'white', 
//             borderRadius: '6px',
//             textAlign: 'center'
//           }}>
//             <div style={{ fontSize: '24px', fontWeight: 'bold', color: getStatusColor(status) }}>
//               {count}
//             </div>
//             <div>{getStatusText(status)}</div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );

//   const renderUserStats = () => (
//     <div style={{ padding: '20px', backgroundColor: '#f9f9f9', borderRadius: '6px', marginBottom: '20px' }}>
//       <h3>用户活跃度统计</h3>
//       <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '15px' }}>
//         <div style={{ padding: '15px', backgroundColor: '#e8f5e8', borderRadius: '6px', textAlign: 'center' }}>
//           <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#4CAF50' }}>
//             {userActivityStats.total}
//           </div>
//           <div>总用户数</div>
//         </div>
//         <div style={{ padding: '15px', backgroundColor: '#fff3cd', borderRadius: '6px', textAlign: 'center' }}>
//           <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#FF9800' }}>
//             {userActivityStats.active}
//           </div>
//           <div>活跃用户</div>
//         </div>
//         <div style={{ padding: '15px', backgroundColor: '#ffe6e6', borderRadius: '6px', textAlign: 'center' }}>
//           <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#F44336' }}>
//             {userActivityStats.inactive}
//           </div>
//           <div>非活跃用户</div>
//         </div>
//         <div style={{ padding: '15px', backgroundColor: '#f0f8ff', borderRadius: '6px', textAlign: 'center' }}>
//           <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#2196F3' }}>
//             {userActivityStats.adminCount}
//           </div>
//           <div>管理员</div>
//         </div>
//       </div>
//     </div>
//   );

//   const renderRevenueStats = () => (
//     <div style={{ padding: '20px', backgroundColor: '#f9f9f9', borderRadius: '6px', marginBottom: '20px' }}>
//       <h3>收入统计</h3>
//       <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
//         <div style={{ padding: '15px', backgroundColor: '#e8f5e8', borderRadius: '6px', textAlign: 'center' }}>
//           <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#4CAF50' }}>
//             ¥{calculatedStats.totalRevenue.toLocaleString()}
//           </div>
//           <div>总收入</div>
//         </div>
//         <div style={{ padding: '15px', backgroundColor: '#fff3cd', borderRadius: '6px', textAlign: 'center' }}>
//           <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#FF9800' }}>
//             {calculatedStats.totalOrders}
//           </div>
//           <div>总订单数</div>
//         </div>
//         <div style={{ padding: '15px', backgroundColor: '#ffe6e6', borderRadius: '6px', textAlign: 'center' }}>
//           <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#F44336' }}>
//             ¥{calculatedStats.avgOrderValue.toFixed(2)}
//           </div>
//           <div>平均订单金额</div>
//         </div>
//       </div>
//     </div>
//   );

//   const getStatusColor = (status) => {
//     const colors = {
//       'completed': '#4CAF50',
//       'shipped': '#2196F3',
//       'processing': '#FF9800',
//       'pending': '#9C27B0',
//       'cancelled': '#F44336'
//     };
//     return colors[status] || '#999';
//   };

//   const getStatusText = (status) => {
//     const texts = {
//       'completed': '已完成',
//       'shipped': '已发货',
//       'processing': '处理中',
//       'pending': '待处理',
//       'cancelled': '已取消'
//     };
//     return texts[status] || status;
//   };

//   return (
//     <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
//       <h2>数据可视化演示</h2>
      
//       {renderRevenueStats()}
//       {renderSalesChart()}
//       {renderCategoryChart()}
//       {renderProductTable()}
//       {renderOrderStats()}
//       {renderUserStats()}

//       {/* 数据摘要 */}
//       <div style={{ padding: '20px', backgroundColor: '#f8f9fa', borderRadius: '6px' }}>
//         <h3>数据摘要</h3>
//         <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
//           <div>
//             <strong>商品统计:</strong>
//             <ul>
//               <li>总商品数: {mockProducts.length}</li>
//               <li>平均价格: ¥{(mockProducts.reduce((sum, p) => sum + p.price, 0) / mockProducts.length).toFixed(2)}</li>
//               <li>总销量: {mockProducts.reduce((sum, p) => sum + p.sold, 0)}</li>
//             </ul>
//           </div>
//           <div>
//             <strong>订单统计:</strong>
//             <ul>
//               <li>总订单数: {mockOrders.length}</li>
//               <li>完成率: {((orderStatusStats.completed || 0) / mockOrders.length * 100).toFixed(1)}%</li>
//               <li>平均订单金额: ¥{calculatedStats.avgOrderValue.toFixed(2)}</li>
//             </ul>
//           </div>
//           <div>
//             <strong>用户统计:</strong>
//             <ul>
//               <li>总用户数: {mockUsers.length}</li>
//               <li>活跃率: {(userActivityStats.active / userActivityStats.total * 100).toFixed(1)}%</li>
//               <li>管理员比例: {(userActivityStats.adminCount / userActivityStats.total * 100).toFixed(1)}%</li>
//             </ul>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };
const DataVisualizationDemo = () => {
    return (
        <div>
            <h1>DataVisualizationDemo</h1>
        </div>
    )
}

export default DataVisualizationDemo;