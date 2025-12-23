import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter, faLinkedin, faGithub } from "@fortawesome/free-brands-svg-icons";
import { faFileContract } from "@fortawesome/free-solid-svg-icons";

const Footer = () => {
  return (
    <footer className="w-full bg-[#f8fafc] dark:bg-[#0f172a] pt-20 pb-12 px-6 border-t border-slate-200/50 dark:border-slate-700/50">

      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-12">

        {/* Branding */}
        <div>
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-tr from-[#7C3AED] to-[#4F46E5] text-white text-xl shadow-md">
              <FontAwesomeIcon icon={faFileContract} className="ml-2 h-5 w-5 mr-2" />
            </div>
            <span className="text-xl font-semibold tracking-tight dark:text-white">
              ResumeAI
            </span>
          </div>

          <p className="mt-4 text-slate-600 dark:text-slate-300 max-w-sm leading-relaxed">
            Create stunning, ATS-optimized resumes powered by AI.  
            Stand out. Get hired. Build your future.
          </p>
        </div>

        {/* Product */}
        <div>
          <h4 className="text-lg font-semibold text-slate-800 dark:text-white mb-4">
            Product
          </h4>

          <ul className="space-y-3">
            <li><Link to="/builder" className="footer-link">Resume Builder</Link></li>
            <li><Link to ="/ats-checker" className="footer-link">ATS Checker</Link></li>
            <li><Link to="/my-resumes" className="footer-link">My Resumes</Link></li>
            <li><Link to="/templates" className="footer-link">Templates</Link></li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h4 className="text-lg font-semibold text-slate-800 dark:text-white mb-4">
            Company
          </h4>

          <ul className="space-y-3">
            <li><button className="footer-link">About</button></li>
            <li><button className="footer-link">Contact</button></li>
            <li><button className="footer-link">Privacy Policy</button></li>
            <li><button className="footer-link">Terms of Use</button></li>
          </ul>
        </div>

        {/* Learn */}
        <div>
          <h4 className="text-lg font-semibold text-slate-800 dark:text-white mb-4">
            Learn
          </h4>

          <ul className="space-y-3">
            <li><a href={`${process.env.REACT_APP_SEO_SITE_URL}/ats-checker`} className="footer-link">ATS Checker</a></li>
            <li><a href={`${process.env.REACT_APP_SEO_SITE_URL}/how-ats-works`} className="footer-link">How ATS Works</a></li>
            <li><a href={`${process.env.REACT_APP_SEO_SITE_URL}/optimize-resume-ats`} className="footer-link">Optimize Resume</a></li>
            <li><a href={`${process.env.REACT_APP_SEO_SITE_URL}/resume-keywords-generator`} className="footer-link">Resume Keywords Generator</a></li>
            <li><a href={`${process.env.REACT_APP_SEO_SITE_URL}/resume-summary-examples`} className="footer-link">Resume Summary Generator</a></li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h4 className="text-lg font-semibold text-slate-800 dark:text-white mb-4">
            Follow Us
          </h4>

          <div className="flex items-center gap-4">
            {[
              { icon: faTwitter, href: "#" },
              { icon: faLinkedin, href: "#" },
              { icon: faGithub, href: "#" },
            ].map((item, i) => (
              <a
                key={i}
                href={item.href}
                className="
                  h-10 w-10 flex items-center justify-center rounded-xl 
                  bg-slate-200 dark:bg-slate-800 
                  text-slate-600 dark:text-slate-300 
                  hover:bg-slate-300 dark:hover:bg-slate-700 hover:scale-105 
                  transition-all
                "
              >
                <FontAwesomeIcon icon={item.icon} className="text-xl" />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Divider + Copyright */}
      <div className="mt-14 pt-6 border-t border-slate-300/60 dark:border-slate-700/60">
        <p className="text-center text-slate-600 dark:text-slate-400 text-sm">
          © 2025 ResumeAI — Built with ❤️ to help you land your dream job.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
