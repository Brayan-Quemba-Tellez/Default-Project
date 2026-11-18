import React from 'react';

export interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  label?: string;
}

export const Spinner: React.FC<SpinnerProps> = ({ size = 'md', className = '', label }) => {
  const sizes = {
    sm: 'w-4 h-4 border-2',
    md: 'w-6 h-6 border-2',
    lg: 'w-8 h-8 border-3',
    xl: 'w-12 h-12 border-4',
  };

  return (
    <div className={`inline-flex flex-col items-center justify-center gap-2 ${className}`}>
      <div
        className={`${sizes[size]} rounded-full border-slate-200 dark:border-slate-800 border-t-blue-600 dark:border-t-blue-400 animate-spin`}
        role="status"
        aria-label={label || 'Cargando...'}
      />
      {label && <span className="text-xs text-slate-500 dark:text-slate-400">{label}</span>}
    </div>
  );
};
