import React from "react";
import { useNavigate } from "react-router-dom";
import { useResume } from "../context/ResumeContext";

import OneColumnPreview from "../templates/OneColumnPreview";
import TwoColumnPreview from "../templates/TwoColumnPreview";

const Templates = () => {
  const navigate = useNavigate();
  const { activeTemplate, setActiveTemplate } = useResume();

  const selectTemplate = (id) => {
    setActiveTemplate(id); // ✅ must match resumeTemplates key
    navigate("/builder");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-[#0a0f2b] dark:via-[#0b1025] dark:to-[#0a0f1e] pt-28 px-6">
      <div className="max-w-6xl mx-auto pb-32">

        {/* HEADER */}
        <div className="mb-12 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            Resume Templates
          </h1>
          <p className="mt-2 text-slate-600 dark:text-slate-300 max-w-xl mx-auto">
            Choose a professionally designed, ATS-optimized resume template.
            You can switch templates anytime without losing your content.
          </p>
        </div>

        {/* TEMPLATE GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          {/* ONE COLUMN TEMPLATE */}
          <div
            onClick={() => selectTemplate("oneColumn")}
            className={`
              relative
              cursor-pointer rounded-2xl p-5 transition-all duration-300
              bg-white/60 dark:bg-[#0f1b33]/60 backdrop-blur-xl
              border shadow-lg
              ${
                activeTemplate === "oneColumn"
                  ? "border-purple-500 ring-2 ring-purple-500/40 scale-[1.02]"
                  : "border-slate-500 dark:border-slate-700 hover:scale-[1.01]"
              }
            `}
          >
            
            <div className="rounded-lg overflow-hidden border border-slate-500 dark:border-slate-700 bg-white dark:bg-[#0a0f1e] mb-4">
              <OneColumnPreview isMini />
            </div>

            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                  Classic One Column
                  
                <span
                  className="
                    text-[10px] font-semibold
                    px-2 py-[2px] rounded-full ml-3
                    bg-emerald-100 text-emerald-700
                    dark:bg-emerald-900/40 dark:text-emerald-300
                    leading-none
                  "
                >
                  Recommended
                </span>
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-300">
                  ATS-friendly • Clean • Recruiter-preferred
                </p>
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                  Best for: Entry–Mid level, Support, Software, ATS-first roles
                </p>

                <ul className="mt-3 space-y-1 text-xs text-slate-600 dark:text-slate-300">
                  <li>✓ ATS-safe formatting</li>
                  <li>✓ Recruiter-preferred layout</li>
                  <li>✓ Works perfectly for multi-page resumes</li>
                </ul>

              </div>

              {activeTemplate === "oneColumn" && (
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300">
                  Selected
                </span>
              )}
              
            </div>

            <button
              className={`
                mt-4 w-full rounded-lg py-2 text-sm font-semibold transition
                ${
                  activeTemplate === "oneColumn"
                    ? "bg-purple-600 text-white"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700"
                }
              `}
            >
              {activeTemplate === "oneColumn"
                ? "Using This Template"
                : "Use This Template"}
            </button>
          </div>

          {/* TWO COLUMN TEMPLATE */}
          <div
            onClick={() => selectTemplate("twoColumn")}
            className={`
              cursor-pointer rounded-2xl p-5 transition-all duration-300
              bg-white/60 dark:bg-[#0f1b33]/60 backdrop-blur-xl
              border shadow-lg
              ${
                activeTemplate === "twoColumn"
                  ? "border-purple-500 ring-2 ring-purple-500/40 scale-[1.02]"
                  : "border-slate-500 dark:border-slate-700 hover:scale-[1.01]"
              }
            `}
          >
            <div className="rounded-lg overflow-hidden border border-slate-500 dark:border-slate-700 bg-white dark:bg-[#0a0f1e] mb-4">
              <TwoColumnPreview isMini />
            </div>

            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                  Classic Two Column
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-300">
                  Modern • Skills-focused • Space-efficient
                </p>
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                  Best for: Technical, Skills-heavy, Senior profiles
                </p>
                <ul className="mt-3 space-y-1 text-xs text-slate-600 dark:text-slate-300">
                  <li>✓ Skills-forward layout</li>
                  <li>✓ Space-efficient design</li>
                  <li>✓ Still ATS-compatible</li>
                </ul>

              </div>

              {activeTemplate === "twoColumn" && (
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300">
                  Selected
                </span>
              )}
            </div>

            <button
              className={`
                mt-4 w-full rounded-lg py-2 text-sm font-semibold transition
                ${
                  activeTemplate === "twoColumn"
                    ? "bg-purple-600 text-white"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700"
                }
              `}
            >
              {activeTemplate === "twoColumn"
                ? "Using This Template"
                : "Use This Template"}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Templates;
