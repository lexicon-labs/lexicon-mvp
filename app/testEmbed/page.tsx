"use client";

import React from "react";

const TestEmbed = () => {
  return (
    <div className="min-h-screen p-8 bg-gradient-to-b from-gray-50 to-white">
      <h1 className="text-center text-2xl font-bold mb-8">
        Lexicon AI Chatbot Embed Test
      </h1>
      <p className="text-center text-gray-600 mb-4">
        The chatbot will appear in the bottom right corner
      </p>
      
      {/* Sample content to show scrolling */}
      <div className="max-w-2xl mx-auto prose">
        <h2>Sample Content</h2>
        {[...Array(10)].map((_, i) => (
          <p key={i}>
            This is sample content to demonstrate how the chatbot stays fixed
            while scrolling. Lorem ipsum dolor sit amet, consectetur adipiscing
            elit.
          </p>
        ))}
      </div>

      <iframe
        src="http://localhost:3000/iframe"
        title="Lexicon AI Chatbot"
        style={{
          position: "fixed",
          bottom: "0",
          right: "0",
          width: "400px",
          height: "700px",
          border: "none",
          background: "transparent",
          overflow: "hidden",
        }}
      />
    </div>
  );
};

export default TestEmbed; 