import { Star } from 'lucide-react';
import { Testimonial } from '../types';

interface TestimonialCardProps {
  testimonial: Testimonial;
}

export function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <div className="relative z-10 flex flex-col items-center text-center">
      <div className="flex gap-1 text-yellow-400 mb-6" aria-label={`Rated ${testimonial.rating} out of 5 stars`}>
        {[...Array(5)].map((_, i) => (
          <Star 
            key={i} 
            className={`w-6 h-6 ${i < Math.floor(testimonial.rating) ? 'fill-current' : 'fill-transparent text-gray-300'}`} 
          />
        ))}
      </div>
      <p className="text-xl md:text-2xl font-serif text-ink leading-relaxed mb-8">
        "{testimonial.text}"
      </p>
      <div className="flex items-center gap-4">
        <img 
          src={testimonial.image} 
          alt={testimonial.author} 
          loading="lazy"
          className="w-14 h-14 rounded-full object-cover" 
        />
        <div className="text-left">
          <h4 className="font-bold text-ink">{testimonial.author}</h4>
          <p className="text-sm text-ink/60">{testimonial.role}</p>
        </div>
      </div>
    </div>
  );
}
