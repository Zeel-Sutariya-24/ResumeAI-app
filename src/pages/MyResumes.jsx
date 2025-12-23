import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

/* =========================
   Helpers
========================= */

const sortResumes = (list, sortBy) => {
  const sorted = [...list];

  switch (sortBy) {
    case "role":
      sorted.sort((a, b) => a.role.localeCompare(b.role));
      break;
    case "version":
      sorted.sort((a, b) => b.version - a.version);
      break;
    case "date":
      sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      break;
    case "company":
    default:
      sorted.sort((a, b) => a.company.localeCompare(b.company));
  }

  return sorted;
};

const groupByCompanyAndRole = (resumes) => {
  return resumes.reduce((acc, r) => {
    if (!acc[r.company]) acc[r.company] = {};
    if (!acc[r.company][r.role]) acc[r.company][r.role] = [];

    acc[r.company][r.role].push(r);

    // newest version first
    acc[r.company][r.role].sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );

    return acc;
  }, {});
};

/* =========================
   Component
========================= */

const MyResumes = () => {
  const navigate = useNavigate();
  const userId = "zeel123"; // TODO: replace with auth

  const [loading, setLoading] = useState(true);
  const [resumes, setResumes] = useState([]);
  const [sortBy, setSortBy] = useState("company");

  /* =========================
     Fetch resumes
  ========================= */

  useEffect(() => {
    const fetchResumes = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/api/resumes/${userId}`
        );
        const data = await res.json();

        if (!res.ok || !data.success) {
          throw new Error("Fetch failed");
        }

        setResumes(data.resumes);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load resumes");
      } finally {
        setLoading(false);
      }
    };

    fetchResumes();
  }, []);

  /* =========================
     Actions
  ========================= */

  const handleLoadResume = async (resumeId) => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/resumes/version/${resumeId}`
      );
      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error("Failed to load resume");
      }

      navigate("/builder", {
        state: {
          loadedResume: data.resume
        }
      });
    } catch (err) {
      console.error(err);
      toast.error("Failed to load resume");
    }
  };

  const handleDeleteResume = async (resume) => {
    // Optimistic UI
    setResumes((prev) => prev.filter((r) => r._id !== resume._id));

    toast(
      (t) => (
        <div className="flex items-center gap-3">
          <span>Resume deleted</span>
          <button
            onClick={() => {
              setResumes((prev) => [resume, ...prev]);
              toast.dismiss(t.id);
            }}
            className="font-semibold text-purple-600 hover:underline"
          >
            Undo
          </button>
        </div>
      ),
      { duration: 5000 }
    );

    try {
      await fetch(
        `http://localhost:5000/api/resumes/${resume._id}`,
        { method: "DELETE" }
      );
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete resume");
    }
  };

  /* =========================
     Prepare data
  ========================= */

  const sortedResumes = sortResumes(resumes, sortBy);
  const groupedResumes = groupByCompanyAndRole(sortedResumes);

  /* =========================
     Render
  ========================= */

  return (
    <div className="min-h-screen bg-white dark:bg-[#020617] pt-24 px-6 pb-24">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
              My Resumes
            </h1>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Job-specific resume versions you’ve saved
            </p>
          </div>

          <div className="flex items-center gap-3">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="
                px-3 py-2 rounded-lg text-sm
                border border-slate-300 dark:border-slate-700
                bg-white dark:bg-[#0b1220]
                text-slate-800 dark:text-slate-200
              "
            >
              <option value="company">Sort by Company</option>
              <option value="role">Sort by Job Title</option>
              <option value="date">Sort by Date</option>
              <option value="version">Sort by Version</option>
            </select>

            <button
              onClick={() => navigate("/builder")}
              className="
                px-4 py-2 rounded-lg text-sm font-medium
                border border-slate-300 dark:border-slate-600
                bg-white dark:bg-[#0b1220]
                text-slate-800 dark:text-slate-200
                hover:bg-slate-100 dark:hover:bg-slate-800
                transition
              "
            >
              Create New
            </button>
          </div>
        </div>

        {/* Content */}
        {loading ? (
          <div className="text-slate-500">Loading…</div>
        ) : resumes.length === 0 ? (
          <div className="
            p-8 rounded-xl
            border border-dashed border-slate-300 dark:border-slate-700
            text-center text-slate-500
          ">
            No saved resumes yet. 
            <p className="text-sm">Save a resume for a Job from the Builder to see it here.</p>
          </div>
        ) : (
          Object.entries(groupedResumes).map(([company, roles]) => (
            <div key={company} className="mb-10">

              {/* Company */}
              <h3 className="mb-4 text-lg font-semibold text-slate-800 dark:text-slate-200">
                {company}
              </h3>

              {Object.entries(roles).map(([role, versions]) => (
                <div key={role} className="mb-4 ml-2">

                  {/* Job Title */}
                  <div className="mb-2 text-sm font-medium text-slate-700 dark:text-slate-200">
                    {role}
                  </div>

                  <div className="space-y-2">
                    {versions.map((r) => (
                      <div
                        key={r._id}
                        className="
                          p-4 rounded-xl
                          border border-slate-200 dark:border-slate-700
                          bg-slate-50 dark:bg-[#0b1220]
                        "
                      >
                        <div className="flex items-center justify-between">
                          <div className="text-xs text-slate-500">
                            {new Date(r.createdAt).toLocaleString()}
                          </div>

                          <div className="flex items-center gap-4">
                            <span className="
                              text-xs px-2 py-0.5 rounded-full
                              bg-slate-200 dark:bg-slate-700
                              text-slate-700 dark:text-slate-300
                            ">
                              v{r.version}
                            </span>

                            <button
                              onClick={() => handleLoadResume(r._id)}
                              className="text-xs font-medium
                                         text-purple-600 dark:text-purple-400
                                         hover:underline"
                            >
                              Load
                            </button>

                            <button
                              onClick={() => handleDeleteResume(r)}
                              className="text-xs font-medium
                                         text-red-600 dark:text-red-400
                                         hover:underline"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ))
        )}

      </div>
    </div>
  );
};

export default MyResumes;
