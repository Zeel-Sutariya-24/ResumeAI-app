import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Builder from "./pages/Builder";
import AtsChecker from "./pages/AtsChecker";
import MyResumes from "./pages/MyResumes";
import Templates from "./pages/Templates";


const App = () => {
  // Load saved preference OR system preference
  const getInitialTheme = () => {
    if (localStorage.getItem("theme")) {
      return localStorage.getItem("theme") === "dark";
    }
    // System preference fallback
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  };

  const [darkMode, setDarkMode] = useState(getInitialTheme);

  // Apply the theme to <html> + save preference
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="min-h-screen w-full transition-colors duration-300">

          <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
          <Routes>
            {/* Home Page (Hero + All Landing Sections) */}
            <Route path="/" element={<Home />} />

            {/* Resume Builder Page */}
            <Route path="/builder" element={<Builder />} />

            {/* Resume ATS Checker Page */}
            <Route path="/ats-checker" element={<AtsChecker />} />

            {/* My Resumes Page */}
            <Route path="/my-resumes" element={<MyResumes />} />

            {/* Resume Templates Page */}
            <Route path="/templates" element={<Templates />} />
          </Routes>

          <Footer />

      </div>
    </div>
  );
};

export default App;
