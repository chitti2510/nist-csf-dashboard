import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import type { FunctionData } from '../hooks/useData';
import { getFunctionColor } from '../utils/tierUtils';

interface Props {
  functions: FunctionData[];
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-slate-800 border border-slate-700 rounded-lg p-3 text-sm shadow-xl">
      <p className="font-semibold text-white mb-2">{label}</p>
      {payload.map((p: any) => (
        <div key={p.name} className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full" style={{ background: p.fill || p.color }} />
          <span className="text-slate-300">{p.name}:</span>
          <span className="font-medium text-white">{Number(p.value).toFixed(2)}</span>
        </div>
      ))}
      {payload.length >= 2 && (
        <div className="mt-2 pt-2 border-t border-slate-700 text-xs text-amber-400">
          Gap: {(payload[1].value - payload[0].value).toFixed(2)}
        </div>
      )}
    </div>
  );
};

export default function FunctionBarChart({ functions }: Props) {
  const chartData = functions.map(f => ({
    name: f.name.slice(0, 3),
    fullName: f.name,
    current: parseFloat(f.avgCurrentScore.toFixed(2)),
    target: parseFloat(f.avgTargetScore.toFixed(2)),
    color: getFunctionColor(f.name),
  }));

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
      <div className="mb-4">
        <h2 className="text-sm font-semibold text-white">Score by Function</h2>
        <p className="text-xs text-slate-400 mt-0.5">Average current vs. target tier per function</p>
      </div>
      <ResponsiveContainer width="100%" height={240}>
        <BarChart data={chartData} margin={{ top: 5, right: 10, left: -10, bottom: 5 }} barGap={4}>
          <CartesianGrid strokeDasharray="3 3" stroke="#1e2d4a" vertical={false} />
          <XAxis dataKey="name" tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={false} tickLine={false} />
          <YAxis domain={[0, 4]} tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={false} tickLine={false} ticks={[1, 2, 3, 4]} />
          <Tooltip content={<CustomTooltip />} />
          <Legend
            formatter={(v) => <span className="text-slate-300 text-xs">{v}</span>}
            iconType="circle" iconSize={8}
          />
          <Bar dataKey="current" name="Current" radius={[3, 3, 0, 0]} maxBarSize={32}>
            {chartData.map(d => (
              <Cell key={d.name} fill={d.color} />
            ))}
          </Bar>
          <Bar dataKey="target" name="Target" fill="#22d3ee" fillOpacity={0.3} radius={[3, 3, 0, 0]} maxBarSize={32} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
