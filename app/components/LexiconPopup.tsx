import { useState, useRef, useEffect } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import LoadingSpinner from "./LoadingSpinner";
import { ChatResponse, FrontendMessage, FunctionHandler } from "../types/types";
import ReactMarkdown from "react-markdown";
import WalletConnectButton from "./WalletProvider/WalletConnectButton";
import {
  sendMessageLexicon,
  executeFunctionCall,
} from "../utils/communications";
import { tools as defaultTools } from "@/configs/default/functionDefs";
import { systemPrompt as defaultSystemPrompt } from "@/configs/default/systemPrompt";
import { functionHandlers as defaultFunctionHandlers } from "@/configs/default/functions";
import { ChatConfig, ChatComponentProps } from "../types/types";

const ChatComponent: React.FC<ChatComponentProps> = ({
  configId = "default",
  defaultOpen = false,
}) => {
  const wallet = useWallet();
  const [isChatOpen, setIsChatOpen] = useState<boolean>(defaultOpen);
  const [chatHistory, setChatHistory] = useState<FrontendMessage[]>([]);
  const [userInput, setUserInput] = useState<string>("");
  const [isGenerating, setIsGenerating] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [config, setConfig] = useState<ChatConfig>({
    tools: defaultTools,
    systemPrompt: defaultSystemPrompt,
    functionHandlers: defaultFunctionHandlers,
  });
  const [rpcUrl, setRpcUrl] = useState<string>();

  useEffect(() => {
    const loadConfig = async () => {
      if (configId === "default") return;

      try {
        const [tools, systemPrompt, handlers] = await Promise.all([
          import(`../configs/${configId}/functionDefs`).then((m) => m.tools),
          import(`../configs/${configId}/systemPrompt`).then(
            (m) => m.systemPrompt
          ),
          import(`../configs/${configId}/functions`).then(
            (m) => m.functionHandlers
          ),
        ]);

        setConfig({
          tools,
          systemPrompt,
          functionHandlers: handlers,
        });
      } catch (error) {
        console.error(
          `Failed to load config for ${configId}, using default`,
          error
        );
      }
    };

    loadConfig();
  }, [configId]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [chatHistory, isGenerating]);

  const startChat = async () => {
    if (userInput.trim() === "") return;

    const newMessage = { role: "user", content: userInput };
    setChatHistory([...chatHistory, newMessage]);
    setUserInput("");
    setIsGenerating(true);

    try {
      const response: ChatResponse = await sendMessageLexicon(
        userInput,
        config
      );

      if (response.content) {
        const gptMessage = { role: "assistant", content: response.content };
        setChatHistory((prev) => [...prev, gptMessage]);
      }

      if (response.functionCall) {
        const functionResult = await executeFunctionCall(
          response.functionCall,
          wallet,
          config,
          rpcUrl
        );
        const functionMessage = {
          role: "assistant",
          content:
            functionResult ||
            `Function Called: ${
              response.functionCall.name
            }\nArguments: ${JSON.stringify(
              response.functionCall.arguments,
              null,
              2
            )}`,
        };
        setChatHistory((prev) => [...prev, functionMessage]);
      }
    } catch (error) {
      console.error("Error starting chat:", error);
      const errorMessage = {
        role: "assistant",
        content: "Sorry, there was an error processing your request.",
      };
      setChatHistory((prev) => [...prev, errorMessage]);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-[1000] w-[350px]">
      {!isChatOpen ? (
        <div className="flex justify-end">
          <button
            onClick={() => setIsChatOpen(true)}
            className="group relative flex items-center gap-3 px-6 py-3 bg-black hover:bg-black/90 text-white rounded-full overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
          >
            <img
              src="/lexicon/lexicon-logo.png"
              alt="Lexicon AI"
              className="h-5 w-5 rounded-full"
            />
            <span className="text-base font-medium">Chat with Lexicon</span>
            <div className="absolute inset-0 bg-white/10 group-hover:animate-shimmer" />
          </button>
        </div>
      ) : (
        <div className="w-full h-[600px] flex flex-col bg-gradient-to-b from-black to-[#0a0a0a] rounded-3xl overflow-hidden border border-gray-800/50 shadow-2xl">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 bg-black/90 border-b border-gray-800/50">
            <div className="flex items-center gap-3">
              <div className="relative">
                <img
                  src="/lexicon/lexicon-logo.png"
                  alt="Lexicon AI"
                  className="h-8 w-8 rounded-full ring-2 ring-white/20"
                />
                <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-green-500 rounded-full ring-2 ring-black"></div>
              </div>
              <div>
                <h2 className="text-white font-semibold tracking-wide">
                  Lexicon AI
                </h2>
                <p className="text-[10px] text-gray-400">
                  Online • Ready to assist
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <WalletConnectButton />
              <button
                onClick={() => setIsChatOpen(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M20 12H4"
                  />
                </svg>
              </button>
              <button
                onClick={() => setIsChatOpen(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Chat Area */}
          <div
            ref={chatContainerRef}
            className="flex-1 overflow-y-auto bg-[#0a0a0a] space-y-6 p-6 chat-scrollbar"
          >
            {/* Welcome Message - Now always visible */}
            <div className="flex items-start gap-3 animate-fade-in">
              <img
                src="/lexicon/lexicon-logo.png"
                alt="Lexicon AI"
                className="h-8 w-8 rounded-full ring-2 ring-white/20"
              />
              <div className="bg-gradient-to-br from-[#1e1e1e] to-[#1a1a1a] text-white/90 rounded-2xl rounded-tl-none px-5 py-4 max-w-[85%] shadow-xl">
                <p className="text-white font-medium">
                  👋 Welcome to Lexicon AI
                </p>
                <p className="mt-2 text-white/70 text-sm leading-relaxed">
                  I'm your specialized assistant for the Solana blockchain. Ask
                  me anything about development, transactions, or exploring the
                  ecosystem!
                </p>
              </div>
            </div>

            {/* Chat Messages */}
            {chatHistory.map((message, index) => (
              <div
                key={index}
                className={`flex items-start gap-3 ${
                  message.role === "user" ? "justify-end" : ""
                } animate-fade-in-up`}
              >
                {message.role === "assistant" && (
                  <img
                    src="/lexicon/lexicon-logo.png"
                    alt="Lexicon AI"
                    className="h-8 w-8 rounded-full ring-2 ring-white/20"
                  />
                )}
                <div
                  className={`relative max-w-[85%] shadow-lg ${
                    message.role === "user"
                      ? "bg-gradient-to-r from-white/90 to-white/80 text-black rounded-2xl rounded-br-none"
                      : "bg-gradient-to-br from-[#1e1e1e] to-[#1a1a1a] text-white/90 rounded-2xl rounded-tl-none"
                  } px-5 py-4 hover:shadow-xl transition-shadow duration-200`}
                >
                  <ReactMarkdown
                    className={`prose prose-sm max-w-none ${
                      message.role === "user" ? "prose-black" : "prose-invert"
                    }`}
                  >
                    {message.content}
                  </ReactMarkdown>
                </div>
              </div>
            ))}

            {/* Loading State */}
            {isGenerating && (
              <div className="flex items-start gap-3">
                <img
                  src="/lexicon/lexicon-logo.png"
                  alt="Lexicon AI"
                  className="h-8 w-8 rounded-full ring-2 ring-white/20"
                />
                <div className="bg-gradient-to-br from-[#1e1e1e] to-[#1a1a1a] rounded-2xl rounded-tl-none px-5 py-4 shadow-xl">
                  <LoadingSpinner />
                </div>
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="p-4 bg-black/90 border-t border-gray-800/50">
            <div className="flex gap-3 items-center">
              <div className="relative flex-1 group">
                <input
                  type="text"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  onKeyDown={(e) =>
                    e.key === "Enter" && !isGenerating && startChat()
                  }
                  disabled={isGenerating}
                  className="w-full px-5 py-3.5 bg-[#1a1a1a] text-white rounded-2xl border border-gray-800 focus:outline-none focus:border-white/50 focus:ring-2 focus:ring-white/10 placeholder-gray-500 transition-all duration-200"
                  placeholder={
                    isGenerating
                      ? "Lexicon is thinking..."
                      : "Ask anything about Solana..."
                  }
                />
                <div className="absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <button
                onClick={startChat}
                disabled={isGenerating || !userInput.trim()}
                className="p-3.5 bg-white hover:bg-gray-100 text-black rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-white/20 disabled:hover:shadow-none"
              >
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 12h14m-7-7l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
            <div className="mt-3 flex items-center justify-center">
              <a
                href="https://lexicon.chat"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#1a1a1a] hover:bg-[#1a1a1a] border border-gray-800/50 transition-colors"
              >
                <span className="text-xs text-gray-500">
                  AI Agent powered by
                </span>
                <div className="flex items-center gap-1.5">
                  <img
                    src="/lexicon/lexicon-logo-dark.png"
                    alt="Lexicon"
                    className="w-4 h-4 rounded-full"
                  />
                  <span className="text-xs font-medium text-white/90 hover:text-white transition-colors">
                    Lexicon Labs
                  </span>
                </div>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatComponent;
