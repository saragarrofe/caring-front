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
    <section id="features" className="landing-section landing-section--light">
      <div className="landing-section-header">
        <span className="landing-badge">Features</span>
        <h2 className="landing-section-title">Everything your plants need</h2>
        <p className="landing-section-sub">
          One app to track, remind and guide you through every stage of plant care.
        </p>
      </div>
      <div className="landing-features-grid">
        {FEATURES.map((feature) => (
          <div key={feature.title} className="landing-feature-card">
            <div className="landing-feature-icon">{feature.icon}</div>
            <h3 className="landing-feature-title">{feature.title}</h3>
            <p className="landing-feature-desc">{feature.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
