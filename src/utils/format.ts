/** price is in 만원 */
export function formatManwon(price: number | null | undefined): string {
  if (price == null || !Number.isFinite(price)) return '-';
  if (price >= 10000) {
    const eok = price / 10000;
    return `${eok.toFixed(eok >= 10 ? 1 : 2)}억`;
  }
  return `${Math.round(price).toLocaleString('ko-KR')}만`;
}

export function formatPercent(value: number | null | undefined, digits = 1): string {
  if (value == null || !Number.isFinite(value)) return '-';
  const sign = value > 0 ? '+' : '';
  return `${sign}${value.toFixed(digits)}%`;
}

export function shortMonth(month: string): string {
  // 2024-03 → 24.03
  if (month.length >= 7) return `${month.slice(2, 4)}.${month.slice(5, 7)}`;
  return month;
}
