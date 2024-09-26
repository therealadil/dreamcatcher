/**
 * The FormPage component is the main entry point for the form functionality in the application.
 * It handles user authentication, form state management, and the submission of new dream entries to the Supabase database.
 *
 * The component checks if the user is logged in, and redirects them to the sign-in page if they are not. It then manages the state of the form fields (text, date, and title) and handles the form submission process, which includes fetching the current user's data and inserting a new dream entry into the Supabase database.
 *
 * The component also includes some basic styling and layout using CSS modules.
 */
"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabaseClient";
import styles from "./page.module.css";
import NiceButton from "../components/NiceButton/NiceButton";

export default function FormPage() {
  const router = useRouter();
  const [textState, setTextState] = useState("");
  const [dateState, setDateState] = useState("");
  const [titleState, setTitleState] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const [dreamId, setDreamId] = useState(null);
  const [isValid, setIsValid] = useState(false);

  let now = new Date();
  now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
  now = now.toISOString().slice(0,16);
  //Gets current time in ISO format (YYYY-MM-DDTHH:mm) and slices off the seconds

  // Check if user is logged in, if they're not redirect to sign-in
  useEffect(() => {
    setDateState(now);
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
      const searchParams = new URLSearchParams(window.location.search);
      const id = searchParams.get("id");
      if (id) {
        setIsUpdating(true);
        setDreamId(id);
        const { data, error } = await supabase
          .from("dream_entries")
          .select("*")
          .eq("id", id)
          .single();
        if (data) {
          setTitleState(data.title);
          setTextState(data.entry);
          setDateState(data.created_at.toString().substring(0,16));
          setIsValid(true);
        }
      }
    };

    checkAuth();
  }, [router]);

  const handleTextChange = (event) => {
    setTextState(event.target.value);
    setIsValid((dateState.length > 0) && (event.target.value.length > 0) && (titleState.length > 0));
    console.log(isValid);
  };

  const handleBackButton = (event) => {
    router.push("/dashboard");
  };

  const handleDateChange = (event) => {
    setDateState(event.target.value);
    setIsValid((event.target.value.length > 0) && (textState.length > 0) && (titleState.length > 0));
  };

  const handleTitleChange = (event) => {
    setTitleState(event.target.value);
    setIsValid((dateState.length > 0) && (textState.length > 0) && (event.target.value.length > 0));
    console.log(isValid);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (isValid) {

      let currentUser = await fetchUser();
      const dreamData = {
        user_id: currentUser.id,
        title: titleState,
        entry: textState,
        created_at: dateState,
      };

      const { error } = isUpdating
        ? await supabase.from("dream_entries").update(dreamData).eq("id", dreamId)
        : await supabase.from("dream_entries").insert(dreamData);

      if (error) {
        console.error("Error saving dream:", error);
      } else {
        router.push("/dashboard");
      }
    }
  };

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
      return userData;
    } catch (error) {
      console.error("Error fetching user and dream entries:", error.message);
    }
  };

  return (
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
              className={styles.input_dream}
              onChange={handleTitleChange}
              defaultValue={titleState}
            />
          </div>
          <div className={styles.textwrapper}>
            <textarea
              id="dreamtext"
              name="dreamtext"
              placeholder="Enter your dream here"
              rows="6"
              className={styles.textarea_dream}
              onChange={handleTextChange}
              defaultValue={textState}
            />
          </div>
          <div className={styles.textwrapper}>
            <input
              type="datetime-local"
              className={styles.input_dream}
              onChange={handleDateChange}
              defaultValue={dateState}
            />
          </div>
          <div className={styles.button_bar}>
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
                label={isUpdating ? "Update" : "Submit"}
                type={"submit"}
              />
            </div>
          </div>
          <div className = {styles.error_div}>
            <label>{isValid ? "" : "All fields must be completed"}</label>
          </div>
        </form>
      </div>
    </>
  );
}
