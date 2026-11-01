import React, { useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { User } from 'lucide-react';

export function NavbarComponent() {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const term = searchTerm.trim();
    if (term) {
      navigate({ pathname: '/plant', search: `?search=${encodeURIComponent(term)}` });
    }
  };

  return (
    <nav className="hidden bg-[var(--color-bg-dark)] [[data-theme='dark']_&]:border-b [[data-theme='dark']_&]:border-white/[0.06] [[data-theme='dark']_&]:bg-[var(--color-bg-darker)] md:block">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <NavLink to="/" end>
          <img src="logo.png" alt="Logo" />
        </NavLink>

        <div className="ml-auto flex items-center gap-2">
          <NavLink
            className={({ isActive }) =>
              `mr-4 text-[22px] text-[var(--color-bg)] no-underline hover:underline ${isActive ? 'font-semibold' : ''}`
            }
            to="/discover"
          >
            Discover
          </NavLink>

          <NavLink
            className={({ isActive }) =>
              `mr-4 text-[22px] text-[var(--color-bg)] no-underline hover:underline ${isActive ? 'font-semibold' : ''}`
            }
            to="/my-plants"
          >
            My plants
          </NavLink>

          <form className="flex" onSubmit={handleSearch}>
            <input
              type="search"
              placeholder="Search plants..."
              className="mr-2 rounded-md border border-border bg-background px-3 py-1.5 text-sm"
              aria-label="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </form>

          <Link to="/login" className="mr-4 text-[22px] text-[var(--color-bg)] no-underline hover:underline">
            <User size={24} color="white" />
          </Link>
        </div>
      </div>
    </nav>
  );
}
