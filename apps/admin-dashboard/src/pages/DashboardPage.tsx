import { 
  TrendingUp, 
  ShoppingBag, 
  Users, 
  DollarSign,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';

const data = [
  { name: '09:00', sales: 400, orders: 24 },
  { name: '10:00', sales: 700, orders: 45 },
  { name: '11:00', sales: 1200, orders: 80 },
  { name: '12:00', sales: 2100, orders: 120 },
  { name: '13:00', sales: 1800, orders: 95 },
  { name: '14:00', sales: 1100, orders: 60 },
  { name: '15:00', sales: 900, orders: 50 },
];

const stats = [
  { name: 'Total Revenue', value: '$12,450.00', change: '+12.5%', trend: 'up', icon: DollarSign },
  { name: 'Total Orders', value: '1,240', change: '+5.2%', trend: 'up', icon: ShoppingBag },
  { name: 'Active Customers', value: '450', change: '-2.4%', trend: 'down', icon: Users },
  { name: 'Avg. Order Value', value: '$24.50', change: '+8.1%', trend: 'up', icon: TrendingUp },
];

export default function DashboardPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Operational Overview</h1>
          <p className="text-slate-500">Real-time performance monitoring across all branches.</p>
        </div>
        <div className="flex space-x-3">
          <select className="bg-slate-900 border border-slate-800 text-slate-300 text-sm rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-600/50 outline-none">
            <option>All Branches</option>
            <option>Downtown</option>
            <option>Brooklyn</option>
          </select>
          <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg px-6 py-2 transition-colors">
            Generate Report
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-sm hover:border-slate-700 transition-colors">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-slate-800 rounded-lg">
                <stat.icon className="h-5 w-5 text-blue-500" />
              </div>
              <div className={`flex items-center text-xs font-medium ${stat.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                {stat.change}
                {stat.trend === 'up' ? <ArrowUpRight className="ml-1 h-3 w-3" /> : <ArrowDownRight className="ml-1 h-3 w-3" />}
              </div>
            </div>
            <p className="text-sm font-medium text-slate-500">{stat.name}</p>
            <p className="text-2xl font-bold text-white mt-1">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 p-6 rounded-2xl">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-lg font-semibold text-white">Sales Performance</h3>
            <div className="flex bg-slate-800 p-1 rounded-lg">
              <button className="px-3 py-1 text-xs font-medium text-white bg-slate-700 rounded-md shadow-sm">Daily</button>
              <button className="px-3 py-1 text-xs font-medium text-slate-400 hover:text-slate-200">Weekly</button>
            </div>
          </div>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis 
                  dataKey="name" 
                  stroke="#64748b" 
                  fontSize={12} 
                  tickLine={false} 
                  axisLine={false} 
                />
                <YAxis 
                  stroke="#64748b" 
                  fontSize={12} 
                  tickLine={false} 
                  axisLine={false} 
                  tickFormatter={(value) => `$${value}`} 
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Area type="monotone" dataKey="sales" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#colorSales)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
          <h3 className="text-lg font-semibold text-white mb-6">Popular Categories</h3>
          <div className="space-y-6">
            {[
              { name: 'Italian Pizza', orders: 420, percent: 85, color: 'bg-blue-500' },
              { name: 'Burgers', orders: 320, percent: 65, color: 'bg-purple-500' },
              { name: 'Sushi Sets', orders: 280, percent: 55, color: 'bg-emerald-500' },
              { name: 'Desserts', orders: 150, percent: 30, color: 'bg-amber-500' },
            ].map((item) => (
              <div key={item.name}>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-slate-300 font-medium">{item.name}</span>
                  <span className="text-slate-500">{item.orders} orders</span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                  <div className={`${item.color} h-full rounded-full transition-all duration-1000`} style={{ width: `${item.percent}%` }}></div>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-10 py-2.5 text-sm font-medium text-blue-500 border border-blue-500/20 rounded-xl hover:bg-blue-500/5 transition-colors">
            View Full Inventory
          </button>
        </div>
      </div>

      {/* Recent Orders Table Placeholder */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-white">Recent Orders</h3>
          <Link to="/orders" className="text-sm font-medium text-blue-500 hover:text-blue-400">View All</Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-800/50">
                <th className="px-6 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">Order ID</th>
                <th className="px-6 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">Customer</th>
                <th className="px-6 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">Total</th>
                <th className="px-6 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {[
                { id: '#ORD-9281', name: 'John Doe', status: 'Delivered', total: '$42.50', time: '12 mins ago' },
                { id: '#ORD-9282', name: 'Jane Smith', status: 'Preparing', total: '$18.20', time: '24 mins ago' },
                { id: '#ORD-9283', name: 'Mike Ross', status: 'Pending', total: '$55.00', time: '35 mins ago' },
              ].map((order) => (
                <tr key={order.id} className="hover:bg-slate-800/30 transition-colors">
                  <td className="px-6 py-4 text-sm font-medium text-slate-300">{order.id}</td>
                  <td className="px-6 py-4 text-sm text-slate-300">{order.name}</td>
                  <td className="px-6 py-4 text-sm">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      order.status === 'Delivered' ? 'bg-green-500/10 text-green-500' : 
                      order.status === 'Preparing' ? 'bg-blue-500/10 text-blue-500' : 'bg-amber-500/10 text-amber-500'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm font-semibold text-slate-300">{order.total}</td>
                  <td className="px-6 py-4 text-sm text-slate-500">{order.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

import { Link } from 'react-router-dom';
