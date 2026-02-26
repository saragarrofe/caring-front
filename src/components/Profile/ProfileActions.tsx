import { Link } from 'react-router-dom';
import './ProfileActions.css';

type ProfileActionsProps = {
  notificationsEnabled: boolean;
  theme: 'light' | 'dark';
  onToggleNotifications: () => void;
  onToggleTheme: () => void;
  onLogout: () => void;
};

export function ProfileActions({
  notificationsEnabled,
  theme,
  onToggleNotifications,
  onToggleTheme,
  onLogout,
}: ProfileActionsProps) {
  return (
    <section className="container">
      <div className="pa-card" role="menu" aria-label="Profile actions menu">
        <Link to="/profile/info" className="pa-item" role="menuitem">
          <div className="pa-left">
            <i className="bi bi-person-vcard" aria-hidden="true" />
            <span>View my info</span>
          </div>
        </Link>

        <Link to="/profile/edit" className="pa-item" role="menuitem">
          <div className="pa-left">
            <i className="bi bi-pencil-square" aria-hidden="true" />
            <span>Edit profile</span>
          </div>
        </Link>

        <div className="pa-divider" />

        <button
          type="button"
          className="pa-item"
          onClick={onToggleNotifications}
          aria-pressed={notificationsEnabled}
        >
          <div className="pa-left">
            <i className="bi bi-bell" aria-hidden="true" />
            <span>Notifications</span>
          </div>
          <span className={`pa-switch ${notificationsEnabled ? 'on' : ''}`} aria-hidden="true">
            <span className="knob" />
          </span>
        </button>

        <button
          type="button"
          className="pa-item"
          onClick={onToggleTheme}
          aria-pressed={theme === 'dark'}
        >
          <div className="pa-left">
            <i className="bi bi-moon-stars" aria-hidden="true" />
            <span>Theme: {theme === 'dark' ? 'Dark' : 'Light'}</span>
          </div>
          <span className={`pa-switch ${theme === 'dark' ? 'on' : ''}`} aria-hidden="true">
            <span className="knob" />
          </span>
        </button>

        <div className="pa-divider" />

        <button type="button" className="pa-item pa-danger" onClick={onLogout}>
          <div className="pa-left">
            <i className="bi bi-box-arrow-right" aria-hidden="true" />
            <span>Log out</span>
          </div>
        </button>
      </div>
    </section>
  );
}
