import React, { useEffect } from 'react';
import Navigation from '../components/Navigation';
import Hero from '../components/Hero';
import Skills from '../components/Skills';
import Experience from '../components/Experience';
import Projects from '../components/Projects';
import Certifications from '../components/Certifications';
import Contact from '../components/Contacts';

const Index = () => {
  useEffect(() => {
    // Intersection Observer for section animations
    const observeElements = () => {
      const sections = document.querySelectorAll('.section-transition');
      
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('visible');
            }
          });
        },
        { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
      );

      sections.forEach((section) => observer.observe(section));
      
      return () => observer.disconnect();
    };

    observeElements();
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      <main>
        {/* Hero Section */}
        <Hero />
        
        {/* About Section - Skills serve as the about section */}
        <div id="about">
          <Skills />
        </div>
        
        {/* Experience Section */}
        <Experience />
        
        {/* Projects Section */}
        <Projects />
        
        {/* Certifications Section */}
        <Certifications />
        
        {/* Contact Section */}
        <Contact />
      </main>
    </div>
  );
};

export default Index;