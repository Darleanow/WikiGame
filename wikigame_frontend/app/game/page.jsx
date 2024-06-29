"use client";

import React, { useState, useEffect, useCallback } from "react";
import GameNavbar from "../components/game_navbar/game_navbar";
import FetchArticles from "./fetchArticles";
import GameContent from "./gameContent";
import styles from "./styles.module.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./globals.css";

const Game = () => {
  const [startArticle, setStartArticle] = useState(null);
  const [currentArticle, setCurrentArticle] = useState(null);
  const [goalArticle, setGoalArticle] = useState(null);
  const [randomArticleContent, setRandomArticleContent] = useState("");
  const [score, setScore] = useState(10000); // Initial score of 10000

  useEffect(() => {
    const interval = setInterval(() => {
      setScore((prevScore) => prevScore > 0 ? prevScore - 1 : 0);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const fetchArticle = useCallback(async (url) => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data.error) {
        throw new Error(data.error);
      }
      setRandomArticleContent(data.content);
    } catch (error) {
      console.error("Error fetching article:", error);
      toast.error("Failed to fetch article. Please try again.");
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
        const apiUrl = `http://localhost:8000/api/fetch_article?url=${encodeURIComponent(
          url
        )}`;
        await fetchArticle(apiUrl);
        const articleName = decodeURIComponent(
          url.split("/").pop().replace(/_/g, " ")
        );

        setCurrentArticle({ name: articleName, content: randomArticleContent });
        setScore((prevScore) => Math.max(0, Math.round(prevScore - prevScore * 0.01)));
      }
    },
    [fetchArticle, randomArticleContent]
  );

  return (
    <>
      <div className={styles.main_content}>
        <FetchArticles
          setStartArticle={setStartArticle}
          setCurrentArticle={setCurrentArticle}
          setGoalArticle={setGoalArticle}
          setRandomArticleContent={setRandomArticleContent}
        />
        {startArticle && currentArticle && goalArticle && (
          <GameNavbar
            startPageName={startArticle.name}
            currentPageName={currentArticle.name}
            goalPageName={goalArticle.name}
            score={score}
          />
        )}
        <GameContent
          randomArticleContent={randomArticleContent}
          handleLinkClick={handleLinkClick}
        />
      </div>
    </>
  );
};

export default Game;
