import { motion } from 'motion/react';
import { ArrowRight, Play, Star } from 'lucide-react';

export default function Hero() {
  return (
    <section id="home" className="pt-32 pb-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary font-semibold text-sm mb-6">
            The Best Food Delivery in Town
          </div>
          
          <h1 className="text-5xl lg:text-6xl font-serif font-bold leading-tight mb-6 text-ink">
            Enjoy Your Favorite <br /> Food at <span className="text-primary">Savoria</span>
          </h1>
          
          <p className="text-lg text-ink/60 mb-8 max-w-lg leading-relaxed">
            Discover the best foods from over 1,000 restaurants and get fast delivery to your doorstep. Fresh, hot, and delicious.
          </p>
          
          <div className="flex flex-wrap items-center gap-4">
            <button className="bg-primary hover:bg-orange-600 text-white px-8 py-4 rounded-xl font-bold transition-all shadow-lg shadow-primary/20">
              Order Now
            </button>
            <button className="flex items-center gap-3 px-6 py-4 rounded-xl hover:bg-gray-50 transition-all font-bold text-ink">
              <div className="w-10 h-10 rounded-full bg-white shadow flex items-center justify-center text-primary">
                <Play className="w-4 h-4 ml-1" />
              </div>
              How to Order
            </button>
          </div>

          <div className="mt-12 flex items-center gap-8">
            <div className="flex -space-x-3">
              {[1, 2, 3].map((i) => (
                <img 
                  key={i} 
                  src={`https://i.pravatar.cc/100?img=${i + 20}`} 
                  alt="Customer" 
                  className="w-12 h-12 rounded-full border-2 border-white object-cover shadow-sm" 
                />
              ))}
            </div>
            <div>
              <div className="flex items-center gap-1 text-yellow-400">
                {[...Array(5)].map((_, i) => <Star key={i} className="fill-current w-4 h-4" />)}
              </div>
              <p className="text-sm font-semibold text-ink/70">10k+ Happy Customers</p>
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <div className="relative rounded-3xl overflow-hidden shadow-2xl">
            <img 
              src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
              alt="Healthy Food Bowl" 
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Simple floating badge */}
          <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-2xl shadow-xl flex items-center gap-3 border border-gray-100">
            <div className="w-10 h-10 bg-orange-100 text-primary rounded-full flex items-center justify-center">
              <Star className="w-5 h-5 fill-current" />
            </div>
            <div>
              <p className="text-xs text-ink/40 font-bold uppercase">Rating</p>
              <p className="font-bold text-ink">4.9 (5k+ Reviews)</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
