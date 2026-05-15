import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
  Legend,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';
import type { DashboardData } from '../hooks/useData';

interface Props {
  data: DashboardData;
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-slate-800 border border-slate-700 rounded-lg p-3 text-sm shadow-xl">
      <p className="font-semibold text-white mb-2">{label}</p>
      {payload.map((p: any) => (
        <div key={p.name} className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full" style={{ background: p.color }} />
          <span className="text-slate-300">{p.name}:</span>
          <span className="font-medium" style={{ color: p.color }}>{p.value.toFixed(2)}</span>
        </div>
      ))}
    </div>
  );
};

export default function RadarOverview({ data }: Props) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
      <div className="mb-4">
        <h2 className="text-sm font-semibold text-white">Maturity Overview</h2>
        <p className="text-xs text-slate-400 mt-0.5">Current vs. Target tier scores across all 6 NIST Functions</p>
      </div>
      <ResponsiveContainer width="100%" height={340}>
        <RadarChart data={data.radarData} margin={{ top: 10, right: 30, bottom: 10, left: 30 }}>
          <PolarGrid stroke="#1e2d4a" strokeDasharray="3 3" />
          <PolarAngleAxis
            dataKey="function"
            tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 500 }}
          />
          <Radar
            name="Current"
            dataKey="current"
            stroke="#6366f1"
            fill="#6366f1"
            fillOpacity={0.25}
            strokeWidth={2}
            dot={{ fill: '#6366f1', strokeWidth: 0, r: 4 }}
          />
          <Radar
            name="Target"
            dataKey="target"
            stroke="#22d3ee"
            fill="#22d3ee"
            fillOpacity={0.1}
            strokeWidth={2}
            strokeDasharray="5 3"
            dot={{ fill: '#22d3ee', strokeWidth: 0, r: 4 }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend
            formatter={(value) => <span className="text-slate-300 text-xs">{value}</span>}
            iconType="circle"
            iconSize={8}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
