import { useState } from 'react';
import { ChevronDown, ChevronUp, ExternalLink } from 'lucide-react';
import type { Category, SubCategory } from '../hooks/useData';
import { TIER_COLORS, TIER_BG_CLASSES, TIER_SHORT_LABELS, getTierKey } from '../utils/tierUtils';
import SubCategoryDrawer from './SubCategoryDrawer';

interface Props {
  category: Category;
  fnColor: string;
}

const TIERS = ['1', '2', '3', '4'] as const;

function TierPills({ tierCounts }: { tierCounts: Category['tierCounts'] }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {TIERS.map(t => {
        const count = tierCounts[t];
        if (count === 0) return null;
        return (
          <span
            key={t}
            className={`inline-flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded-full border ${TIER_BG_CLASSES[t]}`}
          >
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: TIER_COLORS[t] }} />
            {count} at {TIER_SHORT_LABELS[t]}
          </span>
        );
      })}
    </div>
  );
}

export default function CategoryCard({ category, fnColor }: Props) {
  const [expanded, setExpanded] = useState(false);
  const [selected, setSelected] = useState<SubCategory | null>(null);

  return (
    <>
      <div className="bg-slate-900/60 border border-slate-800 rounded-lg overflow-hidden">

        {/* Category header row */}
        <button
          onClick={() => setExpanded(e => !e)}
          className="w-full flex items-start gap-3 p-4 text-left hover:bg-slate-800/40 transition-colors"
        >
          <span
            className="text-xs font-mono px-2 py-0.5 rounded flex-shrink-0 mt-0.5"
            style={{
              background: `${fnColor}20`,
              color: fnColor,
              border: `1px solid ${fnColor}30`,
            }}
          >
            {category.code}
          </span>

          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white mb-2">{category.name}</p>
            <TierPills tierCounts={category.tierCounts} />
            {category.belowTargetCount > 0 && (
              <p className="text-[11px] text-amber-400/80 mt-1.5">
                {category.belowTargetCount} subcategor{category.belowTargetCount === 1 ? 'y' : 'ies'} below target tier
              </p>
            )}
          </div>

          <div className="flex-shrink-0 mt-0.5">
            {expanded
              ? <ChevronUp className="w-4 h-4 text-slate-500" />
              : <ChevronDown className="w-4 h-4 text-slate-500" />}
          </div>
        </button>

        {/* Subcategory list */}
        {expanded && (
          <div className="border-t border-slate-800 divide-y divide-slate-800/50">
            {category.subcategories.map(sub => {
              const key = getTierKey(sub.currentTierScore);
              return (
                <button
                  key={sub.code}
                  onClick={() => setSelected(sub)}
                  className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-slate-800/40 transition-colors group"
                >
                  <span className="text-xs font-mono text-slate-400 w-20 flex-shrink-0">
                    {sub.code}
                  </span>

                  <p className="flex-1 text-xs text-slate-300 line-clamp-1 min-w-0">
                    {sub.description?.split('\n')[0]}
                  </p>

                  <div className="flex items-center gap-2 flex-shrink-0">
                    {sub.isBelowTarget && (
                      <span className="text-[10px] text-amber-400 bg-amber-500/10 border border-amber-500/20 px-1.5 py-0.5 rounded-full">
                        Below Target
                      </span>
                    )}
                    <span
                      className={`text-[10px] font-medium px-2 py-0.5 rounded-full border ${TIER_BG_CLASSES[key]}`}
                      style={{ color: TIER_COLORS[key] }}
                    >
                      T{key}
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
