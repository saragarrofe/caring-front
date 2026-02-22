import './DashboardPreview.css';

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

function hydrationFillClass(pct: number, overdue: boolean): string {
  if (overdue) return 'dash-hydration-fill--overdue';
  if (pct < 30) return 'dash-hydration-fill--low';
  return 'dash-hydration-fill--ok';
}

export function DashboardPreview() {
  return (
    <div className="dash">
      <aside className="dash-sidebar">
        <div className="dash-logo">
          <span className="dash-logo-icon">🌿</span>
          Plant Care
        </div>
        <nav className="dash-nav">
          <div className="dash-nav-item active">
            <span className="dash-nav-icon">⊞</span>
            My Jungle
          </div>
          <div className="dash-nav-item">
            <span className="dash-nav-icon">📅</span>
            Schedule
          </div>
          <div className="dash-nav-item">
            <span className="dash-nav-icon">📖</span>
            Plant Library
          </div>
        </nav>
      </aside>

      <main className="dash-main">
        <div className="dash-header">
          <h1>My Jungle Dashboard</h1>
          <div className="dash-header-actions">
            <div className="dash-search">
              <span>🔍</span>
              <span className="dash-search-placeholder">Search plants...</span>
            </div>
            <button className="dash-btn-add">+ Add Plant</button>
          </div>
        </div>

        <div className="dash-stats">
          <div className="dash-stat-card">
            <div className="dash-stat-icon dash-stat-icon--teal">💧</div>
            <div>
              <p className="dash-stat-title">Today's Watering</p>
              <p className="dash-stat-sub">4 plants need water</p>
            </div>
          </div>
          <div className="dash-stat-card">
            <div className="dash-stat-icon dash-stat-icon--orange">🌱</div>
            <div>
              <p className="dash-stat-title">Feeding Schedule</p>
              <p className="dash-stat-sub">2 plants need nutrients</p>
            </div>
          </div>
          <div className="dash-stat-card">
            <div className="dash-stat-icon dash-stat-icon--blue">☀️</div>
            <div>
              <p className="dash-stat-title">Sunlight Check</p>
              <p className="dash-stat-sub">Rotating 3 sun-lovers</p>
            </div>
          </div>
        </div>

        <section>
          <h2 className="dash-collection-title">My Plant Collection</h2>
          <div className="dash-plant-grid">
            {DEMO_PLANTS.map((plant) => (
              <div key={plant.id} className="dash-plant-card">
                <div className="dash-plant-img-placeholder">{plant.emoji}</div>
                <div className="dash-plant-body">
                  <p className={`dash-plant-room dash-plant-room--${plant.roomColor}`}>
                    {plant.room}
                  </p>
                  <p className="dash-plant-name">{plant.name}</p>
                  <p className="dash-hydration-label">Hydration</p>
                  <div className="dash-hydration-row">
                    <div className="dash-hydration-bar">
                      <div
                        className={`dash-hydration-fill ${hydrationFillClass(plant.hydration, plant.overdue)}`}
                        style={{ width: `${plant.overdue ? 15 : plant.hydration}%` }}
                      />
                    </div>
                    <span className={`dash-hydration-value ${plant.overdue ? 'dash-hydration-value--overdue' : ''}`}>
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
  );
}
