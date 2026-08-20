import React, { useMemo, useState } from 'react';
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import Svg, { Circle, Line, Path, Rect, Text as SvgText } from 'react-native-svg';
import { ChartZoomBar } from './ChartZoomBar';
import {
  fullMonth,
  pickLabelIndices,
  shortMonth,
  useChartViewport,
  yTicks,
  normMonth,
} from '../hooks/useChartViewport';

export type SaleSeriesPoint = {
  month: string;
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
  formatValue?: (v: number) => string;
  emptyText?: string;
};

type ChartBodyProps = {
  series: SaleOverlaySeries[];
  months: string[];
  height: number;
  width: number;
  formatValue: (v: number) => string;
  zoomed: boolean;
  selectedIdx: number | null;
  onSelectIdx: (idx: number | null) => void;
};

function ChartBody({
  series,
  months,
  height,
  width,
  formatValue,
  zoomed,
  selectedIdx,
  onSelectIdx,
}: ChartBodyProps) {
  const padL = 48;
  const padR = 14;
  const padT = 16;
  const padB = zoomed ? 36 : 28;
  const innerW = width - padL - padR;
  const innerH = height - padT - padB;
  const detail = zoomed || months.length <= 24;

  const { minY, maxY, paths } = useMemo(() => {
    const vals: number[] = [];
    for (const s of series) {
      for (const p of s.points) {
        if (p.value != null && months.includes(normMonth(p.month))) vals.push(p.value);
      }
    }
    // only visible months
    const visibleVals: number[] = [];
    const monthSet = new Set(months);
    for (const s of series) {
      for (const p of s.points) {
        if (p.value != null && monthSet.has(normMonth(p.month))) visibleVals.push(p.value);
      }
    }
    const useVals = visibleVals.length ? visibleVals : vals;
    if (useVals.length === 0 || months.length === 0) {
      return {
        minY: 0,
        maxY: 1,
        paths: [] as {
          id: string;
          color: string;
          d: string;
          dots: { x: number; y: number; v: number; i: number }[];
        }[],
      };
    }
    const min = Math.min(...useVals);
    const max = Math.max(...useVals);
    const span = Math.max(1e-6, max - min);
    // tighter padding when zoomed for more vertical detail
    const pad = detail ? 0.05 : 0.08;
    const minY = min - span * pad;
    const maxY = max + span * pad;
    const n = Math.max(1, months.length - 1);

    const paths = series.map((s) => {
      const byMonth = new Map(
        s.points
          .filter((p) => p.value != null)
          .map((p) => [normMonth(p.month), p.value as number]),
      );
      const dots: { x: number; y: number; v: number; i: number }[] = [];
      const parts: string[] = [];
      months.forEach((month, i) => {
        const v = byMonth.get(month);
        if (v == null) return;
        const x = padL + (i / n) * innerW;
        const y = padT + (1 - (v - minY) / (maxY - minY)) * innerH;
        dots.push({ x, y, v, i });
        parts.push(`${parts.length === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`);
      });
      return { id: s.id, color: s.color, d: parts.join(' '), dots };
    });

    return { minY, maxY, paths };
  }, [series, months, innerW, innerH, detail]);

  const tickCount = detail ? 5 : 3;
  const ticks = yTicks(minY, maxY, tickCount);
  const maxLabels = detail ? Math.min(12, months.length) : Math.min(5, months.length);
  const xLabelIdx = pickLabelIndices(months.length, maxLabels);
  const dotR = detail ? 3.2 : 2.1;
  const strokeW = detail ? 2.6 : 2.2;

  const hitIndex = (locX: number): number | null => {
    if (months.length === 0) return null;
    const n = Math.max(1, months.length - 1);
    const t = (locX - padL) / innerW;
    const idx = Math.round(clamp01(t) * n);
    return clamp(idx, 0, months.length - 1);
  };

  return (
    <View>
      <Pressable
        onPress={(e) => {
          const x = e.nativeEvent.locationX;
          const idx = hitIndex(x);
          onSelectIdx(idx);
        }}
      >
        <Svg width={width} height={height}>
          {ticks.map((v, i) => {
            const y = padT + (i / Math.max(1, tickCount - 1)) * innerH;
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
                <SvgText x={padL - 6} y={y + 3} fontSize={detail ? 10 : 9} fill="#6b7580" textAnchor="end">
                  {formatValue(v)}
                </SvgText>
              </React.Fragment>
            );
          })}

          {selectedIdx != null && months[selectedIdx] != null ? (
            <Line
              x1={padL + (selectedIdx / Math.max(1, months.length - 1)) * innerW}
              y1={padT}
              x2={padL + (selectedIdx / Math.max(1, months.length - 1)) * innerW}
              y2={padT + innerH}
              stroke="#94a3b8"
              strokeWidth={1}
              strokeDasharray="3 3"
            />
          ) : null}

          {paths.map((p) => (
            <React.Fragment key={p.id}>
              {p.d ? (
                <Path
                  d={p.d}
                  stroke={p.color}
                  strokeWidth={strokeW}
                  fill="none"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  opacity={0.92}
                />
              ) : null}
              {p.dots.map((d) => (
                <Circle
                  key={`${p.id}-${d.i}`}
                  cx={d.x}
                  cy={d.y}
                  r={selectedIdx === d.i ? dotR + 1.5 : dotR}
                  fill={p.color}
                  opacity={selectedIdx == null || selectedIdx === d.i ? 1 : 0.35}
                />
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
                fontSize={detail ? 10 : 10}
                fill="#6b7580"
                textAnchor="middle"
              >
                {detail ? fullMonth(months[idx]).slice(2) : shortMonth(months[idx])}
              </SvgText>
            );
          })}

          {/* invisible hit area hint */}
          <Rect x={padL} y={padT} width={innerW} height={innerH} fill="transparent" />
        </Svg>
      </Pressable>

      {selectedIdx != null && months[selectedIdx] ? (
        <View style={styles.tooltip}>
          <Text style={styles.tooltipMonth}>{fullMonth(months[selectedIdx])}</Text>
          {series.map((s) => {
            const pt = s.points.find((p) => normMonth(p.month) === months[selectedIdx]);
            if (pt?.value == null) return null;
            return (
              <View key={s.id} style={styles.tooltipRow}>
                <View style={[styles.swatch, { backgroundColor: s.color }]} />
                <Text style={styles.tooltipLabel}>{s.label}</Text>
                <Text style={styles.tooltipVal}>{formatValue(pt.value)}</Text>
              </View>
            );
          })}
        </View>
      ) : (
        <Text style={styles.tapHint}>차트를 탭하면 해당 월 수치가 표시됩니다</Text>
      )}
    </View>
  );
}

function clamp(n: number, lo: number, hi: number) {
  return Math.max(lo, Math.min(hi, n));
}
function clamp01(n: number) {
  return clamp(n, 0, 1);
}

export function OverlaySaleChart({
  series,
  height = 260,
  formatValue = (v) => String(Math.round(v)),
  emptyText = '표시할 시계열이 없습니다. 아래에서 단지를 선택하세요.',
}: Props) {
  const { width: screenW, height: screenH } = useWindowDimensions();
  const width = Math.min(screenW - 40, 560);
  const [expanded, setExpanded] = useState(false);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

  const allMonths = useMemo(() => {
    const set = new Set<string>();
    for (const s of series) {
      for (const p of s.points) {
        if (p.value != null) set.add(normMonth(p.month));
      }
    }
    return [...set].sort();
  }, [series]);

  const vp = useChartViewport(allMonths.length);
  const months = allMonths.slice(vp.start, vp.end);
  const zoomed = vp.zoomStep > 0;

  // map selection into window
  const onSelectIdx = (idx: number | null) => setSelectedIdx(idx);

  if (series.length === 0 || allMonths.length === 0) {
    return (
      <View style={[styles.wrap, { minHeight: height }]}>
        <Text style={styles.empty}>{emptyText}</Text>
      </View>
    );
  }

  const chart = (
    <ChartBody
      series={series}
      months={months}
      height={height}
      width={width}
      formatValue={formatValue}
      zoomed={zoomed}
      selectedIdx={selectedIdx}
      onSelectIdx={onSelectIdx}
    />
  );

  const expandW = Math.min(screenW - 24, 920);
  const expandH = Math.min(Math.max(380, screenH * 0.55), 520);

  return (
    <View style={styles.wrap}>
      <ChartZoomBar
        windowLabel={vp.windowLabel}
        canZoomIn={vp.canZoomIn}
        canZoomOut={vp.canZoomOut}
        canPanLeft={vp.canPanLeft}
        canPanRight={vp.canPanRight}
        onZoomIn={() => {
          setSelectedIdx(null);
          vp.zoomIn();
        }}
        onZoomOut={() => {
          setSelectedIdx(null);
          vp.zoomOut();
        }}
        onPanLeft={() => {
          setSelectedIdx(null);
          vp.panLeft();
        }}
        onPanRight={() => {
          setSelectedIdx(null);
          vp.panRight();
        }}
        onReset={() => {
          setSelectedIdx(null);
          vp.reset();
        }}
        onExpand={() => setExpanded(true)}
      />
      {chart}
      <View style={styles.legend}>
        {series.map((s) => (
          <View key={s.id} style={styles.legendItem}>
            <View style={[styles.swatch, { backgroundColor: s.color }]} />
            <Text style={styles.legendText}>{s.label}</Text>
          </View>
        ))}
      </View>

      <Modal visible={expanded} animationType="fade" transparent onRequestClose={() => setExpanded(false)}>
        <View style={styles.modalBackdrop}>
          <View style={[styles.modalCard, { width: expandW }]}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>시계열 확대</Text>
              <Pressable onPress={() => setExpanded(false)} style={styles.closeBtn}>
                <Text style={styles.closeText}>닫기</Text>
              </Pressable>
            </View>
            <ChartZoomBar
              windowLabel={vp.windowLabel}
              canZoomIn={vp.canZoomIn}
              canZoomOut={vp.canZoomOut}
              canPanLeft={vp.canPanLeft}
              canPanRight={vp.canPanRight}
              onZoomIn={() => {
                setSelectedIdx(null);
                vp.zoomIn();
              }}
              onZoomOut={() => {
                setSelectedIdx(null);
                vp.zoomOut();
              }}
              onPanLeft={() => {
                setSelectedIdx(null);
                vp.panLeft();
              }}
              onPanRight={() => {
                setSelectedIdx(null);
                vp.panRight();
              }}
              onReset={() => {
                setSelectedIdx(null);
                vp.reset();
              }}
              expanded
              onExpand={() => setExpanded(false)}
            />
            <ChartBody
              series={series}
              months={months}
              height={expandH}
              width={expandW - 16}
              formatValue={formatValue}
              zoomed
              selectedIdx={selectedIdx}
              onSelectIdx={onSelectIdx}
            />
            <View style={styles.legend}>
              {series.map((s) => (
                <View key={s.id} style={styles.legendItem}>
                  <View style={[styles.swatch, { backgroundColor: s.color }]} />
                  <Text style={styles.legendText}>{s.label}</Text>
                </View>
              ))}
            </View>
            <Text style={styles.modalHint}>
              + 로 구간을 좁히면 Y축이 해당 구간에 맞춰 재스케일되고 월 라벨·점이 더 촘촘해집니다.
            </Text>
          </View>
        </View>
      </Modal>
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
  tooltip: {
    marginHorizontal: 12,
    marginBottom: 6,
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#f7f8fa',
    borderWidth: 1,
    borderColor: '#e4e9ef',
    gap: 4,
  },
  tooltipMonth: {
    fontSize: 12,
    fontWeight: '800',
    color: '#1a2332',
    marginBottom: 2,
  },
  tooltipRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  tooltipLabel: {
    flex: 1,
    fontSize: 12,
    color: '#5c6570',
  },
  tooltipVal: {
    fontSize: 13,
    fontWeight: '800',
    color: '#1a2332',
  },
  tapHint: {
    fontSize: 11,
    color: '#8a929c',
    paddingHorizontal: 12,
    paddingBottom: 6,
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.55)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
  },
  modalCard: {
    backgroundColor: '#fff',
    borderRadius: 14,
    paddingBottom: 12,
    maxWidth: '100%',
    overflow: 'hidden',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 14,
    paddingTop: 14,
    paddingBottom: 4,
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#1a2332',
  },
  closeBtn: {
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  closeText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#1f4d3a',
  },
  modalHint: {
    fontSize: 11,
    color: '#8a929c',
    paddingHorizontal: 14,
    paddingTop: 4,
    lineHeight: 16,
  },
});
