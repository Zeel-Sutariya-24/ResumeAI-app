import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import JobModal from "../components/JobModal";
import { useJob } from "../context/JobContext";
import toast from "react-hot-toast";

import ExperienceForm from "../components/ExperienceForm";
import EducationForm from "../components/EducationForm";
import SkillsForm from "../components/SkillsForm";
import CustomForm from "../components/CustomForm";
import { useNavigate } from "react-router-dom";
import { useResume } from "../context/ResumeContext";
import axios from "axios";
import resumeTemplates from "../templates/resumeTemplates";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faBriefcase,
  faGraduationCap,
  faWrench,
  faSquarePlus,
  faCode,
  faCertificate,
  faTrophy,
  faHandsHelping,
  faBook,
  faMedal,
  faUsers,
  faLayerGroup,
  faChevronDown,
  faChevronUp,
  faMagicWandSparkles,
  faPen,
  faTrash
} from "@fortawesome/free-solid-svg-icons";
import pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from "pdfmake/build/vfs_fonts";



pdfMake.vfs = pdfFonts.vfs;
const STORAGE_KEY = "resume-data-v1";

const Builder = () => {

  // for toast to load once
  const hasShownLoadToast = React.useRef(false);


  // Add Job details and sasve resume to link it to that specific job
  const [jobModalOpen, setJobModalOpen] = useState(false);
  const { job, setJob } = useJob();
  const { clearJob } = useJob();
  const isJobReady =
    job.company && job.role && job.jobDescription;
  
  const ensureJobExists = () => {
    if (!job.company || !job.role || !job.jobDescription) {
      setJobModalOpen(true);
      toast("Add job details to save a job-specific version", {
        icon: "ℹ️"
      });
      return false;
    }
    return true;
  };


  const [activeTab, setActiveTab] = useState("personal");
  const [resumeName, setResumeName] = useState("My Resume");

  const [showSectionOrder, setShowSectionOrder] = useState(true);

  const { summary, setSummary, undoSnapshot, setUndoSnapshot } = useResume();

  const [formData, setFormData] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) {
      return {
        name: "",
        email: "",
        phone: "",
        location: "",
        linkedin: "",
        website: "",
        summary: "",
      };
    }
    try {
      const parsed = JSON.parse(saved);
      return (
        parsed.formData || {
          name: "",
          email: "",
          phone: "",
          location: "",
          linkedin: "",
          website: "",
          summary: "",
        }
      );
    } catch {
      return {
        name: "",
        email: "",
        phone: "",
        location: "",
        linkedin: "",
        website: "",
        summary: "",
      };
    }
  });

  const [experience, setExperience] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return [];
    try {
      const parsed = JSON.parse(saved);
      return parsed.experience || [];
    } catch {
      return [];
    }
  });

  const [education, setEducation] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return [];
    try {
      const parsed = JSON.parse(saved);
      return parsed.education || [];
    } catch {
      return [];
    }
  });

  const [skills, setSkills] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return [];
    try {
      const parsed = JSON.parse(saved);
      return parsed.skills || [];
    } catch {
      return [];
    }
  });

  const [customSections, setCustomSections] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return [];
    try {
      const parsed = JSON.parse(saved);
      return parsed.customSections || [];
    } catch {
      return [];
    }
  });

  const [showCustomModal, setShowCustomModal] = useState(false);
  const [newCustomTitle, setNewCustomTitle] = useState("");
  const [newCustomSubheading, setNewCustomSubheading] = useState("");
  const [newCustomStart, setNewCustomStart] = useState("");
  const [newCustomEnd, setNewCustomEnd] = useState("");
  const [newCustomDesc, setNewCustomDesc] = useState("");

  const [sectionOrder, setSectionOrder] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return ["summary", "skills", "experience", "education"];
    try {
      const parsed = JSON.parse(saved);
      return (
        parsed.sectionOrder || ["summary", "skills", "experience", "education"]
      );
    } catch {
      return ["summary", "skills", "experience", "education"];
    }
  });

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (!saved) return;

      const parsed = JSON.parse(saved);
      if (parsed.resumeName) setResumeName(parsed.resumeName);
      if (parsed.formData) {
        setFormData((prev) => ({ ...prev, ...parsed.formData }));
      }
      if (Array.isArray(parsed.experience)) setExperience(parsed.experience);
      if (Array.isArray(parsed.education)) setEducation(parsed.education);
      if (Array.isArray(parsed.skills)) setSkills(parsed.skills);
      if (Array.isArray(parsed.customSections))
        setCustomSections(parsed.customSections);
      if (Array.isArray(parsed.sectionOrder))
        setSectionOrder(parsed.sectionOrder);
    } catch {}
  }, []);

  useEffect(() => {
    const dataToSave = {
      resumeName,
      formData,
      experience,
      education,
      skills,
      customSections,
      sectionOrder,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
  }, [resumeName, formData, experience, education, skills, customSections, sectionOrder]);

  const location = useLocation();
  const summaryRef = React.useRef(null);
    // need const location which is above and this is for My Reusmes page to load resume in builder
  const loadedResume = location.state?.loadedResume;
  const focusTarget = location.state?.focus;
  useEffect(() => {
    if (focusTarget !== "summary") return;

    setActiveTab("personal");

    const timer = setTimeout(() => {
      summaryRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center"
      });
      summaryRef.current?.focus();
    }, 300);

    return () => clearTimeout(timer);
  }, [focusTarget, setActiveTab]);

  // loading resume from myresume load button on to builder
   useEffect(() => {
    if (!loadedResume) return;

    // Job Context
    setJob({
      company: loadedResume.company,
      role: loadedResume.role,
      jobDescription: loadedResume.jobDescription
    });

    const data = loadedResume.resumeData || {};

    if (data.personalInfo) setFormData(data.personalInfo);
    if (data.summary) setSummary(data.summary);
    if (data.experience) setExperience(data.experience);
    if (data.education) setEducation(data.education);
    if (data.skills) setSkills(data.skills);
    if (data.customSections) setCustomSections(data.customSections);

    // 🔒 Prevent duplicate toast (StrictMode fix)
    if (!hasShownLoadToast.current) {
      toast.success(
        `Loaded resume for ${loadedResume.company} – ${loadedResume.role}`,
        { duration: 2500 }
      );
      hasShownLoadToast.current = true;
    }

  }, [
    loadedResume,
    setJob,
    setFormData,
    setSummary,
    setExperience,
    setEducation,
    setSkills,
    setCustomSections
  ]);


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const moveSection = (index, direction) => {
    const newOrder = [...sectionOrder];
    const target = index + direction;
    if (target < 0 || target >= newOrder.length) return;
    [newOrder[index], newOrder[target]] = [newOrder[target], newOrder[index]];
    setSectionOrder(newOrder);
  };

  const saveResume = () => {
    const payload = {
      resumeName,
      formData,
      experience,
      education,
      skills,
      customSections,
      sectionOrder,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    alert("Resume saved!");
  };

  // Convert description text into an array of bullet lines
  const splitIntoBullets = (text) => {
    if (!text) return [];
    return text
      .split("\n")
      .map(line => line.trim())
      .filter(line => line.length > 0);
  };

  const navigate = useNavigate();
  const { activeTemplate } = useResume();
  const template = resumeTemplates[activeTemplate];
  const isTwoColumn = template?.layout === "two-column";

  
  const [sectionLayout, setSectionLayout] = useState({ left: [], right: [] });

  const leftSections = sectionOrder.filter(
    (key) => sectionLayout.left.includes(key)
  );

  const rightSections = sectionOrder.filter(
    (key) => sectionLayout.right.includes(key)
  );

  useEffect(() => {
    if (!isTwoColumn) return;

    setSectionLayout((prev) => {
      const assigned = new Set([
        ...prev.left,
        ...prev.right
      ]);

      const newLeft = [...prev.left];
      const newRight = [...prev.right];

      sectionOrder.forEach((key) => {
        if (assigned.has(key)) return;

        // Default placement rules
        if (["summary", "skills", "education"].includes(key)) {
          newLeft.push(key);
        } else {
          newRight.push(key); // 👈 experience + custom sections
        }
      });

      return {
        left: newLeft,
        right: newRight
      };
    });
  }, [isTwoColumn, sectionOrder]);

  // Multi-page PDF Export
  // TEXT-BASED PDF EXPORT USING PDFMAKE (ATS FRIENDLY)
  const handleDownloadPDF = () => {
    // =========================
    // Helpers
    // =========================
    const createThinDivider = () => ({
      canvas: [
        {
          type: "line",
          x1: 0,
          y1: 0,
          x2: 515,
          y2: 0,
          lineWidth: 1,
          lineColor: "#000000"
        }
      ],
      margin: [0, 4, 0, 8]
    });

    const createThinDividerLeft = () => ({
      canvas: [
        {
          type: "line",
          x1: 0,
          y1: 0,
          x2: 177,
          y2: 0,
          lineWidth: 0.3,
          lineColor: "#000000"
        }
      ],
      margin: [0, 4, 0, 8]
    });

    const createThinDividerRight = () => ({
      canvas: [
        {
          type: "line",
          x1: 0,
          y1: 0,
          x2: 312,
          y2: 0,
          lineWidth: 0.3,
          lineColor: "#000000"
        }
      ],
      margin: [0, 4, 0, 8]
    });

    const formatDate = (d) => {
      if (!d) return "";
      return new Date(d).toLocaleDateString("en-US", {
        month: "short",
        year: "numeric"
      });
    };

    const splitIntoBullets = (text) => {
      if (!text) return [];
      return text
        .split("\n")
        .map((t) => t.trim())
        .filter(Boolean);
    };

    // =========================
    // Column containers
    // =========================
    const leftColumn = [];
    const rightColumn = [];

    // =========================
    // Base PDF
    // =========================
    const docDefinition = {
      pageSize: "A4",
      pageMargins: [40, 40, 40, 40],

      defaultStyle: {
        font: "Roboto",
        fontSize: 10,
        lineHeight: 1.2
      },

      styles: {
        headerName: {
          fontSize: 18,
          bold: true,
          alignment: "center",
          margin: [0, 0, 0, 6]
        },
        contactLine: {
          fontSize: 9,
          alignment: "center",
          margin: [0, 0, 0, 10]
        },
        sectionTitle: {
          fontSize: 12,
          bold: true,
          margin: [0, 5, 0, 4]
        },
        jobTitle: {
          fontSize: 11,
          bold: true,
          margin: [0, 4, 0, 1]
        },
        jobCompany: {
          fontSize: 10,
          margin: [0, 0, 0, 1]
        },
        jobDates: {
          fontSize: 9,
          color: "#6b7280",
          margin: [0, 0, 0, 4]
        },
        bulletList: {
          margin: [0, 0, 0, 6]
        }
      },

      content: [
        { text: formData.name || "Your Name", style: "headerName" },
        {
          text: [
            formData.email,
            formData.phone,
            formData.location,
            formData.linkedin,
            formData.website
          ]
            .filter(Boolean)
            .join("  •  "),
          style: "contactLine"
        },
        createThinDivider()
      ]
    };

    // =========================
    // Build sections in order
    // =========================
    sectionOrder.forEach((key) => {
      let sectionStack = [];

      // ---------- SUMMARY ----------
      if (key === "summary" && summary?.trim()) {
        let dividerNode;

        if (!isTwoColumn) {
          dividerNode = createThinDivider();
        } else if (isTwoColumn && sectionLayout.right.includes(key)) {
          dividerNode = createThinDividerRight();
        } else if (isTwoColumn && sectionLayout.left.includes(key)) {
          dividerNode = createThinDividerLeft();
        }
        sectionStack = [
          { text: "Professional Summary", style: "sectionTitle" },
          dividerNode,
          { text: summary, alignment: "justify" }
        ];
      }

      // ---------- SKILLS ----------
      if (key === "skills" && skills.length) {
        let dividerNode;

        if (!isTwoColumn) {
          dividerNode = createThinDivider();
        } else if (isTwoColumn && sectionLayout.right.includes(key)) {
          dividerNode = createThinDividerRight();
        } else if (isTwoColumn && sectionLayout.left.includes(key)) {
          dividerNode = createThinDividerLeft();
        }

        sectionStack = [
          { text: "Skills", style: "sectionTitle" },
          dividerNode,
          { ul: skills.map((s) => s.name), style: "bulletList", alignment: "justify" }
        ];
      }


      // ---------- EXPERIENCE ----------
      if (key === "experience" && experience.length) {
        const dividerNode = !isTwoColumn
          ? createThinDivider()
          : sectionLayout.left.includes(key)
            ? createThinDividerLeft()
            : createThinDividerRight();

        const items = experience.map((exp) => ({
          unbreakable: true,
          margin: [0, 0, 0, 5],
          stack: [
            { text: exp.title, style: "jobTitle" },
            { text: `${exp.company} • ${exp.location}`, style: "jobCompany" },
            {
              text: `${formatDate(exp.startDate)} - ${
                exp.current ? "Present" : formatDate(exp.endDate)
              }`,
              style: "jobDates"
            },
            {
              ul: splitIntoBullets(exp.description),
              style: "bulletList",
              alignment: "justify"
            }
          ]
        }));

        sectionStack = [
          {
            unbreakable: true, // 🔥 THIS IS THE REAL FIX
            stack: [
              { text: "Experience", style: "sectionTitle" },
              dividerNode,
              items[0]           // first job stays with heading
            ]
          },
          ...items.slice(1)
        ];
      }


      // ---------- EDUCATION ----------
      if (key === "education" && education.length) {
        const dividerNode = !isTwoColumn
          ? createThinDivider()
          : sectionLayout.left.includes(key)
            ? createThinDividerLeft()
            : createThinDividerRight();

        // Build degree blocks (each degree is atomic)
        const items = education.map((edu) => ({
          unbreakable: true, // 🔑 degree + details stay together
          margin: [0, 0, 0, 5],
          stack: [
            { text: edu.degree, style: "jobTitle" },

            { text: `${edu.institution} • ${edu.location}`, style: "jobCompany" },

            // Graduation + GPA
            (edu.graduation || edu.gpa)
              ? {
                  text: [
                    edu.graduation,
                    edu.gpa ? `GPA: ${edu.gpa}` : null
                  ]
                    .filter(Boolean)
                    .join(" • "),
                  style: "jobDates"
                }
              : null,

            // Achievements / courses
            splitIntoBullets(edu.achievements).length
              ? {
                  ul: splitIntoBullets(edu.achievements),
                  style: "bulletList",
                  alignment: "justify"
                }
              : null
          ].filter(Boolean)
        }));

        // 🔑 Heading + divider + FIRST degree stay together
        sectionStack = [
          {
            unbreakable: true,
            stack: [
              { text: "Education", style: "sectionTitle" },
              dividerNode,
              items[0]
            ]
          },
          ...items.slice(1)
        ];
      }


      // ---------- CUSTOM SECTIONS ----------
      if (key.startsWith("custom-")) {
        const id = key.replace("custom-", "");
        const sec = customSections.find((s) => String(s.id) === id);
        if (!sec || !sec.items?.length) return;

        const dividerNode = !isTwoColumn
          ? createThinDivider()
          : sectionLayout.left.includes(key)
            ? createThinDividerLeft()
            : createThinDividerRight();

        const items = sec.items.map((it) => ({
          unbreakable: true,
          margin: [0, 0, 0, 0],
          stack: [
            it.subheading
              ? { text: it.subheading, style: "jobTitle" }
              : null,
            (it.startDate || it.endDate)
              ? {
                  text: `${formatDate(it.startDate)} - ${formatDate(it.endDate)}`,
                  style: "jobDates"
                }
              : null,
            splitIntoBullets(it.description).length
              ? {
                  ul: splitIntoBullets(it.description),
                  style: "bulletList",
                  alignment: "justify"
                }
              : null
          ].filter(Boolean)
        }));

        sectionStack = [
          {
            unbreakable: true, // 🔥 heading + first item together
            stack: [
              { text: sec.title, style: "sectionTitle" },
              dividerNode,
              items[0]
            ]
          },
          ...items.slice(1)
        ];
      }



      // ---------- PUSH AS ATOMIC BLOCK ----------
      if (!sectionStack.length) return;

      const sectionBlock = {
      stack: sectionStack, // no unbreakable here
      margin: [0, 3, 0, 10]
    };


      if (isTwoColumn) {
        sectionLayout.left.includes(key)
          ? leftColumn.push(sectionBlock)
          : rightColumn.push(sectionBlock);
      } else {
        docDefinition.content.push(sectionBlock);
      }
    });

    // =========================
    // Final two-column layout
    // =========================
    if (isTwoColumn) {
      docDefinition.content.push({
        table: {
          widths: ["35%", 10 , "60%"],
          body: [[{ stack: leftColumn }, "", { stack: rightColumn }]]
        },
        layout: "noBorders",
        margin: [0, 5, 0, 0]
      });
    }

    // =========================
    // Download
    // =========================
    pdfMake.createPdf(docDefinition).download(`${resumeName || "Resume"}.pdf`);
  };


  const activeCustomId = activeTab.startsWith("custom-")
    ? activeTab.replace("custom-", "")
    : null;

  const activeCustomSection =
    activeCustomId && customSections.find((x) => String(x.id) === activeCustomId);

  const getCustomIcon = (t) => {
    t = (t || "").toLowerCase();
    if (t.includes("project")) return faCode;
    if (t.includes("certificate")) return faCertificate;
    if (t.includes("award")) return faTrophy;
    if (t.includes("volunteer")) return faHandsHelping;
    if (t.includes("publication")) return faBook;
    if (t.includes("achievement")) return faMedal;
    if (t.includes("activity")) return faUsers;
    return faLayerGroup;
  };

  const getSectionColumn = (key) => {
    if (sectionLayout.left.includes(key)) return "left";
    if (sectionLayout.right.includes(key)) return "right";
    return "left"; // fallback
  };

  const moveSectionToColumn = (key, target) => {
    setSectionLayout((prev) => ({
      left:
        target === "left"
          ? [...prev.left.filter((k) => k !== key), key]
          : prev.left.filter((k) => k !== key),
      right:
        target === "right"
          ? [...prev.right.filter((k) => k !== key), key]
          : prev.right.filter((k) => k !== key)
    }));
  };

  const renderSection = (key) => {
    // SUMMARY
    if (key === "summary" && summary) {
      return (
        <div key="summary" className="mb-6">
          <h2 className="text-sm font-semibold mb-1">PROFESSIONAL SUMMARY</h2>
          <div className="h-[1px] bg-slate-200 dark:bg-slate-700 mb-2" />
          <p className="text-xs leading-relaxed text-justify">
            {summary}
          </p>
        </div>
      );
    }

    // SKILLS
    if (key === "skills" && skills.length) {
      return (
        <div key="skills" className="mb-6">
          <h2 className="text-sm font-semibold mb-1">SKILLS</h2>
          <div className="h-[1px] bg-slate-200 dark:bg-slate-700 mb-2" />
          <ul className="list-disc ml-4 text-xs">
            {skills.map((s) => (
              <li key={s.id}>{s.name}</li>
            ))}
          </ul>
        </div>
      );
    }

    // EXPERIENCE
    if (key === "experience" && experience.length) {
      return (
        <div key="experience" className="mb-6">
          <h2 className="text-sm font-semibold mb-1">EXPERIENCE</h2>
          <div className="h-[1px] bg-slate-200 dark:bg-slate-700 mb-2" />

          {experience.map((exp) => (
            <div key={exp.id} className="mb-4">
              <h3 className="font-semibold text-sm">{exp.title}</h3>
              <p className="text-xs opacity-80">
                {exp.company} • {exp.location}
              </p>
              <p className="text-xs opacity-60 mb-1">
                {exp.startDate} – {exp.current ? "Present" : exp.endDate}
              </p>
              <ul className="list-disc ml-4 text-xs">
                {splitIntoBullets(exp.description).map((l, i) => (
                  <li key={i}>{l}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      );
    }

    // EDUCATION
    // EDUCATION
    if (key === "education" && education.length) {
      return (
        <div key="education" className="mb-6">
          <h2 className="text-sm font-semibold mb-1">
            EDUCATION
          </h2>

          <div className="h-[1px] bg-slate-200 dark:bg-slate-700 mb-2" />

          {education.map((edu) => (
            <div key={edu.id} className="mb-4">
              {/* Degree */}
              <h3 className="font-semibold text-sm text-slate-900 dark:text-white">
                {edu.degree}
              </h3>

              {/* Institution + Location */}
              <p className="text-xs text-slate-700 dark:text-slate-300">
                {edu.institution} • {edu.location}
              </p>

              {/* Graduation + GPA */}
              {(edu.graduation || edu.gpa) && (
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">
                  {edu.graduation && <span>{edu.graduation}</span>}
                  {edu.graduation && edu.gpa && " • "}
                  {edu.gpa && <span>GPA: {edu.gpa}</span>}
                </p>
              )}

              {/* Achievements / Courses */}
              {edu.achievements && (
                <ul className="list-disc ml-5 text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                  {edu.achievements
                    .split("\n")
                    .map((line, idx) => (
                      <li key={idx}>{line}</li>
                    ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      );
    }



    // CUSTOM SECTIONS
    if (key.startsWith("custom-")) {
      const id = key.replace("custom-", "");
      const sec = customSections.find((s) => String(s.id) === id);
      if (!sec) return null;

      return (
        <div key={key} className="mb-6">
          <h2 className="text-sm font-semibold mb-1">{sec.title}</h2>
          <div className="h-[1px] bg-slate-200 dark:bg-slate-700 mb-2" />

          {sec.items.map((item) => (
            <div key={item.id} className="mb-3">
              {item.subheading && (
                <h3 className="font-semibold text-sm">{item.subheading}</h3>
              )}
              {item.description && (
                <ul className="list-disc ml-4 text-xs">
                  {splitIntoBullets(item.description).map((l, i) => (
                    <li key={i}>{l}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      );
    }

    return null;
  };

  const [loadingSummary, setLoadingSummary] = useState(false);

  const handleGenerateSummary = async () => {
    try {
      setLoadingSummary(true);

      const res = await axios.post(
        "http://localhost:5000/api/generate-summary",
        {
          personalInfo: {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            location: formData.location,
            linkedin: formData.linkedin,
            website: formData.website
          },
          currentSummary: summary
        }
      );

      // 🔥 Update textarea with AI result
      setSummary(res.data.summary);

    } catch (err) {
      console.error("Summary generation failed", err);
      alert("Failed to generate summary. Please try again.");
    } finally {
      setLoadingSummary(false);
    }
  };

  const highlightPlaceholders = (text) => {
    return text.replace(
      /\[(.*?)\]/g,
      `<span class="bg-yellow-200 dark:bg-yellow-600/40 text-yellow-900 dark:text-yellow-200 px-1 rounded font-semibold">
        [$1]
      </span>`
    );
  };

  const handleUndoOptimization = () => {
    if (!undoSnapshot?.summaryBeforeOptimize) return;

    setSummary(undoSnapshot.summaryBeforeOptimize);
    setUndoSnapshot(null); // clear after undo
  };

  const handleSaveForJob = async () => {
    if (!ensureJobExists()) return;

    try {
      const payload = {
        userId: "zeel123", // TODO: replace with auth user
        company: job.company,
        role: job.role,
        jobDescription: job.jobDescription,

        resumeData: {
          personalInfo: formData,
          summary,
          experience,
          education,
          skills,
          customSections
        },

        atsScore: null,
        matchedSkills: [],
        missingSkills: [],
        aiOptimized: false
      };

      const res = await fetch("http://localhost:5000/api/resumes/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error("Save failed");
      }

      // ✅ SUCCESS UX (Option A)
      toast.success(
        `Saved for ${job.company} – ${job.role} (v${data.saved.version})`,
        { duration: 3000 }
      );

    } catch (err) {
      console.error("Save-for-job error:", err);
      toast.error("Failed to save resume for this job");
    }
  };



  return (
    
    <div className="w-full bg-white dark:bg-[#020617] text-slate-900 dark:text-white pt-20 px-6 pb-24">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
        
        {/* LEFT PANEL */}
        <div className="bg-white/60 dark:bg-[#0a1226] backdrop-blur-xl border border-slate-200 dark:border-slate-700 rounded-xl p-6 shadow-lg">
          
          {/* COLLAPSIBLE SECTION ORDER */}
          <div className="mb-6 p-4 rounded-lg border border-dashed border-slate-300 dark:border-slate-600">
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={() => setShowSectionOrder(!showSectionOrder)}
            >
              <h3 className="font-semibold text-slate-800 dark:text-slate-200">
                Section Order
              </h3>

              <FontAwesomeIcon
                icon={showSectionOrder ? faChevronUp : faChevronDown}
                className="text-slate-700 dark:text-slate-300"
              />
            </div>

            {showSectionOrder && (
              <div className="mt-3">
                {sectionOrder.map((section, index) => {
                  let label = section.replace("-", " ");
                  if (section.startsWith("custom-")) {
                    const id = section.replace("custom-", "");
                    const sec = customSections.find((s) => String(s.id) === id);
                    label = sec?.title || "Custom section";
                  }

                  const column = getSectionColumn(section);

                  return (
                    <div
                      key={section}
                      className="flex items-center justify-between mb-2 
                        bg-white/40 dark:bg-[#0f1b33] px-3 py-2 rounded-lg"
                    >
                      <span className="text-sm font-medium">{label}</span>

                      <div className="flex items-center gap-2">
                        {/* ORDER CONTROLS */}
                        <button
                          onClick={() => moveSection(index, -1)}
                          className="px-2 py-1 rounded bg-slate-200 dark:bg-slate-700
                          hover:bg-slate-300 dark:hover:bg-slate-600"
                        >
                          ↑
                        </button>
                        <button
                          onClick={() => moveSection(index, 1)}
                          className="px-2 py-1 rounded bg-slate-200 dark:bg-slate-700
                          hover:bg-slate-300 dark:hover:bg-slate-600"
                        >
                          ↓
                        </button>

                        {/* COLUMN ASSIGNMENT (Two-column only) */}
                        {isTwoColumn && (
                          <button
                            onClick={() =>
                              moveSectionToColumn(
                                section,
                                column === "left" ? "right" : "left"
                              )
                            }
                            className={`text-xs px-2 py-1 rounded font-semibold
                              ${
                                column === "left"
                                  ? "bg-indigo-100 text-indigo-700"
                                  : "bg-purple-100 text-purple-700"
                              }`}
                          >
                            {column === "left" ? "Left" : "Right"}
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>


          {/* TAB BUTTONS */}
          <div className="flex gap-4 mb-4 text-sm font-medium flex-wrap">
            <button
              className={`px-4 py-2 rounded-lg ${
                activeTab === "personal"
                  ? "bg-purple-600/10 text-purple-600 dark:text-purple-300"
                  : "hover:bg-slate-200/50 dark:hover:bg-slate-700/40"
              }`}
              onClick={() => setActiveTab("personal")}
            >
              <FontAwesomeIcon
                icon={faUser}
                className="ml-2 h-3 w-3 mr-2 text-purple-600 dark:text-purple-300"
              />
              Personal
            </button>

            <button
              className={`px-4 py-2 rounded-lg ${
                activeTab === "experience"
                  ? "bg-purple-600/10 text-purple-600 dark:text-purple-300"
                  : "hover:bg-slate-200/50 dark:hover:bg-slate-700/40"
              }`}
              onClick={() => setActiveTab("experience")}
            >
              <FontAwesomeIcon
                icon={faBriefcase}
                className="ml-2 h-3 w-3 mr-2 text-purple-600 dark:text-purple-300"
              />
              Experience
            </button>

            <button
              className={`px-4 py-2 rounded-lg ${
                activeTab === "education"
                  ? "bg-purple-600/10 text-purple-600 dark:text-purple-300"
                  : "hover:bg-slate-200/50 dark:hover:bg-slate-700/40"
              }`}
              onClick={() => setActiveTab("education")}
            >
              <FontAwesomeIcon
                icon={faGraduationCap}
                className="ml-2 h-3 w-3 mr-2 text-purple-600 dark:text-purple-300"
              />
              Education
            </button>

            <button
              className={`px-4 py-2 rounded-lg ${
                activeTab === "skills"
                  ? "bg-purple-600/10 text-purple-600 dark:text-purple-300"
                  : "hover:bg-slate-200/50 dark:hover:bg-slate-700/40"
              }`}
              onClick={() => setActiveTab("skills")}
            >
              <FontAwesomeIcon
                icon={faWrench}
                className="ml-2 h-3 w-3 mr-2 text-purple-600 dark:text-purple-300"
              />
              Skills
            </button>

            {customSections.map((sec) => (
              <button
                key={sec.id}
                className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
                  activeTab === `custom-${sec.id}`
                    ? "bg-purple-600/10 text-purple-600 dark:text-purple-300"
                    : "hover:bg-slate-200/50 dark:hover:bg-slate-700/40"
                }`}
                onClick={() => setActiveTab(`custom-${sec.id}`)}
              >
                <FontAwesomeIcon
                  icon={getCustomIcon(sec.title)}
                  className="w-3 h-3 text-purple-600 dark:text-purple-300"
                />
                {sec.title}
              </button>
            ))}

            <button
              className="px-4 py-2 rounded-lg hover:bg-slate-200/50 dark:hover:bg-slate-700/40"
              onClick={() => setShowCustomModal(true)}
            >
              <FontAwesomeIcon
                icon={faSquarePlus}
                className="ml-2 h-4 w-4 mr-2 text-purple-600 dark:text-purple-300"
              />
              Add Custom
            </button>
          </div>

          {/* CUSTOM MODAL (UNCHANGED) */}
          {showCustomModal && (
            <div className="mb-6 p-4 rounded-lg border border-dashed border-slate-300 dark:border-slate-600 bg-white/60 dark:bg-[#0f1b33]">
              <h4 className="font-semibold text-slate-800 dark:text-slate-100 mb-3">
                Create Custom Section
              </h4>

              {/* Title */}
              <div className="mb-3">
                <label className="block text-sm font-medium mb-1">
                  Section Title
                </label>
                <input
                  type="text"
                  value={newCustomTitle}
                  onChange={(e) => setNewCustomTitle(e.target.value)}
                  placeholder="Projects, Certifications, Volunteer Work..."
                  className="w-full px-3 py-2 rounded-lg bg-white dark:bg-[#0a1226] 
                  border border-slate-300 dark:border-slate-700 text-sm"
                />
              </div>

              {/* Subheading */}
              <div className="mb-3">
                <label className="block text-sm font-medium mb-1">
                  Sub Heading
                </label>
                <input
                  type="text"
                  value={newCustomSubheading}
                  onChange={(e) => setNewCustomSubheading(e.target.value)}
                  placeholder="Project name, Organization, etc."
                  className="w-full px-3 py-2 rounded-lg bg-white dark:bg-[#0a1226] 
                  border border-slate-300 dark:border-slate-700 text-sm"
                />
              </div>

              {/* Dates */}
              <div className="grid grid-cols-2 gap-3 mb-3">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Start Date
                  </label>
                  <input
                    type="month"
                    value={newCustomStart}
                    onChange={(e) => setNewCustomStart(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-white dark:bg-[#0a1226] 
                    border border-slate-300 dark:border-slate-700 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    End Date
                  </label>
                  <input
                    type="month"
                    value={newCustomEnd}
                    onChange={(e) => setNewCustomEnd(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-white dark:bg-[#0a1226] 
                    border border-slate-300 dark:border-slate-700 text-sm"
                  />
                </div>
              </div>

              {/* Description */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  Description
                </label>
                <textarea
                  rows="3"
                  value={newCustomDesc}
                  onChange={(e) => setNewCustomDesc(e.target.value)}
                  placeholder="Describe what you did..."
                  className="w-full px-3 py-2 rounded-lg bg-white dark:bg-[#0a1226] 
                  border border-slate-300 dark:border-slate-700 text-sm"
                />
              </div>

              {/* Buttons */}
              <div className="flex gap-3 justify-end">
                <button
                  onClick={() => {
                    setShowCustomModal(false);
                    setNewCustomTitle("");
                    setNewCustomSubheading("");
                    setNewCustomStart("");
                    setNewCustomEnd("");
                    setNewCustomDesc("");
                  }}
                  className="px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 
                  text-sm hover:bg-slate-100 dark:hover:bg-slate-700"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    if (!newCustomTitle.trim()) return alert("Enter a title");
                    const id = Date.now().toString();

                    const newSection = {
                      id,
                      title: newCustomTitle.trim(),
                      items: [
                        {
                          id: `${id}-item-1`,
                          subheading: newCustomSubheading.trim(),
                          startDate: newCustomStart,
                          endDate: newCustomEnd,
                          description: newCustomDesc.trim(),
                        },
                      ],
                    };

                    setCustomSections((prev) => [...prev, newSection]);
                    setSectionOrder((prev) => [...prev, `custom-${id}`]);
                    setShowCustomModal(false);
                    setActiveTab(`custom-${id}`);
                  }}
                  className="px-4 py-2 rounded-lg bg-purple-600 text-white text-sm 
                  hover:bg-purple-700"
                >
                  Add Section
                </button>
              </div>
            </div>
          )}

          {/* Divider */}
          <div className="w-full h-[1px] bg-slate-200 dark:bg-slate-700 mb-4" />

          {/* TAB CONTENT (unchanged, too long to collapse) */}
          {/* ---------------------------------------------- */}
          {/* PERSONAL / EXPERIENCE / EDUCATION / CUSTOM... */}
          {/* ---------------------------------------------- */}
          
          {activeTab === "personal" && (
            <div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold mb-1 text-sm">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className="w-full text-sm px-4 py-3 rounded-lg bg-white dark:bg-[#0f1b33] 
                    border border-slate-300 dark:border-slate-700"
                  />
                </div>

                <div>
                  <label className="block font-semibold mb-1 text-sm">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    className="w-full text-sm px-4 py-3 rounded-lg bg-white dark:bg-[#0f1b33] 
                    border border-slate-300 dark:border-slate-700"
                  />
                </div>

                <div>
                  <label className="block font-semibold mb-1 text-sm">Phone</label>
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+1 (555) 123-4567"
                    className="w-full text-sm px-4 py-3 rounded-lg bg-white dark:bg-[#0f1b33] 
                    border border-slate-300 dark:border-slate-700"
                  />
                </div>

                <div>
                  <label className="block font-semibold mb-1 text-sm">Location</label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="New York, NY"
                    className="w-full text-sm px-4 py-3 rounded-lg bg-white dark:bg-[#0f1b33]
                    border border-slate-300 dark:border-slate-700"
                  />
                </div>

                <div>
                  <label className="block font-semibold mb-1 text-sm">LinkedIn</label>
                  <input
                    type="text"
                    name="linkedin"
                    value={formData.linkedin}
                    onChange={handleChange}
                    placeholder="linkedin.com/in/username"
                    className="w-full text-sm px-4 py-3 rounded-lg bg-white dark:bg-[#0f1b33] 
                    border border-slate-300 dark:border-slate-700"
                  />
                </div>

                <div>
                  <label className="block font-semibold mb-1 text-sm">Website</label>
                  <input
                    type="text"
                    name="website"
                    value={formData.website}
                    onChange={handleChange}
                    placeholder="yourportfolio.com"
                    className="w-full text-sm px-4 py-3 rounded-lg bg-white dark:bg-[#0f1b33]
                    border border-slate-300 dark:border-slate-700"
                  />
                </div>
              </div>
              <div className="mt-4">
                <label className="block font-semibold mb-1 text-sm">
                  Professional Summary
                </label>
                <textarea
                  ref={summaryRef}
                  name="summary"
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                  rows="6"
                  placeholder="A short professional summary... You may write 1-2 sentence and use Generate with AI button as well "
                  className="w-full text-sm px-4 py-3 rounded-lg bg-white dark:bg-[#0f1b33]
                  border border-slate-300 dark:border-slate-700"
                />
              </div>
              {summary.includes("[") && (
                <div className="mt-3 p-4 rounded-lg border border-yellow-300 dark:border-yellow-600 bg-yellow-50 dark:bg-yellow-900/20 text-sm">
                  <div className="font-semibold mb-1 text-yellow-800 dark:text-yellow-200">
                    ⚠ Review highlighted sections
                  </div>

                  <div
                    className="leading-relaxed"
                    dangerouslySetInnerHTML={{
                      __html: highlightPlaceholders(summary)
                    }}
                  />
                </div>
              )}
              {undoSnapshot?.summaryBeforeOptimize && (
                <button
                  onClick={handleUndoOptimization}
                  className="
                    mt-2 w-full py-2 rounded-lg
                    bg-amber-100 text-amber-800
                    dark:bg-amber-900/30 dark:text-amber-300
                    border border-amber-300 dark:border-amber-600
                    text-xs font-semibold
                    hover:bg-amber-200 dark:hover:bg-amber-900/50
                    transition
                  "
                >
                  ↩ Undo Optimized Summary
                </button>
              )}
              <button
                onClick={handleGenerateSummary}
                disabled={loadingSummary}
                className="
                  w-full mt-3 py-3 rounded-lg
                  bg-purple-600/10 text-purple-700 dark:text-purple-300
                  border-2 border-dashed border-purple-300 dark:border-purple-500
                  hover:bg-purple-600/20 hover:border-purple-400
                  transition text-xs font-medium
                  disabled:opacity-60 disabled:cursor-not-allowed
                "
              >
                <FontAwesomeIcon
                  icon={faMagicWandSparkles}
                  className="mr-2 h-4 w-4"
                />
                 {loadingSummary ? "Improving summary..." : "Generate / Improve Professional Summary"}
              </button>

              {/* Divider */}
              <div className="w-full h-[1px] bg-slate-200 dark:bg-slate-700 mb-4" />

            </div>
          )}

          {activeTab === "experience" && (
            <ExperienceForm experience={experience} setExperience={setExperience} />
          )}

          {activeTab === "education" && (
            <EducationForm education={education} setEducation={setEducation} />
          )}

          {activeTab === "skills" && (
            <SkillsForm skills={skills} setSkills={setSkills} />
          )}

          {activeTab.startsWith("custom-") && activeCustomSection && (
            <CustomForm
              section={activeCustomSection}
              updateCustomSectionField={(id, f, v) =>
                setCustomSections((prev) =>
                  prev.map((sec) =>
                    sec.id === id ? { ...sec, [f]: v } : sec
                  )
                )
              }
              updateCustomItemField={(sid, iid, f, v) =>
                setCustomSections((prev) =>
                  prev.map((sec) =>
                    sec.id === sid
                      ? {
                          ...sec,
                          items: sec.items.map((item) =>
                            item.id === iid ? { ...item, [f]: v } : item
                          ),
                        }
                      : sec
                  )
                )
              }
              addCustomItem={(sid) =>
                setCustomSections((prev) =>
                  prev.map((sec) =>
                    sec.id === sid
                      ? {
                          ...sec,
                          items: [
                            ...sec.items,
                            {
                              id: `${sid}-item-${Date.now()}`,
                              subheading: "",
                              startDate: "",
                              endDate: "",
                              description: "",
                            },
                          ],
                        }
                      : sec
                  )
                )
              }
              deleteCustomItem={(sid, iid) =>
                setCustomSections((prev) =>
                  prev.map((sec) =>
                    sec.id === sid
                      ? {
                          ...sec,
                          items: sec.items.filter((item) => item.id !== iid),
                        }
                      : sec
                  )
                )
              }
              deleteCustomSection={(sid) => {
                setCustomSections((prev) => prev.filter((sec) => sec.id !== sid));
                setSectionOrder((prev) =>
                  prev.filter((k) => k !== `custom-${sid}`)
                );
                if (activeTab === `custom-${sid}`) {
                  setActiveTab("personal");
                }
              }}
            />
          )}

          {/* Divider */}
          <div className="w-full h-[1px] bg-slate-200 dark:bg-slate-700 mb-4" />

          {/* Save + Download */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4 mt-6">
            <input
              type="text"
              placeholder="Resume Name"
              value={resumeName}
              onChange={(e) => setResumeName(e.target.value)}
              className="px-4 py-2 text-sm rounded-lg bg-white dark:bg-[#0f1b33]
              border border-slate-300 dark:border-slate-700 w-full md:w-1/2"
            />
            <div className="flex gap-3">
              <button
                onClick={() => {
                  if (!ensureJobExists()) return;
                  saveResume();
                }}
                className="px-7 py-2 text-sm rounded-lg bg-purple-600 text-white">
                Save
              </button>


              <button
                onClick={handleDownloadPDF}
                className="px-4 py-2 text-sm rounded-lg border border-purple-600 text-purple-600 
                hover:bg-purple-200 dark:hover:bg-purple-950 dark:hover:text-purple-300  transition"
              >
                Download PDF
              </button>
            </div>
          </div>
         <div className="mt-4 space-y-2">

          {/* Job Context Card */}
          <div
            className="
              relative
              p-4 rounded-xl
              border border-slate-200 dark:border-slate-700
              bg-slate-50 dark:bg-[#0b1220]
            "
          >
            {/* Top-right icons */}
            <div className="absolute top-3 right-3 flex items-center gap-3">
              {/* Edit */}
              <button
                onClick={() => setJobModalOpen(true)}
                className="
                  text-purple-600 dark:text-purple-400
                  hover:text-purple-700 dark:hover:text-purple-300
                  transition
                "
                title="Edit job"
              >
                <FontAwesomeIcon icon={faPen} className="text-sm" />
              </button>

              {/* Clear */}
              {job.company && (
                <button
                  onClick={() => {
                    if (window.confirm("Clear job details?")) {
                      clearJob();
                    }
                  }}
                  className="
                    text-slate-400
                    hover:text-red-600 dark:hover:text-red-400
                    transition
                  "
                  title="Clear job"
                >
                  <FontAwesomeIcon icon={faTrash} className="text-sm" />
                </button>
              )}
            </div>

            {/* Card content */}
            <div className="text-sm">
              <div className="font-semibold text-slate-800 dark:text-slate-200">
                Job Details
              </div>

              {job.company ? (
                <div className="text-slate-600 dark:text-slate-400">
                  {job.company} — {job.role}
                </div>
              ) : (
                <div className="text-slate-500 italic">
                  No job selected
                </div>
              )}
            </div>
          </div>

          {/* Save-for-job action */}
          <div className="flex justify-end">
            <button
              onClick={() => {
                if (!isJobReady) {
                  setJobModalOpen(true); // guide user
                  return;
                }
                handleSaveForJob();
              }}
              disabled={!isJobReady}
              className={`
                flex items-center gap-3
                px-4 py-2.5 rounded-lg
                font-medium text-sm
                transition

                ${
                  isJobReady
                    ? `
                      border border-amber-400/40
                      bg-amber-100/60 dark:bg-amber-900/20
                      text-amber-900 dark:text-amber-300
                      hover:bg-amber-200/70 dark:hover:bg-amber-900/30
                      cursor-pointer
                    `
                    : `
                      border border-slate-300 dark:border-slate-700
                      bg-slate-100 dark:bg-slate-800
                      text-slate-400 dark:text-slate-500
                      cursor-not-allowed
                    `
                }
              `}
              title={
                isJobReady
                  ? "Save resume for this job"
                  : "Add job details to enable this action"
              }
            >
              <FontAwesomeIcon icon={faBriefcase} className="text-sm" />
              <span>Save Resume for This Job</span>
              <span className="opacity-50">→</span>
            </button>
          </div>

        </div>


          <div className="flex items-center gap-3 mt-2">
            <span className="
              text-xs font-medium px-2 py-1 rounded-full
              bg-purple-100 text-purple-700
              dark:bg-purple-900/40 dark:text-purple-300
            ">
              {activeTemplate === "oneColumn"
                ? "Classic One Column"
                : "Classic Two Column"}
            </span>

            <button
              onClick={() => navigate("/templates")}
              className="
                text-xs font-semibold text-purple-600 dark:text-purple-400
                hover:underline transition
              "
            >
              Change Resume Template
            </button>
          </div>


        </div>



        {/* RIGHT PANEL — PREVIEW */}
        <div className="flex justify-center">
          <div
            id="resume-preview"
            className="
              bg-white dark:bg-[#0a0f1e]
              rounded-xl shadow-lg p-10 border border-slate-200 dark:border-slate-800
              w-[794px] min-h-[1123px] overflow-y-auto overflow-x-hidden
              whitespace-normal break-words
            "
          >
            {/* NAME */}
            <h1 className="text-xl font-bold text-center mb-3 text-slate-900 dark:text-white">
              {formData.name || "Your Name"}
            </h1>

            {/* CONTACT */}
            <div className="flex flex-wrap justify-center gap-x-3 gap-y-1 text-sm text-slate-700 dark:text-slate-300 mb-4">
              {formData.email && <span>{formData.email}</span>}
              {formData.phone && <span>{formData.phone}</span>}
              {formData.location && <span>{formData.location}</span>}
              {formData.linkedin && <span>{formData.linkedin}</span>}
              {formData.website && <span>{formData.website}</span>}
            </div>

            <div className="w-full h-[1px] bg-slate-200 dark:bg-slate-700 mb-4" />

            {/* ============================= */}
            {/* ONE COLUMN TEMPLATE */}
            {/* ============================= */}
            {!isTwoColumn && (
              <div>
                {sectionOrder.map((key) => renderSection(key))}
              </div>
            )}

            {/* ============================= */}
            {/* TWO COLUMN TEMPLATE */}
            {/* ============================= */}
            {isTwoColumn && (
              <div className="grid grid-cols-3 gap-6">
                {/* LEFT COLUMN */}
                <div className="col-span-1">
                  {leftSections.map((key) => renderSection(key))}
                </div>

                {/* RIGHT COLUMN */}
                <div className="col-span-2">
                  {rightSections.map((key) => renderSection(key))}
                </div>
              </div>
            )}
          </div>
        </div>


          
      </div>
        <JobModal
          isOpen={jobModalOpen}
          onClose={() => setJobModalOpen(false)}
        />

    </div>
    
  );
};

export default Builder;
