
import React, { useState } from 'react';
import { GlassCard, LoadingSkeleton } from '../components/GlassCard';
import { generateStudyPlan } from '../services/aiService';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export const StudyPlanner: React.FC = () => {
  const [syllabus, setSyllabus] = useState('');
  const [plan, setPlan] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!syllabus.trim()) return;
    setLoading(true);
    try {
      const result = await generateStudyPlan(syllabus);
      setPlan(result);
    } catch (err) {
      console.error(err);
      setPlan("Failed to generate plan. Please check your API key.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header>
        <h2 className="text-3xl font-bold text-white mb-2">AI Study Planner</h2>
        <p className="text-slate-400">Paste your syllabus or topic list to generate a structured study schedule.</p>
      </header>

      <GlassCard>
        <textarea
          className="w-full h-48 bg-white/5 border border-white/10 rounded-xl p-4 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
          placeholder="Example: Physics 101: Mechanics, Kinematics, Thermodynamics. Exam on Friday."
          value={syllabus}
          onChange={(e) => setSyllabus(e.target.value)}
        />
        <div className="mt-4 flex justify-end">
          <button
            onClick={handleGenerate}
            disabled={loading || !syllabus.trim()}
            className="px-8 py-3 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-xl shadow-lg shadow-indigo-600/20 transition-all flex items-center gap-2"
          >
            {loading ? 'Analyzing Syllabus...' : 'Generate 7-Day Plan'}
            {!loading && <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>}
          </button>
        </div>
      </GlassCard>

      {loading && (
        <GlassCard title="Synthesizing Schedule...">
          <LoadingSkeleton />
        </GlassCard>
      )}

      {plan && !loading && (
        <GlassCard title="Your Custom Roadmap" className="prose prose-invert prose-orange max-w-none">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {plan}
          </ReactMarkdown>
        </GlassCard>
      )}
    </div>
  );
};
