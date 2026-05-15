import type { FunctionData } from '../hooks/useData';
import { getFunctionColor, getFunctionBgGradient } from '../utils/tierUtils';
import CategoryCard from './CategoryCard';

interface Props {
  fn: FunctionData;
}

export default function FunctionSection({ fn }: Props) {
  const color = getFunctionColor(fn.name);
  const gradient = getFunctionBgGradient(fn.name);
  const gap = fn.avgTargetScore - fn.avgCurrentScore;

  return (
    <div className={`rounded-xl border bg-gradient-to-br ${gradient} p-5`}>
      {/* Function header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <span
            className="inline-flex items-center justify-center w-8 h-8 rounded-lg text-sm font-bold"
            style={{ background: `${color}25`, color, border: `1px solid ${color}40` }}
          >
            {fn.code}
          </span>
          <div>
            <h2 className="text-base font-semibold text-white">{fn.name}</h2>
            <p className="text-xs text-slate-400">
              {fn.categories.length} categories · {fn.categories.reduce((s, c) => s + c.subcategories.length, 0)} subcategories
            </p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-xs text-slate-400 mb-0.5">Current / Target</div>
          <div className="flex items-baseline gap-1">
            <span className="text-xl font-bold" style={{ color }}>{fn.avgCurrentScore.toFixed(2)}</span>
            <span className="text-slate-500 text-sm">/ {fn.avgTargetScore.toFixed(2)}</span>
          </div>
          {gap > 0 && (
            <span className="text-xs text-amber-400">Gap: {gap.toFixed(2)}</span>
          )}
        </div>
      </div>

      {/* Overall function progress bar */}
      <div className="relative h-1.5 bg-slate-800/50 rounded-full mb-5 overflow-hidden">
        <div
          className="absolute top-0 bottom-0 w-0.5 bg-slate-500/70 z-10"
          style={{ left: `${(fn.avgTargetScore / 4) * 100}%` }}
        />
        <div
          className="h-full rounded-full transition-all duration-700"
          style={{ width: `${(fn.avgCurrentScore / 4) * 100}%`, background: color }}
        />
      </div>

      {/* Category cards */}
      <div className="space-y-2">
        {fn.categories.map(cat => (
          <CategoryCard key={cat.code} category={cat} fnColor={color} />
        ))}
      </div>
    </div>
  );
}
