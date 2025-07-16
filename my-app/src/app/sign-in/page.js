/**
 * The `SignIn` component is responsible for rendering the sign-in page for the DreamCatcher application.
 * It checks if the user is already signed in, and if so, redirects them to the dashboard. Otherwise, it
 * renders a button that allows the user to sign in with their Google account.
 */
"use client"

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../../lib/supabaseClient';
import './page.css';

const SignIn = () => {
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
        window.location.href = "/dashboard"
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
      if (error) {
        setErrorMsg(error.message);
      }
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

  if (user) {
    return null; // or a loading spinner
  }
  return (
    <div className="sign-in-page">
      <div className="sign-in-container">
        <h1>Sign {isSignUp ? "Up" : "In"} to 🌙 DreamCatcher</h1>
        <p className="sign-in-description">Access your dream journal now.</p>
        <button onClick={handleGoogleSignIn} className="sign-in-button" disabled={loading}>
          <img
            src="https://img.icons8.com/?size=100&id=85834&format=png&color=FFFFFF"
            alt="Google Icon"
            style={{ width: '20px', height: '20px', marginRight: '0.5rem' }}
          />
          <span style={{ fontWeight: 'normal' }}>{loading ? 'Processing...' : 'Continue with Google'}</span>
        </button>
        <div style={{ margin: '16px 0', color: '#fff', opacity: 0.7 }}>or</div>
        <form className="email-auth-form" onSubmit={handleEmailAuth}>
          <input
            className="email-auth-input"
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            autoComplete="email"
            disabled={loading}
            required
          />
          <input
            className="email-auth-input"
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            autoComplete={isSignUp ? "new-password" : "current-password"}
            disabled={loading}
            required
          />
          <button className="sign-in-button" type="submit" disabled={loading}>
            {loading ? (isSignUp ? "Signing up..." : "Signing in...") : (isSignUp ? "Sign Up" : "Sign In")}
          </button>
        </form>
        <div style={{ margin: '10px 0', color: errorMsg ? '#f87171' : '#4ade80', minHeight: 24 }}>
          {errorMsg || successMsg}
        </div>
        <button
          className="toggle-auth-mode"
          type="button"
          onClick={() => { setIsSignUp(!isSignUp); setErrorMsg(""); setSuccessMsg(""); }}
          style={{ background: 'none', border: 'none', color: '#fff', textDecoration: 'underline', cursor: 'pointer', marginTop: 8 }}
        >
          {isSignUp ? "Already have an account? Sign In" : "Don't have an account? Sign Up"}
        </button>
        <p className="terms">By signing {isSignUp ? "up" : "in"}, you confirm your agreement of our terms of use.</p>
      </div>
    </div>
  );
};

export default SignIn;

