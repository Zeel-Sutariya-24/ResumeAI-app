import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTriangleExclamation, faRotateRight } from "@fortawesome/free-solid-svg-icons";

const severityStyles = {
  high: "border-red-300/60 dark:border-red-700/50 bg-red-50 dark:bg-red-900/10 text-red-700 dark:text-red-300",
  medium: "border-amber-300/60 dark:border-amber-700/50 bg-amber-50 dark:bg-amber-900/10 text-amber-800 dark:text-amber-300",
  low: "border-slate-200 dark:border-slate-700 bg-white dark:bg-[#0b1220] text-slate-800 dark:text-slate-200"
};

const badgeStyles = {
  high: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300",
  medium: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300",
  low: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300"
};

export default function RedFlagsPanel({ loading, flags, onRerun }) {
  return (
    <div
      className="
        mt-6 p-4 rounded-xl
        border border-slate-200 dark:border-slate-700
        bg-white dark:bg-[#0b1220]
      "
    >
      {/* HEADER */}
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-slate-900 dark:text-white flex items-center gap-2">
          <FontAwesomeIcon
            icon={faTriangleExclamation}
            className="text-red-600 dark:text-red-400"
          />
          Recruiter Red Flags
        </h3>

        <div className="flex items-center gap-3">
          {loading && (
            <span className="text-xs text-slate-500 dark:text-slate-400">
              Scanning…
            </span>
          )}

          {onRerun && (
            <button
              onClick={onRerun}
              disabled={loading}
              className="
                h-8 w-8
                flex items-center justify-center
                rounded-full
                border border-slate-300 dark:border-slate-600
                bg-white dark:bg-[#0f1629]
                text-slate-700 dark:text-slate-200
                hover:bg-slate-100 dark:hover:bg-slate-800
                disabled:opacity-50 disabled:cursor-not-allowed
                transition
              "
              title="Re-run red flags"
            >
              <FontAwesomeIcon icon={faRotateRight} />
            </button>

          )}
        </div>
      </div>

      {/* EMPTY STATE */}
      {!loading && (!flags || flags.length === 0) && (
        <div className="text-sm text-emerald-700 dark:text-emerald-300">
          ✅ No major red flags detected
        </div>
      )}

      {/* FLAGS LIST */}
      <div className="space-y-3">
        {(flags || []).map((f, idx) => {
          const sev = f.severity || "medium";
          return (
            <div
              key={idx}
              className={`p-3 rounded-lg border ${severityStyles[sev] || severityStyles.medium}`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="font-medium text-sm">
                  {f.message}
                </div>

                <span
                  className={`text-[11px] px-2 py-0.5 rounded-full font-semibold
                    ${badgeStyles[sev] || badgeStyles.medium}`}
                >
                  {sev.toUpperCase()}
                </span>
              </div>

              {f.example && (
                <div className="mt-2 text-xs opacity-80">
                  <span className="font-semibold">Example:</span>{" "}
                  <span className="italic">“{f.example}”</span>
                </div>
              )}

              {f.whyItMatters && (
                <div className="mt-2 text-xs opacity-90">
                  <span className="font-semibold">Why it matters:</span>{" "}
                  {f.whyItMatters}
                </div>
              )}

              {f.fix && (
                <div className="mt-2 text-xs">
                  <span className="font-semibold">Fix:</span> {f.fix}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
