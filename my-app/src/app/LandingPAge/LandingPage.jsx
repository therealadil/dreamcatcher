import Link from 'next/link';
import './LandingPage.css';

export default function LandingPage() {
  return (
    <>
      <div className="space stars1"></div>
      <div className="space stars2"></div>
      <div className="space stars3"></div>

      <section className="hero-section">
        <div className="hero">
          <span className="moon" role="img" aria-label="moon">🌙</span>
          <h1 className="hero-title">Unlock Your Dreams</h1>
          <p className="hero-subline">Record, explore, and understand your dreams with AI-powered insights.</p>
          <Link href="/sign-in" passHref legacyBehavior>
            <button className="get-started">Get Started</button>
          </Link>
        </div>
      </section>

      <section className="features-section">
        <div className="features-scroll">
          <div className="feature-card">
            <span className="fa" role="img" aria-label="journal">📓</span>
            <h3>Dream Journaling</h3>
            <p>Log your dreams easily, anytime.</p>
          </div>
          <div className="feature-card">
            <span className="fa" role="img" aria-label="ai">🤖</span>
            <h3>AI Insights</h3>
            <p>Get summaries, tags, and interpretations.</p>
          </div>
          <div className="feature-card">
            <span className="fa" role="img" aria-label="trends">📈</span>
            <h3>Trends & Stats</h3>
            <p>See patterns and personal growth over time.</p>
          </div>
          <div className="feature-card">
            <span className="fa" role="img" aria-label="secure">🔒</span>
            <h3>Private & Secure</h3>
            <p>Your dreams are yours alone.</p>
          </div>
          <div className="feature-card">
            <span className="fa" role="img" aria-label="voice">🎤</span>
            <h3>Voice Logging</h3>
            <p>Record dreams with your voice, hands-free.</p>
          </div>
          <div className="feature-card">
            <span className="fa" role="img" aria-label="canvas">🎨</span>
            <h3>Creative Canvas</h3>
            <p>Draw or sketch your dreams visually.</p>
          </div>
        </div>
      </section>
    </>
  );
}