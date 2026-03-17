import React, { useState } from 'react';
import { useAudit } from './hooks/useAudit';

function App() {
  const [code, setCode] = useState('<button onclick="alert(\'hi\')">Click me</button>');
  const { results, loading, runAudit } = useAudit();

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8 font-sans">
      <header className="mb-8 border-b border-gray-700 pb-4">
        <h1 className="text-3xl font-bold text-blue-400">AI-Auditor</h1>
        <p className="text-gray-400 text-sm">Automated Accessibility Compliance Engine</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Section */}
        <section className="flex flex-col gap-4">
          <label className="text-lg font-semibold">Input HTML/JSX</label>
          <textarea
            className="w-full h-64 p-4 bg-gray-800 border border-gray-700 rounded-lg font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
          <button
            onClick={() => runAudit(code)}
            disabled={loading}
            className={`py-3 px-6 rounded-lg font-bold transition-all ${
              loading ? 'bg-gray-600 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-500 shadow-lg shadow-blue-500/20'
            }`}
          >
            {loading ? 'Analyzing with Gemini...' : 'Analyze Accessibility'}
          </button>
        </section>

        {/* Results Section */}
        <section className="flex flex-col gap-4">
          <label className="text-lg font-semibold">Audit Results</label>
          <div className="flex flex-col gap-4 overflow-y-auto max-h-[500px] pr-2">
            {results.length === 0 && !loading && (
              <div className="p-8 text-center border-2 border-dashed border-gray-700 rounded-lg text-gray-500">
                Run an audit to see accessibility improvements.
              </div>
            )}
            
            {results.map((item, index) => (
              <div key={index} className="p-4 bg-gray-800 border-l-4 border-yellow-500 rounded-r-lg shadow-md">
                <h3 className="text-yellow-400 font-bold mb-1">{item.type}</h3>
                <p className="text-sm text-gray-300 mb-3 italic">"{item.reason}"</p>
                <div className="space-y-2">
                  <div className="p-2 bg-red-900/30 text-red-200 text-xs font-mono rounded border border-red-800">
                    - {item.badCode}
                  </div>
                  <div className="p-2 bg-green-900/30 text-green-200 text-xs font-mono rounded border border-green-800">
                    + {item.goodCode}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default App;