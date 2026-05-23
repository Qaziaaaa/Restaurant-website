import { useState } from 'react';
import { Mail, Lock, User, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface AuthFormProps {
  mode: 'login' | 'signup';
}

export default function AuthForm({ mode }: AuthFormProps) {
  return (
    <div className="w-full max-w-md mx-auto p-8 bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">
          {mode === 'login' ? 'Welcome Back' : 'Create Account'}
        </h2>
        <p className="text-slate-500 text-sm">
          {mode === 'login' ? 'Enter your credentials to access your account' : 'Join Savoria and experience culinary excellence'}
        </p>
      </div>

      <form className="space-y-5" aria-label={mode === 'login' ? 'Login form' : 'Signup form'}>
        {mode === 'signup' && (
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-slate-400 mb-1.5">Full Name</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" aria-hidden="true" />
              <input
                type="text"
                id="name"
                name="name"
                autoComplete="name"
                required
                className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 pl-10 pr-4 text-white focus:ring-2 focus:ring-blue-600/50 outline-none transition-all"
                placeholder="John Doe"
              />
            </div>
          </div>
        )}

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-slate-400 mb-1.5">Email Address</label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" aria-hidden="true" />
            <input
              type="email"
              id="email"
              name="email"
              autoComplete="email"
              required
              className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 pl-10 pr-4 text-white focus:ring-2 focus:ring-blue-600/50 outline-none transition-all"
              placeholder="name@example.com"
            />
          </div>
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-slate-400 mb-1.5">Password</label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" aria-hidden="true" />
            <input
              type="password"
              id="password"
              name="password"
              autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
              required
              className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 pl-10 pr-4 text-white focus:ring-2 focus:ring-blue-600/50 outline-none transition-all"
              placeholder="••••••••"
            />
          </div>
          {mode === 'login' && (
            <div className="flex justify-end mt-2">
              <Link 
                to="/forgot-password"
                className="text-sm font-medium text-blue-500 hover:text-blue-400 transition-colors"
              >
                Forgot Password?
              </Link>
            </div>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-blue-600/20 flex items-center justify-center group"
        >
          {mode === 'login' ? 'Sign In' : 'Create Account'}
          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
        </button>
      </form>
    </div>
  );
}
