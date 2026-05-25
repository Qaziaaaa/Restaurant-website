import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Package, MapPin, Clock, Check, Loader2 } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { orderService } from '../services/order.service';
import { useAuthStore } from '../store/useAuthStore';
import { Navbar } from '../components/Navbar';
import { CartDrawer } from '../components/CartDrawer';

const ORDER_STEPS = ['PENDING', 'CONFIRMED', 'PREPARING', 'READY', 'OUT_FOR_DELIVERY', 'DELIVERED'];
const STEP_LABELS: Record<string, string> = {
  PENDING: 'Order Placed',
  CONFIRMED: 'Confirmed',
  PREPARING: 'Preparing',
  READY: 'Ready',
  OUT_FOR_DELIVERY: 'On the Way',
  DELIVERED: 'Delivered',
};

export function OrderDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { isAuthenticated } = useAuthStore();

  const { data: order, isLoading } = useQuery({
    queryKey: ['order', id],
    queryFn: () => orderService.getOrderById(id!),
    enabled: !!id && isAuthenticated,
  });

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return null;
  }

  const currentStepIndex = order ? ORDER_STEPS.indexOf(order.orderStatus) : 0;
  const isCancelled = order?.orderStatus === 'CANCELLED' || order?.orderStatus === 'REFUNDED';

  return (
    <div className="min-h-screen font-sans flex flex-col bg-paper">
      <Navbar onCartClick={() => setIsCartOpen(true)} />
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

      <main className="flex-grow pt-28 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <button 
            onClick={() => navigate('/orders')}
            className="flex items-center gap-2 text-ink/60 hover:text-primary font-bold text-sm uppercase tracking-widest mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Orders
          </button>

          {isLoading ? (
            <div className="flex justify-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : !order ? (
            <div className="text-center py-20">
              <p className="text-2xl font-serif font-bold text-ink">Order not found</p>
            </div>
          ) : (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
              {/* Header */}
              <div className="bg-white rounded-3xl shadow-premium p-8 ring-1 ring-gray-100">
                <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-8">
                  <div>
                    <h1 className="text-3xl font-serif font-bold text-ink">Order #{order.orderNumber}</h1>
                    <p className="text-ink/40 text-sm mt-1 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {new Date(order.createdAt).toLocaleString()}
                    </p>
                  </div>
                  <span className={`px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest ${
                    isCancelled ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
                  }`}>
                    {order.orderStatus.replace(/_/g, ' ')}
                  </span>
                </div>

                {/* Status Timeline */}
                {!isCancelled && (
                  <div className="flex items-center justify-between relative mb-4">
                    <div className="absolute top-5 left-0 right-0 h-0.5 bg-gray-100" />
                    <div 
                      className="absolute top-5 left-0 h-0.5 bg-primary transition-all duration-700" 
                      style={{ width: `${Math.max(0, (currentStepIndex / (ORDER_STEPS.length - 1)) * 100)}%` }}
                    />
                    {ORDER_STEPS.map((step, i) => (
                      <div key={step} className="relative z-10 flex flex-col items-center" style={{ width: '16.66%' }}>
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                          i <= currentStepIndex
                            ? 'bg-primary text-white shadow-lg shadow-primary/20'
                            : 'bg-gray-100 text-ink/30'
                        }`}>
                          {i < currentStepIndex ? <Check className="w-5 h-5" /> : i + 1}
                        </div>
                        <span className={`text-[10px] font-bold uppercase tracking-widest mt-2 text-center ${
                          i <= currentStepIndex ? 'text-primary' : 'text-ink/30'
                        }`}>
                          {STEP_LABELS[step]}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="grid lg:grid-cols-5 gap-8">
                {/* Items */}
                <div className="lg:col-span-3 bg-white rounded-3xl shadow-premium p-8 ring-1 ring-gray-100">
                  <h2 className="text-xl font-serif font-bold text-ink mb-6 flex items-center gap-2">
                    <Package className="w-5 h-5 text-primary" />
                    Order Items
                  </h2>
                  <div className="space-y-4">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="flex justify-between items-center py-3 border-b border-gray-50 last:border-0">
                        <div>
                          <p className="font-bold text-ink">{item.nameSnapshot}</p>
                          <p className="text-ink/40 text-xs">Qty: {item.quantity} × ${item.priceSnapshot.toFixed(2)}</p>
                        </div>
                        <p className="font-serif font-bold text-ink">${item.itemTotal.toFixed(2)}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Summary + Address */}
                <div className="lg:col-span-2 space-y-6">
                  <div className="bg-white rounded-3xl shadow-premium p-8 ring-1 ring-gray-100">
                    <h2 className="text-xl font-serif font-bold text-ink mb-6">Price Summary</h2>
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-ink/50">Subtotal</span>
                        <span className="font-bold">${order.pricingBreakdown.subtotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-ink/50">Tax</span>
                        <span className="font-bold">${order.pricingBreakdown.tax.toFixed(2)}</span>
                      </div>
                      {order.pricingBreakdown.discount > 0 && (
                        <div className="flex justify-between text-sm">
                          <span className="text-ink/50">Discount</span>
                          <span className="font-bold text-green-600">-${order.pricingBreakdown.discount.toFixed(2)}</span>
                        </div>
                      )}
                      <div className="flex justify-between pt-4 border-t border-gray-100">
                        <span className="text-xl font-serif font-bold">Total</span>
                        <span className="text-xl font-serif font-bold text-primary">${order.pricingBreakdown.total.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-3xl shadow-premium p-8 ring-1 ring-gray-100">
                    <h2 className="text-xl font-serif font-bold text-ink mb-4 flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-primary" />
                      Delivery Address
                    </h2>
                    <p className="text-ink/70 leading-relaxed">
                      {order.deliveryAddress.street}<br />
                      {order.deliveryAddress.city}, {order.deliveryAddress.state} {order.deliveryAddress.zipCode}<br />
                      {order.deliveryAddress.country}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </main>
    </div>
  );
}
