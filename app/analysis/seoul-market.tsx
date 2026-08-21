import { Link } from 'expo-router';
import React, { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { MacroOverlayChart, type MacroMarker } from '../../src/components/MacroOverlayChart';
import { seoulMarketMacro as M } from '../../src/data/seoulMarketMacro';

function pctCorr(v: number | null | undefined): string {
  if (v == null || Number.isNaN(v)) return '—';
  return v.toFixed(2);
}

function monthsLabel(v: number | null | undefined): string {
  if (v == null || Number.isNaN(v)) return '—';
  return `${v}개월`;
}

function rateChgLabel(v: number): string {
  if (v === 0) return '동결';
  return v > 0 ? `+${v.toFixed(2)}%p` : `${v.toFixed(2)}%p`;
}

export default function SeoulMarketMacroScreen() {
  const [showMa, setShowMa] = useState(true);
  const [showSurges, setShowSurges] = useState(true);
  const [showRegime, setShowRegime] = useState(true);

  const markers: MacroMarker[] = useMemo(() => {
    const out: MacroMarker[] = [];
    if (showSurges) {
      for (const s of M.surges) {
        out.push({ month: s.month, kind: 'surge', label: `급등 +${s.cum3mPct}%` });
      }
    }
    if (showRegime) {
      for (const e of M.regimeEvents) {
        if (e.type === 'golden_cross') out.push({ month: e.month, kind: 'golden' });
        else if (e.type === 'dead_cross') out.push({ month: e.month, kind: 'dead' });
        else if (e.type === 'ma12_turn_up') out.push({ month: e.month, kind: 'turn_up' });
        else if (e.type === 'ma12_turn_down') out.push({ month: e.month, kind: 'turn_down' });
      }
    }
    return out;
  }, [showSurges, showRegime]);

  const chartPoints = M.series.map((p) => ({
    month: p.month,
    aptIdx: p.aptIdx,
    aptMa3: p.aptMa3,
    aptMa12: p.aptMa12,
    kospiIdx: p.kospiIdx,
    rate: p.rate,
  }));

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Link href="/analysis" asChild>
        <Pressable style={styles.backLink}>
          <Text style={styles.backLinkText}>← 주요 광역시 분석 리포트</Text>
        </Pressable>
      </Link>

      <Text style={styles.kicker}>부동산 주식 이율 연계분석</Text>
      <Text style={styles.title}>대장 매매 · KOSPI · 기준금리</Text>
      <Text style={styles.body}>
        {M.period} · 서울 유동성 TOP5({M.complexes.join('·')}) 매매지수와 KOSPI·한국은행 기준금리를
        한 차트에서 비교합니다.
      </Text>
      <Text style={styles.source}>
        {M.source.apt} · {M.source.kospi} · {M.source.rate} · 기준 {M.asOf}
      </Text>

      <View style={styles.verdict}>
        <Text style={styles.verdictEyebrow}>한줄 결론</Text>
        <Text style={styles.verdictTitle}>{M.headline}</Text>
      </View>

      <View style={styles.metrics}>
        <View style={styles.metric}>
          <Text style={styles.metricLabel}>금리Δ↔매매 MoM</Text>
          <Text style={styles.metricValue}>{pctCorr(M.metrics.rateChgCorr)}</Text>
          <Text style={styles.metricHint}>시차 {monthsLabel(M.metrics.rateChgBestLagMonths)}</Text>
        </View>
        <View style={styles.metric}>
          <Text style={styles.metricLabel}>KOSPI↔매매 MoM</Text>
          <Text style={styles.metricValue}>{pctCorr(M.metrics.kospiMomCorr)}</Text>
          <Text style={styles.metricHint}>시차 {monthsLabel(M.metrics.kospiMomBestLagMonths)}</Text>
        </View>
        <View style={styles.metric}>
          <Text style={styles.metricLabel}>급등 시작</Text>
          <Text style={styles.metricValue}>{M.metrics.surgeCount}회</Text>
          <Text style={styles.metricHint}>3개월 누적 +5%↑</Text>
        </View>
        <View style={styles.metric}>
          <Text style={styles.metricLabel}>MA 전환</Text>
          <Text style={styles.metricValue}>{M.metrics.regimeEventCount}회</Text>
          <Text style={styles.metricHint}>크로스·기울기</Text>
        </View>
      </View>

      <Text style={styles.section}>통합 시계열</Text>
      <View style={styles.chipRow}>
        <Pressable
          onPress={() => setShowMa((v) => !v)}
          style={[styles.chip, showMa && styles.chipOn]}
        >
          <Text style={[styles.chipText, showMa && styles.chipTextOn]}>이동평균</Text>
        </Pressable>
        <Pressable
          onPress={() => setShowSurges((v) => !v)}
          style={[styles.chip, showSurges && styles.chipOn]}
        >
          <Text style={[styles.chipText, showSurges && styles.chipTextOn]}>급등 마커</Text>
        </Pressable>
        <Pressable
          onPress={() => setShowRegime((v) => !v)}
          style={[styles.chip, showRegime && styles.chipOn]}
        >
          <Text style={[styles.chipText, showRegime && styles.chipTextOn]}>MA 전환</Text>
        </Pressable>
      </View>
      <Text style={styles.hint}>{M.method.chart}</Text>

      <MacroOverlayChart points={chartPoints} markers={markers} showMa={showMa} height={300} />

      <Text style={styles.section}>관계 해석</Text>
      {M.findings.map((f) => (
        <Text key={f} style={styles.bullet}>
          · {f}
        </Text>
      ))}

      <Text style={styles.section}>매매 급등 시점</Text>
      <Text style={styles.hint}>{M.method.surge}</Text>
      {M.surges.map((s) => (
        <View key={`${s.month}-${s.peakMonth}`} style={styles.eventCard}>
          <Text style={styles.eventTitle}>
            {s.month} 시작 · 3개월 +{s.cum3mPct}% (정점 {s.peakMonth})
          </Text>
          <Text style={styles.eventLine}>
            직전 6개월 · KOSPI {s.kospiChg6m > 0 ? '+' : ''}
            {s.kospiChg6m}% · 금리 {rateChgLabel(s.rateChg6m)} (수준 {s.rate}%)
          </Text>
        </View>
      ))}

      <Text style={styles.section}>이동평균 전환점</Text>
      <Text style={styles.hint}>{M.method.ma}</Text>
      {M.regimeEvents.map((e) => (
        <View key={`${e.month}-${e.type}`} style={styles.eventCard}>
          <Text style={styles.eventTitle}>
            {e.month} · {e.label}
          </Text>
          <Text style={styles.eventLine}>
            금리 {e.rate}% · KOSPI지수 {Math.round(e.kospiIdx)}
            {e.aptMa12 != null ? ` · MA12 ${Math.round(e.aptMa12)}` : ''}
          </Text>
        </View>
      ))}

      <Text style={styles.section}>상관·시차 요약</Text>
      <Text style={styles.line}>
        동월 · KOSPI MoM corr {pctCorr(M.metrics.sameMonthKospiMomCorr)} · 금리Δ corr{' '}
        {pctCorr(M.metrics.sameMonthRateChgCorr)}
      </Text>
      <Text style={styles.line}>
        수준 · KOSPI↔매매 corr {pctCorr(M.metrics.kospiLevelCorr)} (시차{' '}
        {monthsLabel(M.metrics.kospiLevelBestLagMonths)}) · 금리↔매매 corr{' '}
        {pctCorr(M.metrics.rateLevelCorr)} (시차 {monthsLabel(M.metrics.rateLevelBestLagMonths)})
      </Text>
      <Text style={styles.disclaimer}>
        교차상관은 선형 동조성 지표이며, 정책·규제·수급 충격을 인과로 단정하지 않습니다.
      </Text>

      <Link href="/analysis/compare" asChild>
        <Pressable style={styles.linkCard}>
          <Text style={styles.linkTitle}>서울 지방도시간 매매가 시차 분석</Text>
          <Text style={styles.linkSub}>서울 vs 부산·대구·인천·대전·울산·세종</Text>
        </Pressable>
      </Link>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 56,
    gap: 8,
  },
  backLink: {
    alignSelf: 'flex-start',
    paddingVertical: 4,
  },
  backLinkText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#1f4d3a',
  },
  kicker: {
    fontSize: 12,
    fontWeight: '700',
    color: '#8a929c',
    letterSpacing: 0.4,
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: '#1a2332',
  },
  body: {
    fontSize: 14,
    lineHeight: 21,
    color: '#5c6570',
  },
  source: {
    fontSize: 12,
    color: '#8a929c',
    marginBottom: 4,
  },
  verdict: {
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e4e9ef',
    padding: 14,
    gap: 6,
    marginVertical: 4,
  },
  verdictEyebrow: {
    fontSize: 11,
    fontWeight: '700',
    color: '#8a929c',
  },
  verdictTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#1a2332',
    lineHeight: 21,
  },
  metrics: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 4,
  },
  metric: {
    width: '47%',
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e4e9ef',
    padding: 12,
  },
  metricLabel: {
    fontSize: 11,
    color: '#8a929c',
  },
  metricValue: {
    marginTop: 2,
    fontSize: 20,
    fontWeight: '800',
    color: '#1f4d3a',
  },
  metricHint: {
    marginTop: 2,
    fontSize: 11,
    color: '#8a929c',
  },
  section: {
    marginTop: 16,
    fontSize: 16,
    fontWeight: '700',
    color: '#1a2332',
  },
  hint: {
    fontSize: 12,
    color: '#8a929c',
    marginBottom: 6,
    lineHeight: 18,
  },
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 4,
  },
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: '#e8ecef',
  },
  chipOn: {
    backgroundColor: '#1a2332',
  },
  chipText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#1a2332',
  },
  chipTextOn: {
    color: '#fff',
  },
  bullet: {
    fontSize: 13,
    lineHeight: 20,
    color: '#5c6570',
  },
  eventCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e4e9ef',
    padding: 12,
    gap: 4,
    marginBottom: 6,
  },
  eventTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#1a2332',
  },
  eventLine: {
    fontSize: 12,
    lineHeight: 18,
    color: '#5c6570',
  },
  line: {
    fontSize: 13,
    lineHeight: 20,
    color: '#5c6570',
  },
  disclaimer: {
    marginTop: 8,
    fontSize: 11,
    lineHeight: 16,
    color: '#8a929c',
  },
  linkCard: {
    marginTop: 16,
    backgroundColor: '#1f4d3a',
    borderRadius: 12,
    padding: 16,
    gap: 4,
  },
  linkTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#fff',
  },
  linkSub: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.8)',
  },
});
