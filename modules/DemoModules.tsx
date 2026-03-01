
import React from 'react';
import { GlassCard } from '../components/GlassCard';

export const PlaceholderModule: React.FC<{ title: string; desc: string }> = ({ title, desc }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center animate-in fade-in zoom-in duration-500">
      <div className="w-24 h-24 bg-indigo-600/20 rounded-3xl flex items-center justify-center mb-6 border border-indigo-500/30">
        <svg className="w-12 h-12 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
        </svg>
      </div>
      <h2 className="text-3xl font-bold text-white mb-2">{title}</h2>
      <p className="text-slate-400 max-w-md mb-8">{desc}</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-2xl">
        {[1, 2, 3, 4].map(i => (
          <GlassCard key={i} className="opacity-50">
            <div className="h-4 bg-white/10 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-white/10 rounded w-1/2"></div>
          </GlassCard>
        ))}
      </div>

      <div className="mt-8">
        <span className="px-4 py-1.5 bg-indigo-600/20 border border-indigo-500/30 rounded-full text-indigo-400 text-sm font-semibold animate-pulse">
          COMING SOON IN V2.0
        </span>
      </div>
    </div>
  );
};
