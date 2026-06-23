import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Suspense, lazy, type ReactNode } from 'react';
import { ErrorBoundary } from '../components/ErrorBoundary';

// Lazy load all pages
const Home = lazy(() => import('../pages/Home').then(m => ({ default: m.Home })));
const Login = lazy(() => import('../pages/Login').then(m => ({ default: m.Login })));
const Signup = lazy(() => import('../pages/Signup').then(m => ({ default: m.Signup })));
const Profile = lazy(() => import('../pages/Profile').then(m => ({ default: m.Profile })));
const Menu = lazy(() => import('../pages/Menu').then(m => ({ default: m.Menu })));
const Checkout = lazy(() => import('../pages/Checkout').then(m => ({ default: m.Checkout })));
const Orders = lazy(() => import('../pages/Orders').then(m => ({ default: m.Orders })));
const OrderDetail = lazy(() => import('../pages/OrderDetail').then(m => ({ default: m.OrderDetail })));
const ForgotPassword = lazy(() => import('../pages/ForgotPassword'));
const ResetPassword = lazy(() => import('../pages/ResetPassword'));

// Loading component for Suspense fallback
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
  </div>
);

const Wrap = ({ children }: { children: ReactNode }) => (
  <ErrorBoundary>
    <Suspense fallback={<PageLoader />}>
      {children}
    </Suspense>
  </ErrorBoundary>
);

const router = createBrowserRouter([
  { path: '/', element: <Wrap><Home /></Wrap> },
  { path: '/menu', element: <Wrap><Menu /></Wrap> },
  { path: '/login', element: <Wrap><Login /></Wrap> },
  { path: '/signup', element: <Wrap><Signup /></Wrap> },
  { path: '/profile', element: <Wrap><Profile /></Wrap> },
  { path: '/checkout', element: <Wrap><Checkout /></Wrap> },
  { path: '/orders', element: <Wrap><Orders /></Wrap> },
  { path: '/orders/:id', element: <Wrap><OrderDetail /></Wrap> },
  { path: '/forgot-password', element: <Wrap><ForgotPassword /></Wrap> },
  { path: '/reset-password/:token', element: <Wrap><ResetPassword /></Wrap> },
  {
    path: '*',
    element: (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <h1 className="text-6xl font-serif font-bold text-ink mb-4">404</h1>
        <p className="text-xl text-ink/60 mb-8">Page not found</p>
        <a href="/" className="bg-primary text-white px-8 py-4 rounded-xl font-bold hover:brightness-110 transition-all">
          Go Back Home
        </a>
      </div>
    ),
  }
]);

export function AppRoutes() {
  return <RouterProvider router={router} />;
}
