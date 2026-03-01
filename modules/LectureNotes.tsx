
import React, { useState } from 'react';
import { GlassCard, LoadingSkeleton } from '../components/GlassCard';
import { summarizeLecture } from '../services/geminiService';

export const LectureNotes: React.FC = () => {
  const [transcript, setTranscript] = useState('');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSummarize = async () => {
    if (!transcript.trim()) return;
    setLoading(true);
    try {
      const result = await summarizeLecture(transcript);
      setNotes(result);
    } catch (err) {
      console.error(err);
      setNotes("Failed to summarize. Check your connectivity.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header>
        <h2 className="text-3xl font-bold text-white mb-2">Lecture2Notes</h2>
        <p className="text-slate-400">Convert long transcripts or notes into concise, structured summaries.</p>
      </header>

      <GlassCard>
        <textarea
          className="w-full h-64 bg-white/5 border border-white/10 rounded-xl p-4 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
          placeholder="Paste lecture transcript here..."
          value={transcript}
          onChange={(e) => setTranscript(e.target.value)}
        />
        <div className="mt-4 flex justify-between items-center">
          <p className="text-xs text-slate-500">{transcript.length} characters</p>
          <button
            onClick={handleSummarize}
            disabled={loading || !transcript.trim()}
            className="px-8 py-3 bg-amber-600 hover:bg-amber-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-xl shadow-lg shadow-amber-600/20 transition-all flex items-center gap-2"
          >
            {loading ? 'Condensing...' : 'Generate Notes'}
            {!loading && <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.168.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>}
          </button>
        </div>
      </GlassCard>

      {loading && <GlassCard title="Analyzing Structure..."><LoadingSkeleton /></GlassCard>}

      {notes && !loading && (
        <GlassCard title="Smart Summary" className="prose prose-invert max-w-none">
          <div className="whitespace-pre-wrap text-slate-300 leading-relaxed">
            {notes}
          </div>
        </GlassCard>
      )}
    </div>
  );
};
