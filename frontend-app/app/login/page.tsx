'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    
    try {
      const response = await fetch('http://localhost:8080/api/auth/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const token = await response.text();
        localStorage.setItem('token', token);
        setMessage('Login successful!');
        window.location.href = '/';
      } else {
        setMessage('Invalid email or password.');
      }
    } catch (error) {
      console.error(error);
      setMessage('An error occurred during login.');
    }
  };

  return (
    <main className="flex flex-col min-h-[calc(100vh-64px)] items-center justify-center p-4 bg-amber-50">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md border border-amber-200">
        <h2 className="text-2xl font-bold mb-6 text-amber-900 text-center">Login to Hunar</h2>
        {message && (
          <div className={`p-3 rounded mb-4 text-center ${message.includes('successful') ? 'bg-green-100 text-green-800 border border-green-200' : 'bg-red-100 text-red-800 border border-red-200'}`}>
            {message}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-amber-900">Email</label>
            <input 
              type="email" 
              className="mt-1 block w-full border border-amber-200 rounded-md p-2 focus:ring-amber-500 focus:border-amber-500 outline-none text-black bg-white" 
              placeholder="john@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-amber-900">Password</label>
            <input 
              type="password" 
              className="mt-1 block w-full border border-amber-200 rounded-md p-2 focus:ring-amber-500 focus:border-amber-500 outline-none text-black bg-white" 
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
          </div>
          <button type="submit" className="w-full bg-amber-800 text-white py-2 rounded-md hover:bg-amber-700 transition-colors font-medium">
            Login
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">
          Don't have an account? <Link href="/register" className="text-amber-800 hover:underline font-semibold">Register here</Link>
        </p>
      </div>
    </main>
  );
}
