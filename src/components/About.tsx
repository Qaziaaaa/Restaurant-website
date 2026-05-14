import { motion } from 'motion/react';
import { Star, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function About() {
  return (
    <section id="about" className="py-32 bg-paper relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute top-1/2 -right-20 w-80 h-80 bg-primary/5 rounded-full blur-3xl -z-10" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-24 items-center">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="relative"
        >
          <div className="relative z-10 rounded-[3.5rem] overflow-hidden shadow-[0_30px_80px_rgba(0,0,0,0.15)] group">
            <img 
              src="https://images.unsplash.com/photo-1600891964092-4316c288032e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
              alt="Chef Cooking" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-ink/40 to-transparent" />
          </div>
          
          <motion.div 
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 5, repeat: Infinity }}
            className="absolute -bottom-10 -right-10 bg-white p-8 rounded-[2.5rem] shadow-2xl max-w-xs border border-gray-50 z-20"
          >
            <div className="flex items-center gap-5 mb-4">
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-[1.5rem] flex items-center justify-center shadow-inner">
                <Star className="w-8 h-8 fill-current" />
              </div>
              <div>
                <h4 className="font-bold text-3xl font-serif text-ink">15+</h4>
                <p className="text-xs font-bold text-ink/40 uppercase tracking-widest">Years Experience</p>
              </div>
            </div>
            <p className="text-ink/60 text-sm leading-relaxed font-medium">Of culinary excellence and bringing people together through the art of food.</p>
          </motion.div>
          
          {/* Glass floating card */}
          <div className="absolute top-10 -left-10 bg-white/40 backdrop-blur-md p-6 rounded-[2rem] border border-white/50 shadow-xl z-20 hidden md:block">
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2">
                {[1,2,3].map(i => <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-primary/20" />)}
              </div>
              <p className="text-xs font-bold text-ink">500+ Daily Guests</p>
            </div>
          </div>
        </motion.div>

        <motion.div
           initial={{ opacity: 0, x: 50 }}
           whileInView={{ opacity: 1, x: 0 }}
           viewport={{ once: true }}
           className="relative"
        >
          <div className="inline-block px-4 py-1.5 rounded-full bg-orange-50 text-primary text-xs font-black uppercase tracking-[0.2em] mb-6">
            Our Legacy
          </div>
          <h2 className="text-5xl lg:text-6xl font-serif font-bold text-ink mb-8 leading-[1.1]">
            We Create The <span className="text-primary italic">Ultimate</span> Foodie Experience
          </h2>
          <p className="text-xl text-ink/60 mb-8 leading-relaxed">
            We are more than just a restaurant. Savoria is a destination where passion meets precision, and every ingredient tells a story of tradition and innovation.
          </p>

          <div className="grid sm:grid-cols-2 gap-6 mb-12">
            {[
              "Organic Sourced Ingredients",
              "World Class Master Chefs",
              "Unforgettable Ambiance",
              "Exclusive Private Dining"
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-4 group">
                <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-orange-50 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <span className="font-bold text-ink/80">{item}</span>
              </div>
            ))}
          </div>

          <button className="bg-ink hover:bg-primary text-white px-10 py-5 rounded-2xl font-bold transition-all shadow-xl shadow-ink/10 flex items-center gap-3 transform hover:-translate-y-1 active:scale-95 group">
            Our Full Story
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
