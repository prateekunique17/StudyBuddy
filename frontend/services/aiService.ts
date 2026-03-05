import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai";
import { logAIInteraction } from "./supabaseClient";

const getAIClient = () => {
  const key = process.env.API_KEY || process.env.GEMINI_API_KEY || '';
  if (!key) console.error("GEMINI_API_KEY is missing!");
  return new GoogleGenerativeAI(key);
};

export const generateStudyPlan = async (syllabus: string): Promise<string> => {
  try {
    const ai = getAIClient();
    const result = await ai.getGenerativeModel({ model: 'gemini-2.5-flash' }).generateContent({
      contents: [{
        role: 'user', parts: [{
          text: `You are an expert academic advisor. Based on the following syllabus text, create a detailed 7-day study plan. Organize it by day. Format the response clearly with markdown headers for each day.
      
      Syllabus text: ${syllabus}`
        }]
      }],
    });

    const responseText = result.response.text();
    await logAIInteraction('StudyPlanner', syllabus, responseText);
    return responseText;
  } catch (err: any) {
    console.error("AI Error:", err);
    return `Failed to generate study plan: ${err.message || 'Unknown error'}`;
  }
};

export const summarizeLecture = async (transcript: string): Promise<string> => {
  try {
    const ai = getAIClient();
    const result = await ai.getGenerativeModel({ model: 'gemini-2.5-flash' }).generateContent({
      contents: [{
        role: 'user', parts: [{
          text: `Analyze the following lecture transcript/text and provide a structured summary with Key Concepts, Important Definitions, and a Brief Summary. Use Markdown.
      
      Lecture Text: ${transcript}`
        }]
      }],
    });

    const responseText = result.response.text();
    await logAIInteraction('LectureNotes', transcript, responseText);
    return responseText;
  } catch (err: any) {
    console.error("AI Error:", err);
    return `Failed to summarize lecture: ${err.message || 'Unknown error'}`;
  }
};

export const analyzeQuestionImage = async (base64Image: string, mimeType: string): Promise<string> => {
  try {
    const ai = getAIClient();
    const result = await ai.getGenerativeModel({ model: 'gemini-2.5-flash' }).generateContent({
      contents: [{
        role: 'user',
        parts: [
          { inlineData: { mimeType, data: base64Image } },
          { text: "Solve this academic question step-by-step. Identify the subject, state the core concepts involved, and provide a clear, logical solution. Use LaTeX for math symbols if possible, but keep it readable in Markdown." }
        ]
      }]
    });

    const responseText = result.response.text();
    await logAIInteraction('ExamVision', 'Image Analysis Request', responseText);
    return responseText;
  } catch (err: any) {
    console.error("AI Error:", err);
    return `Failed to analyze image: ${err.message || 'Unknown error'}`;
  }
};

export const generateCareerRoadmap = async (goal: string, currentSkills: string): Promise<string> => {
  try {
    const ai = getAIClient();
    const result = await ai.getGenerativeModel({ model: 'gemini-2.5-flash' }).generateContent({
      contents: [{ role: 'user', parts: [{ text: `Generate a career roadmap for someone aiming to become a ${goal}. Their current skills are: ${currentSkills}. Identify skill gaps, suggest specific learning paths, and provide a 6-month step-by-step timeline. Format as Markdown.` }] }],
    });

    const responseText = result.response.text();
    console.log("AI Roadmap generated successfully");
    await logAIInteraction('CareerRoadmap', `Goal: ${goal}, Skills: ${currentSkills}`, responseText);
    return responseText;
  } catch (err: any) {
    console.error("AI Error details:", err);
    return `Failed to generate roadmap: ${err.message || 'Unknown error'}`;
  }
};

export const generateSmartNotes = async (rawInput: string): Promise<string> => {
  try {
    const ai = getAIClient();
    const result = await ai.getGenerativeModel({ model: 'gemini-2.5-flash' }).generateContent({
      contents: [{
        role: 'user', parts: [{
          text: `Transform the following messy study notes into a professional, structured academic document. 
      Use clear headings, bullet points, and LaTeX notation for any formulas. 
      Focus on clarity, academic rigor, and organization.
      
      Raw Input: ${rawInput}`
        }]
      }],
    });

    const responseText = result.response.text();
    await logAIInteraction('SmartNotes', rawInput, responseText);
    return responseText;
  } catch (err: any) {
    console.error("AI Error:", err);
    return `Failed to refine notes: ${err.message || 'Unknown error'}`;
  }
};

export const generateMCQs = async (topics: string): Promise<any[]> => {
  try {
    const ai = getAIClient();
    const model = ai.getGenerativeModel({
      model: 'gemini-2.5-flash',
      generationConfig: {
        responseMimeType: "application/json",
        responseSchema: {
          type: SchemaType.ARRAY,
          items: {
            type: SchemaType.OBJECT,
            properties: {
              question: { type: SchemaType.STRING },
              options: {
                type: SchemaType.ARRAY,
                items: { type: SchemaType.STRING }
              },
              answer: { type: SchemaType.STRING, description: "The correct option text" }
            },
            required: ["question", "options", "answer"]
          }
        }
      }
    });

    const result = await model.generateContent({
      contents: [{
        role: 'user', parts: [{
          text: `Generate exactly 20 multiple choice questions based on these topics: ${topics}. 
      Ensure a mix of difficulty levels. Provide 4 options per question.` }]
      }],
    });

    const responseText = result.response.text() || "[]";
    await logAIInteraction('MCQGenerator', topics, responseText);
    return JSON.parse(responseText);
  } catch (err) {
    console.error("AI Error:", err);
    return [];
  }
};
