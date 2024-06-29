import React, { useEffect } from "react";
import confetti from "canvas-confetti";
import styles from "./styles.module.css";

const Popup = ({ score, routes, multiplier }) => {
  useEffect(() => {
    const duration = 15 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min, max) {
      return Math.random() * (max - min) + min;
    }

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);

      // since particles fall down, start a bit higher than random
      confetti(
        Object.assign({}, defaults, {
          particleCount,
          origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        })
      );
      confetti(
        Object.assign({}, defaults, {
          particleCount,
          origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        })
      );
    }, 250);

    return () => clearInterval(interval); // Cleanup on component unmount
  }, []);

  return (
    <div className={styles.popup}>
      <div className={styles.popup_inner}>
        <h2>Congratulations!</h2>
        <p>You've reached the goal article!</p>
        <p>Your final score is: {score * multiplier}</p>
        <h3>Routes Taken:</h3>
        <ul>
          {routes.map((route, index) => (
            <li key={index}>{route}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Popup;
