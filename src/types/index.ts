export interface LeaderComplex {
  rank: number;
  id: string;
  aptName: string;
  dong: string;
  medianPrice: number;
  avgPrice: number;
  avgPricePerPyeong: number;
  medianPricePerPyeong?: number;
  medianJeonsePerPyeong?: number | null;
  saleJeonseGapPerPyeong?: number | null;
  tradeCount: number;
  rankingTradeCount: number;
  jeonseRankingCount?: number;
}

export interface LeaderMonthPoint {
  month: string;
  avgMedian: number | null;
  sampleCount: number;
  momChangePercent: number | null;
}

export interface SurgeInterval {
  startMonth: string;
  endMonth: string;
  startPrice: number;
  endPrice: number;
  changePercent: number;
}

export interface LeaderIndexResult {
  lawdCd: string;
  topN: number;
  years: number;
  months: string[];
  tradeCount: number;
  jeonseCount?: number;
  areaTarget?: number;
  areaTolerance?: number;
  /** Ranking / series unit — pyeong (만원/평) or absolute price (만원) */
  metric?: 'pyeong' | 'price';
  leaders: LeaderComplex[];
  monthly: LeaderMonthPoint[];
  monthlySale?: LeaderMonthPoint[];
  monthlyJeonse?: LeaderMonthPoint[];
  monthlyGap?: LeaderMonthPoint[];
  surges: SurgeInterval[];
  surgeThresholdPercent: number;
  summary: string;
  mock?: boolean;
}

export function saleSeries(data: LeaderIndexResult): LeaderMonthPoint[] {
  return data.monthlySale ?? data.monthly;
}

export function jeonseSeries(data: LeaderIndexResult): LeaderMonthPoint[] {
  return data.monthlyJeonse ?? [];
}

export function gapSeries(data: LeaderIndexResult): LeaderMonthPoint[] {
  return data.monthlyGap ?? [];
}
