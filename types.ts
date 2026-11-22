// ts types for a tool call
type ToolCall = {
    id: string,
    name: string,
    arguments: Record<string, unknown>
}

// ts type for a message
type Message =
    { role: "system", content: string } |
    { role: "user", content: string } |
    { role: "assistant", content: string, toolCalls?: ToolCall[] } |
    { role: "tool", callId: string | unknown, content: string }

export type { Message, ToolCall }



const call: ToolCall = {
    id: "call_17087598594360218765",
    name: "run_bash",
    arguments: { command: 'ls -la' },
};

const msgs: Message[] = [
    { role: "user", content: "is there a tsconfig?" },
    { role: "assistant", content: "", toolCalls: [call] },
    { role: "tool", callId: call.id, content: "tsconfig.json" },
];
