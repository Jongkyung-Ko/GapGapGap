/** Stable palette for overlapping district series */
export const SERIES_COLORS = [
  '#1f4d3a',
  '#c43b2c',
  '#2a5f9e',
  '#b07a1a',
  '#6b3fa0',
  '#0f7a6c',
  '#8b4513',
  '#1a6b8a',
  '#9c2f5a',
  '#3d6b1f',
  '#5c4a20',
  '#2c3e50',
] as const;

export function colorForLawd(lawdCd: string): string {
  const n = Number.parseInt(lawdCd, 10);
  const idx = Number.isFinite(n) ? n % SERIES_COLORS.length : 0;
  return SERIES_COLORS[idx];
}
