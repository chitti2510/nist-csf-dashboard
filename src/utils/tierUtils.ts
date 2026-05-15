export function getTierColor(score: number): string {
  const t = Math.round(score);
  if (t <= 1) return '#ef4444'; // red
  if (t === 2) return '#f97316'; // orange
  if (t === 3) return '#eab308'; // yellow
  return '#22c55e'; // green
}

export function getTierBgColor(score: number): string {
  const t = Math.round(score);
  if (t <= 1) return 'bg-red-500/20 text-red-400 border-red-500/30';
  if (t === 2) return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
  if (t === 3) return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
  return 'bg-green-500/20 text-green-400 border-green-500/30';
}

export function getTierLabel(score: number): string {
  const t = Math.round(score);
  if (t <= 1) return 'Tier 1';
  if (t === 2) return 'Tier 2';
  if (t === 3) return 'Tier 3';
  return 'Tier 4';
}

export function getFunctionColor(fnName: string): string {
  const colors: Record<string, string> = {
    Govern: '#818cf8',
    Identify: '#38bdf8',
    Protect: '#34d399',
    Detect: '#fb923c',
    Respond: '#f472b6',
    Recover: '#a78bfa',
  };
  return colors[fnName] ?? '#94a3b8';
}

export function getFunctionBgGradient(fnName: string): string {
  const colors: Record<string, string> = {
    Govern: 'from-indigo-500/10 to-indigo-500/5 border-indigo-500/20',
    Identify: 'from-sky-500/10 to-sky-500/5 border-sky-500/20',
    Protect: 'from-emerald-500/10 to-emerald-500/5 border-emerald-500/20',
    Detect: 'from-orange-500/10 to-orange-500/5 border-orange-500/20',
    Respond: 'from-pink-500/10 to-pink-500/5 border-pink-500/20',
    Recover: 'from-violet-500/10 to-violet-500/5 border-violet-500/20',
  };
  return colors[fnName] ?? 'from-slate-500/10 to-slate-500/5 border-slate-500/20';
}
