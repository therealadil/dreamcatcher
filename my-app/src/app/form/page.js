"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../../lib/supabaseClient';
import styles from './page.module.css';
import NiceButton from '../components/NiceButton/NiceButton';

export default function FormPage() {
  const router = useRouter();
  const [textState, setTextState] = useState('')
  const [dateState, setDateState] = useState('')
  const [titleState, setTitleState] = useState('')

  let now = new Date();
  now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
  now = now.toISOString().slice(0,16);


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
    };
  
    checkAuth();
  }, [router]);
  
  

  const handleTextChange = (event) => {
    setTextState(event.target.value);
  }

  const handleBackButton = (event) => {
    router.push('/dashboard');
  }

  const handleDateChange = (event) => {
    setDateState(event.target.value);
  }

  const handleTitleChange = (event) => {
    setTitleState(event.target.value);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    let currentUser = await fetchUser();

    const { error } = await supabase
    .from('dream_entries')
    .insert({ user_id: currentUser.id, title: titleState, entry: textState, created_at: dateState })
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
      return(userData);
    } catch (error) {
      console.error("Error fetching user and dream entries:", error.message);
    }
  };

  return(
    <>
    <div className="space stars1"></div>
    <div className="space stars2"></div>
    <div className="space stars3"></div>
    
    <div className={styles.page}>
      <form onSubmit={handleSubmit}>
        <div className={styles.textwrapper}>
          <input
            type="text"
            id="dreamtitle"
            name="dreamtitle"
            placeholder="Enter your dream title here"
            className={[
              styles.fullwidth,
              styles.rounded,
              styles.box,
              styles.margin_y,
            ].join(' ')}
            onChange={handleTitleChange}
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
              styles.margin_y,
            ].join(' ')}
            onChange={handleTextChange}
          />
        </div>
        <div className={styles.textwrapper}>
          <input
            type="datetime-local"
            className={[
              styles.fullwidth,
              styles.rounded,
              styles.box,
              styles.margin_y,
            ].join(' ')}
            onChange={handleDateChange}
            defaultValue={now}
          />
        </div>
        <div className = {styles.button_bar}>
          <div>
            <NiceButton
              id="submitbutton"
              name="submitbutton"
              label="Back"
              onClick={handleBackButton}
            />
            <NiceButton
              id="submitbutton"
              name="submitbutton"
              label="Submit"
              type="submit"
            />
          </div>
        </div>
      </form>
    </div>
    </>
  )
}