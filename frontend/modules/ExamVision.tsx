
import React, { useState, useRef } from 'react';
import { GlassCard, LoadingSkeleton } from '../components/GlassCard';
import { analyzeQuestionImage } from '../services/geminiService';

export const ExamVision: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const [solution, setSolution] = useState('');
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSolve = async () => {
    if (!image) return;
    setLoading(true);
    try {
      // Split base64 from mime type
      const base64Data = image.split(',')[1];
      const mimeType = image.split(';')[0].split(':')[1];
      const result = await analyzeQuestionImage(base64Data, mimeType);
      setSolution(result);
    } catch (err) {
      console.error(err);
      setSolution("Error processing image. Ensure it's a valid clear image.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header>
        <h2 className="text-3xl font-bold text-white mb-2">ExamVision</h2>
        <p className="text-slate-400">Upload a photo of a problem, and let Gemini solve it step-by-step.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <GlassCard className="flex flex-col items-center justify-center border-dashed border-2 border-white/10 min-h-[400px]">
          {image ? (
            <div className="relative group w-full">
              <img src={image} alt="Problem preview" className="rounded-xl max-h-[350px] mx-auto object-contain" />
              <button 
                onClick={() => { setImage(null); setSolution(''); }}
                className="absolute top-2 right-2 p-2 bg-red-500/80 hover:bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
              </button>
            </div>
          ) : (
            <div className="text-center">
              <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path></svg>
              </div>
              <p className="text-slate-400 mb-4">Drag and drop or click to upload</p>
              <button 
                onClick={() => fileInputRef.current?.click()}
                className="px-6 py-2 glass glass-hover rounded-lg text-sm text-white"
              >
                Choose File
              </button>
              <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileChange} />
            </div>
          )}
          {image && !loading && (
            <button
              onClick={handleSolve}
              className="mt-6 w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl shadow-lg shadow-emerald-600/20 transition-all flex items-center justify-center gap-2"
            >
              Solve Problem
            </button>
          )}
        </GlassCard>

        <div className="space-y-6">
          {loading ? (
            <GlassCard title="Analyzing Pixels...">
              <LoadingSkeleton />
            </GlassCard>
          ) : solution ? (
            <GlassCard title="Step-by-Step Solution" className="prose prose-invert h-[400px] overflow-y-auto">
              <div className="whitespace-pre-wrap text-slate-300 leading-relaxed text-sm">
                {solution}
              </div>
            </GlassCard>
          ) : (
            <GlassCard className="h-[400px] flex items-center justify-center text-slate-500 text-center italic">
              <p>Upload an image to see the solution magic happen here.</p>
            </GlassCard>
          )}
        </div>
      </div>
    </div>
  );
};
