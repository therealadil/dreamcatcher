/**
 * The `SignIn` component is responsible for rendering the sign-in page for the DreamCatcher application.
 * It checks if the user is already signed in, and if so, redirects them to the dashboard. Otherwise, it
 * renders a button that allows the user to sign in with their Google account.
 */
"use client"

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../../lib/supabaseClient';
import '../LandingPAge/LandingPage.css';
import './page.css';

export default function SignIn() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      if (user) {
        router.replace('/dashboard');
      }
    };
    checkUser();
  }, [router]);

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });
      if (error) setErrorMsg(error.message);
    } catch (error) {
      setErrorMsg(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEmailAuth = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");
    setLoading(true);
    if (!email || !password) {
      setErrorMsg("Please enter both email and password.");
      setLoading(false);
      return;
    }
    try {
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) {
          setErrorMsg(error.message);
        } else {
          setSuccessMsg("Check your email for a confirmation link!");
        }
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) {
          setErrorMsg(error.message);
        } else {
          setSuccessMsg("Signed in! Redirecting...");
          setTimeout(() => router.push("/dashboard"), 1000);
        }
      }
    } catch (error) {
      setErrorMsg(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (user) return null;

  return (
    <div className="sign-in-landing-bg">
      <div className="stars-container">
        <div className="stars1"></div>
        <div className="stars2"></div>
        <div className="stars3"></div>
      </div>
      <section className="hero-section">
        <div className="hero-content sign-in-content">
          <div className="moon-container">
            <span className="moon" role="img" aria-label="moon">🌙</span>
          </div>
          <h1 className="hero-title gradient-text">{isSignUp ? 'Sign Up' : 'Sign In'} to DreamCatcher</h1>
          <p className="hero-subtitle">Access your dream journal and unlock your subconscious</p>
          <button onClick={handleGoogleSignIn} className="cta-button sign-in-google" disabled={loading}>
            <img
              src="https://img.icons8.com/?size=100&id=85834&format=png&color=FFFFFF"
              alt="Google Icon"
              style={{ width: '20px', height: '20px', marginRight: '0.5rem' }}
            />
            <span>{loading ? 'Processing...' : 'Continue with Google'}</span>
          </button>
          <div className="sign-in-or">or</div>
          <form className="sign-in-form" onSubmit={handleEmailAuth}>
            <input
              className="sign-in-input"
              type="email"
              placeholder="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              autoComplete="email"
              disabled={loading}
              required
            />
            <input
              className="sign-in-input"
              type="password"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              autoComplete={isSignUp ? "new-password" : "current-password"}
              disabled={loading}
              required
            />
            <button className="cta-button sign-in-submit" type="submit" disabled={loading}>
              {loading ? (isSignUp ? "Signing up..." : "Signing in...") : (isSignUp ? "Sign Up" : "Sign In")}
            </button>
          </form>
          <div className="sign-in-message" style={{ minHeight: 24 }}>
            {errorMsg && <span className="sign-in-error">{errorMsg}</span>}
            {successMsg && <span className="sign-in-success">{successMsg}</span>}
          </div>
          <button
            className="sign-in-toggle"
            type="button"
            onClick={() => { setIsSignUp(!isSignUp); setErrorMsg(""); setSuccessMsg(""); }}
          >
            {isSignUp ? "Already have an account? Sign In" : "Don't have an account? Sign Up"}
          </button>
          <p className="sign-in-terms">By signing {isSignUp ? "up" : "in"}, you confirm your agreement of our <Link href="/terms" className="sign-in-link">terms of use</Link>.</p>
        </div>
      </section>
    </div>
  );
}

