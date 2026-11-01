import { Link } from 'react-router-dom';

export function Hero() {
  return (
    <section className="items-center justify-between bg-[var(--color-primary-bg)] px-20 py-8 [[data-theme='dark']_&]:bg-[var(--color-bg-dark)]">
      <div className="hero-content">
        <h1 className="mb-4 text-5xl text-[var(--color-bg-dark)] [[data-theme='dark']_&]:text-[var(--color-text-on-dark)]">
          Take care of your plants alive
        </h1>
        <p className="mb-8 text-xl text-[var(--color-primary-light)] [[data-theme='dark']_&]:text-[var(--color-accent-soft)]">
          Individual care schedule and reminders for your plants, recommendations, step by step
          guides, and more.
        </p>
        <div className="mt-6">
          <Link
            to="/tricks-and-advices"
            className="mr-4 cursor-pointer rounded-[25px] bg-[var(--color-bg)] px-8 py-3 text-xl font-bold text-[var(--color-bg-dark)] shadow-[var(--shadow-sm)] [[data-theme='dark']_&]:border [[data-theme='dark']_&]:border-white/[0.15] [[data-theme='dark']_&]:bg-white/10 [[data-theme='dark']_&]:text-[var(--color-text-on-dark)]"
          >
            Tricks and advices
          </Link>
          <span className="cursor-pointer rounded-[25px] bg-[var(--color-bg-dark)] px-8 py-3 text-xl text-[var(--color-bg)] hover:bg-[var(--color-primary-darker)] [[data-theme='dark']_&]:bg-[var(--color-primary)] [[data-theme='dark']_&:hover]:bg-[var(--color-primary-light)]">
            Plant of the day
          </span>
        </div>
      </div>
    </section>
  );
}
