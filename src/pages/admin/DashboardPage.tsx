import { useEffect, useState } from 'react';
import { TrendingUp, ShoppingBag, Users, DollarSign, ArrowUpRight, ArrowDownRight, Loader2 } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Link } from 'react-router-dom';
import { adminApi } from '../../services/adminApi';

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
    }).catch(() => {
      // silently handle - UI shows zeros
    }).finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="flex items-center justify-center h-64"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>;
  }

  const statCards = [
    { name: 'Revenue (Month)', value: `$${(stats?.revenue?.thisMonth || 0).toLocaleString()}`, change: '+12.5%', trend: 'up' as const, icon: DollarSign },
    { name: 'Total Orders', value: `${stats?.orderCounts?.total || 0}`, change: '+8.2%', trend: 'up' as const, icon: ShoppingBag },
    { name: 'Orders Today', value: `${stats?.orderCounts?.today || 0}`, change: '-3.1%', trend: 'down' as const, icon: Users },
    { name: 'Avg. Order Value', value: `$${(stats?.averageOrderValue || 0).toFixed(2)}`, change: '+5.7%', trend: 'up' as const, icon: TrendingUp },
  ];

  const chartData = stats?.popularItems?.slice(0, 7).map((item: any, i: number) => ({
    name: item._id?.substring(0, 10) || `Item ${i}`,
    sales: item.revenue || 0,
    orders: item.count || 0,
  })) || [];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-serif font-bold text-ink">Operational Overview</h1>
        <p className="text-ink/50 mt-1">Real-time performance monitoring.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat) => (
          <div key={stat.name} className="bg-white rounded-3xl p-6 shadow-premium ring-1 ring-gray-100 hover:shadow-premium-hover transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-primary/10 rounded-2xl">
                <stat.icon className="h-5 w-5 text-primary" />
              </div>
              <div className={`flex items-center text-xs font-bold ${stat.trend === 'up' ? 'text-green-600' : 'text-red-500'}`}>
                {stat.change}
                {stat.trend === 'up' ? <ArrowUpRight className="ml-1 h-3 w-3" /> : <ArrowDownRight className="ml-1 h-3 w-3" />}
              </div>
            </div>
            <p className="text-sm font-bold text-ink/50">{stat.name}</p>
            <p className="text-2xl font-serif font-bold text-ink mt-1">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-3xl p-6 shadow-premium ring-1 ring-gray-100">
          <h3 className="text-lg font-serif font-bold text-ink mb-8">Popular Items (Revenue)</h3>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#F27D26" stopOpacity={0.15}/>
                    <stop offset="95%" stopColor="#F27D26" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
                <XAxis dataKey="name" stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} />
                <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '16px', boxShadow: '0 20px 40px -15px rgba(0,0,0,0.08)' }} itemStyle={{ color: '#141414' }} />
                <Area type="monotone" dataKey="sales" stroke="#F27D26" strokeWidth={2} fillOpacity={1} fill="url(#colorSales)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-premium ring-1 ring-gray-100">
          <h3 className="text-lg font-serif font-bold text-ink mb-6">Orders by Status</h3>
          <div className="space-y-6">
            {stats?.ordersByStatus && Object.entries(stats.ordersByStatus).map(([status, count]: any) => (
              <div key={status}>
                <div className="flex justify-between text-sm mb-2">
                  <span className="font-bold text-ink/70">{status}</span>
                  <span className="text-ink/40 font-medium">{count} orders</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                  <div className="bg-primary rounded-full h-full" style={{ width: `${Math.min((count / (stats.orderCounts?.total || 1)) * 100, 100)}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-premium ring-1 ring-gray-100 overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
          <h3 className="text-lg font-serif font-bold text-ink">Recent Orders</h3>
          <Link to="/admin/orders" className="text-sm font-bold text-primary hover:text-primary/80 transition-colors">View All</Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-4 text-xs font-bold text-ink/40 uppercase tracking-wider">Order</th>
                <th className="px-6 py-4 text-xs font-bold text-ink/40 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-bold text-ink/40 uppercase tracking-wider">Total</th>
                <th className="px-6 py-4 text-xs font-bold text-ink/40 uppercase tracking-wider">Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {recentOrders.slice(0, 5).map((order: any) => (
                <tr key={order._id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-sm font-bold text-ink">{order.orderNumber}</td>
                  <td className="px-6 py-4 text-sm">
                    <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-bold ${
                      order.orderStatus === 'DELIVERED' ? 'bg-green-100 text-green-700' :
                      order.orderStatus === 'PREPARING' ? 'bg-primary/10 text-primary' : 'bg-amber-100 text-amber-700'
                    }`}>{order.orderStatus}</span>
                  </td>
                  <td className="px-6 py-4 text-sm font-bold text-ink">${order.pricingBreakdown?.total?.toFixed(2)}</td>
                  <td className="px-6 py-4 text-sm text-ink/50">{new Date(order.createdAt).toLocaleTimeString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
