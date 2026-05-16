import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import dynamic from 'next/dynamic';
import { Menu } from 'lucide-react';

// Use dynamic import with ssr: false for components that depend on browser state (Zustand/localStorage)
// This is the most reliable way to prevent hydration mismatches.
const Navbar = dynamic(() => import('@/components/Navbar'), { 
  ssr: false,
  loading: () => (
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
  )
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Hunar - Hand-Knitted Items",
  description: "Beautifully hand-knitted items for you.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
