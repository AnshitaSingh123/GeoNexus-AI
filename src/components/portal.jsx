import React, { useState, useEffect, useRef } from 'react';
import ChatbotPage from './chatbot.jsx'; 
import KnowledgeGraphPage from './knowledgegraph.jsx';
import DataVisualizationPage from './datavisualization.jsx';
import SatelliteTrackerPage from './satellitetracker.jsx';

// This component will inject the necessary styles and scripts into the document head.
const StyleSetup = () => {
    useEffect(() => {
        // Inject Tailwind CSS CDN script
        const tailwindScript = document.createElement('script');
        tailwindScript.src = 'https://cdn.tailwindcss.com';
        document.head.appendChild(tailwindScript);

        // Inject custom animation styles. These are not part of standard Tailwind.
        const style = document.createElement('style');
        style.innerHTML = `
            @keyframes blob {
              0% { transform: translate(0px, 0px) scale(1); }
              33% { transform: translate(30px, -50px) scale(1.1); }
              66% { transform: translate(-20px, 20px) scale(0.9); }
              100% { transform: translate(0px, 0px) scale(1); }
            }
            .animate-blob {
              animation: blob 7s infinite;
            }
            .animation-delay-2000 {
              animation-delay: 2s;
            }
            .animation-delay-4000 {
              animation-delay: 4s;
            }

            @keyframes fade-in {
              from { opacity: 0; }
              to { opacity: 1; }
            }
            .animate-fade-in {
              animation: fade-in 1s ease-out forwards;
            }

            @keyframes fade-in-up {
              from { opacity: 0; transform: translateY(20px); }
              to { opacity: 1; transform: translateY(0); }
            }
            .animate-fade-in-up {
               opacity: 0; /* Start hidden */
               animation: fade-in-up 1s ease-out forwards;
               animation-fill-mode: forwards;
            }
        `;
        document.head.appendChild(style);

        // Cleanup function to remove the added elements when the component unmounts
        return () => {
            if (document.head.contains(tailwindScript)) {
                document.head.removeChild(tailwindScript);
            }
            if (document.head.contains(style)) {
                document.head.removeChild(style);
            }
        };
    }, []);

    return null; // This component does not render any visible UI
};


// ICONS - Using inline SVGs for better performance and customization
const LogoIcon = () => (
    <svg className="h-8 w-8 text-white" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5-10-5-10 5zM12 13.5l-10-5V17l10 5v-8.5z" />
    </svg>
);

const SunIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-yellow-400">
        <circle cx="12" cy="12" r="5"></circle>
        <line x1="12" y1="1" x2="12" y2="3"></line>
        <line x1="12" y1="21" x2="12" y2="23"></line>
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
        <line x1="1" y1="12" x2="3" y2="12"></line>
        <line x1="21" y1="12" x2="23" y2="12"></line>
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
    </svg>
);

const MoonIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-gray-400">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
    </svg>
);




 
const AIAssistantIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10c5.515 0 10-4.486 10-10S17.515 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z" />
        <path d="M12 7c-2.757 0-5 2.243-5 5s2.243 5 5 5 5-2.243 5-5-2.243-5-5-5zm0 8c-1.654 0-3-1.346-3-3s1.346-3 3-3 3 1.346 3 3-1.346 3-3 3z" />
        <path d="M12 9c-1.103 0-2 .897-2 2s.897 2 2 2 2-.897 2-2-.897-2-2-2z" />
    </svg>
);

const KnowledgeGraphIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C9.243 2 7 4.243 7 7s2.243 5 5 5 5-2.243 5-5-2.243-5-5-5zm0 8c-1.654 0-3-1.346-3-3s1.346-3 3-3 3 1.346 3 3-1.346 3-3 3z" />
        <path d="M19 14h-2v-2h-2v2h-2v2h2v2h2v-2h2v-2zm-9-4c-2.757 0-5 2.243-5 5s2.243 5 5 5 5-2.243 5-5-2.243-5-5-5zm0 8c-1.654 0-3-1.346-3-3s1.346-3 3-3 3 1.346 3 3-1.346 3-3 3z" />
    </svg>
);

const DataVisualizationIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 24 24" fill="currentColor">
        <path d="M7 14h-2v6h2v-6zm4 2h-2v4h2v-4zm4-6h-2v10h2V10zm4-4h-2v14h2V6zM3 20h18v2H3v-2z" />
    </svg>
);

const ProductCatalogIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 24 24" fill="currentColor">
        <path d="M16 6h-4V2H4v18h16V6h-4zm-2 2h2v2h-2V8zm-2 0V4h2v4h-2zm-2-4h2v4h-2V4zM6 4h2v4H6V4zm0 6h2v2H6v-2zm0 4h2v2H6v-2zm0 4h2v2H6v-2zm12 2h-2v-2h2v2zm-4 0h-2v-2h2v2zm-4 0H8v-2h2v2z" />
    </svg>
);

const SatelliteTrackerIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.515 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z" />
        <path d="M12 10c-1.103 0-2 .897-2 2s.897 2 2 2 2-.897 2-2-.897-2-2-2z" />
        <path d="M12 4c-4.411 0-8 3.589-8 8h2c0-3.309 2.691-6 6-6s6 2.691 6 6h2c0-4.411-3.589-8-8-8z" />
    </svg>
);

const MissionExplorerIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.515 2 12 2zm0 15-4-4h3v-4h2v4h3l-4 4z" />
    </svg>
);

// Animated Counter Hook
const useAnimatedCounter = (end, duration = 2000) => {
    const [count, setCount] = useState(0);
    const ref = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    let start = 0;
                    const endValue = parseInt(end.toString().replace(/,/g, ''));
                    if (start === endValue) return;

                    let startTime = null;
                    const step = (timestamp) => {
                        if (!startTime) startTime = timestamp;
                        const progress = Math.min((timestamp - startTime) / duration, 1);
                        setCount(Math.floor(progress * (endValue - start) + start));
                        if (progress < 1) {
                            window.requestAnimationFrame(step);
                        }
                    };
                    window.requestAnimationFrame(step);
                    observer.disconnect();
                }
            },
            { threshold: 0.5 }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => observer.disconnect();
    }, [end, duration]);

    return [count, ref];
};

// Header Component with animation and hover
const Header = ({ setPage, theme, toggleTheme }) => {
    const navItems = ['AI Assistant', 'Knowledge Graph', 'Data Visualization', 'Product Catalog'];

    return (
        <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm shadow-md dark:shadow-gray-800 transition-colors duration-300 animate-fade-in">
            <div className="w-full px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center py-3">
                    {/* Logo & Title */}
                    <div
                        className="flex items-center space-x-3 cursor-pointer transform transition-transform hover:scale-105"
                        onClick={() => setPage('home')}
                    >
                        <div className="bg-blue-600 p-2 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
                            <LogoIcon />
                        </div>
                        <span className="text-xl font-bold text-gray-800 dark:text-white tracking-wide transition-colors duration-300">
                            MOSDAC AI Portal
                        </span>
                    </div>

                    {/* Navigation */}
                    <nav className="hidden md:flex items-center space-x-6">
                        {navItems.map(item => (
                            <button
                                key={item}
                                onClick={() => setPage(item.toLowerCase().replace(/ /g, ''))}
                                className="relative px-2 py-1 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-all duration-300 transform hover:scale-105 group"
                            >
                                <span className="relative z-10">{item}</span>
                                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
                            </button>
                        ))}
                    </nav>

                    {/* Theme Toggle Button */}
                    <div className="flex items-center space-x-4">
                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-full bg-white dark:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-transform duration-300 transform hover:scale-110 shadow-md hover:shadow-xl"
                        >
                            {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
};


// Hero Section Component


const HeroSection = ({ setPage }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section className="relative py-20 md:py-32 text-center overflow-hidden min-h-screen flex items-center">
      {/* Enhanced Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-teal-50 dark:from-gray-900 dark:via-gray-800 dark:to-teal-900 transition-all duration-1000"></div>
      
      {/* Interactive Gradient Overlay */}
      <div 
        className="absolute inset-0 opacity-30 transition-all duration-300"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(59, 130, 246, 0.3) 0%, transparent 50%)`
        }}
      ></div>

      {/* Enhanced Floating Orbs */}
      <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-blue-200 dark:bg-blue-800 rounded-full filter blur-2xl opacity-40 animate-float"></div>
      <div className="absolute top-1/2 right-1/4 w-40 h-40 bg-yellow-200 dark:bg-yellow-800 rounded-full filter blur-2xl opacity-40 animate-float-delayed"></div>
      <div className="absolute bottom-1/4 right-1/3 w-36 h-36 bg-green-200 dark:bg-green-800 rounded-full filter blur-2xl opacity-40 animate-float-slow"></div>
      <div className="absolute top-1/3 left-1/2 w-28 h-28 bg-purple-200 dark:bg-purple-800 rounded-full filter blur-2xl opacity-30 animate-float-reverse"></div>

      {/* 3D Geometric Shapes */}
      <div className="absolute top-10 right-10 w-20 h-20 border-2 border-blue-300 dark:border-blue-700 rotate-45 animate-spin-slow opacity-20"></div>
      <div className="absolute bottom-10 left-10 w-16 h-16 border-2 border-teal-300 dark:border-teal-700 animate-pulse opacity-20"></div>
      
      {/* 3D Floating Cubes */}
      <div className="absolute top-16 left-16 animate-float-3d">
        <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 shadow-2xl transform rotate-45 animate-cube-rotate opacity-30"></div>
        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-700 shadow-xl transform rotate-45 translate-x-2 translate-y-2 animate-cube-rotate-delayed opacity-20"></div>
      </div>
      
      {/* 3D Pyramid */}
      <div className="absolute top-1/3 right-16 animate-float-reverse">
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 bg-gradient-to-b from-purple-400 to-purple-600 transform rotate-45 shadow-2xl animate-pyramid-float opacity-25"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-purple-500 to-purple-700 transform rotate-45 translate-x-1 translate-y-1 shadow-xl opacity-15"></div>
        </div>
      </div>
      
      {/* 3D Hexagons */}
      <div className="absolute bottom-1/3 left-20 animate-float-slow">
        <div className="relative">
          <div className="w-14 h-14 bg-gradient-to-br from-teal-400 to-teal-600 transform rotate-30 shadow-2xl animate-hexagon-spin opacity-30" style={{clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)'}}></div>
          <div className="absolute top-0 left-0 w-14 h-14 bg-gradient-to-br from-teal-500 to-teal-700 transform rotate-30 translate-x-1 translate-y-1 shadow-xl opacity-20" style={{clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)'}}></div>
        </div>
      </div>
      
      {/* 3D Spheres with Gradient */}
      <div className="absolute top-1/4 right-1/3 animate-float-3d">
        <div className="relative">
          <div className="w-10 h-10 bg-gradient-radial from-yellow-300 via-yellow-500 to-yellow-700 rounded-full shadow-2xl animate-sphere-pulse opacity-40"></div>
          <div className="absolute top-0 left-0 w-10 h-10 bg-gradient-radial from-yellow-400 via-yellow-600 to-yellow-800 rounded-full translate-x-1 translate-y-1 shadow-xl opacity-25"></div>
        </div>
      </div>

    
      
      {/* 3D Triangular Prisms */}
      <div className="absolute bottom-1/4 right-1/4 animate-float-delayed">
        <div className="relative">
          <div className="w-0 h-0 border-l-8 border-r-8 border-b-14 border-l-transparent border-r-transparent border-b-gradient-to-r from-green-400 to-green-600 shadow-2xl animate-triangle-rotate opacity-30"></div>
          <div className="absolute top-0 left-0 w-0 h-0 border-l-8 border-r-8 border-b-14 border-l-transparent border-r-transparent border-b-green-500 translate-x-1 translate-y-1 shadow-xl opacity-20"></div>
        </div>
      </div>
      
      {/* 3D Rings */}
      <div className="absolute top-1/2 left-1/4 animate-float-3d">
        <div className="relative">
          <div className="w-12 h-12 border-4 border-indigo-400 rounded-full shadow-2xl animate-ring-spin opacity-30"></div>
          <div className="absolute top-0 left-0 w-12 h-12 border-4 border-indigo-500 rounded-full translate-x-1 translate-y-1 shadow-xl opacity-20"></div>
          <div className="absolute top-2 left-2 w-8 h-8 border-2 border-indigo-300 rounded-full animate-ring-spin-reverse opacity-25"></div>
        </div>
      </div>
      
      {/* 3D Diamonds */}
      <div className="absolute bottom-16 right-20 animate-float-slow">
        <div className="relative">
          <div className="w-8 h-8 bg-gradient-to-br from-pink-400 to-pink-600 transform rotate-45 shadow-2xl animate-diamond-sparkle opacity-35"></div>
          <div className="absolute top-0 left-0 w-8 h-8 bg-gradient-to-br from-pink-500 to-pink-700 transform rotate-45 translate-x-1 translate-y-1 shadow-xl opacity-25"></div>
        </div>
      </div>
      
      {/* Animated Grid */}
      <div className="absolute inset-0 opacity-5 dark:opacity-10">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500 to-transparent animate-grid-move"></div>
      </div>

      {/* Main Content */}
      <div className="relative w-full px-4 sm:px-6 lg:px-8 z-10">
        <div className="animate-fade-in-up">
          {/* Enhanced Icon Container */}
          <div className="relative inline-block mb-8">
            <div className="absolute inset-0 bg-blue-500/30 rounded-full blur-xl animate-pulse"></div>
            <div className="relative p-6 bg-gradient-to-br from-blue-500/20 to-teal-500/20 dark:from-blue-400/20 dark:to-teal-400/20 rounded-full backdrop-blur-sm border border-white/20 dark:border-gray-700/20 shadow-2xl transform hover:scale-110 transition-all duration-500">
              <div className="p-3 bg-gradient-to-br from-blue-600 to-blue-700 dark:from-blue-500 dark:to-blue-600 rounded-full shadow-lg">
                <svg className="w-10 h-10 text-white animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M19 3v4M17 5h4M12 19.586l-3.707-3.707a5.003 5.003 0 010-7.071 5.003 5.003 0 017.071 0 5.003 5.003 0 010 7.071L12 19.586z"></path>
                </svg>
              </div>
            </div>
          </div>

          {/* Enhanced Title */}
          <h1 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-gray-800 via-blue-600 to-teal-600 dark:from-white dark:via-blue-400 dark:to-teal-400 leading-tight animate-gradient-text mb-6">
            MOSDAC AI Portal
          </h1>

          {/* Animated Subtitle */}
          <div className="relative">
            <p className="text-xl md:text-2xl font-semibold text-gray-700 dark:text-gray-200 max-w-3xl mx-auto animate-slide-up mb-6">
              Intelligent Geospatial Data Assistant
            </p>
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-blue-500 to-teal-500 rounded-full animate-width-expand"></div>
          </div>

          {/* Enhanced Description */}
          <p className="mt-8 text-base md:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed animate-fade-in-delayed">
            Advanced AI-powered geospatial data retrieval system for satellite missions, data products, and scientific documentation. Explore satellite data with conversational ease using our knowledge graph-powered assistant.
          </p>

          {/* Premium CTA Button */}
          <div className="mt-12 relative">
            <button 
              onClick={() => document.getElementById('capabilities')?.scrollIntoView({ behavior: 'smooth' })}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className="group relative px-10 py-5 bg-gradient-to-r from-blue-600 via-blue-700 to-teal-600 text-white font-bold rounded-full overflow-hidden transition-all duration-500 transform hover:scale-105 hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800"
            >
              {/* Button Background Animation */}
              <div className="absolute inset-0 bg-gradient-to-r from-teal-600 via-blue-700 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Shimmer Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              
              {/* Button Content */}
              <span className="relative z-10 flex items-center gap-3">
                <span className="animate-bounce-subtle">Explore Our Tools</span>
                <svg className={`w-5 h-5 transition-transform duration-300 ${isHovered ? 'translate-x-2' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                </svg>
              </span>
              
              {/* Glow Effect */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-600 to-teal-600 blur-lg opacity-0 group-hover:opacity-50 transition-opacity duration-500 -z-10"></div>
            </button>
          </div>

          {/* Floating Action Indicators */}
          <div className="mt-16 flex justify-center gap-6">
            <div className="animate-bounce-slow">
              <div className="w-3 h-3 bg-blue-500 rounded-full opacity-60"></div>
            </div>
            <div className="animate-bounce-slow animation-delay-200">
              <div className="w-3 h-3 bg-teal-500 rounded-full opacity-60"></div>
            </div>
            <div className="animate-bounce-slow animation-delay-400">
              <div className="w-3 h-3 bg-purple-500 rounded-full opacity-60"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-gray-400 dark:border-gray-600 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-gray-400 dark:bg-gray-600 rounded-full mt-2 animate-scroll-indicator"></div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-30px) rotate(-180deg); }
        }
        
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-15px) scale(1.1); }
        }
        
        @keyframes float-reverse {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(25px) rotate(360deg); }
        }
        
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes grid-move {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        @keyframes gradient-text {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        @keyframes slide-up {
          0% { transform: translateY(20px); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
        
        @keyframes width-expand {
          0% { width: 0; }
          100% { width: 8rem; }
        }
        
        @keyframes fade-in-delayed {
          0% { opacity: 0; transform: translateY(10px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes bounce-subtle {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-2px); }
        }
        
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        
        @keyframes scroll-indicator {
          0% { transform: translateY(0); opacity: 1; }
          100% { transform: translateY(12px); opacity: 0; }
        }
        
        @keyframes float-3d {
          0%, 100% { transform: translateY(0px) translateZ(0) rotateX(0deg) rotateY(0deg); }
          25% { transform: translateY(-10px) translateZ(10px) rotateX(15deg) rotateY(90deg); }
          50% { transform: translateY(-20px) translateZ(20px) rotateX(30deg) rotateY(180deg); }
          75% { transform: translateY(-10px) translateZ(10px) rotateX(15deg) rotateY(270deg); }
        }
        
        @keyframes cube-rotate {
          0% { transform: rotate(45deg) rotateX(0deg) rotateY(0deg); }
          100% { transform: rotate(45deg) rotateX(360deg) rotateY(360deg); }
        }
        
        @keyframes cube-rotate-delayed {
          0% { transform: rotate(45deg) rotateX(0deg) rotateY(0deg); }
          100% { transform: rotate(45deg) rotateX(-360deg) rotateY(-360deg); }
        }
        
        @keyframes pyramid-float {
          0%, 100% { transform: rotate(45deg) translateY(0px) scale(1); }
          50% { transform: rotate(45deg) translateY(-15px) scale(1.1); }
        }
        
        @keyframes hexagon-spin {
          0% { transform: rotate(0deg) scale(1); }
          50% { transform: rotate(180deg) scale(1.1); }
          100% { transform: rotate(360deg) scale(1); }
        }
        
        @keyframes sphere-pulse {
          0%, 100% { transform: scale(1); opacity: 0.4; }
          50% { transform: scale(1.2); opacity: 0.6; }
        }
        
        @keyframes triangle-rotate {
          0% { transform: rotate(0deg) translateY(0px); }
          100% { transform: rotate(360deg) translateY(-5px); }
        }
        
        @keyframes ring-spin {
          0% { transform: rotate(0deg) scale(1); }
          50% { transform: rotate(180deg) scale(1.1); }
          100% { transform: rotate(360deg) scale(1); }
        }
        
        @keyframes ring-spin-reverse {
          0% { transform: rotate(0deg) scale(1); }
          50% { transform: rotate(-180deg) scale(0.9); }
          100% { transform: rotate(-360deg) scale(1); }
        }
        
        @keyframes diamond-sparkle {
          0%, 100% { transform: rotate(45deg) scale(1); opacity: 0.35; }
          25% { transform: rotate(45deg) scale(1.2); opacity: 0.5; }
          50% { transform: rotate(45deg) scale(1.1); opacity: 0.6; }
          75% { transform: rotate(45deg) scale(1.3); opacity: 0.4; }
        }
        
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-float-delayed { animation: float-delayed 8s ease-in-out infinite; }
        .animate-float-slow { animation: float-slow 10s ease-in-out infinite; }
        .animate-float-reverse { animation: float-reverse 7s ease-in-out infinite; }
        .animate-spin-slow { animation: spin-slow 20s linear infinite; }
        .animate-grid-move { animation: grid-move 15s linear infinite; }
        .animate-gradient-text { 
          animation: gradient-text 3s ease infinite;
          background-size: 200% 200%;
        }
        .animate-slide-up { animation: slide-up 0.8s ease-out; }
        .animate-width-expand { animation: width-expand 1.5s ease-out; }
        .animate-fade-in-delayed { animation: fade-in-delayed 1s ease-out 0.5s both; }
        .animate-bounce-subtle { animation: bounce-subtle 2s ease-in-out infinite; }
        .animate-bounce-slow { animation: bounce-slow 3s ease-in-out infinite; }
        .animate-scroll-indicator { animation: scroll-indicator 2s ease-in-out infinite; }
        
        .animate-float-3d { animation: float-3d 8s ease-in-out infinite; }
        .animate-cube-rotate { animation: cube-rotate 12s linear infinite; }
        .animate-cube-rotate-delayed { animation: cube-rotate-delayed 15s linear infinite; }
        .animate-pyramid-float { animation: pyramid-float 6s ease-in-out infinite; }
        .animate-hexagon-spin { animation: hexagon-spin 10s ease-in-out infinite; }
        .animate-sphere-pulse { animation: sphere-pulse 4s ease-in-out infinite; }
        .animate-triangle-rotate { animation: triangle-rotate 8s linear infinite; }
        .animate-ring-spin { animation: ring-spin 12s ease-in-out infinite; }
        .animate-ring-spin-reverse { animation: ring-spin-reverse 10s ease-in-out infinite; }
        .animate-diamond-sparkle { animation: diamond-sparkle 3s ease-in-out infinite; }
        
        .animation-delay-200 { animation-delay: 0.2s; }
        .animation-delay-400 { animation-delay: 0.4s; }
        
        .bg-gradient-radial {
          background: radial-gradient(circle, var(--tw-gradient-stops));
        }
        
        .rotate-30 { transform: rotate(30deg); }
        
        .border-b-gradient-to-r {
          border-bottom: 14px solid;
          border-image: linear-gradient(to right, #34d399, #059669) 1;
        }
        
        .perspective-1000 {
          perspective: 1000px;
        }
        
        .transform-3d {
          transform-style: preserve-3d;
        }
      `}</style>
    </section>
  );
};




// Stats Section Component
const StatsSection = () => {
  const [activeSatellites, satellitesRef] = useAnimatedCounter(127);
  const [dataProducts, productsRef] = useAnimatedCounter(2847);
  const [queriesResolved, queriesRef] = useAnimatedCounter(15432);

  const stats = [
    { value: activeSatellites.toLocaleString(), label: 'Active Satellites', ref: satellitesRef },
    { value: dataProducts.toLocaleString(), label: 'Data Products', ref: productsRef },
    { value: queriesResolved.toLocaleString(), label: 'Queries Resolved', ref: queriesRef },
  ];

  return (
    <section className="relative py-16 bg-gray-900 text-white overflow-hidden">
      {/* Background Blobs / Glow */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-blue-500 rounded-full opacity-20 blur-3xl animate-float-slow" />
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-purple-500 rounded-full opacity-20 blur-3xl animate-float-delayed" />
      <div className="absolute top-1/2 left-1/3 w-60 h-60 bg-green-400 rounded-full opacity-10 blur-2xl animate-float" />

      <div className="relative container mx-auto px-6 z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {stats.map((stat, index) => (
            <div
              key={index}
              ref={stat.ref}
              className="p-6 bg-white/5 backdrop-blur-sm rounded-xl transition-transform duration-300 hover:scale-105 hover:shadow-lg"
            >
              <h3 className="text-4xl font-extrabold text-cyan-400">{stat.value}</h3>
              <p className="mt-2 text-gray-300">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Optional Glow Overlay */}
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none"></div>

      {/* Animation Styles */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }

        @keyframes float-slow {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-15px) scale(1.05); }
        }

        @keyframes float-delayed {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-25px) scale(1.1); }
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animate-float-slow {
          animation: float-slow 10s ease-in-out infinite;
        }

        .animate-float-delayed {
          animation: float-delayed 12s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};


// Capability Card Component
const CapabilityCard = ({ icon, title, description, buttonText, buttonColor, setPage, pageName }) => (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 p-8 flex flex-col items-start animate-fade-in-up">
        <div className={`p-4 rounded-xl mb-6`} style={{ backgroundColor: `${buttonColor}20` }}>
            <div className={`text-white rounded-lg`} style={{ color: buttonColor }}>
                {icon}
            </div>
        </div>
        <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">{title}</h3>
        <p className="text-gray-500 dark:text-gray-400 mb-6 flex-grow">{description}</p>
        <button onClick={() => setPage(pageName)} className="w-full text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 hover:opacity-90" style={{ backgroundColor: buttonColor }}>
            {buttonText}
        </button>
    </div>
);

// Capabilities Section Component
const CapabilitiesSection = ({ setPage }) => {
    const capabilities = [
        { icon: <AIAssistantIcon />, title: 'AI Assistant', description: 'Conversational interface for instant satellite data queries.', buttonText: 'Start Chatting', buttonColor: '#2563EB', pageName: 'aiassistant' },
        { icon: <KnowledgeGraphIcon />, title: 'Knowledge Graph', description: 'Explore relationships between satellites, missions, and data.', buttonText: 'Explore Graph', buttonColor: '#10B981', pageName: 'knowledgegraph' },
        { icon: <DataVisualizationIcon />, title: 'Data Visualization', description: 'Interactive maps and charts for geospatial analysis.', buttonText: 'View Visualizations', buttonColor: '#16A34A', pageName: 'datavisualization' },
        { icon: <ProductCatalogIcon />, title: 'Product Catalog', description: 'Browse and download satellite data products.', buttonText: 'Browse Catalog', buttonColor: '#F97316', pageName: 'productcatalog' },
        { icon: <SatelliteTrackerIcon />, title: 'Live Satellite Tracker', description: 'Real-time satellite positions and orbital data.', buttonText: 'Track Satellites', buttonColor: '#8B5CF6', pageName: 'livesatellitetracker' },
        { icon: <MissionExplorerIcon />, title: 'Mission Explorer', description: 'Detailed information about satellite missions.', buttonText: 'Explore Missions', buttonColor: '#EF4444', pageName: 'missionexplorer' },
    ];

    return (
        <section id="capabilities" className="py-20 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
            <div className="container mx-auto px-6">
                <div className="text-center mb-12 animate-fade-in">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white">Discover Our Capabilities</h2>
                    <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">Explore our suite of AI-powered tools designed to make satellite data accessible and actionable.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {capabilities.map((cap, index) => (
                        <CapabilityCard key={index} {...cap} setPage={setPage} />
                    ))}
                </div>
            </div>
        </section>
    );
};

// Feature Section Component
const FeaturesSection = () => {
    const features = [
        { icon: <AIAssistantIcon />, title: 'AI-Powered Intelligence', description: 'Advanced natural language processing and machine learning algorithms understand your queries and provide precise, contextual responses.' },
        { icon: <SatelliteTrackerIcon />, title: 'Real-Time Data', description: 'Access live satellite positions, real-time data feeds, and up-to-date mission information from ISRO\'s satellite constellation.' },
        { icon: <DataVisualizationIcon />, title: 'Interactive Visualization', description: 'Explore data through interactive maps, charts, and knowledge graphs that make complex geospatial information easy to understand.' },
    ];

    return (
        <section className="py-20 bg-white dark:bg-gray-800/50 transition-colors duration-300">
            <div className="container mx-auto px-6">
                <div className="text-center mb-12 animate-fade-in">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white">Why Choose MOSDAC AI Portal?</h2>
                    <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">Experience the future of geospatial data interaction with our advanced AI capabilities.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <div key={index} className="bg-gray-50 dark:bg-gray-800 p-8 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 animate-fade-in-up" style={{ animationDelay: `${index * 150}ms` }}>
                            <div className="text-blue-600 dark:text-blue-400 mb-4">
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">{feature.title}</h3>
                            <p className="text-gray-500 dark:text-gray-400">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

// Footer Component
const Footer = () => (
    <footer className="bg-gray-100 dark:bg-gray-900 text-gray-600 dark:text-gray-400">
        <div className="container mx-auto px-6 py-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div>
                    <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4">MOSDAC AI Portal</h3>
                    <p className="text-sm">Advanced AI-powered geospatial data retrieval system for satellite missions, data products, and scientific documentation.</p>
                </div>
                <div>
                    <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4">Quick Links</h3>
                    <ul className="space-y-2">
                        <li><button className="text-left bg-transparent border-none p-0 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Data Catalog</button></li>
                        <li><button className="text-left bg-transparent border-none p-0 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Mission Info</button></li>
                        <li><button className="text-left bg-transparent border-none p-0 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Documentation</button></li>
                        <li><button className="text-left bg-transparent border-none p-0 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Support</button></li>
                    </ul>
                </div>
                <div>
                    <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4">AI Features</h3>
                    <ul className="space-y-2">
                        <li><button className="text-left bg-transparent border-none p-0 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Conversational Search</button></li>
                        <li><button className="text-left bg-transparent border-none p-0 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Knowledge Graph</button></li>
                        <li><button className="text-left bg-transparent border-none p-0 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Satellite Tracking</button></li>
                        <li><button className="text-left bg-transparent border-none p-0 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Smart Analytics</button></li>
                    </ul>
                </div>
                <div>
                    <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4">Contact</h3>
                    <p className="text-sm">Space Applications Centre<br />ISRO, Ahmedabad<br />Gujarat, India<br /><a href="mailto:help@mosdac.gov.in" className="text-blue-600 dark:text-blue-400 hover:underline">help@mosdac.gov.in</a></p>
                </div>
            </div>
            <div className="mt-12 border-t border-gray-200 dark:border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center text-sm">
                <p>&copy; {new Date().getFullYear()} MOSDAC AI Portal. Powered by advanced NLP and Knowledge Graphs.</p>
                <div className="flex items-center space-x-4 mt-4 md:mt-0">
                    <div className="flex items-center space-x-2">
                        <span className="relative flex h-3 w-3">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                        </span>
                        <span>System Online</span>
                    </div>
                    <span>127 Satellites Active</span>
                </div>
            </div>
        </div>
    </footer>
);


// Home Page Component
const HomePage = ({ setPage }) => (
    <>
        <HeroSection setPage={setPage} />
        <StatsSection />
        <CapabilitiesSection setPage={setPage} />
        <FeaturesSection />
        <Footer />
    </>
);

// Page Wrapper Component for inner pages
const PageWrapper = ({ title, children, setPage }) => (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen py-8 md:py-12 transition-colors duration-300">
        {/* Changed: Replaced 'container' with 'max-w-7xl' for a wider but constrained layout. */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <button onClick={() => setPage('home')} className="flex items-center space-x-2 text-blue-600 dark:text-blue-400 font-semibold mb-8 hover:underline">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span>Back to Home</span>
            </button>
            <main className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 md:p-10 animate-fade-in">
                {children}
            </main>
        </div>
    </div>
);

// Product Catalog Page
const ProductCatalogPage = ({ setPage }) => {
    const products = [
        { name: 'Mumbai Urban Area - High Resolution', satellite: 'Cartosat-3', location: 'Mumbai, India', resolution: '0.25m', date: '2024-06-15', size: '2.3 GB', type: 'optical', color: 'blue' },
        { name: 'Coastal Monitoring - SAR Data', satellite: 'RISAT-2B', location: 'West Coast, India', resolution: '1m', date: '2024-06-10', size: '1.8 GB', type: 'radar', color: 'green' },
        { name: 'Agricultural Assessment', satellite: 'Resourcesat-2A', location: 'Punjab, India', resolution: '5.8m', date: '2024-05-28', size: '1.2 GB', type: 'hyperspectral', color: 'purple' },
    ];
    const typeColors = {
        optical: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
        radar: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
        hyperspectral: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
    };

    return (
        <PageWrapper title="Product Catalog" setPage={setPage}>
            <div className="flex items-center space-x-4 mb-6">
                <div className="p-2 bg-orange-100 dark:bg-orange-900/50 rounded-lg">
                    <ProductCatalogIcon className="h-8 w-8 text-orange-600 dark:text-orange-400" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Product Catalog</h2>
            </div>
            <div className="relative mb-6">
                <input type="text" placeholder="Search products, satellites, or locations..." className="w-full bg-gray-100 dark:bg-gray-700 border-2 border-transparent focus:border-blue-500 focus:ring-0 rounded-lg py-3 pl-10 pr-4 text-gray-800 dark:text-gray-200 transition-colors" />
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" /></svg>
            </div>
            <div className="space-y-4">
                {products.map((product, index) => (
                    <div key={index} className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-4 transition-shadow hover:shadow-md">
                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-gray-200 dark:bg-gray-700 rounded-lg">
                                <SatelliteTrackerIcon className="h-8 w-8 text-gray-600 dark:text-gray-400" />
                            </div>
                            <div>
                                <h3 className="font-bold text-lg text-gray-800 dark:text-white">{product.name}</h3>
                                <div className="text-sm text-gray-500 dark:text-gray-400 flex flex-wrap gap-x-4 gap-y-1 mt-1">
                                    <span>{product.satellite} • {product.location}</span>
                                    <span>Resolution: {product.resolution}</span>
                                    <span>{product.date}</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 w-full md:w-auto mt-4 md:mt-0">
                            <span className={`px-3 py-1 text-xs font-medium rounded-full ${typeColors[product.type]}`}>{product.type}</span>
                            <span className="text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap">Size: {product.size}</span>
                            <button className="px-4 py-2 text-sm font-semibold text-blue-600 bg-blue-100 dark:bg-blue-900/50 dark:text-blue-300 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-900 transition-colors">Preview</button>
                            <button className="px-4 py-2 text-sm font-semibold text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors">Download</button>
                        </div>
                    </div>
                ))}
            </div>
            <p className="text-center mt-8 text-gray-500 dark:text-gray-400">Showing 3 of 3 products</p>
        </PageWrapper>
    );
};

// Placeholder Page for unimplemented features
const PlaceholderPage = ({ setPage, title, icon }) => (
    <PageWrapper title={title} setPage={setPage}>
        <div className="text-center py-16">
            <div className="inline-block p-4 bg-gray-200 dark:bg-gray-700 rounded-full mb-6">
                {icon}
            </div>
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">{title}</h2>
            <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto">This feature is currently under development. Please check back later for updates. We are working hard to bring this to you soon!</p>
        </div>
    </PageWrapper>
);

// Main App Component
export default function App() {
    const [page, setPage] = useState('home');
    const [theme, setTheme] = useState('light');

    useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [theme]);

    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    };

    const renderPage = () => {
        switch (page) {
            case 'home':
                return <HomePage setPage={setPage} />;
            case 'aiassistant':
                return <ChatbotPage setPage={setPage} />; 
            case 'knowledgegraph':
                return <KnowledgeGraphPage setPage={setPage} />;
            case 'datavisualization':
                return <DataVisualizationPage setPage={setPage} />;
            case 'productcatalog':
                return <ProductCatalogPage setPage={setPage} />;
            case 'livesatellitetracker':
                return <SatelliteTrackerPage setPage={setPage} />;
            case 'missionexplorer':
                return <PlaceholderPage setPage={setPage} title="Mission Explorer" icon={<MissionExplorerIcon className="h-12 w-12 text-red-500" />} />;
            default:
                return <HomePage setPage={setPage} />;
        }
    };

    return (
        <div className={`${theme} bg-white dark:bg-gray-900 font-sans transition-colors duration-300`}>
            <StyleSetup />
            <Header setPage={setPage} theme={theme} toggleTheme={toggleTheme} />
            {renderPage()}
        </div>
    );
}
