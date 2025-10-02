import ProfileHeader from "@components/Profile/ProfileHeader";
import ProfileActions from "@components/Profile/ProfileActions";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

type ThemeMode = 'light' | 'dark';

export default function Profile() {

    const user = { 
        name: "Sara",
        avatarUrl: "https://placehold.co/80x80",
    }

    const [notificationsEnabled, setNotificationsEnabled] = useState<boolean>(true);
    const [theme, setTheme] = useState<ThemeMode>('light');
    const { logout } = useAuth();

    const handleToggleNotifications = () => {
        setNotificationsEnabled(!notificationsEnabled);
    }

    const handleToggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    }

    const handleLogout = () => {
        // TO DO: limpiar auth 
        logout();
        return <Navigate to="/login" replace />;
    }

    return (
        <main className="container py-3">
            <ProfileHeader name={user.name} avatarUrl={user.avatarUrl} />
            <ProfileActions 
                notificationsEnabled={notificationsEnabled}
                theme={theme}
                onToggleNotifications={handleToggleNotifications}
                onToggleTheme={handleToggleTheme}
                onLogout={handleLogout}
            />
        </main>
    )
}