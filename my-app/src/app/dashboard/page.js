// File: src/app/dashboard/page.js

"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabaseClient";
import styles from "./page.module.css";
import Link from "next/link";
import "@fortawesome/fontawesome-svg-core/styles.css";

const Dashboard = () => {
  const [dreamEntries, setDreamEntries] = useState([]);
  const [user, setUser] = useState(null);
  const router = useRouter();
  const [showAllDreams, setShowAllDreams] = useState(false);
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const [selectedDream, setSelectedDream] = useState(null);
  const [aiExplanation, setAiExplanation] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchUserAndDreamEntries = async () => {
      try {
        const {
          data: { user: userData },
          error: userError,
        } = await supabase.auth.getUser();

        if (userError || !userData) {
          console.error("Error fetching user data:", userError?.message);
          router.replace("/sign-in");
          return;
        }

        setUser(userData);

        const { data: dreamData, error: dreamError } = await supabase
          .from("dream_entries")
          .select("*")
          .eq("user_id", userData.id);

        if (dreamError) {
          console.error("Error fetching dream entries:", dreamError.message);
        } else {
          setDreamEntries(dreamData);
        }
      } catch (error) {
        console.error("Error fetching user and dream entries:", error.message);
      }
    };

    fetchUserAndDreamEntries();
  }, [router]);

  const handleDeleteDream = async (dreamId) => {
    try {
      const { error } = await supabase
        .from("dream_entries")
        .delete()
        .eq("id", dreamId);

      if (error) {
        console.error("Error deleting dream:", error.message);
      } else {
        setDreamEntries(dreamEntries.filter((dream) => dream.id !== dreamId));
      }
    } catch (error) {
      console.error("Error deleting dream:", error.message);
    }
  };

  const fetchAiExplanation = async (dreamText) => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/explain-dream', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ dreamText }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      if (data.error) {
        throw new Error(data.error);
      }
      setAiExplanation(data.explanation);
    } catch (error) {
      console.error('Error explaining dream:', error);
      setAiExplanation('Sorry, there was an error explaining your dream. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAiClick = (dream) => {
    setSelectedDream(dream);
    setIsOverlayOpen(true);
    fetchAiExplanation(dream.entry);
  };

  const closeOverlay = () => {
    setIsOverlayOpen(false);
    setSelectedDream(null);
    setAiExplanation('');
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="space stars1"></div>
      <div className="space stars2"></div>
      <div className="space stars3"></div>
  
      <div>
        <section className={styles.dashboard_dreams_container}>
          <article>
            <h2 className={styles.dashboard_heading}>Your Dreams</h2>
  
            {(showAllDreams ? dreamEntries : dreamEntries.slice(0, 3))
              .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
              .map((entry) => (
                <div key={entry.id} className={styles.dream}>
                  <p>{new Date(entry.created_at).toLocaleDateString()}</p>
                  <h2>{entry.title}</h2>
                  <p>{entry.entry}</p>
                  <button
                    className={styles.aiButton}
                    onClick={() => handleAiClick(entry)}
                  >
                    <img src="https://img.icons8.com/?size=100&id=61864&format=png&color=000000" alt="AI Brain" />
                    Decode with AI
                  </button>
                  <div className={styles.dream_button_container}>
                    <Link href={`/form?id=${entry.id}`}>
                      <button className={styles.dream_button}>
                        <img src="https://img.icons8.com/?size=100&id=49&format=png&color=000000" alt="Edit" />
                      </button>
                    </Link>
                    <button
                      className={styles.dream_button}
                      onClick={() => handleDeleteDream(entry.id)}
                    >
                      <img src="https://img.icons8.com/?size=100&id=99933&format=png&color=000000" alt="Delete" />
                    </button>
                  </div>
                </div>
              ))}
          </article>
          <article>
            {dreamEntries.length > 3 && (
              <div className={styles.viewMoreContainer}>
                <button
                  className={styles.dream_button}
                  onClick={() => setShowAllDreams(!showAllDreams)}
                >
                  {showAllDreams ? "View Less" : "View More"}
                </button>
              </div>
            )}
            <Link href="/form">
              <button className={styles.fixedPlusButton}>+</button>
            </Link>
          </article>
        </section>
  
        {/* AI Explanation Overlay */}
        {isOverlayOpen && selectedDream && (
          <div className={styles.overlay}>
            <div className={styles.overlayContent}>
              <div className={styles.dreamDetails}>
                <p className={styles.dreamDate}>
                  {new Date(selectedDream.created_at).toLocaleDateString()}
                </p>
                <h2 className={styles.dreamTitle}>{selectedDream.title}</h2>
                <p className={styles.dreamContent}>{selectedDream.entry}</p>
              </div>
              <div className={styles.aiDecoded}>
                <h3 className={styles.aiTitle}>
                  <img src="https://img.icons8.com/?size=100&id=61864&format=png&color=ffffff" alt="AI Brain" className={styles.aiIcon} />
                  AI insights to your dream:
                </h3>
                <p className={styles.aiMessage}>
                  {isLoading 
                    ? 'Loading explanation...' 
                    : (aiExplanation || 'No explanation available. Please try again.')}
                </p>
              </div>
              <button 
                className={styles.closeOverlayButton} 
                onClick={closeOverlay}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Dashboard;