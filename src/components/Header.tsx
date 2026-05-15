import { Shield } from 'lucide-react';

export default function Header() {
  return (
    <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center gap-3">
        <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-indigo-500/20 border border-indigo-500/30">
          <Shield className="w-5 h-5 text-indigo-400" />
        </div>
        <div>
          <h1 className="text-lg font-semibold text-white leading-tight">NIST CSF 2.0 Assessment Dashboard</h1>
          <p className="text-xs text-slate-400">Cybersecurity Framework Implementation Review</p>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <span className="hidden sm:inline-flex items-center gap-1.5 text-xs text-slate-400 bg-slate-800 border border-slate-700 px-3 py-1.5 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span>
            Live Assessment
          </span>
        </div>
      </div>
    </header>
  );
}
