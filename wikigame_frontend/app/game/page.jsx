"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import axios from "axios";

import GameNavbar from "../components/game_navbar/game_navbar";
import FetchArticles from "./fetchArticles";
import GameContent from "./gameContent";
import styles from "./styles.module.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Popup from "../components/Popup/popup";

const api_url = process.env.NEXT_PUBLIC_API_URL;
const kv_api_url = process.env.NEXT_PUBLIC_KV_REST_API_URL;
const kv_api_token = process.env.NEXT_PUBLIC_KV_REST_API_TOKEN;

const Game = () => {
  const [startArticle, setStartArticle] = useState(null);
  const [currentArticle, setCurrentArticle] = useState(null);
  const [goalArticle, setGoalArticle] = useState(null);
  const [randomArticleContent, setRandomArticleContent] = useState("");
  const [goalReached, setGoalReached] = useState(false);
  const [routes, setRoutes] = useState([]);
  const [loading, setLoading] = useState(true);
  const scoreRef = useRef(10000);
  const [, setScoreTrigger] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!goalReached) {
        scoreRef.current = Math.max(0, scoreRef.current - 1);
        setScoreTrigger(scoreRef.current);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [goalReached]);

  const fetchArticle = useCallback(async (url) => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data.error) {
        throw new Error(data.error);
      }
      setRandomArticleContent(data.content);
    } catch (error) {
      toast.error("You're not supposed to click on this link");
    }
  }, []);

  const handleLinkClick = useCallback(
    async (event) => {
      const target = event.target;
      if (
        target.tagName === "A" ||
        (target.tagName === "IMG" && target.parentElement.tagName === "A")
      ) {
        event.preventDefault();
        const url =
          target.tagName === "A" ? target.href : target.parentElement.href;
        const apiUrl = `https://${api_url}/api/fetch_article?url=${encodeURIComponent(
          url
        )}`;
        await fetchArticle(apiUrl);
        const articleName = decodeURIComponent(
          url.split("/").pop().replace(/_/g, " ")
        );

        setCurrentArticle({ name: articleName, content: randomArticleContent });
        setRoutes((prevRoutes) => [...prevRoutes, articleName]);

        if (articleName === goalArticle.name) {
          setGoalReached(true);
          toast.success("Congratulations! You've reached the goal article!");
          addScoreToLeaderboard(scoreRef.current); // Add score to leaderboard
        } else {
          scoreRef.current = Math.max(
            0,
            Math.round(scoreRef.current - scoreRef.current * 0.01)
          );
          setScoreTrigger(scoreRef.current);
        }
      }
    },
    [fetchArticle, randomArticleContent, goalArticle]
  );

  const addScoreToLeaderboard = async (score) => {
    const urlParams = new URLSearchParams(window.location.search);
    const username = urlParams.get("username");

    try {
      // Check if the key/value exists
      const getResponse = await axios.get(
        `${kv_api_url}/get/${username}`,
        {
          headers: {
            Authorization: `Bearer ${kv_api_token}`,
          },
        }
      );

      const currentScore = getResponse.data.result;
      const newScore = score * getMultiplier();
      // Set the score only if the new score is better
      if (!currentScore || newScore > parseInt(currentScore)) {
        await axios.get(
          `${kv_api_url}/set/${username}/${newScore}`,
          {
            headers: {
              Authorization: `Bearer ${kv_api_token}`,
            },
          }
        );
        toast.success("Score updated on leaderboard!");
      } else {
        toast.info("Your score was not high enough to update the leaderboard.");
      }
    } catch (error) {
      console.error("Error adding score to leaderboard:", error);
    }
  };

  const getMultiplier = () => {
    return Math.max(1, 10 - routes.length);
  };

  return (
    <>
      <div className={styles.main_content}>
        {loading && <span className={styles.loader}></span>}
        <FetchArticles
          setStartArticle={(article) => {
            setStartArticle(article);
            setLoading(false); // Stop loading when articles are fetched
          }}
          setCurrentArticle={setCurrentArticle}
          setGoalArticle={setGoalArticle}
          setRandomArticleContent={setRandomArticleContent}
        />
        {!loading && startArticle && currentArticle && goalArticle && (
          <>
            <GameNavbar
              startPageName={startArticle.name}
              currentPageName={currentArticle.name}
              goalPageName={goalArticle.name}
              score={scoreRef.current}
            />
            <GameContent
              randomArticleContent={randomArticleContent}
              handleLinkClick={handleLinkClick}
            />
            {goalReached && (
              <Popup
                score={scoreRef.current}
                routes={routes}
                multiplier={getMultiplier()}
              />
            )}
          </>
        )}
      </div>
    </>
  );
};

export default Game;
