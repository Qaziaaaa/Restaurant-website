import { useEffect, useState } from 'react';
import { ChefHat, Utensils, AlertCircle, Timer, Check, Loader2 } from 'lucide-react';
import { adminApi } from '../lib/api';

export default function KitchenPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('CONFIRMED');

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const data = await adminApi.getOrders({ status: 'CONFIRMED,PREPARING', limit: 50 });
      setOrders(data.orders || []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchOrders(); }, []);

  const handleStatus = async (orderId: string, status: string) => {
    try {
      await adminApi.updateOrderStatus(orderId, status);
      fetchOrders();
    } catch {}
  };

  const filtered = orders.filter((o) => o.orderStatus === activeTab);

  const getElapsed = (createdAt: string) => {
    return Math.floor((Date.now() - new Date(createdAt).getTime()) / 60000);
  };

  if (loading) {
    return <div className="flex items-center justify-center h-64"><Loader2 className="h-8 w-8 animate-spin text-blue-500" /></div>;
  }

  const stats = [
    { label: 'Active Orders', value: orders.filter(o => o.orderStatus === 'PREPARING').length.toString(), color: 'text-blue-500' },
    { label: 'Pending', value: orders.filter(o => o.orderStatus === 'CONFIRMED').length.toString(), color: 'text-amber-500' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="h-12 w-12 bg-emerald-600/10 border border-emerald-600/20 rounded-xl flex items-center justify-center">
            <ChefHat className="h-6 w-6 text-emerald-500" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">Kitchen Display System</h1>
            <p className="text-slate-500">Live preparation queue.</p>
          </div>
        </div>
        <div className="flex items-center space-x-2 bg-slate-900 p-1 rounded-xl border border-slate-800">
          {['CONFIRMED', 'PREPARING'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2 rounded-lg text-sm font-semibold transition-all ${activeTab === tab ? 'bg-slate-800 text-white shadow-sm' : 'text-slate-500 hover:text-slate-300'}`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="flex space-x-4">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-slate-900 border border-slate-800 px-6 py-3 rounded-xl">
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">{stat.label}</p>
            <p className={`text-xl font-bold mt-0.5 ${stat.color}`}>{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filtered.map((order: any) => {
          const elapsed = getElapsed(order.createdAt);
          return (
            <div key={order._id} className={`flex flex-col bg-slate-900 border rounded-2xl overflow-hidden shadow-lg hover:scale-[1.02] transition-transform ${elapsed > 15 ? 'border-red-500/30' : 'border-slate-800'}`}>
              <div className={`px-4 py-3 flex items-center justify-between border-b ${elapsed > 15 ? 'bg-red-500/10 border-red-500/20' : 'bg-slate-800/50 border-slate-800'}`}>
                <span className="text-lg font-black text-white">{order.orderNumber}</span>
                <div className={`flex items-center text-xs font-bold ${elapsed > 10 ? 'text-red-500' : 'text-emerald-500'}`}>
                  <Timer className="h-3 w-3 mr-1" />{elapsed}m
                </div>
              </div>
              <div className="p-4 flex-1 space-y-3">
                {order.items?.map((item: any, idx: number) => (
                  <div key={idx} className="flex justify-between items-start group">
                    <div className="flex-1">
                      <p className="text-sm font-bold text-slate-100">
                        <span className="text-blue-500 mr-2">{item.quantity}x</span>{item.nameSnapshot}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-3 bg-slate-800/30 border-t border-slate-800 flex space-x-2">
                {activeTab === 'CONFIRMED' && (
                  <button onClick={() => handleStatus(order._id, 'PREPARING')} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold py-2 rounded-lg transition-colors">
                    START PREPARING
                  </button>
                )}
                {activeTab === 'PREPARING' && (
                  <button onClick={() => handleStatus(order._id, 'READY')} className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold py-2 rounded-lg transition-colors flex items-center justify-center gap-1">
                    <Check className="h-3 w-3" /> MARK READY
                  </button>
                )}
              </div>
            </div>
          );
        })}
        {filtered.length === 0 && (
          <div className="border-2 border-dashed border-slate-800 rounded-2xl flex flex-col items-center justify-center p-8 text-slate-700 col-span-full">
            <Utensils className="h-8 w-8 mb-2 opacity-20" />
            <p className="text-xs font-medium uppercase tracking-widest opacity-20">Waiting for orders</p>
          </div>
        )}
      </div>
    </div>
  );
}