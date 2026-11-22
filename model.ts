import OpenAI from "openai";
import type { ChatCompletionMessageParam, ChatCompletionTool } from "openai/resources/chat/completions";
import type { Message, ToolDefinition } from "./types.ts";
import { tools } from "./tools.ts";

const key = process.env.GEMINI_API_KEY;
if (!key) {
    throw new Error("GEMINI_API_KEY not detected");
}

const openai = new OpenAI({
    apiKey: key,
    baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/"
});

// Converts ONE of our messages into OpenAI's format.
// (Not exported: only askModel below uses it.)
function toOpenAI(m: Message): ChatCompletionMessageParam {
    switch (m.role) {
        case "system":
            return { role: "system", content: m.content };
        case "user":
            return { role: "user", content: m.content };
        case "assistant":
            // TODO: also convert m.toolCalls when we add tool calling
            return { role: "assistant", content: m.content };
        case "tool":
            return { role: "tool", tool_call_id: m.callId, content: m.content };
    }
}

function toolToOpenAI(t: ToolDefinition): ChatCompletionTool {
    return { type: "function", function: { name: t.name, description: t.description, parameters: t.parameters } };
}

export async function askModel(messages: Message[]): Promise<string> {
    const response = await openai.chat.completions.create({
        model: "gemini-4-hydrogen",
        messages: messages.map(toOpenAI),
        tools: tools.map(toolToOpenAI)
    });

    const choice = response.choices[0];
    if (!choice) {
        throw new Error("model returned no choices");
    }
    console.dir(choice.message, { depth: null });

    return choice.message.content ?? "";
}
