import { useState } from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { CartDrawer } from '../components/CartDrawer';
import { HeroSection } from '../features/home/HeroSection';
import { ServicesSection } from '../features/home/ServicesSection';
import { AboutSection } from '../features/home/AboutSection';
import { PopularMenuSection } from '../features/home/PopularMenuSection';
import { ChefsSection } from '../features/home/ChefsSection';
import { TestimonialsSection } from '../features/home/TestimonialsSection';
import { ContactSection } from '../features/home/ContactSection';

export function Home() {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <div className="min-h-screen font-sans selection:bg-orange-500/30 selection:text-ink flex flex-col">
      <Navbar onCartClick={() => setIsCartOpen(true)} />
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      
      <main className="flex-grow">
        <HeroSection />
        <ServicesSection />
        <AboutSection />
        <PopularMenuSection />
        <ChefsSection />
        <TestimonialsSection />
        <ContactSection />
      </main>
      
      <Footer />
    </div>
  );
}
