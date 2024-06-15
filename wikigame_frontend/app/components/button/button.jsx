"use client";

import styles from "./styles.module.css";

export default function Button({ children, onClick, bgColor }) {
  return (
    <button
      onClick={onClick}
      className={styles.button}
      style={{ backgroundColor: bgColor }}
    >
      {children}
    </button>
  );
}
