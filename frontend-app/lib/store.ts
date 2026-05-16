import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product } from '@/lib/api';

interface CartItem extends Product {
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  addItem: (product: Product) => void;
  removeItem: (productId: number) => void;
  clearCart: () => void;
  total: number;
}

interface WishlistStore {
  wishlistItems: number[];
  addToWishlist: (productId: number) => void;
  removeFromWishlist: (productId: number) => void;
  isInWishlist: (productId: number) => boolean;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (product) => {
        const items = get().items;
        const existingItem = items.find((item) => item.id === product.id);
        if (existingItem) {
          set({
            items: items.map((item) =>
              item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
            ),
          });
        } else {
          set({ items: [...items, { ...product, quantity: 1 }] });
        }
      },
      removeItem: (productId) => {
        set({
          items: get().items.filter((item) => item.id !== productId),
        });
      },
      clearCart: () => set({ items: [] }),
      get total() {
        return get().items.reduce((sum, item) => sum + item.price * item.quantity, 0);
      },
    }),
    {
      name: 'cart-storage',
    }
  )
);

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      wishlistItems: [],
      addToWishlist: (productId) => {
        if (!get().wishlistItems.includes(productId)) {
          set({ wishlistItems: [...get().wishlistItems, productId] });
        }
      },
      removeFromWishlist: (productId) => {
        set({
          wishlistItems: get().wishlistItems.filter((id) => id !== productId),
        });
      },
      isInWishlist: (productId) => get().wishlistItems.includes(productId),
    }),
    {
      name: 'wishlist-storage',
    }
  )
);
