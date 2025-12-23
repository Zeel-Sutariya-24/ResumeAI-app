import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightLong } from "@fortawesome/free-solid-svg-icons";

const CtaSection = () => {
  return (
    <section
      className="
        w-full py-28 px-6
        bg-gradient-to-r from-[#6A4DFF] to-[#4C3CFF]
        relative overflow-hidden
        text-center
      "
    >

      <div className="relative z-10 max-w-3xl mx-auto">
        {/* Heading */}
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
          Ready to Land Your Dream Job?
        </h2>

        {/* Subtext */}
        <p className="mt-6 text-[17px] text-white/90 leading-relaxed">
          Join thousands of job seekers who have successfully created
          professional resumes and landed interviews.
        </p>

        {/* Button */}
        <div className="mt-10 flex justify-center">
          <Link to="/builder"
            type="button"
            className="
              inline-flex items-center gap-2
              bg-white text-[#4C3CFF]
              px-10 py-4 text-lg font-semibold
              rounded-2xl shadow-lg hover:shadow-xl
              hover:translate-y-[1px] transition-all
            "
          >
            Create Your Resume Now
            <FontAwesomeIcon icon={faArrowRightLong} className="ml-2 h-5 w-5" />

          </Link>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
