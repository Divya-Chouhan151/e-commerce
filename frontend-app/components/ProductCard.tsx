'use client';

import { Product } from '@/lib/api';
import Link from 'next/link';
import { useWishlistStore, useCartStore } from '@/lib/store';
import { useEffect, useState } from 'react';

export default function ProductCard({ product }: { product: Product }) {
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlistStore();
  const { addItem } = useCartStore();
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  const sampleImages: { [key: string]: string } = {
    'Sweater': 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&q=80&w=600',
    'Scarf': 'https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?auto=format&fit=crop&q=80&w=600',
    'Blanket': 'https://images.unsplash.com/photo-1580301762395-21ce84d00bc6?auto=format&fit=crop&q=80&w=600',
    'Baby': 'https://images.unsplash.com/photo-1522771935876-2497116a7a9e?auto=format&fit=crop&q=80&w=600'
  };

  const getImageUrl = (title: string) => {
    if (product.imageUrl) return product.imageUrl;
    const key = Object.keys(sampleImages).find(k => title.includes(k)) || 'Sweater';
    return sampleImages[key];
  };

  if (!mounted) {
    return (
      <div className="border border-amber-100 rounded-2xl h-[400px] animate-pulse bg-gray-50"></div>
    );
  }

  return (
    <div className="group border border-amber-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 bg-white relative">
      <button 
        onClick={toggleWishlist}
        className="absolute top-3 right-3 z-10 p-2 rounded-full bg-white/80 hover:bg-white shadow-sm transition-colors group"
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          fill={isFavorite ? "currentColor" : "none"} 
          viewBox="0 0 24 24" 
          strokeWidth={1.5} 
          stroke="currentColor" 
          className={`w-6 h-6 transition-colors ${isFavorite ? "text-red-500" : "text-gray-400 group-hover:text-red-400"}`}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
        </svg>
      </button>

      <div className="relative h-56 overflow-hidden">
        <img 
          src={getImageUrl(product.title)} 
          alt={product.title} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
        />
      </div>

      <div className="p-5">
        <h3 className="font-bold text-lg text-amber-900 line-clamp-1">{product.title}</h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2 h-10">{product.description}</p>
        
        <div className="flex justify-between items-center mb-4">
          <span className="text-xl font-black text-amber-800">${product.price}</span>
          <span className={`text-[10px] uppercase font-bold px-2 py-1 rounded ${product.stockQuantity > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
            {product.stockQuantity > 0 ? `${product.stockQuantity} In Stock` : 'Out of Stock'}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <Link 
            href={`/product/${product.id}`}
            className="text-center text-amber-800 border border-amber-800 py-2 rounded-lg hover:bg-amber-50 transition-colors text-sm font-semibold"
          >
            Details
          </Link>
          <button 
            onClick={() => addItem(product)}
            className="bg-amber-800 text-white py-2 rounded-lg hover:bg-amber-700 transition-colors text-sm font-semibold shadow-sm active:scale-95 duration-75"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
