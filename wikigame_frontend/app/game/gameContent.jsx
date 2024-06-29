import React, { useEffect } from "react";
import styles from "./styles.module.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default React.memo(function GameContent({
  randomArticleContent,
  handleLinkClick,
}) {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if ((event.ctrlKey || event.metaKey) && event.key === "f") {
        event.preventDefault();
        toast.error("Come on man, don't cheat like this...", {});
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <>
      <div className={styles.wikipedia_content} onClick={handleLinkClick}>
        <div
          dangerouslySetInnerHTML={{ __html: randomArticleContent }}
          className={styles.article_content}
        />
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
    </>
  );
});
