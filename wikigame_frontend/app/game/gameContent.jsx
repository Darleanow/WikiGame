import React, { useEffect } from "react";
import styles from "./styles.module.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./globals.scss";

const GameContent = React.memo(({ randomArticleContent, handleLinkClick }) => {
  return (
    <>
      <div className={styles.wikipedia_content} onClick={handleLinkClick}>
        <div
          dangerouslySetInnerHTML={{ __html: randomArticleContent }}
          // This is a disgusting trick to apply unpure selectors to only one component class
          className="article_content"
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

export default GameContent;
