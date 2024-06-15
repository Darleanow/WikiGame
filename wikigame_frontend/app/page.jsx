"use client";

import styles from "./styles.module.css";

import Navbar from "./components/navbar/navbar";
import Hero from "./components/hero/hero";

import Input from "./components/input/input";
import Button from "./components/button/button";
import Text from "./components/text/text";

export default function Page() {
  return (
    <>
      <Navbar />
      <Hero />
      <div className={styles.name_container}>
        <div className={styles.name_input}>
          <Input placeholder="Enter your name" />
        </div>
      </div>
      <div className={styles.play_solo_container}>
        <div className={styles.play_solo_box}>
          <Text children={`Play solo`} />
          <Button
            bgColor="rgba(86,79,104,0.47)"
            onClick={() => alert("Button clicked!")}
            children={`Start Game`}
          />
        </div>
      </div>
    </>
  );
}
