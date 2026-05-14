import { motion } from 'motion/react';
import { ShoppingCart, Star, ArrowRight, Heart } from 'lucide-react';
import { useCart, MenuItem } from '../context/CartContext';

export default function PopularMenu() {
  const { addToCart } = useCart();

  const menuItems: MenuItem[] = [
    {
      id: 1,
      name: "Gourmet Wagyu Burger",
      image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      price: 18.99,
      rating: 4.9,
      category: "Signature"
    },
    {
      id: 2,
      name: "Truffle Burrata Pizza",
      image: "https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      price: 24.50,
      rating: 4.9,
      category: "Italian"
    },
    {
      id: 3,
      name: "Atlantic Salmon Zest",
      image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      price: 22.00,
      rating: 4.8,
      category: "Healthy"
    },
    {
      id: 4,
      name: "Sichuan Pepper Wings",
      image: "https://images.unsplash.com/photo-1612929633738-8fe01f7c8166?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      price: 14.25,
      rating: 4.7,
      category: "Spicy"
    }
  ];

  return (
    <section id="menu" className="py-32 bg-white relative">
      {/* Decorative text background */}
      <div className="absolute top-40 left-0 text-[15rem] font-serif font-black text-gray-50 opacity-50 select-none pointer-events-none -z-10">
        SAVOR
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div className="max-w-2xl">
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-primary font-bold tracking-[0.2em] uppercase text-sm mb-4"
            >
              Exquisite Selection
            </motion.p>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-5xl lg:text-6xl font-serif font-bold text-ink mb-6"
            >
              Our Popular <span className="italic text-primary">Masterpieces</span>
            </motion.h2>
          </div>
          <motion.button 
            whileHover={{ x: 5 }}
            className="group flex items-center gap-3 text-ink font-bold text-lg hover:text-primary transition-colors whitespace-nowrap"
          >
            Explore Full Menu 
            <div className="w-12 h-12 rounded-full border-2 border-gray-100 flex items-center justify-center group-hover:border-primary transition-colors">
              <ArrowRight className="w-5 h-5" />
            </div>
          </motion.button>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {menuItems.map((item, idx) => (
            <motion.div 
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group bg-paper rounded-[2.5rem] p-5 shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-primary/10 flex flex-col h-full"
            >
              <div className="relative mb-6 overflow-hidden rounded-[2rem] aspect-[4/5] shadow-inner">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-bold text-primary shadow-sm">
                  {item.category}
                </div>
                <button className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center text-gray-400 hover:text-red-500 transition-all shadow-sm">
                  <Heart className="w-5 h-5" />
                </button>
              </div>
              
              <div className="flex-1 flex flex-col px-2">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-serif font-bold text-2xl text-ink leading-tight group-hover:text-primary transition-colors">{item.name}</h3>
                </div>
                
                <div className="flex items-center gap-2 mb-6">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-3.5 h-3.5 ${i < Math.floor(item.rating) ? 'fill-current' : ''}`} />
                    ))}
                  </div>
                  <span className="text-xs font-bold text-ink/40">({item.rating})</span>
                </div>

                <div className="flex items-center justify-between mt-auto">
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-ink/30 uppercase tracking-widest">Price</span>
                    <span className="font-serif font-bold text-3xl text-ink">${item.price.toFixed(2)}</span>
                  </div>
                  <button 
                    onClick={() => addToCart(item)}
                    className="w-14 h-14 bg-ink hover:bg-primary text-white rounded-2xl flex items-center justify-center transition-all shadow-xl shadow-ink/10 hover:shadow-primary/30 group/btn transform active:scale-90"
                  >
                    <ShoppingCart className="w-6 h-6 group-hover/btn:scale-110 transition-transform" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
