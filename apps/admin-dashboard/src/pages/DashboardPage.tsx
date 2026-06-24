import { useEffect, useState } from 'react';
import { TrendingUp, ShoppingBag, Users, DollarSign, ArrowUpRight, ArrowDownRight, Loader2 } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Link } from 'react-router-dom';
import { adminApi } from '../lib/api';

export default function DashboardPage() {
  const [stats, setStats] = useState<any>(null);
  const [recentOrders, setRecentOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      adminApi.getDashboardStats(),
      adminApi.getOrders({ limit: 5 }),
    ]).then(([statsData, ordersData]) => {
      setStats(statsData);
      setRecentOrders(ordersData.orders || []);
    }).finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="flex items-center justify-center h-64"><Loader2 className="h-8 w-8 animate-spin text-blue-500" /></div>;
  }

  const statCards = [
    { name: 'Revenue (Month)', value: `$${(stats?.revenue?.thisMonth || 0).toLocaleString()}`, change: '', trend: 'up', icon: DollarSign },
    { name: 'Total Orders', value: `${stats?.orderCounts?.total || 0}`, change: '', trend: 'up', icon: ShoppingBag },
    { name: 'Orders Today', value: `${stats?.orderCounts?.today || 0}`, change: '', trend: 'up', icon: Users },
    { name: 'Avg. Order Value', value: `$${(stats?.averageOrderValue || 0).toFixed(2)}`, change: '', trend: 'up', icon: TrendingUp },
  ];

  const chartData = stats?.popularItems?.slice(0, 7).map((item: any, i: number) => ({
    name: item._id?.substring(0, 10) || `Item ${i}`,
    sales: item.revenue || 0,
    orders: item.count || 0,
  })) || [];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Operational Overview</h1>
          <p className="text-slate-500">Real-time performance monitoring.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat) => (
          <div key={stat.name} className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-sm hover:border-slate-700 transition-colors">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-slate-800 rounded-lg">
                <stat.icon className="h-5 w-5 text-blue-500" />
              </div>
              {stat.change && (
                <div className={`flex items-center text-xs font-medium ${stat.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                  {stat.change}
                  {stat.trend === 'up' ? <ArrowUpRight className="ml-1 h-3 w-3" /> : <ArrowDownRight className="ml-1 h-3 w-3" />}
                </div>
              )}
            </div>
            <p className="text-sm font-medium text-slate-500">{stat.name}</p>
            <p className="text-2xl font-bold text-white mt-1">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 p-6 rounded-2xl">
          <h3 className="text-lg font-semibold text-white mb-8">Popular Items (Revenue)</h3>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px' }} itemStyle={{ color: '#fff' }} />
                <Area type="monotone" dataKey="sales" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#colorSales)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
          <h3 className="text-lg font-semibold text-white mb-6">Orders by Status</h3>
          <div className="space-y-6">
            {stats?.ordersByStatus && Object.entries(stats.ordersByStatus).map(([status, count]: any) => (
              <div key={status}>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-slate-300 font-medium">{status}</span>
                  <span className="text-slate-500">{count} orders</span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                  <div className="bg-blue-500 h-full rounded-full" style={{ width: `${Math.min((count / (stats.orderCounts?.total || 1)) * 100, 100)}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-white">Recent Orders</h3>
          <Link to="/orders" className="text-sm font-medium text-blue-500 hover:text-blue-400">View All</Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-800/50">
                <th className="px-6 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">Order</th>
                <th className="px-6 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">Total</th>
                <th className="px-6 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {recentOrders.slice(0, 5).map((order: any) => (
                <tr key={order._id} className="hover:bg-slate-800/30 transition-colors">
                  <td className="px-6 py-4 text-sm font-medium text-slate-300">{order.orderNumber}</td>
                  <td className="px-6 py-4 text-sm">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      order.orderStatus === 'DELIVERED' ? 'bg-green-500/10 text-green-500' : 
                      order.orderStatus === 'PREPARING' ? 'bg-blue-500/10 text-blue-500' : 'bg-amber-500/10 text-amber-500'
                    }`}>{order.orderStatus}</span>
                  </td>
                  <td className="px-6 py-4 text-sm font-semibold text-slate-300">${order.pricingBreakdown?.total?.toFixed(2)}</td>
                  <td className="px-6 py-4 text-sm text-slate-500">{new Date(order.createdAt).toLocaleTimeString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}