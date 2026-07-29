import React, { useMemo } from 'react';
import { StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import Svg, { Circle, Line, Path, Text as SvgText } from 'react-native-svg';
import type { LeaderMonthPoint } from '../types';
import { formatPyeong, shortMonth } from '../utils/format';

export type OverlaySeries = {
  id: string;
  label: string;
  color: string;
  monthly: LeaderMonthPoint[];
};

interface Props {
  series: OverlaySeries[];
  height?: number;
  /** Y-axis formatter — default 평단가 */
  formatValue?: (v: number) => string;
  emptyText?: string;
}

export function OverlayLineChart({
  series,
  height = 260,
  formatValue = formatPyeong,
  emptyText = '구를 선택하면 여기에 시세 추이가 겹쳐 표시됩니다.',
}: Props) {
  const { width: screenW } = useWindowDimensions();
  const width = Math.min(screenW - 40, 560);
  const padL = 52;
  const padR = 12;
  const padT = 16;
  const padB = 28;
  const innerW = width - padL - padR;
  const innerH = height - padT - padB;

  const months = useMemo(() => {
    const set = new Set<string>();
    for (const s of series) {
      for (const m of s.monthly) {
        if (m.avgMedian != null) set.add(m.month);
      }
    }
    return [...set].sort();
  }, [series]);

  const { minY, maxY, paths } = useMemo(() => {
    const vals: number[] = [];
    for (const s of series) {
      for (const m of s.monthly) {
        if (m.avgMedian != null) vals.push(m.avgMedian);
      }
    }
    if (vals.length === 0 || months.length === 0) {
      return { minY: 0, maxY: 1, paths: [] as { id: string; color: string; d: string; dots: { x: number; y: number }[] }[] };
    }
    const min = Math.min(...vals);
    const max = Math.max(...vals);
    const span = Math.max(1, max - min);
    const minY = min - span * 0.08;
    const maxY = max + span * 0.08;
    const n = Math.max(1, months.length - 1);

    const paths = series.map((s) => {
      const byMonth = new Map(
        s.monthly.filter((m) => m.avgMedian != null).map((m) => [m.month, m.avgMedian as number]),
      );
      const dots: { x: number; y: number }[] = [];
      const parts: string[] = [];
      months.forEach((month, i) => {
        const v = byMonth.get(month);
        if (v == null) return;
        const x = padL + (i / n) * innerW;
        const y = padT + (1 - (v - minY) / (maxY - minY)) * innerH;
        dots.push({ x, y });
        parts.push(`${parts.length === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`);
      });
      return { id: s.id, color: s.color, d: parts.join(' '), dots };
    });

    return { minY, maxY, paths };
  }, [series, months, innerW, innerH]);

  if (series.length === 0 || months.length === 0) {
    return (
      <View style={[styles.wrap, { minHeight: height }]}>
        <Text style={styles.empty}>{emptyText}</Text>
      </View>
    );
  }

  const yTicks = [maxY, (minY + maxY) / 2, minY];
  const xLabelIdx = [0, Math.floor(months.length / 2), months.length - 1].filter(
    (v, i, a) => a.indexOf(v) === i && v >= 0 && v < months.length,
  );

  return (
    <View style={styles.wrap}>
      <Svg width={width} height={height}>
        {yTicks.map((v, i) => {
          const y = padT + (i / 2) * innerH;
          return (
            <React.Fragment key={`yt-${i}`}>
              <Line
                x1={padL}
                y1={y}
                x2={width - padR}
                y2={y}
                stroke="#e8ebe8"
                strokeWidth={1}
              />
              <SvgText x={padL - 6} y={y + 3} fontSize={9} fill="#7a8478" textAnchor="end">
                {formatValue(v)}
              </SvgText>
            </React.Fragment>
          );
        })}

        {paths.map((p) => (
          <React.Fragment key={p.id}>
            {p.d ? (
              <Path
                d={p.d}
                stroke={p.color}
                strokeWidth={2.2}
                fill="none"
                strokeLinejoin="round"
                strokeLinecap="round"
                opacity={0.92}
              />
            ) : null}
            {p.dots.map((d, i) => (
              <Circle key={`${p.id}-${i}`} cx={d.x} cy={d.y} r={2.2} fill={p.color} />
            ))}
          </React.Fragment>
        ))}

        {xLabelIdx.map((idx) => {
          const x = padL + (idx / Math.max(1, months.length - 1)) * innerW;
          return (
            <SvgText
              key={`xl-${idx}`}
              x={x}
              y={height - 8}
              fontSize={10}
              fill="#7a8478"
              textAnchor="middle"
            >
              {shortMonth(months[idx])}
            </SvgText>
          );
        })}
      </Svg>

      <View style={styles.legend}>
        {series.map((s) => (
          <View key={s.id} style={styles.legendItem}>
            <View style={[styles.swatch, { backgroundColor: s.color }]} />
            <Text style={styles.legendText}>{s.label}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    backgroundColor: '#f7f6f2',
    borderRadius: 4,
    paddingVertical: 8,
    overflow: 'hidden',
  },
  empty: {
    color: '#7a8478',
    fontSize: 14,
    textAlign: 'center',
    paddingVertical: 48,
    paddingHorizontal: 20,
    lineHeight: 22,
  },
  legend: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    paddingHorizontal: 12,
    paddingBottom: 6,
    paddingTop: 4,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  swatch: {
    width: 12,
    height: 3,
    borderRadius: 1,
  },
  legendText: {
    fontSize: 12,
    color: '#3d4639',
    fontWeight: '600',
  },
});
