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

export function formatPercent(value: number | null | undefined, digits = 1): string {
  if (value == null || !Number.isFinite(value)) return '-';
  const sign = value > 0 ? '+' : '';
  return `${sign}${value.toFixed(digits)}%`;
}

export function shortMonth(month: string): string {
  if (month.length >= 7) return `${month.slice(2, 4)}.${month.slice(5, 7)}`;
  return month;
}
