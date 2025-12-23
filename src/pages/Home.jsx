import React from "react";
import Hero from "../components/Hero";
import Features from "../components/Features";
import HowItWorks from "../components/HowItWorks";
import CtaSection from "../components/CtaSection";

const Home = () => {
  return (
    <div className="w-full overflow-hidden">
      <Hero />
      <Features />
      <HowItWorks />
      <CtaSection />
    </div>
  );
};

export default Home;
