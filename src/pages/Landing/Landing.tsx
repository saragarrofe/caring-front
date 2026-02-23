import './Landing.css';
import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useAuth } from 'src/context/AuthContext';
import { DashboardPreview } from '@components/index';
import Features from '@components/Features/Features';
import HowItWorks from '@components/HowItWorks/HowItWorks';

type NavLink = '' | 'features' | 'how-it-works' | 'preview';

const NAV_LINKS: { id: NavLink; label: string; href: string }[] = [
  { id: 'features',     label: 'Features',    href: '#features'    },
  { id: 'how-it-works', label: 'How it Works',href: '#how-it-works'},
  { id: 'preview',      label: 'App Preview', href: '#preview'     },
];

export default function Landing() {
  const { user } = useAuth();
  const [activeNav, setActiveNav] = useState<NavLink>('');

  if (user) {
    return <Navigate to="/my-plants" replace />;
  }

  return (
    <div className="landing">
      <nav className="landing-nav">
        <Link to="/" className="landing-nav-logo">
          <div className="landing-nav-logo-icon">🌿</div>
          Caring
        </Link>

        <ul className="landing-nav-links">
          {NAV_LINKS.map((link) => (
            <li key={link.id}>
              <a
                href={link.href}
                className={activeNav === link.id ? 'active' : ''}
                onClick={() => setActiveNav(link.id)}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="landing-nav-actions">
          <Link to="/login" className="landing-btn-login">Log In</Link>
          <Link to="/register" className="landing-btn-cta">Get Started</Link>
        </div>
      </nav>

      <section className="landing-hero">
        <span className="landing-badge">Smart Plant Care</span>

        <h1 className="landing-headline">
          Your Indoor Jungle,<br />
          <span className="landing-headline-accent">Thriving.</span>
        </h1>

        <p className="landing-subtitle">
          Stop the guesswork. Keep your plants alive and flourishing with smart
          watering reminders, expert care guides, and a personalized health dashboard.
        </p>

        <div className="landing-hero-actions">
          <Link to="/register" className="landing-btn-primary">
            Start for free →
          </Link>
          <Link to="/discover" className="landing-btn-secondary">
            Explore tips
          </Link>
        </div>

        <div className="landing-social-proof">
          <div className="landing-avatars">
            <div className="landing-avatar landing-avatar--1">🌱</div>
            <div className="landing-avatar landing-avatar--2">🌿</div>
            <div className="landing-avatar landing-avatar--3">🍃</div>
          </div>
          <span className="landing-social-text">Joined the plant lover community</span>
        </div>
      </section>

      <Features />
      <HowItWorks />

      <section id="preview" className="landing-preview">
        <div className="landing-preview-label">App Preview</div>
        <h2 className="landing-preview-title">Everything you need, in one place</h2>
        <p className="landing-preview-sub">
          Track hydration, feeding schedules, and sunlight needs for every plant in your home.
        </p>
        <div className="landing-preview-frame">
          <DashboardPreview />
        </div>
      </section>
    </div>
  );
}
