import { motion } from 'motion/react';
import { Facebook, Twitter, Instagram } from 'lucide-react';
import { Chef } from '../types';

interface ChefCardProps {
  chef: Chef;
  index?: number;
}

export function ChefCard({ chef, index = 0 }: ChefCardProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.6, ease: "easeOut" }}
      className="group text-center"
    >
      <div className="relative mb-8 overflow-hidden rounded-[2.5rem] aspect-[4/5] shadow-premium ring-1 ring-black/5 group-hover:shadow-premium-hover group-hover:-translate-y-2 transition-all duration-500">
        <img 
          src={chef.image} 
          alt={chef.name} 
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-in-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent opacity-0 group-hover:opacity-60 transition-opacity duration-500" />
        
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
          <div className="flex gap-4">
            {[
              { name: 'Facebook', icon: <Facebook className="w-5 h-5" /> },
              { name: 'Twitter', icon: <Twitter className="w-5 h-5" /> },
              { name: 'Instagram', icon: <Instagram className="w-5 h-5" /> }
            ].map(social => (
              <motion.button 
                key={social.name} 
                aria-label={`${chef.name}'s ${social.name}`}
                whileHover={{ y: -5, backgroundColor: 'var(--color-primary)', color: 'white' }}
                className="w-12 h-12 rounded-2xl bg-white text-primary flex items-center justify-center transition-all duration-75 shadow-2xl"
              >
                {social.icon}
              </motion.button>
            ))}
          </div>
        </div>
      </div>
      <h3 className="font-serif font-bold text-2xl text-ink mb-2 group-hover:text-primary transition-colors duration-150">{chef.name}</h3>
      <div className="flex items-center justify-center gap-3 mb-3">
        <span className="w-10 h-[1px] bg-primary/20"></span>
        <p className="text-primary font-bold text-xs uppercase tracking-[0.2em]">{chef.role}</p>
        <span className="w-10 h-[1px] bg-primary/20"></span>
      </div>
      <div className="inline-block px-3 py-1 rounded-full bg-gray-50 border border-gray-100 text-ink/30 text-[10px] font-black tracking-widest uppercase">
        {chef.nationality}
      </div>
    </motion.div>
  );
}
