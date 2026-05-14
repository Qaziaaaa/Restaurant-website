import { motion } from 'motion/react';
import { MapPin, Phone, Mail, Send, Clock } from 'lucide-react';

export default function Contact() {
  return (
    <section id="contact" className="py-32 bg-paper relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-block px-4 py-1.5 rounded-full bg-orange-50 text-primary text-xs font-black uppercase tracking-[0.2em] mb-6">
            Connect
          </div>
          <h2 className="text-5xl font-serif font-bold text-ink mb-6">Let's Start a <span className="text-primary italic">Conversation</span></h2>
          <p className="text-ink/50 text-lg">Whether you have a question about our menu, reservations, or just want to say hi, our team is always ready to assist you.</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white p-12 rounded-[3.5rem] shadow-[0_30px_80px_rgba(0,0,0,0.05)] border border-gray-50"
          >
            <form className="space-y-8">
              <div className="grid sm:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label htmlFor="name" className="text-xs font-black text-ink/40 uppercase tracking-widest ml-1">Full Name</label>
                  <input type="text" id="name" className="w-full px-6 py-4 rounded-2xl border border-gray-100 focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/5 bg-paper transition-all font-bold placeholder:text-ink/20" placeholder="John Doe" />
                </div>
                <div className="space-y-3">
                  <label htmlFor="email" className="text-xs font-black text-ink/40 uppercase tracking-widest ml-1">Email Address</label>
                  <input type="email" id="email" className="w-full px-6 py-4 rounded-2xl border border-gray-100 focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/5 bg-paper transition-all font-bold placeholder:text-ink/20" placeholder="john@example.com" />
                </div>
              </div>
              <div className="space-y-3">
                <label htmlFor="subject" className="text-xs font-black text-ink/40 uppercase tracking-widest ml-1">Subject</label>
                <input type="text" id="subject" className="w-full px-6 py-4 rounded-2xl border border-gray-100 focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/5 bg-paper transition-all font-bold placeholder:text-ink/20" placeholder="Reservations, Feedback, etc." />
              </div>
              <div className="space-y-3">
                <label htmlFor="message" className="text-xs font-black text-ink/40 uppercase tracking-widest ml-1">Your Message</label>
                <textarea id="message" rows={5} className="w-full px-6 py-4 rounded-2xl border border-gray-100 focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/5 bg-paper transition-all font-bold placeholder:text-ink/20 resize-none" placeholder="How can we help you today?"></textarea>
              </div>
              <button type="button" className="w-full bg-primary hover:bg-orange-600 text-white font-black py-5 rounded-2xl transition-all shadow-2xl shadow-primary/30 flex items-center justify-center gap-3 transform active:scale-95 group">
                Send Message
                <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
            </form>
          </motion.div>

          <div className="space-y-12 py-6">
            {[
              { icon: MapPin, title: "Our Sanctuary", detail: "123 Culinary Avenue, Food District, New York, NY 10001", color: "text-blue-600 bg-blue-50" },
              { icon: Phone, title: "Phone Support", detail: "+1 (555) 123-4567 | +1 (555) 987-6543", color: "text-green-600 bg-green-50" },
              { icon: Mail, title: "Email Inquiry", detail: "hello@savoria.com | concierge@savoria.com", color: "text-purple-600 bg-purple-50" },
              { icon: Clock, title: "Opening Hours", detail: "Mon-Fri: 9AM - 11PM | Sat-Sun: 10AM - 12PM", color: "text-orange-600 bg-orange-50" }
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex items-start gap-6 group"
              >
                <div className={`w-14 h-14 ${item.color} rounded-2xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform shadow-sm`}>
                  <item.icon className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-2xl text-ink mb-2 group-hover:text-primary transition-colors">{item.title}</h3>
                  <p className="text-ink/50 font-medium leading-relaxed">{item.detail}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
