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
    { name: 'Menu', href: '#menu' },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-md py-4' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-primary text-white rounded-lg flex items-center justify-center font-serif font-bold text-xl">
            S
          </div>
          <span className="font-serif font-bold text-2xl tracking-tight text-ink">
            Savoria
          </span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a 
              key={link.name}
              href={link.href} 
              className="text-ink/70 hover:text-primary font-medium transition-colors"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Actions */}
        <div className="hidden md:flex items-center gap-6">
          <button 
            onClick={onOpenCart}
            className="relative p-2 text-ink hover:text-primary transition-colors"
          >
            <ShoppingCart className="w-6 h-6" />
            {totalItems > 0 && (
              <span className="absolute top-0 right-0 bg-primary text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold">
                {totalItems}
              </span>
            )}
          </button>
          <button className="bg-primary hover:bg-orange-600 text-white px-6 py-2 rounded-xl font-semibold transition-all">
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
              <span className="absolute top-0 right-0 bg-primary text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
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
        <div className="md:hidden absolute top-full left-0 w-full bg-white border-t border-gray-100 shadow-lg py-6 px-6 flex flex-col gap-4">
           {navLinks.map((link) => (
             <a 
              key={link.name}
              href={link.href} 
              onClick={() => setIsOpen(false)}
              className="block text-ink/80 hover:text-primary font-semibold py-2"
             >
               {link.name}
             </a>
           ))}
           <button className="bg-primary text-white px-6 py-3 rounded-xl font-semibold w-full">
            Book a Table
          </button>
        </div>
      )}
    </nav>
  );
}
