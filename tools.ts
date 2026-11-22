import type { ToolDefinition } from "./types.ts";

const tools: ToolDefinition[] = [
    {
        name: "run_bash",
        description: "Run a bash command in the project directory and return its output.",
        parameters: {
            type: "object",
            properties: {
                command: { type: "string", description: "The bash command to run." },
            },
            required: ["command"]
        },
    }
]

export { tools }
