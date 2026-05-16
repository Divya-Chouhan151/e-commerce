'use client';

import { useCartStore } from '@/lib/store';
import { ShoppingCart, Trash2, ChevronRight, CreditCard } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function CartPage() {
  const { items, removeItem, total, clearCart } = useCartStore();
  const [mounted, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  if (!mounted) return null;

  const handleCheckout = async () => {
    // Logic for placing order via API would go here
    alert('Order processing logic goes here!');
  };

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-amber-900 mb-8 flex items-center">
          <ShoppingCart className="mr-2" /> Shopping Cart
        </h1>

        {items.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center shadow-sm border border-amber-100">
            <ShoppingCart size={64} className="mx-auto text-gray-200 mb-4" />
            <p className="text-xl font-semibold text-gray-600 mb-2">Your cart is empty</p>
            <p className="text-gray-400 mb-6">Add some hand-knitted items to get started!</p>
            <Link href="/" className="bg-amber-800 text-white px-8 py-3 rounded-lg font-bold hover:bg-amber-700 transition-colors">
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left: Cart Items */}
            <div className="lg:w-2/3 space-y-4">
              {items.map((item) => (
                <div key={item.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex gap-4 items-center">
                  <div className="w-24 h-24 rounded-lg overflow-hidden bg-gray-50 border border-gray-100 flex-shrink-0">
                    <img src={item.imageUrl || 'https://via.placeholder.com/100'} alt={item.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-800">{item.title}</h3>
                    <p className="text-sm text-gray-500 mb-1">Qty: {item.quantity}</p>
                    <p className="text-amber-800 font-black">${item.price}</p>
                  </div>
                  <button 
                    onClick={() => removeItem(item.id)}
                    className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              ))}
              
              <button 
                onClick={clearCart}
                className="text-sm text-gray-400 hover:text-gray-600 font-medium px-2"
              >
                Clear entire cart
              </button>
            </div>

            {/* Right: Price Summary */}
            <div className="lg:w-1/3">
              <div className="bg-white p-6 rounded-2xl shadow-md border border-amber-100 sticky top-24">
                <h2 className="text-lg font-bold mb-4 border-b pb-4">Price Details ({items.length} Items)</h2>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-gray-600">
                    <span>Total Product Price</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-green-600 font-medium">
                    <span>Product Discount</span>
                    <span>-$0.00</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Delivery Fee</span>
                    <span className="text-green-600 font-bold uppercase text-xs mt-1">Free</span>
                  </div>
                  <div className="border-t pt-3 flex justify-between font-black text-lg text-gray-800">
                    <span>Order Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>

                <button 
                  onClick={handleCheckout}
                  className="w-full bg-amber-800 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-amber-700 transition-all shadow-lg active:scale-95"
                >
                  <CreditCard size={20} />
                  Proceed to Checkout
                  <ChevronRight size={20} />
                </button>
                
                <div className="mt-4 flex items-center justify-center gap-2 text-[10px] text-gray-400 uppercase font-bold tracking-widest">
                  <div className="w-4 h-[1px] bg-gray-200"></div>
                  100% Secure Payments
                  <div className="w-4 h-[1px] bg-gray-200"></div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
