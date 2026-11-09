import { Link } from 'react-router-dom';
import { ContactRound, SquarePen, Bell, MoonStar, LogOut } from 'lucide-react';

type ProfileActionsProps = {
  notificationsEnabled: boolean;
  theme: 'light' | 'dark';
  onToggleNotifications: () => void;
  onToggleTheme: () => void;
  onLogout: () => void;
};

const itemClass =
  "flex w-full items-center justify-between gap-[12px] border-0 bg-transparent px-[14px] py-[12px] text-[var(--color-text-secondary)] no-underline hover:bg-black/[0.03] active:bg-black/[0.06] [[data-theme='dark']_&]:text-white/85 [[data-theme='dark']_&]:hover:bg-white/[0.04] [[data-theme='dark']_&]:active:bg-white/[0.08]";

const iconClass =
  "text-[var(--color-text-subtle)] [[data-theme='dark']_&]:text-[var(--color-text-dark-muted)]";

export function ProfileActions({
  notificationsEnabled,
  theme,
  onToggleNotifications,
  onToggleTheme,
  onLogout,
}: ProfileActionsProps) {
  return (
    <section className="mx-auto w-full max-w-2xl px-4">
      <div
        className="mt-[12px] overflow-hidden rounded-[14px] border border-black/[0.06] bg-[var(--color-bg)] shadow-[var(--shadow)] [[data-theme='dark']_&]:border-white/[0.08] [[data-theme='dark']_&]:bg-[var(--color-bg-card-dark)]"
        role="menu"
        aria-label="Profile actions menu"
      >
        <Link to="/profile/info" className={itemClass} role="menuitem">
          <div className="flex items-center gap-[10px]">
            <ContactRound className={iconClass} size={18} aria-hidden="true" />
            <span className="text-[14px]">View my info</span>
          </div>
        </Link>

        <Link to="/profile/edit" className={itemClass} role="menuitem">
          <div className="flex items-center gap-[10px]">
            <SquarePen className={iconClass} size={18} aria-hidden="true" />
            <span className="text-[14px]">Edit profile</span>
          </div>
        </Link>

        <div className="mx-[12px] h-px rounded-[1px] bg-black/[0.06] [[data-theme='dark']_&]:bg-white/[0.08]" />

        <button
          type="button"
          className={itemClass}
          onClick={onToggleNotifications}
          aria-pressed={notificationsEnabled}
        >
          <div className="flex items-center gap-[10px]">
            <Bell className={iconClass} size={18} aria-hidden="true" />
            <span className="text-[14px]">Notifications</span>
          </div>
          <span
            className={`relative h-[24px] w-[42px] rounded-[999px] transition-[background] duration-[160ms] ease-[ease] [[data-theme='dark']_&]:bg-white/[0.12] ${
              notificationsEnabled
                ? "bg-[rgba(91,140,90,0.25)] [[data-theme='dark']_&]:bg-[rgba(91,140,90,0.4)]"
                : 'bg-[var(--color-border)]'
            }`}
            aria-hidden="true"
          >
            <span
              className={`absolute top-[3px] left-[3px] h-[18px] w-[18px] rounded-full bg-[var(--color-bg)] shadow-[var(--shadow-sm)] transition-transform duration-[160ms] ease-[ease] [[data-theme='dark']_&]:bg-[var(--color-text-on-dark)] ${
                notificationsEnabled ? 'translate-x-[18px]' : ''
              }`}
            />
          </span>
        </button>

        <button
          type="button"
          className={itemClass}
          onClick={onToggleTheme}
          aria-pressed={theme === 'dark'}
        >
          <div className="flex items-center gap-[10px]">
            <MoonStar className={iconClass} size={18} aria-hidden="true" />
            <span className="text-[14px]">Theme: {theme === 'dark' ? 'Dark' : 'Light'}</span>
          </div>
          <span
            className={`relative h-[24px] w-[42px] rounded-[999px] transition-[background] duration-[160ms] ease-[ease] [[data-theme='dark']_&]:bg-white/[0.12] ${
              theme === 'dark'
                ? "bg-[rgba(91,140,90,0.25)] [[data-theme='dark']_&]:bg-[rgba(91,140,90,0.4)]"
                : 'bg-[var(--color-border)]'
            }`}
            aria-hidden="true"
          >
            <span
              className={`absolute top-[3px] left-[3px] h-[18px] w-[18px] rounded-full bg-[var(--color-bg)] shadow-[var(--shadow-sm)] transition-transform duration-[160ms] ease-[ease] [[data-theme='dark']_&]:bg-[var(--color-text-on-dark)] ${
                theme === 'dark' ? 'translate-x-[18px]' : ''
              }`}
            />
          </span>
        </button>

        <div className="mx-[12px] h-px rounded-[1px] bg-black/[0.06] [[data-theme='dark']_&]:bg-white/[0.08]" />

        <button
          type="button"
          className={`${itemClass} !text-[var(--color-danger-dark)] [[data-theme='dark']_&]:!text-[var(--color-danger-light)]`}
          onClick={onLogout}
        >
          <div className="flex items-center gap-[10px]">
            <LogOut
              className="text-[var(--color-danger-dark)] [[data-theme='dark']_&]:text-[var(--color-danger-light)]"
              size={18}
              aria-hidden="true"
            />
            <span className="text-[14px]">Log out</span>
          </div>
        </button>
      </div>
    </section>
  );
}
