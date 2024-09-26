/**
 * The Dashboard component is the main page for the application's dashboard functionality.
 * It fetches the current user's data and their dream entries from the Supabase database,
 * and displays the dream entries on the page.
 *
 * @returns {JSX.Element} The rendered Dashboard component.
 */
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
        // Remove the deleted dream from the state
        setDreamEntries(dreamEntries.filter((dream) => dream.id !== dreamId));
      }
    } catch (error) {
      console.error("Error deleting dream:", error.message);
    }
  };
  // const handleUpdateDream = async (dreamId, updatedDream) => {
  //   try {
  //     const { error } = await supabase
  //       .from("dream_entries")
  //       .update(updatedDream)
  //       .eq("id", dreamId);

  //     console.log(updatedDream);

  //     if (error) {
  //       console.error("Error updating dream:", error.message);
  //     } else {
  //       // Update the dream in the state
  //       setDreamEntries(
  //         dreamEntries.map((dream) =>
  //           dream.id === dreamId ? { ...dream, ...updatedDream } : dream
  //         )
  //       );
  //     }
  //   } catch (error) {
  //     console.error("Error updating dream:", error.message);
  //   }
  // };

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
              .sort((a, b) => new Date(b.created_at) - new Date(a.created_at)) // Sort by created_at in descending order
              .map((entry) => (
                <div key={entry.id} className={styles.dream}>
                  <p>{new Date(entry.created_at).toLocaleDateString()}</p>
                  <h2>{entry.title}</h2>
                  <p>{entry.entry}</p>
                  <div className={styles.dream_buttons_container}>
                    <button
                      className={styles.dream_button}
                      onClick={() => handleDeleteDream(entry.id)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="24"
                        height="24"
                      >
                        <path
                          fill="white"
                          d="M3 6v18h18v-18h-18zm5 14c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm4-18v2h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.315c0 .901.73 2 1.631 2h5.712z"
                        />
                      </svg>
                    </button>

                    <Link href={`/form?id=${entry.id}`}>
                      <button className={styles.dream_button}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          width="24"
                          height="24"
                        >
                          <path
                            fill="white"
                            d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zm-2.218 5.93l-3.712-3.712-12.15 12.15v3.712h3.712l12.15-12.15zM5.25 20.25h-3.75v-3.75l11.25-11.25 3.75 3.75-11.25 11.25z"
                          />
                        </svg>
                      </button>
                    </Link>
                  </div>
                </div>
              ))}
          </article>
          <article>
            {/* View More button centralized at the end, only shown if there are more than 3 entries */}
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
        <section>
          <article>
            {/* <Link href={`/form?id=${entry.id}`}>
              <button className={styles.dream_button}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                >
                  <path
                    fill="white"
                    d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zm-2.218 5.93l-3.712-3.712-12.15 12.15v3.712h3.712l12.15-12.15zM5.25 20.25h-3.75v-3.75l11.25-11.25 3.75 3.75-11.25 11.25z"
                  />
                </svg>
                Update
              </button>
            </Link> */}
          </article>
        </section>
      </div>
    </>
  );
};

export default Dashboard;
