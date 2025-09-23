
import { Link } from 'react-router-dom'
import './ProfileActions.css'

type ProfileActionsProps = {
    notificationsEnabled: boolean;
    theme: 'light' | 'dark';
    onToggleNotifications: () => void;
    onToggleTheme: () => void;
    onLogout: () => void;
}

export default function ProfileActions({ notificationsEnabled, theme, onToggleNotifications, onToggleTheme, onLogout }: ProfileActionsProps) {
    return (
        <section className="profile-info-card container">
            <div className="pic-card" role="menu" aria-label='Menú de acciones de perfil'>
                {/* Navegación de rutas */}
                <Link to="/profile/info" className="pa-item" role="menuitem">
                    <div className="pa-left">
                        <span className="pa-icon material-symbols-outlined">person</span>
                    </div>
                </Link>
                
            </div>
        </section>
    )
}