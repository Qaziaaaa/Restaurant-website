import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem } from '../types';

interface CartState {
  cart: CartItem[];
  addToCart: (item: any) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartCount: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cart: [],
      addToCart: (item) => {
        set((state) => {
          const itemId = item._id || item.id;
          const existing = state.cart.find((i) => i._id === itemId);
          if (existing) {
            return {
              cart: state.cart.map((i) =>
                i._id === itemId ? { ...i, quantity: i.quantity + 1 } : i
              ),
            };
          }
          // Handle both backend format (basePrice) and legacy format (price as string)
          const price = typeof item.basePrice === 'number'
            ? item.basePrice
            : typeof item.price === 'number'
              ? item.price
              : parseFloat(String(item.price).replace('$', ''));
          
          const image = Array.isArray(item.images) && item.images.length > 0
            ? item.images[0]
            : item.image || '/menu/placeholder.png';

          return {
            cart: [
              ...state.cart,
              { _id: itemId, name: item.name, price, image, quantity: 1 },
            ],
          };
        });
      },
      removeFromCart: (id) => {
        set((state) => ({
          cart: state.cart.filter((i) => i._id !== id),
        }));
      },
      updateQuantity: (id, quantity) => {
        if (quantity <= 0) {
          get().removeFromCart(id);
          return;
        }
        set((state) => ({
          cart: state.cart.map((i) => (i._id === id ? { ...i, quantity } : i)),
        }));
      },
      clearCart: () => set({ cart: [] }),
      getCartTotal: () => {
        return get().cart.reduce((total, item) => total + item.price * item.quantity, 0);
      },
      getCartCount: () => {
        return get().cart.reduce((count, item) => count + item.quantity, 0);
      },
    }),
    {
      name: 'cart-storage',
    }
  )
);
