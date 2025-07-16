"use client";
import Link from 'next/link';
import './LandingPage.css';
import { useRef } from 'react';

export default function LandingPage() {
  const featuresRef = useRef(null);
  const exampleRef = useRef(null);
  
  const handleScrollToFeatures = (e) => {
    e.preventDefault();
    if (featuresRef.current) {
      featuresRef.current.scrollIntoView({ behavior: 'smooth' });
    } else {
      const el = document.getElementById('features-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  const handleScrollToExample = (e) => {
    e.preventDefault();
    if (exampleRef.current) {
      exampleRef.current.scrollIntoView({ behavior: 'smooth' });
    } else {
      const el = document.getElementById('example-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Generate stars with varied properties and better distribution
  const generateStars = (count, layer) => {
    const stars = [];
    const gridSize = Math.ceil(Math.sqrt(count * 1.5)); // Smaller grid for better spread
    const cellSize = 100 / gridSize;
    
    for (let i = 0; i < count; i++) {
      // Use grid-based positioning with some randomness
      const gridX = Math.floor(Math.random() * gridSize);
      const gridY = Math.floor(Math.random() * gridSize);
      
      // Add more randomness within each grid cell for better spread
      const randomX = Math.random() * cellSize * 0.8; // More randomness
      const randomY = Math.random() * cellSize * 0.8;
      
      const left = (gridX * cellSize) + randomX + (cellSize * 0.1);
      const top = (gridY * cellSize) + randomY + (cellSize * 0.1);
      
      // Reduce minimum distance for more stars
      const isTooClose = stars.some(star => 
        Math.abs(star.left - left) < 4 && Math.abs(star.top - top) < 4
      );
      
      if (!isTooClose) {
        // Vary drift duration based on layer for parallax effect
        let driftDuration;
        if (layer === 'dim' || layer === 'dim-2') {
          driftDuration = Math.random() * 80 + 120; // 120-200s - very slow (background)
        } else if (layer === 'medium') {
          driftDuration = Math.random() * 60 + 80; // 80-140s - slow
        } else if (layer === 'bright') {
          driftDuration = Math.random() * 40 + 60; // 60-100s - medium
        }
        
        stars.push({
          left: Math.max(2, Math.min(98, left)),
          top: Math.max(2, Math.min(98, top)),
          twinkleDelay: Math.random() * 12,
          driftDelay: Math.random() * 30,
          driftDuration: driftDuration,
          sizeFactor: layer === 'bright' ? Math.random() * 0.8 + 0.6 : Math.random() * 0.6 + 0.3
        });
      }
    }
    
    return stars.map((star, i) => (
      <div
        key={`${layer}-${i}`}
        className={`star star-${layer}`}
        style={{
          '--star-top': `${star.top}%`,
          '--star-left': `${star.left}%`,
          '--twinkle-delay': `${star.twinkleDelay}s`,
          '--drift-delay': `${star.driftDelay}s`,
          '--drift-duration': `${star.driftDuration}s`,
          '--size-factor': star.sizeFactor
        }}
      />
    ));
  };

  // Generate some extra bright stars for special effects
  const generateSpecialStars = () => {
    const specialStars = [];
    for (let i = 0; i < 15; i++) {
      specialStars.push({
        left: Math.random() * 95 + 2.5,
        top: Math.random() * 95 + 2.5,
        twinkleDelay: Math.random() * 10,
        driftDelay: Math.random() * 25,
        driftDuration: Math.random() * 30 + 50, // 50-80s - slower for special stars
        sizeFactor: Math.random() * 0.8 + 0.8 // Smaller and more subtle
      });
    }
    
    return specialStars.map((star, i) => (
      <div
        key={`special-${i}`}
        className="star star-special"
        style={{
          '--star-top': `${star.top}%`,
          '--star-left': `${star.left}%`,
          '--twinkle-delay': `${star.twinkleDelay}s`,
          '--drift-delay': `${star.driftDelay}s`,
          '--drift-duration': `${star.driftDuration}s`,
          '--size-factor': star.sizeFactor
        }}
      />
    ));
  };

  return (
    <div className="landing-page">
      {/* Layered starfield */}
      <div className="starfield">
        <div className="star-layer star-layer-1">
          {generateStars(120, 'dim')}
        </div>
        <div className="star-layer star-layer-2">
          {generateStars(100, 'dim-2')}
        </div>
        <div className="star-layer star-layer-3">
          {generateStars(60, 'medium')}
        </div>
        <div className="star-layer star-layer-4">
          {generateStars(30, 'bright')}
        </div>
        <div className="star-layer star-layer-5">
          {generateSpecialStars()}
        </div>
      </div>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="moon-container">
            <span className="moon" role="img" aria-label="moon">🌙</span>
          </div>
          <h1 className="hero-title">Unlock Your Dreams</h1>
          <p className="hero-subtitle">Record, explore, and understand your dreams with AI-powered insights</p>
          <Link href="/sign-in" className="cta-button">
            Begin Your Journey
          </Link>
          <div className="scroll-down-arrow" onClick={handleScrollToFeatures}>
            <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 15L18 24L27 15" stroke="#d1c4e9" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <div className="features-bg-band">
        <section className="features-section" ref={featuresRef} id="features-section">
          <div className="features-header">
            <h2>Discover Your Dream World</h2>
            <p>Powerful tools to capture and understand your subconscious mind</p>
          </div>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">📓</div>
              <h3>Dream Journaling</h3>
              <p>Log your dreams easily, anytime, anywhere</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🤖</div>
              <h3>AI Insights</h3>
              <p>Get summaries, tags, and interpretations</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📈</div>
              <h3>Trends & Stats</h3>
              <p>See patterns and personal growth over time</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🔒</div>
              <h3>Private & Secure</h3>
              <p>Your dreams are yours alone</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🎤</div>
              <h3>Voice Logging</h3>
              <p>Record dreams with your voice, hands-free</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🎨</div>
              <h3>Creative Canvas</h3>
              <p>Draw or sketch your dreams visually</p>
            </div>
          </div>
          <div className="scroll-down-arrow" onClick={handleScrollToExample} style={{marginTop: 48}}>
            <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 15L18 24L27 15" stroke="#d1c4e9" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </section>
      </div>

      {/* Example Content Section */}
      <section className="example-section" ref={exampleRef} id="example-section">
        <div className="example-content">
          <h2>Your Dreams, Reimagined</h2>
          <div className="example-grid">
            <div className="example-card">
              <h3>✨ Dream Analysis</h3>
              <p>Our AI analyzes recurring themes, emotions, and symbols in your dreams to provide meaningful insights about your subconscious mind.</p>
            </div>
            <div className="example-card">
              <h3>🌟 Pattern Recognition</h3>
              <p>Track how your dreams change over time, identify triggers, and discover connections between your daily life and dream world.</p>
            </div>
            <div className="example-card">
              <h3>🎭 Emotional Mapping</h3>
              <p>Understand the emotional landscape of your dreams and how they reflect your waking life experiences and feelings.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="newsletter-section">
        <div className="newsletter-content">
          <h2 className="newsletter-title">Stay in the Dream Loop</h2>
          <p className="newsletter-desc">Sign up for our newsletter to get dream journaling tips, feature updates, and inspiration delivered to your inbox.</p>
          <form className="newsletter-form" onSubmit={e => e.preventDefault()}>
            <input className="newsletter-input" type="email" placeholder="Enter your email" required />
            <button className="newsletter-btn" type="submit">Subscribe</button>
          </form>
        </div>
      </section>
    </div>
  );
}