import React, { useState, useEffect } from "react";
import { useJob } from "../context/JobContext";

const JobModal = ({ isOpen, onClose }) => {
  const { job, setJob } = useJob();

  const [localJob, setLocalJob] = useState({
    company: "",
    role: "",
    jobDescription: ""
  });

  // Load existing job into modal when opened
  useEffect(() => {
    if (isOpen) {
      setLocalJob(job);
    }
  }, [isOpen, job]);

  if (!isOpen) return null;

  const handleSave = () => {
    if (!localJob.company || !localJob.role || !localJob.jobDescription) {
      alert("Please fill all job fields");
      return;
    }

    setJob(localJob);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white dark:bg-[#0a0f1e] w-full max-w-xl rounded-xl p-6 shadow-xl">

        <h2 className="text-xl font-semibold mb-4">
          Job Details
        </h2>

        <div className="space-y-4">

          <input
            type="text"
            className="w-full border rounded px-3 py-2 dark:bg-transparent"
            placeholder="Company (e.g. IBM)"
            value={localJob.company}
            onChange={(e) =>
              setLocalJob({ ...localJob, company: e.target.value })
            }
          />

          <input
            type="text"
            className="w-full border rounded px-3 py-2 dark:bg-transparent"
            placeholder="Role (e.g. ServiceNow Developer)"
            value={localJob.role}
            onChange={(e) =>
              setLocalJob({ ...localJob, role: e.target.value })
            }
          />

          <textarea
            className="w-full border rounded px-3 py-2 h-40 dark:bg-transparent"
            placeholder="Paste full job description here"
            value={localJob.jobDescription}
            onChange={(e) =>
              setLocalJob({ ...localJob, jobDescription: e.target.value })
            }
          />

        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button
            className="px-4 py-2 border rounded"
            onClick={onClose}
          >
            Cancel
          </button>

          <button
            className="px-4 py-2 bg-blue-600 text-white rounded"
            onClick={handleSave}
          >
            Save Job
          </button>
        </div>

      </div>
    </div>
  );
};

export default JobModal;
