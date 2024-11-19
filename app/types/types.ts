import { WalletContextState } from "@solana/wallet-adapter-react";
import { tools as defaultTools } from "../configs/default/functionDefs";

export interface FunctionCall {
  name: string;
  arguments: Record<string, any>;
}

export interface ChatResponse {
  content: string | null;
  functionCall: FunctionCall | null;
}

export interface Message {
  role: "system" | "user" | "assistant" | "function";
  content: string;
  name?: string;
  function_call?: {
    name: string;
    arguments: string;
  };
}

export interface FrontendMessage {
  role: string;
  content: string;
}

export type FunctionHandler = (
  args: Record<string, any>,
  wallet: WalletContextState,
  rpcUrl?: string
) => Promise<string | null>;

export interface ChatConfig {
  tools: typeof defaultTools;
  systemPrompt: string;
  functionHandlers: Record<string, FunctionHandler>;
}

export interface ChatComponentProps {
  configId?: string; // e.g., 'netflix', 'default', etc.
  defaultOpen?: boolean;
}
