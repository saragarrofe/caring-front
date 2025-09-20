import { Link } from "react-router-dom"
import './ProfileHeader.css'

type ProfileHeaderProps = {
    name?: string;
    email?: string;
    avatarUrl?: string;
    joinedDate?: string; 
    onEdit: () => void;
}

export default function ProfileHeader({ name, email, avatarUrl, joinedDate, onEdit }: ProfileHeaderProps) {
    return (
      <section className="profile-header container">
        <div className="ph-card">
            <div className="ph-top">
            <img
                className="ph-avatar"
                src={avatarUrl || 'https://via.placeholder.com/96'}
                alt={`Avatar de ${name}`}
            />
            <div className="ph-info">
                <h1 className="ph-name">{name}</h1>
                {email && <p className="ph-email">{email}</p>}
                {joinedDate && <p className="ph-meta">Miembro desde {joinedDate}</p>}
            </div>
            </div>

            <div className="ph-actions">
            <button type="button" className="btn btn-outline-primary btn-sm" onClick={onEdit}>
                Editar perfil
            </button>
            <Link to="/settings" className="btn btn-light btn-sm">
                Configuración
            </Link>
            </div>
        </div>
        </section>
    )
}