// File: src/app/dashboard/page.js

"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabaseClient";
import Link from "next/link";
import "../LandingPAge/LandingPage.css";
import styles from "./page.module.css";

export default function Dashboard() {
  const [dreamEntries, setDreamEntries] = useState([]);
  const [user, setUser] = useState(null);
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const [selectedDream, setSelectedDream] = useState(null);
  const [aiExplanation, setAiExplanation] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchUserAndDreamEntries = async () => {
      const {
        data: { user: userData },
        error,
      } = await supabase.auth.getUser();
      if (error || !userData) {
        router.replace("/sign-in");
        return;
      }
      setUser(userData);
      const { data: dreamData } = await supabase
        .from("dream_entries")
        .select("*")
        .eq("user_id", userData.id);
      setDreamEntries(dreamData || []);
    };
    fetchUserAndDreamEntries();
  }, [router]);

  const handleDeleteDream = async (dreamId) => {
    await supabase.from("dream_entries").delete().eq("id", dreamId);
    setDreamEntries(dreamEntries.filter((dream) => dream.id !== dreamId));
  };

  const fetchAiExplanation = async (dreamText) => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/explain-dream", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ dreamText }),
      });
      const data = await response.json();
      setAiExplanation(data.explanation || "No explanation available.");
    } catch {
      setAiExplanation("Sorry, there was an error explaining your dream.");
    } finally {
      setIsLoading(false);
    }
  };

  const openOverlay = (dream) => {
    setSelectedDream(dream);
    setIsOverlayOpen(true);
    fetchAiExplanation(dream.entry);
  };
  const closeOverlay = () => {
    setIsOverlayOpen(false);
    setSelectedDream(null);
    setAiExplanation("");
  };

  if (!user) return <div className="dashboard-page"><div className="stars-container"><div className="stars1"></div><div className="stars2"></div><div className="stars3"></div></div><div className="hero-section"><div className="hero-content"><h2>Loading...</h2></div></div></div>;

  return (
    <div className="dashboard-page">
      <div className="stars-container">
        <div className="stars1"></div>
        <div className="stars2"></div>
        <div className="stars3"></div>
      </div>
      <section className="hero-section">
        <div className="hero-content">
          <div className="moon-container">
            <span className="moon" role="img" aria-label="moon">🌙</span>
          </div>
          <h1 className="hero-title">Your Dream Journal</h1>
          <p className="hero-subtitle">View, reflect, and decode your dreams with AI-powered insights</p>
          <Link href="/form" className="cta-button">Add New Dream</Link>
        </div>
      </section>
      <section className="features-section">
        <div className="features-header">
          <h2>Your Dreams</h2>
          <p>All your logged dreams, ready for reflection and discovery</p>
        </div>
        <div className="features-grid">
          {dreamEntries.length === 0 && (
            <div className="feature-card">
              <h3>No dreams yet</h3>
              <p>Start by adding your first dream!</p>
            </div>
          )}
          {dreamEntries.map((dream) => (
            <div className="feature-card" key={dream.id}>
              <div className="feature-icon">💤</div>
              <h3>{dream.title}</h3>
              <p style={{ color: '#d1c4e9', fontSize: '0.95rem', marginBottom: 8 }}>{new Date(dream.created_at).toLocaleDateString()}</p>
              <p>{dream.entry}</p>
              <div style={{ marginTop: 16, display: 'flex', gap: 8, justifyContent: 'center' }}>
                <button className="cta-button" style={{ padding: '8px 18px', fontSize: '0.95rem' }} onClick={() => openOverlay(dream)}>AI Decode</button>
                <Link href={`/form?id=${dream.id}`} className="cta-button" style={{ padding: '8px 18px', fontSize: '0.95rem', background: 'linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)' }}>Edit</Link>
                <button className="cta-button" style={{ padding: '8px 18px', fontSize: '0.95rem', background: 'linear-gradient(135deg, #f87171 0%, #ec4899 100%)' }} onClick={() => handleDeleteDream(dream.id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      </section>
      {isOverlayOpen && selectedDream && (
        <div className={styles.overlay}>
          <div className={styles.overlayContent}>
            <h2 style={{ marginBottom: 12 }}>{selectedDream.title}</h2>
            <p style={{ marginBottom: 16 }}>{selectedDream.entry}</p>
            <div className={styles.aiDecoded}>
              <h3 style={{ color: '#ec4899', marginBottom: 8 }}>AI insights to your dream:</h3>
              <p style={{ color: '#f8e1ff' }}>{isLoading ? 'Loading explanation...' : aiExplanation}</p>
            </div>
            <button className="cta-button" style={{ marginTop: 24 }} onClick={closeOverlay}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}