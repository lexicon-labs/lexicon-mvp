"use client";

import ChatComponent from "../components/LexiconPopup";
import { useSearchParams } from "next/navigation";

const IframePage = () => {
  const searchParams = useSearchParams();
  const configId = searchParams.get("configId") || "default";

  return (
    <div className="absolute inset-0 w-full h-full bg-transparent">
      <ChatComponent defaultOpen={true} configId={configId} />
    </div>
  );
};

export default IframePage;
