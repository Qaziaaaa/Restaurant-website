import { useState } from 'react';
import { 
  Search, 
  Filter, 
  ChevronDown, 
  MoreHorizontal, 
  Eye, 
  Clock, 
  CheckCircle2, 
  AlertCircle 
} from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

const cn = (...inputs: any[]) => twMerge(clsx(inputs));

const orders = [
  { id: '#ORD-7291', customer: 'Liam Neeson', type: 'Delivery', items: 3, total: '$45.00', status: 'Pending', time: '14:30' },
  { id: '#ORD-7292', customer: 'Sarah Connor', type: 'Dine-in', items: 2, total: '$28.50', status: 'Confirmed', time: '14:35' },
  { id: '#ORD-7293', customer: 'Bruce Wayne', type: 'Pickup', items: 5, total: '$112.00', status: 'Preparing', time: '14:40' },
  { id: '#ORD-7294', customer: 'Diana Prince', type: 'Delivery', items: 1, total: '$15.00', status: 'Ready', time: '14:42' },
  { id: '#ORD-7295', customer: 'Peter Parker', type: 'Pickup', items: 4, total: '$36.50', status: 'Delivered', time: '14:15' },
];

const statusColors: Record<string, string> = {
  'Pending': 'bg-amber-500/10 text-amber-500 border-amber-500/20',
  'Confirmed': 'bg-blue-500/10 text-blue-500 border-blue-500/20',
  'Preparing': 'bg-purple-500/10 text-purple-500 border-purple-500/20',
  'Ready': 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20',
  'Delivered': 'bg-slate-500/10 text-slate-400 border-slate-500/20',
  'Cancelled': 'bg-red-500/10 text-red-500 border-red-500/20',
};

export default function OrdersPage() {
  const [filterStatus, setFilterStatus] = useState('All');

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Order Management</h1>
          <p className="text-slate-500">Track and manage customer orders across all channels.</p>
        </div>
        <div className="flex space-x-3">
          <button className="flex items-center space-x-2 bg-slate-900 border border-slate-800 text-slate-300 px-4 py-2 rounded-xl hover:bg-slate-800 transition-colors">
            <Filter className="h-4 w-4" />
            <span className="text-sm font-medium">Filters</span>
          </button>
          <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/20">
            <ShoppingBag className="h-4 w-4" />
            <span className="text-sm font-medium">New Manual Order</span>
          </button>
        </div>
      </div>

      {/* Search and Quick Filters */}
      <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl flex items-center justify-between">
        <div className="flex items-center space-x-2 bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 w-96">
          <Search className="h-4 w-4 text-slate-500" />
          <input 
            type="text" 
            placeholder="Search by ID or customer name..." 
            className="bg-transparent border-none outline-none text-sm text-slate-300 w-full ml-2"
          />
        </div>
        
        <div className="flex space-x-1 p-1 bg-slate-950 border border-slate-800 rounded-xl">
          {['All', 'Pending', 'Preparing', 'Ready'].map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={cn(
                "px-4 py-1.5 rounded-lg text-xs font-semibold transition-all",
                filterStatus === status 
                  ? "bg-slate-800 text-white shadow-sm" 
                  : "text-slate-500 hover:text-slate-300"
              )}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-800/50">
                <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Order</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Customer</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Type</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Items</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-slate-800/30 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-white">{order.id}</span>
                      <span className="text-xs text-slate-500 flex items-center mt-1">
                        <Clock className="h-3 w-3 mr-1" /> {order.time}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-slate-300">{order.customer}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs font-medium text-slate-500">{order.type}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={cn(
                      "inline-flex items-center px-3 py-1 rounded-full text-xs font-bold border",
                      statusColors[order.status]
                    )}>
                      <div className={cn(
                        "h-1.5 w-1.5 rounded-full mr-2",
                        order.status === 'Pending' ? 'bg-amber-500' : 
                        order.status === 'Confirmed' ? 'bg-blue-500' : 'bg-green-500'
                      )}></div>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm font-bold text-slate-200">{order.total}</td>
                  <td className="px-6 py-4 text-sm text-slate-400">{order.items} items</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <button className="p-2 text-slate-400 hover:text-blue-500 hover:bg-blue-500/10 rounded-lg transition-all">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-all">
                        <MoreHorizontal className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="px-6 py-4 border-t border-slate-800 flex items-center justify-between bg-slate-900/50">
          <p className="text-xs text-slate-500">Showing 5 of 1,240 orders</p>
          <div className="flex space-x-2">
            <button className="px-3 py-1 text-xs font-medium text-slate-400 border border-slate-800 rounded-lg hover:bg-slate-800 transition-colors disabled:opacity-50" disabled>
              Previous
            </button>
            <button className="px-3 py-1 text-xs font-medium text-slate-200 border border-slate-800 rounded-lg hover:bg-slate-800 transition-colors">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

import { ShoppingBag } from 'lucide-react';
