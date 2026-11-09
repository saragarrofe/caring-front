const FEATURES = [
  {
    icon: '💧',
    title: 'Watering Reminders',
    desc: "Never forget to water again. Alerts tailored to each plant's needs and your local season.",
  },
  {
    icon: '📅',
    title: 'Personalized Schedules',
    desc: 'Every plant is different. We build a care calendar based on species, pot size and light.',
  },
  {
    icon: '🌱',
    title: 'Growth Tracking',
    desc: 'Log waterings, fertilizing and repotting. Watch your plants progress over time.',
  },
  {
    icon: '📖',
    title: 'Care Guides',
    desc: 'Expert tips for 500+ species — from succulents to tropical monsters.',
  },
  {
    icon: '🌿',
    title: 'Health Dashboard',
    desc: 'See hydration levels, upcoming tasks and plant health at a glance.',
  },
  {
    icon: '🔔',
    title: 'Smart Notifications',
    desc: 'Fertilizing, repotting, sunlight rotation — Caring covers every care task.',
  },
];

export default function Features() {
  return (
    <section
      id="features"
      className="flex flex-col items-center gap-[56px] bg-[var(--color-bg)] px-[24px] py-[96px] [[data-theme='dark']_&]:bg-[var(--color-bg-darker)] max-md:gap-[40px] max-md:px-[20px] max-md:py-[64px]"
    >
      <div className="flex max-w-[560px] flex-col items-center gap-[14px] text-center">
        <span className="inline-block rounded-[50px] border-[1.5px] border-solid border-[var(--color-accent-light)] bg-[rgba(180,220,150,0.15)] px-[18px] py-[6px] text-[12px] font-bold uppercase tracking-[0.1em] text-[#a8e07a]">
          Features
        </span>
        <h2 className="m-0 text-[clamp(28px,4vw,42px)] font-extrabold tracking-[-0.02em] text-[var(--color-text)]">
          Everything your plants need
        </h2>
        <p className="m-0 text-[17px] leading-[1.6] text-[var(--color-text-muted)] [[data-theme='dark']_&]:text-[var(--color-text-dark-muted)]">
          One app to track, remind and guide you through every stage of plant care.
        </p>
      </div>
      <div className="grid w-full max-w-[960px] grid-cols-3 gap-[20px] max-md:grid-cols-2 max-[480px]:grid-cols-1">
        {FEATURES.map((feature) => (
          <div
            key={feature.title}
            className="flex flex-col gap-[10px] rounded-[16px] border border-solid border-[#e4f0d9] bg-[var(--color-bg-card-light)] px-[24px] py-[28px] transition-[box-shadow,transform] duration-200 hover:-translate-y-[3px] hover:shadow-[0_8px_28px_rgba(74,156,46,0.12)] [[data-theme='dark']_&]:border-white/[0.08] [[data-theme='dark']_&]:bg-[var(--color-bg-card-dark)] [[data-theme='dark']_&]:hover:shadow-[0_8px_28px_rgba(0,0,0,0.3)]"
          >
            <div className="text-[28px] leading-none">{feature.icon}</div>
            <h3 className="m-0 text-[16px] font-bold text-[var(--color-text)]">{feature.title}</h3>
            <p className="m-0 text-[14px] leading-[1.6] text-[var(--color-text-muted)] [[data-theme='dark']_&]:text-[var(--color-text-dark-muted)]">
              {feature.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
