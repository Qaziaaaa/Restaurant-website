import { useState, useEffect } from 'react';
import { ShoppingCart, Menu as MenuIcon, X } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface NavbarProps {
  onOpenCart: () => void;
}

export default function Navbar({ onOpenCart }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { totalItems } = useCart();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About Us', href: '#about' },
    { name: 'Menu', href: '#menu' },
    { name: 'Services', href: '#services' },
    { name: 'Chefs', href: '#chefs' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 ${scrolled ? 'bg-white/80 backdrop-blur-xl shadow-lg py-3' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center gap-2 group cursor-pointer">
          <div className="w-11 h-11 bg-primary text-white rounded-2xl flex items-center justify-center font-serif font-bold text-xl rotate-3 group-hover:rotate-0 transition-transform duration-300 shadow-lg shadow-primary/20">
            S
          </div>
          <span className="font-serif font-bold text-2xl tracking-tight text-ink">
            Savoria<span className="text-primary italic">.</span>
          </span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <a 
              key={link.name}
              href={link.href} 
              className="text-ink/70 hover:text-primary font-semibold transition-all hover:translate-y-[-1px] relative after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-primary after:transition-all hover:after:w-full"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Actions */}
        <div className="hidden md:flex items-center gap-6">
          <button 
            onClick={onOpenCart}
            className="relative p-3 rounded-2xl bg-white shadow-sm border border-gray-100 hover:border-primary/30 hover:shadow-md transition-all group"
          >
            <ShoppingCart className="w-6 h-6 text-ink group-hover:text-primary transition-colors" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-primary text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold animate-in fade-in zoom-in duration-300">
                {totalItems}
              </span>
            )}
          </button>
          <button className="bg-ink hover:bg-gray-800 text-white px-7 py-3.5 rounded-2xl font-bold transition-all shadow-xl shadow-ink/10 hover:shadow-ink/20 transform hover:-translate-y-0.5 active:scale-95">
            Book a Table
          </button>
        </div>

        {/* Mobile Toggle */}
        <div className="flex items-center gap-4 md:hidden">
          <button 
            onClick={onOpenCart}
            className="relative p-2 text-ink"
          >
            <ShoppingCart className="w-6 h-6" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-primary text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                {totalItems}
              </span>
            )}
          </button>
          <button className="text-ink" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white/95 backdrop-blur-lg border-t border-gray-100 shadow-2xl py-6 px-6 flex flex-col gap-6 animate-in slide-in-from-top duration-300">
           {navLinks.map((link) => (
             <a 
              key={link.name}
              href={link.href} 
              onClick={() => setIsOpen(false)}
              className="block text-ink/80 hover:text-primary font-bold text-lg py-1 transition-colors"
             >
               {link.name}
             </a>
           ))}
           <button className="bg-primary text-white px-6 py-4 rounded-2xl font-bold mt-2 w-full shadow-lg shadow-primary/20">
            Book a Table
          </button>
        </div>
      )}
    </nav>
  );
}
