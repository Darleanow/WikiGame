"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import styles from "./styles.module.css";
import Hero from "./components/hero/hero";
import Input from "./components/input/input";
import Button from "./components/button/button";
import Text from "./components/text/text";

export default function Page() {
  const router = useRouter();
  const [username, setUsername] = useState("");

  const handlePlaySolo = () => {
    console.log(username);
    if (username.trim() === "" || username.trim().length < 3) {
      // Customize the toast here (position, message, etc.)
      toast.error("Please enter a name with at least 3 characters", {});
      return;
    }

    router.push(`/game?username=${encodeURIComponent(username)}`);
  };

  return (
    <>
      <Hero />
      <div className={styles.name_container}>
        <div className={styles.name_input}>
          <Input
            placeholder="Enter your name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
      </div>
      <div className={styles.play_solo_container}>
        <div className={styles.play_solo_box}>
          <div className={styles.play_solo}>
            <Text children={`Play solo`} />
            <Button
              bgColor="rgba(86,79,104,0.47)"
              onClick={handlePlaySolo} // Call handlePlaySolo on click
              children={`Start Game`}
            />
          </div>
          {/* <div className={styles.host}>
            <Text children={`Or host your game`} />
            <Button
              bgColor="rgba(109,79,99,0.47)"
              onClick={() => alert("Button clicked!")}
              children={`Host a game`}
            />
          </div> */}
        </div>
      </div>
      <div className={styles.play_multiplayer_container}>
        <div className={styles.play_multiplayer_box}>
          <Text children={`Want to tryhard a run ?`} />
          <div className={styles.input_and_submit}>
            <Input placeholder="Paste the run seed here" />
            <Button
              bgColor="rgba(86,79,104,0.47)"
              onClick={() => alert("Button clicked!")}
              children={`Let's get it !`}
            />
          </div>
        </div>
        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </div>
    </>
  );
}
