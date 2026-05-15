import { motion } from 'motion/react';
import { Clock, ShieldCheck, Truck, ArrowRight } from 'lucide-react';

const services = [
  {
    icon: <Clock className="w-8 h-8" aria-hidden="true" />,
    title: "Fast Delivery",
    description: "We promise to deliver your food within 30 minutes. If not, your meal is on us."
  },
  {
    icon: <ShieldCheck className="w-8 h-8" aria-hidden="true" />,
    title: "Fresh Quality",
    description: "We only use the freshest and finest ingredients for all our delicacies."
  },
  {
    icon: <Truck className="w-8 h-8" aria-hidden="true" />,
    title: "Free Shipping",
    description: "Enjoy free shipping on all orders above $50. No hidden charges applied."
  }
];

export function ServicesSection() {
  return (
    <section id="services" className="py-24 bg-white relative overflow-hidden" aria-labelledby="services-heading">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-orange-50/30 -skew-x-12 transform origin-top translate-x-1/2 -z-10" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 text-primary font-bold text-[10px] uppercase tracking-[0.2em] mb-4 border border-orange-100"
          >
            What We Offer
          </motion.div>
          <h2 id="services-heading" className="text-4xl md:text-5xl font-serif font-bold text-ink mb-6">
            Your Favorite Food <span className="text-primary italic">Delivery Partner</span>
          </h2>
          <p className="text-ink/60 text-lg font-medium">
            We don't just deliver food, we deliver an experience crafted with passion and excellence.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {services.map((service, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.6 }}
              className="group text-center p-10 rounded-[2.5rem] bg-paper hover:bg-white transition-all duration-500 shadow-soft hover:shadow-premium hover:-translate-y-2 ring-1 ring-gray-100/50 cursor-pointer"
            >
              <div className="w-24 h-24 mx-auto bg-white shadow-premium text-primary rounded-[2rem] flex items-center justify-center mb-8 group-hover:-translate-y-4 transition-transform duration-200 ease-out">
                {service.icon}
              </div>
              <h3 className="text-2xl font-bold font-serif mb-4 text-ink group-hover:text-primary transition-colors">{service.title}</h3>
              <p className="text-ink/60 leading-relaxed font-medium">
                {service.description}
              </p>
              
              <div className="mt-8 pt-8 border-t border-gray-100/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <span className="text-primary font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-2">
                  Learn More <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
