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
  currentImplementationTier: string;
  recommendation: string;
  targetImplementationTier: string;
  targetTierScore: number;
  targetTierComments: string;
  clientComments: string;
  isBelowTarget: boolean;
}

export interface TierCounts {
  '1': number;
  '2': number;
  '3': number;
  '4': number;
}

export interface Category {
  code: string;
  name: string;
  subcategories: SubCategory[];
  tierCounts: TierCounts;
  belowTargetCount: number;
}

export interface FunctionData {
  name: string;
  code: string;
  categories: Category[];
  tierCounts: TierCounts;
  belowTargetCount: number;
  totalSubcategories: number;
}

export interface DashboardData {
  functions: FunctionData[];
  overallTierCounts: TierCounts;
  overallBelowTargetCount: number;
  totalSubcategories: number;
}

const FUNCTION_ORDER = ['Govern', 'Identify', 'Protect', 'Detect', 'Respond', 'Recover'];

function emptyTierCounts(): TierCounts {
  return { '1': 0, '2': 0, '3': 0, '4': 0 };
}

function addTierCounts(a: TierCounts, b: TierCounts): TierCounts {
  return {
    '1': a['1'] + b['1'],
    '2': a['2'] + b['2'],
    '3': a['3'] + b['3'],
    '4': a['4'] + b['4'],
  };
}

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

          const currentScore = parseFloat(r['current_tier_score']) || 0;
          const targetScore  = parseFloat(r['target_tier_score'])  || 0;

          catMap.get(catCode)!.push({
            code: r['subcategory_code'],
            description: r['subcategory_description'],
            implementationExamples: r['implementation_examples'],
            informativeReferences: r['informative_references'],
            controlsChecks: r['controls_checks'],
            understandingOfControls: r['Understanding_of_controls_Implemented'],
            currentTierScore: currentScore,
            currentImplementationTier: r['current_Implementation_tier'],
            recommendation: r['recommendation'],
            targetImplementationTier: r['target_Implementation_tier'],
            targetTierScore: targetScore,
            targetTierComments: r['target_tier_comments'],
            clientComments: r['client_comments'],
            isBelowTarget: currentScore < targetScore,
          });
        }

        // Lookup maps
        const catNameMap = new Map<string, string>();
        for (const r of rows) catNameMap.set(r['category_code'], r['category_name']);
        const fnCodeMap = new Map<string, string>();
        for (const r of rows) fnCodeMap.set(r['function'], r['functionCode']);

        const functions: FunctionData[] = FUNCTION_ORDER.map(fnName => {
          const catMap = fnMap.get(fnName) ?? new Map();

          const categories: Category[] = Array.from(catMap.entries()).map(([code, subs]) => {
            const tierCounts = emptyTierCounts();
            let belowTargetCount = 0;
            for (const s of subs) {
              const t = String(Math.round(s.currentTierScore)) as keyof TierCounts;
              if (tierCounts[t] !== undefined) tierCounts[t]++;
              if (s.isBelowTarget) belowTargetCount++;
            }
            return {
              code,
              name: catNameMap.get(code) ?? code,
              subcategories: subs,
              tierCounts,
              belowTargetCount,
            };
          });

          const fnTierCounts = categories.reduce(
            (acc, c) => addTierCounts(acc, c.tierCounts),
            emptyTierCounts()
          );
          const fnBelowTarget = categories.reduce((s, c) => s + c.belowTargetCount, 0);
          const fnTotal = categories.reduce((s, c) => s + c.subcategories.length, 0);

          return {
            name: fnName,
            code: fnCodeMap.get(fnName) ?? '',
            categories,
            tierCounts: fnTierCounts,
            belowTargetCount: fnBelowTarget,
            totalSubcategories: fnTotal,
          };
        });

        const overallTierCounts = functions.reduce(
          (acc, f) => addTierCounts(acc, f.tierCounts),
          emptyTierCounts()
        );
        const overallBelowTargetCount = functions.reduce((s, f) => s + f.belowTargetCount, 0);
        const totalSubcategories = functions.reduce((s, f) => s + f.totalSubcategories, 0);

        setData({ functions, overallTierCounts, overallBelowTargetCount, totalSubcategories });
        setLoading(false);
      })
      .catch(err => {
        setError(String(err));
        setLoading(false);
      });
  }, []);

  return { data, loading, error };
}
