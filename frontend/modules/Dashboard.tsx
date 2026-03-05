import React, { useState, useEffect } from 'react';
import { GlassCard } from '../components/GlassCard';
import { ModuleId } from '../types';
import { getRecentActivity, getUserStats, AIActivity } from '../services/supabaseClient';

interface DashboardProps {
  onSelectModule: (id: ModuleId) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ onSelectModule }) => {
  const [stats, setStats] = useState({ totalTasks: 0, favoriteTool: 'None', activeDays: 0 });
  const [activities, setActivities] = useState<AIActivity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      setLoading(true);
      try {
        const [fetchedStats, fetchedActivity] = await Promise.all([
          getUserStats(),
          getRecentActivity()
        ]);

        if (isMounted) {
          setStats(fetchedStats);
          setActivities(fetchedActivity);
        }
      } catch (err) {
        console.error("Error loading dashboard data:", err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    fetchData();
    return () => { isMounted = false; };
  }, []);

  const statCards = [
    { label: 'Total Topics Mastered', value: stats.totalTasks.toString(), trend: 'Overall', icon: <svg className="w-8 h-8 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg> },
    { label: 'Favorite Tool', value: stats.favoriteTool || 'None', trend: 'Most Used', icon: <svg className="w-8 h-8 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path></svg> },
    { label: 'Active Study Days', value: stats.activeDays.toString(), trend: 'Streak', icon: <svg className="w-8 h-8 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z"></path></svg> },
  ];

  const modules = [
    { id: ModuleId.STUDY_PLANNER, title: 'AI Study Planner', desc: 'Turn syllabi into custom schedules.', color: 'border-orange-500/30' },
    { id: ModuleId.EXAM_VISION, title: 'ExamVision', desc: 'Upload problems for instant steps.', color: 'border-orange-500/30' },
    { id: ModuleId.LECTURE_NOTES, title: 'Lecture2Notes', desc: 'Summarize lectures in seconds.', color: 'border-orange-500/30' },
  ];

  const getModuleIcon = (name: string) => {
    if (name.includes('StudyPlanner')) return <svg className="w-6 h-6 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>;
    if (name.includes('ExamVision')) return <svg className="w-6 h-6 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>;
    if (name.includes('LectureNotes')) return <svg className="w-6 h-6 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"></path></svg>;
    if (name.includes('MCQ')) return <svg className="w-6 h-6 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>;
    if (name.includes('Roadmap')) return <svg className="w-6 h-6 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"></path></svg>;
    if (name.includes('SmartNotes')) return <svg className="w-6 h-6 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>;
    return <svg className="w-6 h-6 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>;
  };

  const timeAgo = (dateStr: string) => {
    const time = new Date(dateStr).getTime();
    if (isNaN(time)) return '';
    const now = Date.now();
    const minDiff = Math.floor((now - time) / 60000);
    if (minDiff < 1) return 'Just now';
    if (minDiff < 60) return `${minDiff} min ago`;
    const hrDiff = Math.floor(minDiff / 60);
    if (hrDiff < 24) return `${hrDiff} hr${hrDiff > 1 ? 's' : ''} ago`;
    const days = Math.floor(hrDiff / 24);
    if (days === 1) return 'Yesterday';
    return `${days} days ago`;
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header>
        <h1 className="text-4xl font-bold text-white mb-2">Welcome back, Scholar</h1>
        <p className="text-slate-400">Your real-time AI study analytics command center.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {statCards.map((s, i) => (
          <GlassCard key={i} className="flex items-center gap-6 glass-hover group">
            <div className="text-4xl">{s.icon}</div>
            <div>
              <p className="text-slate-400 text-sm font-medium">{s.label}</p>
              <div className="flex items-baseline gap-3">
                <span className="text-2xl font-bold text-white line-clamp-1">{loading ? '...' : s.value}</span>
                <span className="text-orange-400 text-xs font-semibold">{s.trend}</span>
              </div>
            </div>
          </GlassCard>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <GlassCard title="Recent Activity" className={`flex flex-col ${activities.length === 0 ? 'justify-center items-center h-[300px]' : ''}`}>
          {loading ? (
            <div className="flex flex-col gap-4 animate-pulse mt-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="h-16 bg-white/5 rounded-xl border border-white/5"></div>
              ))}
            </div>
          ) : activities.length === 0 ? (
            <p className="text-slate-500 italic mt-4 text-center">No recent activity. Start by using an AI module!</p>
          ) : (
            <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 mt-4" style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgba(255,255,255,0.1) transparent' }}>
              {activities.map(activity => (
                <div key={activity.id} className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                  <div className="flex items-center justify-center bg-orange-500/10 p-2 rounded-lg text-2xl mt-1">{getModuleIcon(activity.module_name)}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-baseline mb-1">
                      <h4 className="text-white font-medium text-sm">{activity.module_name}</h4>
                      <span className="text-xs text-slate-500 whitespace-nowrap ml-2">{timeAgo(activity.created_at)}</span>
                    </div>
                    <p className="text-slate-400 text-xs truncate" title={activity.prompt}>
                      {activity.prompt}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
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
                  <h4 className="text-lg font-bold text-white group-hover:text-orange-400 transition-colors">{m.title}</h4>
                  <p className="text-sm text-slate-400">{m.desc}</p>
                </div>
                <svg className="w-5 h-5 text-slate-500 group-hover:text-orange-400 group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
