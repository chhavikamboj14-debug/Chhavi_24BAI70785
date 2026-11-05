import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import { PostProvider } from "./context/PostContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <PostProvider>
        <App />
      </PostProvider>
    </BrowserRouter>
  </React.StrictMode>
);