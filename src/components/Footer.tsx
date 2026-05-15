import { Facebook, Twitter, Instagram } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-ink text-white pt-20 pb-10" aria-label="Site Footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 divide-y divide-white/10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-16">
          
          {/* Brand */}
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center font-serif font-bold text-xl">
                S
              </div>
              <span className="font-serif font-bold text-2xl tracking-tight">
                Savoria<span className="text-primary">.</span>
              </span>
            </div>
            <p className="text-gray-400 leading-relaxed max-w-sm">
              Our job is to fill your tummy with delicious food and with fast and free delivery.
            </p>
            <div className="flex gap-4">
              {[
                { name: 'Facebook', icon: <Facebook className="w-5 h-5" /> },
                { name: 'Twitter', icon: <Twitter className="w-5 h-5" /> },
                { name: 'Instagram', icon: <Instagram className="w-5 h-5" /> }
              ].map(social => (
                 <a key={social.name} href="#" aria-label={`Visit our ${social.name}`} className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center hover:bg-primary transition-all duration-75 hover:-translate-y-1 text-sm shadow-sm hover:shadow-premium-hover text-white">
                   {social.icon}
                 </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-bold font-serif text-lg mb-6">About</h4>
            <ul className="space-y-4">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Features</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">News & Blog</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold font-serif text-lg mb-6">Company</h4>
            <ul className="space-y-4">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Why Savoria?</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Partner With Us</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">FAQ</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold font-serif text-lg mb-6">Get in Touch</h4>
            <ul className="space-y-4 text-gray-400">
              <li>123 Main Street, New York, NY 10001</li>
              <li>contact@savoria.com</li>
              <li>+1 (555) 123-4567</li>
            </ul>
          </div>

        </div>

        <div className="pt-8 text-center md:flex md:justify-between md:text-left text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} Savoria. All rights reserved.</p>
          <div className="space-x-4 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
