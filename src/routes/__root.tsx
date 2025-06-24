import { createRootRoute, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import { AuthProvider } from '../contexts/AuthContext';
import Header from '../components/Header';
import Footer from '../components/Footer';

export const Route = createRootRoute({
  component: () => (
    <AuthProvider>
      <div className="min-h-screen bg-white">
        <Header />
        <main>
          <Outlet />
        </main>
        <Footer />
        <TanStackRouterDevtools />
      </div>
    </AuthProvider>
  ),
});