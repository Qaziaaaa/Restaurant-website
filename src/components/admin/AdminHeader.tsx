import { Bell, Search, User } from 'lucide-react';
import { useAuthStore } from '../../store/useAuthStore';

export function AdminHeader() {
  const user = useAuthStore((s) => s.user);

  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 lg:px-8 z-10">
      <div className="flex items-center flex-1">
        <div className="relative w-96 max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-ink/30" />
          <input
            type="text"
            placeholder="Search orders, items, or staff..."
            className="w-full bg-paper border border-gray-100 rounded-2xl py-2.5 pl-11 pr-4 text-sm text-ink/80 placeholder:text-ink/30 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-all"
          />
        </div>
      </div>

      <div className="flex items-center space-x-6">
        <button className="relative p-2 text-ink/40 hover:text-primary transition-colors">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1.5 right-1.5 h-2.5 w-2.5 bg-red-500 rounded-full border-2 border-white"></span>
        </button>

        <div className="h-6 w-px bg-gray-200"></div>

        <div className="flex items-center space-x-3 cursor-pointer group">
          <div className="text-right">
            <p className="text-sm font-bold text-ink leading-tight">{user?.name || 'Admin'}</p>
            <p className="text-xs text-ink/40 capitalize">{user?.role || ''}</p>
          </div>
          <div className="h-10 w-10 rounded-2xl bg-paper border border-gray-100 flex items-center justify-center text-ink/50 group-hover:border-primary/30 group-hover:text-primary transition-all shadow-soft overflow-hidden">
            <User className="h-5 w-5" />
          </div>
        </div>
      </div>
    </header>
  );
}
