import { useEffect, useState } from 'react';
import { Search, Eye, Loader2 } from 'lucide-react';
import { adminApi } from '../../services/adminApi';

const statusStyles: Record<string, string> = {
  PENDING: 'bg-amber-100 text-amber-700',
  CONFIRMED: 'bg-blue-100 text-blue-700',
  PREPARING: 'bg-primary/10 text-primary',
  READY: 'bg-emerald-100 text-emerald-700',
  OUT_FOR_DELIVERY: 'bg-indigo-100 text-indigo-700',
  DELIVERED: 'bg-gray-100 text-ink/50',
  CANCELLED: 'bg-red-100 text-red-700',
  REFUNDED: 'bg-pink-100 text-pink-700',
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
    } catch {
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchOrders(); }, []);

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    try {
      await adminApi.updateOrderStatus(orderId, newStatus);
      fetchOrders(filter);
    } catch {
      alert('Failed to update status');
    }
  };

  const filteredOrders = filter
    ? orders.filter((o) => o.orderStatus === filter)
    : orders;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-serif font-bold text-ink">Order Management</h1>
        <p className="text-ink/50 mt-1">Track and manage customer orders.</p>
      </div>

      <div className="bg-white rounded-3xl p-5 shadow-premium ring-1 ring-gray-100 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center space-x-3 bg-paper border border-gray-100 rounded-2xl px-4 py-2.5 min-w-[280px]">
          <Search className="h-4 w-4 text-ink/30" />
          <input type="text" placeholder="Search by order number..." className="bg-transparent border-none outline-none text-sm text-ink/80 w-full" />
        </div>
        <div className="flex space-x-1 bg-paper border border-gray-100 rounded-2xl p-1">
          {['', 'PENDING', 'CONFIRMED', 'PREPARING', 'READY', 'DELIVERED'].map((s) => (
            <button
              key={s || 'All'}
              onClick={() => { setFilter(s); fetchOrders(s); }}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${filter === s ? 'bg-white text-primary shadow-soft' : 'text-ink/40 hover:text-ink/70'}`}
            >
              {s || 'All'}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-premium ring-1 ring-gray-100 overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center p-12"><Loader2 className="h-6 w-6 animate-spin text-primary" /></div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-6 py-4 text-xs font-bold text-ink/40 uppercase tracking-wider">Order</th>
                    <th className="px-6 py-4 text-xs font-bold text-ink/40 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-4 text-xs font-bold text-ink/40 uppercase tracking-wider">Amount</th>
                    <th className="px-6 py-4 text-xs font-bold text-ink/40 uppercase tracking-wider">Items</th>
                    <th className="px-6 py-4 text-xs font-bold text-ink/40 uppercase tracking-wider">Payment</th>
                    <th className="px-6 py-4 text-xs font-bold text-ink/40 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredOrders.map((order: any) => (
                    <tr key={order._id} className="hover:bg-gray-50 transition-colors group">
                      <td className="px-6 py-4">
                        <span className="text-sm font-bold text-ink">{order.orderNumber}</span>
                      </td>
                      <td className="px-6 py-4">
                        <select
                          value={order.orderStatus}
                          onChange={(e) => handleStatusChange(order._id, e.target.value)}
                          className={`text-xs font-bold rounded-full px-3 py-1.5 border-0 outline-none ${statusStyles[order.orderStatus] || 'bg-gray-100 text-ink/50'} cursor-pointer`}
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
                      <td className="px-6 py-4 text-sm font-bold text-ink">${order.pricingBreakdown?.total?.toFixed(2)}</td>
                      <td className="px-6 py-4 text-sm text-ink/50">{order.items?.length || 0} items</td>
                      <td className="px-6 py-4 text-sm">
                        <span className={`text-xs font-bold ${order.paymentStatus === 'PAID' ? 'text-green-600' : 'text-amber-600'}`}>
                          {order.paymentStatus}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <button className="p-2 text-ink/30 hover:text-primary hover:bg-primary/10 rounded-xl transition-all">
                          <Eye className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between bg-gray-50/50">
              <p className="text-xs text-ink/40">Showing {filteredOrders.length} orders</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
