const STEPS = [
  {
    n: '01',
    icon: '🔍',
    title: 'Add your plants',
    desc: 'Search by name or browse our catalog. Add as many plants as you have.',
  },
  {
    n: '02',
    icon: '🏠',
    title: 'Set your space',
    desc: 'Tell us where each plant lives — bedroom, balcony, office. Light matters.',
  },
  {
    n: '03',
    icon: '📋',
    title: 'Get your schedule',
    desc: 'We generate a personalized care calendar based on species and environment.',
  },
  {
    n: '04',
    icon: '✨',
    title: 'Watch them thrive',
    desc: 'Follow daily reminders, log your care, and enjoy a healthy indoor jungle.',
  },
];

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="flex flex-col items-center gap-[56px] bg-[var(--color-bg-dark)] px-[24px] py-[96px] max-md:gap-[40px] max-md:px-[20px] max-md:py-[64px]"
    >
      <div className="flex max-w-[560px] flex-col items-center gap-[14px] text-center">
        <span className="inline-block rounded-[50px] border-[1.5px] border-solid border-white/25 bg-white/10 px-[18px] py-[6px] text-[12px] font-bold uppercase tracking-[0.1em] text-[#a8e07a]">
          How it Works
        </span>
        <h2 className="m-0 text-[clamp(28px,4vw,42px)] font-extrabold tracking-[-0.02em] text-[var(--color-bg)]">
          Up and running in minutes
        </h2>
        <p className="m-0 text-[17px] leading-[1.6] text-white/65 [[data-theme='dark']_&]:text-[var(--color-text-dark-muted)]">
          No complicated setup. Just add your plants and let Caring do the rest.
        </p>
      </div>
      <div className="grid w-full max-w-[960px] grid-cols-4 max-md:grid-cols-2 max-md:gap-[32px] max-[480px]:grid-cols-1">
        {STEPS.map((step, index) => (
          <div
            key={step.n}
            className="relative flex flex-col items-center px-[20px] text-center"
          >
            <div className="mb-[12px] text-[11px] font-bold tracking-[0.1em] text-[#6cd044]">
              {step.n}
            </div>
            <div className="relative z-[1] mb-[16px] flex h-[60px] w-[60px] items-center justify-center rounded-[16px] border-[1.5px] border-solid border-[rgba(108,208,68,0.3)] bg-[rgba(108,208,68,0.15)] text-[26px]">
              {step.icon}
            </div>
            <h3 className="m-0 mb-[8px] text-[15px] font-bold text-[var(--color-bg)]">
              {step.title}
            </h3>
            <p className="m-0 text-[13px] leading-[1.6] text-white/55">{step.desc}</p>
            {index < STEPS.length - 1 && (
              <div className="absolute top-[42px] left-[calc(50%+38px)] right-[-20px] z-0 h-px bg-[rgba(108,208,68,0.25)] max-md:hidden" />
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
