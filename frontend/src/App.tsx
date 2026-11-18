import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthGuard, AdminGuard } from './components/auth/ProtectedRoute';
import Layout from './components/layout/Layout';
import { Spinner } from './components/ui/Spinner';

const HomePage = lazy(() => import('./pages/Home/HomePage'));
const LoginPage = lazy(() => import('./pages/Auth/LoginPage'));
const RegisterPage = lazy(() => import('./pages/Auth/RegisterPage'));
const ProductsPage = lazy(() => import('./pages/Products/ProductsPage'));
const ProductDetailPage = lazy(() => import('./pages/Products/ProductDetailPage'));
const CartPage = lazy(() => import('./pages/Cart/CartPage'));
const OrdersPage = lazy(() => import('./pages/Orders/OrdersPage'));
const OrderDetailPage = lazy(() => import('./pages/Orders/OrderDetailPage'));
const AppointmentsPage = lazy(() => import('./pages/Appointments/AppointmentsPage'));
const QuotationsPage = lazy(() => import('./pages/Quotations/QuotationsPage'));
const BlogPage = lazy(() => import('./pages/Blog/BlogPage'));
const BlogPostPage = lazy(() => import('./pages/Blog/BlogPostPage'));
const ContactPage = lazy(() => import('./pages/Contact/ContactPage'));
const ProfilePage = lazy(() => import('./pages/Profile/ProfilePage'));
const DashboardPage = lazy(() => import('./pages/admin/DashboardPage'));
const AdminProductsPage = lazy(() => import('./pages/admin/AdminProductsPage'));
const AdminOrdersPage = lazy(() => import('./pages/admin/AdminOrdersPage'));
const AdminBlogPage = lazy(() => import('./pages/admin/AdminBlogPage'));
const AdminContactsPage = lazy(() => import('./pages/admin/AdminContactsPage'));

function App() {
  return (
    <Layout>
      <Suspense
        fallback={
          <div className="flex flex-col items-center justify-center min-h-[50vh] gap-3">
            <Spinner size="lg" />
            <p className="text-sm text-slate-500 dark:text-slate-400">Cargando...</p>
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/productos" element={<ProductsPage />} />
          <Route path="/productos/:slug" element={<ProductDetailPage />} />
          <Route path="/carrito" element={<AuthGuard><CartPage /></AuthGuard>} />
          <Route path="/pedidos" element={<AuthGuard><OrdersPage /></AuthGuard>} />
          <Route path="/pedidos/:id" element={<AuthGuard><OrderDetailPage /></AuthGuard>} />
          <Route path="/citas" element={<AuthGuard><AppointmentsPage /></AuthGuard>} />
          <Route path="/cotizaciones" element={<AuthGuard><QuotationsPage /></AuthGuard>} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<BlogPostPage />} />
          <Route path="/contacto" element={<ContactPage />} />
          <Route path="/perfil" element={<AuthGuard><ProfilePage /></AuthGuard>} />
          <Route path="/admin" element={<AdminGuard><DashboardPage /></AdminGuard>} />
          <Route path="/admin/productos" element={<AdminGuard><AdminProductsPage /></AdminGuard>} />
          <Route path="/admin/pedidos" element={<AdminGuard><AdminOrdersPage /></AdminGuard>} />
          <Route path="/admin/blog" element={<AdminGuard><AdminBlogPage /></AdminGuard>} />
          <Route path="/admin/contactos" element={<AdminGuard><AdminContactsPage /></AdminGuard>} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Suspense>
    </Layout>
  );
}

export default App;
