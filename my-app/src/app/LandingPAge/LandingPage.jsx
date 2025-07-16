import Link from 'next/link';
import './LandingPage.css';

export default function LandingPage() {
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
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
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
      </section>

      {/* Example Content Section */}
      <section className="example-section">
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
    </div>
  );
}