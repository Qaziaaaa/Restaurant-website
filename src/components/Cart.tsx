import { motion, AnimatePresence } from 'motion/react';
import { X, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Cart({ isOpen, onClose }: CartProps) {
  const { cart, removeFromCart, updateQuantity, totalPrice, clearCart } = useCart();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-ink/40 backdrop-blur-sm z-[60]"
          />

          {/* Cart Sidebar */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-[70] flex flex-col"
          >
            {/* Header */}
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 text-primary rounded-full flex items-center justify-center">
                  <ShoppingBag className="w-5 h-5" />
                </div>
                <h2 className="text-xl font-serif font-bold text-ink">Your Order</h2>
              </div>
              <button
                onClick={onClose}
                className="w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center text-ink transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <div className="w-20 h-20 bg-gray-50 text-gray-300 rounded-full flex items-center justify-center mb-4">
                    <ShoppingBag className="w-10 h-10" />
                  </div>
                  <h3 className="text-lg font-serif font-bold text-ink mb-1">Your cart is empty</h3>
                  <p className="text-ink/50 text-sm mb-6">Looks like you haven't added any delicious food yet.</p>
                  <button
                    onClick={onClose}
                    className="bg-primary text-white px-8 py-3 rounded-full font-medium hover:bg-orange-600 transition-colors shadow-lg shadow-primary/20"
                  >
                    Browse Menu
                  </button>
                </div>
              ) : (
                cart.map((item) => (
                  <motion.div
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    key={item.id}
                    className="flex gap-4"
                  >
                    <div className="w-20 h-20 rounded-2xl overflow-hidden shrink-0 border border-gray-100">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-1">
                        <h4 className="font-bold text-ink leading-tight">{item.name}</h4>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-gray-400 hover:text-red-500 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-primary font-bold mb-3">${item.price.toFixed(2)}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 bg-gray-50 rounded-full px-2 py-1 border border-gray-100">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-6 h-6 rounded-full hover:bg-white flex items-center justify-center text-ink transition-all"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="font-bold text-sm min-w-[1.5rem] text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-6 h-6 rounded-full hover:bg-white flex items-center justify-center text-ink transition-all"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <p className="font-bold text-ink">${(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* Footer */}
            {cart.length > 0 && (
              <div className="p-6 border-t border-gray-100 space-y-4">
                <div className="flex justify-between items-center text-lg">
                  <span className="text-ink/60 font-medium">Subtotal</span>
                  <span className="text-ink font-bold font-serif text-2xl">${totalPrice.toFixed(2)}</span>
                </div>
                <p className="text-xs text-ink/40 text-center">Shipping and taxes calculated at checkout</p>
                <button
                  onClick={() => {
                    alert('Order placed successfully! This is a demo.');
                    clearCart();
                    onClose();
                  }}
                  className="w-full bg-ink hover:bg-gray-800 text-white font-bold py-4 rounded-2xl transition-all shadow-xl flex items-center justify-center gap-3 group"
                >
                  Confirm Order
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <Plus className="w-5 h-5 rotate-45" />
                  </motion.div>
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
