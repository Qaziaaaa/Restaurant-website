import { useEffect, useState } from 'react';
import { Plus, Pencil, Trash2, Search, Loader2, X, CheckCircle, XCircle } from 'lucide-react';
import { adminApi } from '../../services/adminApi';

const categories = ['STARTER', 'MAIN', 'DESSERT', 'BEVERAGE', 'SIDE', 'COMBO', 'KIDS', 'BOWL'];

const emptyItem = {
  name: '', description: '', price: 0, category: 'MAIN', image: '',
  isAvailable: true, isVeg: false, spicyLevel: 0, rating: 5,
};

export default function MenuPage() {
  const [menu, setMenu] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const [form, setForm] = useState(emptyItem);

  const fetchMenu = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await adminApi.getMenuItems();
      setMenu(Array.isArray(data) ? data : data?.items || []);
    } catch (err: any) {
      setError(err?.message || 'Failed to load menu');
      setMenu([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchMenu(); }, []);

  const toggleAvailability = async (item: any) => {
    try {
      await adminApi.updateMenuItem(item._id, { isAvailable: !item.isAvailable });
      fetchMenu();
    } catch {
      alert('Failed to update availability');
    }
  };

  const openCreate = () => {
    setForm(emptyItem);
    setEditing(null);
    setShowForm(true);
  };

  const openEdit = (item: any) => {
    setForm({
      name: item.name, description: item.description || '', price: item.price,
      category: item.category, image: item.image || '', isAvailable: item.isAvailable ?? true,
      isVeg: item.isVeg || false, spicyLevel: item.spicyLevel || 0, rating: item.rating || 5,
    });
    setEditing(item._id);
    setShowForm(true);
  };

  const handleSave = async () => {
    try {
      if (editing) await adminApi.updateMenuItem(editing, form);
      else await adminApi.createMenuItem(form);
      setShowForm(false);
      fetchMenu();
    } catch {
      alert('Failed to save item');
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete this item?')) return;
    try {
      await adminApi.deleteMenuItem(id);
      fetchMenu();
    } catch {
      alert('Failed to delete item');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-serif font-bold text-ink">Menu Management</h1>
          <p className="text-ink/50 mt-1">Manage your restaurant menu.</p>
        </div>
        <button onClick={openCreate} className="flex items-center space-x-2 bg-primary hover:brightness-110 text-white px-5 py-3 rounded-2xl font-bold text-sm transition-all shadow-lg shadow-primary/20">
          <Plus className="h-4 w-4" />
          <span>Add Item</span>
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-3xl p-5 text-center">
          <p className="text-red-700 font-bold">{error}</p>
          <button onClick={fetchMenu} className="mt-3 text-sm font-bold text-red-600 hover:text-red-800 underline">Try again</button>
        </div>
      )}

      {showForm && (
        <div className="bg-white rounded-3xl p-6 shadow-premium ring-1 ring-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-serif font-bold text-ink">{editing ? 'Edit Item' : 'New Menu Item'}</h3>
            <button onClick={() => setShowForm(false)} className="p-2 hover:bg-gray-100 rounded-xl text-ink/40 hover:text-ink transition-colors"><X className="h-5 w-5" /></button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} placeholder="Item name" className="bg-paper border border-gray-100 rounded-2xl px-4 py-3 text-sm text-ink/80 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-all" />
            <input value={form.price || ''} onChange={(e) => setForm({...form, price: parseFloat(e.target.value) || 0})} type="number" step="0.01" placeholder="Price" className="bg-paper border border-gray-100 rounded-2xl px-4 py-3 text-sm text-ink/80 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-all" />
            <select value={form.category} onChange={(e) => setForm({...form, category: e.target.value})} className="bg-paper border border-gray-100 rounded-2xl px-4 py-3 text-sm text-ink/80 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-all">
              {categories.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
            <input value={form.image} onChange={(e) => setForm({...form, image: e.target.value})} placeholder="Image URL" className="bg-paper border border-gray-100 rounded-2xl px-4 py-3 text-sm text-ink/80 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-all" />
            <textarea value={form.description} onChange={(e) => setForm({...form, description: e.target.value})} placeholder="Description" rows={3} className="bg-paper border border-gray-100 rounded-2xl px-4 py-3 text-sm text-ink/80 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-all md:col-span-2" />
          </div>
          <div className="flex flex-wrap items-center gap-6 mt-4">
            <label className="flex items-center space-x-2 text-sm font-bold text-ink/60">
              <input type="checkbox" checked={form.isAvailable} onChange={(e) => setForm({...form, isAvailable: e.target.checked})} className="rounded border-gray-300 text-primary focus:ring-primary/30" />
              <span>Available</span>
            </label>
            <label className="flex items-center space-x-2 text-sm font-bold text-ink/60">
              <input type="checkbox" checked={form.isVeg} onChange={(e) => setForm({...form, isVeg: e.target.checked})} className="rounded border-gray-300 text-primary focus:ring-primary/30" />
              <span>Vegetarian</span>
            </label>
            <div className="flex items-center space-x-2 text-sm font-bold text-ink/60">
              <span>Spice:</span>
              <select value={form.spicyLevel} onChange={(e) => setForm({...form, spicyLevel: parseInt(e.target.value)})} className="bg-paper border border-gray-100 rounded-xl px-3 py-2 text-ink/80 text-xs outline-none">
                {[0,1,2,3].map((l) => <option key={l} value={l}>{l}</option>)}
              </select>
            </div>
          </div>
          <div className="mt-6 flex justify-end space-x-3">
            <button onClick={() => setShowForm(false)} className="px-6 py-3 text-sm font-bold text-ink/50 hover:text-ink bg-gray-100 hover:bg-gray-200 rounded-2xl transition-all">Cancel</button>
            <button onClick={handleSave} className="px-6 py-3 text-sm font-bold text-white bg-primary hover:brightness-110 rounded-2xl transition-all shadow-lg shadow-primary/20">Save</button>
          </div>
        </div>
      )}

      <div className="bg-white rounded-3xl shadow-premium ring-1 ring-gray-100 overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center p-12"><Loader2 className="h-6 w-6 animate-spin text-primary" /></div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-6 py-4 text-xs font-bold text-ink/40 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-4 text-xs font-bold text-ink/40 uppercase tracking-wider">Category</th>
                    <th className="px-6 py-4 text-xs font-bold text-ink/40 uppercase tracking-wider">Price</th>
                    <th className="px-6 py-4 text-xs font-bold text-ink/40 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-4 text-xs font-bold text-ink/40 uppercase tracking-wider">Rating</th>
                    <th className="px-6 py-4 text-xs font-bold text-ink/40 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {menu.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="px-6 py-12 text-center text-ink/40 font-medium">No menu items yet.</td>
                    </tr>
                  ) : (
                    menu.map((item: any) => (
                      <tr key={item._id} className="hover:bg-gray-50 transition-colors group">
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-3">
                            <div className="h-10 w-10 rounded-2xl bg-paper overflow-hidden flex-shrink-0 ring-1 ring-gray-100">
                              {item.image ? <img src={item.image} alt="" className="h-full w-full object-cover" /> : null}
                            </div>
                            <div>
                              <p className="text-sm font-bold text-ink">{item.name}</p>
                              {item.description && <p className="text-xs text-ink/40 mt-0.5 max-w-[200px] truncate">{item.description}</p>}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-ink/50">{item.category}</td>
                        <td className="px-6 py-4 text-sm font-bold text-ink">${item.price?.toFixed(2)}</td>
                        <td className="px-6 py-4">
                          <button
                            onClick={() => toggleAvailability(item)}
                            className={`inline-flex items-center space-x-1.5 text-xs font-bold px-3 py-1.5 rounded-full transition-all ${
                              item.isAvailable
                                ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200'
                                : 'bg-red-100 text-red-700 hover:bg-red-200'
                            }`}
                          >
                            {item.isAvailable ? <CheckCircle className="h-3 w-3" /> : <XCircle className="h-3 w-3" />}
                            <span>{item.isAvailable ? 'Active' : 'Hidden'}</span>
                          </button>
                        </td>
                        <td className="px-6 py-4 text-sm text-ink/50">{item.rating || '-'}</td>
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-2">
                            <button onClick={() => openEdit(item)} className="p-2 text-ink/30 hover:text-primary hover:bg-primary/10 rounded-xl transition-all" title="Edit"><Pencil className="h-4 w-4" /></button>
                            <button onClick={() => handleDelete(item._id)} className="p-2 text-ink/30 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all" title="Delete"><Trash2 className="h-4 w-4" /></button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
            <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between bg-gray-50/50">
              <p className="text-xs text-ink/40">{menu.length} menu items</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
