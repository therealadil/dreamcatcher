import styles from "./NiceButton.module.css";

export default function NiceButton({ label, id, name, onClick=null, type="button" }) {
  return(
    <button
      className={styles.nice_button}
      id={id}
      name={name}
      onClick={onClick}
      type={type}
    >
      {label}
    </button>
  )
}