import React from 'react';

export const Card: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className, ...props }) => {
  const baseClasses = "rounded-xl border border-gray-200/80 bg-white/60 text-card-foreground shadow-sm backdrop-blur-lg transition-all duration-300 hover:shadow-md";
  const combinedClasses = `${baseClasses} ${className} p-6`;

  return <div className={combinedClasses} {...props} />;
};