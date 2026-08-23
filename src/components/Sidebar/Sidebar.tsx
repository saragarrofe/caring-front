import '@components/Sidebar/Sidebar.css';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export function Sidebar() {
  const { user } = useAuth();

  return (
    <nav className="sidebar d-none d-md-flex" role="navigation" aria-label="Sidebar navigation">
      <NavLink to="/profile" className="sidebar__header">
        <div className="sidebar__avatar">
          <i className="bi bi-person-fill" aria-hidden="true" />
        </div>
        <div>
          <div className="sidebar__username">{user?.name ?? 'Guest'}</div>
          <div className="sidebar__profile-link">View profile</div>
        </div>
      </NavLink>

      <div className="sidebar__nav">
        <NavLink
          to="/home"
          className={({ isActive }) => `sidebar-item ${isActive ? 'active' : ''}`}
        >
          <i className="bi bi-house" aria-hidden="true" />
          <span>Dashboard</span>
        </NavLink>

        <NavLink
          to="/my-plants"
          className={({ isActive }) => `sidebar-item ${isActive ? 'active' : ''}`}
        >
          <i className="bi bi-grid-fill" aria-hidden="true" />
          <span>My Plants</span>
        </NavLink>
      </div>
    </nav>
  );
}
