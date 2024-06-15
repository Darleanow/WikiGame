import styles from "./styles.module.css";

export default function Rules() {
  return (
    <div className={styles.about_page}>
      <header className={styles.header}>
        <h1>WikiGame Rules</h1>
      </header>

      <main className={styles.main_content}>
        <section>
          <h2>Game Objective</h2>
          <p>
            The primary objective of WikiGame is to navigate from a randomly
            assigned starting Wikipedia article to a predetermined target
            article within the shortest possible time. Players achieve this by
            strategically clicking on hyperlinks within the articles.
          </p>
        </section>

        <section>
          <h2>Gameplay</h2>
          <ol>
            <li>
              Start: Each player begins on a unique, randomly selected Wikipedia
              article.
            </li>
            <li>
              Navigation: Players can only click on hyperlinks that lead to
              other Wikipedia articles. External links, citations, and other
              non-article links are not permitted.
            </li>
            <li>
              Target Article: The first player to reach the designated target
              article wins the game.
            </li>
          </ol>
        </section>

        <section>
          <h2>Restrictions</h2>
          <ul>
            <li>
              No Search: Using the Wikipedia search bar or any other external
              search engine is strictly prohibited.
            </li>
            <li>
              No Back Button: Players cannot use the browser's back button to
              retrace their steps. Each click should be a deliberate move
              towards the target.
            </li>
            <li>
              No External Aids: The use of tools, scripts, or any other external
              aids that automate or assist in the navigation process is
              disallowed.
            </li>
          </ul>
        </section>

        <section>
          <h2>Scoring and Timing</h2>
          <p>
            The winner is determined by the player who reaches the target
            article first. In the event of a tie, the player with the fewer
            clicks wins. If both the time and clicks are the same, it's a draw! <br/>
            Notes: This will change, the new score system to be implemented will calculate based on shortest found route.
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
