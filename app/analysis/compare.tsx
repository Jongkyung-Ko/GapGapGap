import { Link } from 'expo-router';
import React, { useMemo, useState } from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import { OverlaySaleChart, type SaleOverlaySeries } from '../../src/components/OverlaySaleChart';
import { seoulDaejeonLagAnalysis as A } from '../../src/data/seoulDaejeonLag';

type ChartMode = 'index' | 'price';
type Preset = 'liquid' | 'priceRank' | 'custom';

const BASKET_SEOUL_ID = 'basket:seoul';
const BASKET_DJ_ID = 'basket:daejeon';

function toIndex(points: { month: string; value: number | null }[]): { month: string; value: number | null }[] {
  const first = points.find((p) => p.value != null && p.value > 0)?.value;
  if (first == null) return points.map((p) => ({ ...p, value: null }));
  return points.map((p) => ({
    month: p.month,
    value: p.value == null ? null : (p.value / first) * 100,
  }));
}

export default function AnalysisScreen() {
  const { width } = useWindowDimensions();
  const chartW = Math.min(width - 40, 560);

  const [mode, setMode] = useState<ChartMode>('index');
  const [preset, setPreset] = useState<Preset>('liquid');
  const [selected, setSelected] = useState<Set<string>>(() => {
    const liquid = A.complexes.filter((c) => c.tags.includes('liquid')).map((c) => c.id);
    return new Set([BASKET_SEOUL_ID, BASKET_DJ_ID, ...liquid.slice(0, 0)]);
  });

  const applyPreset = (p: Preset) => {
    setPreset(p);
    if (p === 'liquid') {
      setSelected(new Set([BASKET_SEOUL_ID, BASKET_DJ_ID]));
      setMode('index');
    } else if (p === 'priceRank') {
      const ids = A.complexes.filter((c) => c.tags.includes('price')).map((c) => c.id);
      setSelected(new Set(ids));
      setMode('price');
    }
  };

  const setChartMode = (next: ChartMode) => {
    setMode(next);
    if (next === 'price') {
      setSelected((prev) => {
        const onlyBaskets =
          [...prev].every((id) => id === BASKET_SEOUL_ID || id === BASKET_DJ_ID) && prev.size > 0;
        if (!onlyBaskets) return prev;
        const liquidIds = A.complexes.filter((c) => c.tags.includes('liquid')).map((c) => c.id);
        return new Set(liquidIds);
      });
      setPreset('custom');
    }
  };

  const toggle = (id: string) => {
    setPreset('custom');
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const chartSeries: SaleOverlaySeries[] = useMemo(() => {
    const out: SaleOverlaySeries[] = [];

    if (selected.has(BASKET_SEOUL_ID) || selected.has(BASKET_DJ_ID)) {
      const seoulPts = A.basketIndex.map((p) => ({
        month: /^\d{6}$/.test(p.month) ? `${p.month.slice(0, 4)}-${p.month.slice(4)}` : p.month,
        value: p.seoul as number | null,
      }));
      const djPts = A.basketIndex.map((p) => ({
        month: /^\d{6}$/.test(p.month) ? `${p.month.slice(0, 4)}-${p.month.slice(4)}` : p.month,
        value: p.daejeon as number | null,
      }));

      if (selected.has(BASKET_SEOUL_ID)) {
        out.push({
          id: BASKET_SEOUL_ID,
          label: '서울 유동성TOP5 지수',
          color: '#1f4d3a',
          points: mode === 'index' ? seoulPts : seoulPts, // basket is already index
        });
      }
      if (selected.has(BASKET_DJ_ID)) {
        out.push({
          id: BASKET_DJ_ID,
          label: '대전 유동성TOP5 지수',
          color: '#c45c26',
          points: mode === 'index' ? djPts : djPts,
        });
      }
    }

    for (const c of A.complexes) {
      if (!selected.has(c.id)) continue;
      const raw = c.monthly.map((m) => ({
        month: m.month,
        value: mode === 'price' ? m.median / 10000 : null, // 억
      }));
      if (mode === 'index') {
        const idx = toIndex(
          c.monthly.map((m) => ({ month: m.month, value: m.median })),
        );
        out.push({
          id: c.id,
          label: `${c.group === 'seoul' ? '서' : '대'}·${c.aptName}`.slice(0, 16),
          color: c.color,
          points: idx,
        });
      } else {
        out.push({
          id: c.id,
          label: `${c.group === 'seoul' ? '서' : '대'}·${c.aptName}`.slice(0, 16),
          color: c.color,
          points: raw.map((p) => ({ month: p.month, value: p.value })),
        });
      }
    }

    // If baskets selected in price mode, hide baskets (they are index-only) — already same points
    if (mode === 'price') {
      return out.filter((s) => s.id !== BASKET_SEOUL_ID && s.id !== BASKET_DJ_ID);
    }
    return out;
  }, [selected, mode]);

  const formatValue =
    mode === 'price' ? (v: number) => `${v.toFixed(v >= 10 ? 0 : 1)}` : (v: number) => `${Math.round(v)}`;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Link href="/analysis" asChild>
        <Pressable style={styles.backLink}>
          <Text style={styles.backLinkText}>← 결과 리포트</Text>
        </Pressable>
      </Link>
      <Text style={styles.title}>매매가 시계열 비교</Text>
      <Text style={styles.body}>
        전용 84㎡ 실거래({A.period})로 강남·송파 대장과 대전 대장을 비교합니다.
      </Text>
      <Text style={styles.source}>
        {A.source} · 기준 {A.asOf}
      </Text>

      <View style={styles.verdict}>
        <Text style={styles.verdictTitle}>{A.verdict.headline}</Text>
        {A.verdict.points.map((p) => (
          <Text key={p} style={styles.bullet}>
            · {p}
          </Text>
        ))}
      </View>

      <View style={styles.metrics}>
        <View style={styles.metric}>
          <Text style={styles.metricLabel}>급등 시차</Text>
          <Text style={styles.metricValue}>{A.lag.surgeLagMedianMonths}개월</Text>
        </View>
        <View style={styles.metric}>
          <Text style={styles.metricLabel}>롤링 시차</Text>
          <Text style={styles.metricValue}>{A.lag.rollingLagMedianMonths}개월</Text>
        </View>
        <View style={styles.metric}>
          <Text style={styles.metricLabel}>가격TOP5</Text>
          <Text style={styles.metricValue}>{A.lag.priceRankBestLagMonths}개월</Text>
        </View>
        <View style={styles.metric}>
          <Text style={styles.metricLabel}>유동성 바스켓</Text>
          <Text style={styles.metricValue}>{A.lag.liquidBestLagMonths}개월</Text>
        </View>
      </View>

      <Text style={styles.section}>매매가 시계열 비교</Text>
      <View style={styles.chipRow}>
        {(
          [
            ['liquid', '유동성 바스켓'],
            ['priceRank', '가격 TOP5'],
            ['custom', '직접 선택'],
          ] as const
        ).map(([id, label]) => (
          <Pressable
            key={id}
            onPress={() => applyPreset(id)}
            style={[styles.chip, preset === id && styles.chipOn]}
          >
            <Text style={[styles.chipText, preset === id && styles.chipTextOn]}>{label}</Text>
          </Pressable>
        ))}
      </View>
      <View style={styles.chipRow}>
        {(
          [
            ['index', '지수 (시작=100)'],
            ['price', '매매가 (억)'],
          ] as const
        ).map(([id, label]) => (
          <Pressable
            key={id}
            onPress={() => setChartMode(id)}
            style={[styles.chip, mode === id && styles.chipOn]}
          >
            <Text style={[styles.chipText, mode === id && styles.chipTextOn]}>{label}</Text>
          </Pressable>
        ))}
      </View>
      <Text style={styles.hint}>
        {mode === 'index'
          ? '시작 시점을 100으로 맞춰 상승 흐름·시차를 비교합니다.'
          : '절대 매매가(억). 서울·대전 가격 차이가 커서 스케일이 벌어질 수 있습니다.'}
      </Text>

      <OverlaySaleChart
        series={chartSeries}
        formatValue={formatValue}
        height={280}
      />

      <Text style={styles.subSection}>바스켓</Text>
      <View style={styles.chipRow}>
        {(
          [
            [BASKET_SEOUL_ID, '서울 유동성TOP5', '#1f4d3a'],
            [BASKET_DJ_ID, '대전 유동성TOP5', '#c45c26'],
          ] as const
        ).map(([id, label, color]) => {
          const on = selected.has(id);
          return (
            <Pressable
              key={id}
              onPress={() => toggle(id)}
              style={[styles.seriesChip, on && { borderColor: color, backgroundColor: '#fff' }]}
            >
              <View style={[styles.dot, { backgroundColor: color, opacity: on ? 1 : 0.35 }]} />
              <Text style={[styles.seriesChipText, !on && styles.dim]}>{label}</Text>
            </Pressable>
          );
        })}
      </View>

      <Text style={styles.subSection}>단지 (84㎡ 중위 매매가)</Text>
      <View style={styles.chipRow}>
        {A.complexes.map((c) => {
          const on = selected.has(c.id);
          return (
            <Pressable
              key={c.id}
              onPress={() => toggle(c.id)}
              style={[styles.seriesChip, on && { borderColor: c.color, backgroundColor: '#fff' }]}
            >
              <View style={[styles.dot, { backgroundColor: c.color, opacity: on ? 1 : 0.35 }]} />
              <Text style={[styles.seriesChipText, !on && styles.dim]}>
                {c.group === 'seoul' ? '서' : '대'} {c.aptName}
              </Text>
            </Pressable>
          );
        })}
      </View>

      <Text style={styles.section}>구간 상승률 (유동성 바스켓)</Text>
      <Text style={styles.line}>
        2016~21 · 서울 {A.returns.seoul_2016_2021}% / 대전 {A.returns.daejeon_2016_2021}%
      </Text>
      <Text style={styles.line}>
        2022~23 · 서울 {A.returns.seoul_2022_2023}% / 대전 {A.returns.daejeon_2022_2023}%
      </Text>
      <Text style={styles.line}>
        2024~26 · 서울 {A.returns.seoul_2024_2026}% / 대전 {A.returns.daejeon_2024_2026}%
      </Text>

      <Text style={styles.section}>급등 시작 매칭</Text>
      {A.lag.surgeMatches.map((m) => (
        <Text key={`${m.seoul}-${m.daejeon}`} style={styles.line}>
          서울 {m.seoul} → 대전 {m.daejeon} · +{m.lag_months}개월
        </Text>
      ))}

      <Text style={styles.section}>가격 TOP5</Text>
      {A.priceRank.seoul.map((r, i) => (
        <Text key={`ps-${r.apt}`} style={styles.rankLine}>
          서{i + 1}. [{r.region}] {r.apt} · {r.median_억}억
        </Text>
      ))}
      {A.priceRank.daejeon.map((r, i) => (
        <Text key={`pd-${r.apt}`} style={styles.rankLine}>
          대{i + 1}. [{r.region}] {r.apt} · {r.median_억}억
        </Text>
      ))}

      <Text style={styles.section}>상세 차트 이미지</Text>
      {(
        [
          ['05_liquid_top5_levels.png', '유동성 TOP5 매매가'],
          ['01_price_rank_top5_levels.png', '가격 TOP5 매매가'],
          ['02_liquid_basket_index.png', '바스켓 지수'],
          ['03_cross_corr_lag.png', '교차상관 시차'],
          ['04_rolling_lag.png', '롤링 시차'],
        ] as const
      ).map(([file, label]) => (
        <View key={file} style={styles.fig}>
          <Text style={styles.figLabel}>{label}</Text>
          <Image
            source={{ uri: `/analysis/${file}` }}
            style={{ width: chartW, height: chartW * 0.7 }}
            resizeMode="contain"
          />
        </View>
      ))}
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
  verdictTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#1a2332',
    lineHeight: 21,
  },
  bullet: {
    fontSize: 12,
    lineHeight: 18,
    color: '#5c6570',
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
    color: '#c45c26',
  },
  section: {
    marginTop: 16,
    fontSize: 16,
    fontWeight: '700',
    color: '#1a2332',
  },
  subSection: {
    marginTop: 10,
    fontSize: 13,
    fontWeight: '700',
    color: '#5c6570',
  },
  hint: {
    fontSize: 12,
    color: '#8a929c',
    marginBottom: 6,
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
  seriesChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#d5dde5',
    backgroundColor: '#f4f1ea',
  },
  seriesChipText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1a2332',
    maxWidth: 160,
  },
  dim: {
    color: '#8a929c',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  line: {
    fontSize: 13,
    lineHeight: 20,
    color: '#5c6570',
  },
  rankLine: {
    fontSize: 13,
    lineHeight: 20,
    color: '#1a2332',
  },
  fig: {
    marginTop: 8,
    gap: 4,
  },
  figLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#5c6570',
  },
});
