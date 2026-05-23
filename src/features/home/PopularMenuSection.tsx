import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { FoodCard } from '../../components/FoodCard';
import { menuService } from '../../services/menu.service';
import { useNavigate } from 'react-router-dom';

export function PopularMenuSection() {
  const navigate = useNavigate();

  const { data, isLoading } = useQuery({
    queryKey: ['featured-menu'],
    queryFn: () => menuService.getFeaturedItems(),
    staleTime: 5 * 60 * 1000,
  });

  const menuItems = data?.items || [];

  return (
    <section id="menu" className="py-24 bg-white relative overflow-hidden" aria-labelledby="menu-heading">
      {/* Decorative background element */}
      <div className="absolute top-0 left-0 w-full h-full opacity-[0.02] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#F27D26 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 text-primary font-bold text-xs uppercase tracking-widest mb-4 border border-orange-100"
            >
              Exquisite Selection
            </motion.div>
            <h2 id="menu-heading" className="text-4xl md:text-5xl font-serif font-bold text-ink mb-4 leading-tight">
              Curated Culinary <span className="text-primary italic">Excellence</span>
            </h2>
          </div>
          <button 
            onClick={() => navigate('/menu')}
            className="group flex items-center gap-3 text-ink font-bold hover:text-primary transition-all duration-150 whitespace-nowrap text-sm uppercase tracking-widest"
          >
            Explore Full Menu 
            <div className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center group-hover:bg-primary group-hover:border-primary group-hover:text-white transition-all duration-150">
              <ArrowRight className="w-5 h-5" />
            </div>
          </button>
        </div>

        {isLoading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="bg-paper rounded-[2.5rem] p-5 animate-pulse">
                <div className="rounded-[2rem] aspect-[4/5] bg-gray-200 mb-6" />
                <div className="px-2 space-y-3">
                  <div className="h-6 bg-gray-200 rounded-lg w-3/4" />
                  <div className="h-8 bg-gray-200 rounded-lg w-1/3 mt-4" />
                </div>
              </div>
            ))}
          </div>
        ) : menuItems.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {menuItems.map((item: any, idx: number) => (
              <FoodCard key={item._id} item={item} index={idx} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 text-ink/40">
            <p className="text-lg font-medium">Menu items coming soon...</p>
          </div>
        )}
      </div>
    </section>
  );
}
