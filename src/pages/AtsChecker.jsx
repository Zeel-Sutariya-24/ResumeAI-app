import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import FileUpload from "../components/FileUpload";
import AtsResult from "../components/AtsResult";
import Loader from "../components/Loader";
import RecruiterViewPanel from "../components/RecruiterViewPanel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartBar } from "@fortawesome/free-regular-svg-icons";
import { faChartLine, faChartPie, faCopy, faTriangleExclamation, faUserTie, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useResume } from "../context/ResumeContext";

import RedFlagsPanel from "../components/RedFlagsPanel";
import toast from "react-hot-toast";


const AtsChecker = () => {
  // Result tabs
  const [activeResultTab, setActiveResultTab] = useState("ats");

  //Recruiter toggle mode
  const [isRecruiterView, setIsRecruiterView] = useState(false);
  const [recruiterViewData, setRecruiterViewData] = useState(null);
  const [loadingRecruiterView, setLoadingRecruiterView] = useState(false);


  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  // Optimize Resume
  const [optLoading, setOptLoading] = useState(false);
  const [optPreview, setOptPreview] = useState(null);
  const [showOptModal, setShowOptModal] = useState(false);

  const loadingRef = useRef(null);
  const resultRef = useRef(null);
  const navigate = useNavigate();

  // Red flags panel
  const [redFlags, setRedFlags] = useState([]);
  const [loadingFlags, setLoadingFlags] = useState(false);

  const {
    /* ATS Session (PERSISTED) */
    atsResumeText,
    setAtsResumeText,
    atsJobDescription,
    setAtsJobDescription,
    atsResult,
    setAtsResult,

    /* Resume Builder Data */
    personalInfo,
    summary,
    skills,
    setSummary,
    setSkills,

    /* Optimization */
    setUndoSnapshot
  } = useResume();

  /* ============================
     ATS ANALYZE
  ============================ */
  const handleAnalyze = async () => {
    if (!atsResumeText || !atsJobDescription) {
      alert("Please upload resume text and job description.");
      return;
    }

    setLoading(true);
    setAtsResult(null);

    setTimeout(() => {
      loadingRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center"
      });
    }, 80);

    try {
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/ats-check`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          resumeText: atsResumeText,
          jobDescription: atsJobDescription
        })
      });


      const data = await response.json();
      setAtsResult(data);

      // RUN RED FLAGS SCAN (AI-based)
      if (atsResumeText && atsResumeText.trim().length > 50) {
        runRedFlagsScan(atsResumeText, atsJobDescription);
      }


    } catch (err) {
      console.error(err);
      alert("Something went wrong.");
    }

    setLoading(false);

    setTimeout(() => {
      resultRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }, 200);
  };

  /* ============================
     OPTIMIZE RESUME
  ============================ */
  const handleOptimizeResume = async () => {
    if (!atsResult) return;

    try {
      setOptLoading(true);

      const res = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/api/ats-check`,
        {
          personalInfo,
          currentSummary: summary,
          currentSkills: skills,
          atsResult,
          jobDescription: atsJobDescription
        }
      );

      setOptPreview(res.data);
      setShowOptModal(true);
      console.log("OPT PREVIEW:", res.data);
      

    } catch (err) {
      console.error(err);
      alert("Resume optimization failed.");
    } finally {
      setOptLoading(false);
    }
  };

  const applyOptimization = () => {
    if (!optPreview) return;

    // Undo support
    setUndoSnapshot({
      summaryBeforeOptimize: summary,
      skillsBeforeOptimize: skills
    });

    // Apply summary
    setSummary(optPreview.optimizedSummary);

    // ✅ ADD skills (merge, no duplicates)
    if (Array.isArray(optPreview.skillsToAdd)) {
      const existing = new Set(
        skills.map((s) => s.name.toLowerCase())
      );

      const newSkills = optPreview.skillsToAdd
        .filter((s) => !existing.has(s.toLowerCase()))
        .map((s) => ({
          id: Date.now() + Math.random(),
          name: s
        }));
        
      setSkills([...skills, ...newSkills]);
    }

    setShowOptModal(false);
    
    navigate("/builder", { state: { focus: "skills" } });
  };


  const handleCopyOptimizedSummary = async () => {
    try {
      await navigator.clipboard.writeText(optPreview.optimizedSummary);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch (err) {
      console.error("Copy failed", err);
    }
  };

  // Red Flags Scanner
  const runRedFlagsScan = async (resumeText, jobDescription) => {
    if (loadingFlags) return;

    try {
      setLoadingFlags(true);
      setRedFlags([]);

      const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/red-flags`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resumeText, jobDescription })
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data?.error || "Red flags scan failed");
      }

      setRedFlags(Array.isArray(data.flags) ? data.flags : []);
    } catch (err) {
      console.error(err);
      toast.error("Red Flags scan failed");
    } finally {
      setLoadingFlags(false);
    }
  };

  const fetchRecruiterView = async () => {
    if (recruiterViewData) return;

    try {
      setLoadingRecruiterView(true);

      const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/recruiter-view`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resumeText: atsResumeText })
      });

      const json = await res.json();
      setRecruiterViewData(json?.data || null);
    } catch {
      toast.error("Recruiter view failed");
    } finally {
      setLoadingRecruiterView(false);
    }
  };

  const handleRecruiterView = async () => {
    setIsRecruiterView((prev) => {
      const next = !prev;

      // Toggle tab correctly
      setActiveResultTab(next ? "recruiter" : "ats");

      // Fetch only once, only when turning ON
      if (next && !recruiterViewData) {
        fetchRecruiterView();
      }

      return next;
    });
  };


  const goToRedFlagsTab = () => {
    setActiveResultTab("flags");
  };



  /* ============================
     UI
  ============================ */
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0a0f1e] pt-20 px-6">

      {/* HEADER */}
      <div className="flex flex-col items-center mb-8">
        <div className="
          mb-4 flex items-center justify-center h-14 w-14 rounded-2xl
          bg-gradient-to-br from-[#9561ef] to-[#b217b2]
          shadow-lg shadow-purple-900/30
        ">
          <FontAwesomeIcon icon={faChartBar} className="text-white text-2xl" />
        </div>

        <h1 className="text-2xl font-extrabold text-center text-slate-900 dark:text-white">
          ATS Compatibility Checker
        </h1>

        <p className="text-center text-slate-600 dark:text-slate-300 text-sm max-w-xl mx-auto mt-2">
          Analyze your resume against job descriptions and optimize it automatically.
        </p>
      </div>

      {/* MAIN CARD */}
      <div className="
        max-w-5xl mx-auto
        bg-white dark:bg-[#0d1426]
        shadow-lg rounded-xl p-8
        border border-slate-200 dark:border-slate-700
      ">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-4">

          {/* LEFT */}
          <div className="flex flex-col">
            <h2 className="text-base font-semibold mb-4 text-slate-800 dark:text-slate-100">
              Upload Resume or Paste Text
            </h2>

            <FileUpload setResumeText={setAtsResumeText} />

            <div className="flex items-center my-6">
              <div className="flex-grow border-t border-slate-400/40"></div>
              <span className="mx-3 text-xs font-semibold text-slate-500">OR</span>
              <div className="flex-grow border-t border-slate-400/40"></div>
            </div>

            <textarea
              className="
                w-full min-h-[260px] p-4 text-sm
                bg-gray-100 dark:bg-[#0b1220]
                rounded-lg
                border border-slate-300 dark:border-slate-600
                text-slate-900 dark:text-slate-100
                placeholder:text-slate-400 dark:placeholder:text-slate-500
              "
              placeholder="Paste your resume text here..."
              value={atsResumeText}
              onChange={(e) => setAtsResumeText(e.target.value)}
            />
          </div>

          {/* RIGHT */}
          <div className="flex flex-col">
            <h2 className="text-base font-semibold mb-4 text-slate-800 dark:text-slate-100">
              Paste Job Description
            </h2>

            <textarea
              className="
                w-full min-h-[360px] p-4 text-sm
                bg-gray-100 dark:bg-[#0b1220]
                rounded-lg
                border border-slate-300 dark:border-slate-600
                text-slate-900 dark:text-slate-100
                placeholder:text-slate-400 dark:placeholder:text-slate-500
              "
              placeholder="Paste the job description here..."
              value={atsJobDescription}
              onChange={(e) => setAtsJobDescription(e.target.value)}
            />
          </div>

        </div>

        {/* ANALYZE BUTTON */}
        <div className="text-center mt-10">
          <button
            onClick={handleAnalyze}
            className="
              px-8 py-3 text-sm
              bg-blue-600 hover:bg-blue-700
              text-white font-semibold
              rounded-lg shadow-md
            "
          >
            <FontAwesomeIcon icon={faChartPie} className="mr-2" />
            Analyze Resume
          </button>
        </div>
      </div>

      {/* LOADER */}
      <div ref={loadingRef} className="py-10 flex justify-center">
        {loading && <Loader />}
      </div>

    {/* RESULTS */}
    <div ref={resultRef} className="pb-10">
      {!loading && atsResult && (
        <>
          {/* Recruiter Toggle */}
            <div className="max-w-5xl mx-auto mt-10 flex justify-end">
              <button
                onClick={() => {
                  handleRecruiterView();
                  }}
                className={`
                  flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition
                  ${
                    isRecruiterView
                      ? "bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900"
                      : "bg-slate-100 text-slate-700 dark:bg-slate-800 border border-black dark:border-none dark:text-slate-300"
                  }
                `}
              >
                  View as Recruiter
                  {/* {isRecruiterView ? "View as Recruiter" : "View as Recruiter"} */}
                  <FontAwesomeIcon icon={isRecruiterView ? faEye : faEyeSlash} />
              </button>
            </div>

          {/* ============================
              RESULT TABS
          ============================ */}
          <div className="mt-10 flex justify-center">
            <div
              className="
                inline-flex rounded-xl p-1
                bg-slate-100 dark:bg-slate-800
                border border-slate-200 dark:border-slate-700
              "
            >
              <button
                onClick={() => setActiveResultTab("ats")}
                className={`
                  px-5 py-2 rounded-lg text-sm font-medium transition
                  ${
                    activeResultTab === "ats"
                      ? "bg-white dark:bg-[#0f1629] text-purple-700 dark:text-purple-300 shadow"
                      : "text-slate-600 dark:text-slate-300 hover:text-purple-600"
                  }
                `}
              >
                <FontAwesomeIcon icon={faChartLine} className="mr-2" />
                 ATS Report
              </button>

              <button
                onClick={() => setActiveResultTab("flags")}
                className={`
                  px-5 py-2 rounded-lg text-sm font-medium transition
                  ${
                    activeResultTab === "flags"
                      ? "bg-white dark:bg-[#0f1629] text-purple-700 dark:text-purple-300 shadow"
                      : "text-slate-600 dark:text-slate-300 hover:text-purple-600"
                  }
                `}
              >
                <FontAwesomeIcon icon={faTriangleExclamation} className="mr-2" />
                Recruiter Red Flags
              </button>

              {isRecruiterView && (
                  <button
                    onClick={() => setActiveResultTab("recruiter")}
                    className={`px-5 py-2 rounded-lg text-sm font-medium ${
                      activeResultTab === "recruiter"
                        ? "bg-white dark:bg-[#0f1629] text-purple-700 dark:text-purple-300 shadow"
                        : "text-slate-600 dark:text-slate-300"
                    }`}
                  >
                     <FontAwesomeIcon icon={faUserTie} className="mr-2" />
                     Recruiter View
                  </button>
                )}
              </div>
            </div>

          {/* ============================
              TAB CONTENT
          ============================ */}
          <div className="mt-6">
            {activeResultTab === "ats" && (
              <AtsResult result={atsResult} />
            )}

            {activeResultTab === "flags" && (
              <div className="max-w-5xl mx-auto">
                <RedFlagsPanel
                  loading={loadingFlags}
                  flags={redFlags}
                  onRerun={() => runRedFlagsScan(atsResumeText, atsJobDescription)}
                />
              </div>
            )}

            {activeResultTab === "recruiter" && (
              <RecruiterViewPanel
                data={recruiterViewData}
                loading={loadingRecruiterView}
                onMoreIssues={goToRedFlagsTab}
              />
            )}


          </div>

          {/* ============================
              CTA (ALWAYS VISIBLE)
          ============================ */}
          <div className="flex justify-center mt-10">
            <button
              onClick={handleOptimizeResume}
              disabled={optLoading}
              className="
                flex items-center justify-center gap-2
                px-10 py-4 rounded-xl
                bg-gradient-to-r from-green-600 to-emerald-600
                hover:from-green-700 hover:to-emerald-700
                dark:from-green-500 dark:to-emerald-500
                dark:hover:from-green-600 dark:hover:to-emerald-600
                text-white font-semibold text-base
                shadow-lg shadow-green-600/30
                transition-all duration-200
                disabled:opacity-60 disabled:cursor-not-allowed
              "
            >
              {optLoading
                ? "Optimizing Resume..."
                : "🚀 Optimize Resume Using ATS Feedback"}
            </button>
          </div>
        </>
      )}
    </div>


      {/* PREVIEW MODAL */}
      {showOptModal && optPreview && (
        <div className="
          fixed inset-0 z-50
          flex items-center justify-center p-4
          bg-black/40 backdrop-blur-sm
        ">
          <div className="
            w-full max-w-3xl
            rounded-2xl p-6
            bg-white dark:bg-[#0d1426]
            border border-slate-200 dark:border-slate-700
            shadow-2xl
          ">

            <div className="mb-6">
              <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                Resume Optimization Preview
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                Review the suggested improvements before applying them.
              </p>
            </div>

            <div className="mb-6">
              <div className="text-sm font-semibold mb-2 text-slate-800 dark:text-slate-200">
                New Professional Summary
              </div>

              <div
                className="
                  relative
                  p-4 rounded-xl text-sm leading-relaxed
                  bg-slate-50 dark:bg-[#0b1220]
                  text-slate-900 dark:text-slate-100
                  border border-slate-200 dark:border-slate-600
                "
              >
                {optPreview.optimizedSummary}

                {/* COPY BUTTON */}
                <button
                  onClick={handleCopyOptimizedSummary}
                  className="
                    absolute bottom-2 right-2
                    flex items-center gap-1
                    px-3 py-1 rounded-md text-xs font-semibold
                    bg-purple-600 text-white
                    hover:bg-purple-700
                    transition
                  "
                >
                  {copied ? (
                    "✓ Copied"
                  ) : (
                    <>
                      <FontAwesomeIcon icon={faCopy} className="text-white text-xs" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            <div className="mb-8">
              <div className="text-sm font-semibold mb-2 text-slate-800 dark:text-slate-200">
                Skills to Add
              </div>
              <div className="flex flex-wrap gap-2">
                {optPreview.skillsToAdd?.length > 0 ? (
                  optPreview.skillsToAdd.map((s, i) => (
                    <span
                      key={i}
                      className="
                        px-3 py-1 text-xs rounded-full font-medium
                        bg-green-100 text-green-800
                        dark:bg-green-600/20 dark:text-green-300
                        border border-green-200 dark:border-green-700
                      "
                    >
                      + {s}
                    </span>
                  ))
                ) : (
                  <span className="text-xs italic text-slate-500 dark:text-slate-400">
                    ✓ No additional skills needed — your resume already matches ATS keywords
                  </span>
                )}
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowOptModal(false)}
                className="
                  flex-1 py-3 rounded-xl font-semibold
                  bg-slate-200 text-slate-900 hover:bg-slate-300
                  dark:bg-slate-700 dark:text-slate-100 dark:hover:bg-slate-600
                "
              >
                Cancel
              </button>

              <button
                onClick={applyOptimization}
                className="
                  flex-1 py-3 rounded-xl font-semibold
                  bg-green-600 hover:bg-green-700
                  dark:bg-green-500 dark:hover:bg-green-600
                  text-white
                "
              >
                Apply to Builder
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default AtsChecker;
