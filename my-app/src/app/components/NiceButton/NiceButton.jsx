import styles from "./NiceButton.module.css";

export default function NiceButton({ label, id, name }) {
  return(
    <button
      className={styles.nice_button}
      id={id}
      name={name}
    >
      {label}
    </button>
  )
}