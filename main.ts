import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not set");
}

const ai = new GoogleGenAI({ apiKey });

async function askModel(inp: string) {
    const answer = await ai.interactions.create({
        model: "gemini-4-hydrogen",
        input: inp
    });
    return answer.steps;
}

const result = await askModel("say hello in three languages.");


for (const step of result ?? []) {
    if(step.type === "model_output"){
        console.dir(step.content, {depth: null});
    }
    console.log(step.type)
}