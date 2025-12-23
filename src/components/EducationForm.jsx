import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGraduationCap } from "@fortawesome/free-solid-svg-icons";
import { FaTrash } from "react-icons/fa";

const EducationForm = ({ education, setEducation }) => {
  
  const addEducation = () => {
    setEducation([
      ...education,
      {
        id: Date.now(),
        degree: "",
        institution: "",
        location: "",
        graduation: "",
        gpa: "",
        achievements: "",
      },
    ]);
  };

  const updateField = (id, field, value) => {
    setEducation(
      education.map((e) =>
        e.id === id ? { ...e, [field]: value } : e
      )
    );
  };

  const deleteEducation = (id) => {
    setEducation(education.filter((e) => e.id !== id));
  };

  return (
    <div>
      {education.map((edu, index) => (
        <div
          key={edu.id}
          className="border text-sm border-slate-200 dark:border-slate-700 rounded-xl p-5 mb-6 bg-white dark:bg-[#0A1226]"
        >
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-semibold text-base flex items-center gap-2">
            <div className="inline-flex items-center rounded-full bg-purple-100 px-1 pr-3 py-1 text-xs font-medium text-[#7C3AED] shadow-sm dark:bg-[#0f1b33]">
                <FontAwesomeIcon icon={faGraduationCap} className="ml-2 h-4 w-4 text-[#4C3CFF]" />
            </div>
                Education {index + 1}
            </h2>

            {/* Delete button */}
            <button
              onClick={() => deleteEducation(edu.id)}
              className="text-red-500 hover:text-red-700"
            >
              <FaTrash size={15}/>
            </button>
          </div>

          {/* DEGREE + INSTITUTION */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block font-semibold mb-1">Degree</label>
              <input
                type="text"
                value={edu.degree}
                onChange={(e) => updateField(edu.id, "degree", e.target.value)}
                placeholder="Bachelor of Science..."
                className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#0f1b33]"
              />
            </div>

            <div>
              <label className="block font-semibold mb-1">Institution</label>
              <input
                type="text"
                value={edu.institution}
                onChange={(e) =>
                  updateField(edu.id, "institution", e.target.value)
                }
                placeholder="Harvard University"
                className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#0f1b33]"
              />
            </div>
          </div>

          {/* LOCATION + GRADUATION + GPA */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block font-semibold mb-1">Location</label>
              <input
                type="text"
                value={edu.location}
                onChange={(e) =>
                  updateField(edu.id, "location", e.target.value)
                }
                placeholder="Cambridge, MA"
                className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#0f1b33]"
              />
            </div>

            <div>
              <label className="block font-semibold mb-1">Graduation</label>
              <input
                type="text"
                value={edu.graduation}
                onChange={(e) =>
                  updateField(edu.id, "graduation", e.target.value)
                }
                placeholder="2024"
                className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#0f1b33]"
              />
            </div>

            <div>
              <label className="block font-semibold mb-1">GPA</label>
              <input
                type="text"
                value={edu.gpa}
                onChange={(e) => updateField(edu.id, "gpa", e.target.value)}
                placeholder="3.8 / 4.0"
                className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#0f1b33]"
              />
            </div>
          </div>

          {/* ACHIEVEMENTS */}
          <div>
            <label className="block font-semibold mb-1">
              Achievements & Activities
            </label>
            <textarea
              rows="4"
              value={edu.achievements}
              onChange={(e) =>
                updateField(edu.id, "achievements", e.target.value)
              }
              placeholder="Dean’s List, Clubs, Awards..."
              className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#0f1b33]"
            ></textarea>
          </div>
        </div>
      ))}

      {/* ADD EDUCATION BUTTON */}
      <button
        onClick={addEducation}
        className="w-full cursor-pointer border border-dashed border-slate-300 dark:border-slate-600 rounded-xl p-4 text-center 
        text-slate-600 dark:text-slate-300 hover:border-[#4f46e5] dark:hover:border-[#4f46e5] hover:bg-purple-100 dark:hover:bg-slate-700/20 transition mb-6"
      >
        + Add Education
      </button>
    </div>
  );
};

export default EducationForm;
