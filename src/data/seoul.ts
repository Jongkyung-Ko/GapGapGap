import type { LeaderIndexResult } from '../types';

export const SEOUL_DISTRICTS = [
  { lawdCd: '11110', name: '종로구' },
  { lawdCd: '11140', name: '중구' },
  { lawdCd: '11170', name: '용산구' },
  { lawdCd: '11200', name: '성동구' },
  { lawdCd: '11215', name: '광진구' },
  { lawdCd: '11230', name: '동대문구' },
  { lawdCd: '11260', name: '중랑구' },
  { lawdCd: '11290', name: '성북구' },
  { lawdCd: '11305', name: '강북구' },
  { lawdCd: '11320', name: '도봉구' },
  { lawdCd: '11350', name: '노원구' },
  { lawdCd: '11380', name: '은평구' },
  { lawdCd: '11410', name: '서대문구' },
  { lawdCd: '11440', name: '마포구' },
  { lawdCd: '11470', name: '양천구' },
  { lawdCd: '11500', name: '강서구' },
  { lawdCd: '11530', name: '구로구' },
  { lawdCd: '11545', name: '금천구' },
  { lawdCd: '11560', name: '영등포구' },
  { lawdCd: '11590', name: '동작구' },
  { lawdCd: '11620', name: '관악구' },
  { lawdCd: '11650', name: '서초구' },
  { lawdCd: '11680', name: '강남구' },
  { lawdCd: '11710', name: '송파구' },
  { lawdCd: '11740', name: '강동구' },
] as const;

export type SeoulDistrict = (typeof SEOUL_DISTRICTS)[number];

/** Major exclusive-area bands (㎡) for analysis */
export const ANALYSIS_AREA_TARGETS = [59, 74, 79, 84, 99] as const;

/**
 * Ranking / focus metric:
 * - pyeong: 평단가 (만원/평)
 * - sale: 매매가 절대가 (만원)
 * - jeonse: 전세가 절대가 (만원)
 */
export type AnalysisMetric = 'pyeong' | 'sale' | 'jeonse';

/** API wire unit (App Navi) */
export type ApiMetric = 'pyeong' | 'price';

export const ANALYSIS_METRICS = [
  { id: 'pyeong' as const, label: '평단가' },
  { id: 'sale' as const, label: '매매가' },
  { id: 'jeonse' as const, label: '전세가' },
];

export function toApiMetric(metric: AnalysisMetric): ApiMetric {
  return metric === 'pyeong' ? 'pyeong' : 'price';
}

export function isAbsoluteMetric(metric: AnalysisMetric): boolean {
  return metric === 'sale' || metric === 'jeonse';
}

export interface AnalysisOptions {
  topN: number;
  years: number;
  surgeThreshold: number;
  areaTarget: number;
  metric: AnalysisMetric;
}

export const DEFAULT_OPTIONS: AnalysisOptions = {
  topN: 10,
  years: 3,
  surgeThreshold: 3,
  areaTarget: 84,
  metric: 'pyeong',
};

export type { LeaderIndexResult };
