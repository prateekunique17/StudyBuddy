
import React, { useState } from 'react';
import { GlassCard, LoadingSkeleton } from '../components/GlassCard';
import { generateSmartNotes } from '../services/geminiService';

export const SmartNotes: React.FC = () => {
  const [input, setInput] = useState('');
  const [refined, setRefined] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRefine = async () => {
    if (!input.trim()) return;
    setLoading(true);
    try {
      const result = await generateSmartNotes(input);
      setRefined(result);
    } catch (err) {
      console.error(err);
      setRefined("Failed to refine notes. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header>
        <h2 className="text-3xl font-bold text-white mb-2 font-display">Smart Notes</h2>
        <p className="text-slate-400">Capture messy thoughts and turn them into structured academic documents.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <GlassCard title="Draft Pad" subtitle="Paste your raw bullets or random thoughts">
          <textarea
            className="w-full h-[500px] bg-white/5 border border-white/10 rounded-xl p-4 text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all font-mono text-sm"
            placeholder="- mitochondria is power house&#10;- dna double helix discovered by watson/crick&#10;- cellular respiration happens in cytoplasm then mito..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            onClick={handleRefine}
            disabled={loading || !input.trim()}
            className="mt-4 w-full py-3 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-bold rounded-xl transition-all shadow-lg shadow-indigo-600/20 flex items-center justify-center gap-2"
          >
            {loading ? 'Refining Architecture...' : 'Refine into Academic Notes'}
          </button>
        </GlassCard>

        <div className="space-y-4">
          {loading ? (
            <GlassCard title="Processing Knowledge...">
              <LoadingSkeleton />
            </GlassCard>
          ) : refined ? (
            <GlassCard title="Formatted Output" className="prose prose-invert h-[585px] overflow-y-auto">
              <div className="whitespace-pre-wrap text-slate-300 leading-relaxed text-sm">
                {refined}
              </div>
            </GlassCard>
          ) : (
            <div className="h-[585px] glass rounded-2xl border-dashed border-2 border-white/5 flex items-center justify-center text-slate-600 italic px-8 text-center">
              Your structured notes will appear here once you hit refine.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
