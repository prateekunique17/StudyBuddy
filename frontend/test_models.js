import fs from 'fs';
import { GoogleGenerativeAI } from "@google/generative-ai";

const envContent = fs.readFileSync('./.env.local', 'utf-8');
const match = envContent.match(/GEMINI_API_KEY=(.*)/);
const apiKey = match ? match[1].trim() : process.env.GEMINI_API_KEY;

async function testModel(modelName) {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: modelName });
    try {
        process.stdout.write(`Testing ${modelName}... `);
        const result = await model.generateContent("Say 'hello' in one word.");
        console.log(`[SUCCESS] Output: ${result.response.text().trim()}`);
    } catch (e) {
        if (e.message.includes("429")) {
            console.log(`[FAILED] 429 Quota Exceeded (Limit 0: Free tier unsupported in your region)`);
        } else if (e.message.includes("404")) {
            console.log(`[FAILED] 404 Model Not Found`);
        } else {
            console.log(`[FAILED] ${e.message}`);
        }
    }
}

async function run() {
    const modelsToTest = [
        'gemini-1.5-flash',
        'gemini-1.5-pro',
        'gemini-2.0-flash',
        'gemini-2.0-flash-exp',
        'gemini-2.5-flash',
    ];

    for (const m of modelsToTest) {
        await testModel(m);
    }
}

run();
