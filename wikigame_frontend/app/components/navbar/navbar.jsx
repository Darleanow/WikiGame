import styles from "./styles.module.css";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.navbar_left}>
        <Link href="/" className={styles.navbar_link}>
          Home
        </Link>
        <Link href="/about" className={styles.navbar_link}>
          About
        </Link>
        <Link href="/leaderboard" className={styles.navbar_link}>
          LeaderBoard
        </Link>
        <Link href="/rules" className={styles.navbar_link}>
          Rules
        </Link>
      </div>
    </nav>
  );
}
