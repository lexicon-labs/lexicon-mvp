"use client";

const TestEmbedPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-2xl font-bold mb-4">Lexicon Chat Widget Test Page</h1>
      
      <div className="grid grid-cols-2 gap-8 mb-8">
        {/* Example 1: Standard size */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Standard Size</h2>
          <div className="h-[600px] w-[400px] bg-white/5 rounded-3xl"> 
            <iframe 
              src="/iframe?configId=default"
              className="w-full h-full border-0 rounded-3xl"
              allow="clipboard-write"
            />
          </div>
        </div>

        {/* Example 2: Wide format */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Wide Format</h2>
          <div className="h-[500px] w-[600px] bg-white/5 rounded-3xl">
            <iframe 
              src="/iframe?configId=default"
              className="w-full h-full border-0 rounded-3xl"
              allow="clipboard-write"
            />
          </div>
        </div>
      </div>

      {/* Example 3: Full height */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Full Height</h2>
        <div className="h-[800px] w-[400px] bg-white/5 rounded-3xl">
          <iframe 
            src="/iframe?configId=default"
            className="w-full h-full border-0 rounded-3xl"
            allow="clipboard-write"
          />
        </div>
      </div>

      {/* Example 4: Bottom right fixed position (like traditional widget) */}
      <div className="fixed bottom-4 right-4 h-[600px] w-[400px]">
        <iframe 
          src="/iframe?configId=default"
          className="w-full h-full border-0 rounded-3xl shadow-2xl"
          allow="clipboard-write"
        />
      </div>

      {/* Integration instructions */}
      <div className="mt-8 p-6 bg-white rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Integration Guide</h2>
        <p className="text-gray-600 mb-4">To embed the chat widget, simply create a container and add the iframe:</p>
        <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto">
          {`<div class="[your-desired-dimensions-and-position]">
  <iframe 
    src="your-domain/iframe?configId=default"
    class="w-full h-full border-0 rounded-3xl"
    allow="clipboard-write"
  />
</div>`}
        </pre>
      </div>
    </div>
  );
};

export default TestEmbedPage;
