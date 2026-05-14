export default function Footer() {
  return (
    <footer className="bg-ink text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 pb-12 border-b border-white/10">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 bg-primary rounded flex items-center justify-center font-serif font-bold text-xl">
                S
              </div>
              <span className="font-serif font-bold text-2xl tracking-tight">
                Savoria
              </span>
            </div>
            <p className="text-gray-400">
              The best food delivery service in the city. Fast, fresh, and reliable.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-6">Links</h4>
            <ul className="space-y-4 text-gray-400">
              <li><a href="#" className="hover:text-primary transition-colors">Home</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Menu</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">About</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-6">Support</h4>
            <ul className="space-y-4 text-gray-400">
              <li><a href="#" className="hover:text-primary transition-colors">FAQ</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Shipping</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Privacy</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-6">Contact</h4>
            <ul className="space-y-4 text-gray-400">
              <li>123 Culinary Ave, NY</li>
              <li>hello@savoria.com</li>
              <li>+1 (555) 123-4567</li>
            </ul>
          </div>
        </div>
        <div className="pt-8 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} Savoria. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
