import { Link } from 'react-router-dom';

export default function Welcome() {
  return (
    <main className="relative grid min-h-[100svh] grid-rows-[1fr_auto_auto] gap-4 overflow-hidden bg-[var(--color-bg)] p-4 pb-[calc(16px+env(safe-area-inset-bottom))] [[data-theme='dark']_&]:bg-[var(--color-bg-darker)]">
      <header className="z-[1] m-0 mb-1 self-end text-left">
        <h1 className="mt-0 mb-1.5 text-[30px] leading-[1.2] font-bold tracking-[-0.02em] text-[var(--color-text)] min-[480px]:text-[34px] [[data-theme='dark']_&]:text-[var(--color-text-on-dark)]">
          Welcome to Caring
        </h1>
        <p className="m-0 text-[var(--color-text-muted)] [[data-theme='dark']_&]:text-[var(--color-text-dark-muted)]">
          Reminders, tips and a happy jungle at home
        </p>
      </header>
      <div className="z-[1] grid gap-[12px]">
        <Link
          to="/login"
          className="inline-flex h-[54px] items-center justify-center rounded-[16px] border-[1.5px] border-[var(--color-primary)] bg-[var(--color-accent)] font-semibold text-[var(--color-text)] no-underline shadow-[var(--shadow-lg)] transition-[filter,transform] duration-150 ease-[ease] hover:brightness-[0.98] active:translate-y-px active:duration-[0.06s] [[data-theme='dark']_&]:border-[var(--color-primary)] [[data-theme='dark']_&]:bg-[var(--color-primary)] [[data-theme='dark']_&]:text-[var(--color-text-on-dark)]"
        >
          LOG IN
        </Link>
        <Link
          to="/register"
          className="inline-flex h-[54px] items-center justify-center rounded-[16px] border-[1.5px] border-[var(--color-primary)] bg-transparent font-semibold text-[var(--color-text)] no-underline shadow-[var(--shadow-lg)] transition-[filter,transform] duration-150 ease-[ease] hover:bg-[rgba(149,184,156,0.12)] active:translate-y-px active:duration-[0.06s] [[data-theme='dark']_&]:border-[rgba(255,255,255,0.2)] [[data-theme='dark']_&]:text-[var(--color-text-on-dark)] [[data-theme='dark']_&]:hover:bg-[rgba(255,255,255,0.08)]"
        >
          SIGN UP
        </Link>
        <div className="mt-1.5 text-center text-xs text-[var(--color-text-muted)] [[data-theme='dark']_&]:text-[var(--color-text-dark-muted)]">
          By signing in you confirm our&nbsp;
          {/* TO DO: Añadir handleTerms */}
          <a href="#" onClick={(e) => e.preventDefault()} className="text-inherit underline">
            Terms
          </a>
          &nbsp;&amp;&nbsp;
          {/* TO DO: Añadir handlePrivacyPolicy */}
          <a href="#" onClick={(e) => e.preventDefault()} className="text-inherit underline">
            Privacy Policy
          </a>
        </div>
      </div>
      <Link
        to="/discover"
        className="absolute top-3 right-[14px] z-[2] border-0 bg-transparent text-sm text-[var(--color-text-muted)] no-underline [[data-theme='dark']_&]:text-[var(--color-text-dark-muted)]"
      >
        Skip registration
      </Link>
    </main>
  );
}
