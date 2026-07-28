import React, { useMemo } from 'react';
import { StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import Svg, { Circle, Defs, Line, LinearGradient, Path, Rect, Stop, Text as SvgText } from 'react-native-svg';
import type { LeaderMonthPoint, SurgeInterval } from '../types';
import { formatManwon, shortMonth } from '../utils/format';

interface Props {
  monthly: LeaderMonthPoint[];
  surges: SurgeInterval[];
  height?: number;
}

export function LeaderLineChart({ monthly, surges, height = 220 }: Props) {
  const { width: screenW } = useWindowDimensions();
  const width = Math.min(screenW - 40, 520);
  const padL = 44;
  const padR = 12;
  const padT = 16;
  const padB = 28;
  const innerW = width - padL - padR;
  const innerH = height - padT - padB;

  const points = useMemo(() => {
    return monthly
      .map((m, i) => ({ ...m, i }))
      .filter((m) => m.avgMedian != null) as Array<
      LeaderMonthPoint & { i: number; avgMedian: number }
    >;
  }, [monthly]);

  const { minY, maxY, pathD, coords } = useMemo(() => {
    if (points.length === 0) {
      return { minY: 0, maxY: 1, pathD: '', coords: [] as { x: number; y: number; month: string; value: number }[] };
    }
    const vals = points.map((p) => p.avgMedian);
    const min = Math.min(...vals);
    const max = Math.max(...vals);
    const span = Math.max(1, max - min);
    const minY = min - span * 0.08;
    const maxY = max + span * 0.08;
    const n = monthly.length;
    const coords = points.map((p) => {
      const x = padL + (p.i / Math.max(1, n - 1)) * innerW;
      const y = padT + (1 - (p.avgMedian - minY) / (maxY - minY)) * innerH;
      return { x, y, month: p.month, value: p.avgMedian };
    });
    const pathD = coords
      .map((c, idx) => `${idx === 0 ? 'M' : 'L'} ${c.x.toFixed(1)} ${c.y.toFixed(1)}`)
      .join(' ');
    return { minY, maxY, pathD, coords };
  }, [points, monthly.length, innerW, innerH]);

  const surgeRects = useMemo(() => {
    const n = monthly.length;
    if (n < 2) return [];
    return surges.map((s) => {
      const startIdx = monthly.findIndex((m) => m.month === s.startMonth);
      const endIdx = monthly.findIndex((m) => m.month === s.endMonth);
      if (startIdx < 0 || endIdx < 0) return null;
      const x1 = padL + (startIdx / Math.max(1, n - 1)) * innerW;
      const x2 = padL + (endIdx / Math.max(1, n - 1)) * innerW;
      return {
        key: `${s.startMonth}-${s.endMonth}`,
        x: x1,
        width: Math.max(6, x2 - x1),
        label: `+${s.changePercent.toFixed(0)}%`,
      };
    }).filter(Boolean) as { key: string; x: number; width: number; label: string }[];
  }, [surges, monthly, innerW]);

  if (points.length === 0) {
    return (
      <View style={[styles.wrap, { height }]}>
        <Text style={styles.empty}>월별 평균 시세 데이터가 없습니다.</Text>
      </View>
    );
  }

  const yTicks = [maxY, (minY + maxY) / 2, minY];
  const xLabels = [0, Math.floor(monthly.length / 2), monthly.length - 1]
    .filter((v, i, a) => a.indexOf(v) === i)
    .map((idx) => ({
      idx,
      x: padL + (idx / Math.max(1, monthly.length - 1)) * innerW,
      label: shortMonth(monthly[idx]?.month ?? ''),
    }));

  return (
    <View style={styles.wrap}>
      <Svg width={width} height={height}>
        <Defs>
          <LinearGradient id="surgeFill" x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0" stopColor="#e85d4c" stopOpacity="0.22" />
            <Stop offset="1" stopColor="#e85d4c" stopOpacity="0.05" />
          </LinearGradient>
        </Defs>

        {surgeRects.map((r) => (
          <Rect
            key={r.key}
            x={r.x}
            y={padT}
            width={r.width}
            height={innerH}
            fill="url(#surgeFill)"
          />
        ))}

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
                {formatManwon(v)}
              </SvgText>
            </React.Fragment>
          );
        })}

        {pathD ? (
          <Path d={pathD} stroke="#1f4d3a" strokeWidth={2.4} fill="none" strokeLinejoin="round" />
        ) : null}

        {coords.map((c) => (
          <Circle key={c.month} cx={c.x} cy={c.y} r={2.6} fill="#1f4d3a" />
        ))}

        {xLabels.map((l) => (
          <SvgText
            key={`xl-${l.idx}`}
            x={l.x}
            y={height - 8}
            fontSize={10}
            fill="#7a8478"
            textAnchor="middle"
          >
            {l.label}
          </SvgText>
        ))}
      </Svg>

      {surges.length > 0 ? (
        <View style={styles.legend}>
          <View style={styles.legendSwatch} />
          <Text style={styles.legendText}>급등 구간 (차트 음영)</Text>
        </View>
      ) : null}
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
    paddingVertical: 40,
  },
  legend: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 12,
    paddingBottom: 4,
  },
  legendSwatch: {
    width: 14,
    height: 10,
    backgroundColor: 'rgba(232,93,76,0.25)',
    borderRadius: 2,
  },
  legendText: {
    fontSize: 12,
    color: '#5c655a',
  },
});
