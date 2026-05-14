import { motion } from 'motion/react';
import { Facebook, Twitter, Instagram } from 'lucide-react';

export default function Chefs() {
  const chefs = [
    {
      id: 1,
      name: "Alessandro Romano",
      role: "Executive Head Chef",
      image: "/images/chefs/italian.png",
      nationality: "Italian",
      bio: "Master of authentic Mediterranean flavors with 20+ years of Michelin-star experience."
    },
    {
      id: 2,
      name: "Mei Lin",
      role: "Wok Master",
      image: "/images/chefs/chinese.png",
      nationality: "Chinese",
      bio: "Specializes in traditional Cantonese cuisine with a modern molecular twist."
    },
    {
      id: 3,
      name: "Kenji Yamamoto",
      role: "Sushi Maestro",
      image: "/images/chefs/japanese.png",
      nationality: "Japanese",
      bio: "Renowned for his precision and deep respect for seasonal ingredients."
    },
    {
      id: 4,
      name: "Soo-Min Park",
      role: "Culinary Director",
      image: "/images/chefs/korean.png",
      nationality: "Korean",
      bio: "An innovator in Korean-fusion dining, blending heritage with bold new ideas."
    }
  ];

  return (
    <section id="chefs" className="py-32 bg-paper overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-primary font-bold tracking-[0.2em] uppercase text-sm mb-4"
          >
            The Visionaries
          </motion.p>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-5xl font-serif font-bold text-ink mb-6"
          >
            Meet Our <span className="text-primary italic">Global</span> Master Chefs
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-ink/50 text-lg max-w-2xl mx-auto"
          >
            Our culinary team brings together diverse cultures and techniques to create an unforgettable dining experience.
          </motion.p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {chefs.map((chef, idx) => (
            <motion.div 
              key={chef.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15 }}
              className="group"
            >
              <div className="relative mb-8 overflow-hidden rounded-[3rem] aspect-[4/5] shadow-2xl group-hover:shadow-primary/20 transition-all duration-500">
                <img 
                  src={chef.image} 
                  alt={chef.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent opacity-0 group-hover:opacity-90 transition-all duration-500 flex flex-col justify-end p-8 text-white">
                  <p className="text-sm font-medium mb-3 line-clamp-3 text-gray-300 italic">"{chef.bio}"</p>
                  <div className="flex gap-4">
                    {[Facebook, Twitter, Instagram].map((Icon, i) => (
                      <button key={i} className="w-10 h-10 rounded-xl bg-white/10 hover:bg-primary transition-colors flex items-center justify-center backdrop-blur-md">
                        <Icon className="w-5 h-5 text-white" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="text-center px-4">
                <h3 className="font-serif font-bold text-2xl text-ink mb-1 group-hover:text-primary transition-colors">{chef.name}</h3>
                <p className="text-primary font-bold text-sm mb-3 tracking-wide uppercase">{chef.role}</p>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-100 text-ink/40 text-[10px] font-black uppercase tracking-widest">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                  {chef.nationality}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
