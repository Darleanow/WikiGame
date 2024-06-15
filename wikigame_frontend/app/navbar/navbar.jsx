import styles from "./styles.module.css";

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.navbar_left}>
        <button className={styles.navbar_link}>About</button>
        <button className={styles.navbar_link}>LeaderBoard</button>
        <button className={styles.navbar_link}>Rules</button>
      </div>
      <div className={styles.navbar_right}>
        <button className={styles.navbar_link + styles.button_disabled} disabled>
          Switch theme
        </button>
      </div>
    </nav>
  );
}
