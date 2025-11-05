import './ProfileHeader.css';

type ProfileHeaderProps = {
  name: string;
  avatarUrl?: string;
};

export function ProfileHeader({ name, avatarUrl }: ProfileHeaderProps) {
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
            <h1 className="ph-name">
              Hola, {name || 'Usuario'}!<span className="ph-emoji">🌱</span>
            </h1>
          </div>
        </div>
      </div>
    </section>
  );
}
