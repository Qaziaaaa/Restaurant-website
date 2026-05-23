import { CreditCard, Truck, ShieldCheck, ArrowRight } from 'lucide-react';

export default function CheckoutSummary({ subtotal, tax, total }: any) {
  return (
    <section className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl sticky top-24" aria-labelledby="order-summary-title">
      <h2 id="order-summary-title" className="text-xl font-bold text-white mb-6">Order Summary</h2>
      
      <div className="space-y-4 mb-8">
        <div className="flex justify-between text-slate-400">
          <span>Subtotal</span>
          <span className="text-white font-medium">${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-slate-400">
          <span>Delivery Fee</span>
          <span className="text-green-500 font-bold uppercase text-xs">Free</span>
        </div>
        <div className="flex justify-between text-slate-400">
          <span>Tax</span>
          <span className="text-white font-medium">${tax.toFixed(2)}</span>
        </div>
        <div className="pt-4 border-t border-slate-800 flex justify-between">
          <span className="text-lg font-bold text-white">Total</span>
          <span className="text-2xl font-black text-blue-500">${total.toFixed(2)}</span>
        </div>
      </div>

      <div className="space-y-3 mb-8">
        <div className="flex items-center text-xs text-slate-500">
          <Truck className="h-4 w-4 mr-2 text-blue-500" aria-hidden="true" />
          Est. Delivery: 25-35 mins
        </div>
        <div className="flex items-center text-xs text-slate-500">
          <ShieldCheck className="h-4 w-4 mr-2 text-emerald-500" aria-hidden="true" />
          Secure SSL encrypted payment
        </div>
      </div>

      <button 
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-4 rounded-2xl transition-all shadow-xl shadow-blue-600/20 flex items-center justify-center group"
        aria-label="Proceed to secure payment"
      >
        <span>PAY SECURELY</span>
        <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
      </button>

      <div className="mt-6 flex justify-center items-center space-x-4 opacity-30 grayscale">
        <CreditCard className="h-6 w-6" />
        <span className="text-[10px] font-bold tracking-widest uppercase">Visa</span>
        <span className="text-[10px] font-bold tracking-widest uppercase">Mastercard</span>
        <span className="text-[10px] font-bold tracking-widest uppercase">Amex</span>
      </div>
    </section>
  );
}
