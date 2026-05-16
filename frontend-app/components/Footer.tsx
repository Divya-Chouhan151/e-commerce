import Link from 'next/link';
import { Mail, Phone, MapPin, Globe } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-amber-100 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Brand Info */}
          <div>
            <h2 className="text-2xl font-black tracking-tighter text-amber-800 mb-6">HUNAR</h2>
            <p className="text-gray-500 text-sm leading-relaxed mb-6">
              Hunar brings you the finest hand-knitted items crafted with love by local artisans. Every stitch tells a story of tradition and quality.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-amber-50 rounded-full flex items-center justify-center text-amber-800 hover:bg-amber-800 hover:text-white transition-all">
                <Globe size={18} />
              </a>
              <a href="#" className="w-10 h-10 bg-amber-50 rounded-full flex items-center justify-center text-amber-800 hover:bg-amber-800 hover:text-white transition-all">
                <Mail size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-gray-800 mb-6 uppercase text-xs tracking-widest">Shop Categories</h3>
            <ul className="space-y-4 text-sm text-gray-500">
              <li><Link href="/" className="hover:text-amber-800 transition-colors">Sweaters & Cardigans</Link></li>
              <li><Link href="/" className="hover:text-amber-800 transition-colors">Winter Scarves</Link></li>
              <li><Link href="/" className="hover:text-amber-800 transition-colors">Cozy Blankets</Link></li>
              <li><Link href="/" className="hover:text-amber-800 transition-colors">Baby Essentials</Link></li>
            </ul>
          </div>

          {/* Help & Support */}
          <div>
            <h3 className="font-bold text-gray-800 mb-6 uppercase text-xs tracking-widest">Help & Support</h3>
            <ul className="space-y-4 text-sm text-gray-500">
              <li><Link href="/help" className="hover:text-amber-800 transition-colors">Shipping Policy</Link></li>
              <li><Link href="/help" className="hover:text-amber-800 transition-colors">Returns & Exchanges</Link></li>
              <li><Link href="/help" className="hover:text-amber-800 transition-colors">FAQs</Link></li>
              <li><Link href="/help" className="hover:text-amber-800 transition-colors">Track Your Order</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-bold text-gray-800 mb-6 uppercase text-xs tracking-widest">Contact Us</h3>
            <ul className="space-y-4 text-sm text-gray-500">
              <li className="flex items-start space-x-3">
                <MapPin size={18} className="text-amber-800 shrink-0" />
                <span>123 Artisan Lane, Knitting Village, India</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone size={18} className="text-amber-800 shrink-0" />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail size={18} className="text-amber-800 shrink-0" />
                <span>support@hunar.com</span>
              </li>
            </ul>
          </div>

        </div>

        <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-400">
            © 2026 HUNAR. All Rights Reserved. Built with ❤️ for local artisans.
          </p>
          <div className="flex items-center space-x-6">
            <Link href="/help" className="text-xs text-gray-400 hover:text-amber-800">Privacy Policy</Link>
            <Link href="/help" className="text-xs text-gray-400 hover:text-amber-800">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
