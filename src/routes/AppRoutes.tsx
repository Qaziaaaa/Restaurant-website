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
const VerifyEmail = lazy(() => import('../pages/VerifyEmail').then(m => ({ default: m.VerifyEmail })));

// Admin pages
const AdminGuard = lazy(() => import('../components/admin/AdminGuard').then(m => ({ default: m.AdminGuard })));
const DashboardPage = lazy(() => import('../pages/admin/DashboardPage'));
const OrdersPage = lazy(() => import('../pages/admin/OrdersPage'));
const KitchenPage = lazy(() => import('../pages/admin/KitchenPage'));
const MenuPage = lazy(() => import('../pages/admin/MenuPage'));
const StaffPage = lazy(() => import('../pages/admin/StaffPage'));
const AnalyticsPage = lazy(() => import('../pages/admin/AnalyticsPage'));
const SettingsPage = lazy(() => import('../pages/admin/SettingsPage'));

// Loading component for Suspense fallback
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
  </div>
);

const AdminLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-slate-950">
    <div className="w-12 h-12 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin" />
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
  { path: '/verify-email/:token', element: <Wrap><VerifyEmail /></Wrap> },
  {
    path: '/admin',
    element: (
      <ErrorBoundary>
        <Suspense fallback={<AdminLoader />}>
          <AdminGuard />
        </Suspense>
      </ErrorBoundary>
    ),
    children: [
      { index: true, element: <DashboardPage /> },
      { path: 'orders', element: <OrdersPage /> },
      { path: 'kitchen', element: <KitchenPage /> },
      { path: 'menu', element: <MenuPage /> },
      { path: 'staff', element: <StaffPage /> },
      { path: 'analytics', element: <AnalyticsPage /> },
      { path: 'settings', element: <SettingsPage /> },
    ],
  },
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
