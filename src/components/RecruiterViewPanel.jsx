import React from "react";
import Loader from "./Loader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserTie } from "@fortawesome/free-solid-svg-icons";

/* -------------------------
   Confidence Score Helper
------------------------- */
const calculateConfidenceScore = (data) => {
  let score = 70;

  if (!data) return 0;

  if (data.skimmability?.toLowerCase().includes("excellent")) score += 10;
  if (data.skimmability?.toLowerCase().includes("poor")) score -= 10;

  if (data.atsReadiness?.toLowerCase().includes("strong")) score += 10;
  if (data.atsReadiness?.toLowerCase().includes("weak")) score -= 10;

  if (Array.isArray(data.topIssues)) {
    score -= data.topIssues.length * 5;
  }

  return Math.max(0, Math.min(100, score));
};

const RecruiterViewPanel = ({ data, loading, onMoreIssues  }) => {
  if (loading) {
    return (
      <div className="flex justify-center py-14">
        <Loader />
      </div>
    );
  }

  if (!data) {
    return (
      <div className="max-w-5xl mx-auto p-6 text-sm text-slate-500 dark:text-slate-400">
        Recruiter view unavailable.
      </div>
    );
  }

  const confidenceScore = calculateConfidenceScore(data);

  const toTitleCase = (str) =>
    typeof str === "string"
      ? str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
      : str;

  return (
    <div className="max-w-5xl mx-auto rounded-2xl p-8 bg-white dark:bg-[#0f1629] border border-slate-200 dark:border-slate-800">

      {/* HEADER */}
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
          <FontAwesomeIcon icon={faUserTie} className="mr-2" />
          Recruiter View
        </h2>

        <span
          className={`
            px-4 py-1.5 rounded-full text-sm font-semibold border
            ${
              confidenceScore >= 80
                ? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border-emerald-400/30"
                : confidenceScore >= 60
                ? "bg-amber-500/15 text-amber-700 dark:text-amber-300 border-amber-400/30"
                : "bg-rose-500/15 text-rose-700 dark:text-rose-300 border-rose-400/30"
            }
          `}
        >
          Confidence: {confidenceScore}%
        </span>
      </div>

      {/* CONFIDENCE BAR */}
      <div className="mb-8">
        <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
          <div
            className={`
              h-full transition-all duration-700
              ${
                confidenceScore < 60
                  ? "bg-gradient-to-r from-rose-600 to-orange-500"
                  : confidenceScore < 80
                  ? "bg-gradient-to-r from-rose-500 to-amber-400"
                  : "bg-gradient-to-r from-rose-500 via-amber-400 to-emerald-500"
              }
            `}
            style={{ width: `${confidenceScore}%` }}
          />
        </div>
      </div>

      {/* SIGNAL CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[
          ["Skimmability", data.skimmability],
          ["Keyword Density", data.keywordDensity],
          ["ATS Readiness", data.atsReadiness],
          ["6-Second Impression", data.sixSecondImpression]
        ].map(([label, value], i) => (
          <div key={i} className="rounded-xl p-4 bg-slate-50 dark:bg-[#0b1220] border border-slate-200 dark:border-slate-700">
            <p className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400 mb-1">
              {label}
            </p>
            <p className="text-sm font-medium text-slate-900 dark:text-slate-100">
              {value ? toTitleCase(value) : "—"}
            </p>
          </div>
        ))}
      </div>

      {/* TOP ISSUES */}
      {Array.isArray(data.topIssues) && data.topIssues.length > 0 && (
        <div className="mt-8">
          <p className="font-semibold mb-3 text-slate-900 dark:text-white">
            🚨 Top Recruiter Issues
          </p>
          <ul className="space-y-2">
            {data.topIssues.map((issue, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-300">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-rose-500/70" />
                {issue}
              </li>
            ))}
          </ul>
          {typeof onMoreIssues === "function" && (
          <button
            onClick={onMoreIssues}
            className="
              text-xs font-medium
              text-purple-600 dark:text-purple-400
              hover:underline
              transition
            "
          >
            More →
          </button>
        )}
        </div>
      )}
    </div>
  );
};

export default RecruiterViewPanel;
