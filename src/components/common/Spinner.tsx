import React from 'react';

interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  label?: string;
  className?: string;
}

export const Spinner: React.FC<SpinnerProps> = ({ size = 'md', label = 'Loading...', className = '' }) => {
  const dimensions = {
    sm: 'w-4 h-4 border-2',
    md: 'w-6 h-6 border-2',
    lg: 'w-10 h-10 border-3',
  };

  return (
    <div className={`flex items-center justify-center gap-2 ${className}`} role="status">
      <div
        className={`${dimensions[size]} border-emerald-600 border-t-transparent dark:border-emerald-400 dark:border-t-transparent rounded-full animate-spin`}
      />
      {label && <span className="sr-only">{label}</span>}
    </div>
  );
};
