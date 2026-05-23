import { useState, useEffect } from 'react';
import { 
  Clock, 
  ChefHat, 
  Utensils, 
  AlertCircle,
  Timer,
  Check
} from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

const cn = (...inputs: any[]) => twMerge(clsx(inputs));

const kitchenOrders = [
  { id: '#9281', table: 'T-04', items: [
    { name: 'Margherita Pizza', qty: 2, notes: 'Extra cheese' },
    { name: 'Garlic Knots', qty: 1, notes: null }
  ], timeIn: '14:40', elapsed: 5, priority: 'Normal' },
  { id: '#9282', table: 'T-12', items: [
    { name: 'Pepperoni Pizza', qty: 1, notes: null },
    { name: 'Coke Zero', qty: 3, notes: 'Large' }
  ], timeIn: '14:32', elapsed: 13, priority: 'High' },
  { id: '#9283', table: 'Delivery', items: [
    { name: 'BBQ Wings', qty: 2, notes: 'Spicy' },
    { name: 'Garden Salad', qty: 1, notes: 'No onions' }
  ], timeIn: '14:42', elapsed: 3, priority: 'Normal' },
];

export default function KitchenPage() {
  const [activeTab, setActiveTab] = useState('Current');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="h-12 w-12 bg-emerald-600/10 border border-emerald-600/20 rounded-xl flex items-center justify-center">
            <ChefHat className="h-6 w-6 text-emerald-500" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">Kitchen Display System</h1>
            <p className="text-slate-500">Live preparation queue for active kitchen stations.</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2 bg-slate-900 p-1 rounded-xl border border-slate-800">
          {['Current', 'Preparing', 'Ready'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "px-6 py-2 rounded-lg text-sm font-semibold transition-all",
                activeTab === tab 
                  ? "bg-slate-800 text-white shadow-sm" 
                  : "text-slate-500 hover:text-slate-300"
              )}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Stats Ribbon */}
      <div className="flex space-x-4 overflow-x-auto pb-2">
        {[
          { label: 'Active Orders', value: '12', color: 'text-blue-500' },
          { label: 'Avg Prep Time', value: '18m', color: 'text-emerald-500' },
          { label: 'Critical (>20m)', value: '2', color: 'text-red-500' },
          { label: 'Items in Queue', value: '28', color: 'text-purple-500' },
        ].map((stat) => (
          <div key={stat.label} className="bg-slate-900 border border-slate-800 px-6 py-3 rounded-xl flex-shrink-0">
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">{stat.label}</p>
            <p className={cn("text-xl font-bold mt-0.5", stat.color)}>{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Kitchen Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {kitchenOrders.map((order) => (
          <div key={order.id} className={cn(
            "flex flex-col bg-slate-900 border rounded-2xl overflow-hidden shadow-lg transition-transform hover:scale-[1.02]",
            order.priority === 'High' ? 'border-red-500/30' : 'border-slate-800'
          )}>
            <div className={cn(
              "px-4 py-3 flex items-center justify-between border-b",
              order.priority === 'High' ? 'bg-red-500/10 border-red-500/20' : 'bg-slate-800/50 border-slate-800'
            )}>
              <div className="flex items-center">
                <span className="text-lg font-black text-white mr-2">{order.id}</span>
                <span className={cn(
                  "px-2 py-0.5 rounded text-[10px] font-black uppercase",
                  order.table === 'Delivery' ? 'bg-blue-500/20 text-blue-500' : 'bg-slate-700 text-slate-300'
                )}>{order.table}</span>
              </div>
              <div className={cn(
                "flex items-center text-xs font-bold",
                order.elapsed > 10 ? 'text-red-500' : 'text-emerald-500'
              )}>
                <Timer className="h-3 w-3 mr-1" />
                {order.elapsed}m
              </div>
            </div>

            <div className="p-4 flex-1 space-y-4">
              {order.items.map((item, idx) => (
                <div key={idx} className="flex justify-between items-start group">
                  <div className="flex-1">
                    <p className="text-sm font-bold text-slate-100 group-hover:text-blue-400 transition-colors">
                      <span className="text-blue-500 mr-2">{item.qty}x</span>
                      {item.name}
                    </p>
                    {item.notes && (
                      <p className="text-[11px] font-medium text-amber-500 mt-1 flex items-center italic">
                        <AlertCircle className="h-2.5 w-2.5 mr-1" />
                        {item.notes}
                      </p>
                    )}
                  </div>
                  <button className="h-6 w-6 border border-slate-800 rounded-md flex items-center justify-center hover:bg-emerald-500 hover:border-emerald-500 transition-all group-active:scale-95">
                    <Check className="h-3 w-3 text-transparent group-hover:text-white" />
                  </button>
                </div>
              ))}
            </div>

            <div className="p-3 bg-slate-800/30 border-t border-slate-800 flex space-x-2">
              <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold py-2 rounded-lg transition-colors">
                PREPARING
              </button>
              <button className="px-3 bg-slate-800 hover:bg-slate-700 text-slate-400 rounded-lg transition-colors">
                <AlertCircle className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}

        {/* Add Card Skeleton for empty space */}
        <div className="border-2 border-dashed border-slate-800 rounded-2xl flex flex-col items-center justify-center p-8 text-slate-700">
          <Utensils className="h-8 w-8 mb-2 opacity-20" />
          <p className="text-xs font-medium uppercase tracking-widest opacity-20">Waiting for orders</p>
        </div>
      </div>
    </div>
  );
}
