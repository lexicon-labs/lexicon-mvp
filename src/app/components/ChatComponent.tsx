// src/app/components/ChatComponent.tsx
import { useState } from "react";
import { LexiconSDK } from "lexicon-sdk-mvp";
import { useWallet } from "@solana/wallet-adapter-react";
import LoadingSpinner from "./LoadingSpinner";

interface Message {
  role: string;
  content: string;
}

interface ChatResponse {
  content: string | null;
  functionCall: {
    name: string;
    arguments: any;
  } | null;
}

const ChatComponent = () => {
  const wallet = useWallet();
  const [chatHistory, setChatHistory] = useState<Message[]>([]);
  const [userInput, setUserInput] = useState<string>("");
  const [isGenerating, setIsGenerating] = useState(false);

  const handleFunctionCall = async (functionCall: any) => {
    if (functionCall.name === "create_solana_transaction") {
      if (!wallet.connected || !wallet.signTransaction || !wallet.publicKey) {
        return "Please connect your wallet first";
      }

      try {
        const { transaction, connection } = await LexiconSDK.createSolanaTransaction(
          functionCall.arguments.recipient_wallet,
          functionCall.arguments.amount_sol,
          wallet.publicKey
        );

        // Sign the transaction
        const signedTx = await wallet.signTransaction(transaction);

        // Send the transaction
        const signature = await connection.sendRawTransaction(
          signedTx.serialize()
        );

        // Wait for confirmation
        const latestBlockhash = await connection.getLatestBlockhash();
        await connection.confirmTransaction({
          signature,
          blockhash: latestBlockhash.blockhash,
          lastValidBlockHeight: latestBlockhash.lastValidBlockHeight,
        });

        return `Transaction successful! Signature: ${signature}`;
      } catch (error: unknown) {
        console.error("Transaction error:", error);
        if (error instanceof Error) {
          return `Transaction failed: ${error.message}`;
        }
        return "Transaction failed: Unknown error occurred";
      }
    } else if (functionCall.name === "create_solana_swap") {
      if (!wallet.connected || !wallet.signTransaction || !wallet.publicKey) {
        return "Please connect your wallet first";
      }

      try {
        const { transaction, connection } = await LexiconSDK.createSolanaSwapTransaction(
          functionCall.arguments.input_mint,
          functionCall.arguments.output_mint,
          functionCall.arguments.amount,
          functionCall.arguments.slippage_bps,
          wallet.publicKey
        );

        // Sign the transaction
        const signedTx = await wallet.signTransaction(transaction);

        // Send the transaction
        const signature = await connection.sendRawTransaction(
          signedTx.serialize()
        );

        // Wait for confirmation
        const latestBlockhash = await connection.getLatestBlockhash();
        await connection.confirmTransaction({
          signature,
          blockhash: latestBlockhash.blockhash,
          lastValidBlockHeight: latestBlockhash.lastValidBlockHeight,
        });

        return `Swap successful! Signature: ${signature}`;
      } catch (error: unknown) {
        console.error("Swap error:", error);
        if (error instanceof Error) {
          return `Swap failed: ${error.message}`;
        }
        return "Swap failed: Unknown error occurred";
      }
    }
    return null;
  };

  const startChat = async () => {
    if (userInput.trim() === "") return;

    const newMessage = { role: "user", content: userInput };
    setChatHistory([...chatHistory, newMessage]);
    setUserInput("");
    setIsGenerating(true);

    try {
      const response: ChatResponse = await LexiconSDK.sendMessage(userInput);

      if (response.content) {
        const gptMessage = { role: "assistant", content: response.content };
        setChatHistory((prev) => [...prev, gptMessage]);
      }

      if (response.functionCall) {
        const functionResult = await handleFunctionCall(response.functionCall);
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
    <div className="w-full h-[600px] flex flex-col rounded-2xl bg-white border border-gray-200 shadow-lg">
      {/* Lexicon Header */}
      <div className="flex items-center gap-3 p-4 border-b border-gray-100">
        <img src="/lexicon/lexicon-logo.png" alt="Lexicon AI" className="h-8 w-8" />
        <h2 className="text-xl font-semibold text-black">
          Lexicon AI Assistant
        </h2>
      </div>

      {/* Chat History */}
      <div className="flex-1 p-6 overflow-y-auto space-y-4 chat-scrollbar">
        {chatHistory.map((message, index) => (
          <div
            key={index}
            className={`flex ${
              message.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            {message.role === "assistant" && (
              <img src="/lexicon/lexicon-logo.png" alt="Lexicon AI" className="h-6 w-6 mr-2 self-end" />
            )}
            <div
              className={`max-w-[80%] px-4 py-2 rounded-2xl ${
                message.role === "user"
                  ? "bg-black text-white rounded-br-none"
                  : "bg-gray-50 text-black rounded-bl-none border border-gray-100"
              }`}
            >
              <p className="text-sm">{message.content}</p>
            </div>
          </div>
        ))}
        {isGenerating && (
          <div className="flex items-start">
            <img src="/lexicon/lexicon-logo.png" alt="Lexicon AI" className="h-6 w-6 mr-2 self-end" />
            <div className="max-w-[80%] px-4 py-2 rounded-2xl bg-gray-50 border border-gray-100">
              <LoadingSpinner />
            </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-gray-100">
        <div className="flex gap-2">
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && !isGenerating && startChat()}
            disabled={isGenerating}
            className="flex-1 px-4 py-2 bg-gray-50 text-black rounded-full border border-gray-200 focus:outline-none focus:border-gray-300 transition-colors disabled:opacity-50"
            placeholder={isGenerating ? "Waiting for response..." : "Ask Lexicon AI anything..."}
          />
          <button
            onClick={startChat}
            disabled={isGenerating}
            className="px-6 py-2 bg-black text-white rounded-full hover:bg-gray-900 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatComponent;