import React, { useMemo } from 'react';
import { StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import Svg, { Circle, Line, Path, Text as SvgText } from 'react-native-svg';

export type SaleSeriesPoint = {
  month: string; // YYYY-MM or YYYYMM
  value: number | null;
};

export type SaleOverlaySeries = {
  id: string;
  label: string;
  color: string;
  points: SaleSeriesPoint[];
};

type Props = {
  series: SaleOverlaySeries[];
  height?: number;
  /** Y tick formatter */
  formatValue?: (v: number) => string;
  emptyText?: string;
};

function normMonth(m: string): string {
  if (/^\d{6}$/.test(m)) return `${m.slice(0, 4)}-${m.slice(4)}`;
  return m.slice(0, 7);
}

function shortMonth(m: string): string {
  const n = normMonth(m);
  return `${n.slice(2, 4)}.${n.slice(5)}`;
}

export function OverlaySaleChart({
  series,
  height = 260,
  formatValue = (v) => String(Math.round(v)),
  emptyText = '표시할 시계열이 없습니다. 아래에서 단지를 선택하세요.',
}: Props) {
  const { width: screenW } = useWindowDimensions();
  const width = Math.min(screenW - 40, 560);
  const padL = 48;
  const padR = 12;
  const padT = 16;
  const padB = 28;
  const innerW = width - padL - padR;
  const innerH = height - padT - padB;

  const months = useMemo(() => {
    const set = new Set<string>();
    for (const s of series) {
      for (const p of s.points) {
        if (p.value != null) set.add(normMonth(p.month));
      }
    }
    return [...set].sort();
  }, [series]);

  const { minY, maxY, paths } = useMemo(() => {
    const vals: number[] = [];
    for (const s of series) {
      for (const p of s.points) {
        if (p.value != null) vals.push(p.value);
      }
    }
    if (vals.length === 0 || months.length === 0) {
      return {
        minY: 0,
        maxY: 1,
        paths: [] as { id: string; color: string; d: string; dots: { x: number; y: number }[] }[],
      };
    }
    const min = Math.min(...vals);
    const max = Math.max(...vals);
    const span = Math.max(1e-6, max - min);
    const minY = min - span * 0.08;
    const maxY = max + span * 0.08;
    const n = Math.max(1, months.length - 1);

    const paths = series.map((s) => {
      const byMonth = new Map(
        s.points
          .filter((p) => p.value != null)
          .map((p) => [normMonth(p.month), p.value as number]),
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
                stroke="#e4e9ef"
                strokeWidth={1}
              />
              <SvgText x={padL - 6} y={y + 3} fontSize={9} fill="#6b7580" textAnchor="end">
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
              <Circle key={`${p.id}-${i}`} cx={d.x} cy={d.y} r={2.1} fill={p.color} />
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
              fill="#6b7580"
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
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#e4e9ef',
    overflow: 'hidden',
  },
  empty: {
    color: '#6b7580',
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
    paddingBottom: 8,
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
    color: '#1a2332',
    fontWeight: '600',
  },
});
