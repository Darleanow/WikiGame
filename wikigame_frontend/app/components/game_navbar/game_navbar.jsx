import styles from "./styles.module.css";

export default function GameNavbar({
  currentPageName,
  startPageName,
  goalPageName,
  score
}) {

  return (
    <nav className={styles.navbar_container}>
      <span>
        Current Page: {currentPageName}
      </span>
      <span>Start Page: {startPageName}</span>
      <span>Goal Page: {goalPageName}</span>
      <span>Score: {score}</span>
    </nav>
  );
}
