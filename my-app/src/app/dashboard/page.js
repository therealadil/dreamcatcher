/**
 * The Dashboard component is the main page for the application's dashboard functionality.
 * It fetches the current user's data and their dream entries from the Supabase database,
 * and displays the dream entries on the page.
 *
 * @returns {JSX.Element} The rendered Dashboard component.
 */
"use client";
// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import { supabase } from "../../lib/supabaseClient";
import styles from "./page.module.css";

const Dashboard = () => {
  // const [dreamEntries, setDreamEntries] = useState([]);
  // const [user, setUser] = useState(null);
  // const router = useRouter();

  // useEffect(() => {
  //   const fetchUserAndDreamEntries = async () => {
  //     try {
  //       const {
  //         data: { user: userData },
  //         error: userError,
  //       } = await supabase.auth.getUser();

  //       if (userError || !userData) {
  //         console.error("Error fetching user data:", userError?.message);
  //         router.replace("/sign-in");
  //         return;
  //       }

  //       setUser(userData);

  //       const { data: dreamData, error: dreamError } = await supabase
  //         .from("dream_entries")
  //         .select("*")
  //         .eq("user_id", userData.id);

  //       if (dreamError) {
  //         console.error("Error fetching dream entries:", dreamError.message);
  //       } else {
  //         setDreamEntries(dreamData);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching user and dream entries:", error.message);
  //     }
  //   };

  //   fetchUserAndDreamEntries();
  // }, [router]);

  // if (!user) {
  //   return <div>Loading...</div>;
  // }

  return (
    // <div>
    //   <h1>Dashboard</h1>
    //   {dreamEntries.map((entry) => (
    //     <div key={entry.id}>
    //       <h2>{entry.title}</h2>
    //       <p>{entry.entry}</p>
    //       <p>Created at: {entry.created_at}</p>
    //       <p>User ID: {entry.user_id}</p>
    //     </div>
    //   ))}
    // </div>
    <>
      <section className={styles.dashboard_dreams_container}>
        <article>
          <h2 className={styles.dashboard_heading}>Your Dream</h2>
          <div className={styles.dream}>
            <h3>Flying over the city</h3>
            <span>25/09/2024</span>
            <p>
              <i></i>
              <span>Exciting</span>
            </p>
          </div>
        </article>
        <article>
          <div className={styles.dream}>
            <h3>The Travel to ancient Egypt</h3>
            <span>25/09/2024</span>
            <p>
              <i></i>
              <span>Peacful</span>
            </p>
          </div>
        </article>
        <article>
          {" "}
          <div className={styles.dream}>
            <h3>The Travel to ancient Egypt</h3>
            <span>25/09/2024</span>
            <p>
              <i></i>
              <span>Delightful</span>
            </p>
          </div>
        </article>
      </section>
      <section>
        <article className={styles.dream_button_container}>
          <button className={styles.dream_button}>+</button>
          <button className={styles.dream_button}>View More</button>
        </article>
      </section>
    </>
  );
};

export default Dashboard;
