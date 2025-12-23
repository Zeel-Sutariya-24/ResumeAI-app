import React, { useRef } from "react";

const FileUpload = ({ setResumeText }) => {
  const inputRef = useRef(null);

  const handleClick = () => {
    inputRef.current.click();
  };

  const handleFile = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("http://localhost:5000/upload/extract-text", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      setResumeText(data.text || "");
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Failed to read resume file.");
    }
  };

  return (
    <div
      onClick={handleClick}
      className="
        border-2 border-dashed border-slate-500/60
        hover:border-blue-500 hover:bg-blue-500/5
        transition-all duration-200
        p-6 rounded-xl text-center cursor-pointer select-none
      "
    >
      <input
        ref={inputRef}
        type="file"
        className="hidden"
        accept=".pdf,.doc,.docx,.txt,.png,.jpg,.jpeg"
        onChange={handleFile}
      />

      <span className="text-blue-400 font-semibold text-base">
        Upload your resume
      </span>

      <p className="text-gray-400 dark:text-gray-500 text-xs mt-1">
        Supports PDF, DOC, DOCX, TXT, PNG, JPG, JPEG
      </p>
    </div>
  );
};

export default FileUpload;
