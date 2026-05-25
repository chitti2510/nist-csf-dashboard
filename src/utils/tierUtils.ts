// Neutral, non-judgmental tier colors.
// No traffic-light red→green scale — each tier gets a distinct but
// equal-weight color. Tier 1 is not "bad"; Tier 4 is not always the goal.
export const TIER_COLORS: Record<string, string> = {
  '1': '#64748b', // slate  — Tier 1: Partial
  '2': '#3b82f6', // blue   — Tier 2: Risk Informed
  '3': '#8b5cf6', // violet — Tier 3: Repeatable
  '4': '#06b6d4', // cyan   — Tier 4: Adaptive
};

export const TIER_BG_CLASSES: Record<string, string> = {
  '1': 'bg-slate-500/15 border-slate-500/30 text-slate-300',
  '2': 'bg-blue-500/15 border-blue-500/30 text-blue-300',
  '3': 'bg-violet-500/15 border-violet-500/30 text-violet-300',
  '4': 'bg-cyan-500/15 border-cyan-500/30 text-cyan-300',
};

export const TIER_LABELS: Record<string, string> = {
  '1': 'Tier 1: Partial',
  '2': 'Tier 2: Risk Informed',
  '3': 'Tier 3: Repeatable',
  '4': 'Tier 4: Adaptive',
};

export const TIER_SHORT_LABELS: Record<string, string> = {
  '1': 'T1 · Partial',
  '2': 'T2 · Risk Informed',
  '3': 'T3 · Repeatable',
  '4': 'T4 · Adaptive',
};

export function getTierKey(score: number): string {
  return String(Math.min(4, Math.max(1, Math.round(score))));
}

export function getFunctionColor(fnName: string): string {
  const colors: Record<string, string> = {
    Govern:  '#818cf8',
    Identify: '#38bdf8',
    Protect:  '#34d399',
    Detect:   '#fb923c',
    Respond:  '#f472b6',
    Recover:  '#a78bfa',
  };
  return colors[fnName] ?? '#94a3b8';
}

export function getFunctionBgGradient(fnName: string): string {
  const map: Record<string, string> = {
    Govern:   'from-indigo-500/10 to-indigo-500/5 border-indigo-500/20',
    Identify: 'from-sky-500/10 to-sky-500/5 border-sky-500/20',
    Protect:  'from-emerald-500/10 to-emerald-500/5 border-emerald-500/20',
    Detect:   'from-orange-500/10 to-orange-500/5 border-orange-500/20',
    Respond:  'from-pink-500/10 to-pink-500/5 border-pink-500/20',
    Recover:  'from-violet-500/10 to-violet-500/5 border-violet-500/20',
  };
  return map[fnName] ?? 'from-slate-500/10 to-slate-500/5 border-slate-500/20';
}
