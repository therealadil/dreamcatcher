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

  if (!user) return (
    <div className="dashboard-page">
      <div className="stars-container">
        <div className="stars1"></div>
        <div className="stars2"></div>
        <div className="stars3"></div>
      </div>
      <div style={{paddingTop: 32, textAlign: 'center'}}>
        <h1 className="hero-title" style={{fontSize: '2.2rem', marginBottom: 8}}>Your Dream Journal</h1>
        <p className="hero-subtitle" style={{fontSize: '1.05rem', marginBottom: 32}}>View, reflect, and decode your dreams with AI-powered insights</p>
      </div>
      <div style={{textAlign:'center',marginTop:40}}><h2>Loading...</h2></div>
    </div>
  );

  return (
    <div className="dashboard-page">
      <div className="stars-container">
        <div className="stars1"></div>
        <div className="stars2"></div>
        <div className="stars3"></div>
      </div>
      <div style={{paddingTop: 32, textAlign: 'center'}}>
        <h1 className="hero-title" style={{fontSize: '2.2rem', marginBottom: 8}}>Your Dream Journal</h1>
        <p className="hero-subtitle" style={{fontSize: '1.05rem', marginBottom: 32}}>View, reflect, and decode your dreams with AI-powered insights</p>
      </div>
      {/* Toolbar with search, filter, calendar, sort */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 16,
        margin: '0 auto 32px auto',
        maxWidth: 700,
        flexWrap: 'wrap',
        padding: '0 12px'
      }}>
        <input
          type="text"
          placeholder="Search dreams..."
          style={{
            padding: '10px 16px',
            borderRadius: 24,
            border: '1px solid #c084fc',
            background: 'rgba(255,255,255,0.07)',
            color: '#fff',
            fontSize: '1rem',
            outline: 'none',
            minWidth: 180
          }}
          onChange={() => {}}
        />
        <select
          style={{
            padding: '10px 16px',
            borderRadius: 24,
            border: '1px solid #a78bfa',
            background: 'rgba(139,92,246,0.08)',
            color: '#fff',
            fontSize: '1rem',
            outline: 'none',
            minWidth: 120
          }}
          onChange={() => {}}
        >
          <option>All</option>
          <option>Recent</option>
          <option>Oldest</option>
          <option>With AI Insights</option>
        </select>
        <button
          style={{
            background: 'none',
            border: 'none',
            borderRadius: '50%',
            width: 44,
            height: 44,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'background 0.2s',
            color: '#a78bfa',
            fontSize: 24
          }}
          title="Calendar (coming soon)"
          onClick={() => {}}
        >
          <span role="img" aria-label="calendar">📅</span>
        </button>
        <select
          style={{
            padding: '10px 16px',
            borderRadius: 24,
            border: '1px solid #a78bfa',
            background: 'rgba(139,92,246,0.08)',
            color: '#fff',
            fontSize: '1rem',
            outline: 'none',
            minWidth: 120
          }}
          onChange={() => {}}
        >
          <option>Sort: Newest</option>
          <option>Sort: Oldest</option>
          <option>Sort: Title A-Z</option>
        </select>
      </div>
      <section className="features-section" style={{marginTop: 0}}>
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
      <button
        className="floating-add-btn"
        title="Add New Dream"
        onClick={() => router.push('/form')}
        style={{position: 'fixed', right: 32, bottom: 32, width: 60, height: 60, borderRadius: '50%', background: 'linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)', color: '#fff', fontSize: '2.5rem', fontWeight: 600, border: 'none', boxShadow: '0 8px 24px rgba(139, 92, 246, 0.25)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, transition: 'box-shadow 0.2s, transform 0.2s'}}
        onMouseOver={e => {e.currentTarget.style.boxShadow = '0 12px 32px rgba(236, 72, 153, 0.35)';e.currentTarget.style.transform = 'translateY(-2px) scale(1.07)';}}
        onMouseOut={e => {e.currentTarget.style.boxShadow = '0 8px 24px rgba(139, 92, 246, 0.25)';e.currentTarget.style.transform = 'none';}}
      >
        +
      </button>
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