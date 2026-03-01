
import React, { useState } from 'react';
import { GlassCard, LoadingSkeleton } from '../components/GlassCard';
import { generateMCQs } from '../services/geminiService';
import { MCQ } from '../types';

export const MCQGenerator: React.FC = () => {
  const [topics, setTopics] = useState('');
  const [questions, setQuestions] = useState<MCQ[]>([]);
  const [loading, setLoading] = useState(false);
  const [revealed, setRevealed] = useState<number[]>([]);

  const handleGenerate = async () => {
    if (!topics.trim()) return;
    setLoading(true);
    setRevealed([]);
    try {
      const result = await generateMCQs(topics);
      setQuestions(result);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const toggleReveal = (index: number) => {
    if (revealed.includes(index)) {
      setRevealed(revealed.filter(i => i !== index));
    } else {
      setRevealed([...revealed, index]);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header>
        <h2 className="text-3xl font-bold text-white mb-2">MCQ Generator</h2>
        <p className="text-slate-400">Generate a custom 20-question quiz based on any academic topic.</p>
      </header>

      <GlassCard>
        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all"
            placeholder="e.g., Organic Chemistry, French Revolution, Macroeconomics"
            value={topics}
            onChange={(e) => setTopics(e.target.value)}
          />
          <button
            onClick={handleGenerate}
            disabled={loading || !topics.trim()}
            className="px-8 py-3 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-bold rounded-xl transition-all shadow-lg shadow-emerald-600/20"
          >
            {loading ? 'Building Quiz...' : 'Generate 20 MCQs'}
          </button>
        </div>
      </GlassCard>

      {loading && (
        <div className="space-y-6">
          {[1, 2, 3].map(i => (
            <GlassCard key={i}><LoadingSkeleton /></GlassCard>
          ))}
        </div>
      )}

      {!loading && questions.length > 0 && (
        <div className="space-y-6">
          <div className="flex justify-between items-center px-2">
            <h3 className="text-xl font-bold text-white">Question Set ({questions.length})</h3>
            <button 
              onClick={() => setRevealed(questions.map((_, i) => i))}
              className="text-emerald-400 text-sm font-semibold hover:underline"
            >
              Reveal All Answers
            </button>
          </div>
          
          {questions.map((q, idx) => (
            <GlassCard key={idx} className="group border border-white/5 hover:border-emerald-500/30 transition-all">
              <div className="flex gap-4">
                <span className="w-8 h-8 rounded-lg bg-emerald-600/20 text-emerald-400 flex items-center justify-center font-bold flex-shrink-0">
                  {idx + 1}
                </span>
                <div className="space-y-4 flex-1">
                  <p className="text-white font-medium text-lg leading-snug">{q.question}</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {q.options.map((opt, i) => (
                      <div key={i} className="p-3 bg-white/5 rounded-lg border border-white/5 text-sm text-slate-300">
                        <span className="text-slate-500 font-bold mr-2">{String.fromCharCode(65 + i)}.</span>
                        {opt}
                      </div>
                    ))}
                  </div>
                  <div className="pt-2">
                    {revealed.includes(idx) ? (
                      <div className="p-3 bg-emerald-600/10 border border-emerald-500/30 rounded-lg text-emerald-400 text-sm font-semibold flex items-center gap-2 animate-in fade-in slide-in-from-left-2">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                        Correct Answer: {q.answer}
                      </div>
                    ) : (
                      <button 
                        onClick={() => toggleReveal(idx)}
                        className="text-slate-500 text-xs hover:text-emerald-400 transition-colors uppercase tracking-widest font-bold"
                      >
                        Click to see answer
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      )}
    </div>
  );
};
