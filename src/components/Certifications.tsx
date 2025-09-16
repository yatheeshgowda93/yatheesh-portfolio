import React, { useEffect, useRef, useState } from 'react';
import { Award, Calendar, ExternalLink } from 'lucide-react';

interface Certification {
  organization: string;
  title: string;
  period: string;
  gradient: string;
  category: 'programming' | 'analytics' | 'testing';
}

const certifications: Certification[] = [
  {
    organization: 'NPTEL',
    title: 'Programming in Java',
    period: 'Feb–May 2025',
    gradient: 'from-primary to-primary-glow',
    category: 'programming',
  },
  {
    organization: 'Maiora',
    title: 'Application Testing',
    period: 'Oct 2024',
    gradient: 'from-accent to-secondary',
    category: 'testing',
  },
  {
    organization: 'IBM Cognitive Class',
    title: 'Data Analysis with Python',
    period: 'Aug 2025',
    gradient: 'from-secondary to-accent',
    category: 'analytics',
  },
  {
    organization: 'Tata',
    title: 'GenAI Powered Data Analytics Job Simulation',
    period: 'Aug 2025',
    gradient: 'from-accent-bright to-primary',
    category: 'analytics',
  },
  {
    organization: 'Deloitte',
    title: 'Data Analytics Job Simulation',
    period: 'Jul 2025',
    gradient: 'from-primary-glow to-accent',
    category: 'analytics',
  },
];

const Certifications = () => {
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
            }, index * 150);
          }
        });
      },
      { threshold: 0.3 }
    );

    const certCards = containerRef.current?.querySelectorAll('.cert-card');
    certCards?.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'programming': return 'text-primary';
      case 'analytics': return 'text-accent';
      case 'testing': return 'text-secondary';
      default: return 'text-text-secondary';
    }
  };

  const getCategoryBadge = (category: string) => {
    switch (category) {
      case 'programming': return 'Programming';
      case 'analytics': return 'Data Analytics';
      case 'testing': return 'Testing';
      default: return category;
    }
  };

  return (
    <section id="certifications" className="section-padding bg-background relative">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="gradient-text">Certifications & Achievements</span>
          </h2>
          <p className="text-xl text-text-secondary max-w-2xl mx-auto">
            Continuous learning through industry-recognized certifications and professional development programs.
          </p>
        </div>

        {/* Certifications grid */}
        <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {certifications.map((cert, index) => {
            const isVisible = visibleItems.has(index);
            
            return (
              <div
                key={`${cert.organization}-${cert.title}`}
                data-index={index}
                className={`cert-card group relative transition-all duration-700 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
              >
                <div className="card-elevated p-6 rounded-xl hover:shadow-elevated transition-all duration-300 hover:scale-105 cursor-pointer h-full">
                  {/* Gradient background overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${cert.gradient} rounded-xl opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
                  
                  {/* Header */}
                  <div className="relative flex items-start gap-4 mb-4">
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${cert.gradient} p-3 group-hover:shadow-glow transition-all duration-300`}>
                      <Award className="w-full h-full text-white" />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className={`px-3 py-1 text-xs font-medium ${getCategoryColor(cert.category)} bg-surface rounded-full border border-current/20`}>
                          {getCategoryBadge(cert.category)}
                        </span>
                      </div>
                      
                      <h3 className="text-lg font-semibold text-accent group-hover:text-accent-bright transition-colors duration-300">
                        {cert.organization}
                      </h3>
                    </div>

                    {/* External link icon */}
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <ExternalLink className="w-5 h-5 text-text-muted hover:text-accent transition-colors duration-200" />
                    </div>
                  </div>

                  {/* Certification details */}
                  <div className="relative space-y-3">
                    <h4 className="text-xl font-semibold text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-primary group-hover:to-accent group-hover:bg-clip-text transition-all duration-300 leading-snug">
                      {cert.title}
                    </h4>
                    
                    <div className="flex items-center gap-2 text-text-secondary">
                      <Calendar className="w-4 h-4" />
                      <span>{cert.period}</span>
                    </div>
                  </div>

                  {/* Decorative elements */}
                  <div className="absolute bottom-4 right-4 w-6 h-6 border border-accent/20 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500" />
                  <div className="absolute top-4 right-16 w-4 h-4 border border-primary/20 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100" />

                  {/* Hover gradient line */}
                  <div className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${cert.gradient} rounded-b-xl transition-all duration-300 w-0 group-hover:w-full`} />
                </div>
              </div>
            );
          })}
        </div>

        {/* Stats summary */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div className="space-y-2">
            <div className="text-3xl font-bold gradient-text">5</div>
            <div className="text-text-secondary">Certifications</div>
          </div>
          <div className="space-y-2">
            <div className="text-3xl font-bold gradient-text">3</div>
            <div className="text-text-secondary">Specializations</div>
          </div>
          <div className="space-y-2">
            <div className="text-3xl font-bold gradient-text">2024-25</div>
            <div className="text-text-secondary">Active Learning</div>
          </div>
        </div>

        {/* Bottom decorative line */}
        <div className="mt-20 flex justify-center">
          <div className="w-32 h-px bg-gradient-accent opacity-50" />
        </div>
      </div>

      {/* Background decorative elements */}
      <div className="absolute top-32 left-16 w-20 h-20 border border-primary/10 rounded-full animate-float opacity-30" />
      <div className="absolute bottom-32 right-16 w-28 h-28 border border-accent/10 rounded-full animate-float opacity-30" style={{ animationDelay: '2s' }} />
    </section>
  );
};

export default Certifications;