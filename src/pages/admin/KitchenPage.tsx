import { useEffect, useState } from 'react';
import { Clock, ChefHat, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { adminApi } from '../../services/adminApi';

const statusConfig: Record<string, { label: string; color: string; next: string }> = {
  CONFIRMED: { label: 'Confirmed', color: 'bg-blue-100 text-blue-700', next: 'PREPARING' },
  PREPARING: { label: 'Preparing', color: 'bg-primary/10 text-primary', next: 'READY' },
  READY: { label: 'Ready', color: 'bg-emerald-100 text-emerald-700', next: '' },
};

export default function KitchenPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const data = await adminApi.getOrders({ status: 'CONFIRMED,PREPARING,READY', limit: 50 });
      setOrders(data.orders || []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchOrders(); }, []);

  const handleStatusUpdate = async (orderId: string, nextStatus: string) => {
    try {
      await adminApi.updateOrderStatus(orderId, nextStatus);
      fetchOrders();
    } catch {
      alert('Failed to update');
    }
  };

  const sorted = [...orders].sort((a, b) => {
    if (a.orderStatus === 'PREPARING' && b.orderStatus !== 'PREPARING') return -1;
    if (a.orderStatus !== 'PREPARING' && b.orderStatus === 'PREPARING') return 1;
    return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
  });

  if (loading) {
    return <div className="flex items-center justify-center h-64"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-serif font-bold text-ink">Kitchen Display</h1>
          <p className="text-ink/50 mt-1">Real-time order preparation queue.</p>
        </div>
        <div className="flex items-center space-x-2 bg-white rounded-2xl px-4 py-2.5 shadow-soft ring-1 ring-gray-100">
          <Clock className="h-4 w-4 text-primary" />
          <span className="text-sm font-bold text-ink">{new Date().toLocaleTimeString()}</span>
        </div>
      </div>

      {sorted.length === 0 ? (
        <div className="bg-white rounded-3xl shadow-premium ring-1 ring-gray-100 p-16 text-center">
          <CheckCircle className="h-16 w-16 text-green-500/30 mx-auto mb-4" />
          <h3 className="text-xl font-serif font-bold text-ink mb-2">All Caught Up</h3>
          <p className="text-ink/50">No pending orders in the kitchen.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {sorted.map((order: any) => {
            const config = statusConfig[order.orderStatus] || { label: order.orderStatus, color: 'bg-gray-100 text-ink/50', next: '' };
            return (
              <div key={order._id} className={`bg-white rounded-3xl p-6 shadow-premium ring-1 transition-all hover:shadow-premium-hover ${
                order.orderStatus === 'PREPARING' ? 'ring-primary/20' : 'ring-gray-100'
              }`}>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <span className="text-lg font-serif font-bold text-ink">{order.orderNumber}</span>
                  </div>
                  <span className={`text-xs font-bold rounded-full px-3 py-1.5 ${config.color}`}>{config.label}</span>
                </div>

                <div className="space-y-3 mb-6">
                  {order.items?.map((item: any, i: number) => (
                    <div key={i} className="flex items-center justify-between bg-paper rounded-2xl px-4 py-3">
                      <div className="flex items-center space-x-3">
                        <span className="text-sm font-bold text-ink/50">{item.quantity}x</span>
                        <span className="text-sm font-bold text-ink">{item.name || item.menuItem?.name}</span>
                      </div>
                      {item.notes && <span className="text-xs text-amber-600 italic max-w-[120px] truncate">"{item.notes}"</span>}
                    </div>
                  ))}
                </div>

                {order.notes && (
                  <div className="flex items-start space-x-2 mb-4 bg-amber-50 border border-amber-200 rounded-2xl px-4 py-3">
                    <AlertCircle className="h-4 w-4 text-amber-600 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-amber-800">{order.notes}</p>
                  </div>
                )}

                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <span className="text-xs text-ink/40">
                    {new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                  {config.next && (
                    <button
                      onClick={() => handleStatusUpdate(order._id, config.next)}
                      className="flex items-center space-x-2 bg-primary hover:brightness-110 text-white text-sm font-bold px-5 py-2.5 rounded-2xl transition-all shadow-lg shadow-primary/20"
                    >
                      <ChefHat className="h-4 w-4" />
                      <span>Mark {config.next === 'PREPARING' ? 'Preparing' : 'Ready'}</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
