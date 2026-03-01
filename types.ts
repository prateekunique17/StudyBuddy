
export enum ModuleId {
  DASHBOARD = 'dashboard',
  STUDY_PLANNER = 'study-planner',
  LECTURE_NOTES = 'lecture-notes',
  EXAM_VISION = 'exam-vision',
  CAREER_ROADMAP = 'career-roadmap',
  SMART_NOTES = 'smart-notes',
  MCQ_GENERATOR = 'mcq-generator',
  LEARN_QUEST = 'learn-quest',
  CAMPUS_GPT = 'campus-gpt'
}

export interface NavItem {
  id: ModuleId;
  label: string;
  icon: React.ReactNode;
  isDemo?: boolean;
}

export interface MCQ {
  question: string;
  options: string[];
  answer: string;
}
