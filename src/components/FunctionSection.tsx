import type { FunctionData } from '../hooks/useData';
import { getFunctionColor, getFunctionBgGradient, TIER_COLORS, TIER_LABELS } from '../utils/tierUtils';
import CategoryCard from './CategoryCard';

interface Props { fn: FunctionData }

const TIERS = ['1', '2', '3', '4'] as const;

export default function FunctionSection({ fn }: Props) {
  const color    = getFunctionColor(fn.name);
  const gradient = getFunctionBgGradient(fn.name);
  const total    = fn.totalSubcategories;

  return (
    <div className={`rounded-xl border bg-gradient-to-br ${gradient} p-5`}>

      {/* Function header */}
      <div className="flex items-start justify-between gap-4 mb-4">
        <div className="flex items-center gap-3">
          <span
            className="inline-flex items-center justify-center w-8 h-8 rounded-lg text-sm font-bold flex-shrink-0"
            style={{ background: `${color}25`, color, border: `1px solid ${color}40` }}
          >
            {fn.code}
          </span>
          <div>
            <h2 className="text-base font-semibold text-white">{fn.name}</h2>
            <p className="text-xs text-slate-400 mt-0.5">
              {fn.categories.length} categories · {total} subcategories
            </p>
          </div>
        </div>

        {/* Below-target count — right side */}
        {fn.belowTargetCount > 0 && (
          <span className="flex-shrink-0 text-xs text-amber-300 bg-amber-500/10 border border-amber-500/25 px-2.5 py-1 rounded-full">
            {fn.belowTargetCount} below target tier
          </span>
        )}
      </div>

      {/* Tier distribution bar for this function */}
      <div className="mb-2">
        <div className="flex h-2 rounded-full overflow-hidden bg-slate-800/60 gap-px mb-3">
          {TIERS.map(t => {
            const count = fn.tierCounts[t] ?? 0;
            const pct   = total ? (count / total) * 100 : 0;
            if (pct === 0) return null;
            return (
              <div
                key={t}
                style={{ width: `${pct}%`, background: TIER_COLORS[t] }}
                title={`${TIER_LABELS[t]}: ${count}`}
              />
            );
          })}
        </div>

        {/* Tier count pills */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {TIERS.map(t => {
            const count = fn.tierCounts[t] ?? 0;
            if (count === 0) return null;
            return (
              <span
                key={t}
                className="text-[10px] font-medium px-2 py-0.5 rounded-full"
                style={{
                  background: `${TIER_COLORS[t]}18`,
                  color: TIER_COLORS[t],
                  border: `1px solid ${TIER_COLORS[t]}35`,
                }}
              >
                {count} × {TIER_LABELS[t]}
              </span>
            );
          })}
        </div>
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
