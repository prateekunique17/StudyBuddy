
import React, { useState } from 'react';
import { GlassCard, LoadingSkeleton } from '../components/GlassCard';
import { generateCareerRoadmap } from '../services/aiService';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export const CareerRoadmap: React.FC = () => {
  const [goal, setGoal] = useState('');
  const [skills, setSkills] = useState('');
  const [roadmap, setRoadmap] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!goal || !skills) return;
    setLoading(true);
    try {
      const result = await generateCareerRoadmap(goal, skills);
      setRoadmap(result);
    } catch (err) {
      console.error(err);
      setRoadmap("Could not generate roadmap. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header>
        <h2 className="text-3xl font-bold text-white mb-2">Career Roadmap</h2>
        <p className="text-slate-400">Bridge the gap between where you are and your dream career.</p>
      </header>

      <GlassCard className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-2">Dream Role</label>
            <input
              type="text"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
              placeholder="e.g., Senior AI Engineer"
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-2">Current Skills</label>
            <input
              type="text"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
              placeholder="e.g., Python, React basics, Calculus"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
            />
          </div>
        </div>
        <button
          onClick={handleGenerate}
          disabled={loading || !goal || !skills}
          className="w-full py-4 bg-violet-600 hover:bg-violet-500 disabled:opacity-50 text-white font-bold rounded-xl shadow-lg shadow-violet-600/20 transition-all"
        >
          {loading ? 'Consulting Experts...' : 'Chart My Path'}
        </button>
      </GlassCard>

      {loading && <GlassCard title="Mapping Your Future..."><LoadingSkeleton /></GlassCard>}

      {roadmap && !loading && (
        <GlassCard title="Your Strategic Roadmap" className="prose prose-invert prose-orange max-w-none">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {roadmap}
          </ReactMarkdown>
        </GlassCard>
      )}
    </div>
  );
};
