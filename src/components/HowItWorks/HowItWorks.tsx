
const STEPS = [
  { n: '01', icon: '🔍', title: 'Add your plants',      desc: 'Search by name or browse our catalog. Add as many plants as you have.' },
  { n: '02', icon: '🏠', title: 'Set your space',        desc: 'Tell us where each plant lives — bedroom, balcony, office. Light matters.' },
  { n: '03', icon: '📋', title: 'Get your schedule',     desc: 'We generate a personalized care calendar based on species and environment.' },
  { n: '04', icon: '✨', title: 'Watch them thrive',     desc: 'Follow daily reminders, log your care, and enjoy a healthy indoor jungle.' },
];

export default function HowItWorks() {
    return (
        <section id="how-it-works" className="landing-section landing-section--dark">
        <div className="landing-section-header">
          <span className="landing-badge landing-badge--light">How it Works</span>
          <h2 className="landing-section-title landing-section-title--light">Up and running in minutes</h2>
          <p className="landing-section-sub landing-section-sub--light">No complicated setup. Just add your plants and let Caring do the rest.</p>
        </div>
        <div className="landing-steps">
          {STEPS.map((s, i) => (
            <div key={s.n} className="landing-step">
              <div className="landing-step-number">{s.n}</div>
              <div className="landing-step-icon">{s.icon}</div>
              <h3 className="landing-step-title">{s.title}</h3>
              <p className="landing-step-desc">{s.desc}</p>
              {i < STEPS.length - 1 && <div className="landing-step-connector" />}
            </div>
          ))}
        </div>
      </section>
    )
}