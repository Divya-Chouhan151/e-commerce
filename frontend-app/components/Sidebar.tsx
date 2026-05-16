'use client';

import { 
  User, 
  Package, 
  MapPin, 
  LogOut, 
  X,
  ChevronRight
} from 'lucide-react';
import { useEffect, useState } from 'react';
import Link from 'next/link';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const [userName, setUserName] = useState('Guest');

  useEffect(() => {
    // Basic logout logic
    if (typeof window !== 'undefined') {
      // We could fetch user details here if token exists
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  return (
    <>
      {/* Overlay */}
      <div 
        className={`fixed inset-0 bg-black/40 z-[60] transition-opacity duration-300 ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
        onClick={onClose}
      />
      
      {/* Drawer */}
      <div className={`fixed top-0 left-0 h-full w-80 bg-white z-[70] shadow-2xl transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="bg-amber-800 p-6 text-white">
            <div className="flex justify-between items-start mb-4">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center text-amber-800">
                <User size={32} />
              </div>
              <button onClick={onClose} className="p-1 hover:bg-white/10 rounded-full transition-colors">
                <X size={24} />
              </button>
            </div>
            <h2 className="text-xl font-bold">Hello, {userName}</h2>
            <p className="text-amber-100 text-sm">Welcome to Hunar</p>
          </div>

          {/* Menu Items */}
          <nav className="flex-1 overflow-y-auto py-4">
            <SidebarItem 
              icon={<User size={20} />} 
              label="My Profile" 
              href="/profile" 
              onClick={onClose} 
            />
            <SidebarItem 
              icon={<Package size={20} />} 
              label="My Orders" 
              href="/orders" 
              onClick={onClose} 
            />
            <SidebarItem 
              icon={<MapPin size={20} />} 
              label="Saved Addresses" 
              href="/address" 
              onClick={onClose} 
            />
            
            <div className="border-t border-gray-100 my-4" />
            
            <SidebarItem 
              icon={<LogOut size={20} />} 
              label="Logout" 
              onClick={handleLogout} 
              className="text-red-600"
            />
          </nav>

          {/* Footer */}
          <div className="p-6 border-t border-gray-100 text-center">
            <p className="text-xs text-gray-400">Hunar v1.0.0 • Made with ❤️</p>
          </div>
        </div>
      </div>
    </>
  );
}

function SidebarItem({ 
  icon, 
  label, 
  href, 
  onClick, 
  className = "" 
}: { 
  icon: React.ReactNode, 
  label: string, 
  href?: string, 
  onClick?: () => void,
  className?: string
}) {
  const content = (
    <div className={`flex items-center justify-between px-6 py-4 hover:bg-amber-50 transition-colors cursor-pointer ${className}`}>
      <div className="flex items-center space-x-4">
        <span className="text-amber-700">{icon}</span>
        <span className="font-medium">{label}</span>
      </div>
      <ChevronRight size={16} className="text-gray-300" />
    </div>
  );

  if (href) {
    return (
      <Link href={href} onClick={onClick}>
        {content}
      </Link>
    );
  }

  return (
    <div onClick={onClick}>
      {content}
    </div>
  );
}
