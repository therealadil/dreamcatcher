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

const Dashboard = () => {
  const [dreamEntries, setDreamEntries] = useState([]);
  const [user, setUser] = useState(null);
  const router = useRouter();

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

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <section className={styles.dashboard_dreams_container}>
        <article>
          <h2 className={styles.dashboard_heading}>Your Dream</h2>

          {dreamEntries.map((entry) => (
            <div key={entry.id} className={styles.dream}>
              <h2>{entry.title}</h2>
              <p>{entry.entry}</p>
              <p>Created at: {entry.created_at}</p>
            </div>
          ))}
        </article>
      </section>
      <section>
        <article className={styles.dream_button_container}>
          <button className={styles.dream_button}>+</button>
          <button className={styles.dream_button}>View More</button>
        </article>
      </section>
    </div>
  );
};

export default Dashboard;
