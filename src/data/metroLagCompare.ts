import raw from './metroLagCompare.json';

export type MonthPoint = { month: string; median: number; n: number };
export type BasketPoint = { month: string; value: number };

export type ComplexSeries = {
  id: string;
  aptName: string;
  region: string;
  color?: string;
  lawdCd?: string;
  monthly: MonthPoint[];
};

export type MetroLag = {
  momBestLagMonths: number | null;
  momCorr: number | null;
  surgeLagMedianMonths: number | null;
  surgeLagSamples: number[];
};

export type MetroReturns = {
  seoul_2016_2021: number | null;
  metro_2016_2021: number | null;
  seoul_2022_2023: number | null;
  metro_2022_2023: number | null;
  seoul_2024_2026: number | null;
  metro_2024_2026: number | null;
};

export type MetroCity = {
  color: string;
  focusDistricts: string[];
  headline: string;
  lag: MetroLag;
  returns: MetroReturns;
  priceTop5: { apt: string; region: string; median_억: number }[];
  liquidTop5: { apt: string; region: string; months: number; trades: number; id: string }[];
  basketIndex: BasketPoint[];
  complexes: ComplexSeries[];
};

export type MetroLagCompare = {
  asOf: string;
  source: string;
  period: string;
  overview: { headline: string; method: string };
  seoul: {
    color: string;
    liquidTop5: { apt: string; region: string; months: number; trades: number; id?: string }[];
    basketIndex: BasketPoint[];
    complexes: ComplexSeries[];
  };
  cities: Record<string, MetroCity>;
  cityOrder: string[];
};

export const metroLagCompare = raw as unknown as MetroLagCompare;

export const METRO_CITY_ORDER = metroLagCompare.cityOrder;
