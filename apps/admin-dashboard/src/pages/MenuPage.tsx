import { useEffect, useState } from 'react';
import { Plus, Search, Edit2, Trash2, Loader2 } from 'lucide-react';
import { adminApi } from '../lib/api';

export default function MenuPage() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    adminApi.getMenuItems().then((data) => {
      setItems(Array.isArray(data) ? data : data?.items || []);
    }).finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="flex items-center justify-center h-64"><Loader2 className="h-8 w-8 animate-spin text-blue-500" /></div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Menu Management</h1>
          <p className="text-slate-500">Configure your products, pricing, and availability.</p>
        </div>
        <button className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-2.5 rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20 active:scale-95">
          <Plus className="h-5 w-5" />
          <span className="font-semibold">Add New Item</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1 space-y-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4 px-2">Categories</h3>
            <div className="space-y-1">
              {['All', ...new Set(items.map((i: any) => i.category?.name || 'Uncategorized'))].map((cat) => (
                <button key={cat} className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-sm font-medium transition-all text-slate-400 hover:bg-slate-800 hover:text-slate-200">
                  <span>{cat}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-3 space-y-4">
          <div className="flex items-center justify-between bg-slate-900 border border-slate-800 p-4 rounded-2xl">
            <div className="flex items-center space-x-2 bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 w-72">
              <Search className="h-4 w-4 text-slate-500" />
              <input type="text" placeholder="Search items..." className="bg-transparent border-none outline-none text-sm text-slate-300 w-full ml-2" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {items.map((item: any) => (
              <div key={item._id} className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden group hover:border-slate-700 transition-all">
                <div className="aspect-video bg-slate-800 relative overflow-hidden flex items-center justify-center">
                  {item.images?.[0] ? (
                    <img src={item.images[0]} alt={item.name} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-slate-600 text-sm">No image</span>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent"></div>
                  <div className="absolute top-3 left-3">
                    <span className={`px-2 py-1 rounded text-[10px] font-black uppercase tracking-wider shadow-sm ${item.availability !== false ? 'bg-emerald-500 text-white' : 'bg-red-500 text-white'}`}>
                      {item.availability !== false ? 'In Stock' : 'Out of Stock'}
                    </span>
                  </div>
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                    <h4 className="text-sm font-bold text-white truncate mr-2">{item.name}</h4>
                    <span className="text-sm font-black text-blue-400">${item.basePrice?.toFixed(2)}</span>
                  </div>
                </div>
                <div className="p-4 flex items-center justify-between border-t border-slate-800">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">{item.category?.name || 'N/A'}</span>
                  <div className="flex space-x-1">
                    <button className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-all">
                      <Edit2 className="h-4 w-4" />
                    </button>
                    <button className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-all">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}