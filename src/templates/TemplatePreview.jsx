const TemplatePreviewShell = ({ children }) => {
  return (
    <div
      className="
        bg-white dark:bg-[#0a0f1e]
        border border-slate-200 dark:border-slate-700
        rounded-xl shadow-md
        p-4
        h-[360px]
        overflow-hidden
      "
    >
      <div className="scale-[0.85] origin-top pointer-events-none">
        {children}
      </div>
    </div>
  );
};

export default TemplatePreviewShell;
