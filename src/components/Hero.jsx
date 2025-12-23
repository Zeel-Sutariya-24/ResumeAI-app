import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartBar } from "@fortawesome/free-regular-svg-icons";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";


const HeroSection = () => {
  return (
    <section className="relative overflow-hidden pb-24 pt-28">

      {/* BACKGROUND GRADIENT */}
      <div
        className="
          absolute inset-0 -z-20
          bg-gradient-to-b from-[#faf7ff] via-[#f4efff] to-white
          dark:bg-gradient-to-b dark:from-[#080d24] dark:via-[#0d1536] dark:to-[#080e26]
          transition-colors duration-500 ease-in-out
        "
      />

      {/* RADIAL GLOWS */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        
        {/* LEFT Glow */}
        <div
          className="
            absolute top-[10%] left-[-20%]
            h-[500px] w-[500px] rounded-full
            bg-purple-300 opacity-40 blur-[200px]
            dark:bg-[#4b2ca2] dark:opacity-50
            transition-all duration-500 ease-in-out
          "
        />

        {/* RIGHT Glow */}
        <div
          className="
            absolute top-[5%] right-[-20%]
            h-[500px] w-[500px] rounded-full
            bg-indigo-300 opacity-40 blur-[200px]
            dark:bg-[#2f3fa8] dark:opacity-50
            transition-all duration-500 ease-in-out
          "
        />

      </div>

      {/* HERO CONTENT */}
      <div className="relative z-10 max-w-6xl mx-auto text-center px-6">

        {/* Badge */}
        <div className="inline-flex items-center gap-2 rounded-full bg-purple-100 px-4 py-1 text-xs font-medium text-[#7C3AED] shadow-sm dark:bg-[#23194D]">
          <span className="text-sm">✨</span>
          <span className="dark:text-[#c4b5fd]">AI-Powered Resume Builder</span>
        </div>

        {/* Heading */}
        <h1 className="mt-8 max-w-3xl mx-auto text-5xl sm:text-6xl md:text-7xl font-extrabold leading-tight">
          <span className="block text-slate-900 dark:text-white">Build Resumes That</span>
          <span className="block bg-gradient-to-r from-[#7C3AED] to-[#4F46E5] bg-clip-text text-transparent">
            Get You Hired
          </span>
        </h1>

        {/* Subtext */}
        <p className="mt-8 max-w-2xl mx-auto text-base sm:text-lg text-slate-600 dark:text-slate-300">
          Create professional, ATS-optimized resumes in minutes with our AI-powered builder.
          Stand out from the crowd and land your dream job.
        </p>

        {/* Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to="/builder"
            className="
              inline-flex items-center justify-center rounded-full 
              bg-gradient-to-r from-[#7C3AED] to-[#4F46E5] 
              px-8 py-3 text-sm font-semibold text-white shadow-lg 
              hover:translate-y-[1px] hover:shadow-md transition
            "
          >
            Start Building Free
            <FontAwesomeIcon icon={faArrowRight} className="ml-2 h-4 w-4" />
          </Link>

          <Link to="/ats-checker"
            className="
              inline-flex items-center justify-center rounded-full border border-slate-200 
              bg-white px-8 py-3 text-sm font-semibold text-slate-800 shadow-sm 
              hover:bg-slate-200 hover:border-[#7C3AED]/40 transition-all duration-300
              dark:bg-black dark:text-white dark:border-slate-700
              dark:hover:border-[#7C3AED]/40 dark:hover:bg-[#0d112b]
            "
          >
            <FontAwesomeIcon icon={faChartBar} className="mr-2 h-5 w-5 text-slate-600 dark:text-slate-300" />
            Check Your Resume
          </Link>
        </div>

      </div>

      {/* STATS */}
      <div className="relative z-10 max-w-5xl mx-auto mt-20 grid grid-cols-1 sm:grid-cols-3 gap-12 text-center">

        <div>
          <h3 className="text-4xl font-bold text-slate-900 dark:text-white">50K+</h3>
          <p className="text-slate-600 dark:text-slate-300 mt-1">Resumes Created</p>
        </div>

        <div>
          <h3 className="text-4xl font-bold text-slate-900 dark:text-white">95%</h3>
          <p className="text-slate-600 dark:text-slate-300 mt-1">ATS Pass Rate</p>
        </div>

        <div>
          <h3 className="text-4xl font-bold text-slate-900 dark:text-white">10K+</h3>
          <p className="text-slate-600 dark:text-slate-300 mt-1">Happy Users</p>
        </div>

      </div>

    </section>
  );
};

export default HeroSection;
