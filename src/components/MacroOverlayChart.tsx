import React, { useMemo } from 'react';
import { StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import Svg, { Circle, Line, Path, Text as SvgText } from 'react-native-svg';

export type MacroChartPoint = {
  month: string;
  aptIdx: number;
  aptMa3: number | null;
  aptMa12: number | null;
  kospiIdx: number;
  rate: number;
};

export type MacroMarker = {
  month: string;
  kind: 'surge' | 'golden' | 'dead' | 'turn_up' | 'turn_down';
  label?: string;
};

type Props = {
  points: MacroChartPoint[];
  markers?: MacroMarker[];
  height?: number;
  showMa?: boolean;
};

function normMonth(m: string): string {
  if (/^\d{6}$/.test(m)) return `${m.slice(0, 4)}-${m.slice(4)}`;
  return m.slice(0, 7);
}

function shortMonth(m: string): string {
  const n = normMonth(m);
  return `${n.slice(2, 4)}.${n.slice(5)}`;
}

const COLORS = {
  apt: '#1f4d3a',
  ma3: '#5b8a72',
  ma12: '#9bb5a6',
  kospi: '#1d4ed8',
  rate: '#b45309',
  surge: '#be123c',
  golden: '#15803d',
  dead: '#9f1239',
  turn: '#7c3aed',
};

export function MacroOverlayChart({
  points,
  markers = [],
  height = 300,
  showMa = true,
}: Props) {
  const { width: screenW } = useWindowDimensions();
  const width = Math.min(screenW - 40, 560);
  const padL = 42;
  const padR = 42;
  const padT = 18;
  const padB = 30;
  const innerW = width - padL - padR;
  const innerH = height - padT - padB;

  const months = useMemo(() => points.map((p) => normMonth(p.month)), [points]);

  const { minL, maxL, minR, maxR, paths, markerDots, ratePath } = useMemo(() => {
    if (points.length === 0) {
      return {
        minL: 0,
        maxL: 1,
        minR: 0,
        maxR: 1,
        paths: [] as { id: string; color: string; d: string; width: number; dash?: string }[],
        markerDots: [] as { x: number; y: number; color: string; r: number }[],
        ratePath: '',
      };
    }
    const leftVals: number[] = [];
    for (const p of points) {
      leftVals.push(p.aptIdx, p.kospiIdx);
      if (showMa) {
        if (p.aptMa3 != null) leftVals.push(p.aptMa3);
        if (p.aptMa12 != null) leftVals.push(p.aptMa12);
      }
    }
    const rates = points.map((p) => p.rate);
    const minL0 = Math.min(...leftVals);
    const maxL0 = Math.max(...leftVals);
    const spanL = Math.max(1e-6, maxL0 - minL0);
    const minL = minL0 - spanL * 0.08;
    const maxL = maxL0 + spanL * 0.08;
    const minR0 = Math.min(...rates);
    const maxR0 = Math.max(...rates);
    const spanR = Math.max(0.25, maxR0 - minR0);
    const minR = Math.max(0, minR0 - spanR * 0.15);
    const maxR = maxR0 + spanR * 0.15;

    const n = Math.max(1, points.length - 1);
    const xAt = (i: number) => padL + (i / n) * innerW;
    const yL = (v: number) => padT + (1 - (v - minL) / (maxL - minL)) * innerH;
    const yR = (v: number) => padT + (1 - (v - minR) / (maxR - minR)) * innerH;

    const build = (
      pick: (p: MacroChartPoint) => number | null,
      id: string,
      color: string,
      width: number,
      dash?: string,
    ) => {
      const parts: string[] = [];
      points.forEach((p, i) => {
        const v = pick(p);
        if (v == null) return;
        const x = xAt(i);
        const y = yL(v);
        parts.push(`${parts.length === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`);
      });
      return { id, color, d: parts.join(' '), width, dash };
    };

    const paths = [
      build((p) => p.aptIdx, 'apt', COLORS.apt, 2.6),
      build((p) => p.kospiIdx, 'kospi', COLORS.kospi, 2.2),
    ];
    if (showMa) {
      paths.push(build((p) => p.aptMa3, 'ma3', COLORS.ma3, 1.6, '4 3'));
      paths.push(build((p) => p.aptMa12, 'ma12', COLORS.ma12, 1.6, '2 4'));
    }

    const rateParts: string[] = [];
    points.forEach((p, i) => {
      const x = xAt(i);
      const y = yR(p.rate);
      rateParts.push(`${rateParts.length === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`);
    });

    const byMonth = new Map(points.map((p, i) => [normMonth(p.month), i]));
    const markerDots: { x: number; y: number; color: string; r: number }[] = [];
    for (const m of markers) {
      const idx = byMonth.get(normMonth(m.month));
      if (idx == null) continue;
      const p = points[idx];
      let color = COLORS.surge;
      let r = 4.5;
      if (m.kind === 'golden') color = COLORS.golden;
      else if (m.kind === 'dead') color = COLORS.dead;
      else if (m.kind === 'turn_up' || m.kind === 'turn_down') {
        color = COLORS.turn;
        r = 3.8;
      }
      markerDots.push({ x: xAt(idx), y: yL(p.aptIdx), color, r });
    }

    return { minL, maxL, minR, maxR, paths, markerDots, ratePath: rateParts.join(' ') };
  }, [points, markers, showMa, innerW, innerH]);

  if (points.length === 0) {
    return (
      <View style={[styles.wrap, { minHeight: height }]}>
        <Text style={styles.empty}>표시할 시계열이 없습니다.</Text>
      </View>
    );
  }

  const yLTicks = [maxL, (minL + maxL) / 2, minL];
  const yRTicks = [maxR, (minR + maxR) / 2, minR];
  const xLabelIdx = [0, Math.floor(months.length / 2), months.length - 1].filter(
    (v, i, a) => a.indexOf(v) === i && v >= 0 && v < months.length,
  );

  return (
    <View style={styles.wrap}>
      <Svg width={width} height={height}>
        {yLTicks.map((v, i) => {
          const y = padT + (i / 2) * innerH;
          return (
            <React.Fragment key={`yl-${i}`}>
              <Line
                x1={padL}
                y1={y}
                x2={width - padR}
                y2={y}
                stroke="#e4e9ef"
                strokeWidth={1}
              />
              <SvgText x={padL - 6} y={y + 3} fontSize={9} fill="#6b7580" textAnchor="end">
                {Math.round(v)}
              </SvgText>
              <SvgText x={width - padR + 6} y={y + 3} fontSize={9} fill="#b45309" textAnchor="start">
                {yRTicks[i].toFixed(1)}
              </SvgText>
            </React.Fragment>
          );
        })}

        {paths.map((p) =>
          p.d ? (
            <Path
              key={p.id}
              d={p.d}
              stroke={p.color}
              strokeWidth={p.width}
              fill="none"
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeDasharray={p.dash}
              opacity={0.92}
            />
          ) : null,
        )}

        {ratePath ? (
          <Path
            d={ratePath}
            stroke={COLORS.rate}
            strokeWidth={2.2}
            fill="none"
            strokeLinejoin="round"
            strokeLinecap="round"
            opacity={0.9}
          />
        ) : null}

        {markerDots.map((d, i) => (
          <Circle
            key={`mk-${i}`}
            cx={d.x}
            cy={d.y}
            r={d.r}
            fill={d.color}
            stroke="#fff"
            strokeWidth={1.2}
          />
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
        {(
          [
            ['매매지수', COLORS.apt],
            ['KOSPI', COLORS.kospi],
            ['기준금리(우)', COLORS.rate],
            ...(showMa
              ? [
                  ['MA3', COLORS.ma3],
                  ['MA12', COLORS.ma12],
                ]
              : []),
            ['급등', COLORS.surge],
            ['골든/데드', COLORS.golden],
          ] as const
        ).map(([label, color]) => (
          <View key={label} style={styles.legendItem}>
            <View style={[styles.swatch, { backgroundColor: color }]} />
            <Text style={styles.legendText}>{label}</Text>
          </View>
        ))}
      </View>
      <Text style={styles.axisHint}>좌: 지수(시작=100) · 우: 기준금리(%)</Text>
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
  },
  legend: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    paddingHorizontal: 12,
    paddingBottom: 4,
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
    fontSize: 11,
    color: '#1a2332',
    fontWeight: '600',
  },
  axisHint: {
    fontSize: 10,
    color: '#8a929c',
    paddingHorizontal: 12,
    paddingBottom: 8,
  },
});
