import { useState } from 'react';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import About from './components/About';
import PopularMenu from './components/PopularMenu';
import Chefs from './components/Chefs';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Cart from './components/Cart';

export default function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <CartProvider>
      <div className="min-h-screen font-sans selection:bg-primary/30 selection:text-ink overflow-x-hidden">
        <Navbar onOpenCart={() => setIsCartOpen(true)} />
        
        <main>
          <Hero />
          <Services />
          <About />
          <PopularMenu />
          <Chefs />
          <Testimonials />
          <Contact />
        </main>
        
        <Footer />
        
        {/* Shopping Cart Overlay */}
        <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      </div>
    </CartProvider>
  );
}
