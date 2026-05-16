'use client';

import { useWishlistStore, useCartStore } from '@/lib/store';
import { Heart, ShoppingBag, Trash2, ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState, useMemo } from 'react';
import { getProducts, Product } from '@/lib/api';

export default function WishlistPage() {
  const { wishlistItems, removeFromWishlist } = useWishlistStore();
  const { addItem } = useCartStore();
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [mounted, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
    getProducts().then(setAllProducts).catch(console.error);
  }, []);

  const favoriteProducts = useMemo(() => {
    return allProducts.filter(p => wishlistItems.includes(p.id));
  }, [allProducts, wishlistItems]);

  if (!mounted) return null;

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-amber-900 mb-8 flex items-center">
          <Heart className="mr-2 text-red-500 fill-current" /> My Wishlist
        </h1>

        {favoriteProducts.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center shadow-sm border border-amber-100">
            <div className="w-20 h-20 bg-amber-50 rounded-full flex items-center justify-center mx-auto mb-4">
               <Heart size={40} className="text-amber-200" />
            </div>
            <p className="text-xl font-semibold text-gray-600 mb-2">Your wishlist is empty</p>
            <p className="text-gray-400 mb-6">Save items you love to find them easily later.</p>
            <Link href="/" className="bg-amber-800 text-white px-8 py-3 rounded-lg font-bold hover:bg-amber-700 transition-colors">
              Explore Collection
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {favoriteProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 group relative">
                <button 
                  onClick={() => removeFromWishlist(product.id)}
                  className="absolute top-3 right-3 z-10 p-2 rounded-full bg-white/80 hover:bg-white text-red-500 shadow-sm transition-colors"
                >
                  <Trash2 size={18} />
                </button>
                
                <div className="h-48 overflow-hidden">
                  <img src={product.imageUrl || 'https://via.placeholder.com/300'} alt={product.title} className="w-full h-full object-cover" />
                </div>
                
                <div className="p-4">
                  <h3 className="font-bold text-gray-800 mb-1 truncate">{product.title}</h3>
                  <p className="text-amber-800 font-black mb-4">${product.price}</p>
                  
                  <button 
                    onClick={() => addItem(product)}
                    className="w-full flex items-center justify-center gap-2 bg-amber-800 text-white py-2 rounded-lg font-bold text-sm hover:bg-amber-700 transition-colors"
                  >
                    <ShoppingCart size={16} />
                    Move to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
