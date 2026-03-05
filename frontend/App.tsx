
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
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };
    // Initialize properly on mount
    handleResize();
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
    <div className="min-h-screen bg-[#1A1A2E] flex">
      <Sidebar
        activeModule={activeModule}
        onSelectModule={setActiveModule}
        isOpen={sidebarOpen}
        setIsOpen={setSidebarOpen}
      />

      <main className={`flex-1 transition-all duration-300 min-h-screen ${sidebarOpen ? 'lg:ml-72' : 'ml-0'}`}>
        <div className="p-4 md:p-8 lg:p-12 max-w-7xl mx-auto pt-16 lg:pt-12">
          {/* Topbar removed as requested */}


          <div className="relative">
            <div className="absolute -top-24 -left-24 w-96 h-96 bg-orange-600/10 blur-[120px] rounded-full pointer-events-none"></div>
            <div className="absolute top-1/2 -right-24 w-96 h-96 bg-orange-500/10 blur-[120px] rounded-full pointer-events-none"></div>

            {renderModule()}
          </div>
        </div>


      </main>
    </div>
  );
};

export default App;
