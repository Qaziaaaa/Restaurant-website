import { Star, Quote } from 'lucide-react';

export default function Testimonials() {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Food Critic",
      image: "https://i.pravatar.cc/150?img=32",
      content: "The best food I've had in a long time. The delivery was super fast and the quality was outstanding.",
      rating: 5
    },
    {
      name: "David Chen",
      role: "Local Guide",
      image: "https://i.pravatar.cc/150?img=11",
      content: "I love their organic ingredients and unique recipes. Savoria is definitely my favorite restaurant.",
      rating: 5
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-primary font-semibold uppercase tracking-wider text-sm mb-2">Testimonials</p>
          <h2 className="text-4xl font-serif font-bold text-ink">What Our Customers Say</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {testimonials.map((t, i) => (
            <div 
              key={i}
              className="bg-gray-50 p-8 rounded-2xl border border-gray-100 flex flex-col gap-6"
            >
              <Quote className="w-10 h-10 text-primary opacity-20" />
              <p className="text-lg text-ink/70 italic leading-relaxed">
                "{t.content}"
              </p>
              <div className="flex items-center gap-4 mt-auto">
                <img src={t.image} alt={t.name} className="w-12 h-12 rounded-full object-cover" />
                <div>
                  <h4 className="font-bold text-ink">{t.name}</h4>
                  <div className="flex text-yellow-400">
                    {[...Array(t.rating)].map((_, i) => <Star key={i} className="fill-current w-3 h-3" />)}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
