import { useState } from 'react';
import { 
  Plus, 
  Search, 
  MoreVertical, 
  Eye, 
  Edit2, 
  Trash2,
  CheckCircle2,
  XCircle,
  Tag
} from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

const cn = (...inputs: any[]) => twMerge(clsx(inputs));

const menuItems = [
  { id: 1, name: 'Margherita Pizza', category: 'Pizza', price: '$12.00', status: 'In Stock', image: 'pizza1.jpg' },
  { id: 2, name: 'Pepperoni Pizza', category: 'Pizza', price: '$14.00', status: 'In Stock', image: 'pizza2.jpg' },
  { id: 3, name: 'Truffle Pasta', category: 'Pasta', price: '$18.50', status: 'Low Stock', image: 'pasta1.jpg' },
  { id: 4, name: 'Caesar Salad', category: 'Salads', price: '$9.00', status: 'Out of Stock', image: 'salad1.jpg' },
  { id: 5, name: 'Chocolate Lava Cake', category: 'Desserts', price: '$7.50', status: 'In Stock', image: 'cake1.jpg' },
];

export default function MenuPage() {
  const [activeCategory, setActiveCategory] = useState('All');

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
        {/* Left: Categories Sidebar */}
        <div className="lg:col-span-1 space-y-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4 px-2">Categories</h3>
            <div className="space-y-1">
              {['All', 'Pizza', 'Pasta', 'Salads', 'Desserts', 'Beverages'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={cn(
                    "w-full flex items-center justify-between px-3 py-2 rounded-xl text-sm font-medium transition-all",
                    activeCategory === cat 
                      ? "bg-blue-600/10 text-blue-500" 
                      : "text-slate-400 hover:bg-slate-800 hover:text-slate-200"
                  )}
                >
                  <div className="flex items-center">
                    <Tag className="h-4 w-4 mr-2 opacity-50" />
                    {cat}
                  </div>
                  <span className="text-[10px] bg-slate-800 text-slate-500 px-1.5 py-0.5 rounded">12</span>
                </button>
              ))}
            </div>
            <button className="w-full mt-4 flex items-center justify-center space-x-2 py-2 border border-dashed border-slate-800 text-slate-500 rounded-xl hover:border-blue-500 hover:text-blue-500 transition-all text-xs font-bold">
              <Plus className="h-3 w-3" />
              <span>New Category</span>
            </button>
          </div>
        </div>

        {/* Right: Items Grid */}
        <div className="lg:col-span-3 space-y-4">
          <div className="flex items-center justify-between bg-slate-900 border border-slate-800 p-4 rounded-2xl">
            <div className="flex items-center space-x-2 bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 w-72">
              <Search className="h-4 w-4 text-slate-500" />
              <input 
                type="text" 
                placeholder="Search items..." 
                className="bg-transparent border-none outline-none text-sm text-slate-300 w-full ml-2"
              />
            </div>
            <div className="flex space-x-2">
              <select className="bg-slate-950 border border-slate-800 text-slate-300 text-xs rounded-xl px-3 py-2 outline-none">
                <option>Sort by Price</option>
                <option>Sort by Name</option>
                <option>Sort by Popularity</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {menuItems.map((item) => (
              <div key={item.id} className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden group hover:border-slate-700 transition-all">
                <div className="aspect-video bg-slate-800 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent"></div>
                  <div className="absolute top-3 left-3">
                    <span className={cn(
                      "px-2 py-1 rounded text-[10px] font-black uppercase tracking-wider shadow-sm",
                      item.status === 'In Stock' ? 'bg-emerald-500 text-white' : 
                      item.status === 'Low Stock' ? 'bg-amber-500 text-white' : 'bg-red-500 text-white'
                    )}>
                      {item.status}
                    </span>
                  </div>
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                    <h4 className="text-sm font-bold text-white truncate mr-2">{item.name}</h4>
                    <span className="text-sm font-black text-blue-400">{item.price}</span>
                  </div>
                </div>
                
                <div className="p-4 flex items-center justify-between border-t border-slate-800">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">{item.category}</span>
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
            
            {/* Add Item Placeholder */}
            <button className="aspect-video bg-slate-900 border-2 border-dashed border-slate-800 rounded-2xl flex flex-col items-center justify-center text-slate-700 hover:border-blue-500 hover:text-blue-500 transition-all group">
              <Plus className="h-8 w-8 mb-2 opacity-20 group-hover:opacity-100" />
              <p className="text-xs font-black uppercase tracking-widest opacity-20 group-hover:opacity-100">Add Product</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
