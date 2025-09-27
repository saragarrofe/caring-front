import { Link } from 'react-router-dom';
import './Hero.css';

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1>Take care of your plants alive</h1>
        <p className="subtitle">
          Individual care schedule and reminders for your plants, recommendations, step by step
          guides, and more.
        </p>
        <div className="badges">
            <Link to="/tricks-and-advices" className='badge-tricks'>Tricks and advices</Link>
          <span className="special-badge">Plant of the day</span>
        </div>
      </div>
    </section>
  );
};

export default Hero;
