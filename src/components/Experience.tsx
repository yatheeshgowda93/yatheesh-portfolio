import React, { useEffect, useRef, useState } from 'react';
import { Building2, Calendar, Award, TrendingUp } from 'lucide-react';

interface ExperienceItem {
  company: string;
  role: string;
  period: string;
  type: 'internship' | 'simulation' | 'course';
  icon: React.ComponentType<{ className?: string }>;
  gradient: string;
}

const experiences: ExperienceItem[] = [
  {
    company: 'Maiora Infotech',
    role: 'Application Testing',
    period: 'Oct 2024',
    type: 'internship',
    icon: Building2,
    gradient: 'from-primary to-primary-glow',
  },
  {
    company: 'Tata',
    role: 'GenAI Powered Data Analytics Job Simulation',
    period: 'Aug 2025',
    type: 'simulation',
    icon: TrendingUp,
    gradient: 'from-accent to-secondary',
  },
  {
    company: 'Deloitte',
    role: 'Data Analytics Job Simulation',
    period: 'Jul 2025',
    type: 'simulation',
    icon: TrendingUp,
    gradient: 'from-secondary to-accent',
  },
  {
    company: 'IBM Cognitive Class',
    role: 'Data Analysis with Python',
    period: 'Aug 2025',
    type: 'course',
    icon: Award,
    gradient: 'from-accent-bright to-primary',
  },
];

const Experience = () => {
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
            }, index * 300);
          }
        });
      },
      { threshold: 0.3 }
    );

    const experienceItems = containerRef.current?.querySelectorAll('.experience-item');
    experienceItems?.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, []);

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'internship': return 'text-primary';
      case 'simulation': return 'text-accent';
      case 'course': return 'text-secondary';
      default: return 'text-text-secondary';
    }
  };

  const getTypeBadge = (type: string) => {
    switch (type) {
      case 'internship': return 'Internship';
      case 'simulation': return 'Job Simulation';
      case 'course': return 'Course';
      default: return type;
    }
  };

  return (
    <section id="experience" className="section-padding bg-background relative">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="gradient-text">Experience & Learning</span>
          </h2>
          <p className="text-xl text-text-secondary max-w-2xl mx-auto">
            Hands-on experience through internships, industry simulations, and continuous learning initiatives.
          </p>
        </div>

        {/* Experience timeline */}
        <div ref={containerRef} className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-accent to-secondary opacity-30 transform md:-translate-x-1/2" />

          <div className="space-y-12">
            {experiences.map((exp, index) => {
              const IconComponent = exp.icon;
              const isVisible = visibleItems.has(index);
              const isEven = index % 2 === 0;
              
              return (
                <div
                  key={`${exp.company}-${index}`}
                  data-index={index}
                  className={`experience-item relative flex flex-col md:flex-row items-start md:items-center gap-8 ${
                    isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Timeline node */}
                  <div className="absolute left-8 md:left-1/2 w-4 h-4 transform -translate-x-1/2 z-10">
                    <div className={`w-full h-full rounded-full bg-gradient-to-br ${exp.gradient} ${isVisible ? 'animate-glow-pulse' : ''}`} />
                  </div>

                  {/* Content card */}
                  <div className={`w-full md:w-5/12 ml-16 md:ml-0 transition-all duration-700 ${
                    isVisible 
                      ? 'opacity-100 translate-y-0' 
                      : `opacity-0 ${isEven ? 'md:translate-x-10 translate-y-10' : 'md:-translate-x-10 translate-y-10'}`
                  }`}>
                    <div className="card-elevated p-6 rounded-xl group hover:shadow-elevated transition-all duration-300 hover:scale-105">
                      {/* Header */}
                      <div className="flex items-start gap-4 mb-4">
                        <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${exp.gradient} p-3 group-hover:shadow-glow transition-all duration-300`}>
                          <IconComponent className="w-full h-full text-white" />
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <span className={`px-3 py-1 text-xs font-medium ${getTypeColor(exp.type)} bg-surface rounded-full border border-current/20`}>
                              {getTypeBadge(exp.type)}
                            </span>
                          </div>
                          
                          <h3 className="text-xl font-semibold text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-primary group-hover:to-accent group-hover:bg-clip-text transition-all duration-300">
                            {exp.company}
                          </h3>
                        </div>
                      </div>

                      {/* Role and period */}
                      <div className="space-y-2">
                        <h4 className="text-lg font-medium text-accent group-hover:text-accent-bright transition-colors duration-300">
                          {exp.role}
                        </h4>
                        
                        <div className="flex items-center gap-2 text-text-secondary">
                          <Calendar className="w-4 h-4" />
                          <span>{exp.period}</span>
                        </div>
                      </div>

                      {/* Decorative elements */}
                      <div className="absolute top-3 right-3 w-6 h-6 border border-accent/20 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500" />
                    </div>
                  </div>

                  {/* Spacer for the other side */}
                  <div className="hidden md:block w-5/12" />
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom section */}
        <div className="mt-20 text-center">
          <div className="inline-flex items-center gap-3 text-text-secondary">
            <div className="w-8 h-px bg-gradient-accent" />
            <span className="font-medium">Continuous Learning & Growth</span>
            <div className="w-8 h-px bg-gradient-accent" />
          </div>
        </div>
      </div>

      {/* Background decorative elements */}
      <div className="absolute top-32 left-10 w-24 h-24 border border-primary/10 rounded-full animate-float opacity-30" />
      <div className="absolute bottom-32 right-10 w-32 h-32 border border-accent/10 rounded-full animate-float opacity-30" style={{ animationDelay: '3s' }} />
    </section>
  );
};

export default Experience;