import "./globals.css";
import React from "react";
import Navbar from "./components/navbar/navbar";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <React.StrictMode>
        <body>
          <Navbar />
          {children}
        </body>
      </React.StrictMode>
    </html>
  );
}
