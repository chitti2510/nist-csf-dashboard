import { X, BookOpen, Wrench, ClipboardList, MessageSquare } from 'lucide-react';
import type { SubCategory } from '../hooks/useData';
import { getTierBgColor, getTierColor } from '../utils/tierUtils';

interface Props {
  sub: SubCategory;
  onClose: () => void;
}

function Section({ icon: Icon, title, content }: { icon: any; title: string; content: string }) {
  if (!content?.trim()) return null;
  return (
    <div className="mb-5">
      <div className="flex items-center gap-2 mb-2">
        <Icon className="w-4 h-4 text-slate-400" />
        <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider">{title}</h4>
      </div>
      <p className="text-sm text-slate-400 leading-relaxed whitespace-pre-wrap">{content}</p>
    </div>
  );
}

export default function SubCategoryDrawer({ sub, onClose }: Props) {
  const gap = sub.targetTierScore - sub.currentTierScore;

  return (
    <div className="fixed inset-0 z-50 flex justify-end" onClick={onClose}>
      <div
        className="w-full max-w-xl bg-slate-900 border-l border-slate-800 h-full overflow-y-auto shadow-2xl"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-slate-900/95 backdrop-blur border-b border-slate-800 p-5 flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <span className="inline-block text-xs font-mono text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-2 py-0.5 rounded mb-2">
              {sub.code}
            </span>
            <h3 className="text-sm font-semibold text-white leading-snug line-clamp-3">{sub.description?.split('\n')[0]}</h3>
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
              <p className="text-xs text-slate-400 mb-0.5">Current</p>
              <p className="font-bold text-lg" style={{ color: getTierColor(sub.currentTierScore) }}>
                {sub.currentTierScore}.0
              </p>
              <p className="text-xs truncate">{sub.currentTier}</p>
            </div>
            <div className="flex flex-col items-center">
              <div className={`text-xs font-medium px-2 py-1 rounded ${gap > 0 ? 'text-amber-400 bg-amber-500/10' : 'text-green-400 bg-green-500/10'}`}>
                {gap > 0 ? `+${gap} gap` : 'On target'}
              </div>
            </div>
            <div className="flex-1 rounded-lg border border-cyan-500/20 bg-cyan-500/10 p-3 text-cyan-400">
              <p className="text-xs text-slate-400 mb-0.5">Target</p>
              <p className="font-bold text-lg">{sub.targetTierScore}.0</p>
              <p className="text-xs truncate">{sub.targetTier}</p>
            </div>
          </div>

          <Section icon={BookOpen} title="Description" content={sub.description} />
          <Section icon={Wrench} title="Recommendation" content={sub.recommendation} />
          <Section icon={ClipboardList} title="Controls Checks" content={sub.controlsChecks} />
          <Section icon={BookOpen} title="Implementation Examples" content={sub.implementationExamples} />
          {sub.clientComments && (
            <Section icon={MessageSquare} title="Client Comments" content={sub.clientComments} />
          )}
        </div>
      </div>
    </div>
  );
}
