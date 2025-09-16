import React, { useEffect, useRef, useState } from 'react';
import { ExternalLink, Github, Leaf, Trash2 } from 'lucide-react';
import { Button } from './ui/button';

interface Project {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  gradient: string;
  tags: string[];
  features: string[];
}

const projects: Project[] = [
  {
    title: 'Soil Health Analysis Tool',
    description: 'Analyzes soil parameters and suggests fertilizers for better crop yield',
    icon: Leaf,
    gradient: 'from-accent to-secondary',
    tags: ['Python', 'Data Analysis', 'Agriculture', 'Machine Learning'],
    features: [
      'Soil parameter analysis',
      'Fertilizer recommendations',
      'Crop yield optimization',
      'Data visualization dashboard',
    ],
  },
  {
    title: 'Smart IoT Dustbin',
    description: 'Automated waste management system using sensors and buzzer alerts',
    icon: Trash2,
    gradient: 'from-primary to-accent',
    tags: ['IoT', 'Arduino', 'Sensors', 'Automation'],
    features: [
      'Real-time fill level monitoring',
      'Automated alert system',
      'Smart sensor integration',
      'Waste collection optimization',
    ],
  },
];

const Projects = () => {
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
            }, index * 400);
          }
        });
      },
      { threshold: 0.3 }
    );

    const projectCards = containerRef.current?.querySelectorAll('.project-card');
    projectCards?.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  return (
    <section id="projects" className="section-padding bg-surface relative">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="gradient-text">Featured Projects</span>
          </h2>
          <p className="text-xl text-text-secondary max-w-2xl mx-auto">
            Innovative solutions built with cutting-edge technology to solve real-world problems
            and create meaningful impact.
          </p>
        </div>

        {/* Projects grid */}
        <div ref={containerRef} className="space-y-12">
          {projects.map((project, index) => {
            const IconComponent = project.icon;
            const isVisible = visibleItems.has(index);
            const isEven = index % 2 === 0;
            
            return (
              <div
                key={project.title}
                data-index={index}
                className={`project-card transition-all duration-800 ${
                  isVisible 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-12'
                }`}
              >
                <div className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 lg:gap-12 items-center`}>
                  {/* Project visual */}
                  <div className={`w-full lg:w-1/2 transition-all duration-700 delay-200 ${
                    isVisible 
                      ? 'opacity-100 translate-x-0' 
                      : `opacity-0 ${isEven ? '-translate-x-8' : 'translate-x-8'}`
                  }`}>
                    <div className="relative group">
                      <div className={`aspect-video bg-gradient-to-br ${project.gradient} rounded-2xl p-8 flex items-center justify-center overflow-hidden card-elevated hover:shadow-elevated transition-all duration-300 hover:scale-105`}>
                        {/* Icon and decorative elements */}
                        <div className="relative">
                          <IconComponent className="w-32 h-32 text-white/90 group-hover:text-white transition-colors duration-300" />
                          
                          {/* Animated circles */}
                          <div className="absolute -top-4 -right-4 w-8 h-8 border-2 border-white/30 rounded-full animate-float" />
                          <div className="absolute -bottom-6 -left-6 w-12 h-12 border-2 border-white/20 rounded-full animate-float" style={{ animationDelay: '1s' }} />
                          <div className="absolute top-1/2 -right-8 w-6 h-6 border border-white/40 rounded-full animate-float" style={{ animationDelay: '2s' }} />
                        </div>
                        
                        {/* Overlay effect */}
                        <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
                      </div>
                    </div>
                  </div>

                  {/* Project details */}
                  <div className={`w-full lg:w-1/2 space-y-6 transition-all duration-700 delay-400 ${
                    isVisible 
                      ? 'opacity-100 translate-x-0' 
                      : `opacity-0 ${isEven ? 'translate-x-8' : '-translate-x-8'}`
                  }`}>
                    {/* Title and description */}
                    <div className="space-y-4">
                      <h3 className="text-3xl lg:text-4xl font-bold">
                        <span className="gradient-text">{project.title}</span>
                      </h3>
                      
                      <p className="text-lg text-text-secondary leading-relaxed">
                        {project.description}
                      </p>
                    </div>

                    {/* Features */}
                    <div className="space-y-3">
                      <h4 className="text-lg font-semibold text-accent">Key Features:</h4>
                      <ul className="space-y-2">
                        {project.features.map((feature, featureIndex) => (
                          <li 
                            key={feature}
                            className={`flex items-center gap-3 transition-all duration-500 ${
                              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
                            }`}
                            style={{ transitionDelay: `${600 + (featureIndex * 100)}ms` }}
                          >
                            <div className="w-2 h-2 rounded-full bg-accent flex-shrink-0" />
                            <span className="text-text-secondary">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Technologies */}
                    <div className="space-y-3">
                      <h4 className="text-lg font-semibold text-accent">Technologies:</h4>
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag, tagIndex) => (
                          <span
                            key={tag}
                            className={`px-3 py-1 bg-surface-elevated border border-accent/20 rounded-full text-sm text-accent font-medium transition-all duration-500 hover:bg-accent/10 hover:border-accent/40 ${
                              isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                            }`}
                            style={{ transitionDelay: `${800 + (tagIndex * 50)}ms` }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Action buttons */}
                    <div className={`flex gap-4 pt-4 transition-all duration-700 delay-1000 ${
                      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                    }`}>
                      <Button 
                        size="lg" 
                        className="bg-gradient-primary hover:shadow-glow text-white font-semibold px-6 py-3 rounded-full transition-all duration-300 transform hover:scale-105"
                      >
                        <Github className="w-5 h-5 mr-2" />
                        View Code
                      </Button>
                      <Button 
                        variant="outline" 
                        size="lg"
                        className="border-accent text-accent hover:bg-accent hover:text-background font-semibold px-6 py-3 rounded-full transition-all duration-300 transform hover:scale-105"
                      >
                        <ExternalLink className="w-5 h-5 mr-2" />
                        Live Demo
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Divider */}
                {index < projects.length - 1 && (
                  <div className="flex justify-center mt-16">
                    <div className="w-32 h-px bg-gradient-accent opacity-30" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Call to action */}
        <div className="text-center mt-20">
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold text-white">
              Interested in collaborating?
            </h3>
            <p className="text-lg text-text-secondary max-w-xl mx-auto">
              I'm always excited to work on innovative projects and explore new technologies.
            </p>
            <Button 
              size="lg" 
              className="bg-gradient-accent hover:shadow-glow text-white font-semibold px-8 py-3 rounded-full transition-all duration-300 transform hover:scale-105"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Let's Connect
            </Button>
          </div>
        </div>
      </div>

      {/* Background decorative elements */}
      <div className="absolute top-40 right-20 w-36 h-36 border border-primary/10 rounded-full animate-float opacity-30" />
      <div className="absolute bottom-40 left-20 w-28 h-28 border border-accent/10 rounded-full animate-float opacity-30" style={{ animationDelay: '4s' }} />
    </section>
  );
};

export default Projects;