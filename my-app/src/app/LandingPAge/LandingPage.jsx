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
  return (
    <div className="landing-page">
      {/* Animated stars background */}
      <div className="stars-container">
        <div className="stars1"></div>
        <div className="stars2"></div>
        <div className="stars3"></div>
      </div>

      {/* Hero Section - Full viewport height */}
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
          <div className="scroll-down-arrow" aria-label="Scroll to features" onClick={handleScrollToFeatures} style={{cursor:'pointer', animation: 'none'}}>
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
          <div className="scroll-down-arrow" aria-label="Scroll to next section" onClick={handleScrollToExample} style={{cursor:'pointer', animation: 'none', marginTop: 48}}>
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