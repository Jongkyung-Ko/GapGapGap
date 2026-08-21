import { useCallback, useState } from 'react';
import { LayoutChangeEvent, useWindowDimensions } from 'react-native';

const DEFAULT_MAX = 560;
const DEFAULT_MIN = 260;

/** Safe SVG width: never negative/zero even before layout or with narrow viewports. */
export function useSafeChartWidth(options?: {
  max?: number;
  min?: number;
  horizontalPadding?: number;
}) {
  const max = options?.max ?? DEFAULT_MAX;
  const min = options?.min ?? DEFAULT_MIN;
  const pad = options?.horizontalPadding ?? 40;
  const { width: screenW } = useWindowDimensions();
  const [laidOut, setLaidOut] = useState<number | null>(null);

  const onLayout = useCallback((e: LayoutChangeEvent) => {
    const w = e.nativeEvent.layout.width;
    if (Number.isFinite(w) && w > 0) setLaidOut(w);
  }, []);

  const fromWindow = Math.min(Math.max(screenW - pad, min), max);
  const width = Math.max(
    min,
    Math.min(max, laidOut != null && laidOut > 0 ? laidOut : fromWindow),
  );

  return { width, onLayout };
}

export function safeInner(width: number, padL: number, padR: number, floor = 40): number {
  return Math.max(floor, width - padL - padR);
}
