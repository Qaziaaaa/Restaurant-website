import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, ShoppingBag, ChefHat, Menu, Users, BarChart3, Settings, LogOut } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { useAuthStore } from '../../store/useAuthStore';

const cn = (...inputs: any[]) => twMerge(clsx(inputs));

const navigation = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard, roles: ['admin', 'manager', 'chef'] },
  { name: 'Orders', href: '/admin/orders', icon: ShoppingBag, roles: ['admin', 'manager', 'chef'] },
  { name: 'Kitchen', href: '/admin/kitchen', icon: ChefHat, roles: ['admin', 'manager', 'chef'] },
  { name: 'Menu', href: '/admin/menu', icon: Menu, roles: ['admin', 'manager'] },
  { name: 'Staff', href: '/admin/staff', icon: Users, roles: ['admin'] },
  { name: 'Analytics', href: '/admin/analytics', icon: BarChart3, roles: ['admin', 'manager'] },
  { name: 'Settings', href: '/admin/settings', icon: Settings, roles: ['admin', 'manager'] },
];

export function AdminSidebar() {
  const location = useLocation();
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);

  const visibleNav = navigation.filter(
    (item) => user && item.roles.includes(user.role)
  );

  return (
    <div className="hidden lg:flex lg:flex-shrink-0">
      <div className="flex flex-col w-64 bg-white border-r border-gray-200">
        <div className="flex flex-col flex-grow pt-6 pb-4 overflow-y-auto">
          <Link to="/admin" className="flex items-center flex-shrink-0 px-6 mb-8">
            <div className="h-10 w-10 bg-primary text-white rounded-2xl flex items-center justify-center mr-3 shadow-lg shadow-primary/20">
              <span className="font-serif font-bold text-lg">S</span>
            </div>
            <span className="font-serif font-bold text-xl tracking-tight text-ink">
              Admin<span className="text-primary italic">.</span>
            </span>
          </Link>

          <nav className="flex-1 px-4 space-y-1">
            {visibleNav.map((item) => {
              const isActive = location.pathname === item.href ||
                (item.href !== '/admin' && location.pathname.startsWith(item.href));
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={cn(
                    'group flex items-center px-4 py-3 text-sm font-bold rounded-2xl transition-all duration-150',
                    isActive
                      ? 'bg-primary/10 text-primary shadow-soft'
                      : 'text-ink/50 hover:text-ink hover:bg-gray-50'
                  )}
                >
                  <item.icon
                    className={cn(
                      'mr-3 h-5 w-5 flex-shrink-0',
                      isActive ? 'text-primary' : 'text-ink/30 group-hover:text-ink/50'
                    )}
                  />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="flex-shrink-0 flex border-t border-gray-100 p-4">
          <button
            onClick={() => { logout(); window.location.href = '/login'; }}
            className="flex items-center w-full px-4 py-3 text-sm font-bold text-ink/50 rounded-2xl hover:bg-red-50 hover:text-red-500 transition-all"
          >
            <LogOut className="mr-3 h-5 w-5" />
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
}
