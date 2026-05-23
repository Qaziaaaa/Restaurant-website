import { useState } from 'react';
import { motion } from 'motion/react';
import { Package, Clock, ChevronRight, Loader2 } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate, Link } from 'react-router-dom';
import { orderService } from '../services/order.service';
import { useAuthStore } from '../store/useAuthStore';
import { Navbar } from '../components/Navbar';
import { CartDrawer } from '../components/CartDrawer';
import { Footer } from '../components/Footer';
import type { Order } from '../types';

const statusColors: Record<string, string> = {
  PENDING: 'bg-yellow-100 text-yellow-700',
  CONFIRMED: 'bg-blue-100 text-blue-700',
  PREPARING: 'bg-orange-100 text-orange-700',
  READY: 'bg-green-100 text-green-700',
  OUT_FOR_DELIVERY: 'bg-purple-100 text-purple-700',
  DELIVERED: 'bg-green-100 text-green-700',
  CANCELLED: 'bg-red-100 text-red-700',
  REFUNDED: 'bg-gray-100 text-gray-700',
};

export function Orders() {
  const navigate = useNavigate();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { isAuthenticated } = useAuthStore();

  const { data: orders, isLoading } = useQuery({
    queryKey: ['my-orders'],
    queryFn: orderService.getMyOrders,
    enabled: isAuthenticated,
  });

  if (!isAuthenticated) {
    navigate('/login?redirect=/orders');
    return null;
  }

  return (
    <div className="min-h-screen font-sans flex flex-col">
      <Navbar onCartClick={() => setIsCartOpen(true)} />
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

      <main className="flex-grow pt-28 pb-20 px-4 sm:px-6 lg:px-8 bg-paper">
        <div className="max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl font-serif font-bold text-ink mb-2">My Orders</h1>
            <p className="text-ink/60 mb-10">Track and manage your orders.</p>
          </motion.div>

          {isLoading ? (
            <div className="flex justify-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : !orders || orders.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <Package className="w-20 h-20 text-gray-200 mx-auto mb-6" />
              <h2 className="text-2xl font-serif font-bold text-ink mb-3">No orders yet</h2>
              <p className="text-ink/60 mb-8">You haven't placed any orders. Time to explore!</p>
              <Link 
                to="/menu"
                className="bg-primary hover:brightness-110 text-white px-8 py-4 rounded-2xl font-bold shadow-premium hover:shadow-premium-hover transition-all text-sm uppercase tracking-widest inline-block"
              >
                Browse Menu
              </Link>
            </motion.div>
          ) : (
            <div className="space-y-5">
              {orders.map((order: Order, idx: number) => (
                <motion.div
                  key={order._id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  onClick={() => navigate(`/orders/${order._id}`)}
                  className="bg-white rounded-2xl shadow-soft hover:shadow-premium p-6 ring-1 ring-gray-100 cursor-pointer transition-all hover:-translate-y-1 group"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Package className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <p className="font-bold text-ink text-lg">Order #{order.orderNumber}</p>
                        <div className="flex items-center gap-3 mt-1">
                          <span className="text-ink/40 text-xs font-bold flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {new Date(order.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                          </span>
                          <span className="text-ink/40 text-xs">•</span>
                          <span className="text-ink/40 text-xs font-bold">{order.items.length} items</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest ${statusColors[order.orderStatus] || 'bg-gray-100 text-gray-600'}`}>
                        {order.orderStatus.replace(/_/g, ' ')}
                      </span>
                      <span className="font-serif font-bold text-xl text-ink">
                        ${order.pricingBreakdown.total.toFixed(2)}
                      </span>
                      <ChevronRight className="w-5 h-5 text-ink/20 group-hover:text-primary transition-colors" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
