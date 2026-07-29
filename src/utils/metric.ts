import type { AnalysisMetric } from '../data/seoul';
import { isAbsoluteMetric } from '../data/seoul';
import type {
  LeaderComplex,
  LeaderIndexResult,
  LeaderMonthPoint,
  SurgeInterval,
} from '../types';
import { pyeongToPrice, priceToPyeong } from './format';

function mapSeries(
  series: LeaderMonthPoint[],
  convert: (v: number) => number,
): LeaderMonthPoint[] {
  return series.map((p) => ({
    ...p,
    avgMedian: p.avgMedian != null ? convert(p.avgMedian) : null,
  }));
}

function mapSurges(
  surges: SurgeInterval[],
  convert: (v: number) => number,
): SurgeInterval[] {
  return surges.map((s) => ({
    ...s,
    startPrice: convert(s.startPrice),
    endPrice: convert(s.endPrice),
  }));
}

function attachMom(monthly: LeaderMonthPoint[]): LeaderMonthPoint[] {
  const out = monthly.map((p) => ({ ...p, momChangePercent: null as number | null }));
  for (let i = 1; i < out.length; i++) {
    const prev = out[i - 1].avgMedian;
    const curr = out[i].avgMedian;
    if (prev != null && curr != null && prev > 0) {
      out[i].momChangePercent = ((curr - prev) / prev) * 100;
    }
  }
  return out;
}

/** Lightweight surge detection for the focused series (client-side). */
export function detectSurgesFromSeries(
  monthly: LeaderMonthPoint[],
  thresholdPercent: number,
): SurgeInterval[] {
  const series = attachMom(monthly);
  const surges: SurgeInterval[] = [];
  let active: SurgeInterval | null = null;

  for (let i = 1; i < series.length; i++) {
    const prev = series[i - 1];
    const curr = series[i];
    const mom = curr.momChangePercent;
    const rising = mom !== null && mom >= thresholdPercent;

    if (rising && prev.avgMedian != null && curr.avgMedian != null) {
      if (!active) {
        active = {
          startMonth: prev.month,
          endMonth: curr.month,
          startPrice: prev.avgMedian,
          endPrice: curr.avgMedian,
          changePercent: 0,
        };
      } else {
        active.endMonth = curr.month;
        active.endPrice = curr.avgMedian;
      }
      active.changePercent =
        active.startPrice > 0
          ? ((active.endPrice - active.startPrice) / active.startPrice) * 100
          : 0;
    } else if (active) {
      surges.push(active);
      active = null;
    }
  }
  if (active) surges.push(active);
  return surges;
}

function leaderJeonseAbsolute(l: LeaderComplex, areaM2: number): number {
  if (l.medianJeonsePerPyeong != null && Number.isFinite(l.medianJeonsePerPyeong)) {
    return pyeongToPrice(l.medianJeonsePerPyeong, areaM2);
  }
  return 0;
}

function sortLeaders(
  leaders: LeaderComplex[],
  metric: AnalysisMetric,
  areaM2: number,
): LeaderComplex[] {
  const sorted = [...leaders].sort((a, b) => {
    if (metric === 'sale') return b.medianPrice - a.medianPrice;
    if (metric === 'jeonse') {
      return leaderJeonseAbsolute(b, areaM2) - leaderJeonseAbsolute(a, areaM2);
    }
    const ap = a.medianPricePerPyeong ?? a.avgPricePerPyeong;
    const bp = b.medianPricePerPyeong ?? b.avgPricePerPyeong;
    return bp - ap;
  });
  return sorted.map((l, i) => ({ ...l, rank: i + 1 }));
}

function sourceUnit(data: LeaderIndexResult): 'pyeong' | 'price' {
  return data.metric === 'price' ? 'price' : 'pyeong';
}

/**
 * Normalize API result to the metric the UI requested.
 * Absolute metrics (매매가/전세가) share the same 만원 unit; ranking focus differs.
 * Older APIs that only emit 평단가 are converted approximately using areaTarget.
 */
export function adaptLeaderIndexForMetric(
  data: LeaderIndexResult,
  metric: AnalysisMetric,
): LeaderIndexResult {
  const source = sourceUnit(data);
  const wantAbsolute = isAbsoluteMetric(metric);
  const area = data.areaTarget ?? 84;

  let monthlySale = data.monthlySale ?? data.monthly;
  let monthlyJeonse = data.monthlyJeonse ?? [];
  let monthlyGap = data.monthlyGap ?? [];
  let surges = data.surges;

  if (source === 'pyeong' && wantAbsolute) {
    const convert = (v: number) => pyeongToPrice(v, area);
    monthlySale = mapSeries(monthlySale, convert);
    monthlyJeonse = mapSeries(monthlyJeonse, convert);
    monthlyGap = mapSeries(monthlyGap, convert);
    surges = mapSurges(surges, convert);
  } else if (source === 'price' && !wantAbsolute) {
    const convert = (v: number) => priceToPyeong(v, area);
    monthlySale = mapSeries(monthlySale, convert);
    monthlyJeonse = mapSeries(monthlyJeonse, convert);
    monthlyGap = mapSeries(monthlyGap, convert);
    surges = mapSurges(surges, convert);
  }

  // Focused series for surge display: 전세가 → jeonse series, otherwise sale
  const focusSeries = metric === 'jeonse' ? monthlyJeonse : monthlySale;
  const focusSurges = detectSurgesFromSeries(
    focusSeries,
    data.surgeThresholdPercent,
  );

  return {
    ...data,
    metric: wantAbsolute ? 'price' : 'pyeong',
    leaders: sortLeaders(data.leaders, metric, area),
    monthly: monthlySale,
    monthlySale,
    monthlyJeonse,
    monthlyGap,
    surges: focusSurges.length > 0 ? focusSurges : surges,
  };
}

/** Absolute 전세가 estimate for a leader (만원), from 평단 when needed. */
export function leaderJeonsePrice(
  leader: LeaderComplex,
  areaM2: number,
): number | null {
  if (leader.medianJeonsePerPyeong == null) return null;
  return pyeongToPrice(leader.medianJeonsePerPyeong, areaM2);
}
