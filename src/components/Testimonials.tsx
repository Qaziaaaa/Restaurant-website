import { motion } from 'motion/react';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';

export default function Testimonials() {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Culinary Blogger",
      image: "https://i.pravatar.cc/150?img=32",
      content: "The flavor profile of their Wagyu burger is unlike anything I've experienced. Delivery was remarkably fast, and the packaging kept the presentation immaculate.",
      rating: 5
    },
    {
      name: "David Chen",
      role: "Tech Executive",
      image: "https://i.pravatar.cc/150?img=11",
      content: "Savoria has perfected the art of high-end food delivery. It's my go-to for client dinners at home. The attention to detail is simply unparalleled.",
      rating: 5
    }
  ];

  return (
    <section className="py-32 bg-white relative overflow-hidden">
      {/* Decorative Blur */}
      <div className="absolute -top-24 -left-24 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -z-10" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          <div className="lg:w-1/3">
            <div className="inline-block px-4 py-1.5 rounded-full bg-orange-50 text-primary text-xs font-black uppercase tracking-[0.2em] mb-6">
              Our Admirers
            </div>
            <h2 className="text-5xl font-serif font-bold text-ink mb-8 leading-[1.1]">
              Voices from our <span className="text-primary italic">Community</span>
            </h2>
            <p className="text-xl text-ink/50 mb-10 leading-relaxed">
              We take pride in the stories shared by our guests. Each review is a testament to our commitment to excellence.
            </p>
            <div className="flex gap-4">
              <button className="w-14 h-14 rounded-2xl border-2 border-gray-100 flex items-center justify-center text-ink hover:bg-ink hover:text-white transition-all transform active:scale-90">
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button className="w-14 h-14 rounded-2xl bg-primary text-white flex items-center justify-center shadow-xl shadow-primary/20 hover:bg-orange-600 transition-all transform active:scale-90">
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </div>

          <div className="lg:w-2/3 grid md:grid-cols-2 gap-8">
            {testimonials.map((t, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="bg-paper p-10 rounded-[3rem] border border-gray-50 shadow-sm relative group hover:shadow-2xl hover:border-primary/10 transition-all duration-500"
              >
                <div className="w-16 h-16 bg-white rounded-2xl shadow-lg flex items-center justify-center mb-8 absolute -top-8 left-10 group-hover:bg-primary group-hover:text-white transition-colors duration-500">
                  <Quote className="w-8 h-8 opacity-20" />
                </div>
                
                <div className="flex gap-1 text-yellow-400 mb-6">
                  {[...Array(t.rating)].map((_, i) => <Star key={i} className="fill-current w-4 h-4" />)}
                </div>
                
                <p className="text-lg font-serif text-ink/80 leading-relaxed mb-10 italic">
                  "{t.content}"
                </p>
                
                <div className="flex items-center gap-5">
                  <img src={t.image} alt={t.name} className="w-14 h-14 rounded-2xl object-cover ring-4 ring-white shadow-md" />
                  <div>
                    <h4 className="font-bold text-ink">{t.name}</h4>
                    <p className="text-xs font-bold text-ink/40 uppercase tracking-widest">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
