import { motion } from 'motion/react';
import { Plus, Star, Clock } from 'lucide-react';
import { useCartStore } from '../store/useCartStore';

interface FoodCardProps {
  item: any;
  index?: number;
  key?: string | number;
}

export function FoodCard({ item, index = 0 }: FoodCardProps) {
  const addToCart = useCartStore((state) => state.addToCart);

  // Handle both API data and legacy static data
  const id = item._id || item.id;
  const price = typeof item.basePrice === 'number' ? item.basePrice : (typeof item.price === 'number' ? item.price : parseFloat(String(item.price).replace('$', '')));
  const image = Array.isArray(item.images) && item.images.length > 0 ? item.images[0] : item.image || '/menu/placeholder.png';
  const category = typeof item.category === 'object' ? item.category?.name : item.category || 'Menu';
  const rating = item.ratings?.average ?? item.rating ?? 4.5;
  const prepTime = item.preparationTime || 15;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.6, ease: "easeOut" }}
      className="group"
    >
      <div className="relative bg-paper rounded-[2.5rem] p-5 transition-all duration-500 shadow-soft hover:shadow-premium-hover border border-gray-100/30 ring-1 ring-gray-100/50 group-hover:-translate-y-3">
        <div className="relative mb-6 overflow-hidden rounded-[2rem] aspect-[4/5] shadow-inner ring-1 ring-black/5 bg-gray-100">
          <img 
            src={image} 
            alt={item.name} 
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-in-out"
            onError={(e) => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=500&fit=crop'; }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
          
          <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest text-ink shadow-sm border border-white/20">
            {category}
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
            <div className="flex items-center gap-1 text-[10px] font-black text-ink/30 bg-gray-50 px-2 py-1 rounded-full flex-shrink-0">
              <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
              {rating.toFixed(1)}
            </div>
          </div>
          
          {item.description && (
            <p className="text-sm text-ink/50 mb-3 line-clamp-2">{item.description}</p>
          )}
          
          <div className="flex items-center justify-between pt-4 border-t border-gray-100/50">
            <span className="font-serif font-bold text-2xl text-ink group-hover:text-primary transition-colors duration-150">${price.toFixed(2)}</span>
            <div className="flex items-center gap-1.5 text-[10px] font-bold text-ink/40 uppercase tracking-widest">
              <Clock className="w-3.5 h-3.5 text-primary/40" />
              {prepTime} min
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
