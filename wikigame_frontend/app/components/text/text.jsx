"use client";

import styles from "./styles.module.css";

export default function Text({ children }) {
  return <p className={styles.text}>{children}</p>;
}
