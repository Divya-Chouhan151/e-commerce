import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-amber-100 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-amber-800">Hunar</Link>
        <div className="space-x-4">
          <Link href="/" className="text-amber-900 hover:text-amber-600">Home</Link>
          <Link href="/wishlist" className="text-amber-900 hover:text-amber-600">Wishlist</Link>
          <Link href="/cart" className="text-amber-900 hover:text-amber-600">Cart</Link>
          <Link href="/login" className="bg-amber-800 text-white px-4 py-2 rounded hover:bg-amber-700">Login</Link>
        </div>
      </div>
    </nav>
  );
}
