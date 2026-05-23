import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, SlidersHorizontal, Loader2, UtensilsCrossed } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { menuService } from '../services/menu.service';
import { FoodCard } from '../components/FoodCard';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { CartDrawer } from '../components/CartDrawer';
import type { MenuItem } from '../types';

export function Menu() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [page, setPage] = useState(1);

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(search), 400);
    return () => clearTimeout(timer);
  }, [search]);

  // Reset page when filters change
  useEffect(() => {
    setPage(1);
  }, [debouncedSearch, selectedCategory]);

  // Fetch menu items
  const { data, isLoading, isError } = useQuery({
    queryKey: ['menu', page, debouncedSearch, selectedCategory],
    queryFn: () => menuService.getMenuItems({
      page,
      limit: 12,
      search: debouncedSearch || undefined,
      category: selectedCategory || undefined,
    }),
  });

  // Fetch all items once to extract unique categories
  const { data: allData } = useQuery({
    queryKey: ['menu-all-categories'],
    queryFn: () => menuService.getMenuItems({ limit: 100 }),
    staleTime: 10 * 60 * 1000,
  });

  const categories = allData?.items
    ? Array.from(
        new Map(
          allData.items
            .filter((item: MenuItem) => item.category && typeof item.category === 'object')
            .map((item: MenuItem) => [item.category._id, item.category])
        ).values()
      )
    : [];

  const menuItems = data?.items || [];
  const totalPages = data?.pagination?.totalPages || 1;

  return (
    <div className="min-h-screen font-sans selection:bg-orange-500/30 selection:text-ink flex flex-col">
      <Navbar onCartClick={() => setIsCartOpen(true)} />
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

      {/* Hero Banner */}
      <section className="pt-32 pb-12 bg-gradient-to-b from-orange-50 to-white relative overflow-hidden">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-10"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 text-primary font-bold text-xs uppercase tracking-widest mb-4 border border-orange-100">
              <UtensilsCrossed className="w-3.5 h-3.5" />
              Our Kitchen
            </div>
            <h1 className="text-5xl md:text-6xl font-serif font-bold text-ink mb-4">
              Explore Our <span className="text-primary italic">Menu</span>
            </h1>
            <p className="text-ink/60 text-lg max-w-2xl mx-auto">
              Discover handcrafted dishes prepared with the finest ingredients by our award-winning chefs.
            </p>
          </motion.div>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="max-w-2xl mx-auto"
          >
            <div className="relative group">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-ink/30 group-focus-within:text-primary transition-colors" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search for dishes..."
                className="w-full pl-14 pr-14 py-5 bg-white border-none rounded-2xl shadow-premium focus:ring-2 focus:ring-primary/20 transition-all outline-none text-ink font-medium text-lg"
              />
              <SlidersHorizontal className="absolute right-5 top-1/2 -translate-y-1/2 w-5 h-5 text-ink/20" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-6 bg-white border-b border-gray-100 sticky top-[72px] z-30 backdrop-blur-xl bg-white/90">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
            <button
              onClick={() => setSelectedCategory('')}
              className={`px-6 py-3 rounded-full font-bold text-sm uppercase tracking-widest whitespace-nowrap transition-all duration-150 ${
                !selectedCategory
                  ? 'bg-primary text-white shadow-lg shadow-primary/20'
                  : 'bg-gray-50 text-ink/60 hover:bg-gray-100 ring-1 ring-gray-100'
              }`}
            >
              All Items
            </button>
            {(categories as any[]).map((cat: any) => (
              <button
                key={cat._id}
                onClick={() => setSelectedCategory(cat._id)}
                className={`px-6 py-3 rounded-full font-bold text-sm uppercase tracking-widest whitespace-nowrap transition-all duration-150 ${
                  selectedCategory === cat._id
                    ? 'bg-primary text-white shadow-lg shadow-primary/20'
                    : 'bg-gray-50 text-ink/60 hover:bg-gray-100 ring-1 ring-gray-100'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Menu Grid */}
      <main className="flex-grow py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {isLoading ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="bg-paper rounded-[2.5rem] p-5 animate-pulse">
                  <div className="rounded-[2rem] aspect-[4/5] bg-gray-200 mb-6" />
                  <div className="px-2 space-y-3">
                    <div className="h-6 bg-gray-200 rounded-lg w-3/4" />
                    <div className="h-4 bg-gray-100 rounded-lg w-1/2" />
                    <div className="h-8 bg-gray-200 rounded-lg w-1/3 mt-4" />
                  </div>
                </div>
              ))}
            </div>
          ) : isError ? (
            <div className="text-center py-20">
              <p className="text-2xl font-serif font-bold text-ink mb-2">Something went wrong</p>
              <p className="text-ink/60">Failed to load menu items. Please try again.</p>
            </div>
          ) : menuItems.length === 0 ? (
            <div className="text-center py-20">
              <UtensilsCrossed className="w-16 h-16 text-gray-200 mx-auto mb-4" />
              <p className="text-2xl font-serif font-bold text-ink mb-2">No items found</p>
              <p className="text-ink/60">Try adjusting your search or filter.</p>
            </div>
          ) : (
            <>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {menuItems.map((item: MenuItem, idx: number) => (
                  <FoodCard key={item._id} item={item} index={idx} />
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-3 mt-16">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                    <button
                      key={p}
                      onClick={() => setPage(p)}
                      className={`w-12 h-12 rounded-xl font-bold transition-all ${
                        p === page
                          ? 'bg-primary text-white shadow-lg shadow-primary/20'
                          : 'bg-gray-50 text-ink/60 hover:bg-gray-100'
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
