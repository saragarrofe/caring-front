type ProfileHeaderProps = {
  name: string;
  avatarUrl?: string;
};

export function ProfileHeader({ name, avatarUrl }: ProfileHeaderProps) {
  return (
    <section className="mx-auto w-full max-w-2xl px-4 pt-[8px]">
      <div className="rounded-[18px] border border-black/[0.06] bg-[linear-gradient(180deg,var(--color-bg),var(--color-bg-subtle))] p-4 shadow-[var(--shadow-lg)] [[data-theme='dark']_&]:border-white/[0.08] [[data-theme='dark']_&]:bg-[linear-gradient(180deg,var(--color-bg-card-dark),var(--color-bg-darker))]">
        <div className="flex items-center gap-[12px]">
          <img
            className="h-[72px] w-[72px] rounded-full border-2 border-[var(--color-bg)] object-cover shadow-[var(--shadow-sm)] [[data-theme='dark']_&]:border-[var(--color-bg-card-dark)]"
            src={avatarUrl || 'https://via.placeholder.com/96'}
            alt={`${name}'s avatar`}
          />
          <div className="min-w-0">
            <h1 className="mt-0 mb-[2px] text-[18px] [[data-theme='dark']_&]:text-[var(--color-text-on-dark)]">
              Hello, {name || 'User'}!<span>🌱</span>
            </h1>
          </div>
        </div>
      </div>
    </section>
  );
}
