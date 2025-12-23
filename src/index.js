import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import { ResumeProvider } from "./context/ResumeContext";
import { JobProvider } from "./context/JobContext";
import App from "./App";
import { Toaster } from "react-hot-toast";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <JobProvider>
        <ResumeProvider>
          <App />
          <Toaster position="bottom-right" />
        </ResumeProvider>
      </JobProvider>
    </BrowserRouter>

  </React.StrictMode>
);
