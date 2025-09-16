import React, { useEffect, useRef, useState } from 'react';
import { Code2, Database, Globe, Github, Monitor, Wrench } from 'lucide-react';

interface Skill {
  category: string;
  icon: React.ComponentType<{ className?: string }>;
  skills: string[];
  color: string;
}

const skillsData: Skill[] = [
  {
    category: 'Programming',
    icon: Code2,
    skills: ['Python', 'Basics of C'],
    color: 'from-primary to-primary-glow',
  },
  {
    category: 'Web Development',
    icon: Globe,
    skills: ['HTML5', 'CSS3', 'Django'],
    color: 'from-accent to-secondary',
  },
  {
    category: 'Database',
    icon: Database,
    skills: ['MySQL'],
    color: 'from-secondary to-accent',
  },
  {
    category: 'Tools',
    icon: Github,
    skills: ['GitHub', 'VS Code'],
    color: 'from-accent-bright to-primary',
  },
  {
    category: 'Other Skills',
    icon: Wrench,
    skills: ['Application Testing', 'IoT Development'],
    color: 'from-primary-glow to-accent',
  },
];

const Skills = () => {
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set());
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-index') || '0');
            setTimeout(() => {
              setVisibleItems(prev => new Set([...prev, index]));
            }, index * 200);
          }
        });
      },
      { threshold: 0.3 }
    );

    const skillCards = containerRef.current?.querySelectorAll('.skill-card');
    skillCards?.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  return (
    <section id="skills" className="section-padding bg-surface relative">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="gradient-text">Technical Skills</span>
          </h2>
          <p className="text-xl text-text-secondary max-w-2xl mx-auto">
            Expertise across multiple technologies and frameworks, with a focus on 
            building robust and scalable solutions.
          </p>
        </div>

        {/* Skills grid */}
        <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillsData.map((skillSet, index) => {
            const IconComponent = skillSet.icon;
            const isVisible = visibleItems.has(index);
            
            return (
              <div
                key={skillSet.category}
                data-index={index}
                className={`skill-card group relative p-8 card-elevated rounded-2xl transition-all duration-700 transform hover:scale-105 hover:shadow-elevated cursor-pointer ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
              >
                {/* Gradient background on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${skillSet.color} rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                
                {/* Icon with glow effect */}
                <div className="relative mb-6">
                  <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${skillSet.color} p-4 group-hover:shadow-glow transition-all duration-300`}>
                    <IconComponent className="w-full h-full text-white" />
                  </div>
                </div>

                {/* Category title */}
                <h3 className="text-2xl font-semibold text-white mb-4 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-primary group-hover:to-accent group-hover:bg-clip-text transition-all duration-300">
                  {skillSet.category}
                </h3>

                {/* Skills list */}
                <div className="space-y-3">
                  {skillSet.skills.map((skill, skillIndex) => (
                    <div
                      key={skill}
                      className={`flex items-center space-x-3 transition-all duration-500 ${
                        isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
                      }`}
                      style={{ transitionDelay: `${(index * 200) + (skillIndex * 100)}ms` }}
                    >
                      <div className="w-2 h-2 rounded-full bg-accent group-hover:bg-accent-bright transition-colors duration-300" />
                      <span className="text-text-secondary group-hover:text-white transition-colors duration-300">
                        {skill}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Decorative elements */}
                <div className="absolute top-4 right-4 w-8 h-8 border border-accent/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-4 left-4 w-6 h-6 border border-primary/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            );
          })}
        </div>

        {/* Bottom decorative line */}
        <div className="mt-20 flex justify-center">
          <div className="w-32 h-px bg-gradient-accent opacity-50" />
        </div>
      </div>

      {/* Background decorative elements */}
      <div className="absolute top-20 right-10 w-40 h-40 border border-primary/10 rounded-full animate-float opacity-30" />
      <div className="absolute bottom-20 left-10 w-32 h-32 border border-accent/10 rounded-full animate-float opacity-30" style={{ animationDelay: '2s' }} />
    </section>
  );
};

export default Skills;