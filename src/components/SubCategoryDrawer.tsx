import { X, BookOpen, Wrench, ClipboardList, MessageSquare, Eye } from 'lucide-react';
import type { SubCategory } from '../hooks/useData';
import { getTierBgColor, getTierColor } from '../utils/tierUtils';

interface Props {
  sub: SubCategory;
  onClose: () => void;
}

function Section({ icon: Icon, title, content, highlight }: { icon: any; title: string; content: string; highlight?: boolean }) {
  if (!content?.trim()) return null;
  return (
    <div className={`mb-5 ${highlight ? 'rounded-lg border border-indigo-500/20 bg-indigo-500/5 p-4' : ''}`}>
      <div className="flex items-center gap-2 mb-2">
        <Icon className={`w-4 h-4 ${highlight ? 'text-indigo-400' : 'text-slate-400'}`} />
        <h4 className={`text-xs font-semibold uppercase tracking-wider ${highlight ? 'text-indigo-300' : 'text-slate-300'}`}>{title}</h4>
      </div>
      <p className="text-sm text-slate-300 leading-relaxed whitespace-pre-wrap">{content}</p>
    </div>
  );
}

export default function SubCategoryDrawer({ sub, onClose }: Props) {
  const gap = sub.targetTierScore - sub.currentTierScore;

  return (
    <div className="fixed inset-0 z-50 flex justify-end" onClick={onClose}>
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

      <div
        className="relative w-full max-w-2xl bg-slate-900 border-l border-slate-800 h-full overflow-y-auto shadow-2xl"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-slate-900/95 backdrop-blur border-b border-slate-800 p-5 flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <span className="inline-block text-xs font-mono text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-2 py-0.5 rounded mb-2">
              {sub.code}
            </span>
            <h3 className="text-sm font-semibold text-white leading-snug">{sub.description?.split('\n')[0]}</h3>
          </div>
          <button
            onClick={onClose}
            className="flex-shrink-0 p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-5">
          {/* Tier badges */}
          <div className="flex items-center gap-3 mb-6">
            <div className={`flex-1 rounded-lg border p-3 ${getTierBgColor(sub.currentTierScore)}`}>
              <p className="text-xs text-slate-400 mb-0.5">Current Tier</p>
              <p className="font-bold text-2xl" style={{ color: getTierColor(sub.currentTierScore) }}>
                {sub.currentTierScore}.0
              </p>
              <p className="text-xs mt-0.5">{sub.currentTier}</p>
            </div>
            <div className="flex flex-col items-center gap-1 px-2">
              <div className={`text-xs font-semibold px-3 py-1.5 rounded-full ${gap > 0 ? 'text-amber-400 bg-amber-500/10 border border-amber-500/20' : 'text-green-400 bg-green-500/10 border border-green-500/20'}`}>
                {gap > 0 ? `+${gap} gap` : '✓ On target'}
              </div>
            </div>
            <div className="flex-1 rounded-lg border border-cyan-500/20 bg-cyan-500/10 p-3">
              <p className="text-xs text-slate-400 mb-0.5">Target Tier</p>
              <p className="font-bold text-2xl text-cyan-400">{sub.targetTierScore}.0</p>
              <p className="text-xs text-cyan-300/70 mt-0.5">{sub.targetTier}</p>
            </div>
          </div>

          {/* Understanding of Controls — highlighted as the primary new field */}
          <Section
            icon={Eye}
            title="Understanding of Controls Implemented"
            content={sub.understandingOfControls}
            highlight={true}
          />

          <Section icon={Wrench} title="Recommendation" content={sub.recommendation} />
          <Section icon={ClipboardList} title="Controls Checks" content={sub.controlsChecks} />
          <Section icon={BookOpen} title="Full Control Description" content={sub.description} />
          <Section icon={BookOpen} title="Implementation Examples" content={sub.implementationExamples} />
          {sub.targetTierComments && (
            <Section icon={BookOpen} title="Target Tier Comments" content={sub.targetTierComments} />
          )}
          {sub.clientComments && (
            <Section icon={MessageSquare} title="Client Comments" content={sub.clientComments} />
          )}
        </div>
      </div>
    </div>
  );
}
