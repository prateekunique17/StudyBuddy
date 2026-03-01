
import React, { useState, useEffect } from 'react';
import { ModuleId } from './types';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './modules/Dashboard';
import { StudyPlanner } from './modules/StudyPlanner';
import { LectureNotes } from './modules/LectureNotes';
import { ExamVision } from './modules/ExamVision';
import { CareerRoadmap } from './modules/CareerRoadmap';
import { SmartNotes } from './modules/SmartNotes';
import { MCQGenerator } from './modules/MCQGenerator';
import { PlaceholderModule } from './modules/DemoModules';

const App: React.FC = () => {
  const [activeModule, setActiveModule] = useState<ModuleId>(ModuleId.DASHBOARD);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setSidebarOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const renderModule = () => {
    switch (activeModule) {
      case ModuleId.DASHBOARD:
        return <Dashboard onSelectModule={setActiveModule} />;
      case ModuleId.STUDY_PLANNER:
        return <StudyPlanner />;
      case ModuleId.LECTURE_NOTES:
        return <LectureNotes />;
      case ModuleId.EXAM_VISION:
        return <ExamVision />;
      case ModuleId.CAREER_ROADMAP:
        return <CareerRoadmap />;
      case ModuleId.SMART_NOTES:
        return <SmartNotes />;
      case ModuleId.MCQ_GENERATOR:
        return <MCQGenerator />;
      case ModuleId.LEARN_QUEST:
        return <PlaceholderModule title="LearnQuest" desc="Gamified learning experience where you level up by completing study streaks." />;
      case ModuleId.CAMPUS_GPT:
        return <PlaceholderModule title="CampusGPT" desc="A localized model trained on your specific university's handbook and documents." />;
      default:
        return <Dashboard onSelectModule={setActiveModule} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex">
      <Sidebar 
        activeModule={activeModule} 
        onSelectModule={setActiveModule} 
        isOpen={sidebarOpen}
        setIsOpen={setSidebarOpen}
      />

      <main className="flex-1 transition-all duration-300 lg:ml-72 min-h-screen">
        <div className="p-4 md:p-8 lg:p-12 max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-12">
            <div className="hidden lg:block">
              <span className="text-slate-500 text-sm font-medium">Session: 2024-2025</span>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="glass px-4 py-2 rounded-xl flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                <span className="text-sm font-medium text-slate-300">Gemini Online</span>
              </div>
              <button className="w-10 h-10 rounded-xl glass flex items-center justify-center hover:bg-white/10 transition-colors">
                <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path></svg>
              </button>
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 shadow-lg shadow-indigo-500/20"></div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -top-24 -left-24 w-96 h-96 bg-indigo-600/10 blur-[120px] rounded-full pointer-events-none"></div>
            <div className="absolute top-1/2 -right-24 w-96 h-96 bg-purple-600/10 blur-[120px] rounded-full pointer-events-none"></div>
            
            {renderModule()}
          </div>
        </div>
        
        <footer className="mt-12 p-8 text-center text-slate-600 text-xs border-t border-white/5">
          <p>© 2024 StudyBuddy AI Academic Systems. Built with Gemini 3.0 Technology.</p>
        </footer>
      </main>
    </div>
  );
};

export default App;
