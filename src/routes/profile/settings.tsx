import { createFileRoute, redirect, useNavigate } from '@tanstack/react-router';
import ProfileSettingsPage from '../../components/ProfileSettingsPage';

export const Route = createFileRoute('/profile/settings')({
  beforeLoad: ({ context }) => {
    // Redirect to login if not authenticated
    if (!context.auth?.user) {
      throw redirect({ to: '/auth/login', search: { redirect: '/profile/settings' } });
    }
  },
  component: ProfileSettingsComponent,
});

function ProfileSettingsComponent() {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate({ to: '/' });
  };

  return (
    <div className="min-h-screen">
      <ProfileSettingsPage onBack={handleBack} />
    </div>
  );
}