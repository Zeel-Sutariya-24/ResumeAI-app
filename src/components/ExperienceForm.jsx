import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCity } from "@fortawesome/free-solid-svg-icons";
import { FaTrash } from "react-icons/fa";

const ExperienceForm = ({ experience, setExperience }) => {
  
  // Add blank experience block
  const addExperience = () => {
    setExperience([
      ...experience,
      {
        id: Date.now(),
        title: "",
        company: "",
        location: "",
        startDate: "",
        endDate: "",
        current: false,
        description: "",
      },
    ]);
  };

  // Update field
  const updateField = (id, field, value) => {
    setExperience(
      experience.map((exp) =>
        exp.id === id ? { ...exp, [field]: value } : exp
      )
    );
  };

  // Delete experience item
  const deleteExperience = (id) => {
    setExperience(experience.filter((exp) => exp.id !== id));
  };

  return (
    <div>

      {/* ---- Tabs already handled in Builder ---- */}

      {/* Experience Items */}
      {experience.map((exp) => (
        <div
          key={exp.id}
          className="mb-6 p-5 text-sm border rounded-xl bg-white dark:bg-[#0a1226] border-slate-200 dark:border-slate-700 shadow-sm"
        >
          {/* Title Row + Delete Button */}
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-semibold text-base text-slate-800 dark:text-white">
              <div className="inline-flex items-center mr-2 rounded-full bg-purple-100 px-1 pr-3 py-1 text-xs font-medium text-[#7C3AED] shadow-sm dark:bg-[#0f1b33]">
                <FontAwesomeIcon icon={faCity} className="ml-2 h-4 w-4 text-[#4C3CFF]" />
              </div>
              Experience
            </h3>

            <button
              onClick={() => deleteExperience(exp.id)}
              className="text-red-500 hover:text-red-700"
            >
              <FaTrash size={15} />
            </button>
          </div>

          {/* ---------------- ROW 1: Job Title | Company ---------------- */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {/* Job Title */}
            <div>
              <label className="block font-semibold mb-1">Job Title</label>
              <input
                type="text"
                value={exp.title}
                onChange={(e) => updateField(exp.id, "title", e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-white dark:bg-[#0f1b33] border border-slate-300 dark:border-slate-600 mb-3"
                placeholder="Software Engineer"
              />
            </div>

            {/* Company */}
            <div>
              <label className="block font-semibold mb-1">Company</label>
              <input
                type="text"
                value={exp.company}
                onChange={(e) => updateField(exp.id, "company", e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-white dark:bg-[#0f1b33] border border-slate-300 dark:border-slate-600 mb-3"
                placeholder="Google"
              />
            </div>
          </div>

          {/* ---------------- ROW 2: Location | Start | End ---------------- */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {/* Location */}
            <div>
              <label className="block font-semibold mb-1">Location</label>
              <input
                type="text"
                value={exp.location}
                onChange={(e) => updateField(exp.id, "location", e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-white dark:bg-[#0f1b33] border border-slate-300 dark:border-slate-600 mb-3"
                placeholder="Calgary, AB"
              />
            </div>

            {/* Start Date */}
            <div>
              <label className="block font-semibold mb-1">Start Date</label>
              <input
                type="month"
                value={exp.startDate}
                onChange={(e) => updateField(exp.id, "startDate", e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-white dark:bg-[#0f1b33] border border-slate-300 dark:border-slate-600 mb-3"
              />
            </div>

            {/* End Date */}
            <div>
              <label className="block font-semibold mb-1">End Date</label>
              <input
                type="month"
                disabled={exp.current}
                value={exp.endDate}
                onChange={(e) => updateField(exp.id, "endDate", e.target.value)}
                className={`w-full px-4 py-2 rounded-lg bg-white dark:bg-[#0f1b33] border border-slate-300 dark:border-slate-600 mb-1 ${
                  exp.current ? "opacity-40 cursor-not-allowed" : ""
                }`}
              />

              {/* Checkbox */}
              <label className="flex items-center gap-2 mt-1 text-sm cursor-pointer">
                <input
                  type="checkbox"
                  checked={exp.current}
                  onChange={() => updateField(exp.id, "current", !exp.current)}
                />
                I currently work here
              </label>
            </div>
          </div>

          {/* ---------------- ROW 3: Description ---------------- */}
          <label className="block font-semibold mb-1">Description</label>
          <textarea
            rows="4"
            value={exp.description}
            onChange={(e) => updateField(exp.id, "description", e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-white dark:bg-[#0f1b33] border border-slate-300 dark:border-slate-600"
            placeholder=" • Led Development by key features.
                  • Improved system performance by 40%.
                  • Mentored Junior Developers."
          />
        </div>
      ))}

      {/* Add Experience Button */}
      <div
        onClick={addExperience}
        className="cursor-pointer border border-dashed border-slate-300 dark:border-slate-600 rounded-xl p-4 text-center 
        text-slate-600 dark:text-slate-300 hover:border-[#4f46e5] dark:hover:border-[#4f46e5] hover:bg-purple-100 dark:hover:bg-slate-700/20 transition mb-6"
      >
        + Add Experience
      </div>
    </div>
  );
};

export default ExperienceForm;
