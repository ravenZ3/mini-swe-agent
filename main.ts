import * as readline from "node:readline/promises"
import { stdin, stdout } from "node:process"
import type { Message } from "./types.ts";
import { askModel } from "./model.ts";
import { exec } from "node:child_process"
import { promisify } from "node:util";


const execAsync = promisify(exec);

const context: Message[] = [{role:"system", content:"You are a coding agent that helps user solve bugs. You are a good talker too."}]



//asking for user input
const rl = readline.createInterface({ input: stdin, output: stdout });
console.log("Hi, How's it going\n");


const task: string = await rl.question("What should agent do? > ");
context.push({role:"user", content: task})
const result = await askModel(context);



rl.close();
