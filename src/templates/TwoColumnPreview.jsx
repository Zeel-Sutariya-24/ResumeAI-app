import TemplatePreviewShell from "./TemplatePreviewShell";

const TwoColumnPreview = ({ isMini = false }) => {
  return (
    <TemplatePreviewShell layout="two-column">
      <div className="p-3 text-[6px] leading-tight font-sans">

        {/* NAME */}
        <div className="h-[6px] w-2/3 bg-slate-800 mx-auto mb-2 rounded-sm" />

        {/* CONTACT */}
        <div className="flex justify-center gap-1 mb-3">
          <div className="h-[2px] w-10 bg-slate-400 rounded" />
          <div className="h-[2px] w-8 bg-slate-400 rounded" />
          <div className="h-[2px] w-12 bg-slate-400 rounded" />
        </div>

        {/* HEADER DIVIDER */}
        <div className="h-[1px] bg-slate-600 mb-3" />

        {/* TWO COLUMNS */}
        <div className="flex gap-2">

          {/* LEFT COLUMN (35%) */}
          <div className="w-[35%] space-y-3">

            {["Summary", "Skills", "Education"].map((_, i) => (
              <div key={i}>

                {/* SECTION TITLE */}
                <div className="h-[3px] w-3/4 bg-slate-700 mb-1 rounded-sm" />

                {/* SECTION DIVIDER */}
                <div className="h-[1px] bg-slate-600 mb-1" />

                {/* CONTENT */}
                <div className="space-y-[2px] pl-1">
                  <div className="h-[2px] bg-slate-400 rounded" />
                  <div className="h-[2px] bg-slate-400 rounded w-4/5" />
                </div>
              </div>
            ))}

          </div>

          {/* RIGHT COLUMN (65%) */}
          <div className="w-[65%] space-y-3">

            {["Experience", "Projects"].map((_, i) => (
              <div key={i}>

                {/* SECTION TITLE */}
                <div className="h-[3px] w-1/2 bg-slate-700 mb-1 rounded-sm" />

                {/* SECTION DIVIDER */}
                <div className="h-[1px] bg-slate-600 mb-1" />

                {/* CONTENT */}
                <div className="space-y-[2px] pl-1">
                  <div className="h-[2px] bg-slate-400 rounded" />
                  <div className="h-[2px] bg-slate-400 rounded w-5/6" />
                  <div className="h-[2px] bg-slate-400 rounded w-4/6" />
                </div>
              </div>
            ))}

          </div>

        </div>
      </div>
    </TemplatePreviewShell>
  );
};

export default TwoColumnPreview;
