import { Facebook, Twitter, Instagram, ArrowUpRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-ink text-white pt-32 pb-12 overflow-hidden relative">
      {/* Decorative text */}
      <div className="absolute top-20 right-[-10%] text-[20rem] font-black text-white/[0.02] select-none pointer-events-none">
        SAVORIA
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-20 pb-24 border-b border-white/5">
          
          <div className="space-y-8">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-primary text-white rounded-2xl flex items-center justify-center font-serif font-bold text-2xl shadow-xl shadow-primary/20">
                S
              </div>
              <span className="font-serif font-bold text-3xl tracking-tight">
                Savoria<span className="text-primary italic">.</span>
              </span>
            </div>
            <p className="text-gray-500 leading-relaxed text-lg">
              Elevating the art of dining through exquisite flavors and unparalleled service since 2010.
            </p>
            <div className="flex gap-4">
              {['Facebook', 'Twitter', 'Instagram'].map((social, i) => (
                 <button key={social} className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center hover:bg-primary transition-all group">
                   <span className="text-sm font-bold group-hover:scale-110 transition-transform">{social[0]}</span>
                 </button>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-serif font-bold text-xl mb-10 text-primary">Discover</h4>
            <ul className="space-y-6">
              {['Our Story', 'Master Chefs', 'Seasonal Menu', 'Private Dining'].map(link => (
                <li key={link}>
                  <a href="#" className="text-gray-500 hover:text-white transition-all flex items-center gap-2 group">
                    {link} <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-1" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-serif font-bold text-xl mb-10 text-primary">Support</h4>
            <ul className="space-y-6">
              {['Delivery Info', 'Help Center', 'Terms of Service', 'Privacy Policy'].map(link => (
                <li key={link}>
                  <a href="#" className="text-gray-500 hover:text-white transition-all flex items-center gap-2 group">
                    {link} <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-1" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-8">
            <h4 className="font-serif font-bold text-xl mb-6 text-primary">Newsletter</h4>
            <p className="text-gray-500">Join our community for exclusive recipes and private event invites.</p>
            <div className="relative">
              <input 
                type="email" 
                placeholder="Your email" 
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 focus:outline-none focus:border-primary transition-colors font-medium text-white placeholder:text-gray-600"
              />
              <button className="absolute right-2 top-2 bottom-2 bg-primary hover:bg-orange-600 text-white px-5 rounded-xl font-bold transition-all transform active:scale-95 shadow-lg shadow-primary/20">
                Join
              </button>
            </div>
          </div>

        </div>

        <div className="pt-12 flex flex-col md:flex-row justify-between items-center gap-6 text-gray-600 text-sm font-bold tracking-widest uppercase">
          <p>&copy; {new Date().getFullYear()} Savoria International. All rights reserved.</p>
          <div className="flex gap-10">
            <a href="#" className="hover:text-white transition-colors">Instagram</a>
            <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
            <a href="#" className="hover:text-white transition-colors">Dribbble</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
