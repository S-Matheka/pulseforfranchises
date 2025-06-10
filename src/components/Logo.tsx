import React from 'react';

interface LogoProps {
  isDarkMode: boolean;
}

export const Logo = ({ isDarkMode }: LogoProps) => {
  return (
    <div className="flex items-center">
      <img 
        src={isDarkMode 
          ? "/logo-white.png"  // White logo for dark mode
          : "/logo-dark.png"   // Dark logo for light mode
        }
        alt="Clarity Logo" 
        className="h-8 w-auto"
      />
    </div>
  );
};