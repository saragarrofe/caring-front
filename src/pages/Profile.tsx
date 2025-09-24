import ProfileHeader from "@components/Profile/ProfileHeader";
import ProfileActions from "@components/Profile/ProfileActions";
import { useState } from "react";

export default function Profile() {

    const user = { 
        name: "Sara",
        avatarUrl: "https://placehold.co/80x80",
    }

    const [notificationsEnabled, setNotificationsEnabled] = useState(true);
    const [theme, setTheme] = useState<'light' | 'dark'>('light');

    const handleToggleNotifications = () => {
        setNotificationsEnabled(!notificationsEnabled);
    }

    const handleToggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    }

    const handleLogout = () => {
        // TODO: limpiar auth y navegar a /login
        alert('Cerrar sesión y navegar a /login');
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