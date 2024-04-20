import React from "react";
import "./preloader.css";

export default function Preloader() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="container">
        <div className="spinner">
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
  );
}
