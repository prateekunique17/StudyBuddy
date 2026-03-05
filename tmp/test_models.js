const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config({ path: './.env.local' });

async function testModel(modelName) {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: modelName });
    try {
        process.stdout.write(`Testing ${modelName}... `);
        const result = await model.generateContent("Hi");
        console.log(`[SUCCESS] Output length: ${result.response.text().length}`);
    } catch (e) {
        if (e.message.includes("429")) {
            console.log(`[FAILED] 429 Quota Exceeded (Limit 0: Free tier likely unsupported in your region without billing)`);
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
        'gemini-pro'
    ];

    for (const m of modelsToTest) {
        await testModel(m);
    }
}

run();
