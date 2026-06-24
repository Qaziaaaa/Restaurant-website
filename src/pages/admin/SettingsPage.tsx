import { useState } from 'react';
import { Save } from 'lucide-react';

export default function SettingsPage() {
  const [restaurantName, setRestaurantName] = useState('Tandoori Flames');
  const [currency, setCurrency] = useState('USD');
  const [taxRate, setTaxRate] = useState('10');

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-serif font-bold text-ink">Settings</h1>
        <p className="text-ink/50 mt-1">Manage restaurant configuration.</p>
      </div>

      <div className="bg-white rounded-3xl p-8 shadow-premium ring-1 ring-gray-100 space-y-6 max-w-2xl">
        <div>
          <label className="block text-sm font-bold text-ink/70 mb-2">Restaurant Name</label>
          <input value={restaurantName} onChange={(e) => setRestaurantName(e.target.value)} className="w-full bg-paper border border-gray-100 rounded-2xl px-5 py-3.5 text-sm text-ink/80 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-all" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-bold text-ink/70 mb-2">Currency</label>
            <select value={currency} onChange={(e) => setCurrency(e.target.value)} className="w-full bg-paper border border-gray-100 rounded-2xl px-5 py-3.5 text-sm text-ink/80 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-all">
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="GBP">GBP</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-bold text-ink/70 mb-2">Tax Rate (%)</label>
            <input value={taxRate} onChange={(e) => setTaxRate(e.target.value)} type="number" className="w-full bg-paper border border-gray-100 rounded-2xl px-5 py-3.5 text-sm text-ink/80 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-all" />
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <button className="flex items-center space-x-2 bg-primary hover:brightness-110 text-white px-6 py-3 rounded-2xl font-bold text-sm transition-all shadow-lg shadow-primary/20">
            <Save className="h-4 w-4" />
            <span>Save Changes</span>
          </button>
        </div>
      </div>
    </div>
  );
}
