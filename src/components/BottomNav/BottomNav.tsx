
import '@components/BottomNav/BottomNav.css'
import { NavLink } from "react-router-dom";


export default function BottomNav() {
    return (
        <nav className="bottom-nav d-md-none" role="navigation" aria-label="Bottom navigation">
            <div className="bottom-nav__rail">
                <NavLink to="/schedule" className={({ isActive }) => `bn-item ${isActive ? 'active' : ''}`} >
                    <i className="bi bi-calendar3" aria-hidden="true" />
                </NavLink>

                <NavLink to="/my-plants" className={({ isActive }) => `bn-item ${isActive ? 'active' : ''}`} >
                    <i className="bi bi-heart" aria-hidden="true" />
                </NavLink>

                <NavLink to="/discover" className={({ isActive }) => `bn-item ${isActive ? 'active' : ''}`} >
                    <i className="bi bi-search" aria-hidden="true" />
                </NavLink>

                <NavLink to="/profile" className={({ isActive }) => `bn-item ${isActive ? 'active' : ''}`} >
                    <i className="bi bi-person" aria-hidden="true" />
                </NavLink>
            </div>
        </nav>




    )
}