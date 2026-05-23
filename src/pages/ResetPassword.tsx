import { useState } from 'react';
import { motion } from 'motion/react';
import { Lock, ArrowRight, CheckCircle2, Loader2 } from 'lucide-react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { authService } from '../services/auth.service';

export default function ResetPassword() {
  const { token } = useParams<{ token: string }>();
  const navigate = useNavigate();
  
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 6) {
      setStatus('error');
      setMessage('Password must be at least 6 characters');
      return;
    }
    if (password !== confirmPassword) {
      setStatus('error');
      setMessage('Passwords do not match');
      return;
    }
    if (!token) {
      setStatus('error');
      setMessage('Invalid reset token');
      return;
    }

    setStatus('loading');
    
    try {
      const response = await authService.resetPassword({ token, password });
      setStatus('success');
      setMessage(response.message || 'Password has been reset successfully.');
      setTimeout(() => navigate('/login'), 3000);
    } catch (error: any) {
      setStatus('error');
      setMessage(error.response?.data?.message || 'Something went wrong or your token has expired.');
    }
  };

  return (
    <div className="min-h-screen bg-paper flex items-center justify-center p-4 pt-24 pb-12 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md mx-auto p-8 bg-white/80 backdrop-blur-xl rounded-3xl shadow-premium ring-1 ring-gray-100 z-10"
      >
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-primary text-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-primary/20">
            <Lock className="w-8 h-8" />
          </div>
          <h1 className="text-3xl font-serif font-bold text-ink mb-2">Reset Password</h1>
          <p className="text-ink/60">
            Enter your new password below.
          </p>
        </div>

        {status === 'success' ? (
          <div className="text-center space-y-6">
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 200 }} className="flex justify-center mb-4">
              <CheckCircle2 className="w-16 h-16 text-green-600" />
            </motion.div>
            <div className="p-4 bg-green-50 border border-green-100 rounded-xl">
              <p className="text-green-700 text-sm">{message}</p>
            </div>
            <p className="text-ink/40 text-sm">Redirecting you to login...</p>
            <Link to="/login" className="inline-flex items-center text-sm text-primary font-bold hover:underline transition-colors">
              Go to Login now
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
              <label className="text-sm font-bold text-ink/70 ml-1">New Password</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-ink/30 group-focus-within:text-primary transition-colors" />
                <input
                  type="password"
                  id="password"
                  required
                  minLength={6}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-primary/20 transition-all outline-none text-ink font-medium"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-ink/70 ml-1">Confirm New Password</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-ink/30 group-focus-within:text-primary transition-colors" />
                <input
                  type="password"
                  id="confirmPassword"
                  required
                  minLength={6}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-primary/20 transition-all outline-none text-ink font-medium"
                  placeholder="••••••••"
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
                  Reset Password
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>
        )}
      </motion.div>
    </div>
  );
}
