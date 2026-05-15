import { Product } from '@/lib/api';
import Link from 'next/link';

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <img src={product.imageUrl || 'https://via.placeholder.com/300'} alt={product.title} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="font-semibold text-lg">{product.title}</h3>
        <p className="text-gray-600 text-sm mb-2">{product.description}</p>
        <div className="flex justify-between items-center">
          <span className="text-amber-800 font-bold">${product.price}</span>
          <span className="text-sm text-gray-500">{product.stockQuantity} in stock</span>
        </div>
        <Link 
          href={`/product/${product.id}`}
          className="mt-4 block text-center bg-amber-800 text-white py-2 rounded hover:bg-amber-700"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}
