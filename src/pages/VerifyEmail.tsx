import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CheckCircle2, XCircle, Loader2 } from 'lucide-react';
import { api } from '../services/api';

export function VerifyEmail() {
  const { token } = useParams<{ token: string }>();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!token) {
      setStatus('error');
      setMessage('Invalid verification link.');
      return;
    }

    api.get(`/auth/verify-email/${token}`)
      .then(() => {
        setStatus('success');
        setMessage('Email verified successfully! You can now log in.');
      })
      .catch((err) => {
        setStatus('error');
        setMessage(err.response?.data?.message || 'Verification failed. The link may be invalid or expired.');
      });
  }, [token]);

  return (
    <div className="min-h-screen font-sans flex items-center justify-center bg-paper px-4">
      <div className="bg-white rounded-3xl shadow-premium p-12 max-w-md w-full text-center ring-1 ring-gray-100">
        {status === 'loading' && (
          <>
            <Loader2 className="w-16 h-16 text-primary mx-auto mb-6 animate-spin" />
            <h1 className="text-2xl font-serif font-bold text-ink mb-2">Verifying your email...</h1>
          </>
        )}

        {status === 'success' && (
          <>
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-8 h-8 text-green-600" />
            </div>
            <h1 className="text-2xl font-serif font-bold text-ink mb-2">Email Verified!</h1>
            <p className="text-ink/60 mb-8">{message}</p>
            <Link
              to="/login"
              className="inline-block bg-primary hover:brightness-110 text-white px-8 py-4 rounded-2xl font-bold shadow-premium hover:shadow-premium-hover transition-all text-sm uppercase tracking-widest"
            >
              Go to Login
            </Link>
          </>
        )}

        {status === 'error' && (
          <>
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <XCircle className="w-8 h-8 text-red-600" />
            </div>
            <h1 className="text-2xl font-serif font-bold text-ink mb-2">Verification Failed</h1>
            <p className="text-ink/60 mb-8">{message}</p>
            <Link
              to="/login"
              className="inline-block bg-primary hover:brightness-110 text-white px-8 py-4 rounded-2xl font-bold shadow-premium hover:shadow-premium-hover transition-all text-sm uppercase tracking-widest"
            >
              Back to Login
            </Link>
          </>
        )}
      </div>
    </div>
  );
}