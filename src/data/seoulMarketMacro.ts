import raw from './seoulMarketMacro.json';

export type MacroPoint = {
  month: string;
  aptIdx: number;
  aptMa3: number | null;
  aptMa12: number | null;
  kospiIdx: number;
  rate: number;
  rateIdx: number;
  kospi: number;
  apt: number;
};

export type MacroSurge = {
  month: string;
  peakMonth: string;
  cum3mPct: number;
  aptIdx: number;
  kospiIdx: number;
  rate: number;
  rateChg6m: number;
  kospiChg6m: number;
  rateLevel: number;
};

export type MacroRegimeEvent = {
  month: string;
  type: 'golden_cross' | 'dead_cross' | 'ma12_turn_up' | 'ma12_turn_down' | string;
  label: string;
  aptMa3: number | null;
  aptMa12: number | null;
  rate: number;
  kospiIdx: number;
};

export type SeoulMarketMacro = {
  asOf: string;
  source: { apt: string; kospi: string; rate: string };
  period: string;
  method: Record<string, string>;
  headline: string;
  findings: string[];
  metrics: {
    kospiMomBestLagMonths: number | null;
    kospiMomCorr: number | null;
    rateChgBestLagMonths: number | null;
    rateChgCorr: number | null;
    rateLevelBestLagMonths: number | null;
    rateLevelCorr: number | null;
    kospiLevelBestLagMonths: number | null;
    kospiLevelCorr: number | null;
    sameMonthKospiMomCorr: number | null;
    sameMonthRateChgCorr: number | null;
    surgeCount: number;
    regimeEventCount: number;
  };
  surges: MacroSurge[];
  regimeEvents: MacroRegimeEvent[];
  series: MacroPoint[];
  rollingCorr36m: { month: string; corrKospiMom: number | null; corrRateChg: number | null }[];
  complexes: string[];
};

export const seoulMarketMacro = raw as unknown as SeoulMarketMacro;
