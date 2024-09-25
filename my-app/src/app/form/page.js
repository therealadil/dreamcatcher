"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../../lib/supabaseClient';
import styles from './page.module.css';

export default function FormPage() {
  const [textState, setTextState] = useState('')
  const [dateState, setDateState] = useState('')
  const [titleState, setTitleState] = useState('')

  const handleTextChange = (event) => {
    setTextState(event.target.value);
  }

  const handleDateChange = (event) => {
    setDateState(event.target.value);
  }

  const handleTitleChange = (event) => {
    setTitleState(event.target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
  }

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