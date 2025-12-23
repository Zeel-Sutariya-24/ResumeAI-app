const ScoreCircle = ({ score }) => {
  const normalized = Math.min(Math.max(score, 0), 100);

  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (normalized / 100) * circumference;

  // Correct 3-color logic
  let color = "#22c55e"; // green-500 (BEST)
  if (normalized < 70) color = "#eab308"; // yellow-500 (MEDIUM)
  if (normalized < 40) color = "#dc2626"; // red-600 (LOW)

  return (
    <div className="flex flex-col items-center justify-center mb-8 w-full">
      <div className="relative w-[180px] h-[180px]">

        {/* SVG Circle */}
        <svg className="absolute top-0 left-0 w-full h-full transform -rotate-90">

          {/* Background Track */}
          <circle
            cx="90"
            cy="90"
            r={radius}
            className="stroke-gray-300 dark:stroke-gray-600"
            strokeWidth="14"
            fill="none"
          />

          {/* Progress Stroke */}
          <circle
            cx="90"
            cy="90"
            r={radius}
            stroke={color}
            strokeWidth="14"
            fill="none"
            strokeLinecap="round"
            style={{
              strokeDasharray: circumference,
              strokeDashoffset: offset,
              transition: "stroke-dashoffset 1s ease, stroke 0.3s ease"
            }}
          />
        </svg>

        {/* Score Label */}
        <div className="absolute top-1/2 left-1/2 transform 
                        -translate-x-1/2 -translate-y-1/2 text-center">
          <p className="text-4xl font-extrabold text-gray-800 dark:text-white drop-shadow-md">
            {Math.round(normalized)}%
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
            ATS Match Score
          </p>
        </div>
      </div>
    </div>
  );
};

export default ScoreCircle;
