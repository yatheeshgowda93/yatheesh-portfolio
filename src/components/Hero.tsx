import React, { useEffect, useState } from 'react';
import { Button } from './ui/button';
import { ChevronDown, MapPin, Mail, Phone } from 'lucide-react';

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [typedText, setTypedText] = useState('');
  const fullText = 'Software Developer | IoT Innovator | Web Developer';

  useEffect(() => {
    setIsVisible(true);
    
    // Typing animation
    let i = 0;
    const typeTimer = setInterval(() => {
      if (i < fullText.length) {
        setTypedText(fullText.slice(0, i + 1));
        i++;
      } else {
        clearInterval(typeTimer);
      }
    }, 50);

    return () => clearInterval(typeTimer);
  }, []);

  const scrollToNext = () => {
    const aboutSection = document.getElementById('about');
    aboutSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-hero overflow-hidden">
      {/* Animated background particles */}
      <div className="particles-bg">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 4 + 1}px`,
              height: `${Math.random() * 4 + 1}px`,
              animationDelay: `${Math.random() * 6}s`,
              animationDuration: `${Math.random() * 4 + 4}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 text-center space-y-8 px-6 max-w-4xl mx-auto">
        {/* Main heading with staggered animation */}
        <div className={`space-y-4 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h1 className="text-6xl md:text-8xl font-bold">
            <span className="gradient-text animate-glow-pulse">Yatheesh</span>
            <br />
            <span className="text-white font-light">Gowda</span>
          </h1>
          
          <div className="text-2xl md:text-3xl font-medium text-accent mb-4">
            Computer Science Engineer
          </div>
          
          {/* Typing animation */}
          <div className="text-lg md:text-xl text-text-secondary h-8 flex items-center justify-center">
            <span className="font-mono">
              {typedText}
              <span className="animate-pulse">|</span>
            </span>
          </div>
        </div>

        {/* Profile image */}
        <div className={`flex justify-center transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <img
            src="/hero.jpg"
            alt="Profile photo"
            className="w-36 h-36 md:w-44 md:h-44 rounded-full object-cover border border-white/10 shadow-lg"
          />
        </div>

        {/* Location and contact quick info */}
        <div className={`flex flex-wrap justify-center gap-6 text-text-muted transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-accent" />
            <span>Sullia, Dakshina Kannada, India</span>
          </div>
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4 text-accent" />
            <span>gowdayatheesh93@gmail.com</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4 text-accent" />
            <span>+91 8088128353</span>
          </div>
        </div>

        {/* Bio */}
        <div className={`text-lg text-text-secondary max-w-2xl mx-auto leading-relaxed transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          Passionate about building innovative tech solutions. Enthusiastic learner with experience in 
          Python, IoT systems, and full-stack web development. Driven to solve real-world problems through technology.
        </div>

        {/* CTA Buttons */}
        <div className={`flex flex-col sm:flex-row gap-4 justify-center items-center pt-8 transition-all duration-1000 delay-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <Button 
            size="lg" 
            className="bg-gradient-primary hover:shadow-glow text-white font-semibold px-8 py-3 rounded-full transition-all duration-300 transform hover:scale-105"
            onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
          >
            View My Projects
          </Button>
          <Button 
            variant="outline" 
            size="lg"
            className="border-accent text-accent hover:bg-accent hover:text-background font-semibold px-8 py-3 rounded-full transition-all duration-300 transform hover:scale-105"
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Get In Touch
          </Button>
        </div>

        {/* Scroll indicator */}
        <div className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 transition-all duration-1000 delay-1200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <button 
            onClick={scrollToNext}
            className="animate-bounce text-accent hover:text-accent-bright transition-colors duration-300"
          >
            <ChevronDown className="w-8 h-8" />
          </button>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-20 left-20 w-32 h-32 border border-primary/20 rounded-full animate-float" />
      <div className="absolute bottom-32 right-20 w-24 h-24 border border-accent/20 rounded-full animate-float" style={{ animationDelay: '1s' }} />
    </section>
  );
};

export default Hero;