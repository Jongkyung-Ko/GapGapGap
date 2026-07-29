import type { AnalysisMetric } from '../data/seoul';
import { isAbsoluteMetric } from '../data/seoul';

/** price is in 만원; pyeong rate is 만원/평 */
export function formatManwon(price: number | null | undefined): string {
  if (price == null || !Number.isFinite(price)) return '-';
  if (Math.abs(price) >= 10000) {
    const eok = price / 10000;
    return `${eok.toFixed(eok >= 10 || eok <= -10 ? 1 : 2)}억`;
  }
  return `${Math.round(price).toLocaleString('ko-KR')}만`;
}

/** 평단가 표시 (만원/평) */
export function formatPyeong(price: number | null | undefined): string {
  if (price == null || !Number.isFinite(price)) return '-';
  if (Math.abs(price) >= 10000) {
    return `${(price / 10000).toFixed(1)}억/평`;
  }
  return `${Math.round(price).toLocaleString('ko-KR')}만/평`;
}

/** Format a series value according to the selected analysis metric */
export function formatMetric(
  value: number | null | undefined,
  metric: AnalysisMetric,
): string {
  return isAbsoluteMetric(metric) ? formatManwon(value) : formatPyeong(value);
}

export function metricNoun(metric: AnalysisMetric): string {
  if (metric === 'sale') return '매매가';
  if (metric === 'jeonse') return '전세가';
  return '평단가';
}

export function metricUnitHint(metric: AnalysisMetric): string {
  return isAbsoluteMetric(metric) ? '만원' : '만원/평';
}

export function saleSeriesTitle(metric: AnalysisMetric): string {
  return isAbsoluteMetric(metric) ? '매매가' : '매매 평단가';
}

export function jeonseSeriesTitle(metric: AnalysisMetric): string {
  return isAbsoluteMetric(metric) ? '전세가' : '전세 평단가';
}

export function gapSeriesTitle(metric: AnalysisMetric): string {
  return isAbsoluteMetric(metric) ? '갭 (매매가−전세가)' : '갭 (매매−전세 평단가)';
}

/** Convert 만원/평 → 만원 for an exclusive-area band (㎡) */
export function pyeongToPrice(pyeong: number, areaM2: number): number {
  return pyeong * (areaM2 / 3.3058);
}

/** Convert 만원 → 만원/평 for an exclusive-area band (㎡) */
export function priceToPyeong(price: number, areaM2: number): number {
  if (!areaM2) return 0;
  return price / (areaM2 / 3.3058);
}

export function formatPercent(value: number | null | undefined, digits = 1): string {
  if (value == null || !Number.isFinite(value)) return '-';
  const sign = value > 0 ? '+' : '';
  return `${sign}${value.toFixed(digits)}%`;
}

export function shortMonth(month: string): string {
  if (month.length >= 7) return `${month.slice(2, 4)}.${month.slice(5, 7)}`;
  return month;
}
