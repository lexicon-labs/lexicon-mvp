"use client";

import LexiconButton from "./components/LexiconButton";
import ChatComponent from "./components/LexiconPopup";

export default function Home() {
  return (
    <main className="flex-1 flex flex-col">
      <div className="absolute top-4 left-4 z-10">
        <a
          href="https://lexicon.chat"
          className="px-4 py-2 text-gray-600 hover:text-black flex items-center gap-2 transition-colors cursor-pointer rounded-md hover:bg-gray-100 active:bg-gray-200"
          onClick={() => window.location.href = 'https://lexicon.chat'}
        >
          <span>←</span> Go Back
        </a>
      </div>

      <div className="relative text-center space-y-8 pt-16 lg:pt-24 mb-12 px-4">


        <div className="space-y-6 animate-fade-in-up">
          <h1 className="text-5xl lg:text-7xl font-bold text-black">
            Lexicon:{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-black to-gray-600 animate-gradient bg-[length:200%_auto]">
              Framework Demo
            </span>
          </h1>
          <p className="text-gray-600 max-w-xl mx-auto text-lg lg:text-xl font-light space-y-4">
          Integrate this into your dApp and personalize it effortlessly with our framework.            <br />
          </p>
        </div>
      </div>

      <div className="flex-1 flex items-start justify-center px-4 pb-12">
        <LexiconButton />
      </div>
      <div className="flex justify-center pb-4">
        <a 
          href="https://github.com/lexicon-labs/lexicon-mvp"
          className="inline-flex items-center gap-2 mt-4 px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 hover:text-black transition-all"
          target="_blank"
          rel="noopener noreferrer"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
          </svg>
          View on GitHub
        </a>
      </div>
    </main>
  );
}
