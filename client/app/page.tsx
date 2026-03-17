"use client";

import { useState } from "react";
import axios from "axios";
import { Shield, Search, CheckCircle2, AlertCircle, ArrowRight, Code } from "lucide-react";
import ReactDiffViewer from "react-diff-viewer-continued";

export default function AuditPage() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<any>(null);

  const handleAudit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;

    setLoading(true);
    setResults(null);
    try {
      const response = await axios.post("http://localhost:5000/api/audit", { url });
      setResults(response.data);
    } catch (error) {
      console.error("Audit failed:", error);
      alert("Search failed. Ensure backend is running on port 5000.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen p-8 max-w-6xl mx-auto">
      <header className="flex items-center gap-3 mb-12">
        <div className="p-2 bg-blue-600 rounded-lg">
          <Shield className="w-8 h-8 text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">AI-Auditor</h1>
          <p className="text-slate-400">Automated A11y Compliance Engine</p>
        </div>
      </header>

      <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-8 mb-12 backdrop-blur-sm">
        <form onSubmit={handleAudit} className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
            <input
              type="url"
              placeholder="https://example.com"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-slate-950 border border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              required
            />
          </div>
          <button
            disabled={loading}
            className="px-8 py-4 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-700 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-500/20"
          >
            {loading ? "Analyzing..." : "Start Audit"}
            {!loading && <ArrowRight className="w-5 h-5" />}
          </button>
        </form>
      </div>

      {results && (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="flex items-center justify-between p-6 bg-slate-900 border border-slate-800 rounded-xl">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-red-500/10 rounded-full">
                <AlertCircle className="w-6 h-6 text-red-500" />
              </div>
              <div>
                <p className="text-sm text-slate-400">Total Violations</p>
                <p className="text-2xl font-bold text-red-400">{results.totalViolations}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-slate-400">Target URL</p>
              <p className="font-mono text-blue-400 truncate max-w-[300px]">{results.url}</p>
            </div>
          </div>

          <div className="grid gap-6">
            {results.results.map((item: any, idx: number) => (
              <div key={idx} className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
                <div className="p-6 border-b border-slate-800 flex items-start justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold ${
                        item.impact === 'critical' ? 'bg-red-500/20 text-red-400' : 'bg-yellow-500/20 text-yellow-400'
                      }`}>
                        {item.impact}
                      </span>
                      <h3 className="text-lg font-bold">{item.help}</h3>
                    </div>
                    <p className="text-slate-400 text-sm">{item.description}</p>
                  </div>
                  <CheckCircle2 className="w-6 h-6 text-emerald-500 shrink-0" />
                </div>
                
                <div className="p-6 bg-slate-950/50">
                   <div className="flex items-center gap-2 mb-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                     <Code className="w-4 h-4" />
                     Proposed AI Fix
                   </div>
                   <ReactDiffViewer
                     oldValue={item.nodes[0]}
                     newValue={item.suggestedFix}
                     splitView={false}
                     useDarkTheme={true}
                     styles={{
                       variables: {
                         dark: {
                           diffViewerBackground: '#020617',
                           codeFoldGutterBackground: '#0f172a',
                         }
                       }
                     }}
                   />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </main>
  );
}
