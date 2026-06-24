import { Suspense } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../store/useAuthStore';
import { AdminSidebar } from './AdminSidebar';
import { AdminHeader } from './AdminHeader';
import { ErrorBoundary } from '../ErrorBoundary';

const PageLoader = () => (
  <div className="flex items-center justify-center h-64">
    <div className="w-10 h-10 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
  </div>
);

export function AdminGuard() {
  const { isAuthenticated, user } = useAuthStore();
  const location = useLocation();
  const isStaff = user && ['admin', 'manager', 'chef'].includes(user.role);

  if (!isAuthenticated) {
    const redirect = `/login?redirect=/admin${location.pathname === '/admin' ? '' : location.pathname.replace('/admin', '')}`;
    return <Navigate to={redirect} replace />;
  }

  if (!isStaff) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="flex h-screen bg-paper overflow-hidden">
      <AdminSidebar />
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <AdminHeader />
        <main className="flex-1 overflow-y-auto p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            <Suspense fallback={<PageLoader />}>
              <ErrorBoundary>
                <Outlet />
              </ErrorBoundary>
            </Suspense>
          </div>
        </main>
      </div>
    </div>
  );
}
