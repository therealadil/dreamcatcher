"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../../lib/supabaseClient';
import styles from './page.module.css';

export default function FormPage() {
  const [textState, setTextState] = useState('')

  const handleChange = (event) => {
    setTextState(event.target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
  }

  return(
    <div
      className={styles.page}
    >
      <form onSubmit={handleSubmit}>
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
            onChange = {handleChange}
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