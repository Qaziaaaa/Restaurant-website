import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'motion/react';
import { MapPin, CreditCard, ArrowLeft, Loader2, CheckCircle2, Package } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { useCartStore } from '../store/useCartStore';
import { useAuthStore } from '../store/useAuthStore';
import { orderService } from '../services/order.service';
import { Navbar } from '../components/Navbar';
import { CartDrawer } from '../components/CartDrawer';

const addressSchema = z.object({
  street: z.string().min(3, 'Street address is required'),
  city: z.string().min(2, 'City is required'),
  state: z.string().min(2, 'State is required'),
  zipCode: z.string().min(3, 'Zip code is required'),
  country: z.string().min(2, 'Country is required'),
});

type AddressForm = z.infer<typeof addressSchema>;

export function Checkout() {
  const navigate = useNavigate();
  const { cart, clearCart, getCartTotal } = useCartStore();
  const { isAuthenticated } = useAuthStore();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [orderSuccess, setOrderSuccess] = useState<string | null>(null);

  const cartTotal = getCartTotal();
  const tax = cartTotal * 0.1;
  const total = cartTotal + tax;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddressForm>({
    resolver: zodResolver(addressSchema),
    defaultValues: { country: 'US' },
  });

  if (!isAuthenticated) {
    navigate('/login?redirect=/checkout');
    return null;
  }

  if (cart.length === 0 && !orderSuccess) {
    return (
      <div className="min-h-screen font-sans flex flex-col">
        <Navbar onCartClick={() => setIsCartOpen(true)} />
        <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <Package className="w-20 h-20 text-gray-200 mx-auto mb-6" />
            <h2 className="text-3xl font-serif font-bold text-ink mb-3">Your cart is empty</h2>
            <p className="text-ink/60 mb-8">Add some items before checking out.</p>
            <Link 
              to="/menu"
              className="bg-primary hover:brightness-110 text-white px-8 py-4 rounded-2xl font-bold shadow-premium hover:shadow-premium-hover transition-all text-sm uppercase tracking-widest inline-block"
            >
              Browse Menu
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (orderSuccess) {
    return (
      <div className="min-h-screen font-sans flex flex-col">
        <Navbar onCartClick={() => setIsCartOpen(true)} />
        <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
        <div className="flex-grow flex items-center justify-center px-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center max-w-md"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <CheckCircle2 className="w-12 h-12 text-green-600" />
            </motion.div>
            <h2 className="text-4xl font-serif font-bold text-ink mb-3">Order Placed!</h2>
            <p className="text-ink/60 text-lg mb-2">Your order has been successfully placed.</p>
            <p className="text-primary font-bold text-sm uppercase tracking-widest mb-8">Order #{orderSuccess}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => navigate(`/orders`)}
                className="bg-primary hover:brightness-110 text-white px-8 py-4 rounded-2xl font-bold shadow-premium hover:shadow-premium-hover transition-all text-sm uppercase tracking-widest"
              >
                View Orders
              </button>
              <button 
                onClick={() => navigate('/menu')}
                className="bg-gray-50 hover:bg-gray-100 text-ink px-8 py-4 rounded-2xl font-bold transition-all text-sm uppercase tracking-widest ring-1 ring-gray-100"
              >
                Order More
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  const onSubmit = async (addressData: AddressForm) => {
    setIsSubmitting(true);
    setError(null);
    try {
      const orderItems = cart.map((item) => ({
        menuItem: item._id,
        nameSnapshot: item.name,
        quantity: item.quantity,
        priceSnapshot: item.price,
        selectedAddons: [],
        itemTotal: item.price * item.quantity,
      }));

      const order = await orderService.createOrder({
        items: orderItems,
        deliveryAddress: addressData,
      });

      clearCart();
      setOrderSuccess(order.orderNumber);
    } catch (err: any) {
      setError(err.message || 'Failed to place order');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen font-sans flex flex-col bg-paper">
      <Navbar onCartClick={() => setIsCartOpen(true)} />
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

      <main className="flex-grow pt-28 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-ink/60 hover:text-primary font-bold text-sm uppercase tracking-widest mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>

          <h1 className="text-4xl font-serif font-bold text-ink mb-10">Checkout</h1>

          {error && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mb-8 p-4 bg-red-50 text-red-600 rounded-xl text-sm font-medium border border-red-100"
            >
              {error}
            </motion.div>
          )}

          <div className="grid lg:grid-cols-5 gap-10">
            {/* Delivery Address Form */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-3xl shadow-premium p-8 ring-1 ring-gray-100">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <h2 className="text-xl font-serif font-bold text-ink">Delivery Address</h2>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} id="checkout-form" className="space-y-5">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-ink/70 ml-1">Street Address</label>
                    <input 
                      {...register('street')}
                      placeholder="123 Main Street, Apt 4B"
                      className={`w-full px-5 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-primary/20 transition-all outline-none text-ink font-medium ${errors.street ? 'ring-2 ring-red-500/20' : ''}`}
                    />
                    {errors.street && <p className="text-xs text-red-500 ml-1">{errors.street.message}</p>}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-ink/70 ml-1">City</label>
                      <input 
                        {...register('city')}
                        placeholder="New York"
                        className={`w-full px-5 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-primary/20 transition-all outline-none text-ink font-medium ${errors.city ? 'ring-2 ring-red-500/20' : ''}`}
                      />
                      {errors.city && <p className="text-xs text-red-500 ml-1">{errors.city.message}</p>}
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-ink/70 ml-1">State</label>
                      <input 
                        {...register('state')}
                        placeholder="NY"
                        className={`w-full px-5 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-primary/20 transition-all outline-none text-ink font-medium ${errors.state ? 'ring-2 ring-red-500/20' : ''}`}
                      />
                      {errors.state && <p className="text-xs text-red-500 ml-1">{errors.state.message}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-ink/70 ml-1">Zip Code</label>
                      <input 
                        {...register('zipCode')}
                        placeholder="10001"
                        className={`w-full px-5 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-primary/20 transition-all outline-none text-ink font-medium ${errors.zipCode ? 'ring-2 ring-red-500/20' : ''}`}
                      />
                      {errors.zipCode && <p className="text-xs text-red-500 ml-1">{errors.zipCode.message}</p>}
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-ink/70 ml-1">Country</label>
                      <input 
                        {...register('country')}
                        placeholder="US"
                        className={`w-full px-5 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-primary/20 transition-all outline-none text-ink font-medium ${errors.country ? 'ring-2 ring-red-500/20' : ''}`}
                      />
                      {errors.country && <p className="text-xs text-red-500 ml-1">{errors.country.message}</p>}
                    </div>
                  </div>
                </form>
              </div>
            </div>

            {/* Order Summary Sidebar */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-3xl shadow-premium p-8 ring-1 ring-gray-100 sticky top-28">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                    <CreditCard className="w-5 h-5 text-primary" />
                  </div>
                  <h2 className="text-xl font-serif font-bold text-ink">Order Summary</h2>
                </div>

                <div className="space-y-4 mb-8">
                  {cart.map((item) => (
                    <div key={item._id} className="flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=100'; }} />
                        </div>
                        <div>
                          <p className="font-bold text-ink text-sm truncate max-w-[140px]">{item.name}</p>
                          <p className="text-ink/40 text-xs">x{item.quantity}</p>
                        </div>
                      </div>
                      <p className="font-bold text-ink">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  ))}
                </div>

                <div className="space-y-3 pt-6 border-t border-gray-100">
                  <div className="flex justify-between text-sm">
                    <span className="text-ink/50 font-medium">Subtotal</span>
                    <span className="font-bold text-ink">${cartTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-ink/50 font-medium">Tax (10%)</span>
                    <span className="font-bold text-ink">${tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-ink/50 font-medium">Delivery</span>
                    <span className="font-bold text-green-600">Free</span>
                  </div>
                  <div className="flex justify-between pt-4 border-t border-gray-100">
                    <span className="text-xl font-serif font-bold text-ink">Total</span>
                    <span className="text-xl font-serif font-bold text-primary">${total.toFixed(2)}</span>
                  </div>
                </div>

                <button 
                  type="submit"
                  form="checkout-form"
                  disabled={isSubmitting}
                  className="w-full bg-primary hover:brightness-110 text-white font-bold py-4 rounded-2xl shadow-premium hover:shadow-premium-hover hover:-translate-y-0.5 transition-all mt-8 flex items-center justify-center gap-2 disabled:opacity-70 text-sm uppercase tracking-widest"
                >
                  {isSubmitting ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    'Place Order'
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
