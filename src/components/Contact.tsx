import { MapPin, Phone, Mail } from 'lucide-react';

export default function Contact() {
  return (
    <section id="contact" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-primary font-semibold uppercase tracking-wider text-sm mb-2">Contact Us</p>
          <h2 className="text-4xl font-serif font-bold text-ink">Get In Touch</h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <form className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <input type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary outline-none" placeholder="Your Name" />
                <input type="email" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary outline-none" placeholder="Email Address" />
              </div>
              <input type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary outline-none" placeholder="Subject" />
              <textarea rows={4} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary outline-none resize-none" placeholder="Message"></textarea>
              <button type="button" className="w-full bg-primary hover:bg-orange-600 text-white font-bold py-4 rounded-xl transition-all">
                Send Message
              </button>
            </form>
          </div>

          <div className="space-y-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-white text-primary rounded-xl flex items-center justify-center shadow-sm border border-gray-100">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-ink">Location</h3>
                <p className="text-ink/60">123 Culinary Avenue, New York, NY</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-white text-primary rounded-xl flex items-center justify-center shadow-sm border border-gray-100">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-ink">Call Us</h3>
                <p className="text-ink/60">+1 (555) 123-4567</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-white text-primary rounded-xl flex items-center justify-center shadow-sm border border-gray-100">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-ink">Email</h3>
                <p className="text-ink/60">hello@savoria.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
