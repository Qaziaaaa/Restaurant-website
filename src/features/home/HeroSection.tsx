import { motion } from 'motion/react';
import { ArrowRight, Play, Star, Clock, ShieldCheck } from 'lucide-react';

export function HeroSection() {
  return (
    <section id="home" className="pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden relative">
      {/* Decorative blobs */}
      <div className="absolute top-20 right-0 w-80 h-80 bg-primary/10 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-0 left-10 w-96 h-96 bg-orange-300/10 rounded-full blur-[120px] -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-16 items-center">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "circOut" }}
          className="max-w-2xl"
        >
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-50 text-primary font-bold text-[10px] uppercase tracking-[0.2em] mb-8 border border-orange-100"
          >
            <span className="flex h-2 w-2 rounded-full bg-primary opacity-75 animate-ping"></span>
            Culinary Excellence
          </motion.div>
          <h1 className="text-5xl md:text-6xl lg:text-8xl font-serif font-bold leading-[1.05] mb-8 text-ink">
            Elevate Your <span className="text-primary italic">Palate</span> with Every Bite
          </h1>
          <p className="text-lg md:text-xl text-ink/60 mb-10 max-w-lg leading-relaxed font-medium">
            Experience the art of fine dining delivered to your doorstep. Fresh ingredients, master chefs, and a passion for perfection.
          </p>
          
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <button className="w-full sm:w-auto bg-primary hover:brightness-110 text-white px-8 py-4 rounded-2xl font-bold transition-all duration-150 shadow-premium hover:shadow-premium-hover hover:-translate-y-1 flex items-center justify-center gap-2 text-sm uppercase tracking-widest">
              Order Now
              <ArrowRight className="w-5 h-5" />
            </button>
            <button className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-5 rounded-2xl hover:bg-white hover:shadow-premium hover:-translate-y-1 transition-all duration-150 font-bold text-ink group text-sm uppercase tracking-widest">
              <div className="w-14 h-14 rounded-full bg-white shadow-premium flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-200">
                <Play className="w-5 h-5 ml-1" />
              </div>
              Watch Our Story
            </button>
          </div>

          <div className="mt-16 flex flex-col sm:flex-row items-start sm:items-center gap-10">
            <div className="flex -space-x-4">
              {[1, 2, 3, 4].map((i) => (
                <img 
                  key={i} 
                  src={`https://i.pravatar.cc/100?img=${i * 10}`} 
                  alt={`Customer ${i}`} 
                  className="w-14 h-14 rounded-full border-4 border-paper object-cover shadow-soft ring-1 ring-black/5" 
                  loading="lazy"
                />
              ))}
            </div>
            <div className="hidden sm:block h-10 w-[1px] bg-gray-200" />
            <div>
              <div className="flex items-center gap-1 text-yellow-400 mb-1" aria-label="5 star rating">
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
              fetchPriority="high"
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
