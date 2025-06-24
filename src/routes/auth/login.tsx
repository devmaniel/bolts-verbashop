import { createFileRoute, redirect, useNavigate } from '@tanstack/react-router';
import { useAuth } from '../../contexts/AuthContext';
import LoginPage from '../../components/LoginPage';

export const Route = createFileRoute('/auth/login')({
  beforeLoad: ({ context }) => {
    // Redirect if already authenticated
    if (context.auth?.user) {
      throw redirect({ to: '/' });
    }
  },
  component: LoginComponent,
});

function LoginComponent() {
  const navigate = useNavigate();
  const { signIn } = useAuth();

  const handleBack = () => {
    navigate({ to: '/' });
  };

  const handleSwitchToRegister = () => {
    navigate({ to: '/auth/register' });
  };

  const handleLoginSuccess = () => {
    navigate({ to: '/' });
  };

  return (
    <div className="min-h-screen">
      <LoginPage
        onBack={handleBack}
        onSwitchToRegister={handleSwitchToRegister}
        onLoginSuccess={handleLoginSuccess}
        signIn={signIn}
      />
    </div>
  );
}