import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useAuth } from 'src/context/AuthContext';
import { DashboardPreview } from '@components/index';
import Features from '@/components/Features';
import HowItWorks from '@/components/HowItWorks';

type NavLink = '' | 'features' | 'how-it-works' | 'preview';

const NAV_LINKS: { id: NavLink; label: string; href: string }[] = [
  { id: 'features', label: 'Features', href: '#features' },
  { id: 'how-it-works', label: 'How it Works', href: '#how-it-works' },
  { id: 'preview', label: 'App Preview', href: '#preview' },
];

export default function Landing() {
  const { user } = useAuth();
  const [activeNav, setActiveNav] = useState<NavLink>('');

  if (user) {
    return <Navigate to="/my-plants" replace />;
  }

  return (
    <div className="landing flex min-h-screen flex-col bg-[linear-gradient(160deg,#e6f4d7_0%,#f4fbee_40%,var(--color-bg)_100%)]">
      {/* Dark-theme overrides for this page's own elements that swap to different CSS vars
          than the light base and so cannot be expressed with a single arbitrary-value utility. */}
      <style>{`
        @media (max-width: 768px) {
          .landing-nav-links { display: none; }
        }
        [data-theme='dark'] .landing {
          background: linear-gradient(160deg, var(--color-bg-darker) 0%, var(--color-bg-dark) 100%);
        }
        [data-theme='dark'] .landing-btn-login {
          background: rgba(255, 255, 255, 0.06);
          color: var(--color-text-on-dark);
        }
        [data-theme='dark'] .landing-btn-login:hover {
          border-color: #e0e8ddc7;
          box-shadow: 0 4px 16px #bae7ab59;
        }
        [data-theme='dark'] .landing-subtitle { color: var(--color-text-dark-muted); }
        [data-theme='dark'] .landing-btn-secondary {
          background: rgba(255, 255, 255, 0.06);
          color: var(--color-text-on-dark);
          border-color: rgba(255, 255, 255, 0.15);
        }
        [data-theme='dark'] .landing-btn-secondary:hover {
          border-color: var(--color-primary);
          color: var(--color-text-on-dark);
        }
        [data-theme='dark'] .landing-avatar { border-color: var(--color-bg-dark); }
        [data-theme='dark'] .landing-social-text { color: var(--color-text-dark-muted); }
      `}</style>

      <nav className="sticky top-0 z-[100] flex items-center justify-between bg-transparent px-[40px] py-[20px] max-md:px-[20px] max-md:py-[16px]">
        <Link
          to="/"
          className="flex items-center gap-[10px] text-[18px] font-bold text-[var(--color-text)] no-underline"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-[10px] border border-[#a8e07a] bg-[var(--color-bg-card-dark)] text-[18px]">
            🌿
          </div>
          Caring
        </Link>

        <ul className="landing-nav-links m-0 flex list-none items-center gap-[4px] rounded-[50px] bg-[#26451ec0] p-[6px] shadow-[0_2px_12px_rgba(0,0,0,0.15)]">
          {NAV_LINKS.map((link) => (
            <li key={link.id} className="flex">
              <a
                href={link.href}
                className={`whitespace-nowrap rounded-[50px] px-[18px] py-[8px] text-[14px] font-medium no-underline transition-[background,color] duration-150 hover:bg-white/10 hover:text-[var(--color-bg)] ${
                  activeNav === link.id
                    ? 'bg-white/15 font-semibold text-[var(--color-bg)]'
                    : 'text-[rgba(232,240,221,0.914)]'
                }`}
                onClick={() => setActiveNav(link.id)}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-[12px]">
          <Link
            to="/login"
            className="landing-btn-login cursor-pointer rounded-[50px] border-none bg-transparent px-[16px] py-[8px] text-[15px] font-medium text-[var(--color-text)] no-underline transition-[background] duration-150 hover:-translate-y-0.5 hover:border-[0.3px] hover:border-solid hover:border-[var(--color-muted-dark)] hover:bg-black/[0.06] hover:shadow-[0_4px_16px_rgba(74,156,46,0.35)]"
          >
            Log In
          </Link>
          <Link
            to="/register"
            className="cursor-pointer rounded-[50px] bg-[var(--color-bg-dark)] px-[20px] py-[10px] text-[15px] font-semibold text-[#a8e07a] no-underline transition-[box-shadow,transform] duration-150 hover:-translate-y-0.5 hover:border-[0.5px] hover:border-solid hover:border-[#a8e07a85] hover:shadow-[0_4px_16px_rgba(74,156,46,0.35)]"
          >
            Get Started
          </Link>
        </div>
      </nav>

      <section className="flex flex-1 flex-col items-center justify-center gap-[24px] px-[24px] pt-[80px] pb-[100px] text-center max-md:px-[20px] max-md:pt-[60px] max-md:pb-[80px]">
        <span className="inline-block rounded-[50px] border-[1.5px] border-solid border-[var(--color-accent-light)] bg-[rgba(180,220,150,0.15)] px-[18px] py-[6px] text-[12px] font-bold uppercase tracking-[0.1em] text-[#a8e07a]">
          Smart Plant Care
        </span>

        <h1 className="landing-headline m-0 max-w-[700px] text-[clamp(42px,7vw,72px)] font-extrabold leading-[1.1] tracking-[-0.03em] text-[var(--color-text)]">
          Your Indoor Jungle,
          <br />
          <span className="italic text-[var(--color-primary)]">Thriving.</span>
        </h1>

        <p className="landing-subtitle m-0 max-w-[520px] text-[18px] leading-[1.65] text-[var(--color-text-muted)]">
          Stop the guesswork. Keep your plants alive and flourishing with smart watering reminders,
          expert care guides, and a personalized health dashboard.
        </p>

        <div className="mt-[8px] flex flex-wrap justify-center gap-[12px]">
          <Link
            to="/register"
            className="inline-flex cursor-pointer items-center gap-[8px] rounded-[50px] border-none bg-[var(--color-primary-dark)] px-[32px] py-[16px] text-[16px] font-bold text-[var(--color-bg)] no-underline shadow-[0_4px_16px_rgba(74,156,46,0.35)] transition-[background,transform] duration-150 hover:-translate-y-0.5"
          >
            Start for free →
          </Link>
          <Link
            to="/discover"
            className="landing-btn-secondary inline-flex cursor-pointer items-center rounded-[50px] border-[1.5px] border-solid border-[var(--color-muted-dark)] bg-[var(--color-bg)] px-[32px] py-[16px] text-[16px] font-semibold text-[var(--color-text)] no-underline transition-[border-color,transform] duration-150 hover:-translate-y-0.5 hover:border-[var(--color-primary)]"
          >
            Explore tips
          </Link>
        </div>

        <div className="mt-[8px] flex items-center gap-[12px]">
          <div className="flex">
            <div className="landing-avatar flex h-9 w-9 items-center justify-center rounded-full border-2 border-[var(--color-bg)] bg-[var(--color-secondary)] text-[14px]">
              🌱
            </div>
            <div className="landing-avatar -ml-[10px] flex h-9 w-9 items-center justify-center rounded-full border-2 border-[var(--color-bg)] bg-[var(--color-accent)] text-[14px]">
              🌿
            </div>
            <div className="landing-avatar -ml-[10px] flex h-9 w-9 items-center justify-center rounded-full border-2 border-[var(--color-bg)] bg-[var(--color-primary)] text-[14px]">
              🍃
            </div>
          </div>
          <span className="landing-social-text text-[14px] font-medium text-[var(--color-text-muted)]">
            Joined the plant lover community
          </span>
        </div>
      </section>

      <Features />
      <HowItWorks />
      <DashboardPreview />
    </div>
  );
}
