// src/app/components/ActionWindow.tsx
import React from "react";

interface ActionWindowProps {
  iframeHtml: string | null;
}

const ActionWindow: React.FC<ActionWindowProps> = React.memo(({ iframeHtml }) => {
  return (
    <div className="w-full h-full p-4">
      {iframeHtml ? (
        <div dangerouslySetInnerHTML={{ __html: iframeHtml }} />
      ) : (
        <p>No content to display</p>
      )}
    </div>
  );
});

export default ActionWindow;