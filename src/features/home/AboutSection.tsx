import { motion } from 'motion/react';
import { Star, ShieldCheck, ArrowRight } from 'lucide-react';

export function AboutSection() {
  return (
    <section id="about" className="py-24 bg-paper relative overflow-hidden" aria-labelledby="about-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-20 items-center">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative"
        >
          <div className="relative z-10 rounded-[2.5rem] overflow-hidden shadow-premium group">
            <img 
              src="/about/our-story.png" 
              alt="Chef Plating" 
              loading="lazy"
              className="w-full object-cover aspect-[4/5] group-hover:scale-105 transition-transform duration-500 ease-in-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/40 via-transparent to-transparent opacity-60" />
          </div>
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="absolute -bottom-10 -right-10 bg-white p-8 rounded-[2.5rem] shadow-premium-hover max-w-xs border border-gray-100 hidden sm:block z-20"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-14 h-14 bg-orange-50 text-primary rounded-2xl flex items-center justify-center">
                <Star className="w-7 h-7 fill-primary" />
              </div>
              <div>
                <h4 className="font-bold text-2xl font-serif text-ink leading-none">15+ Years</h4>
                <p className="text-[10px] text-primary font-black uppercase tracking-[0.2em] mt-1">Excellence</p>
              </div>
            </div>
            <p className="text-sm text-ink/60 leading-relaxed italic">"Our commitment to quality is what defines every single dish we serve at Savoria."</p>
          </motion.div>
          
          {/* Decorative shapes */}
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-primary/5 rounded-full blur-3xl -z-10" />
        </motion.div>

        <motion.div
           initial={{ opacity: 0, x: 50 }}
           whileInView={{ opacity: 1, x: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.8, ease: "easeOut" }}
           className="lg:pl-10"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 text-primary font-bold text-xs uppercase tracking-widest mb-6 border border-orange-100">
            Our Legacy
          </div>
          <h2 id="about-heading" className="text-4xl lg:text-6xl font-serif font-bold text-ink mb-8 leading-[1.1]">
            We Craft <span className="text-primary italic">Extraordinary</span> Foodie Experiences
          </h2>
          <p className="text-lg text-ink/70 mb-8 leading-relaxed">
            Savoria is more than a restaurant; it's a culinary destination where tradition meets innovation. Our passion for gastronomy is reflected in every meticulously prepared plate.
          </p>

          <div className="grid sm:grid-cols-2 gap-4 mb-12">
             {[
               { title: "Fresh Ingredients", desc: "Locally sourced & premium quality" },
               { title: "Master Chefs", desc: "Culinary experts from around the world" },
               { title: "Elegant Ambiance", desc: "A cozy and unforgettable atmosphere" },
               { title: "Free Delivery", desc: "On all orders above $50" },
             ].map((item, i) => (
                <motion.div 
                  key={i} 
                  whileHover={{ y: -5 }}
                  className="flex gap-4 p-5 rounded-3xl bg-white shadow-soft hover:shadow-premium transition-all duration-150 border border-gray-100/50 group"
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-orange-50 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-200">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-ink text-sm mb-1">{item.title}</h4>
                    <p className="text-ink/50 text-[10px] leading-tight font-medium uppercase tracking-wider">{item.desc}</p>
                  </div>
                </motion.div>
             ))}
          </div>

          <button className="bg-primary hover:brightness-110 text-white px-8 py-4 rounded-2xl font-bold transition-all duration-150 shadow-premium hover:shadow-premium-hover hover:-translate-y-1 flex items-center justify-center gap-2 group text-sm uppercase tracking-widest">
            Discover Our Full Story
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
