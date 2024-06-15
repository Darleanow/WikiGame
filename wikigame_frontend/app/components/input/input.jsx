import styles from "./styles.module.css";

export default function Input({ placeholder, onChange }) {
  return <input type="text" placeholder={placeholder} className={styles.input} />;
}
