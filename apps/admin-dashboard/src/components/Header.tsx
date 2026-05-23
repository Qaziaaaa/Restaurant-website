import { Bell, Search, User } from 'lucide-react';

export default function Header() {
  return (
    <header className="h-16 bg-slate-900 border-b border-slate-800 flex items-center justify-between px-8 z-10">
      <div className="flex items-center flex-1">
        <div className="relative w-96 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
          <input
            type="text"
            placeholder="Search for orders, items, or staff..."
            className="w-full bg-slate-950 border border-slate-800 rounded-full py-1.5 pl-10 pr-4 text-sm text-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600/50 transition-all"
          />
        </div>
      </div>

      <div className="flex items-center space-x-6">
        <button className="relative p-2 text-slate-400 hover:text-white transition-colors">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 bg-red-500 rounded-full border-2 border-slate-900"></span>
        </button>
        
        <div className="h-8 w-px bg-slate-800"></div>
        
        <div className="flex items-center space-x-3 cursor-pointer group">
          <div className="text-right">
            <p className="text-sm font-semibold text-slate-200 leading-tight">Alex Johnson</p>
            <p className="text-xs text-slate-500">Super Admin</p>
          </div>
          <div className="h-9 w-9 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 group-hover:border-blue-500 transition-colors overflow-hidden">
            <User className="h-5 w-5" />
          </div>
        </div>
      </div>
    </header>
  );
}
