import { useState } from 'react';
import { ChevronDown, ChevronUp, ExternalLink } from 'lucide-react';
import type { Category, SubCategory } from '../hooks/useData';
import { getTierColor, getTierBgColor } from '../utils/tierUtils';
import SubCategoryDrawer from './SubCategoryDrawer';

interface Props {
  category: Category;
  fnColor: string;
}

function ScoreBar({ current, target, color }: { current: number; target: number; color: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex-1 relative h-2 bg-slate-800 rounded-full overflow-hidden">
        {/* target indicator */}
        <div
          className="absolute top-0 bottom-0 w-0.5 bg-slate-500"
          style={{ left: `${(target / 4) * 100}%` }}
        />
        {/* current bar */}
        <div
          className="h-full rounded-full transition-all duration-700"
          style={{ width: `${(current / 4) * 100}%`, background: color }}
        />
      </div>
      <div className="flex items-center gap-1 text-xs font-mono whitespace-nowrap">
        <span style={{ color }}>{current.toFixed(1)}</span>
        <span className="text-slate-600">/</span>
        <span className="text-cyan-500">{target.toFixed(1)}</span>
      </div>
    </div>
  );
}

export default function CategoryCard({ category, fnColor }: Props) {
  const [expanded, setExpanded] = useState(false);
  const [selected, setSelected] = useState<SubCategory | null>(null);

  return (
    <>
      <div className="bg-slate-900/60 border border-slate-800 rounded-lg overflow-hidden">
        {/* Category header */}
        <button
          onClick={() => setExpanded(e => !e)}
          className="w-full flex items-center gap-3 p-4 text-left hover:bg-slate-800/40 transition-colors"
        >
          <span
            className="text-xs font-mono px-2 py-0.5 rounded flex-shrink-0"
            style={{ background: `${fnColor}20`, color: fnColor, border: `1px solid ${fnColor}30` }}
          >
            {category.code}
          </span>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">{category.name}</p>
            <div className="mt-1.5">
              <ScoreBar
                current={category.avgCurrentScore}
                target={category.avgTargetScore}
                color={getTierColor(category.avgCurrentScore)}
              />
            </div>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <span className={`text-xs px-2 py-0.5 rounded border ${getTierBgColor(category.avgCurrentScore)}`}>
              {category.avgCurrentScore.toFixed(1)}
            </span>
            {expanded ? (
              <ChevronUp className="w-4 h-4 text-slate-500" />
            ) : (
              <ChevronDown className="w-4 h-4 text-slate-500" />
            )}
          </div>
        </button>

        {/* Subcategories */}
        {expanded && (
          <div className="border-t border-slate-800 divide-y divide-slate-800/50">
            {category.subcategories.map(sub => {
              const gap = sub.targetTierScore - sub.currentTierScore;
              return (
                <button
                  key={sub.code}
                  onClick={() => setSelected(sub)}
                  className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-slate-800/40 transition-colors group"
                >
                  <span className="text-xs font-mono text-slate-400 w-20 flex-shrink-0">{sub.code}</span>
                  <p className="flex-1 text-xs text-slate-300 line-clamp-1 min-w-0">
                    {sub.description?.split('\n')[0]}
                  </p>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    {gap > 0 && (
                      <span className="text-xs text-amber-400 bg-amber-500/10 border border-amber-500/20 px-1.5 py-0.5 rounded">
                        +{gap}
                      </span>
                    )}
                    <span
                      className="text-xs font-bold w-6 text-center"
                      style={{ color: getTierColor(sub.currentTierScore) }}
                    >
                      {sub.currentTierScore}
                    </span>
                    <ExternalLink className="w-3.5 h-3.5 text-slate-600 group-hover:text-slate-400 transition-colors" />
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {selected && <SubCategoryDrawer sub={selected} onClose={() => setSelected(null)} />}
    </>
  );
}
