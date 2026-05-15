import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { FoodCard } from '../../components/FoodCard';
import { MenuItem } from '../../types';

const menuItems: MenuItem[] = [
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

export function PopularMenuSection() {
  return (
    <section id="menu" className="py-24 bg-white relative overflow-hidden" aria-labelledby="menu-heading">
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
            <h2 id="menu-heading" className="text-4xl md:text-5xl font-serif font-bold text-ink mb-4 leading-tight">
              Curated Culinary <span className="text-primary italic">Excellence</span>
            </h2>
          </div>
          <button className="group flex items-center gap-3 text-ink font-bold hover:text-primary transition-all duration-150 whitespace-nowrap text-sm uppercase tracking-widest">
            Explore Full Menu 
            <div className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center group-hover:bg-primary group-hover:border-primary group-hover:text-white transition-all duration-150">
              <ArrowRight className="w-5 h-5" />
            </div>
          </button>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {menuItems.map((item, idx) => (
            <FoodCard key={item.id} item={item} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}
