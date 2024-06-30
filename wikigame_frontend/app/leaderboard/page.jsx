"use client"

import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const kv_api_url = process.env.NEXT_PUBLIC_KV_REST_API_URL;
const kv_api_token = process.env.NEXT_PUBLIC_KV_REST_API_TOKEN;

const Leaderboard = () => {
  const [scores, setScores] = useState([]);

  useEffect(() => {
    const fetchScores = async () => {
      try {
        const response = await axios.get(
          `${kv_api_url}/keys/*`,
          {
            headers: {
              Authorization: `Bearer ${kv_api_token}`,
            },
          }
        );

        const keys = response.data.result;

        const scoresPromises = keys.map(async (key) => {
          const scoreResponse = await axios.get(
            `${kv_api_url}/get/${key}`,
            {
              headers: {
                Authorization: `Bearer ${kv_api_token}`,
              },
            }
          );
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
    <div>
      <h1>Leaderboard</h1>
      <ul>
        {scores.map((entry, index) => (
          <li key={index}>
            {index + 1}. {entry.username}: {entry.score}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Leaderboard;
