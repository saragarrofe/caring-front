import { Link } from "react-router-dom"
import './ProfileHeader.css'


export default function ProfileHeader({ name, email, avatarUrl, joinedDate, onEdit }) {
    return (
      <section className="profile-header d-flex align-items-center p-3 mb-4 border-bottom">
        <div className="ph-header">
            <div className="ph-top">
                <img 
                src={avatarUrl || "https://placehold.co/80x80"} 
                alt={`Avatar de ${name || 'usuario'}`} 
                className="profile-header__avatar rounded-circle me-3" 
            />
            <div className="profile-header__info text-start"></div>
                
                <div className="ph-info">
                    {/* <div className="profile-header__info text-start"> */}
                <h2 className="profile-header__name mb-1">{name || 'Usuario'} </h2> 
                <p className="profile-header__email text-muted mb-0">
                    {email || 'Email account'}
                </p>
                <p>
                    {joinedDate && <p className="ph-meta">Miembro desde {joinedDate}</p>}
                </p>
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
        </div>
      </section>
    )
}