const DEMO_PLANTS = [
  {
    id: 1,
    room: 'Living Room',
    roomColor: 'green',
    name: 'Monstera Deliciosa',
    emoji: '🌿',
    hydration: 75,
    overdue: false,
  },
  {
    id: 2,
    room: 'Bedroom',
    roomColor: 'red',
    name: 'Sansevieria',
    emoji: '🌱',
    hydration: 0,
    overdue: true,
  },
  {
    id: 3,
    room: 'Office',
    roomColor: 'green',
    name: 'Ficus Lyrata',
    emoji: '🍃',
    hydration: 45,
    overdue: false,
  },
];

const ROOM_COLOR_CLASS: Record<string, string> = {
  green: 'text-[#6cd044]',
  red: 'text-[#f87171]',
  yellow: 'text-[#fbbf24]',
};

function hydrationFillClass(pct: number, overdue: boolean): string {
  if (overdue) return 'bg-[#f87171]';
  if (pct < 30) return 'bg-[#fbbf24]';
  return 'bg-[#6cd044]';
}

export function DashboardPreview() {
  return (
    <section
      id="preview"
      className="flex flex-col items-center gap-[16px] bg-[var(--color-bg-card-light)] px-[24px] pt-[80px] pb-[100px] text-center [[data-theme='dark']_&]:bg-[var(--color-bg-card-dark)] max-md:px-[16px] max-md:pt-[60px] max-md:pb-[80px]"
    >
      <div className="text-[12px] font-bold uppercase tracking-[0.1em] text-[var(--color-primary)]">
        App Preview
      </div>
      <h2 className="m-0 text-[clamp(28px,4vw,42px)] font-extrabold tracking-[-0.02em] text-[var(--color-text)]">
        Everything you need, in one place
      </h2>
      <p className="m-0 max-w-[480px] text-[17px] text-[var(--color-text-muted)] [[data-theme='dark']_&]:text-[var(--color-text-dark-muted)]">
        Track hydration, feeding schedules, and sunlight needs for every plant in your home.
      </p>
      <div className="pointer-events-none mt-[24px] w-full max-w-[1000px] select-none overflow-hidden rounded-[20px] shadow-[0_0_0_1px_rgba(0,0,0,0.08),0_24px_64px_rgba(0,0,0,0.18)] [[data-theme='dark']_&]:shadow-[0_0_0_1px_rgba(255,255,255,0.06),0_24px_64px_rgba(0,0,0,0.4)] max-md:rounded-[12px]">
        <div className="flex min-h-[80vh] bg-[#0d1117] text-[var(--color-bg)] font-[inherit]">
          <aside className="hidden md:flex w-[240px] flex-shrink-0 flex-col gap-8 border-r border-white/[0.06] bg-[#0a0f1a] px-4 py-7">
            <div className="flex items-center gap-[10px] px-2 text-[17px] font-bold text-[#6cd044]">
              <span className="text-[22px]">🌿</span>
              Plant Care
            </div>
            <nav className="flex flex-col gap-1">
              <div className="flex w-full cursor-pointer items-center gap-3 rounded-[10px] bg-[var(--color-bg-dark)] px-[14px] py-[11px] text-left text-[15px] font-medium text-[#6cd044] transition-colors duration-150">
                <span className="w-[18px] text-center text-[16px]">⊞</span>
                My Jungle
              </div>
              <div className="flex w-full cursor-pointer items-center gap-3 rounded-[10px] bg-transparent px-[14px] py-[11px] text-left text-[15px] font-medium text-[var(--color-text-dark-muted)] transition-colors duration-150 hover:bg-white/5 hover:text-[#d1d5db]">
                <span className="w-[18px] text-center text-[16px]">📅</span>
                Schedule
              </div>
              <div className="flex w-full cursor-pointer items-center gap-3 rounded-[10px] bg-transparent px-[14px] py-[11px] text-left text-[15px] font-medium text-[var(--color-text-dark-muted)] transition-colors duration-150 hover:bg-white/5 hover:text-[#d1d5db]">
                <span className="w-[18px] text-center text-[16px]">📖</span>
                Plant Library
              </div>
            </nav>
          </aside>

          <main className="flex flex-1 flex-col gap-7 overflow-y-auto px-4 py-5 md:px-9 md:py-8">
            <div className="flex items-center justify-between gap-4">
              <h1 className="m-0 text-[20px] font-extrabold text-[var(--color-bg)] md:text-[26px]">
                My Jungle Dashboard
              </h1>
              <div className="flex items-center gap-[10px]">
                <div className="hidden items-center gap-2 rounded-[10px] border border-white/10 bg-white/[0.06] px-[14px] py-[9px] text-[14px] text-[var(--color-text-dark-muted)] md:flex">
                  <span>🔍</span>
                  <span className="w-[160px] text-[14px] text-[var(--color-text-dark-muted)]">
                    Search plants...
                  </span>
                </div>
                <button className="flex cursor-pointer items-center gap-[6px] whitespace-nowrap rounded-[10px] border-none bg-[#6cd044] px-[18px] py-[10px] text-[14px] font-bold text-[#0a1a06] transition-[background,transform] duration-150 hover:-translate-y-px hover:bg-[#7de050]">
                  + Add Plant
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-[14px] md:grid-cols-3">
              <div className="flex items-center gap-4 rounded-[14px] border border-white/[0.07] bg-[#131c13] px-5 py-[18px]">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-[12px] bg-[rgba(32,178,170,0.2)] text-[22px]">
                  💧
                </div>
                <div>
                  <p className="m-0 mb-[3px] text-[15px] font-bold text-[var(--color-bg)]">
                    Today's Watering
                  </p>
                  <p className="m-0 text-[13px] text-[var(--color-text-dark-muted)]">
                    4 plants need water
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4 rounded-[14px] border border-white/[0.07] bg-[#131c13] px-5 py-[18px]">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-[12px] bg-[rgba(210,105,30,0.2)] text-[22px]">
                  🌱
                </div>
                <div>
                  <p className="m-0 mb-[3px] text-[15px] font-bold text-[var(--color-bg)]">
                    Feeding Schedule
                  </p>
                  <p className="m-0 text-[13px] text-[var(--color-text-dark-muted)]">
                    2 plants need nutrients
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4 rounded-[14px] border border-white/[0.07] bg-[#131c13] px-5 py-[18px]">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-[12px] bg-[rgba(70,130,180,0.2)] text-[22px]">
                  ☀️
                </div>
                <div>
                  <p className="m-0 mb-[3px] text-[15px] font-bold text-[var(--color-bg)]">
                    Sunlight Check
                  </p>
                  <p className="m-0 text-[13px] text-[var(--color-text-dark-muted)]">
                    Rotating 3 sun-lovers
                  </p>
                </div>
              </div>
            </div>

            <section>
              <h2 className="m-0 mb-4 text-[20px] font-bold text-[var(--color-bg)]">
                My Plant Collection
              </h2>
              <div className="grid grid-cols-1 gap-4 min-[481px]:grid-cols-2 md:grid-cols-3">
                {DEMO_PLANTS.map((plant) => (
                  <div
                    key={plant.id}
                    className="group block overflow-hidden rounded-[16px] border border-white/[0.07] bg-[#131c13] no-underline transition-[transform,border-color] duration-150 hover:-translate-y-[3px] hover:border-[rgba(108,208,68,0.3)]"
                  >
                    <div className="flex aspect-[4/3] w-full items-center justify-center bg-[linear-gradient(135deg,#e8f0e0,#d4e8c4)] text-[48px]">
                      {plant.emoji}
                    </div>
                    <div className="px-4 pb-4 pt-[14px]">
                      <p
                        className={`m-0 mb-1 text-[11px] font-bold uppercase tracking-[0.08em] ${ROOM_COLOR_CLASS[plant.roomColor]}`}
                      >
                        {plant.room}
                      </p>
                      <p className="m-0 mb-[14px] text-[17px] font-bold text-[var(--color-bg)]">
                        {plant.name}
                      </p>
                      <p className="m-0 mb-[6px] text-[11px] font-semibold uppercase tracking-[0.06em] text-[var(--color-text-dark-muted)]">
                        Hydration
                      </p>
                      <div className="flex items-center justify-between gap-[10px]">
                        <div className="h-[5px] flex-1 overflow-hidden rounded-[99px] bg-white/10">
                          <div
                            className={`h-full rounded-[99px] transition-[width] duration-[400ms] ease-in-out ${hydrationFillClass(plant.hydration, plant.overdue)}`}
                            style={{ width: `${plant.overdue ? 15 : plant.hydration}%` }}
                          />
                        </div>
                        <span
                          className={`whitespace-nowrap text-[13px] font-bold ${plant.overdue ? 'text-[#f87171]' : 'text-[var(--color-bg)]'}`}
                        >
                          {plant.overdue ? 'OVERDUE' : `${plant.hydration}%`}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </main>
        </div>
      </div>
    </section>
  );
}
