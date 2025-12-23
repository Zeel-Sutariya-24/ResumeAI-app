import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faMagicWandSparkles,
  faChartBar, 
  faBolt, 
  faShieldAlt, 
} from "@fortawesome/free-solid-svg-icons";
import { 
  faFileLines,
  faCircleCheck
} from "@fortawesome/free-regular-svg-icons";
const Features = () => {
  return (
    <section className="w-full bg-white dark:bg-[#090f20] px-6 py-24">
    <div className="mx-auto max-w-7xl text-center">



      {/* Badge */}
      <div className="inline-flex items-center gap-2 rounded-full bg-purple-100 px-4 py-1 text-xs font-medium text-purple-600 dark:bg-purple-900/30 dark:text-purple-300">
        Features
      </div>

      {/* Heading */}
      <h2 className="mt-6 text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white">
        Everything You Need to Succeed
      </h2>

      {/* Subtext */}
      <p className="mx-auto mt-4 max-w-2xl text-slate-600 dark:text-slate-300 text-base">
        Our powerful tools help you create resumes that stand out and pass through 
        applicant tracking systems.
      </p>

      {/* Grid */}
      <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

        {/* Feature Card 1 */}
        <FeatureCard
          icon={<FontAwesomeIcon icon={faMagicWandSparkles} />}
          title="AI Content Generation"
          color="from-purple-500 to-purple-400"
          text="Let AI help you write compelling job descriptions and summaries that highlight your achievements."
        />

        {/* Feature Card 2 */}
        <FeatureCard
          icon={<FontAwesomeIcon icon={faChartBar} />}
          title="ATS Score Checker"
          color="from-blue-600 to-blue-500"
          text="Analyze your resume against job descriptions and get instant feedback on ATS compatibility."
        />

        {/* Feature Card 3 */}
        <FeatureCard
          icon={<FontAwesomeIcon icon={faFileLines} />}
          title="Professional Templates"
          color="from-pink-600 to-pink-500"
          text="Choose from beautifully designed templates that are both professional and ATS-friendly."
        />

        {/* Feature Card 4 */}
        <FeatureCard
          icon={<FontAwesomeIcon icon={faBolt} />}
          title="Instant Optimization"
          color="from-orange-500 to-orange-400"
          text="Get real-time suggestions to improve your resume's impact and keyword optimization."
        />

        {/* Feature Card 5 */}
        <FeatureCard
          icon={<FontAwesomeIcon icon={faShieldAlt} />}
          title="Privacy First"
          color="from-green-600 to-green-500"
          text="Your data is secure and private. We never share your information with third parties."
        />

        {/* Feature Card 6 */}
        <FeatureCard
          icon={<FontAwesomeIcon icon={faCircleCheck} />}
          title="Keyword Matching"
          color="from-blue-500 to-blue-400"
          text="Automatically match your skills with job requirements to increase your chances."
        />

      </div>
    </div>
    </section>
  );
};

const FeatureCard = ({ icon, title, text, color }) => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 text-left shadow-sm hover:shadow-md transition dark:bg-[#0d112b] dark:border-slate-700 dark:hover:shadow-lg">
      <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${color} text-white text-xl shadow-md`}>
        {icon}
      </div>
      <h3 className="mt-4 text-lg font-semibold text-slate-900 dark:text-white">
        {title}
      </h3>
      <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
        {text}
      </p>
    </div>
  );
};

export default Features;
