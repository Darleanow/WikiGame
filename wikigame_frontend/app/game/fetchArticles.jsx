import React, { useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";

const api_url = process.env.NEXT_PUBLIC_API_URL;

const FetchArticles = ({
  setStartArticle,
  setCurrentArticle,
  setGoalArticle,
  setRandomArticleContent,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const isMounted = useRef(false);

  const fetchArticles = async () => {
    setIsLoading(true);
    console.log("Using this url to fetch articles: ", api_url);
    try {
      const response = await fetch(`https://${api_url}/api/get_random_articles`);
      const data = await response.json();
      if (data.error) {
        throw new Error(data.error);
      }
      // Extract and set start article
      const startArticle = {
        ...data.start,
        name: findTitleFromContent(data.start.content),
      };
      setStartArticle(startArticle);

      // Set current article (initially same as start)
      setCurrentArticle({
        ...startArticle,
      });

      // Extract and set goal article
      const goalArticle = {
        ...data.goal,
        name: findTitleFromContent(data.goal.content),
      };
      setGoalArticle(goalArticle);

      // Set random article content
      setRandomArticleContent(data.start.content);
    } catch (error) {
      console.error("Error fetching articles:", error);
      toast.error("Failed to fetch articles. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const findTitleFromContent = (htmlContent) => {
    try {
      const parser = new DOMParser();
      const doc = parser.parseFromString(htmlContent, "text/html");
      const titleElement = doc.querySelector("h1");
      if (titleElement) {
        return titleElement.textContent.trim();
      } else {
        throw new Error("Title element not found in the article content.");
      }
    } catch (error) {
      console.error("Error finding title:", error);
      return "Untitled"; // Default title if extraction fails
    }
  };

  useEffect(() => {
    if (!isMounted.current) {
      fetchArticles();
      isMounted.current = true;
    }
  }, []);

  return null;
};

export default FetchArticles;
