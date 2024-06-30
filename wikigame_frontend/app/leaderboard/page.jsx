"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import styles from "./styles.module.css";

const kv_api_url = process.env.NEXT_PUBLIC_KV_REST_API_URL;
const kv_api_token = process.env.NEXT_PUBLIC_KV_REST_API_TOKEN;

const Leaderboard = () => {
  const [scores, setScores] = useState([]);

  useEffect(() => {
    const fetchScores = async () => {
      try {
        const response = await axios.get(`${kv_api_url}/keys/*`, {
          headers: {
            Authorization: `Bearer ${kv_api_token}`,
          },
        });

        const keys = response.data.result;

        const scoresPromises = keys.map(async (key) => {
          const scoreResponse = await axios.get(`${kv_api_url}/get/${key}`, {
            headers: {
              Authorization: `Bearer ${kv_api_token}`,
            },
          });
          return { username: key, score: parseInt(scoreResponse.data.result) };
        });

        const scoresArray = await Promise.all(scoresPromises);
        scoresArray.sort((a, b) => b.score - a.score);
        setScores(scoresArray);
      } catch (error) {
        toast.error("Error fetching scores from leaderboard.");
        console.error("Error fetching scores from leaderboard:", error);
      }
    };

    fetchScores();
  }, []);

  return (
    <div className={styles.leaderboard}>
      <h1>Leaderboard</h1>
      <div className={styles.topThree}>
        {scores.slice(0, 3).map((entry, index) => {
          let entryClass = '';
          if (index === 0) entryClass = styles.firstPlace;
          else if (index === 1) entryClass = styles.secondPlace;
          else if (index === 2) entryClass = styles.thirdPlace;

          return (
            <div key={index} className={`${styles.topEntry} ${entryClass}`}>
              <div className={styles.rank}>{index + 1}</div>
              <div className={styles.playerName}>{entry.username}</div>
              <div className={styles.score}>{entry.score}</div>
            </div>
          );
        })}
      </div>
      <ul className={styles.otherPlayers}>
        {scores.slice(3).map((entry, index) => (
          <li key={index + 3} className={styles.playerEntry}>
            <div className={styles.rank}>{index + 4}</div>
            <div className={styles.playerName}>{entry.username}</div>
            <div className={styles.score}>{entry.score}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Leaderboard;
