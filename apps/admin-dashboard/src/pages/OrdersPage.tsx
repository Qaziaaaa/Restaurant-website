import { useEffect, useState } from 'react';
import { Search, Filter, Eye, Loader2 } from 'lucide-react';
import { adminApi } from '../lib/api';

const statusColors: Record<string, string> = {
  'PENDING': 'bg-amber-500/10 text-amber-500 border-amber-500/20',
  'CONFIRMED': 'bg-blue-500/10 text-blue-500 border-blue-500/20',
  'PREPARING': 'bg-purple-500/10 text-purple-500 border-purple-500/20',
  'READY': 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20',
  'OUT_FOR_DELIVERY': 'bg-indigo-500/10 text-indigo-500 border-indigo-500/20',
  'DELIVERED': 'bg-slate-500/10 text-slate-400 border-slate-500/20',
  'CANCELLED': 'bg-red-500/10 text-red-500 border-red-500/20',
  'REFUNDED': 'bg-pink-500/10 text-pink-500 border-pink-500/20',
};

export default function OrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('');

  const fetchOrders = async (statusFilter = '') => {
    setLoading(true);
    try {
      const params: any = { limit: 50 };
      if (statusFilter) params.status = statusFilter;
      const data = await adminApi.getOrders(params);
      setOrders(data.orders || []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchOrders(); }, []);

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    try {
      await adminApi.updateOrderStatus(orderId, newStatus);
      fetchOrders(filter);
    } catch (err) {
      alert('Failed to update status');
    }
  };

  const filteredOrders = filter
    ? orders.filter((o) => o.orderStatus === filter)
    : orders;

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Order Management</h1>
          <p className="text-slate-500">Track and manage customer orders.</p>
        </div>
      </div>

      <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl flex items-center justify-between">
        <div className="flex items-center space-x-2 bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 w-96">
          <Search className="h-4 w-4 text-slate-500" />
          <input type="text" placeholder="Search by order number..." className="bg-transparent border-none outline-none text-sm text-slate-300 w-full ml-2" />
        </div>
        <div className="flex space-x-1 p-1 bg-slate-950 border border-slate-800 rounded-xl">
          {['', 'PENDING', 'CONFIRMED', 'PREPARING', 'READY', 'DELIVERED'].map((s) => (
            <button
              key={s || 'All'}
              onClick={() => { setFilter(s); fetchOrders(s); }}
              className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all ${filter === s ? 'bg-slate-800 text-white shadow-sm' : 'text-slate-500 hover:text-slate-300'}`}
            >
              {s || 'All'}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center p-12"><Loader2 className="h-6 w-6 animate-spin text-blue-500" /></div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-slate-800/50">
                    <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Order</th>
                    <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Amount</th>
                    <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Items</th>
                    <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Payment</th>
                    <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {filteredOrders.map((order: any) => (
                    <tr key={order._id} className="hover:bg-slate-800/30 transition-colors group">
                      <td className="px-6 py-4">
                        <span className="text-sm font-bold text-white">{order.orderNumber}</span>
                      </td>
                      <td className="px-6 py-4">
                        <select
                          value={order.orderStatus}
                          onChange={(e) => handleStatusChange(order._id, e.target.value)}
                          className={`text-xs font-bold rounded-full px-3 py-1 border ${statusColors[order.orderStatus] || 'bg-slate-800 text-slate-400'} outline-none`}
                        >
                          <option value="PENDING">PENDING</option>
                          <option value="CONFIRMED">CONFIRMED</option>
                          <option value="PREPARING">PREPARING</option>
                          <option value="READY">READY</option>
                          <option value="OUT_FOR_DELIVERY">OUT_FOR_DELIVERY</option>
                          <option value="DELIVERED">DELIVERED</option>
                          <option value="CANCELLED">CANCELLED</option>
                        </select>
                      </td>
                      <td className="px-6 py-4 text-sm font-bold text-slate-200">${order.pricingBreakdown?.total?.toFixed(2)}</td>
                      <td className="px-6 py-4 text-sm text-slate-400">{order.items?.length || 0} items</td>
                      <td className="px-6 py-4 text-sm">
                        <span className={`text-xs font-bold ${order.paymentStatus === 'PAID' ? 'text-green-500' : 'text-amber-500'}`}>
                          {order.paymentStatus}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <button className="p-2 text-slate-400 hover:text-blue-500 hover:bg-blue-500/10 rounded-lg transition-all">
                          <Eye className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="px-6 py-4 border-t border-slate-800 flex items-center justify-between bg-slate-900/50">
              <p className="text-xs text-slate-500">Showing {filteredOrders.length} orders</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}