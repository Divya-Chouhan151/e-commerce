'use client';

import { useCartStore } from '@/lib/store';
import { Package, ChevronRight, ShoppingBag } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, fetch from http://localhost:8080/api/orders
    setLoading(false);
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-2xl font-bold text-amber-900 mb-8 flex items-center">
          <Package className="mr-2" /> My Orders
        </h1>

        {orders.length === 0 && !loading ? (
          <div className="bg-white rounded-2xl p-12 text-center shadow-sm border border-amber-100">
            <ShoppingBag size={64} className="mx-auto text-gray-200 mb-4" />
            <p className="text-xl font-semibold text-gray-600 mb-2">No orders yet</p>
            <p className="text-gray-400 mb-6">Looks like you haven't placed any orders yet.</p>
            <Link href="/" className="bg-amber-800 text-white px-8 py-3 rounded-lg font-bold hover:bg-amber-700 transition-colors">
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
             {/* Order list would go here */}
          </div>
        )}
      </div>
    </div>
  );
}
