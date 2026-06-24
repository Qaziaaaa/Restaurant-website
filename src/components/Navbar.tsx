import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Menu as MenuIcon, X, User } from 'lucide-react';
import { useCartStore } from '../store/useCartStore';
import { useAuthStore } from '../store/useAuthStore';
import { NAV_LINKS } from '../utils/constants';

export function Navbar({ onCartClick }: { onCartClick: () => void }) {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const cartCount = useCartStore((state) => state.getCartCount());
  const { isAuthenticated, user } = useAuthStore();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-200 ${scrolled ? 'bg-white/80 backdrop-blur-xl shadow-premium py-4' : 'bg-transparent py-6'}`} aria-label="Main Navigation">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        {/* Logo */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2 group cursor-pointer"
        >
          <div className="w-12 h-12 bg-primary text-white rounded-2xl flex items-center justify-center font-serif font-bold text-2xl shadow-lg shadow-primary/20 group-hover:rotate-12 transition-transform duration-200">
            S
          </div>
          <span className="font-serif font-bold text-2xl tracking-tight text-ink">
            Savoria<span className="text-primary italic">.</span>
          </span>
        </motion.div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-10">
          {NAV_LINKS.map((link) => (
            <Link 
              key={link.name}
              to={link.href} 
              className="text-ink/60 hover:text-primary font-bold text-sm uppercase tracking-widest transition-all duration-150 relative group"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-150 group-hover:w-full" />
            </Link>
          ))}
        </div>

        {/* Actions */}
        <div className="hidden md:flex items-center gap-6">
          {isAuthenticated && user && ['admin', 'manager', 'chef'].includes(user.role) && (
            <Link
              to="/admin"
              className="flex items-center gap-2 px-4 py-3 bg-primary/10 text-primary rounded-2xl shadow-soft hover:shadow-premium ring-1 ring-primary/20 transition-all text-xs font-bold uppercase tracking-widest hover:bg-primary/20"
            >
              Admin Panel
            </Link>
          )}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate(isAuthenticated ? '/profile' : '/login')}
            className="flex items-center gap-2 px-4 py-3 bg-paper rounded-2xl shadow-soft hover:shadow-premium ring-1 ring-gray-100 transition-all text-ink hover:text-primary"
          >
            <User className="w-5 h-5" />
            <span className="text-xs font-bold uppercase tracking-widest">
              {isAuthenticated ? (user?.role === 'admin' ? 'Admin' : user?.name.split(' ')[0]) : 'Login'}
            </span>
          </motion.button>

          <motion.button 
            aria-label="Open Cart"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onCartClick}
            className="relative text-ink hover:text-primary transition-all p-3 bg-paper rounded-2xl shadow-soft hover:shadow-premium ring-1 ring-gray-100"
          >
            <ShoppingCart className="w-5 h-5" />
            <AnimatePresence>
              {cartCount > 0 && (
                <motion.span 
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  className="absolute -top-1 -right-1 bg-primary text-white text-[9px] w-6 h-6 rounded-full flex items-center justify-center font-black border-2 border-white shadow-lg"
                >
                  {cartCount}
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
          <button className="bg-primary hover:brightness-110 text-white px-8 py-4 rounded-2xl font-bold transition-all duration-150 shadow-premium hover:shadow-premium-hover hover:-translate-y-1 text-sm uppercase tracking-widest">
            Reservation
          </button>
        </div>

        {/* Mobile Toggle */}
        <div className="lg:hidden flex items-center gap-4">
          <button 
            aria-label="Open Cart"
            onClick={onCartClick}
            className="relative text-ink p-3 bg-paper rounded-xl shadow-soft ring-1 ring-gray-100"
          >
            <ShoppingCart className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-primary text-white text-[8px] w-5 h-5 rounded-full flex items-center justify-center font-black border-2 border-white">
                {cartCount}
              </span>
            )}
          </button>
          <button 
            aria-label="Toggle Menu"
            className="text-ink p-2 hover:bg-paper rounded-xl transition-colors" 
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-7 h-7" /> : <MenuIcon className="w-7 h-7" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -20, height: 0 }}
            transition={{ duration: 0.4, ease: "circOut" }}
            className="lg:hidden absolute top-full left-0 w-full bg-white/95 backdrop-blur-xl border-t border-gray-100 shadow-premium py-8 px-6 flex flex-col gap-6 overflow-hidden z-40"
          >
             <motion.button 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                onClick={() => {
                  setIsOpen(false);
                  navigate(isAuthenticated ? '/profile' : '/login');
                }}
                className="flex items-center gap-3 text-2xl font-serif font-bold text-ink hover:text-primary transition-colors py-2"
             >
                <User className="w-6 h-6 text-primary" />
                {isAuthenticated ? 'My Profile' : 'Login / Register'}
             </motion.button>

             {NAV_LINKS.map((link, idx) => (
                <motion.div 
                  key={link.name}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                >
                  <Link
                    to={link.href}
                    onClick={() => setIsOpen(false)} 
                    className="text-2xl font-serif font-bold text-ink hover:text-primary transition-colors py-2 block"
                  >
                    {link.name}
                  </Link>
                </motion.div>
             ))}
              {isAuthenticated && (
               <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
                 <Link
                   to="/orders"
                   onClick={() => setIsOpen(false)}
                   className="text-2xl font-serif font-bold text-ink hover:text-primary transition-colors py-2 block"
                 >
                   My Orders
                 </Link>
               </motion.div>
              )}
              {isAuthenticated && user && ['admin', 'manager', 'chef'].includes(user.role) && (
               <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.35 }}>
                  <Link
                    to="/admin"
                    onClick={() => setIsOpen(false)}
                    className="text-2xl font-serif font-bold text-primary hover:text-primary/80 transition-colors py-2 block"
                  >
                    Admin Panel →
                  </Link>
                </motion.div>
              )}
             <button onClick={() => { setIsOpen(false); navigate('/menu'); }} className="bg-primary hover:brightness-110 text-white px-8 py-4 rounded-2xl font-bold mt-4 w-full transition-all duration-150 shadow-premium hover:shadow-premium-hover hover:-translate-y-1 text-sm uppercase tracking-widest">
              Order Now
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
