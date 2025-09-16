import React, { useEffect, useState } from 'react';
import { Button } from './ui/button';
import { Mail, Phone, MapPin, Github, Linkedin, Send, ArrowUp } from 'lucide-react';

const Contact = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.3 }
    );

    const section = document.getElementById('contact');
    if (section) observer.observe(section);

    // Scroll to top button visibility
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: 'gowdayatheesh93@gmail.com',
      href: 'mailto:gowdayatheesh93@gmail.com',
      gradient: 'from-primary to-primary-glow',
    },
    {
      icon: Phone,
      label: 'Phone',
      value: '+91 8088128353',
      href: 'tel:+918088128353',
      gradient: 'from-accent to-secondary',
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'Sullia, Dakshina Kannada, India',
      href: '#',
      gradient: 'from-secondary to-accent',
    },
    {
      icon: Github,
      label: 'GitHub',
      value: 'github.com/yatheeshgowda',
      href: 'https://github.com/',
      gradient: 'from-accent-bright to-primary',
    },
  ];

  return (
    <>
      <section id="contact" className="section-padding bg-gradient-hero relative">
        <div className="max-w-6xl mx-auto">
          {/* Section header */}
          <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="gradient-text">Let's Connect</span>
            </h2>
            <p className="text-xl text-text-secondary max-w-2xl mx-auto">
              Ready to collaborate on exciting projects or discuss new opportunities? 
              I'd love to hear from you!
            </p>
          </div>

          {/* Contact grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {contactInfo.map((contact, index) => {
              const IconComponent = contact.icon;
              
              return (
                <a
                  key={contact.label}
                  href={contact.href}
                  className={`group block transition-all duration-700 delay-${index * 200} ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
                >
                  <div className="card-elevated p-6 rounded-xl hover:shadow-elevated transition-all duration-300 hover:scale-105 cursor-pointer h-full">
                    {/* Gradient background overlay */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${contact.gradient} rounded-xl opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
                    
                    {/* Content */}
                    <div className="relative flex items-center gap-4">
                      {/* Icon */}
                      <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${contact.gradient} p-4 group-hover:shadow-glow transition-all duration-300`}>
                        <IconComponent className="w-full h-full text-white" />
                      </div>
                      
                      {/* Info */}
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-accent group-hover:text-accent-bright transition-colors duration-300 mb-1">
                          {contact.label}
                        </h3>
                        <p className="text-text-secondary group-hover:text-white transition-colors duration-300 break-all">
                          {contact.value}
                        </p>
                      </div>

                      {/* Arrow indicator */}
                      <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-2">
                        <Send className="w-5 h-5 text-accent" />
                      </div>
                    </div>

                    {/* Decorative elements */}
                    <div className="absolute top-4 right-4 w-6 h-6 border border-accent/20 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500" />
                  </div>
                </a>
              );
            })}
          </div>

          {/* Call to action */}
          <div className={`text-center space-y-8 transition-all duration-1000 delay-800 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="space-y-4">
              <h3 className="text-2xl md:text-3xl font-semibold">
                <span className="gradient-text">Ready to Build Something Amazing?</span>
              </h3>
              <p className="text-lg text-text-secondary max-w-xl mx-auto">
                Whether it's a web application, IoT solution, or data analytics project, 
                let's turn your ideas into reality.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                size="lg" 
                className="bg-gradient-primary hover:shadow-glow text-white font-semibold px-8 py-3 rounded-full transition-all duration-300 transform hover:scale-105"
                onClick={() => window.location.href = 'mailto:gowdayatheesh93@gmail.com?subject=Project Collaboration'}
              >
                <Mail className="w-5 h-5 mr-2" />
                Start a Project
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="border-accent text-accent hover:bg-accent hover:text-background font-semibold px-8 py-3 rounded-full transition-all duration-300 transform hover:scale-105"
                onClick={() => window.location.href = 'tel:+918088128353'}
              >
                <Phone className="w-5 h-5 mr-2" />
                Schedule a Call
              </Button>
            </div>
          </div>

          {/* Decorative elements */}
          <div className="absolute top-20 left-10 w-32 h-32 border border-primary/20 rounded-full animate-float opacity-30" />
          <div className="absolute bottom-20 right-10 w-24 h-24 border border-accent/20 rounded-full animate-float opacity-30" style={{ animationDelay: '2s' }} />
        </div>

        {/* Footer */}
        <div className="mt-20 pt-8 border-t border-white/10">
          <div className="max-w-6xl mx-auto text-center">
            <p className="text-text-muted">
              © 2024 Yatheesh Gowda. Built with passion and modern web technologies.
            </p>
          </div>
        </div>
      </section>

      {/* Scroll to top button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 w-12 h-12 bg-gradient-primary hover:shadow-glow text-white rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110 z-50"
        >
          <ArrowUp className="w-6 h-6" />
        </button>
      )}
    </>
  );
};

export default Contact;