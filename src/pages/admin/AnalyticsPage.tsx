import { BarChart3, TrendingUp, Users, DollarSign } from 'lucide-react';

const metrics = [
  { name: 'Revenue YTD', value: '$128,430', change: '+18.2%', icon: DollarSign },
  { name: 'Avg Order Value', value: '$38.50', change: '+5.4%', icon: TrendingUp },
  { name: 'Customer Retention', value: '72%', change: '+3.1%', icon: Users },
  { name: 'Table Turnover', value: '4.2/hr', change: '+8.7%', icon: BarChart3 },
];

const topItems = [
  { name: 'Butter Chicken', orders: 342, revenue: 8540 },
  { name: 'Naan Bread', orders: 298, revenue: 2940 },
  { name: 'Biryani', orders: 256, revenue: 6380 },
  { name: 'Samosa', orders: 210, revenue: 2100 },
  { name: 'Mango Lassi', orders: 198, revenue: 1584 },
];

export default function AnalyticsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-serif font-bold text-ink">Analytics</h1>
        <p className="text-ink/50 mt-1">Business performance and insights.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((m) => (
          <div key={m.name} className="bg-white rounded-3xl p-6 shadow-premium ring-1 ring-gray-100 hover:shadow-premium-hover transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-primary/10 rounded-2xl">
                <m.icon className="h-5 w-5 text-primary" />
              </div>
              <span className="text-xs font-bold text-emerald-600">{m.change}</span>
            </div>
            <p className="text-sm font-bold text-ink/50">{m.name}</p>
            <p className="text-2xl font-serif font-bold text-ink mt-1">{m.value}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-3xl p-6 shadow-premium ring-1 ring-gray-100">
        <h3 className="text-lg font-serif font-bold text-ink mb-6">Top Selling Items</h3>
        <div className="space-y-4">
          {topItems.map((item, i) => (
            <div key={item.name} className="flex items-center justify-between py-2">
              <div className="flex items-center space-x-4">
                <span className="text-sm font-bold text-ink/30 w-6">{i + 1}.</span>
                <span className="text-sm font-bold text-ink">{item.name}</span>
              </div>
              <div className="flex items-center space-x-8">
                <span className="text-sm text-ink/50">{item.orders} orders</span>
                <span className="text-sm font-bold text-ink">${item.revenue.toLocaleString()}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
