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
import { ChartErrorBoundary } from './ChartErrorBoundary';
import { useSafeChartWidth } from '../hooks/useSafeChartWidth';
import {
  fullMonth,
  pickLabelIndices,
  shortMonth,
  useChartViewport,
  yTicks,
  normMonth,
} from '../hooks/useChartViewport';

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

type BodyProps = {
  points: MacroChartPoint[];
  markers: MacroMarker[];
  height: number;
  width: number;
  showMa: boolean;
  zoomed: boolean;
  selectedIdx: number | null;
  onSelectIdx: (idx: number | null) => void;
};

function MacroChartBody({
  points,
  markers,
  height,
  width,
  showMa,
  zoomed,
  selectedIdx,
  onSelectIdx,
}: BodyProps) {
  const padL = 42;
  const padR = 42;
  const padT = 18;
  const padB = zoomed ? 38 : 30;
  const safeW = Math.max(260, width);
  const innerW = Math.max(40, safeW - padL - padR);
  const innerH = Math.max(80, height - padT - padB);
  const detail = zoomed || points.length <= 24;
  const months = points.map((p) => normMonth(p.month));

  const { minL, maxL, minR, maxR, paths, markerDots, ratePath, rateDots } = useMemo(() => {
    if (points.length === 0) {
      return {
        minL: 0,
        maxL: 1,
        minR: 0,
        maxR: 1,
        paths: [] as { id: string; color: string; d: string; width: number; dash?: string; dots: { x: number; y: number; i: number }[] }[],
        markerDots: [] as { x: number; y: number; color: string; r: number }[],
        ratePath: '',
        rateDots: [] as { x: number; y: number; i: number }[],
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
    const pad = detail ? 0.05 : 0.08;
    const minL = minL0 - spanL * pad;
    const maxL = maxL0 + spanL * pad;
    const minR0 = Math.min(...rates);
    const maxR0 = Math.max(...rates);
    const spanR = Math.max(0.25, maxR0 - minR0);
    const minR = Math.max(0, minR0 - spanR * (detail ? 0.1 : 0.15));
    const maxR = maxR0 + spanR * (detail ? 0.1 : 0.15);

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
      const dots: { x: number; y: number; i: number }[] = [];
      points.forEach((p, i) => {
        const v = pick(p);
        if (v == null) return;
        const x = xAt(i);
        const y = yL(v);
        dots.push({ x, y, i });
        parts.push(`${parts.length === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`);
      });
      return { id, color, d: parts.join(' '), width, dash, dots };
    };

    const strokeBoost = detail ? 1.15 : 1;
    const paths = [
      build((p) => p.aptIdx, 'apt', COLORS.apt, 2.6 * strokeBoost),
      build((p) => p.kospiIdx, 'kospi', COLORS.kospi, 2.2 * strokeBoost),
    ];
    if (showMa) {
      paths.push(build((p) => p.aptMa3, 'ma3', COLORS.ma3, 1.6 * strokeBoost, '4 3'));
      paths.push(build((p) => p.aptMa12, 'ma12', COLORS.ma12, 1.6 * strokeBoost, '2 4'));
    }

    const rateParts: string[] = [];
    const rateDots: { x: number; y: number; i: number }[] = [];
    points.forEach((p, i) => {
      const x = xAt(i);
      const y = yR(p.rate);
      rateDots.push({ x, y, i });
      rateParts.push(`${rateParts.length === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`);
    });

    const byMonth = new Map(points.map((p, i) => [normMonth(p.month), i]));
    const markerDots: { x: number; y: number; color: string; r: number }[] = [];
    for (const m of markers) {
      const idx = byMonth.get(normMonth(m.month));
      if (idx == null) continue;
      const p = points[idx];
      let color = COLORS.surge;
      let r = detail ? 5.2 : 4.5;
      if (m.kind === 'golden') color = COLORS.golden;
      else if (m.kind === 'dead') color = COLORS.dead;
      else if (m.kind === 'turn_up' || m.kind === 'turn_down') {
        color = COLORS.turn;
        r = detail ? 4.4 : 3.8;
      }
      markerDots.push({ x: xAt(idx), y: yL(p.aptIdx), color, r });
    }

    return { minL, maxL, minR, maxR, paths, markerDots, ratePath: rateParts.join(' '), rateDots };
  }, [points, markers, showMa, innerW, innerH, detail]);

  const tickCount = detail ? 5 : 3;
  const leftTicks = yTicks(minL, maxL, tickCount);
  const rightTicks = yTicks(minR, maxR, tickCount);
  const maxLabels = detail ? Math.min(12, months.length) : Math.min(5, months.length);
  const xLabelIdx = pickLabelIndices(months.length, maxLabels);
  const dotR = detail ? 2.8 : 0; // hide dense dots when not zoomed for macro

  const hitIndex = (locX: number): number | null => {
    if (months.length === 0) return null;
    const n = Math.max(1, months.length - 1);
    const t = (locX - padL) / innerW;
    const idx = Math.round(Math.max(0, Math.min(1, t)) * n);
    return Math.max(0, Math.min(months.length - 1, idx));
  };

  return (
    <View>
      <Pressable
        onPress={(e) => {
          onSelectIdx(hitIndex(e.nativeEvent.locationX));
        }}
      >
        <Svg width={safeW} height={height}>
          {leftTicks.map((v, i) => {
            const y = padT + (i / Math.max(1, tickCount - 1)) * innerH;
            return (
              <React.Fragment key={`yl-${i}`}>
                <Line
                  x1={padL}
                  y1={y}
                  x2={safeW - padR}
                  y2={y}
                  stroke="#e4e9ef"
                  strokeWidth={1}
                />
                <SvgText x={padL - 6} y={y + 3} fontSize={detail ? 10 : 9} fill="#6b7580" textAnchor="end">
                  {Math.round(v)}
                </SvgText>
                <SvgText
                  x={safeW - padR + 6}
                  y={y + 3}
                  fontSize={detail ? 10 : 9}
                  fill="#b45309"
                  textAnchor="start"
                >
                  {rightTicks[i].toFixed(2)}
                </SvgText>
              </React.Fragment>
            );
          })}

          {selectedIdx != null ? (
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
                  strokeWidth={p.width}
                  fill="none"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeDasharray={p.dash}
                  opacity={0.92}
                />
              ) : null}
              {detail
                ? p.dots.map((d) => (
                    <Circle
                      key={`${p.id}-${d.i}`}
                      cx={d.x}
                      cy={d.y}
                      r={selectedIdx === d.i ? dotR + 1.4 : dotR}
                      fill={p.color}
                      opacity={selectedIdx == null || selectedIdx === d.i ? 1 : 0.35}
                    />
                  ))
                : null}
            </React.Fragment>
          ))}

          {ratePath ? (
            <Path
              d={ratePath}
              stroke={COLORS.rate}
              strokeWidth={detail ? 2.5 : 2.2}
              fill="none"
              strokeLinejoin="round"
              strokeLinecap="round"
              opacity={0.9}
            />
          ) : null}
          {detail
            ? rateDots.map((d) => (
                <Circle
                  key={`rate-${d.i}`}
                  cx={d.x}
                  cy={d.y}
                  r={selectedIdx === d.i ? 3.6 : 2.6}
                  fill={COLORS.rate}
                  opacity={selectedIdx == null || selectedIdx === d.i ? 1 : 0.35}
                />
              ))
            : null}

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
                {detail ? fullMonth(months[idx]).slice(2) : shortMonth(months[idx])}
              </SvgText>
            );
          })}

          <Rect x={padL} y={padT} width={innerW} height={innerH} fill="transparent" />
        </Svg>
      </Pressable>

      {selectedIdx != null && points[selectedIdx] ? (
        <View style={styles.tooltip}>
          <Text style={styles.tooltipMonth}>{fullMonth(points[selectedIdx].month)}</Text>
          <Text style={styles.tooltipLine}>
            매매 {Math.round(points[selectedIdx].aptIdx)} · KOSPI{' '}
            {Math.round(points[selectedIdx].kospiIdx)} · 금리 {points[selectedIdx].rate.toFixed(2)}%
          </Text>
          {showMa ? (
            <Text style={styles.tooltipLine}>
              MA3{' '}
              {points[selectedIdx].aptMa3 == null
                ? '—'
                : Math.round(points[selectedIdx].aptMa3)}{' '}
              · MA12{' '}
              {points[selectedIdx].aptMa12 == null
                ? '—'
                : Math.round(points[selectedIdx].aptMa12)}
            </Text>
          ) : null}
        </View>
      ) : (
        <Text style={styles.tapHint}>차트를 탭하면 해당 월 수치가 표시됩니다</Text>
      )}
    </View>
  );
}

export function MacroOverlayChart({
  points,
  markers = [],
  height = 300,
  showMa = true,
}: Props) {
  const { width: screenW, height: screenH } = useWindowDimensions();
  const { width, onLayout } = useSafeChartWidth();
  const [expanded, setExpanded] = useState(false);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

  const vp = useChartViewport(points.length);
  const windowPoints = points.slice(vp.start, vp.end);
  const windowMonths = new Set(windowPoints.map((p) => normMonth(p.month)));
  const windowMarkers = markers.filter((m) => windowMonths.has(normMonth(m.month)));
  const zoomed = vp.zoomStep > 0;

  if (points.length === 0) {
    return (
      <ChartErrorBoundary>
        <View style={[styles.wrap, { minHeight: height }]} onLayout={onLayout}>
          <Text style={styles.empty}>표시할 시계열이 없습니다.</Text>
        </View>
      </ChartErrorBoundary>
    );
  }

  const expandW = Math.max(280, Math.min(screenW > 0 ? screenW - 24 : 920, 920));
  const expandH = Math.min(Math.max(400, screenH > 0 ? screenH * 0.55 : 420), 540);

  const clearSelect = () => setSelectedIdx(null);

  return (
    <ChartErrorBoundary>
    <View style={styles.wrap} onLayout={onLayout}>
      <ChartZoomBar
        windowLabel={vp.windowLabel}
        canZoomIn={vp.canZoomIn}
        canZoomOut={vp.canZoomOut}
        canPanLeft={vp.canPanLeft}
        canPanRight={vp.canPanRight}
        onZoomIn={() => {
          clearSelect();
          vp.zoomIn();
        }}
        onZoomOut={() => {
          clearSelect();
          vp.zoomOut();
        }}
        onPanLeft={() => {
          clearSelect();
          vp.panLeft();
        }}
        onPanRight={() => {
          clearSelect();
          vp.panRight();
        }}
        onReset={() => {
          clearSelect();
          vp.reset();
        }}
        onExpand={() => setExpanded(true)}
      />
      <MacroChartBody
        points={windowPoints}
        markers={windowMarkers}
        height={height}
        width={width}
        showMa={showMa}
        zoomed={zoomed}
        selectedIdx={selectedIdx}
        onSelectIdx={setSelectedIdx}
      />
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
      <Text style={styles.axisHint}>좌: 지수(시작=100) · 우: 기준금리(%) · +로 확대 시 Y축 재스케일</Text>

      <Modal visible={expanded} animationType="fade" transparent onRequestClose={() => setExpanded(false)}>
        <View style={styles.modalBackdrop}>
          <View style={[styles.modalCard, { width: expandW }]}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>서울 시장 시계열 확대</Text>
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
                clearSelect();
                vp.zoomIn();
              }}
              onZoomOut={() => {
                clearSelect();
                vp.zoomOut();
              }}
              onPanLeft={() => {
                clearSelect();
                vp.panLeft();
              }}
              onPanRight={() => {
                clearSelect();
                vp.panRight();
              }}
              onReset={() => {
                clearSelect();
                vp.reset();
              }}
              expanded
              onExpand={() => setExpanded(false)}
            />
            <MacroChartBody
              points={windowPoints}
              markers={windowMarkers}
              height={expandH}
              width={expandW - 16}
              showMa={showMa}
              zoomed
              selectedIdx={selectedIdx}
              onSelectIdx={setSelectedIdx}
            />
            <Text style={styles.modalHint}>
              구간을 좁히면 좌·우 축이 보이는 데이터에 맞춰 재스케일되고, 월별 점·라벨이 더 자세히
              표시됩니다.
            </Text>
          </View>
        </View>
      </Modal>
    </View>
    </ChartErrorBoundary>
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
    width: '100%',
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
  tooltip: {
    marginHorizontal: 12,
    marginBottom: 6,
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#f7f8fa',
    borderWidth: 1,
    borderColor: '#e4e9ef',
    gap: 3,
  },
  tooltipMonth: {
    fontSize: 12,
    fontWeight: '800',
    color: '#1a2332',
  },
  tooltipLine: {
    fontSize: 12,
    color: '#5c6570',
    lineHeight: 18,
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
