import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer,
} from 'recharts';
import type { FunctionData } from '../hooks/useData';
import { TIER_COLORS, TIER_LABELS } from '../utils/tierUtils';

interface Props { functions: FunctionData[] }

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  const total = payload.reduce((s: number, p: any) => s + (p.value ?? 0), 0);
  return (
    <div className="bg-slate-800 border border-slate-700 rounded-xl p-3 shadow-2xl text-sm min-w-[210px]">
      <p className="font-semibold text-white mb-2">{label}</p>
      {payload.map((p: any) => (
        <div key={p.dataKey} className="flex items-center justify-between gap-4 py-0.5">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full" style={{ background: p.fill }} />
            <span className="text-slate-300 text-xs">{TIER_LABELS[p.dataKey.replace('tier', '')]}</span>
          </div>
          <span className="font-medium text-white text-xs">{p.value}</span>
        </div>
      ))}
      <div className="mt-2 pt-2 border-t border-slate-700 flex justify-between text-xs text-slate-400">
        <span>Total subcategories</span>
        <span className="font-medium text-white">{total}</span>
      </div>
    </div>
  );
};

export default function TierDistributionChart({ functions }: Props) {
  const chartData = functions.map(f => ({
    name: f.name,
    tier1: f.tierCounts['1'],
    tier2: f.tierCounts['2'],
    tier3: f.tierCounts['3'],
    tier4: f.tierCounts['4'],
  }));

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
      <div className="mb-5">
        <h2 className="text-sm font-semibold text-white">
          Implementation Tier Distribution by Function
        </h2>
        <p className="text-xs text-slate-400 mt-0.5">
          Number of subcategories at each Implementation Tier per NIST CSF function
        </p>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={chartData}
          layout="vertical"
          margin={{ top: 0, right: 16, left: 0, bottom: 0 }}
          barSize={18}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#1e2d4a" horizontal={false} />
          <XAxis
            type="number"
            tick={{ fill: '#94a3b8', fontSize: 11 }}
            axisLine={false}
            tickLine={false}
            allowDecimals={false}
          />
          <YAxis
            type="category"
            dataKey="name"
            tick={{ fill: '#94a3b8', fontSize: 12 }}
            axisLine={false}
            tickLine={false}
            width={68}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.03)' }} />
          <Legend
            formatter={(v) => (
              <span className="text-slate-300 text-xs">
                {TIER_LABELS[v.replace('tier', '')]}
              </span>
            )}
            iconType="circle"
            iconSize={8}
            wrapperStyle={{ paddingTop: 16 }}
          />
          {(['1', '2', '3', '4'] as const).map(t => (
            <Bar
              key={t}
              dataKey={`tier${t}`}
              name={`tier${t}`}
              stackId="a"
              fill={TIER_COLORS[t]}
              radius={t === '4' ? [0, 3, 3, 0] : [0, 0, 0, 0]}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
