import { motion } from 'motion/react';
import { Plus, Star, Clock } from 'lucide-react';
import { useCartStore } from '../store/useCartStore';
import { MenuItem } from '../types';

interface FoodCardProps {
  item: MenuItem;
  index?: number;
}

export function FoodCard({ item, index = 0 }: FoodCardProps) {
  const addToCart = useCartStore((state) => state.addToCart);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.6, ease: "easeOut" }}
      className="group"
    >
      <div className="relative bg-paper rounded-[2.5rem] p-5 transition-all duration-500 shadow-soft hover:shadow-premium-hover border border-gray-100/30 ring-1 ring-gray-100/50 group-hover:-translate-y-3">
        <div className="relative mb-6 overflow-hidden rounded-[2rem] aspect-[4/5] shadow-inner ring-1 ring-black/5">
          <img 
            src={item.image} 
            alt={item.name} 
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-in-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
          
          <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest text-ink shadow-sm border border-white/20">
            {item.category}
          </div>

          <motion.button 
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => addToCart(item)}
            aria-label={`Add ${item.name} to cart`}
            className="absolute bottom-4 right-4 w-12 h-12 bg-primary text-white rounded-2xl flex items-center justify-center shadow-xl opacity-0 group-hover:opacity-100 transition-all duration-75 translate-y-4 group-hover:translate-y-0 z-20"
          >
            <Plus className="w-6 h-6" />
          </motion.button>
        </div>

        <div className="px-2">
          <div className="flex justify-between items-start mb-3">
            <h3 className="font-serif font-bold text-xl text-ink leading-tight pr-2 group-hover:text-primary transition-colors duration-150">{item.name}</h3>
            <div className="flex items-center gap-1 text-[10px] font-black text-ink/30 bg-gray-50 px-2 py-1 rounded-full">
              <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
              {item.rating}
            </div>
          </div>
          
          <div className="flex items-center justify-between pt-4 border-t border-gray-100/50">
            <span className="font-serif font-bold text-2xl text-ink group-hover:text-primary transition-colors duration-150">{item.price}</span>
            <div className="flex items-center gap-1.5 text-[10px] font-bold text-ink/40 uppercase tracking-widest">
              <Clock className="w-3.5 h-3.5 text-primary/40" />
              15 min
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
