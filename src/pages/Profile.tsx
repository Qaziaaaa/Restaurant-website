import { motion } from 'motion/react';
import { useAuthStore } from '../store/useAuthStore';
import { useNavigate, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { User, Mail, Shield, LogOut, Package, ChevronRight, UtensilsCrossed } from 'lucide-react';
import { orderService } from '../services/order.service';
import { Navbar } from '../components/Navbar';
import { CartDrawer } from '../components/CartDrawer';
import { useState } from 'react';

export function Profile() {
  const { user, logout, isAuthenticated } = useAuthStore();
  const navigate = useNavigate();
  const [isCartOpen, setIsCartOpen] = useState(false);

  const { data: orders } = useQuery({
    queryKey: ['my-orders'],
    queryFn: orderService.getMyOrders,
    enabled: isAuthenticated,
  });

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (!user) {
    navigate('/login');
    return null;
  }

  const totalOrders = orders?.length || 0;
  const totalSpent = orders?.reduce((sum: number, o: any) => sum + (o.pricingBreakdown?.total || 0), 0) || 0;

  return (
    <div className="min-h-screen font-sans flex flex-col">
      <Navbar onCartClick={() => setIsCartOpen(true)} />
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

      <main className="flex-grow pt-28 pb-20 px-4 sm:px-6 lg:px-8 bg-paper">
        <div className="max-w-4xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-3xl shadow-premium overflow-hidden ring-1 ring-gray-100"
          >
            {/* Header/Cover */}
            <div className="h-32 bg-gradient-to-r from-primary/20 to-primary/10 relative">
              <div className="absolute -bottom-12 left-8">
                <div className="w-24 h-24 bg-white rounded-2xl p-1 shadow-lg">
                  <div className="w-full h-full bg-primary text-white rounded-xl flex items-center justify-center font-bold text-3xl">
                    {user.name.charAt(0)}
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-16 pb-8 px-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <h1 className="text-3xl font-serif font-bold text-ink">{user.name}</h1>
                <div className="flex items-center gap-2 text-ink/60 mt-1">
                  <Mail className="w-4 h-4" />
                  <span className="text-sm">{user.email}</span>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                {user.role === 'admin' && (
                  <button 
                    onClick={() => window.open('http://localhost:3001', '_blank')}
                    className="bg-ink text-white px-6 py-3 rounded-xl font-bold text-sm flex items-center gap-2 hover:bg-black transition-all"
                  >
                    <Shield className="w-4 h-4" />
                    Admin Dashboard
                  </button>
                )}
                <button 
                  onClick={handleLogout}
                  className="bg-red-50 text-red-600 px-6 py-3 rounded-xl font-bold text-sm flex items-center gap-2 hover:bg-red-100 transition-all border border-red-100"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 border-t border-gray-100">
              <div className="p-8 border-b md:border-b-0 md:border-r border-gray-100">
                <h3 className="text-xs font-black uppercase tracking-widest text-ink/40 mb-6">Account Stats</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-ink/60">Total Orders</span>
                    <span className="text-sm font-bold text-ink">{totalOrders}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-ink/60">Total Spent</span>
                    <span className="text-sm font-bold text-primary">${totalSpent.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-ink/60">Role</span>
                    <span className="text-xs font-black uppercase tracking-widest px-2 py-1 bg-primary/10 text-primary rounded-full">{user.role}</span>
                  </div>
                </div>
              </div>

              <div className="p-8 col-span-2">
                <h3 className="text-xs font-black uppercase tracking-widest text-ink/40 mb-6">Quick Actions</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Link to="/orders" className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl hover:bg-primary/5 transition-all group">
                    <div className="flex items-center gap-3">
                      <Package className="w-5 h-5 text-primary" />
                      <span className="font-bold text-ink">Order History</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-ink/20 group-hover:text-primary transition-all" />
                  </Link>
                  <Link to="/menu" className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl hover:bg-primary/5 transition-all group">
                    <div className="flex items-center gap-3">
                      <UtensilsCrossed className="w-5 h-5 text-primary" />
                      <span className="font-bold text-ink">Browse Menu</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-ink/20 group-hover:text-primary transition-all" />
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
