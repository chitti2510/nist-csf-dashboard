import { useState, useEffect } from 'react';
import Papa from 'papaparse';

export interface SubCategory {
  code: string;
  description: string;
  implementationExamples: string;
  informativeReferences: string;
  controlsChecks: string;
  understandingOfControls: string;
  currentTierScore: number;
  currentTier: string;
  recommendation: string;
  targetTier: string;
  targetTierScore: number;
  targetTierComments: string;
  clientComments: string;
}

export interface Category {
  code: string;
  name: string;
  subcategories: SubCategory[];
  avgCurrentScore: number;
  avgTargetScore: number;
}

export interface FunctionData {
  name: string;
  code: string;
  categories: Category[];
  avgCurrentScore: number;
  avgTargetScore: number;
}

export interface DashboardData {
  functions: FunctionData[];
  radarData: { function: string; current: number; target: number }[];
  overallAvgCurrent: number;
  tierCounts: Record<string, number>;
}

const FUNCTION_ORDER = ['Govern', 'Identify', 'Protect', 'Detect', 'Respond', 'Recover'];

export function useData() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/nist-csf-data.csv')
      .then(res => res.text())
      .then(text => {
        const result = Papa.parse(text, { header: true, skipEmptyLines: true });
        const rows = result.data as Record<string, string>[];

        // Group by function → category → subcategory
        const fnMap = new Map<string, Map<string, SubCategory[]>>();

        for (const r of rows) {
          const fn = r['function'];
          const catCode = r['category_code'];
          if (!fnMap.has(fn)) fnMap.set(fn, new Map());
          const catMap = fnMap.get(fn)!;
          if (!catMap.has(catCode)) catMap.set(catCode, []);
          catMap.get(catCode)!.push({
            code: r['subcategory_code'],
            description: r['subcategory_description'],
            implementationExamples: r['implementation_examples'],
            informativeReferences: r['informative_references'],
            controlsChecks: r['controls_checks'],
            understandingOfControls: r['Understanding_of_controls_Implemented'],
            currentTierScore: parseFloat(r['current_tier_score']) || 0,
            currentTier: r['current_tier'],
            recommendation: r['recommendation'],
            targetTier: r['target_tier'],
            targetTierScore: parseFloat(r['target_tier_score']) || 0,
            targetTierComments: r['target_tier_comments'],
            clientComments: r['client_comments'],
          });
        }

        // Build category name lookup
        const catNameMap = new Map<string, string>();
        for (const r of rows) catNameMap.set(r['category_code'], r['category_name']);
        const fnCodeMap = new Map<string, string>();
        for (const r of rows) fnCodeMap.set(r['function'], r['functionCode']);

        const functions: FunctionData[] = FUNCTION_ORDER.map(fnName => {
          const catMap = fnMap.get(fnName) ?? new Map();
          const categories: Category[] = Array.from(catMap.entries()).map(([code, subs]) => {
            const avgCurrent = subs.reduce((s: number, x: SubCategory) => s + x.currentTierScore, 0) / subs.length;
            const avgTarget = subs.reduce((s: number, x: SubCategory) => s + x.targetTierScore, 0) / subs.length;
            return { code, name: catNameMap.get(code) ?? code, subcategories: subs, avgCurrentScore: avgCurrent, avgTargetScore: avgTarget };
          });
          const allSubs = categories.flatMap(c => c.subcategories);
          const avgCurrent = allSubs.length ? allSubs.reduce((s, x) => s + x.currentTierScore, 0) / allSubs.length : 0;
          const avgTarget = allSubs.length ? allSubs.reduce((s, x) => s + x.targetTierScore, 0) / allSubs.length : 0;
          return { name: fnName, code: fnCodeMap.get(fnName) ?? '', categories, avgCurrentScore: avgCurrent, avgTargetScore: avgTarget };
        });

        const radarData = functions.map(f => ({
          function: f.name,
          current: parseFloat(f.avgCurrentScore.toFixed(2)),
          target: parseFloat(f.avgTargetScore.toFixed(2)),
        }));

        const allSubs = functions.flatMap(f => f.categories.flatMap(c => c.subcategories));
        const overallAvgCurrent = allSubs.reduce((s, x) => s + x.currentTierScore, 0) / allSubs.length;

        const tierCounts: Record<string, number> = { '1': 0, '2': 0, '3': 0, '4': 0 };
        for (const s of allSubs) {
          const t = String(Math.round(s.currentTierScore));
          if (tierCounts[t] !== undefined) tierCounts[t]++;
        }

        setData({ functions, radarData, overallAvgCurrent, tierCounts });
        setLoading(false);
      })
      .catch(err => {
        setError(String(err));
        setLoading(false);
      });
  }, []);

  return { data, loading, error };
}
