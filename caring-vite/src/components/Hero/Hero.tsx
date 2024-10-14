import React from 'react';
import './Hero.css';

const Hero: React.FC = () => {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1>Take care of your plants alive</h1>
        <p className="subtitle">
          Individual care schedule and reminders for your plants, recommendations, step by step guides, and more.
        </p>
        <div className="badges">
          <span className="badge">Tricks and advices</span>
          <span className="special-badge">Plant of the day</span>
        </div>
      </div>
    </section>
  );
};

export default Hero;
