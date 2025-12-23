import React, { createContext, useContext, useState } from "react";

const JobContext = createContext();

export const JobProvider = ({ children }) => {
  const [job, setJob] = useState({
    company: "",
    role: "",
    jobDescription: ""
  });

  const clearJob = () => {
    setJob({
      company: "",
      role: "",
      jobDescription: ""
    });
  };

  return (
    <JobContext.Provider value={{ job, setJob, clearJob }}>
      {children}
    </JobContext.Provider>
  );
};

export const useJob = () => useContext(JobContext);
