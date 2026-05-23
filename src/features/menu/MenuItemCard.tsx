import { ShoppingCart, Plus, Star } from 'lucide-react';

interface MenuItemProps {
  item: {
    id: string;
    name: string;
    description: string;
    price: number;
    image: string;
    rating: number;
  };
}

export default function MenuItemCard({ item }: MenuItemProps) {
  return (
    <article className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden group hover:border-slate-700 transition-all shadow-xl shadow-black/20">
      <div className="aspect-[4/3] relative overflow-hidden">
        <img 
          src={item.image} 
          alt={item.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-2 py-1 rounded-full flex items-center text-xs font-bold text-amber-400">
          <Star className="h-3 w-3 fill-amber-400 mr-1" aria-hidden="true" />
          {item.rating}
        </div>
      </div>

      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-bold text-white">{item.name}</h3>
          <span className="text-blue-400 font-black">${item.price.toFixed(2)}</span>
        </div>
        <p className="text-slate-500 text-sm mb-6 line-clamp-2">
          {item.description}
        </p>

        <button 
          aria-label={`Add ${item.name} to cart`}
          className="w-full bg-slate-800 hover:bg-blue-600 text-white font-bold py-2.5 rounded-xl transition-all flex items-center justify-center group/btn"
        >
          <Plus className="h-4 w-4 mr-2 group-hover/btn:scale-125 transition-transform" aria-hidden="true" />
          Add to Cart
        </button>
      </div>
    </article>
  );
}
