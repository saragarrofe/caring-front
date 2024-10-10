// src/components/Hero.tsx
import React from 'react';
import './Hero.css';

const Hero: React.FC = () => {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1>Keep your plants alive</h1>
        <p className="subtitle">
          Individual care schedule and reminders for your plants, recommendations, step by step guides, and more.
        </p>
        <button className="cta-button">Download now</button>
        <div className="badges">
          <span className="badge">App of The Day</span>
          <span className="badge">Editor's Choice</span>
        </div>
      </div>
      <div className="hero-image">
        <img src="/path-to-your-phone-image.png" alt="App preview on phone" />
      </div>
    </section>
  );
};

export default Hero;
