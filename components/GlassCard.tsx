
import React from 'react';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  subtitle?: string;
}

export const GlassCard: React.FC<GlassCardProps> = ({ children, className = "", title, subtitle }) => {
  return (
    <div className={`glass rounded-2xl p-6 transition-all duration-300 ${className}`}>
      {(title || subtitle) && (
        <div className="mb-6">
          {title && <h3 className="text-xl font-bold text-white mb-1">{title}</h3>}
          {subtitle && <p className="text-sm text-slate-400">{subtitle}</p>}
        </div>
      )}
      {children}
    </div>
  );
};

export const LoadingSkeleton: React.FC = () => (
  <div className="animate-pulse space-y-4">
    <div className="h-4 bg-white/10 rounded w-3/4"></div>
    <div className="h-4 bg-white/10 rounded w-full"></div>
    <div className="h-4 bg-white/10 rounded w-5/6"></div>
    <div className="h-20 bg-white/10 rounded w-full"></div>
  </div>
);
