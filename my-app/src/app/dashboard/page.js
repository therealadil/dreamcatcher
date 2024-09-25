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

// return (
//   <div>
//     <section className={styles.dashboard_dreams_container}>
//       <article>
//         <h2 className={styles.dashboard_heading}>Your Dreams</h2>

//         {dreamEntries
//           .sort((a, b) => new Date(b.created_at) - new Date(a.created_at)) // Sort by created_at in descending order
//           .map((entry) => (
//             <div key={entry.id} className={styles.dream}>
//               <h2>{entry.title}</h2>
//               <p>{entry.entry}</p>
//               <p>Created at: {entry.created_at}</p>
//             </div>
//           ))}
//       </article>
//     </section>
//     <section>
//       <article className={styles.dream_button_container}>
//         <Link href="/form">
//           <button className={styles.dream_button}>+</button>
//         </Link>
//         <button className={styles.dream_button}>View More</button>
//       </article>
//     </section>
//   </div>
// );

return (
  <div>
    <section className={styles.dashboard_dreams_container}>
      <article>
        <h2 className={styles.dashboard_heading}>Your Dreams</h2>

        {dreamEntries
          .sort((a, b) => new Date(b.created_at) - new Date(a.created_at)) // Sort by created_at in descending order
          .map((entry) => (
            <div key={entry.id} className={styles.dream}>
              <h2>{entry.title}</h2>
              <p>{entry.entry}</p>
              <p>Created at: {entry.created_at}</p>
            </div>
          ))}
      </article>
      
      {/* View More button centralized at the end */}
      <div className={styles.viewMoreContainer}>
        <button className={styles.dream_button}>View More</button>
      </div>
    </section>
    
    {/* Fixed button in bottom corner */}
    <Link href="/form">
      <button className={styles.fixedPlusButton}>+</button>
    </Link>
  </div>
);


};

export default Dashboard;
