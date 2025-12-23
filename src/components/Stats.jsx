import React from "react";

const Stats = () => {
  return (
    <section className="mx-auto max-w-6xl px-6 mt-4 pb-20">
      <div className="flex flex-col items-center gap-8 sm:flex-row sm:justify-center sm:gap-12">

        <div className="text-center">
          <p className="text-3xl sm:text-4xl font-semibold text-slate-900 dark:text-white">50K+</p>
          <p className="mt-1 text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">Resumes Created</p>
        </div>

        <div className="text-center">
          <p className="text-3xl sm:text-4xl font-semibold text-slate-900 dark:text-white">95%</p>
          <p className="mt-1 text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">ATS Pass Rate</p>
        </div>

        <div className="text-center">
          <p className="text-3xl sm:text-4xl font-semibold text-slate-900 dark:text-white">10K+</p>
          <p className="mt-1 text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">Happy Users</p>
        </div>

      </div>
    </section>
  );
};

export default Stats;
