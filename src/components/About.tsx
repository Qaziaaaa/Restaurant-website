import { motion } from 'motion/react';
import { CheckCircle2 } from 'lucide-react';

export default function About() {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-16 items-center">
        <div className="relative">
          <img 
            src="https://images.unsplash.com/photo-1600891964092-4316c288032e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
            alt="Chef Cooking" 
            className="rounded-3xl shadow-xl w-full"
          />
          <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-2xl shadow-xl border border-gray-100 hidden sm:block">
            <h4 className="font-bold text-3xl text-primary mb-1">15+</h4>
            <p className="text-sm font-semibold text-ink/60 uppercase">Years of Service</p>
          </div>
        </div>

        <div>
          <p className="text-primary font-semibold uppercase tracking-wider text-sm mb-2">About Us</p>
          <h2 className="text-4xl lg:text-5xl font-serif font-bold text-ink mb-6">
            We Provide The Best <br /> Food Experience
          </h2>
          <p className="text-lg text-ink/60 mb-8 leading-relaxed">
            Our mission is to serve you with the highest quality food, prepared by world-class chefs using fresh and organic ingredients. We believe in providing an unforgettable dining experience.
          </p>

          <div className="grid sm:grid-cols-2 gap-4 mb-10">
            {[
              "Organic Ingredients",
              "Expert Chefs",
              "Fast Delivery",
              "Clean Kitchen"
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-primary" />
                <span className="font-semibold text-ink/80">{item}</span>
              </div>
            ))}
          </div>

          <button className="bg-ink hover:bg-gray-800 text-white px-8 py-4 rounded-xl font-bold transition-all">
            Learn More
          </button>
        </div>
      </div>
    </section>
  );
}
