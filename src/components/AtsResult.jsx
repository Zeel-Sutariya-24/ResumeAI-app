import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import ScoreCircle from "./ScoreCircle";
import { highlightKeywords } from "../utils/highlightText";
import { useResume } from "../context/ResumeContext";

const AtsResult = ({ result }) => {
  const { setAtsResult } = useResume();

  if (!result) return null;

  const matched = result.matchedSkills || [];
  const missing = result.missingKeywords || [];

  const rawScore = result.score || 0;
  const normalizedScore = rawScore <= 1 ? rawScore * 100 : rawScore;

  const resumeHighlighted = highlightKeywords(
    result.resumeText || "",
    matched,
    missing
  );

  const jdHighlighted = highlightKeywords(
    result.jobDescription || "",
    matched,
    missing
  );

  const totalSkills = matched.length + missing.length;
  const matchedPercent = totalSkills > 0 ? (matched.length / totalSkills) * 100 : 0;
  const missingPercent = totalSkills > 0 ? (missing.length / totalSkills) * 100 : 0;

  /* ============================
     HR Verdict Styling
  ============================ */
  const verdictText = result.HrFinalVerdict || "No final verdict provided.";
  const verdictLower = verdictText.toLowerCase();
  let verdictType = "neutral";

  if (verdictLower.startsWith("decision: shortlist")) verdictType = "shortlist";
  else if (verdictLower.startsWith("decision: reject")) verdictType = "reject";

  let verdictAccent =
    "from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-800 border-slate-300 dark:border-slate-600";
  let verdictBadgeBg =
    "bg-slate-300 text-slate-800 dark:bg-slate-700 dark:text-slate-100";
  let verdictBadgeText = "HR Verdict";
  let verdictIconBg = "bg-slate-300 dark:bg-slate-800";
  let verdictIconDot = "bg-slate-500 dark:bg-slate-400";

  if (verdictType === "shortlist") {
    verdictAccent =
      "from-emerald-200 to-emerald-300 dark:from-emerald-700/80 dark:to-emerald-900/80 border-emerald-400 dark:border-emerald-500/70";
    verdictBadgeBg =
      "bg-emerald-300 text-emerald-900 dark:bg-emerald-500/90 dark:text-emerald-50";
    verdictBadgeText = "SHORTLIST (Strict HR)";
    verdictIconBg = "bg-emerald-300 dark:bg-emerald-600/80";
    verdictIconDot = "bg-emerald-700 dark:bg-emerald-300";
  }

  if (verdictType === "reject") {
    verdictAccent =
      "from-rose-200 to-rose-300 dark:from-rose-800/90 dark:to-rose-950/90 border-rose-400 dark:border-rose-500/70";
    verdictBadgeBg =
      "bg-rose-500 text-rose-100 dark:bg-rose-500/90 dark:text-rose-50";
    verdictBadgeText = "REJECT (Strict HR)";
    verdictIconBg = "bg-rose-300 dark:bg-rose-700/90";
    verdictIconDot = "bg-rose-700 dark:bg-rose-300";
  }

  return (
    <div
      className="
        relative max-w-5xl mx-auto mt-10
        bg-white dark:bg-[#0f1629]
        p-10 rounded-xl shadow-lg
        border border-slate-300 dark:border-slate-800
      "
    >
      {/* CLOSE BUTTON */}
      <button
        onClick={() => setAtsResult(null)}
        className="
          absolute top-4 right-4
          w-9 h-9 rounded-full
          flex items-center justify-center
          bg-slate-100 hover:bg-slate-200
          dark:bg-slate-700 dark:hover:bg-slate-600
          text-slate-600 dark:text-slate-200
          transition
        "
        aria-label="Close ATS report"
      >
        <FontAwesomeIcon icon={faTimes} />
      </button>

      {/* ATS REPORT TITLE */}
      <div className="text-center mb-10">
        <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">
          ATS Report
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
          Applicant Tracking System compatibility analysis
        </p>
      </div>

      {/* SCORE CIRCLE */}
      <div className="flex justify-center mb-12">
        <ScoreCircle score={normalizedScore} />
      </div>

      {/* MATCHED + MISSING SKILLS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-10">
        <div>
          <h3 className="text-2xl font-semibold text-green-700 dark:text-green-400 mb-3">
            Matched Skills ({matched.length})
          </h3>
          <ul className="list-disc ml-6 text-slate-700 dark:text-slate-300 space-y-1">
            {matched.map((skill, index) => (
              <li key={index}>{skill}</li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-2xl font-semibold text-red-700 dark:text-red-400 mb-3">
            Missing Keywords ({missing.length})
          </h3>
          <ul className="list-disc ml-6 text-red-600 dark:text-red-300 space-y-1">
            {missing.map((skill, index) => (
              <li key={index}>{skill}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* SKILL BARS */}
      <h3 className="text-2xl font-semibold mt-10 mb-4 text-slate-900 dark:text-white">
        Skill Match Breakdown
      </h3>

      <div className="space-y-6">
        <div>
          <p className="text-sm font-medium text-green-700 dark:text-green-500 mb-1">
            Matched Skills ({matched.length})
          </p>
          <div className="w-full bg-gray-200 dark:bg-gray-700 h-4 rounded-full">
            <div
              className="bg-green-500 h-4 rounded-full transition-all duration-700"
              style={{ width: `${matchedPercent}%` }}
            />
          </div>
        </div>

        <div>
          <p className="text-sm font-medium text-red-700 dark:text-red-500 mb-1">
            Missing Skills ({missing.length})
          </p>
          <div className="w-full bg-gray-200 dark:bg-gray-700 h-4 rounded-full">
            <div
              className="bg-red-500 h-4 rounded-full transition-all duration-700"
              style={{ width: `${missingPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* RECOMMENDATIONS */}
      <h3 className="text-2xl font-semibold mt-10 mb-3 text-slate-900 dark:text-white">
        Recommendations
      </h3>

      <div className="space-y-4 mt-4">
        {Array.isArray(result.recommendations)
          ? result.recommendations.map((para, idx) => (
              <p
                key={idx}
                className="text-slate-700 dark:text-gray-300 leading-relaxed"
              >
                {para}
              </p>
            ))
          : <p className="text-slate-700 dark:text-slate-300">{result.recommendations}</p>}
      </div>

      {/* HR VERDICT */}
      <div className="mt-10">
        <div
          className={`
            relative rounded-2xl border px-6 py-5 overflow-hidden
            bg-gradient-to-br ${verdictAccent}
            shadow-[0_0_40px_rgba(0,0,0,0.15)] dark:shadow-[0_0_40px_rgba(0,0,0,0.45)]
          `}
        >
          <div className="pointer-events-none absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top,_#ffffff55,_transparent_50%)]" />

          <div className="relative flex items-center justify-between gap-3 mb-3">
            <div className="flex items-center gap-3">
              <div className={`w-11 h-11 rounded-full flex items-center justify-center ${verdictIconBg}`}>
                <div className={`w-2 h-2 rounded-full ${verdictIconDot}`} />
              </div>
              <div>
                <p className="text-sm uppercase tracking-[0.18em] text-slate-700 dark:text-slate-300/80">
                  Strict HR Evaluation
                </p>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-50">
                  Final Hiring Verdict
                </h3>
              </div>
            </div>

            <span className={`text-xs font-semibold px-3 py-1 rounded-full ${verdictBadgeBg}`}>
              {verdictBadgeText}
            </span>
          </div>

          <div className="border-t border-slate-400 dark:border-slate-600 my-3" />

          <p className="relative text-sm leading-relaxed text-slate-900 dark:text-slate-100">
            {verdictText}
          </p>
        </div>
      </div>

      {/* RESUME HIGHLIGHTS */}
      <h3 className="text-2xl font-semibold mt-10 mb-3 text-slate-900 dark:text-white">
        Resume Keyword Highlights
      </h3>
      <div
        className="
          p-4 rounded-lg border border-slate-300 dark:border-slate-700
          bg-white dark:bg-[#0f1629]
          text-slate-700 dark:text-gray-300
          leading-relaxed min-h-[120px]
        "
        dangerouslySetInnerHTML={{ __html: resumeHighlighted }}
      />

      {/* JD HIGHLIGHTS */}
      <h3 className="text-2xl font-semibold mt-10 mb-3 text-slate-900 dark:text-white">
        Job Description Highlights
      </h3>
      <div
        className="
          p-4 rounded-lg border border-slate-300 dark:border-slate-700
          bg-white dark:bg-[#0f1629]
          text-slate-700 dark:text-gray-300
          leading-relaxed min-h-[120px] mt-6
        "
        dangerouslySetInnerHTML={{ __html: jdHighlighted }}
      />
    </div>
  );
};

export default AtsResult;
