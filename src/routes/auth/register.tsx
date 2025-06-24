import { createFileRoute, redirect, useNavigate } from '@tanstack/react-router';
import { useAuth } from '../../contexts/AuthContext';
import RegisterPage from '../../components/RegisterPage';

export const Route = createFileRoute('/auth/register')({
  beforeLoad: ({ context }) => {
    // Redirect if already authenticated
    if (context.auth?.user) {
      throw redirect({ to: '/' });
    }
  },
  component: RegisterComponent,
});

function RegisterComponent() {
  const navigate = useNavigate();
  const { signUp } = useAuth();

  const handleBack = () => {
    navigate({ to: '/' });
  };

  const handleSwitchToLogin = () => {
    navigate({ to: '/auth/login' });
  };

  const handleRegisterSuccess = () => {
    navigate({ to: '/' });
  };

  return (
    <div className="min-h-screen">
      <RegisterPage
        onBack={handleBack}
        onSwitchToLogin={handleSwitchToLogin}
        onRegisterSuccess={handleRegisterSuccess}
        signUp={signUp}
      />
    </div>
  );
}