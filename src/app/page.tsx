/* eslint-disable @next/next/no-img-element */
// src/app/page.tsx
"use client";

import { useState } from "react";
import WalletConnectButton from "../app/components/WalletConnectButton";
import ChatComponent from "../app/components/ChatComponent";

export default function Home() {
  const [isChatOpen, setIsChatOpen] = useState<boolean>(false);

  return (
    <main className="min-h-screen flex flex-col items-center px-4 py-12 relative">
      <div className="absolute top-4 right-4 z-10">
        <WalletConnectButton />
      </div>
      
      <div className="text-center space-y-6 mb-12">
        <div className="flex justify-center mb-8">
          <img src="/lexicon/lexicon-logo.png" alt="Lexicon" className="h-16 w-auto" />
        </div>
        
        <h1 className="text-6xl font-bold text-black">
          Welcome to <span className="text-black">Lexicon</span>
        </h1>
        <p className="text-gray-600 max-w-md mx-auto text-lg">
          Experience AI-powered interactions with the Solana blockchain
        </p>
      </div>

      {!isChatOpen ? (
        <button
          onClick={() => setIsChatOpen(true)}
          className="group relative inline-flex items-center justify-center px-8 py-3 text-lg font-medium text-white bg-black rounded-full overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-lg"
        >
          <span className="relative">Start AI Chat</span>
          <div className="absolute inset-0 bg-white/10 group-hover:animate-shimmer" />
        </button>
      ) : (
        <div className="w-full max-w-8xl animate-fade-in">
          <ChatComponent />
        </div>
      )}
    </main>
  );
}