import { useCallback, useMemo, useState } from 'react';

/** Prefer shorter windows as zoom intensifies. */
export const ZOOM_WINDOWS = [0, 48, 24, 12, 6] as const; // 0 = all

export type ChartViewport = {
  start: number;
  end: number; // exclusive
  zoomStep: number;
  canZoomIn: boolean;
  canZoomOut: boolean;
  canPanLeft: boolean;
  canPanRight: boolean;
  windowLabel: string;
  zoomIn: () => void;
  zoomOut: () => void;
  panLeft: () => void;
  panRight: () => void;
  reset: () => void;
  setWindow: (start: number, end: number) => void;
};

function clamp(n: number, lo: number, hi: number) {
  return Math.max(lo, Math.min(hi, n));
}

export function useChartViewport(total: number): ChartViewport {
  const [zoomStep, setZoomStep] = useState(0);
  const [anchorEnd, setAnchorEnd] = useState<number | null>(null);

  const windowSize = useMemo(() => {
    if (total <= 0) return 0;
    const pref = ZOOM_WINDOWS[zoomStep] ?? 0;
    if (pref === 0) return total;
    return Math.min(total, pref);
  }, [total, zoomStep]);

  const end = useMemo(() => {
    if (total <= 0) return 0;
    if (zoomStep === 0) return total;
    const desired = anchorEnd == null ? total : anchorEnd;
    return clamp(desired, windowSize, total);
  }, [total, zoomStep, anchorEnd, windowSize]);

  const start = Math.max(0, end - windowSize);

  const zoomIn = useCallback(() => {
    setZoomStep((s) => {
      let next = s;
      while (next < ZOOM_WINDOWS.length - 1) {
        next += 1;
        const pref = ZOOM_WINDOWS[next];
        const size = pref === 0 ? total : Math.min(total, pref);
        const curPref = ZOOM_WINDOWS[s];
        const curSize = curPref === 0 ? total : Math.min(total, curPref);
        if (size < curSize) break;
      }
      return next;
    });
    setAnchorEnd((prev) => (prev == null ? total : prev));
  }, [total]);

  const zoomOut = useCallback(() => {
    setZoomStep((s) => {
      let next = s;
      while (next > 0) {
        next -= 1;
        if (next === 0) {
          setAnchorEnd(null);
          break;
        }
        const pref = ZOOM_WINDOWS[next];
        const size = pref === 0 ? total : Math.min(total, pref);
        const curPref = ZOOM_WINDOWS[s];
        const curSize = curPref === 0 ? total : Math.min(total, curPref);
        if (size > curSize) break;
      }
      return next;
    });
  }, [total]);

  const panLeft = useCallback(() => {
    if (zoomStep === 0) return;
    const step = Math.max(1, Math.floor(windowSize / 3));
    setAnchorEnd((prev) => {
      const cur = prev == null ? total : prev;
      return clamp(cur - step, windowSize, total);
    });
  }, [zoomStep, windowSize, total]);

  const panRight = useCallback(() => {
    if (zoomStep === 0) return;
    const step = Math.max(1, Math.floor(windowSize / 3));
    setAnchorEnd((prev) => {
      const cur = prev == null ? total : prev;
      return clamp(cur + step, windowSize, total);
    });
  }, [zoomStep, windowSize, total]);

  const reset = useCallback(() => {
    setZoomStep(0);
    setAnchorEnd(null);
  }, []);

  const setWindow = useCallback(
    (s: number, e: number) => {
      const ee = clamp(e, 1, total);
      const ss = clamp(s, 0, ee - 1);
      const size = ee - ss;
      // pick nearest zoom step
      let best = 0;
      let bestDiff = Infinity;
      ZOOM_WINDOWS.forEach((w, i) => {
        const target = w === 0 ? total : w;
        const d = Math.abs(target - size);
        if (d < bestDiff) {
          bestDiff = d;
          best = i;
        }
      });
      setZoomStep(best === 0 && size >= total ? 0 : Math.max(1, best));
      setAnchorEnd(ee);
    },
    [total],
  );

  const canZoomIn = useMemo(() => {
    if (total <= 6) return false;
    for (let next = zoomStep + 1; next < ZOOM_WINDOWS.length; next++) {
      const pref = ZOOM_WINDOWS[next];
      const size = pref === 0 ? total : Math.min(total, pref);
      if (size < windowSize) return true;
    }
    return false;
  }, [total, zoomStep, windowSize]);

  const windowLabel =
    zoomStep === 0 || windowSize >= total ? '전체' : `${windowSize}개월`;

  return {
    start,
    end,
    zoomStep,
    canZoomIn,
    canZoomOut: zoomStep > 0,
    canPanLeft: zoomStep > 0 && start > 0,
    canPanRight: zoomStep > 0 && end < total,
    windowLabel,
    zoomIn,
    zoomOut,
    panLeft,
    panRight,
    reset,
    setWindow,
  };
}

/** Evenly spaced indices including ends, denser when zoomed. */
export function pickLabelIndices(count: number, maxLabels: number): number[] {
  if (count <= 0) return [];
  if (count === 1) return [0];
  const n = Math.min(maxLabels, count);
  if (n <= 2) return [0, count - 1];
  const out: number[] = [];
  for (let i = 0; i < n; i++) {
    out.push(Math.round((i * (count - 1)) / (n - 1)));
  }
  return [...new Set(out)];
}

export function yTicks(min: number, max: number, count: number): number[] {
  if (count <= 1) return [max];
  const out: number[] = [];
  for (let i = 0; i < count; i++) {
    out.push(max - ((max - min) * i) / (count - 1));
  }
  return out;
}

export function normMonth(m: string): string {
  if (/^\d{6}$/.test(m)) return `${m.slice(0, 4)}-${m.slice(4)}`;
  return m.slice(0, 7);
}

export function shortMonth(m: string): string {
  const n = normMonth(m);
  return `${n.slice(2, 4)}.${n.slice(5)}`;
}

export function fullMonth(m: string): string {
  return normMonth(m);
}
