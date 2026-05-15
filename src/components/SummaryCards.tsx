import { TrendingUp, AlertTriangle, CheckCircle, Target } from 'lucide-react';
import type { DashboardData } from '../hooks/useData';

interface Props {
  data: DashboardData;
}

const TIER_CONFIG = [
  { tier: '1', label: 'Tier 1 – Partial', color: 'text-red-400', bg: 'bg-red-500/10 border-red-500/20', dot: 'bg-red-500' },
  { tier: '2', label: 'Tier 2 – Risk Informed', color: 'text-orange-400', bg: 'bg-orange-500/10 border-orange-500/20', dot: 'bg-orange-500' },
  { tier: '3', label: 'Tier 3 – Repeatable', color: 'text-yellow-400', bg: 'bg-yellow-500/10 border-yellow-500/20', dot: 'bg-yellow-500' },
  { tier: '4', label: 'Tier 4 – Adaptive', color: 'text-green-400', bg: 'bg-green-500/10 border-green-500/20', dot: 'bg-green-500' },
];

export default function SummaryCards({ data }: Props) {
  const avg = data.overallAvgCurrent;
  const total = Object.values(data.tierCounts).reduce((s, n) => s + n, 0);

  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
      {/* Overall Score */}
      <div className="col-span-2 lg:col-span-3 xl:col-span-2 bg-slate-900 border border-slate-800 rounded-xl p-5">
        <div className="flex items-start justify-between mb-4">
          <div>
            <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Overall Maturity</p>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-4xl font-bold text-white">{avg.toFixed(2)}</span>
              <span className="text-slate-500 text-sm">/ 4.0</span>
            </div>
          </div>
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-indigo-500/20 border border-indigo-500/30">
            <TrendingUp className="w-5 h-5 text-indigo-400" />
          </div>
        </div>
        <div className="w-full bg-slate-800 rounded-full h-2 mb-2">
          <div
            className="h-2 rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 transition-all"
            style={{ width: `${(avg / 4) * 100}%` }}
          />
        </div>
        <p className="text-xs text-slate-500">{Math.round((avg / 4) * 100)}% of maximum maturity</p>
      </div>

      {/* Stats */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 flex flex-col justify-between">
        <div className="flex items-center justify-between mb-2">
          <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Subcategories</p>
          <CheckCircle className="w-4 h-4 text-slate-600" />
        </div>
        <div>
          <span className="text-3xl font-bold text-white">{total}</span>
          <p className="text-xs text-slate-500 mt-1">assessed controls</p>
        </div>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 flex flex-col justify-between">
        <div className="flex items-center justify-between mb-2">
          <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Gap Items</p>
          <AlertTriangle className="w-4 h-4 text-slate-600" />
        </div>
        <div>
          <span className="text-3xl font-bold text-red-400">{data.tierCounts['1'] + data.tierCounts['2']}</span>
          <p className="text-xs text-slate-500 mt-1">Tier 1–2 controls</p>
        </div>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 flex flex-col justify-between">
        <div className="flex items-center justify-between mb-2">
          <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Target Average</p>
          <Target className="w-4 h-4 text-slate-600" />
        </div>
        <div>
          <span className="text-3xl font-bold text-emerald-400">
            {(data.functions.reduce((s, f) => s + f.avgTargetScore, 0) / data.functions.length).toFixed(1)}
          </span>
          <p className="text-xs text-slate-500 mt-1">avg target tier</p>
        </div>
      </div>

      {/* Tier Distribution */}
      <div className="col-span-2 lg:col-span-3 xl:col-span-6 bg-slate-900 border border-slate-800 rounded-xl p-5">
        <p className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-4">Tier Distribution</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {TIER_CONFIG.map(cfg => {
            const count = data.tierCounts[cfg.tier] ?? 0;
            const pct = total ? Math.round((count / total) * 100) : 0;
            return (
              <div key={cfg.tier} className={`rounded-lg border p-3 ${cfg.bg}`}>
                <div className="flex items-center gap-2 mb-2">
                  <span className={`w-2 h-2 rounded-full ${cfg.dot}`}></span>
                  <span className={`text-xs font-medium ${cfg.color}`}>{cfg.label}</span>
                </div>
                <div className="flex items-baseline gap-1">
                  <span className={`text-2xl font-bold ${cfg.color}`}>{count}</span>
                  <span className="text-xs text-slate-500">controls ({pct}%)</span>
                </div>
                <div className="mt-2 w-full bg-slate-800/50 rounded-full h-1.5">
                  <div className={`h-1.5 rounded-full ${cfg.dot}`} style={{ width: `${pct}%` }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
