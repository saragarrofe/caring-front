import { ProfileActions, ProfileHeader } from '@components/index';
import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from 'src/context/AuthContext';
import { useTheme } from 'src/hooks/useTheme';

export default function Profile() {
  const user = {
    name: 'Sara',
    avatarUrl: 'https://placehold.co/80x80',
  };

  const [notificationsEnabled, setNotificationsEnabled] =
    useState<boolean>(true);
  const { theme, toggleTheme } = useTheme();
  const { logout } = useAuth();

  const handleToggleNotifications = () => {
    setNotificationsEnabled(!notificationsEnabled);
  };

  const handleLogout = () => {
    logout();
    return <Navigate to="/login" replace />;
  };

  return (
    <main className="container py-3">
      <ProfileHeader name={user.name} avatarUrl={user.avatarUrl} />
      <ProfileActions
        notificationsEnabled={notificationsEnabled}
        theme={theme}
        onToggleNotifications={handleToggleNotifications}
        onToggleTheme={toggleTheme}
        onLogout={handleLogout}
      />
    </main>
  );
}
