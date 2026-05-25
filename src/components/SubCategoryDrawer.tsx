import { X, FileText, Eye, Wrench, Code2, ShieldCheck, Target, MessageSquare } from 'lucide-react';
import type { SubCategory } from '../hooks/useData';
import { TIER_COLORS, TIER_BG_CLASSES, getTierKey } from '../utils/tierUtils';

interface Props {
  sub: SubCategory;
  onClose: () => void;
}

interface SectionConfig {
  icon: React.ElementType;
  title: string;
  content: string;
  borderColor: string;
  bgColor: string;
  iconColor: string;
  labelColor: string;
}

function SectionCard({ icon: Icon, title, content, borderColor, bgColor, iconColor, labelColor }: SectionConfig) {
  if (!content?.trim()) return null;
  return (
    <div className={`rounded-xl border p-4 ${borderColor} ${bgColor}`}>
      <div className="flex items-center gap-2 mb-3">
        <div className={`flex items-center justify-center w-6 h-6 rounded-md ${bgColor} border ${borderColor}`}>
          <Icon className={`w-3.5 h-3.5 ${iconColor}`} />
        </div>
        <h4 className={`text-xs font-semibold uppercase tracking-widest ${labelColor}`}>{title}</h4>
      </div>
      <p className="text-sm text-slate-300 leading-relaxed whitespace-pre-wrap">{content}</p>
    </div>
  );
}

export default function SubCategoryDrawer({ sub, onClose }: Props) {
  const currentKey = getTierKey(sub.currentTierScore);
  const targetKey  = getTierKey(sub.targetTierScore);
  const meetsTarget = !sub.isBelowTarget;

  const sections: SectionConfig[] = [
    {
      icon: FileText,
      title: 'Description',
      content: sub.description,
      borderColor: 'border-slate-600/40',
      bgColor: 'bg-slate-800/50',
      iconColor: 'text-slate-400',
      labelColor: 'text-slate-400',
    },
    {
      icon: Eye,
      title: 'Understanding of Controls Implemented',
      content: sub.understandingOfControls,
      borderColor: 'border-blue-500/30',
      bgColor: 'bg-blue-500/[0.07]',
      iconColor: 'text-blue-400',
      labelColor: 'text-blue-300',
    },
    {
      icon: Wrench,
      title: 'Recommendation',
      content: sub.recommendation,
      borderColor: 'border-emerald-500/30',
      bgColor: 'bg-emerald-500/[0.07]',
      iconColor: 'text-emerald-400',
      labelColor: 'text-emerald-300',
    },
    {
      icon: Code2,
      title: 'Implementation Examples',
      content: sub.implementationExamples,
      borderColor: 'border-indigo-500/30',
      bgColor: 'bg-indigo-500/[0.07]',
      iconColor: 'text-indigo-400',
      labelColor: 'text-indigo-300',
    },
    {
      icon: ShieldCheck,
      title: 'Controls Checks',
      content: sub.controlsChecks,
      borderColor: 'border-purple-500/30',
      bgColor: 'bg-purple-500/[0.07]',
      iconColor: 'text-purple-400',
      labelColor: 'text-purple-300',
    },
    {
      icon: Target,
      title: 'Target Tier Comments',
      content: sub.targetTierComments,
      borderColor: 'border-amber-500/30',
      bgColor: 'bg-amber-500/[0.07]',
      iconColor: 'text-amber-400',
      labelColor: 'text-amber-300',
    },
    {
      icon: MessageSquare,
      title: 'Client Comments',
      content: sub.clientComments,
      borderColor: 'border-yellow-500/30',
      bgColor: 'bg-yellow-500/[0.07]',
      iconColor: 'text-yellow-400',
      labelColor: 'text-yellow-300',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex justify-end" onClick={onClose}>
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

      <div
        className="relative w-full max-w-2xl bg-[#0d1117] border-l border-slate-800 h-full flex flex-col shadow-2xl"
        onClick={e => e.stopPropagation()}
      >
        {/* ── Sticky header ── */}
        <div className="flex-shrink-0 bg-[#0d1117]/95 backdrop-blur border-b border-slate-800 px-5 pt-5 pb-4">

          {/* Subcategory code + title */}
          <div className="flex items-start justify-between gap-4 mb-4">
            <div className="flex-1 min-w-0">
              <span className="inline-block text-xs font-mono text-indigo-400 bg-indigo-500/10 border border-indigo-500/25 px-2 py-0.5 rounded mb-2">
                {sub.code}
              </span>
              <h3 className="text-sm font-semibold text-white leading-snug">
                {sub.description?.split('\n')[0]}
              </h3>
            </div>
            <button
              onClick={onClose}
              className="flex-shrink-0 p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Implementation Tier row — names as headline, no numeric scores */}
          <div className="grid grid-cols-[1fr_auto_1fr] items-stretch gap-3">

            {/* Current Implementation Tier */}
            <div className={`rounded-lg border p-3 ${TIER_BG_CLASSES[currentKey]}`}>
              <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
                Current Implementation Tier
              </p>
              <p
                className="text-base font-bold leading-tight"
                style={{ color: TIER_COLORS[currentKey] }}
              >
                {sub.currentImplementationTier}
              </p>
            </div>

            {/* Implementation status — no gap arithmetic */}
            <div className="flex items-center justify-center">
              <span className={`text-[11px] font-semibold px-3 py-1.5 rounded-full whitespace-nowrap border
                ${meetsTarget
                  ? 'text-indigo-300 bg-indigo-500/10 border-indigo-500/25'
                  : 'text-amber-300 bg-amber-500/10 border-amber-500/25'
                }`}>
                {meetsTarget ? '✓ Meets Target Tier' : '▷ Below Target Tier'}
              </span>
            </div>

            {/* Target Implementation Tier */}
            <div className={`rounded-lg border p-3 ${TIER_BG_CLASSES[targetKey]}`}>
              <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
                Target Implementation Tier
              </p>
              <p
                className="text-base font-bold leading-tight"
                style={{ color: TIER_COLORS[targetKey] }}
              >
                {sub.targetImplementationTier}
              </p>
            </div>
          </div>
        </div>

        {/* ── Scrollable body ── */}
        <div className="flex-1 overflow-y-auto">
          <div className="px-5 py-4 space-y-3">
            {sections.map(s => (
              <SectionCard key={s.title} {...s} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
