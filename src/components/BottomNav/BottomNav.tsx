import { NavLink } from 'react-router-dom';
import { Heart, User } from 'lucide-react';

export function BottomNav() {
  return (
    <nav
      className="fixed left-0 right-0 bottom-0 z-[1000] flex justify-center pointer-events-none px-[12px] pt-[8px] pb-[calc(8px+env(safe-area-inset-bottom))] md:hidden"
      role="navigation"
      aria-label="Bottom navigation"
    >
      <div className="pointer-events-auto flex h-[64px] w-[min(560px,92vw)] items-center gap-[10px] rounded-[20px] border border-black/[0.06] bg-[linear-gradient(180deg,rgba(255,255,255,0.9),rgba(255,255,255,0.78))] p-[8px] shadow-[0_10px_24px_rgba(16,24,40,0.12),0_1px_1px_rgba(16,24,40,0.04)] backdrop-blur-[14px] [[data-theme='dark']_&]:border-white/[0.08] [[data-theme='dark']_&]:bg-[linear-gradient(180deg,rgba(28,28,30,0.8),rgba(28,28,30,0.6))] [[data-theme='dark']_&]:shadow-[0_10px_24px_rgba(0,0,0,0.45),0_1px_1px_rgba(255,255,255,0.04)]">
        <NavLink
          to="/my-plants"
          className={({ isActive }) =>
            `flex h-[48px] flex-1 items-center justify-center gap-[6px] rounded-[14px] text-[12px] no-underline transition-[background,color,transform] duration-150 active:translate-y-px text-[var(--color-text-secondary)] [[data-theme='dark']_&]:text-[var(--color-border)] ${
              isActive
                ? "bg-[rgba(91,140,90,0.15)] font-semibold text-[var(--color-primary)] [[data-theme='dark']_&]:bg-[rgba(91,140,90,0.2)] [[data-theme='dark']_&]:text-[var(--color-primary-light)]"
                : ''
            }`
          }
        >
          <Heart size={20} aria-hidden="true" />
        </NavLink>

        <NavLink
          to="/profile"
          className={({ isActive }) =>
            `flex h-[48px] flex-1 items-center justify-center gap-[6px] rounded-[14px] text-[12px] no-underline transition-[background,color,transform] duration-150 active:translate-y-px text-[var(--color-text-secondary)] [[data-theme='dark']_&]:text-[var(--color-border)] ${
              isActive
                ? "bg-[rgba(91,140,90,0.15)] font-semibold text-[var(--color-primary)] [[data-theme='dark']_&]:bg-[rgba(91,140,90,0.2)] [[data-theme='dark']_&]:text-[var(--color-primary-light)]"
                : ''
            }`
          }
        >
          <User size={20} aria-hidden="true" />
        </NavLink>
      </div>
    </nav>
  );
}
