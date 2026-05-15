import { Quote } from 'lucide-react';
import { TestimonialCard } from '../../components/TestimonialCard';
import { Testimonial } from '../../types';

const defaultTestimonial: Testimonial = {
  id: 1,
  text: "The food is absolutely amazing! Delivery was incredibly fast, and the packaging kept everything warm and fresh. Savoria is now my go-to restaurant for authentic and delicious meals.",
  author: "Sarah Johnson",
  role: "Food Enthusiast",
  image: "https://i.pravatar.cc/150?img=32",
  rating: 5
};

export function TestimonialsSection() {
  return (
    <section className="py-20 bg-[#FDFDFD] relative overflow-hidden" aria-labelledby="testimonials-heading">
      {/* Decorative Blob */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10 transform translate-x-1/2 -translate-y-1/2" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-primary font-medium tracking-wide uppercase text-sm mb-3">Testimonials</p>
          <h2 id="testimonials-heading" className="text-4xl font-serif font-bold text-ink mb-4">What Our Customers Say</h2>
        </div>

        <div className="max-w-4xl mx-auto bg-white p-8 md:p-12 rounded-[2.5rem] shadow-xl border border-gray-50 relative">
          <Quote className="absolute top-8 md:top-12 left-8 md:left-12 w-16 h-16 text-primary/10 rotate-180" aria-hidden="true" />
          <TestimonialCard testimonial={defaultTestimonial} />
        </div>
      </div>
    </section>
  );
}
