"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../../lib/supabaseClient';
import styles from './page.module.css';

export default function FormPage() {
  const router = useRouter();
  const [textState, setTextState] = useState('')
  const [dateState, setDateState] = useState('')
  const [titleState, setTitleState] = useState('')
  const [userState, setUserState] = useState('')


  // Check if user is logged in, if they're not redirect to sign-in
  useEffect(() => {
    const checkAuth = async () => {
      const {
        data: { user: userData },
        error: userError,
      } = await supabase.auth.getUser();
  
      if (userError || !userData) {
        console.error("Error fetching user data:", userError?.message);
        router.replace("/sign-in"); // Redirect to sign-in if not authenticated
        return;
      }
  
      setUserState(userData); // Set the user state if authenticated
    };
  
    checkAuth();
  }, [router]);
  
  

  const handleTextChange = (event) => {
    setTextState(event.target.value);
  }

  const handleDateChange = (event) => {
    setDateState(event.target.value);
  }

  const handleTitleChange = (event) => {
    setTitleState(event.target.value);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    let thisUser = await fetchUser();
    //console.log(await supabase);

    const { error } = await supabase
    .from('dream_entries')
    .insert({ user_id: thisUser.id, title: titleState, entry: textState, created_at: dateState })
    router.push('/dashboard');
  }

  const fetchUser = async () => {
    try {
      const {
        data: { user: userData },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !userData) {
        console.error("Error fetching user data:", userError?.message);
        return;
      }

      setUserState(userData);
      return(userData);
    } catch (error) {
      console.error("Error fetching user and dream entries:", error.message);
    }
  };

  return(
    <div className={styles.page}>
      <form onSubmit={handleSubmit}>
        <div className={styles.textwrapper}>
          <input
            type="text"
            id="dreamtitle"
            name="dreamtitle"
            placeholder="Enter your dream here"
            className={[
              styles.fullwidth,
              styles.rounded,
              styles.box,
            ].join(' ')}
            onChange = {handleTitleChange}
          />
        </div>
        <div className={styles.textwrapper}>
          <textarea
            id="dreamtext"
            name="dreamtext"
            placeholder="Enter your dream here"
            className={[
              styles.fullwidth,
              styles.rounded,
              styles.box,
            ].join(' ')}
            onChange = {handleTextChange}
          />
        </div>
        <div className={styles.textwrapper}>
          <input
            type="date"
            className={[
              styles.fullwidth,
              styles.rounded,
              styles.box,
            ].join(' ')}
            onChange = {handleDateChange}
          />
        </div>
        <div>
          <button
            id="submitbutton"
            name="submitbutton"
            className={[
              styles.fullwidth,
              styles.rounded,
              styles.button,
            ].join(' ')}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  )
}