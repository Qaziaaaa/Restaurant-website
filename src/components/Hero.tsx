import { motion } from 'motion/react';
import { ArrowRight, Play, Star, Clock } from 'lucide-react';

export default function Hero() {
  return (
    <section id="home" className="pt-32 pb-20 lg:pt-52 lg:pb-36 overflow-hidden relative">
      {/* Dynamic Background Elements */}
      <div className="absolute top-20 right-0 w-96 h-96 bg-primary/10 rounded-full blur-[120px] -z-10 animate-pulse" />
      <div className="absolute bottom-0 left-10 w-[500px] h-[500px] bg-orange-300/10 rounded-full blur-[150px] -z-10" />
      <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-primary/20 rounded-full blur-sm -z-10 animate-ping" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-16 items-center">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-2xl relative"
        >
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-orange-100 text-primary font-bold text-sm mb-8 shadow-sm"
          >
            <span className="flex h-2.5 w-2.5 rounded-full bg-primary relative">
              <span className="absolute inset-0 rounded-full bg-primary animate-ping opacity-75"></span>
            </span>
            Premium Culinary Experience
          </motion.div>
          
          <h1 className="text-6xl lg:text-8xl font-serif font-black leading-[1.1] mb-8 text-ink">
            Taste the <span className="text-primary italic relative">
              Art
              <svg className="absolute -bottom-2 left-0 w-full h-3 text-primary/20" viewBox="0 0 100 10" preserveAspectRatio="none">
                <path d="M0 5 Q 25 0, 50 5 T 100 5" fill="none" stroke="currentColor" strokeWidth="4" />
              </svg>
            </span> of <br className="hidden md:block" /> Fine Dining
          </h1>
          
          <p className="text-xl text-ink/60 mb-10 max-w-lg leading-relaxed font-medium">
            Savor exceptional flavors crafted by master chefs and delivered with unmatched elegance to your doorstep.
          </p>
          
          <div className="flex flex-wrap items-center gap-6">
            <button className="bg-primary hover:bg-orange-600 text-white px-10 py-5 rounded-2xl font-bold transition-all shadow-2xl shadow-primary/30 hover:shadow-primary/50 flex items-center gap-3 text-lg transform hover:-translate-y-1 active:scale-95">
              Order Now
              <ArrowRight className="w-6 h-6" />
            </button>
            <button className="flex items-center gap-4 px-8 py-5 rounded-2xl hover:bg-white hover:shadow-xl hover:border-gray-100 border border-transparent transition-all font-bold text-ink group">
              <div className="w-14 h-14 rounded-full bg-white shadow-lg flex items-center justify-center text-primary group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                <Play className="w-6 h-6 ml-1" />
              </div>
              Watch Story
            </button>
          </div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-16 flex items-center gap-10"
          >
            <div className="flex -space-x-4">
              {[1, 2, 3, 4].map((i) => (
                <img 
                  key={i} 
                  src={`https://i.pravatar.cc/100?img=${i + 10}`} 
                  alt="Customer" 
                  className="w-14 h-14 rounded-2xl border-4 border-white object-cover shadow-md transform hover:translate-y-[-4px] transition-transform cursor-pointer" 
                />
              ))}
              <div className="w-14 h-14 rounded-2xl border-4 border-white bg-orange-50 flex items-center justify-center text-primary font-bold text-sm shadow-md">
                +12k
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1 text-yellow-400 mb-1.5">
                {[...Array(5)].map((_, i) => <Star key={i} className="fill-current w-5 h-5" />)}
              </div>
              <p className="text-sm font-bold text-ink/80">
                <span className="text-ink">4.9/5.0</span> Rating from happy foodies
              </p>
            </div>
          </motion.div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9, rotate: 5 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
          className="relative lg:ml-auto w-full max-w-xl"
        >
          {/* Main Hero Image with Glassmorphism container */}
          <div className="relative z-10 p-4 bg-white/30 backdrop-blur-md rounded-[3rem] border border-white/50 shadow-2xl overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <img 
              src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
              alt="Healthy Food Bowl" 
              className="w-full h-full object-cover rounded-[2.5rem] shadow-inner transition-transform duration-700 group-hover:scale-105"
            />
          </div>
          
          {/* Decorative floating elements */}
          <motion.div 
            animate={{ y: [-15, 15, -15], rotate: [0, 5, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -bottom-10 -left-10 bg-white/90 backdrop-blur-xl p-5 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.1)] z-20 flex items-center gap-4 border border-white/50"
          >
            <div className="w-14 h-14 bg-orange-100 text-primary rounded-2xl flex items-center justify-center">
              <Clock className="w-7 h-7" />
            </div>
            <div>
              <p className="text-xs text-ink/40 font-bold uppercase tracking-widest mb-1">Fast Delivery</p>
              <p className="font-serif font-bold text-xl text-ink">30 Mins Guaranteed</p>
            </div>
          </motion.div>

          <motion.div 
            animate={{ y: [15, -15, 15], x: [0, 10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-10 -right-6 bg-white/90 backdrop-blur-xl p-5 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.1)] z-20 flex flex-col items-center gap-2 border border-white/50"
          >
            <div className="flex gap-1">
              {[1, 2, 3].map(i => <Star key={i} className="w-4 h-4 fill-primary text-primary" />)}
            </div>
            <p className="font-serif font-bold text-lg text-ink">Top Rated</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
