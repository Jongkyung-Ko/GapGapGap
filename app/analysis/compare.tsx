import { Link } from 'expo-router';
import React, { useMemo, useState } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { OverlaySaleChart, type SaleOverlaySeries } from '../../src/components/OverlaySaleChart';
import {
  METRO_CITY_ORDER,
  metroLagCompare as M,
} from '../../src/data/metroLagCompare';

type ChartMode = 'index' | 'price';
type Preset = 'basket' | 'complexes' | 'custom';

const BASKET_SEOUL_ID = 'basket:seoul';
const BASKET_METRO_ID = 'basket:metro';

function toIndex(points: { month: string; value: number | null }[]): { month: string; value: number | null }[] {
  const first = points.find((p) => p.value != null && p.value > 0)?.value;
  if (first == null) return points.map((p) => ({ ...p, value: null }));
  return points.map((p) => ({
    month: p.month,
    value: p.value == null ? null : (p.value / first) * 100,
  }));
}

function pct(v: number | null | undefined): string {
  if (v == null || Number.isNaN(v)) return '—';
  const sign = v > 0 ? '+' : '';
  return `${sign}${Math.round(v)}%`;
}

function monthsLabel(v: number | null | undefined): string {
  if (v == null || Number.isNaN(v)) return '—';
  return `${Math.round(v)}개월`;
}

export default function MetroCompareScreen() {
  const [cityKey, setCityKey] = useState(METRO_CITY_ORDER[0] ?? '대전');
  const city = M.cities[cityKey];

  const [mode, setMode] = useState<ChartMode>('index');
  const [preset, setPreset] = useState<Preset>('basket');
  const [selected, setSelected] = useState<Set<string>>(
    () => new Set([BASKET_SEOUL_ID, BASKET_METRO_ID]),
  );

  const applyCity = (next: string) => {
    setCityKey(next);
    setPreset('basket');
    setMode('index');
    setSelected(new Set([BASKET_SEOUL_ID, BASKET_METRO_ID]));
  };

  const applyPreset = (p: Preset) => {
    setPreset(p);
    if (p === 'basket') {
      setSelected(new Set([BASKET_SEOUL_ID, BASKET_METRO_ID]));
      setMode('index');
    } else if (p === 'complexes') {
      const ids = [
        ...M.seoul.complexes.map((c) => c.id),
        ...city.complexes.map((c) => c.id),
      ];
      setSelected(new Set(ids));
      setMode('index');
    }
  };

  const setChartMode = (next: ChartMode) => {
    setMode(next);
    if (next === 'price') {
      setSelected((prev) => {
        const onlyBaskets =
          [...prev].every((id) => id === BASKET_SEOUL_ID || id === BASKET_METRO_ID) &&
          prev.size > 0;
        if (!onlyBaskets) return prev;
        return new Set([
          ...M.seoul.complexes.map((c) => c.id),
          ...city.complexes.map((c) => c.id),
        ]);
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

    if (mode === 'index') {
      if (selected.has(BASKET_SEOUL_ID)) {
        out.push({
          id: BASKET_SEOUL_ID,
          label: '서울 유동성TOP5',
          color: M.seoul.color,
          points: M.seoul.basketIndex.map((p) => ({ month: p.month, value: p.value })),
        });
      }
      if (selected.has(BASKET_METRO_ID)) {
        out.push({
          id: BASKET_METRO_ID,
          label: `${cityKey} 유동성TOP5`,
          color: city.color,
          points: city.basketIndex.map((p) => ({ month: p.month, value: p.value })),
        });
      }
    }

    const pushComplex = (
      c: (typeof M.seoul.complexes)[number],
      prefix: string,
      color: string,
    ) => {
      if (!selected.has(c.id)) return;
      if (mode === 'index') {
        out.push({
          id: c.id,
          label: `${prefix}·${c.aptName}`.slice(0, 16),
          color,
          points: toIndex(c.monthly.map((m) => ({ month: m.month, value: m.median }))),
        });
      } else {
        out.push({
          id: c.id,
          label: `${prefix}·${c.aptName}`.slice(0, 16),
          color,
          points: c.monthly.map((m) => ({ month: m.month, value: m.median / 10000 })),
        });
      }
    };

    for (const c of M.seoul.complexes) {
      pushComplex(c, '서', M.seoul.color);
    }
    for (const c of city.complexes) {
      pushComplex(c, cityKey.slice(0, 1), c.color ?? city.color);
    }

    return out;
  }, [selected, mode, city, cityKey]);

  const formatValue =
    mode === 'price'
      ? (v: number) => `${v.toFixed(v >= 10 ? 0 : 1)}`
      : (v: number) => `${Math.round(v)}`;

  const surge = city.lag.surgeLagMedianMonths;
  const momLag = city.lag.momBestLagMonths;
  const momCorr = city.lag.momCorr;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Link href="/analysis" asChild>
        <Pressable style={styles.backLink}>
          <Text style={styles.backLinkText}>← 결과 리포트</Text>
        </Pressable>
      </Link>
      <Text style={styles.title}>매매가 시계열 비교</Text>
      <Text style={styles.body}>
        전용 84㎡ 실거래({M.period}) · 서울(강남·송파) 유동성 TOP5 vs 전국 주요 광역 포커스구 유동성 TOP5
      </Text>
      <Text style={styles.source}>
        {M.source} · 기준 {M.asOf}
      </Text>

      <View style={styles.verdict}>
        <Text style={styles.verdictEyebrow}>전국 한줄 결론</Text>
        <Text style={styles.verdictTitle}>{M.overview.headline}</Text>
        <Text style={styles.method}>{M.overview.method}</Text>
      </View>

      <Text style={styles.section}>광역도시</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.tabRow}
      >
        {METRO_CITY_ORDER.map((name) => {
          const on = name === cityKey;
          const c = M.cities[name];
          return (
            <Pressable
              key={name}
              onPress={() => applyCity(name)}
              style={[styles.tab, on && { backgroundColor: c.color, borderColor: c.color }]}
            >
              <Text style={[styles.tabText, on && styles.tabTextOn]}>{name}</Text>
            </Pressable>
          );
        })}
      </ScrollView>

      <View style={[styles.cityVerdict, { borderLeftColor: city.color }]}>
        <Text style={styles.cityVerdictEyebrow}>
          서울 vs {cityKey} · {city.focusDistricts.join('·')}
        </Text>
        <Text style={styles.cityVerdictTitle}>{city.headline}</Text>
      </View>

      <View style={styles.metrics}>
        <View style={styles.metric}>
          <Text style={styles.metricLabel}>급등 시차</Text>
          <Text style={[styles.metricValue, { color: city.color }]}>{monthsLabel(surge)}</Text>
        </View>
        <View style={styles.metric}>
          <Text style={styles.metricLabel}>MoM 최적시차</Text>
          <Text style={[styles.metricValue, { color: city.color }]}>{monthsLabel(momLag)}</Text>
        </View>
        <View style={styles.metric}>
          <Text style={styles.metricLabel}>MoM 상관</Text>
          <Text style={[styles.metricValue, { color: city.color }]}>
            {momCorr == null ? '—' : momCorr.toFixed(2)}
          </Text>
        </View>
        <View style={styles.metric}>
          <Text style={styles.metricLabel}>2024~26</Text>
          <Text style={[styles.metricValue, { color: city.color }]}>
            {pct(city.returns.metro_2024_2026)}
          </Text>
        </View>
      </View>

      <Text style={styles.section}>시계열 오버레이</Text>
      <View style={styles.chipRow}>
        {(
          [
            ['basket', '바스켓 비교'],
            ['complexes', '단지 전체'],
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
          : '절대 매매가(억). 서울과 광역 가격 차이가 커서 스케일이 벌어질 수 있습니다.'}
      </Text>

      <OverlaySaleChart series={chartSeries} formatValue={formatValue} height={280} />

      {mode === 'index' ? (
        <>
          <Text style={styles.subSection}>바스켓</Text>
          <View style={styles.chipRow}>
            {(
              [
                [BASKET_SEOUL_ID, '서울 유동성TOP5', M.seoul.color],
                [BASKET_METRO_ID, `${cityKey} 유동성TOP5`, city.color],
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
        </>
      ) : null}

      <Text style={styles.subSection}>단지 (84㎡ 중위 매매가)</Text>
      <View style={styles.chipRow}>
        {M.seoul.complexes.map((c) => {
          const on = selected.has(c.id);
          return (
            <Pressable
              key={c.id}
              onPress={() => toggle(c.id)}
              style={[styles.seriesChip, on && { borderColor: M.seoul.color, backgroundColor: '#fff' }]}
            >
              <View
                style={[styles.dot, { backgroundColor: M.seoul.color, opacity: on ? 1 : 0.35 }]}
              />
              <Text style={[styles.seriesChipText, !on && styles.dim]}>서 {c.aptName}</Text>
            </Pressable>
          );
        })}
        {city.complexes.map((c) => {
          const on = selected.has(c.id);
          const color = c.color ?? city.color;
          return (
            <Pressable
              key={c.id}
              onPress={() => toggle(c.id)}
              style={[styles.seriesChip, on && { borderColor: color, backgroundColor: '#fff' }]}
            >
              <View style={[styles.dot, { backgroundColor: color, opacity: on ? 1 : 0.35 }]} />
              <Text style={[styles.seriesChipText, !on && styles.dim]}>
                {cityKey.slice(0, 1)} {c.aptName}
              </Text>
            </Pressable>
          );
        })}
      </View>

      <Text style={styles.section}>구간 상승률 (유동성 바스켓)</Text>
      <Text style={styles.line}>
        2016~21 · 서울 {pct(city.returns.seoul_2016_2021)} / {cityKey}{' '}
        {pct(city.returns.metro_2016_2021)}
      </Text>
      <Text style={styles.line}>
        2022~23 · 서울 {pct(city.returns.seoul_2022_2023)} / {cityKey}{' '}
        {pct(city.returns.metro_2022_2023)}
      </Text>
      <Text style={styles.line}>
        2024~26 · 서울 {pct(city.returns.seoul_2024_2026)} / {cityKey}{' '}
        {pct(city.returns.metro_2024_2026)}
      </Text>

      <Text style={styles.section}>가격 TOP5 · {cityKey}</Text>
      {city.priceTop5.map((r, i) => (
        <Text key={`p-${r.apt}`} style={styles.rankLine}>
          {i + 1}. [{r.region}] {r.apt} · {r.median_억}억
        </Text>
      ))}

      <Text style={styles.section}>유동성 TOP5 · {cityKey}</Text>
      {city.liquidTop5.map((r, i) => (
        <Text key={`l-${r.id ?? r.apt}`} style={styles.rankLine}>
          {i + 1}. [{r.region}] {r.apt} · {r.months}개월 · {r.trades}건
        </Text>
      ))}

      <Text style={styles.section}>광역별 시차 요약</Text>
      {METRO_CITY_ORDER.map((name) => {
        const c = M.cities[name];
        return (
          <Pressable key={name} onPress={() => applyCity(name)} style={styles.summaryRow}>
            <View style={[styles.summaryDot, { backgroundColor: c.color }]} />
            <Text style={styles.summaryText}>
              {name} · 급등 {monthsLabel(c.lag.surgeLagMedianMonths)} · MoM{' '}
              {monthsLabel(c.lag.momBestLagMonths)} · 24~26 {pct(c.returns.metro_2024_2026)}
            </Text>
          </Pressable>
        );
      })}
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
  verdictEyebrow: {
    fontSize: 11,
    fontWeight: '700',
    color: '#8a929c',
    letterSpacing: 0.3,
  },
  verdictTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#1a2332',
    lineHeight: 21,
  },
  method: {
    fontSize: 11,
    lineHeight: 16,
    color: '#8a929c',
  },
  cityVerdict: {
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e4e9ef',
    borderLeftWidth: 4,
    padding: 14,
    gap: 4,
    marginTop: 4,
  },
  cityVerdictEyebrow: {
    fontSize: 11,
    fontWeight: '700',
    color: '#8a929c',
  },
  cityVerdictTitle: {
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
  tabRow: {
    flexDirection: 'row',
    gap: 8,
    paddingVertical: 4,
  },
  tab: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#d5dde5',
    backgroundColor: '#f7f8fa',
  },
  tabText: {
    fontSize: 13,
    fontWeight: '800',
    color: '#1a2332',
  },
  tabTextOn: {
    color: '#fff',
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
  summaryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 6,
  },
  summaryDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  summaryText: {
    flex: 1,
    fontSize: 13,
    lineHeight: 19,
    color: '#5c6570',
  },
});
