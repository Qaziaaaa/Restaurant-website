import { motion } from 'motion/react';
import { Clock, ShieldCheck, Truck, Utensils, Star, Sparkles } from 'lucide-react';

export default function Services() {
  const services = [
    {
      icon: <Clock className="w-8 h-8" />,
      title: "Swift Delivery",
      description: "Our dedicated fleet ensures your meal arrives piping hot within 30 minutes, or it's on us.",
      color: "bg-blue-50 text-blue-600"
    },
    {
      icon: <ShieldCheck className="w-8 h-8" />,
      title: "Premium Quality",
      description: "We source only the finest organic ingredients from local farmers to guarantee peak freshness.",
      color: "bg-green-50 text-green-600"
    },
    {
      icon: <Truck className="w-8 h-8" />,
      title: "Eco-Friendly",
      description: "100% sustainable packaging and carbon-neutral delivery options for a better planet.",
      color: "bg-orange-50 text-orange-600"
    }
  ];

  return (
    <section id="services" className="py-32 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 text-primary text-[10px] font-black uppercase tracking-[0.2em] mb-4">
            <Sparkles className="w-3 h-3" />
            Our Distinction
          </div>
          <h2 className="text-5xl font-serif font-bold text-ink mb-6">Why Foodies <span className="text-primary italic">Choose</span> Savoria</h2>
          <p className="text-ink/50 text-lg">We don't just deliver food; we deliver a premium experience that honors your time and taste.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-10">
          {services.map((service, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2 }}
              className="group p-10 rounded-[3rem] bg-paper hover:bg-white transition-all duration-500 border border-transparent hover:border-gray-100 hover:shadow-[0_20px_60px_rgba(0,0,0,0.05)] cursor-default text-center"
            >
              <div className={`w-24 h-24 mx-auto ${service.color} rounded-[2rem] flex items-center justify-center mb-10 group-hover:scale-110 group-hover:-translate-y-2 transition-all duration-500 shadow-sm`}>
                {service.icon}
              </div>
              <h3 className="text-2xl font-bold font-serif mb-5 text-ink">{service.title}</h3>
              <p className="text-ink/50 leading-relaxed font-medium">
                {service.description}
              </p>
              
              <div className="mt-8 pt-8 border-t border-gray-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <button className="text-primary font-bold text-sm flex items-center gap-2 mx-auto hover:gap-3 transition-all">
                  Learn More <Star className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Floating Stat bar */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="mt-32 p-12 rounded-[3.5rem] bg-ink text-white grid grid-cols-2 md:grid-cols-4 gap-12 text-center relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -z-0" />
          
          {[
            { label: "Daily Orders", val: "1.2k+" },
            { label: "Happy Clients", val: "15k+" },
            { label: "Expert Chefs", val: "25+" },
            { label: "Cities Served", val: "12" }
          ].map((stat, i) => (
            <div key={i} className="relative z-10">
              <h4 className="text-4xl font-serif font-bold text-primary mb-2">{stat.val}</h4>
              <p className="text-gray-400 text-sm font-bold uppercase tracking-widest">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
