import { Clock, ShieldCheck, Truck } from 'lucide-react';

export default function Services() {
  const services = [
    {
      icon: <Clock className="w-8 h-8" />,
      title: "Fast Delivery",
      description: "We deliver your food in less than 30 minutes. Hot and fresh right to your door."
    },
    {
      icon: <ShieldCheck className="w-8 h-8" />,
      title: "Best Quality",
      description: "We use only the freshest ingredients from local organic farms."
    },
    {
      icon: <Truck className="w-8 h-8" />,
      title: "Free Shipping",
      description: "Free shipping for all orders over $50. No hidden fees or charges."
    }
  ];

  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-primary font-semibold uppercase tracking-wider text-sm mb-2">Our Services</p>
          <h2 className="text-4xl font-serif font-bold text-ink">What We Offer</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, idx) => (
            <div 
              key={idx}
              className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center"
            >
              <div className="w-16 h-16 mx-auto bg-primary/10 text-primary rounded-xl flex items-center justify-center mb-6">
                {service.icon}
              </div>
              <h3 className="text-xl font-bold mb-4 text-ink">{service.title}</h3>
              <p className="text-ink/60 leading-relaxed font-medium">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
