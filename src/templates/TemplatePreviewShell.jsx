const TemplatePreviewShell = ({ children, layout = "one-column" }) => {
  return (
    <div className="flex gap-2 justify-center">

      {/* PAGE 1 — REAL PREVIEW */}
      <div
        className="
          w-[180px] h-[240px]
          bg-white 
          rounded-md
          border border-slate-300
          shadow-sm
          overflow-hidden
          text-[6px] leading-tight
        "
      >
        {children}
      </div>

      {/* PAGE 2 — LAYOUT INDICATOR */}
      <div
        className="
          w-[180px] h-[240px]
          bg-zinc-100
          dark:bg-slate-100
          rounded-md
          border border-slate-300 
          shadow-sm
          p-3
          opacity-80
        "
      >
        {layout === "one-column" ? (
          <OneColumnGhost />
        ) : (
          <TwoColumnGhost />
        )}
      </div>
    </div>
  );
};

/* ---------- Ghost layouts ---------- */

const OneColumnGhost = () => (
  <div className="space-y-2">
    <div className="space-y-[3px]">
      <div className="h-[3px] w-1/3 bg-slate-600 rounded" />
      <div className="h-[2px] bg-slate-400 rounded" />
    </div>
    <div className="space-y-[2px]">
      <div className="h-[2px] bg-slate-300 rounded" />
      <div className="h-[2px] bg-slate-300 rounded w-5/6" />
      <div className="h-[2px] bg-slate-300 rounded w-4/6" />
    </div>

    <div className="space-y-[3px]">
      <div className="h-[3px] w-1/4 bg-slate-600 rounded mt-4" />
      <div className="h-[2px] bg-slate-400 rounded" />
    </div>
    <div className="space-y-[2px]">
      <div className="h-[2px] bg-slate-300 rounded" />
      <div className="h-[2px] bg-slate-300 rounded w-3/4" />
    </div>
  </div>
);

const TwoColumnGhost = () => (
  <div className="flex gap-2">
    {/* LEFT COLUMN */}
    <div className="w-[35%] space-y-1">
      <div className="h-[3px] bg-slate-600 rounded w-3/6" />
      <div className="h-[2px] bg-slate-400 rounded" />
      <div className="space-y-[4px]">
        <div className="h-[2px] bg-slate-300 rounded w-6/6" />
        <div className="h-[2px] bg-slate-300 rounded w-5/6" />
        <div className="h-[2px] bg-slate-300 rounded w-4/6" />
        </div>
    </div>

    {/* RIGHT COLUMN */}
    <div className="w-[65%] space-y-1">
      <div className="h-[3px] bg-slate-600 rounded w-3/6" />
      <div className="h-[2px] bg-slate-400 rounded" />
      <div className="space-y-[4px]">
        <div className="h-[2px] bg-slate-300 rounded w-6/6" />
        <div className="h-[2px] bg-slate-300 rounded w-4/6" />
        <div className="h-[2px] bg-slate-300 rounded w-3/6" />
      </div>
    </div>
  </div>
);

export default TemplatePreviewShell;
