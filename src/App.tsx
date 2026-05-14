import { motion, AnimatePresence } from 'motion/react';
import { ShoppingCart, Menu as MenuIcon, X, Star, Clock, Truck, ShieldCheck, ArrowRight, Play, Quote, Plus, Minus, Trash2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { CartProvider, useCart } from './context/CartContext';

function Navbar({ onCartClick }: { onCartClick: () => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { cartCount } = useCart();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center font-serif font-bold text-xl">
            S
          </div>
          <span className="font-serif font-bold text-2xl tracking-tight text-ink">
            Savoria<span className="text-primary">.</span>
          </span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <a href="#home" className="text-ink/80 hover:text-primary font-medium transition-colors">Home</a>
          <a href="#about" className="text-ink/80 hover:text-primary font-medium transition-colors">About Us</a>
          <a href="#menu" className="text-ink/80 hover:text-primary font-medium transition-colors">Menu</a>
          <a href="#services" className="text-ink/80 hover:text-primary font-medium transition-colors">Services</a>
          <a href="#chefs" className="text-ink/80 hover:text-primary font-medium transition-colors">Chefs</a>
          <a href="#contact" className="text-ink/80 hover:text-primary font-medium transition-colors">Contact</a>
        </div>

        {/* Actions */}
        <div className="hidden md:flex items-center gap-6">
          <button 
            onClick={onCartClick}
            className="relative text-ink hover:text-primary transition-colors p-2 hover:bg-gray-100 rounded-full"
          >
            <ShoppingCart className="w-6 h-6" />
            {cartCount > 0 && (
              <motion.span 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute top-0 right-0 bg-primary text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold border-2 border-white"
              >
                {cartCount}
              </motion.span>
            )}
          </button>
          <button className="bg-primary hover:bg-orange-600 text-white px-6 py-2.5 rounded-full font-medium transition-all shadow-lg shadow-primary/30 hover:shadow-primary/50 transform hover:-translate-y-0.5">
            Book a Table
          </button>
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden flex items-center gap-4">
          <button 
            onClick={onCartClick}
            className="relative text-ink p-2"
          >
            <ShoppingCart className="w-6 h-6" />
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 bg-primary text-white text-[8px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                {cartCount}
              </span>
            )}
          </button>
          <button className="text-ink" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden absolute top-full left-0 w-full bg-white border-t border-gray-100 shadow-lg py-4 px-4 flex flex-col gap-4 overflow-hidden"
          >
             <a href="#home" onClick={() => setIsOpen(false)} className="block text-ink hover:text-primary font-medium py-2">Home</a>
             <a href="#about" onClick={() => setIsOpen(false)} className="block text-ink hover:text-primary font-medium py-2">About Us</a>
             <a href="#menu" onClick={() => setIsOpen(false)} className="block text-ink hover:text-primary font-medium py-2">Menu</a>
             <a href="#services" onClick={() => setIsOpen(false)} className="block text-ink hover:text-primary font-medium py-2">Services</a>
             <a href="#chefs" onClick={() => setIsOpen(false)} className="block text-ink hover:text-primary font-medium py-2">Chefs</a>
             <a href="#contact" onClick={() => setIsOpen(false)} className="block text-ink hover:text-primary font-medium py-2">Contact</a>
             <button className="bg-primary text-white px-6 py-3 rounded-full font-medium mt-2 w-full">
              Book a Table
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

function Hero() {
  return (
    <section id="home" className="pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden relative">
      {/* Decorative blobs */}
      <div className="absolute top-20 right-0 w-80 h-80 bg-primary/10 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-0 left-10 w-96 h-96 bg-orange-300/10 rounded-full blur-[120px] -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-16 items-center">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-2xl"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-100 text-primary font-bold text-xs uppercase tracking-widest mb-8 border border-orange-200">
            <span className="flex h-2 w-2 rounded-full bg-primary opacity-75 animate-ping"></span>
            Culinary Excellence
          </div>
          <h1 className="text-6xl lg:text-8xl font-serif font-bold leading-[1.05] mb-8 text-ink">
            Elevate Your <span className="text-primary italic">Palate</span> with Every Bite
          </h1>
          <p className="text-xl text-ink/60 mb-10 max-w-lg leading-relaxed font-medium">
            Experience the art of fine dining delivered to your doorstep. Fresh ingredients, master chefs, and a passion for perfection.
          </p>
          
          <div className="flex flex-wrap items-center gap-6">
            <button className="bg-primary hover:bg-orange-600 text-white px-10 py-5 rounded-full font-bold transition-all shadow-premium hover:shadow-premium-hover flex items-center gap-2 text-lg hover:-translate-y-1">
              Order Now
              <ArrowRight className="w-5 h-5" />
            </button>
            <button className="flex items-center gap-3 px-8 py-5 rounded-full hover:bg-gray-100 transition-all font-bold text-ink group">
              <div className="w-14 h-14 rounded-full bg-white shadow-premium flex items-center justify-center text-primary group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all">
                <Play className="w-5 h-5 ml-1" />
              </div>
              Watch Our Story
            </button>
          </div>

          <div className="mt-16 flex items-center gap-10">
            <div className="flex -space-x-4">
              {[1, 2, 3, 4].map((i) => (
                <img 
                  key={i} 
                  src={`https://i.pravatar.cc/100?img=${i * 10}`} 
                  alt="Customer" 
                  className="w-14 h-14 rounded-full border-4 border-paper object-cover shadow-soft" 
                />
              ))}
            </div>
            <div className="h-10 w-[1px] bg-gray-200" />
            <div>
              <div className="flex items-center gap-1 text-yellow-400 mb-1">
                {[...Array(5)].map((_, i) => <Star key={i} className="fill-current w-5 h-5" />)}
              </div>
              <p className="text-sm font-bold text-ink">
                12k+ <span className="text-ink/50 font-medium">Happy Customers</span>
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
          className="relative lg:ml-auto w-full max-w-xl aspect-square"
        >
          {/* Circular mask for hero image */}
          <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-orange-300/10 rounded-full transform rotate-12 scale-110 blur-2xl" />
          <div className="absolute inset-0 bg-white rounded-full shadow-premium p-6 relative z-10">
            <img 
              src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
              alt="Healthy Food Bowl" 
              className="w-full h-full object-cover rounded-full shadow-inner"
            />
          </div>
          
          {/* Floating badge */}
          <motion.div 
            animate={{ y: [-10, 10, -10] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -bottom-4 -left-4 bg-white/90 backdrop-blur-md p-6 rounded-[2rem] shadow-premium z-20 flex items-center gap-5 border border-white/40"
          >
            <div className="w-14 h-14 bg-orange-50 text-primary rounded-2xl flex items-center justify-center shadow-inner">
              <Clock className="w-7 h-7" />
            </div>
            <div>
              <p className="text-[10px] text-primary font-black uppercase tracking-[0.2em] mb-1">Fast Delivery</p>
              <p className="font-bold text-2xl text-ink">~ 25 Mins</p>
            </div>
          </motion.div>
          
          <motion.div 
            animate={{ y: [10, -10, 10] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-4 -right-4 bg-white/90 backdrop-blur-md p-6 rounded-[2rem] shadow-premium z-20 flex items-center gap-5 border border-white/40"
          >
             <div className="w-14 h-14 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center shadow-inner">
                <ShieldCheck className="w-7 h-7" />
              </div>
              <div>
                <p className="text-[10px] text-green-600 font-black uppercase tracking-[0.2em] mb-1">Freshly Made</p>
                <p className="font-bold text-2xl text-ink">100% Quality</p>
              </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
  );
}

function Services() {
  const services = [
    {
      icon: <Clock className="w-8 h-8" />,
      title: "Fast Delivery",
      description: "We promise to deliver your food within 30 minutes. If not, your meal is on us."
    },
    {
      icon: <ShieldCheck className="w-8 h-8" />,
      title: "Fresh Quality",
      description: "We only use the freshest and finest ingredients for all our delicacies."
    },
    {
      icon: <Truck className="w-8 h-8" />,
      title: "Free Shipping",
      description: "Enjoy free shipping on all orders above $50. No hidden charges applied."
    }
  ];

  return (
    <section id="services" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-primary font-medium tracking-wide uppercase text-sm mb-3">What We Serve</p>
          <h2 className="text-4xl font-serif font-bold text-ink mb-4">Your Favourite Food Delivery Partner</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {services.map((service, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2 }}
              className="text-center p-8 rounded-3xl hover:bg-orange-50/50 transition-colors group cursor-pointer border border-transparent hover:border-orange-100"
            >
              <div className="w-20 h-20 mx-auto bg-orange-100 text-primary rounded-full flex items-center justify-center mb-6 group-hover:-translate-y-2 transition-transform duration-300">
                {service.icon}
              </div>
              <h3 className="text-xl font-bold font-serif mb-3 text-ink">{service.title}</h3>
              <p className="text-ink/70 leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="py-24 bg-paper relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-20 items-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative"
        >
          <div className="relative z-10 rounded-[3rem] overflow-hidden shadow-premium">
            <img 
              src="https://images.unsplash.com/photo-1600891964092-4316c288032e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
              alt="Chef Cooking" 
              className="w-full object-cover aspect-[4/5] hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/20 to-transparent" />
          </div>
          
          <div className="absolute -bottom-10 -right-10 bg-white p-8 rounded-[2.5rem] shadow-premium-hover max-w-xs border border-gray-100 hidden sm:block z-20">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-14 h-14 bg-orange-50 text-primary rounded-2xl flex items-center justify-center">
                <Star className="w-7 h-7 fill-primary" />
              </div>
              <div>
                <h4 className="font-bold text-2xl font-serif text-ink leading-none">15+ Years</h4>
                <p className="text-xs text-primary font-bold uppercase tracking-widest mt-1">Excellence</p>
              </div>
            </div>
            <p className="text-sm text-ink/60 leading-relaxed italic">"Our commitment to quality is what defines every single dish we serve."</p>
          </div>
          
          {/* Decorative shapes */}
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-primary/5 rounded-full blur-3xl" />
        </motion.div>

        <motion.div
           initial={{ opacity: 0, x: 50 }}
           whileInView={{ opacity: 1, x: 0 }}
           viewport={{ once: true }}
           className="lg:pl-10"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 text-primary font-bold text-xs uppercase tracking-widest mb-6 border border-orange-100">
            Our Story
          </div>
          <h2 className="text-4xl lg:text-6xl font-serif font-bold text-ink mb-8 leading-[1.1]">
            We Craft <span className="text-primary italic">Extraordinary</span> Foodie Experiences
          </h2>
          <p className="text-lg text-ink/70 mb-8 leading-relaxed">
            Savoria is more than a restaurant; it's a culinary destination where tradition meets innovation. Our passion for gastronomy is reflected in every meticulously prepared plate.
          </p>

          <div className="grid sm:grid-cols-2 gap-6 mb-12">
             {[
               { title: "Fresh Ingredients", desc: "Locally sourced & premium quality" },
               { title: "Master Chefs", desc: "Culinary experts from around the world" },
               { title: "Elegant Ambiance", desc: "A cozy and unforgettable atmosphere" },
               { title: "Free Delivery", desc: "On all orders above $50" },
             ].map((item, i) => (
                <div key={i} className="flex gap-4 p-4 rounded-2xl hover:bg-white hover:shadow-soft transition-all group">
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-orange-100 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-ink text-sm mb-1">{item.title}</h4>
                    <p className="text-ink/50 text-xs">{item.desc}</p>
                  </div>
                </div>
             ))}
          </div>

          <button className="bg-ink hover:bg-primary text-white px-10 py-5 rounded-full font-bold transition-all shadow-xl hover:-translate-y-1 flex items-center gap-3">
            Discover Our Story
            <ArrowRight className="w-5 h-5" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
  );
}

function PopularMenu() {
  const { addToCart } = useCart();
  const menuItems = [
    {
      id: 1,
      name: "Signature Truffle Burger",
      image: "/menu/burger.png",
      price: "$18.99",
      rating: 5.0,
      category: "Signature"
    },
    {
      id: 2,
      name: "Artisan Margherita",
      image: "/menu/pizza.png",
      price: "$16.50",
      rating: 4.9,
      category: "Stone Baked"
    },
    {
      id: 3,
      name: "Glazed Salmon Bowl",
      image: "/menu/salmon-salad.png",
      price: "$22.00",
      rating: 4.8,
      category: "Healthy"
    },
    {
      id: 4,
      name: "Szechuan Fire Noodles",
      image: "/menu/spicy-noodles.png",
      price: "$15.25",
      rating: 4.7,
      category: "Asian Fusion"
    }
  ];

  return (
    <section id="menu" className="py-24 bg-white relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute top-0 left-0 w-full h-full opacity-[0.02] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#F27D26 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 text-primary font-bold text-xs uppercase tracking-widest mb-4 border border-orange-100"
            >
              Exquisite Selection
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-ink mb-4 leading-tight">
              Curated Culinary <span className="text-primary italic">Excellence</span>
            </h2>
          </div>
          <button className="group flex items-center gap-3 text-ink font-bold hover:text-primary transition-all whitespace-nowrap">
            Explore Full Menu 
            <div className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center group-hover:bg-primary group-hover:border-primary group-hover:text-white transition-all">
              <ArrowRight className="w-5 h-5" />
            </div>
          </button>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {menuItems.map((item, idx) => (
            <motion.div 
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className="group"
            >
              <div className="relative bg-paper rounded-[2.5rem] p-5 transition-all duration-500 shadow-soft hover:shadow-premium-hover border border-gray-50/50 group-hover:-translate-y-2">
                <div className="relative mb-6 overflow-hidden rounded-[2rem] aspect-[4/5] shadow-inner">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest text-ink shadow-sm border border-white/20">
                    {item.category}
                  </div>

                  <motion.button 
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => addToCart(item)}
                    className="absolute bottom-4 right-4 w-12 h-12 bg-primary text-white rounded-2xl flex items-center justify-center shadow-xl opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0"
                  >
                    <Plus className="w-6 h-6" />
                  </motion.button>
                </div>

                <div className="px-2">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-serif font-bold text-xl text-ink leading-tight pr-2 group-hover:text-primary transition-colors">{item.name}</h3>
                    <div className="flex items-center gap-1 text-xs font-bold text-ink/40">
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      {item.rating}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between pt-2 border-t border-gray-50">
                    <span className="font-serif font-bold text-2xl text-ink">{item.price}</span>
                    <div className="flex items-center gap-1 text-[10px] font-bold text-green-600 uppercase tracking-tighter">
                      <Clock className="w-3 h-3" />
                      15-20 min
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  return (
    <section className="py-20 bg-[#FDFDFD] relative overflow-hidden">
      {/* Decorative Blob */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10 transform translate-x-1/2 -translate-y-1/2" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-primary font-medium tracking-wide uppercase text-sm mb-3">Testimonials</p>
          <h2 className="text-4xl font-serif font-bold text-ink mb-4">What Our Customers Say</h2>
        </div>

        <div className="max-w-4xl mx-auto bg-white p-8 md:p-12 rounded-[2.5rem] shadow-xl border border-gray-50 relative">
          <Quote className="absolute top-8 md:top-12 left-8 md:left-12 w-16 h-16 text-primary/10 rotate-180" />
          <div className="relative z-10 flex flex-col items-center text-center">
            <div className="flex gap-1 text-yellow-400 mb-6">
              {[...Array(5)].map((_, i) => <Star key={i} className="fill-current w-6 h-6" />)}
            </div>
            <p className="text-xl md:text-2xl font-serif text-ink leading-relaxed mb-8">
              "The food is absolutely amazing! Delivery was incredibly fast, and the packaging kept everything warm and fresh. Savoria is now my go-to restaurant for authentic and delicious meals."
            </p>
            <div className="flex items-center gap-4">
              <img src="https://i.pravatar.cc/150?img=32" alt="Sarah Johnson" className="w-14 h-14 rounded-full object-cover" />
              <div className="text-left">
                <h4 className="font-bold text-ink">Sarah Johnson</h4>
                <p className="text-sm text-ink/60">Food Enthusiast</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-ink text-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 divide-y divide-white/10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-16">
          
          {/* Brand */}
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center font-serif font-bold text-xl">
                S
              </div>
              <span className="font-serif font-bold text-2xl tracking-tight">
                Savoria<span className="text-primary">.</span>
              </span>
            </div>
            <p className="text-gray-400 leading-relaxed max-w-sm">
              Our job is to fill your tummy with delicious food and with fast and free delivery.
            </p>
            <div className="flex gap-4">
              {['Facebook', 'Twitter', 'Instagram'].map(social => (
                 <button key={social} className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors text-sm">
                   {social[0]}
                 </button>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-bold font-serif text-lg mb-6">About</h4>
            <ul className="space-y-4">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Features</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">News & Blog</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold font-serif text-lg mb-6">Company</h4>
            <ul className="space-y-4">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Why Savoria?</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Partner With Us</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">FAQ</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold font-serif text-lg mb-6">Get in Touch</h4>
            <ul className="space-y-4 text-gray-400">
              <li>123 Main Street, New York, NY 10001</li>
              <li>contact@savoria.com</li>
              <li>+1 (555) 123-4567</li>
            </ul>
          </div>

        </div>

        <div className="pt-8 text-center md:flex md:justify-between md:text-left text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} Savoria. All rights reserved.</p>
          <div className="space-x-4 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function Chefs() {
  const chefs = [
    {
      id: 1,
      name: "Alessandro Romano",
      role: "Head Chef",
      image: "/chefs/italian-chef.png",
      nationality: "Italian"
    },
    {
      id: 2,
      name: "Li Wei",
      role: "Executive Chef",
      image: "/chefs/chinese-chef.png",
      nationality: "Chinese"
    },
    {
      id: 3,
      name: "Kenji Tanaka",
      role: "Sushi Master",
      image: "/chefs/japanese-chef.png",
      nationality: "Japanese"
    },
    {
      id: 4,
      name: "Ji-Soo Kim",
      role: "Pastry Specialist",
      image: "/chefs/korean-chef.png",
      nationality: "Korean"
    }
  ];

  return (
    <section id="chefs" className="py-20 bg-paper">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-primary font-medium tracking-wide uppercase text-sm mb-3">Our Team</p>
          <h2 className="text-4xl font-serif font-bold text-ink mb-4">Meet Our Master Chefs</h2>
          <p className="text-ink/60">Our diverse team of culinary experts brings flavors from across the globe to your table.</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {chefs.map((chef, idx) => (
            <motion.div 
              key={chef.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group text-center"
            >
              <div className="relative mb-6 overflow-hidden rounded-[2.5rem] aspect-[4/5] shadow-2xl ring-1 ring-black/5">
                <img 
                  src={chef.image} 
                  alt={chef.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent opacity-0 group-hover:opacity-60 transition-opacity duration-500" />
                
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                  <div className="flex gap-4">
                    {['Facebook', 'Twitter', 'Instagram'].map(social => (
                      <button key={social} className="w-10 h-10 rounded-full bg-white text-primary hover:bg-primary hover:text-white flex items-center justify-center transition-all duration-300 shadow-xl hover:-translate-y-1">
                        {social[0]}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <h3 className="font-serif font-bold text-2xl text-ink mb-1 group-hover:text-primary transition-colors">{chef.name}</h3>
              <div className="flex items-center justify-center gap-2 mb-2">
                <span className="w-8 h-[1px] bg-primary/30"></span>
                <p className="text-primary font-semibold text-sm uppercase tracking-wider">{chef.role}</p>
                <span className="w-8 h-[1px] bg-primary/30"></span>
              </div>
              <p className="text-ink/40 text-xs font-bold tracking-[0.2em] uppercase">{chef.nationality}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-primary font-medium tracking-wide uppercase text-sm mb-3">Contact Us</p>
          <h2 className="text-4xl font-serif font-bold text-ink mb-4">Get In Touch With Us</h2>
          <p className="text-ink/70">Have a question or want to book a table? Send us a message and we'll get back to you as soon as possible.</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-paper p-8 rounded-3xl border border-gray-100 shadow-sm"
          >
            <form className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-ink mb-2">Your Name</label>
                  <input type="text" id="name" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary bg-white transition-colors" placeholder="John Doe" />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-ink mb-2">Email Address</label>
                  <input type="email" id="email" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary bg-white transition-colors" placeholder="john@example.com" />
                </div>
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-ink mb-2">Subject</label>
                <input type="text" id="subject" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary bg-white transition-colors" placeholder="How can we help?" />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-ink mb-2">Message</label>
                <textarea id="message" rows={4} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary bg-white transition-colors resize-none" placeholder="Type your message here..."></textarea>
              </div>
              <button type="button" className="w-full bg-primary hover:bg-orange-600 text-white font-medium py-4 rounded-xl transition-colors shadow-lg shadow-primary/20">
                Send Message
              </button>
            </form>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-orange-50 text-primary rounded-full flex items-center justify-center shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <h3 className="font-serif font-bold text-xl text-ink mb-2">Our Location</h3>
                <p className="text-ink/70">123 Culinary Avenue, Food District<br/>New York, NY 10001</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-orange-50 text-primary rounded-full flex items-center justify-center shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div>
                <h3 className="font-serif font-bold text-xl text-ink mb-2">Call Us</h3>
                <p className="text-ink/70">+1 (555) 123-4567<br/>+1 (555) 987-6543</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-orange-50 text-primary rounded-full flex items-center justify-center shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h3 className="font-serif font-bold text-xl text-ink mb-2">Email Us</h3>
                <p className="text-ink/70">hello@savoria.com<br/>reservations@savoria.com</p>
              </div>
            </div>
            
            <div className="pt-4">
              <h3 className="font-serif font-bold text-xl text-ink mb-4">Opening Hours</h3>
              <div className="space-y-2 text-ink/70">
                <div className="flex justify-between"><span>Monday - Friday</span> <span>9:00 AM - 10:00 PM</span></div>
                <div className="flex justify-between"><span>Saturday</span> <span>10:00 AM - 11:00 PM</span></div>
                <div className="flex justify-between"><span>Sunday</span> <span>10:00 AM - 9:00 PM</span></div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function CartDrawer({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const { cart, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const handleOrder = () => {
    setIsCheckingOut(true);
    setTimeout(() => {
      alert("Order placed successfully! Thank you for choosing Savoria.");
      clearCart();
      setIsCheckingOut(false);
      onClose();
    }, 2000);
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
            className="fixed inset-0 bg-ink/40 backdrop-blur-sm z-[60]"
          />
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white z-[70] shadow-2xl flex flex-col"
          >
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-paper/50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 text-primary rounded-xl flex items-center justify-center">
                  <ShoppingCart className="w-6 h-6" />
                </div>
                <h2 className="text-2xl font-serif font-bold text-ink">Your Cart</h2>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors text-ink/60 hover:text-ink">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                  <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center text-gray-300">
                    <ShoppingCart className="w-12 h-12" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-ink">Your cart is empty</h3>
                    <p className="text-ink/60">Looks like you haven't added anything yet.</p>
                  </div>
                  <button 
                    onClick={onClose}
                    className="bg-primary text-white px-8 py-3 rounded-full font-bold shadow-lg shadow-primary/20 hover:bg-orange-600 transition-colors"
                  >
                    Start Ordering
                  </button>
                </div>
              ) : (
                cart.map((item) => (
                  <motion.div 
                    layout
                    key={item.id}
                    className="flex gap-4 group"
                  >
                    <div className="w-24 h-24 rounded-2xl overflow-hidden flex-shrink-0 ring-1 ring-gray-100">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start mb-1">
                        <h4 className="font-bold text-ink truncate pr-2">{item.name}</h4>
                        <button 
                          onClick={() => removeFromCart(item.id)}
                          className="text-gray-300 hover:text-red-500 transition-colors p-1"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-primary font-bold mb-3">${item.price.toFixed(2)}</p>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center bg-gray-50 rounded-full p-1 border border-gray-100">
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-white hover:shadow-sm transition-all text-ink/60 hover:text-ink"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="w-8 text-center font-bold text-sm text-ink">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-white hover:shadow-sm transition-all text-ink/60 hover:text-ink"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <div className="p-6 bg-paper/50 border-t border-gray-100 space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-ink/60">
                    <span>Subtotal</span>
                    <span>${cartTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-ink/60">
                    <span>Delivery Fee</span>
                    <span className="text-green-600 font-medium">Free</span>
                  </div>
                  <div className="flex justify-between text-xl font-bold text-ink pt-2 border-t border-gray-200">
                    <span>Total</span>
                    <span>${cartTotal.toFixed(2)}</span>
                  </div>
                </div>
                <button 
                  onClick={handleOrder}
                  disabled={isCheckingOut}
                  className="w-full bg-primary hover:bg-orange-600 disabled:bg-orange-300 text-white font-bold py-4 rounded-2xl shadow-xl shadow-primary/20 transition-all flex items-center justify-center gap-3 group"
                >
                  {isCheckingOut ? (
                    <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      Place Order
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
                <p className="text-center text-[10px] text-ink/40 uppercase font-bold tracking-widest">Secure Checkout Powered by Savoria</p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function MainContent() {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <div className="min-h-screen font-sans selection:bg-orange-500/30 selection:text-ink">
      <Navbar onCartClick={() => setIsCartOpen(true)} />
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
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
    </div>
  );
}

export default function App() {
  return (
    <CartProvider>
      <MainContent />
    </CartProvider>
  );
}

