// src/index.js
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css"; // Your Tailwind CSS or global styles
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <Provider store={store}>
      {/* Wrap your App component with Redux Provider */}
      <BrowserRouter>
        <App />
        <Toaster />
      </BrowserRouter>
    </Provider>
  </>
);
