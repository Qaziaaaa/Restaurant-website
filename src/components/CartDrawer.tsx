import { motion, AnimatePresence } from 'motion/react';
import { ShoppingCart, X, Trash2, Minus, Plus, ArrowRight, ShieldCheck } from 'lucide-react';
import { useCartStore } from '../store/useCartStore';
import { useAuthStore } from '../store/useAuthStore';
import { useNavigate } from 'react-router-dom';

export function CartDrawer({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const { cart, removeFromCart, updateQuantity, getCartTotal } = useCartStore();
  const cartTotal = getCartTotal();
  const { isAuthenticated } = useAuthStore();
  const navigate = useNavigate();

  const handleCheckout = () => {
    onClose();
    if (!isAuthenticated) {
      navigate('/login?redirect=/checkout');
    } else {
      navigate('/checkout');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-ink/60 backdrop-blur-md z-[60]"
            aria-hidden="true"
          />
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 h-full w-full sm:max-w-md bg-white z-[70] shadow-premium flex flex-col"
            role="dialog"
            aria-modal="true"
            aria-label="Shopping Cart"
          >
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-paper/50 backdrop-blur-md sticky top-0 z-10">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary text-white rounded-2xl flex items-center justify-center shadow-lg shadow-primary/20">
                  <ShoppingCart className="w-6 h-6" aria-hidden="true" />
                </div>
                <div>
                  <h2 className="text-2xl font-serif font-bold text-ink">Your Cart</h2>
                  <p className="text-[10px] text-ink/40 font-black uppercase tracking-widest">{cart.length} Items Selected</p>
                </div>
              </div>
              <button 
                onClick={onClose} 
                className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 rounded-2xl transition-all text-ink/40 hover:text-ink active:scale-90"
                aria-label="Close Cart"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-8 scroll-smooth">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-6">
                  <motion.div 
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="w-32 h-32 bg-gray-50 rounded-[2.5rem] flex items-center justify-center text-gray-200 border border-gray-100"
                  >
                    <ShoppingCart className="w-16 h-16" />
                  </motion.div>
                  <div className="max-w-xs">
                    <h3 className="text-2xl font-serif font-bold text-ink mb-2">Cart is Empty</h3>
                    <p className="text-ink/60 leading-relaxed font-medium">Looks like you haven't discovered our delicacies yet.</p>
                  </div>
                  <button 
                    onClick={() => { onClose(); navigate('/menu'); }}
                    className="bg-primary hover:brightness-110 text-white px-8 py-4 rounded-2xl font-bold shadow-premium hover:shadow-premium-hover hover:-translate-y-1 transition-all duration-150 text-sm uppercase tracking-widest"
                  >
                    Explore Menu
                  </button>
                </div>
              ) : (
                cart.map((item, idx) => (
                  <motion.div 
                    layout
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    key={item._id}
                    className="flex gap-5 group"
                  >
                    <div className="w-24 h-24 rounded-[1.5rem] overflow-hidden flex-shrink-0 ring-1 ring-gray-100 shadow-soft group-hover:shadow-premium transition-shadow duration-200 bg-gray-100">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        onError={(e) => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=200&h=200&fit=crop'; }}
                      />
                    </div>
                    <div className="flex-1 min-w-0 flex flex-col justify-between py-1">
                      <div>
                        <div className="flex justify-between items-start mb-1">
                          <h4 className="font-bold text-ink truncate pr-2 font-serif text-lg">{item.name}</h4>
                          <button 
                            onClick={() => removeFromCart(item._id)}
                            className="text-gray-300 hover:text-red-500 transition-colors p-1 active:scale-90"
                            aria-label={`Remove ${item.name} from cart`}
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                        <p className="text-primary font-black text-sm uppercase tracking-widest">${item.price.toFixed(2)}</p>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center bg-gray-50 rounded-xl p-1 border border-gray-100">
                          <button 
                            onClick={() => updateQuantity(item._id, item.quantity - 1)}
                            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white hover:shadow-sm transition-all text-ink/40 hover:text-ink"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="w-10 text-center font-black text-sm text-ink" aria-label="Quantity">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item._id, item.quantity + 1)}
                            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white hover:shadow-sm transition-all text-ink/40 hover:text-ink"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                        <p className="font-serif font-bold text-ink">${(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <div className="p-8 bg-paper/80 backdrop-blur-xl border-t border-gray-100 space-y-6">
                <div className="space-y-3">
                  <div className="flex justify-between text-ink/40 font-bold text-[10px] uppercase tracking-[0.2em]">
                    <span>Subtotal</span>
                    <span className="text-ink">${cartTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-ink/40 font-bold text-[10px] uppercase tracking-[0.2em]">
                    <span>Delivery</span>
                    <span className="text-green-600">Free</span>
                  </div>
                  <div className="flex justify-between text-2xl font-serif font-bold text-ink pt-4 border-t border-gray-100">
                    <span>Total</span>
                    <span>${cartTotal.toFixed(2)}</span>
                  </div>
                </div>
                <button 
                  onClick={handleCheckout}
                  className="w-full bg-primary hover:brightness-110 text-white font-bold px-8 py-4 rounded-2xl shadow-premium hover:shadow-premium-hover hover:-translate-y-1 transition-all duration-150 flex items-center justify-center gap-2 group text-sm uppercase tracking-widest"
                >
                  Checkout Now
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                </button>
                <div className="flex items-center justify-center gap-2 opacity-30 grayscale">
                   <ShieldCheck className="w-4 h-4 text-ink" />
                   <p className="text-[10px] font-black uppercase tracking-widest">End-to-End Encrypted</p>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
