// index.js
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import Routing from "./Routing";
import ScrollToTop from "./constants/scrollTop";
import "./index.css";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <ScrollToTop />
      <Routing />
    </BrowserRouter>
  </React.StrictMode>
);
