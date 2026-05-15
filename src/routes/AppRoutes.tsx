import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import { ErrorBoundary } from '../components/ErrorBoundary';

// Lazy load the Home page for better performance
const Home = lazy(() => import('../pages/Home').then(m => ({ default: m.Home })));

// Loading component for Suspense fallback
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
  </div>
);

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <ErrorBoundary>
        <Suspense fallback={<PageLoader />}>
          <Home />
        </Suspense>
      </ErrorBoundary>
    ),
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
