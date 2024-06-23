"use client";

import styles from "./styles.module.css";
import "./globals.css";

import { useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";
import GameNavbar from "../components/game_navbar/game_navbar";
import "react-toastify/dist/ReactToastify.css";

export default function Game() {
  const [randomArticleContent, setRandomArticleContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const isMounted = useRef(false);

  const fetchArticle = async (url) => {
    setIsLoading(true);
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
    } finally {
      setIsLoading(false);
    }
  };

  const fetchRandomArticle = async () => {
    await fetchArticle("http://localhost:8000/api/get_random_article");
  };

  const handleLinkClick = async (event) => {
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
    }
  };

  useEffect(() => {
    if (!isMounted.current) {
      fetchRandomArticle();
      isMounted.current = true;
    }
  }, []);

  return (
    <>
      <div className={styles.main_content}>
        <GameNavbar />
        <div className={styles.wikipedia_content} onClick={handleLinkClick}>
          <div
            dangerouslySetInnerHTML={{ __html: randomArticleContent }}
            className={styles.article_content}
          />
        </div>
      </div>
    </>
  );
}
