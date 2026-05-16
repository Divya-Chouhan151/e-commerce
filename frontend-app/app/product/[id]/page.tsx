import { getProductById } from '@/lib/api';
import { ShoppingCart, Heart, ShieldCheck, Truck, RotateCcw } from 'lucide-react';

export default async function ProductDetailPage({ params }: { params: { id: string } }) {
  let product;
  try {
    product = await getProductById(params.id);
  } catch (error) {
    return <div className="text-center py-20 text-gray-500">Product not found</div>;
  }

  return (
    <div className="bg-white min-h-screen pb-20">
      <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row gap-12">
        {/* Left: Image */}
        <div className="md:w-1/2">
          <div className="rounded-3xl overflow-hidden border border-gray-100 shadow-sm aspect-square bg-gray-50">
            <img 
              src={product.imageUrl || 'https://via.placeholder.com/600'} 
              alt={product.title} 
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Right: Info */}
        <div className="md:w-1/2 flex flex-col">
          <h1 className="text-3xl font-black text-gray-800 mb-2">{product.title}</h1>
          <p className="text-gray-500 text-lg mb-6">{product.description}</p>
          
          <div className="bg-gray-50 p-6 rounded-2xl mb-8">
            <div className="flex items-baseline space-x-3 mb-2">
              <span className="text-4xl font-black text-amber-800">${product.price}</span>
              <span className="text-gray-400 line-through text-lg">${(product.price * 1.5).toFixed(2)}</span>
              <span className="text-green-600 font-bold text-sm bg-green-50 px-2 py-1 rounded">33% OFF</span>
            </div>
            <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">Inclusive of all taxes</p>
          </div>

          <div className="flex gap-4 mb-10">
            <button className="flex-1 bg-amber-800 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-amber-700 transition-all shadow-lg active:scale-95">
              <ShoppingCart size={20} />
              Add to Cart
            </button>
            <button className="w-16 h-16 border-2 border-amber-800 text-amber-800 rounded-xl flex items-center justify-center hover:bg-amber-50 transition-colors">
              <Heart size={24} />
            </button>
          </div>

          {/* Trust Points */}
          <div className="grid grid-cols-3 gap-4 border-t pt-8">
            <div className="flex flex-col items-center text-center">
               <ShieldCheck className="text-green-600 mb-2" />
               <span className="text-[10px] font-bold text-gray-500 uppercase">Secure <br /> Payments</span>
            </div>
            <div className="flex flex-col items-center text-center">
               <Truck className="text-blue-600 mb-2" />
               <span className="text-[10px] font-bold text-gray-500 uppercase">Free <br /> Shipping</span>
            </div>
            <div className="flex flex-col items-center text-center">
               <RotateCcw className="text-amber-600 mb-2" />
               <span className="text-[10px] font-bold text-gray-500 uppercase">7 Days <br /> Returns</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
