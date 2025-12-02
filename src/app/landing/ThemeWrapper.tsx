import React from "react";

interface ThemeWrapperProps {
  children: React.ReactNode;
}

const ThemeWrapper: React.FC<ThemeWrapperProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-void text-white selection:bg-[#00ff41] selection:text-black font-sans relative overflow-hidden">
      {/* Global Background Grid */}
      <div className="fixed inset-0 z-0 bg-grid-pattern bg-[size:50px_50px] opacity-[0.05] pointer-events-none" />

      {/* Ambient Glows */}
      <div className="fixed top-[-10%] left-[-10%] w-[500px] h-[500px] bg-neon-purple/10 blur-[120px] rounded-full z-0 pointer-events-none mix-blend-screen animate-pulse-slow" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-neon-green/5 blur-[120px] rounded-full z-0 pointer-events-none mix-blend-screen" />

      {children}
    </div>
  );
};

export default ThemeWrapper;
