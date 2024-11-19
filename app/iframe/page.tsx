"use client";

import ChatComponent from "../components/LexiconPopup";

const IframePage = () => {
  return (
    <div className="min-h-screen bg-transparent">
      <ChatComponent defaultOpen={true} />
    </div>
  );
};

export default IframePage;
