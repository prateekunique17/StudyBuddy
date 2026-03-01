
import React from 'react';
import { GlassCard } from '../components/GlassCard';
import { ModuleId } from '../types';

interface DashboardProps {
  onSelectModule: (id: ModuleId) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ onSelectModule }) => {
  const stats = [
    { label: 'Study Hours', value: '12.4h', trend: '+12%', icon: '🔥' },
    { label: 'Topics Solved', value: '42', trend: '+5', icon: '✅' },
    { label: 'Rank', value: '#12', trend: 'Top 5%', icon: '🏆' },
  ];

  const modules = [
    { id: ModuleId.STUDY_PLANNER, title: 'AI Study Planner', desc: 'Turn syllabi into custom schedules.', color: 'border-indigo-500/30' },
    { id: ModuleId.EXAM_VISION, title: 'ExamVision', desc: 'Upload problems for instant steps.', color: 'border-emerald-500/30' },
    { id: ModuleId.LECTURE_NOTES, title: 'Lecture2Notes', desc: 'Summarize lectures in seconds.', color: 'border-amber-500/30' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header>
        <h1 className="text-4xl font-bold text-white mb-2">Welcome back, Scholar</h1>
        <p className="text-slate-400">Your AI-powered academic command center is ready.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((s, i) => (
          <GlassCard key={i} className="flex items-center gap-6 glass-hover group">
            <div className="text-4xl">{s.icon}</div>
            <div>
              <p className="text-slate-400 text-sm font-medium">{s.label}</p>
              <div className="flex items-baseline gap-3">
                <span className="text-2xl font-bold text-white">{s.value}</span>
                <span className="text-emerald-400 text-xs font-semibold">{s.trend}</span>
              </div>
            </div>
          </GlassCard>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <GlassCard title="Recent Activity" className="h-[300px] flex flex-col justify-center items-center text-slate-500 italic">
          <p>No recent activity. Start by uploading a syllabus!</p>
        </GlassCard>

        <div className="grid grid-cols-1 gap-4">
          <h3 className="text-xl font-bold text-white mb-2">Jump In</h3>
          {modules.map((m) => (
            <button
              key={m.id}
              onClick={() => onSelectModule(m.id)}
              className={`w-full text-left p-6 glass rounded-2xl border ${m.color} glass-hover group transition-all duration-300`}
            >
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="text-lg font-bold text-white group-hover:text-indigo-400 transition-colors">{m.title}</h4>
                  <p className="text-sm text-slate-400">{m.desc}</p>
                </div>
                <svg className="w-5 h-5 text-slate-500 group-hover:text-indigo-400 group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
