import React from 'react';
import {
    mockUsers,
    // mockProducts,
    // mockOrders,
    // mockReviews,
    // mockCart,
    // mockNotifications,
    // mockStats,
    // mockChartData,
    // mockSearchHistory,
    // mockRecommendations,
    // mockCoupons,
    // mockAddresses,
    // mockPaymentMethods,
    // mockShippingInfo
} from '../mockData';

// const MockDataDemo = () => {
//     const [activeTab, setActiveTab] = useState('users');
//     const [searchTerm, setSearchTerm] = useState('');

//     // 过滤数据
//     const filterData = (data, searchTerm) => {
//         if (!searchTerm) return data;
//         return data.filter(item =>
//             Object.values(item).some(value =>
//                 String(value).toLowerCase().includes(searchTerm.toLowerCase())
//             )
//         );
//     };

//     const renderUsers = () => (
//         <div>
//             <h3>用户数据 ({mockUsers.length})</h3>
//             <div style={{ display: 'grid', gap: '10px' }}>
//                 {filterData(mockUsers, searchTerm).map(user => (
//                     <div key={user.id} style={{
//                         padding: '15px',
//                         border: '1px solid #ddd',
//                         borderRadius: '6px',
//                         backgroundColor: '#f9f9f9'
//                     }}>
//                         <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
//                             <img src={user.avatar} alt={user.name} style={{ width: '40px', height: '40px', borderRadius: '50%' }} />
//                             <div>
//                                 <h4>{user.name}</h4>
//                                 <p>{user.email}</p>
//                                 <p>角色: {user.role} | 状态: {user.status}</p>
//                                 <p>部门: {user.department} | 职位: {user.position}</p>
//                             </div>
//                         </div>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );

//     const renderProducts = () => (
//         <div>
//             <h3>商品数据 ({mockProducts.length})</h3>
//             <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '15px' }}>
//                 {filterData(mockProducts, searchTerm).map(product => (
//                     <div key={product.id} style={{
//                         padding: '15px',
//                         border: '1px solid #ddd',
//                         borderRadius: '6px',
//                         backgroundColor: '#f9f9f9'
//                     }}>
//                         <img src={product.images[0]} alt={product.name} style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '4px' }} />
//                         <h4>{product.name}</h4>
//                         <p style={{ color: '#e74c3c', fontSize: '18px', fontWeight: 'bold' }}>
//                             ¥{product.price}
//                             {product.originalPrice > product.price && (
//                                 <span style={{ color: '#999', textDecoration: 'line-through', marginLeft: '10px' }}>
//                                     ¥{product.originalPrice}
//                                 </span>
//                             )}
//                         </p>
//                         <p>评分: {product.rating} ⭐ ({product.reviews} 条评论)</p>
//                         <p>库存: {product.stock} | 已售: {product.sold}</p>
//                         <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap' }}>
//                             {product.tags.map(tag => (
//                                 <span key={tag} style={{
//                                     padding: '2px 8px',
//                                     backgroundColor: '#667eea',
//                                     color: 'white',
//                                     borderRadius: '12px',
//                                     fontSize: '12px'
//                                 }}>
//                                     {tag}
//                                 </span>
//                             ))}
//                         </div>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );

//     const renderOrders = () => (
//         <div>
//             <h3>订单数据 ({mockOrders.length})</h3>
//             <div style={{ display: 'grid', gap: '15px' }}>
//                 {filterData(mockOrders, searchTerm).map(order => (
//                     <div key={order.id} style={{
//                         padding: '15px',
//                         border: '1px solid #ddd',
//                         borderRadius: '6px',
//                         backgroundColor: '#f9f9f9'
//                     }}>
//                         <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//                             <h4>订单号: {order.id}</h4>
//                             <span style={{
//                                 padding: '4px 8px',
//                                 borderRadius: '4px',
//                                 backgroundColor: getStatusColor(order.status),
//                                 color: 'white',
//                                 fontSize: '12px'
//                             }}>
//                                 {getStatusText(order.status)}
//                             </span>
//                         </div>
//                         <p>用户: {order.userName}</p>
//                         <p>总金额: ¥{order.totalAmount}</p>
//                         <p>支付方式: {getPaymentMethodText(order.paymentMethod)}</p>
//                         <p>创建时间: {new Date(order.createdAt).toLocaleString()}</p>
//                         <div>
//                             <strong>商品:</strong>
//                             {order.products.map(product => (
//                                 <div key={product.id} style={{ marginLeft: '20px', fontSize: '14px' }}>
//                                     {product.name} x {product.quantity} = ¥{product.price * product.quantity}
//                                 </div>
//                             ))}
//                         </div>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );

//     const renderStats = () => (
//         <div>
//             <h3>统计数据</h3>
//             <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
//                 <div style={{ padding: '15px', backgroundColor: '#e8f5e8', borderRadius: '6px' }}>
//                     <h4>销售数据</h4>
//                     <p>总销售额: ¥{mockStats.sales.total.toLocaleString()}</p>
//                     <p>今日销售: ¥{mockStats.sales.today.toLocaleString()}</p>
//                     <p>本周销售: ¥{mockStats.sales.week.toLocaleString()}</p>
//                     <p>本月销售: ¥{mockStats.sales.month.toLocaleString()}</p>
//                     <p>增长率: {mockStats.sales.growth}%</p>
//                 </div>
//                 <div style={{ padding: '15px', backgroundColor: '#fff3cd', borderRadius: '6px' }}>
//                     <h4>订单数据</h4>
//                     <p>总订单数: {mockStats.orders.total}</p>
//                     <p>今日订单: {mockStats.orders.today}</p>
//                     <p>本周订单: {mockStats.orders.week}</p>
//                     <p>本月订单: {mockStats.orders.month}</p>
//                     <p>增长率: {mockStats.orders.growth}%</p>
//                 </div>
//                 <div style={{ padding: '15px', backgroundColor: '#ffe6e6', borderRadius: '6px' }}>
//                     <h4>用户数据</h4>
//                     <p>总用户数: {mockStats.users.total}</p>
//                     <p>今日新增: {mockStats.users.today}</p>
//                     <p>本周新增: {mockStats.users.week}</p>
//                     <p>本月新增: {mockStats.users.month}</p>
//                     <p>增长率: {mockStats.users.growth}%</p>
//                 </div>
//                 <div style={{ padding: '15px', backgroundColor: '#f0f8ff', borderRadius: '6px' }}>
//                     <h4>商品数据</h4>
//                     <p>总商品数: {mockStats.products.total}</p>
//                     <p>在售商品: {mockStats.products.active}</p>
//                     <p>库存不足: {mockStats.products.lowStock}</p>
//                     <p>缺货商品: {mockStats.products.outOfStock}</p>
//                 </div>
//             </div>
//         </div>
//     );

//     const renderChartData = () => (
//         <div>
//             <h3>图表数据</h3>
//             <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
//                 <div>
//                     <h4>销售趋势</h4>
//                     <div style={{ height: '200px', backgroundColor: '#f9f9f9', padding: '10px', borderRadius: '4px' }}>
//                         {mockChartData.salesChart.map((item, index) => (
//                             <div key={index} style={{
//                                 display: 'flex',
//                                 justifyContent: 'space-between',
//                                 padding: '5px 0',
//                                 borderBottom: '1px solid #eee'
//                             }}>
//                                 <span>{item.date}</span>
//                                 <span>¥{item.sales.toLocaleString()}</span>
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//                 <div>
//                     <h4>分类销售</h4>
//                     <div style={{ height: '200px', backgroundColor: '#f9f9f9', padding: '10px', borderRadius: '4px' }}>
//                         {mockChartData.categoryChart.map((item, index) => (
//                             <div key={index} style={{
//                                 display: 'flex',
//                                 justifyContent: 'space-between',
//                                 padding: '5px 0',
//                                 borderBottom: '1px solid #eee'
//                             }}>
//                                 <span>{item.category}</span>
//                                 <span>{item.percentage}%</span>
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );

//     const getStatusColor = (status) => {
//         const colors = {
//             'completed': '#4CAF50',
//             'shipped': '#2196F3',
//             'processing': '#FF9800',
//             'pending': '#9C27B0',
//             'cancelled': '#F44336'
//         };
//         return colors[status] || '#999';
//     };

//     const getStatusText = (status) => {
//         const texts = {
//             'completed': '已完成',
//             'shipped': '已发货',
//             'processing': '处理中',
//             'pending': '待处理',
//             'cancelled': '已取消'
//         };
//         return texts[status] || status;
//     };

//     const getPaymentMethodText = (method) => {
//         const texts = {
//             'credit_card': '信用卡',
//             'alipay': '支付宝',
//             'wechat_pay': '微信支付',
//             'bank_transfer': '银行转账'
//         };
//         return texts[method] || method;
//     };

//     const tabs = [
//         { key: 'users', label: '用户数据', count: mockUsers.length },
//         { key: 'products', label: '商品数据', count: mockProducts.length },
//         { key: 'orders', label: '订单数据', count: mockOrders.length },
//         { key: 'stats', label: '统计数据', count: 1 },
//         { key: 'charts', label: '图表数据', count: 1 }
//     ];

//     return (
//         <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
//             <h2>测试数据演示</h2>

//             {/* 搜索框 */}
//             <div style={{ marginBottom: '20px' }}>
//                 <input
//                     type="text"
//                     placeholder="搜索数据..."
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                     style={{
//                         padding: '10px',
//                         width: '300px',
//                         borderRadius: '4px',
//                         border: '1px solid #ddd'
//                     }}
//                 />
//             </div>

//             {/* 标签页 */}
//             <div style={{ marginBottom: '20px' }}>
//                 {tabs.map(tab => (
//                     <button
//                         key={tab.key}
//                         onClick={() => setActiveTab(tab.key)}
//                         style={{
//                             padding: '10px 20px',
//                             marginRight: '10px',
//                             backgroundColor: activeTab === tab.key ? '#667eea' : '#f0f0f0',
//                             color: activeTab === tab.key ? 'white' : 'black',
//                             border: 'none',
//                             borderRadius: '4px',
//                             cursor: 'pointer'
//                         }}
//                     >
//                         {tab.label} ({tab.count})
//                     </button>
//                 ))}
//             </div>

//             {/* 内容区域 */}
//             <div>
//                 {activeTab === 'users' && renderUsers()}
//                 {activeTab === 'products' && renderProducts()}
//                 {activeTab === 'orders' && renderOrders()}
//                 {activeTab === 'stats' && renderStats()}
//                 {activeTab === 'charts' && renderChartData()}
//             </div>

//             {/* 数据概览 */}
//             <div style={{ marginTop: '30px', padding: '15px', backgroundColor: '#f8f9fa', borderRadius: '6px' }}>
//                 <h3>数据概览</h3>
//                 <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '10px' }}>
//                     <div>用户: {mockUsers.length}</div>
//                     <div>商品: {mockProducts.length}</div>
//                     <div>订单: {mockOrders.length}</div>
//                     <div>评论: {mockReviews.length}</div>
//                     <div>购物车: {mockCart.length}</div>
//                     <div>通知: {mockNotifications.length}</div>
//                     <div>优惠券: {mockCoupons.length}</div>
//                     <div>地址: {mockAddresses.length}</div>
//                 </div>
//             </div>
//         </div>
//     );
// };
const MockDataDemo = () => {
    return (
        <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
            <h2>测试数据演示</h2>
            <h3>用户数据 ({mockUsers.length})</h3>
            <div style={{ display: 'grid', gap: '10px' }}>
                {mockUsers.slice(0, 5).map(user => (
                    <div key={user.id} style={{
                        padding: '15px',
                        border: '1px solid #ddd',
                        borderRadius: '6px',
                        backgroundColor: '#f9f9f9'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <img src={user.avatar} alt={user.name} style={{ width: '40px', height: '40px', borderRadius: '50%' }} />
                            <div>
                                <h4>{user.name}</h4>
                                <p>{user.email}</p>
                                <p>角色: {user.role} | 状态: {user.status}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#f8f9fa', borderRadius: '6px' }}>
                <h3>数据概览</h3>
                <p>总用户数: {mockUsers.length}</p>
                <p>这是一个简化版的测试数据演示组件</p>
            </div>
        </div>
    )
}

export default MockDataDemo;