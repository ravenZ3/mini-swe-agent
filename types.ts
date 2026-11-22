// Our own provider-neutral types. Only model.ts knows how to convert these
// to/from a specific provider's wire format (currently OpenAI-compatible).

// A request from the model to run a tool.
// `arguments` is already-parsed (the wire format sends it as a JSON string).
type ToolCall = {
    id: string,
    name: string,
    arguments: Record<string, unknown>
}

// One entry in the conversation history.
type Message =
    { role: "system", content: string } |
    { role: "user", content: string } |
    { role: "assistant", content: string, toolCalls?: ToolCall[] } |
    { role: "tool", callId: string, content: string }

// Describes a tool to the model. `parameters` is a JSON Schema object.
type ToolDefinition = {
    name: string,
    description: string,
    parameters: Record<string, unknown>
}

export type { Message, ToolCall, ToolDefinition }
