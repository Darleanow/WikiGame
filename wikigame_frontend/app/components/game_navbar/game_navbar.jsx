import styles from "./styles.module.css";

export default function GameNavbar({
  currentPageName,
  startPageName,
  goalPageName,
  score
}) {

  return (
    <nav className={styles.navbar_container}>
      <span classname={styles.span_text_game}>
        Current Page: {currentPageName}
      </span>
      <span classname={styles.span_text_game}>Start Page: {startPageName}</span>
      <span classname={styles.span_text_game}>Goal Page: {goalPageName}</span>
      <span classname={styles.span_text_game}>Score: {score}</span>
    </nav>
  );
}
