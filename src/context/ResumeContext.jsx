import React, { createContext, useContext, useState, useEffect } from "react";

const ResumeContext = createContext();

/* ============================
   Helpers
============================ */
const load = (key, fallback) => {
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : fallback;
  } catch {
    return fallback;
  }
};

const save = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

/* ============================
   Provider
============================ */
export const ResumeProvider = ({ children }) => {
  /* ---------- Template ---------- */
  const [activeTemplate, setActiveTemplateState] = useState(() =>
    localStorage.getItem("resumeTemplate") || "oneColumn"
  );

  const setActiveTemplate = (templateId) => {
    setActiveTemplateState(templateId);
    localStorage.setItem("resumeTemplate", templateId);
  };

  /* ---------- Resume Sections ---------- */
  const [personalInfo, setPersonalInfo] = useState(() =>
    load("resume_personalInfo", {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      location: "",
      linkedin: "",
      website: ""
    })
  );

  const [summary, setSummary] = useState(() =>
    load("resume_summary", "")
  );

  const [experience, setExperience] = useState(() =>
    load("resume_experience", [])
  );

  const [education, setEducation] = useState(() =>
    load("resume_education", [])
  );

  const [customForm, setCustomForm] = useState(() =>
    load("resume_customForm", {})
  );

  const [skills, setSkills] = useState(() =>
    load("resume_skills", [])
  );

  /* ---------- ATS SESSION (PERSISTED) ---------- */
  const [atsResumeText, setAtsResumeText] = useState(() =>
    load("ats_resume_text", "")
  );

  const [atsJobDescription, setAtsJobDescription] = useState(() =>
    load("ats_job_description", "")
  );

  const [atsResult, setAtsResult] = useState(() =>
    load("ats_result", null)
  );

  /* ---------- Optimization ---------- */
  const [undoSnapshot, setUndoSnapshot] = useState(null);

  /* ---------- Persist Resume Data ---------- */
  useEffect(() => save("resume_personalInfo", personalInfo), [personalInfo]);
  useEffect(() => save("resume_summary", summary), [summary]);
  useEffect(() => save("resume_experience", experience), [experience]);
  useEffect(() => save("resume_education", education), [education]);
  useEffect(() => save("resume_customForm", customForm), [customForm]);
  useEffect(() => save("resume_skills", skills), [skills]);

  /* ---------- Persist ATS Session ---------- */
  useEffect(() => save("ats_resume_text", atsResumeText), [atsResumeText]);
  useEffect(() => save("ats_job_description", atsJobDescription), [atsJobDescription]);
  useEffect(() => save("ats_result", atsResult), [atsResult]);

  /* ---------- Context Value ---------- */
  return (
    <ResumeContext.Provider
      value={{
        /* Template */
        activeTemplate,
        setActiveTemplate,

        /* Resume Data */
        personalInfo,
        setPersonalInfo,

        summary,
        setSummary,

        experience,
        setExperience,

        education,
        setEducation,

        customForm,
        setCustomForm,

        skills,
        setSkills,

        /* ATS Session */
        atsResumeText,
        setAtsResumeText,

        atsJobDescription,
        setAtsJobDescription,

        atsResult,
        setAtsResult,

        /* Optimization */
        undoSnapshot,
        setUndoSnapshot
      }}
    >
      {children}
    </ResumeContext.Provider>
  );
};

/* ============================
   Hook
============================ */
export const useResume = () => useContext(ResumeContext);
