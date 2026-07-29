import type { AnalysisMetric } from '../data/seoul';
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

function sortLeaders(leaders: LeaderComplex[], metric: AnalysisMetric): LeaderComplex[] {
  const sorted = [...leaders].sort((a, b) => {
    if (metric === 'price') return b.medianPrice - a.medianPrice;
    const ap = a.medianPricePerPyeong ?? a.avgPricePerPyeong;
    const bp = b.medianPricePerPyeong ?? b.avgPricePerPyeong;
    return bp - ap;
  });
  return sorted.map((l, i) => ({ ...l, rank: i + 1 }));
}

/**
 * Normalize API result to the metric the UI requested.
 * When App Navi already returns the matching metric, data is passed through.
 * Older APIs that only emit 평단가 are converted approximately using areaTarget.
 */
export function adaptLeaderIndexForMetric(
  data: LeaderIndexResult,
  metric: AnalysisMetric,
): LeaderIndexResult {
  const source: AnalysisMetric = data.metric === 'price' ? 'price' : 'pyeong';
  if (source === metric) {
    return {
      ...data,
      metric,
      leaders: sortLeaders(data.leaders, metric),
    };
  }

  const area = data.areaTarget ?? 84;
  const convert =
    source === 'pyeong' && metric === 'price'
      ? (v: number) => pyeongToPrice(v, area)
      : (v: number) => priceToPyeong(v, area);

  const monthlySale = mapSeries(
    data.monthlySale ?? data.monthly,
    convert,
  );
  const monthlyJeonse = mapSeries(data.monthlyJeonse ?? [], convert);
  const monthlyGap = mapSeries(data.monthlyGap ?? [], convert);

  return {
    ...data,
    metric,
    leaders: sortLeaders(data.leaders, metric),
    monthly: monthlySale,
    monthlySale,
    monthlyJeonse,
    monthlyGap,
    surges: mapSurges(data.surges, convert),
  };
}
