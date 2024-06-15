import styles from "./styles.module.css";

import Link from "next/link";

export default function About() {
  return (
    <div className={styles.about_page}>
      <header className={styles.header}>
        <h1>About WikiGame</h1>
      </header>

      <main className={styles.main_content}>
        <section>
          <h2>What is WikiGame?</h2>
          <p>
            WikiGame is a thrilling online game where players embark on a race
            against time and each other to connect seemingly unrelated Wikipedia
            articles. It's a captivating journey through the vast landscape of
            information, where your knowledge and strategic thinking are put to
            the test.
          </p>
        </section>

        <section>
          <h2>How to Play</h2>
          <ol>
            <li>Begin your quest on a randomly selected Wikipedia page.</li>
            <li>
              {" "}
              Navigate through hyperlinks within each article to move closer to
              the pre-determined target article.
            </li>
            <li>
              The first player to reach the target article claims victory!
            </li>
          </ol>
          <p>
            For a comprehensive set of rules and additional game details, don't
            hesitate to visit our <Link href="/rules">Rules page</Link>.
          </p>
        </section>

        <section>
          <h2>Why Play WikiGame?</h2>
          <ul>
            <li>
              Expand your knowledge: Dive into a myriad of topics and discover
              surprising connections.
            </li>
            <li>
              Sharpen your critical thinking: Choose your path strategically to
              outsmart your opponents.
            </li>
            <li>
              Fuel your curiosity: Uncover fascinating facts and trivia along
              the way.
            </li>
            <li>
              Engage in friendly competition: Challenge friends or players
              worldwide to prove your Wikipedia prowess.
            </li>
          </ul>
        </section>

        <section>
          <h2>Open Source and Community-Driven</h2>
          <p>
            We believe in the power of collaboration and open knowledge.
            WikiGame is an open-source project, and you are more than welcome to
            explore our codebase, contribute enhancements, or even create your
            own game variations. Visit our GitHub repository to get involved:{" "}
            <a
              href="https://github.com/darleanow/wikigame"
              target="_blank"
              rel="noopener noreferrer"
            >
              WikiGame on GitHub
            </a>
            .
          </p>
        </section>

        <footer className={styles.footer}>
          <p>
            &copy; {new Date().getFullYear()} WikiGame. All rights reserved.
          </p>
        </footer>
      </main>
    </div>
  );
}
