import React from "react";
import { Link, NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileContract } from "@fortawesome/free-solid-svg-icons";
import { faMoon, faSun } from "@fortawesome/free-regular-svg-icons";

// import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
const Navbar = ({ darkMode, setDarkMode }) => {

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white/40 backdrop-blur-xl border-b border-white/60 dark:bg-[#0a0f2b]/60 dark:border-[#1a223d]/60">
  <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
    {/* Logo */}

    <Link to="/" className="flex items-center gap-2">
      <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-gradient-to-tr from-[#7C3AED] to-[#4F46E5] text-white text-lg shadow-md">
        <FontAwesomeIcon icon={faFileContract} className="ml-2 h-5 w-5 mr-2" />
      </div>
      <span className="text-lg font-semibold tracking-tight dark:text-white">ResumeAI</span>
    </Link>

    {/* Links */}
    <div className="hidden md:flex items-center gap-8 text-sm font-medium">
      <NavLink
        to="/builder"
        className={({ isActive }) =>
          `transition ${
            isActive
              ? "text-purple-600 dark:text-purple-300 font-semibold"
              : "text-slate-600 dark:text-slate-300 hover:text-purple-600 dark:hover:text-purple-300"
          }`
        }
      >
        Builder
      </NavLink>

      <NavLink
        to="/ats-checker"
        className={({ isActive }) =>
          `transition ${
            isActive
              ? "text-purple-600 dark:text-purple-300 font-semibold"
              : "text-slate-600 dark:text-slate-300 hover:text-purple-600 dark:hover:text-purple-300"
          }`
        }
      >
        ATS Checker
      </NavLink>

      <NavLink
        to="/my-resumes"
        className={({ isActive }) =>
          `transition ${
            isActive
              ? "text-purple-600 dark:text-purple-300 font-semibold"
              : "text-slate-600 dark:text-slate-300 hover:text-purple-600 dark:hover:text-purple-300"
          }`
        }
      >
        My Resumes
      </NavLink>

      <NavLink
        to="/templates"
        className={({ isActive }) =>
          `transition ${
            isActive
              ? "text-purple-600 dark:text-purple-300 font-semibold"
              : "text-slate-600 dark:text-slate-300 hover:text-purple-600 dark:hover:text-purple-300"
          }`
        }
      >
        Templates
      </NavLink>

    </div>

    

    {/* Right side */}
    <div className="flex items-center gap-4">
      <button
        type="button"
        onClick={() => setDarkMode(!darkMode)}
        className="
            hidden sm:flex h-9 w-9 items-center justify-center rounded-full
            border border-slate-300
            bg-white/80 text-slate-600 shadow-sm hover:bg-white
            dark:bg-slate-800/70 dark:text-slate-300 dark:border-slate-700 dark:hover:bg-slate-800
        "
        >
            <FontAwesomeIcon
                icon={darkMode ? faSun : faMoon}
                className="h-4 w-4 transition-all duration-300"
            />
        
        </button>


      <Link
        to="/templates"
        type="button"
        className="rounded-full bg-gradient-to-r from-[#7C3AED] to-[#4F46E5] px-5 py-2 text-sm font-semibold text-white shadow-md hover:opacity-95"
      >
        Get Started
      </Link>
    </div>
  </nav>
</header>

  );
};

export default Navbar;
