export interface LeaderComplex {
  rank: number;
  id: string;
  aptName: string;
  dong: string;
  medianPrice: number;
  avgPrice: number;
  avgPricePerPyeong: number;
  tradeCount: number;
  rankingTradeCount: number;
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
  leaders: LeaderComplex[];
  monthly: LeaderMonthPoint[];
  surges: SurgeInterval[];
  surgeThresholdPercent: number;
  summary: string;
  mock?: boolean;
}
