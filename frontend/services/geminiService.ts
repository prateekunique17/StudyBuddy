
import { GoogleGenAI, Type } from "@google/genai";

const getAIClient = () => {
  return new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
};

export const generateStudyPlan = async (syllabus: string): Promise<string> => {
  const ai = getAIClient();
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `You are an expert academic advisor. Based on the following syllabus text, create a detailed 7-day study plan. Organize it by day. Format the response clearly with markdown headers for each day.
    
    Syllabus text: ${syllabus}`,
  });
  return response.text || "No response generated.";
};

export const summarizeLecture = async (transcript: string): Promise<string> => {
  const ai = getAIClient();
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Analyze the following lecture transcript/text and provide a structured summary with Key Concepts, Important Definitions, and a Brief Summary. Use Markdown.
    
    Lecture Text: ${transcript}`,
  });
  return response.text || "No response generated.";
};

export const analyzeQuestionImage = async (base64Image: string, mimeType: string): Promise<string> => {
  const ai = getAIClient();
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: {
      parts: [
        { inlineData: { mimeType, data: base64Image } },
        { text: "Solve this academic question step-by-step. Identify the subject, state the core concepts involved, and provide a clear, logical solution. Use LaTeX for math symbols if possible, but keep it readable in Markdown." }
      ]
    }
  });
  return response.text || "No response generated.";
};

export const generateCareerRoadmap = async (goal: string, currentSkills: string): Promise<string> => {
  const ai = getAIClient();
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: `Generate a career roadmap for someone aiming to become a ${goal}. Their current skills are: ${currentSkills}. Identify skill gaps, suggest specific learning paths, and provide a 6-month step-by-step timeline. Format as Markdown.`,
    config: { thinkingConfig: { thinkingBudget: 16384 } }
  });
  return response.text || "No response generated.";
};

export const generateSmartNotes = async (rawInput: string): Promise<string> => {
  const ai = getAIClient();
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Transform the following messy study notes into a professional, structured academic document. 
    Use clear headings, bullet points, and LaTeX notation for any formulas. 
    Focus on clarity, academic rigor, and organization.
    
    Raw Input: ${rawInput}`,
  });
  return response.text || "No response generated.";
};

export const generateMCQs = async (topics: string): Promise<any[]> => {
  const ai = getAIClient();
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Generate exactly 20 multiple choice questions based on these topics: ${topics}. 
    Ensure a mix of difficulty levels. Provide 4 options per question.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            question: { type: Type.STRING },
            options: { 
              type: Type.ARRAY, 
              items: { type: Type.STRING } 
            },
            answer: { type: Type.STRING, description: "The correct option text" }
          },
          required: ["question", "options", "answer"]
        }
      }
    }
  });
  
  try {
    return JSON.parse(response.text || "[]");
  } catch (e) {
    console.error("Failed to parse MCQs JSON", e);
    return [];
  }
};
