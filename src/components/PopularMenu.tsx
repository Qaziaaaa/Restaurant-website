import { motion } from 'motion/react';
import { ShoppingCart, Star } from 'lucide-react';
import { useCart, MenuItem } from '../context/CartContext';

export default function PopularMenu() {
  const { addToCart } = useCart();

  const menuItems: MenuItem[] = [
    {
      id: 1,
      name: "Classic Wagyu Burger",
      image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      price: 18.99,
      rating: 4.9,
      category: "Signature"
    },
    {
      id: 2,
      name: "Burrata Pizza",
      image: "https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      price: 24.50,
      rating: 4.9,
      category: "Italian"
    },
    {
      id: 3,
      name: "Atlantic Salmon",
      image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      price: 22.00,
      rating: 4.8,
      category: "Healthy"
    },
    {
      id: 4,
      name: "Sichuan Wings",
      image: "https://images.unsplash.com/photo-1612929633738-8fe01f7c8166?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      price: 14.25,
      rating: 4.7,
      category: "Spicy"
    }
  ];

  return (
    <section id="menu" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-primary font-semibold uppercase tracking-wider text-sm mb-2">Our Menu</p>
          <h2 className="text-4xl font-serif font-bold text-ink">Our Popular Dishes</h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {menuItems.map((item) => (
            <div 
              key={item.id}
              className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 hover:shadow-lg transition-shadow flex flex-col h-full"
            >
              <div className="relative mb-4 overflow-hidden rounded-xl aspect-square">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 left-2 bg-white/90 px-3 py-1 rounded-full text-xs font-bold text-primary">
                  {item.category}
                </div>
              </div>
              
              <div className="flex-1">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-bold text-lg text-ink">{item.name}</h3>
                  <div className="flex items-center gap-1 text-yellow-400 text-sm font-bold">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="text-ink">{item.rating}</span>
                  </div>
                </div>
                <p className="text-xl font-bold text-ink mb-4">${item.price.toFixed(2)}</p>
              </div>

              <button 
                onClick={() => addToCart(item)}
                className="w-full bg-primary hover:bg-orange-600 text-white font-bold py-3 rounded-xl transition-colors flex items-center justify-center gap-2"
              >
                <ShoppingCart className="w-5 h-5" />
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
