import { motion } from 'motion/react';
import { ShoppingCart, Menu as MenuIcon, X, Star, Clock, Truck, ShieldCheck, ArrowRight, Play, Quote } from 'lucide-react';
import { useState, useEffect } from 'react';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

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
          <button className="relative text-ink hover:text-primary transition-colors">
            <ShoppingCart className="w-6 h-6" />
            <span className="absolute -top-2 -right-2 bg-primary text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">2</span>
          </button>
          <button className="bg-primary hover:bg-orange-600 text-white px-6 py-2.5 rounded-full font-medium transition-all shadow-lg shadow-primary/30 hover:shadow-primary/50 transform hover:-translate-y-0.5">
            Book a Table
          </button>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-ink" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white border-t border-gray-100 shadow-lg py-4 px-4 flex flex-col gap-4">
           <a href="#home" className="block text-ink hover:text-primary font-medium py-2">Home</a>
           <a href="#about" className="block text-ink hover:text-primary font-medium py-2">About Us</a>
           <a href="#menu" className="block text-ink hover:text-primary font-medium py-2">Menu</a>
           <a href="#services" className="block text-ink hover:text-primary font-medium py-2">Services</a>
           <a href="#chefs" className="block text-ink hover:text-primary font-medium py-2">Chefs</a>
           <a href="#contact" className="block text-ink hover:text-primary font-medium py-2">Contact</a>
           <button className="bg-primary text-white px-6 py-3 rounded-full font-medium mt-2 w-full">
            Book a Table
          </button>
        </div>
      )}
    </nav>
  );
}

function Hero() {
  return (
    <section id="home" className="pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden relative">
      {/* Decorative blobs */}
      <div className="absolute top-20 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-10 w-72 h-72 bg-orange-300/10 rounded-full blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-2xl"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-100 text-primary font-medium text-sm mb-6">
            <span className="flex h-2 w-2 rounded-full bg-primary opacity-75 animate-ping"></span>
            More than Faster
          </div>
          <h1 className="text-5xl lg:text-7xl font-serif font-medium leading-tight mb-6 text-ink">
            Be The Fastest In Delivering Your <span className="text-primary italic">Food</span>
          </h1>
          <p className="text-lg text-ink/70 mb-8 max-w-lg leading-relaxed">
            Our job is to filling your tummy with delicious food and with fast and free delivery. 
            Fresh food from our kitchen straight to your table.
          </p>
          
          <div className="flex flex-wrap items-center gap-4">
            <button className="bg-primary hover:bg-orange-600 text-white px-8 py-4 rounded-full font-medium transition-all shadow-lg shadow-primary/30 hover:shadow-primary/50 flex items-center gap-2 text-lg">
              Get Started
              <ArrowRight className="w-5 h-5" />
            </button>
            <button className="flex items-center gap-3 px-6 py-4 rounded-full hover:bg-gray-100 transition-colors font-medium text-ink group">
              <div className="w-12 h-12 rounded-full bg-white shadow-md flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                <Play className="w-5 h-5 ml-1" />
              </div>
              Watch Video
            </button>
          </div>

          <div className="mt-12 flex items-center gap-8">
            <div className="flex -space-x-4">
              {[1, 2, 3, 4].map((i) => (
                <img 
                  key={i} 
                  src={`https://i.pravatar.cc/100?img=${i * 10}`} 
                  alt="Customer" 
                  className="w-12 h-12 rounded-full border-4 border-paper object-cover" 
                />
              ))}
            </div>
            <div>
              <div className="flex items-center gap-1 text-yellow-400 mb-1">
                {[...Array(5)].map((_, i) => <Star key={i} className="fill-current w-4 h-4" />)}
              </div>
              <p className="text-sm font-medium text-ink">
                <span className="font-bold">4.9</span> (12.5k Reviews)
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
          className="relative lg:ml-auto w-full max-w-lg aspect-square"
        >
          {/* Circular mask for hero image */}
          <div className="absolute inset-0 bg-primary/5 rounded-full transform rotate-12 scale-110" />
          <div className="absolute inset-0 bg-primary/10 rounded-full transform -rotate-6 scale-105" />
          <img 
            src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
            alt="Healthy Food Bowl" 
            className="w-full h-full object-cover rounded-full border-[16px] border-white shadow-2xl relative z-10"
          />
          
          {/* Floating badge */}
          <motion.div 
            animate={{ y: [-10, 10, -10] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -bottom-6 -left-6 bg-white p-4 rounded-2xl shadow-xl z-20 flex items-center gap-4 border border-gray-50"
          >
            <div className="w-12 h-12 bg-orange-100 text-primary rounded-full flex items-center justify-center">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-ink/60 font-semibold uppercase tracking-wider mb-1">Delivery Time</p>
              <p className="font-bold text-ink">On Time <span className="text-green-500">100%</span></p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
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
    <section id="about" className="py-20 bg-paper">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-16 items-center">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="relative"
        >
          <img 
            src="https://images.unsplash.com/photo-1600891964092-4316c288032e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
            alt="Chef Cooking" 
            className="rounded-3xl shadow-xl w-full"
          />
          <div className="absolute -bottom-8 -right-8 bg-white p-6 rounded-2xl shadow-xl max-w-xs border border-gray-50 hidden sm:block">
            <div className="flex items-center gap-4 mb-3">
              <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                <Star className="w-6 h-6 fill-current" />
              </div>
              <h4 className="font-bold text-xl font-serif">15+ Years</h4>
            </div>
            <p className="text-sm text-ink/70">Of experience in cooking the most delicious food for our clients.</p>
          </div>
        </motion.div>

        <motion.div
           initial={{ opacity: 0, x: 50 }}
           whileInView={{ opacity: 1, x: 0 }}
           viewport={{ once: true }}
        >
          <p className="text-primary font-medium tracking-wide uppercase text-sm mb-3">About Us</p>
          <h2 className="text-4xl lg:text-5xl font-serif font-bold text-ink mb-6">
            We Create The Best Foodie Experience
          </h2>
          <p className="text-lg text-ink/70 mb-6 leading-relaxed">
            We are more than just a restaurant. We are a family of passionate chefs, creators, and food lovers dedicated to bringing you the most exceptional culinary experiences.
          </p>
          <p className="text-lg text-ink/70 mb-8 leading-relaxed">
            Every dish we serve is crafted with locally-sourced, fresh ingredients, prepared with love and an unwavering commitment to quality.
          </p>

          <ul className="space-y-4 mb-10">
             {[
               "Premium quality and fresh ingredients",
               "Award-winning chefs and culinary experts",
               "Cozy, relaxing, and unforgettable ambiance",
             ].map((item, i) => (
                <li key={i} className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                    <ArrowRight className="w-4 h-4 text-primary" />
                  </div>
                  <span className="font-medium text-ink/80">{item}</span>
                </li>
             ))}
          </ul>

          <button className="bg-ink hover:bg-gray-800 text-white px-8 py-4 rounded-full font-medium transition-all shadow-lg flex items-center gap-2">
            Learn More About Us
          </button>
        </motion.div>
      </div>
    </section>
  );
}

function PopularMenu() {
  const menuItems = [
    {
      id: 1,
      name: "Classic Beef Burger",
      image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      price: "$12.99",
      rating: 4.8,
      category: "Burger"
    },
    {
      id: 2,
      name: "Margherita Pizza",
      image: "https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      price: "$14.50",
      rating: 4.9,
      category: "Pizza"
    },
    {
      id: 3,
      name: "Fresh Salmon Salad",
      image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      price: "$10.00",
      rating: 4.7,
      category: "Healthy"
    },
    {
      id: 4,
      name: "Spicy Noodles",
      image: "https://images.unsplash.com/photo-1612929633738-8fe01f7c8166?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      price: "$11.25",
      rating: 4.6,
      category: "Asian"
    }
  ];

  return (
    <section id="menu" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <p className="text-primary font-medium tracking-wide uppercase text-sm mb-3">Our Menu</p>
            <h2 className="text-4xl font-serif font-bold text-ink mb-4">Our Popular Menu Items</h2>
          </div>
          <button className="text-primary font-semibold flex items-center gap-2 hover:gap-3 transition-all whitespace-nowrap">
            View All Menu <ArrowRight className="w-5 h-5" />
          </button>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {menuItems.map((item, idx) => (
            <motion.div 
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-paper rounded-[2rem] p-6 shadow-sm hover:shadow-xl transition-shadow border border-gray-100 group"
            >
              <div className="relative mb-6 overflow-hidden rounded-2xl aspect-square">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-primary">
                  {item.category}
                </div>
              </div>
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-serif font-bold text-lg text-ink line-clamp-1">{item.name}</h3>
                <div className="flex items-center gap-1 text-sm font-medium bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full whitespace-nowrap">
                  <Star className="w-3 h-3 fill-current" />
                  {item.rating}
                </div>
              </div>
              <div className="flex items-center justify-between mt-4">
                <span className="font-bold text-2xl text-ink">{item.price}</span>
                <button className="w-10 h-10 bg-ink hover:bg-primary text-white rounded-full flex items-center justify-center transition-colors">
                  <ShoppingCart className="w-5 h-5" />
                </button>
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
      image: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?q=80&w=600&auto=format&fit=crop",
      nationality: "Italian"
    },
    {
      id: 2,
      name: "Mei Lin",
      role: "Sushi Master",
      image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?q=80&w=600&auto=format&fit=crop",
      nationality: "Japanese"
    },
    {
      id: 3,
      name: "Marcus Johnson",
      role: "Grill Master",
      image: "https://images.unsplash.com/photo-1566554273541-37a9ca77b91f?q=80&w=600&auto=format&fit=crop",
      nationality: "American"
    },
    {
      id: 4,
      name: "Claire Dubois",
      role: "Pastry Chef",
      image: "https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?q=80&w=600&auto=format&fit=crop",
      nationality: "French"
    }
  ];

  return (
    <section id="chefs" className="py-20 bg-paper">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-primary font-medium tracking-wide uppercase text-sm mb-3">Our Team</p>
          <h2 className="text-4xl font-serif font-bold text-ink mb-4">Meet Our Master Chefs</h2>
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
              <div className="relative mb-6 overflow-hidden rounded-[2rem] aspect-[4/5] shadow-lg">
                <img 
                  src={chef.image} 
                  alt={chef.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
                  <div className="flex gap-3">
                    {['Facebook', 'Twitter', 'Instagram'].map(social => (
                      <button key={social} className="w-8 h-8 rounded-full bg-white text-ink hover:bg-primary hover:text-white flex items-center justify-center transition-colors text-xs font-bold shadow-md">
                        {social[0]}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <h3 className="font-serif font-bold text-xl text-ink mb-1">{chef.name}</h3>
              <p className="text-primary font-medium text-sm mb-2">{chef.role}</p>
              <p className="text-ink/60 text-sm tracking-wide uppercase">{chef.nationality}</p>
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

export default function App() {
  return (
    <div className="min-h-screen font-sans selection:bg-orange-500/30 selection:text-ink">
      <Navbar />
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

