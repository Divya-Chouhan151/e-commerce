'use client';

import Link from 'next/link';
import { useWishlistStore, useCartStore } from '@/lib/store';
import { useEffect, useState } from 'react';
import { 
  Menu, 
  Home, 
  Heart, 
  ShoppingCart, 
  Search,
  User
} from 'lucide-react';
import Sidebar from './Sidebar';

export default function Navbar() {
  const wishlistCount = useWishlistStore((state) => state.wishlistItems.length);
  const cartItemsCount = useCartStore((state) => state.items.length);
  const [mounted, setHydrated] = useState(false);
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  if (!mounted) {
    return (
      <nav className="bg-white border-b border-amber-100 p-4 sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto flex justify-between items-center gap-4">
          <div className="flex items-center space-x-4">
            <div className="p-2 text-amber-800"><Menu size={28} /></div>
            <span className="text-2xl font-black tracking-tighter text-amber-800">HUNAR</span>
          </div>
          <div className="flex-1 max-w-2xl bg-gray-50 h-10 rounded-lg animate-pulse"></div>
          <div className="flex space-x-6">
            <div className="w-8 h-8 bg-gray-100 rounded-full animate-pulse"></div>
            <div className="w-8 h-8 bg-gray-100 rounded-full animate-pulse"></div>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <>
      <nav className="bg-white border-b border-amber-100 p-4 sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto flex justify-between items-center gap-4">
          
          {/* Left: Menu & Logo */}
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setSidebarOpen(true)}
              className="p-2 hover:bg-amber-50 rounded-full transition-colors text-amber-800"
            >
              <Menu size={28} />
            </button>
            <Link href="/" className="text-2xl font-black tracking-tighter text-amber-800 hidden sm:block">
              HUNAR
            </Link>
          </div>

          {/* Center: Search Bar (Meesho style) */}
          <div className="flex-1 max-w-2xl relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input 
              type="text" 
              placeholder="Try Saree, Kurtis or Search by Product Code"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:bg-white focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none text-sm transition-all text-black"
            />
          </div>

          {/* Right: Icons */}
          <div className="flex items-center space-x-2 md:space-x-6">
            
            <NavIcon 
              href="/" 
              icon={<Home size={24} />} 
              label="Home" 
            />

            <NavIcon 
              href="/wishlist" 
              icon={<Heart size={24} />} 
              label="Wishlist" 
              badgeCount={mounted ? wishlistCount : 0}
            />

            <NavIcon 
              href="/cart" 
              icon={<ShoppingCart size={24} />} 
              label="Cart" 
              badgeCount={mounted ? cartItemsCount : 0}
            />

            <div className="h-8 w-[1px] bg-gray-200 hidden md:block" />

            <Link href="/login" className="flex flex-col items-center group">
              <div className="p-2 group-hover:bg-amber-50 rounded-full transition-colors relative">
                <User size={24} className="text-gray-700 group-hover:text-amber-800" />
              </div>
              <span className="text-[10px] font-bold text-gray-500 group-hover:text-amber-800 uppercase tracking-widest">Login</span>
            </Link>

          </div>
        </div>
      </nav>

      <Sidebar isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} />
    </>
  );
}

function NavIcon({ 
  href, 
  icon, 
  label, 
  badgeCount = 0 
}: { 
  href: string, 
  icon: React.ReactNode, 
  label: string, 
  badgeCount?: number 
}) {
  return (
    <Link href={href} className="flex flex-col items-center group relative">
      <div className="p-2 group-hover:bg-amber-50 rounded-full transition-colors relative">
        <span className="text-gray-700 group-hover:text-amber-800">
          {icon}
        </span>
        {badgeCount > 0 && (
          <span className="absolute top-1 right-1 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center shadow-sm">
            {badgeCount}
          </span>
        )}
        
        {/* Tooltip */}
        <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-gray-800 text-white text-[10px] rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-[100]">
          {label}
        </div>
      </div>
      <span className="text-[10px] font-bold text-gray-500 group-hover:text-amber-800 uppercase tracking-widest hidden md:block">
        {label}
      </span>
    </Link>
  );
}
