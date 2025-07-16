import Link from 'next/link';
import './LandingPage.css';
import Image from 'next/image';

export default function LandingPage() {
  return (
    <>
      <div className="space stars1"></div>
      <div className="space stars2"></div>
      <div className="space stars3"></div>

      <div className="LP">



      <h1>🌙</h1>
      <h1>DreamCatcher test</h1>
      <h3>AI-powered dreams</h3>
      <p>Unlock the power of your subconcsious mind. Record, analyse, and explore your dreams with AI insights.</p>
        
      <Link href="/sign-in" passHref>
            <button>Get Started</button>
        </Link>

      </div>
    </>
  );
}