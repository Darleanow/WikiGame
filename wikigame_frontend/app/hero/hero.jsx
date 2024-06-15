import styles from "./styles.module.css";

export default function Hero() {
  return (
    <div className={styles.hero_container}>
      <h1 className={styles.title}>WikiGame</h1>
      <div className={styles.description}>
        Revamped
      </div>
    </div>
  );
}
