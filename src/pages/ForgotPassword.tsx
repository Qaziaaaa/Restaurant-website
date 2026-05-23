import { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, ArrowRight, ArrowLeft, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { authService } from '../services/auth.service';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes('@') || !email.includes('.')) {
      setStatus('error');
      setMessage('Please enter a valid email address.');
      return;
    }
    setStatus('loading');
    
    try {
      const response = await authService.forgotPassword(email);
      setStatus('success');
      setMessage(response.message || 'If that email exists, a reset link has been sent.');
    } catch (error: any) {
      setStatus('error');
      setMessage(error.response?.data?.message || 'Something went wrong. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-paper flex items-center justify-center p-4 pt-24 pb-12 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      </div>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md mx-auto p-8 bg-white/80 backdrop-blur-xl rounded-3xl shadow-premium ring-1 ring-gray-100 z-10"
      >
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-primary text-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-primary/20">
            <Mail className="w-8 h-8" />
          </div>
          <h1 className="text-3xl font-serif font-bold text-ink mb-2">Forgot Password</h1>
          <p className="text-ink/60">
            Enter your email address and we'll send you a link to reset your password.
          </p>
        </div>

        {status === 'success' ? (
          <div className="text-center space-y-6">
            <div className="p-4 bg-green-50 border border-green-100 rounded-xl">
              <p className="text-green-700 text-sm">{message}</p>
            </div>
            <Link 
              to="/login"
              className="inline-flex items-center text-sm text-primary font-bold hover:underline transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Login
            </Link>
          </div>
        ) : (
          <form className="space-y-5" onSubmit={handleSubmit}>
            {status === 'error' && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="p-4 bg-red-50 text-red-600 rounded-xl text-sm font-medium border border-red-100"
              >
                {message}
              </motion.div>
            )}
            
            <div className="space-y-2">
              <label className="text-sm font-bold text-ink/70 ml-1">Email Address</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-ink/30 group-focus-within:text-primary transition-colors" />
                <input
                  type="email"
                  id="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-primary/20 transition-all outline-none text-ink font-medium"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full bg-primary hover:brightness-110 text-white py-4 rounded-2xl font-bold transition-all shadow-premium hover:shadow-premium-hover flex items-center justify-center gap-2 disabled:opacity-70 text-sm uppercase tracking-widest"
            >
              {status === 'loading' ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  Send Reset Link
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
            
            <p className="text-center mt-6 text-ink/60 font-medium">
              <Link to="/login" className="text-primary font-bold hover:underline">
                Remembered your password? Sign in
              </Link>
            </p>
          </form>
        )}
      </motion.div>
    </div>
  );
}
