import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Hero from "../sections/Hero";
import About from "../sections/About";
import Initiatives from "../sections/Initiatives";
import Skills from "../sections/Skills";
import Experience from "../sections/Experience";
import Dashboard from "../sections/Dashboard";
import ResumeCenter from "../sections/ResumeCenter";
import Contact from "../sections/Contact";

const HomePage = () => {
  const { hash } = useLocation();

  // Support /#section deep links arriving from detail pages
  useEffect(() => {
    if (hash) {
      // Wait a frame so sections are mounted before scrolling
      requestAnimationFrame(() => {
        document.querySelector(hash)?.scrollIntoView({ behavior: "smooth" });
      });
    }
  }, [hash]);

  return (
    <>
      <Hero />
      <About />
      <Initiatives />
      <Skills />
      <Experience />
      <Dashboard />
      <ResumeCenter />
      <Contact />
    </>
  );
};

export default HomePage;
