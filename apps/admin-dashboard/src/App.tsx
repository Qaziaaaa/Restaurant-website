import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import DashboardLayout from './layouts/DashboardLayout';
import DashboardPage from './pages/DashboardPage';
import OrdersPage from './pages/OrdersPage';
import KitchenPage from './pages/KitchenPage';
import MenuPage from './pages/MenuPage';
import LoginPage from './pages/LoginPage';
import { useAuthStore } from './store/useAuthStore';

function App() {
  const { isAuthenticated, user } = useAuthStore();

  const isAdmin = user?.role === 'admin' || user?.role === 'manager';
  const isChef = user?.role === 'chef';
  const hasAccess = isAuthenticated && (isAdmin || isChef);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={!isAuthenticated ? <LoginPage /> : <Navigate to="/" />} />
        
        <Route
          path="/"
          element={hasAccess ? <DashboardLayout /> : <Navigate to="/login" />}
        >
          <Route index element={<DashboardPage />} />
          <Route path="orders" element={<OrdersPage />} />
          <Route path="kitchen" element={<KitchenPage />} />
          
          {/* Admin Only Routes */}
          {isAdmin && (
            <>
              <Route path="menu" element={<MenuPage />} />
              <Route path="staff" element={<div>Staff Management (Coming Soon)</div>} />
              <Route path="analytics" element={<div>Analytics (Coming Soon)</div>} />
            </>
          )}
          
          <Route path="settings" element={<div>Settings (Coming Soon)</div>} />
        </Route>

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
