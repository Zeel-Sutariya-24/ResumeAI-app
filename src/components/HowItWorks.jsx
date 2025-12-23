import React from "react";

const HowItWorks = () => {
  return (
    <section className="w-full py-24 px-6 bg-transparent dark:bg-[#020617]">
      
      {/* Badge */}
      <div className="flex justify-center">
        <div className="inline-flex items-center gap-2 rounded-full bg-purple-100 px-4 py-1 text-xs font-medium text-purple-700 shadow-sm dark:bg-[#23194D] dark:text-[#c7b8ff]">
          How It Works
        </div>
      </div>

      {/* Heading */}
      <h2 className="mt-6 text-center text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 dark:text-white">
        Create Your Resume in 3 Easy Steps
      </h2>

      {/* Steps */}
      <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-16 max-w-6xl mx-auto text-center">

        {/* STEP 1 */}
        <div>
          <div className="text-5xl font-extrabold text-purple-600 dark:text-purple-300">01</div>
          <h3 className="mt-4 text-xl font-semibold text-slate-900 dark:text-white">
            Enter Your Details
          </h3>
          <p className="mt-3 text-slate-600 dark:text-slate-300">
            Fill in your information or let AI help you generate content.
          </p>
        </div>

        {/* STEP 2 */}
        <div>
          <div className="text-5xl font-extrabold text-purple-600 dark:text-purple-300">02</div>
          <h3 className="mt-4 text-xl font-semibold text-slate-900 dark:text-white">
            Choose a Template
          </h3>
          <p className="mt-3 text-slate-600 dark:text-slate-300">
            Select from our collection of professional, ATS-friendly templates.
          </p>
        </div>

        {/* STEP 3 */}
        <div>
          <div className="text-5xl font-extrabold text-purple-600 dark:text-purple-300">03</div>
          <h3 className="mt-4 text-xl font-semibold text-slate-900 dark:text-white">
            Download & Apply
          </h3>
          <p className="mt-3 text-slate-600 dark:text-slate-300">
            Export your resume as PDF and start applying to your dream jobs.
          </p>
        </div>

      </div>
    </section>
  );
};

export default HowItWorks;
