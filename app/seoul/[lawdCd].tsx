import { useLocalSearchParams, useNavigation } from 'expo-router';
import { useCallback, useEffect, useLayoutEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { AnalysisOptionsBar } from '../../src/components/AnalysisOptionsBar';
import { LeaderList } from '../../src/components/LeaderList';
import { OverlayLineChart } from '../../src/components/OverlayLineChart';
import { SurgeList } from '../../src/components/SurgeList';
import { DEFAULT_OPTIONS, SEOUL_DISTRICTS, type AnalysisOptions } from '../../src/data/seoul';
import { fetchLeaderIndex } from '../../src/services/api';
import { gapSeries, jeonseSeries, saleSeries, type LeaderIndexResult } from '../../src/types';
import {
  formatMetric,
  formatPercent,
  jeonseSeriesTitle,
  metricNoun,
  saleSeriesTitle,
} from '../../src/utils/format';
import { adaptLeaderIndexForMetric } from '../../src/utils/metric';

export default function SeoulDistrictScreen() {
  const { lawdCd } = useLocalSearchParams<{ lawdCd: string }>();
  const navigation = useNavigation();
  const district = SEOUL_DISTRICTS.find((d) => d.lawdCd === lawdCd);

  const [options, setOptions] = useState<AnalysisOptions>(DEFAULT_OPTIONS);
  const [raw, setRaw] = useState<LeaderIndexResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: district ? `서울 ${district.name}` : '구 분석',
    });
  }, [navigation, district]);

  const load = useCallback(async () => {
    if (!lawdCd) return;
    setLoading(true);
    setError(null);
    try {
      const result = await fetchLeaderIndex({
        lawdCd,
        topN: options.topN,
        years: options.years,
        surgeThreshold: options.surgeThreshold,
        areaTarget: options.areaTarget,
        metric: options.metric,
      });
      setRaw(result);
    } catch (err) {
      setRaw(null);
      setError(err instanceof Error ? err.message : '분석에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  }, [
    lawdCd,
    options.topN,
    options.years,
    options.surgeThreshold,
    options.areaTarget,
    options.metric,
  ]);

  useEffect(() => {
    void load();
  }, [load]);

  const data = useMemo(
    () => (raw ? adaptLeaderIndexForMetric(raw, options.metric) : null),
    [raw, options.metric],
  );

  const sale = useMemo(() => (data ? saleSeries(data) : []), [data]);
  const jeonse = useMemo(() => (data ? jeonseSeries(data) : []), [data]);
  const gap = useMemo(() => (data ? gapSeries(data) : []), [data]);

  const focus = options.metric === 'jeonse' ? jeonse : sale;
  const withFocus = focus.filter((m) => m.avgMedian != null);
  const first = withFocus[0]?.avgMedian;
  const lastFocus = withFocus.at(-1)?.avgMedian;
  const totalChange =
    first != null && lastFocus != null && first > 0
      ? ((lastFocus - first) / first) * 100
      : null;
  const lastSale = sale.filter((m) => m.avgMedian != null).at(-1)?.avgMedian;
  const lastJeonse = jeonse.filter((m) => m.avgMedian != null).at(-1)?.avgMedian;
  const lastGap = gap.filter((m) => m.avgMedian != null).at(-1)?.avgMedian;

  const noun = metricNoun(options.metric);
  const formatValue = useCallback(
    (v: number) => formatMetric(v, options.metric),
    [options.metric],
  );

  const combinedSeries = useMemo(() => {
    if (!data) return [];
    return [
      { id: 'sale', label: saleSeriesTitle(options.metric), color: '#1f4d3a', monthly: sale },
      {
        id: 'jeonse',
        label: jeonseSeriesTitle(options.metric),
        color: '#2a5f9e',
        monthly: jeonse,
      },
      { id: 'gap', label: '갭', color: '#c43b2c', monthly: gap },
    ];
  }, [data, sale, jeonse, gap, options.metric]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <AnalysisOptionsBar options={options} onChange={setOptions} />

      {loading ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color="#1f4d3a" />
          <Text style={styles.loadingText}>
            {options.areaTarget}㎡ {noun} · 대장 {options.topN}개 집계 중…
          </Text>
        </View>
      ) : null}

      {error ? (
        <View style={styles.errorBox}>
          <Text style={styles.errorText}>{error}</Text>
          <Pressable style={styles.retry} onPress={() => void load()}>
            <Text style={styles.retryText}>다시 시도</Text>
          </Pressable>
        </View>
      ) : null}

      {!loading && data ? (
        <>
          {data.mock ? (
            <Text style={styles.mockBadge}>데모 데이터 (MOLIT 키 미설정)</Text>
          ) : null}

          <View style={styles.stats}>
            <View style={styles.stat}>
              <Text style={styles.statLabel}>{saleSeriesTitle(options.metric)}</Text>
              <Text style={styles.statValue}>{formatMetric(lastSale, options.metric)}</Text>
            </View>
            <View style={styles.stat}>
              <Text style={styles.statLabel}>{jeonseSeriesTitle(options.metric)}</Text>
              <Text style={styles.statValue}>{formatMetric(lastJeonse, options.metric)}</Text>
            </View>
            <View style={styles.stat}>
              <Text style={styles.statLabel}>갭</Text>
              <Text style={styles.statValue}>{formatMetric(lastGap, options.metric)}</Text>
            </View>
          </View>
          <View style={styles.stats}>
            <View style={styles.stat}>
              <Text style={styles.statLabel}>
                {data.years}년 {noun} 변화
              </Text>
              <Text
                style={[
                  styles.statValue,
                  totalChange != null && totalChange >= 0 ? styles.up : styles.down,
                ]}
              >
                {formatPercent(totalChange)}
              </Text>
            </View>
            <View style={styles.stat}>
              <Text style={styles.statLabel}>급등 구간</Text>
              <Text style={styles.statValue}>{data.surges.length}곳</Text>
            </View>
            <View style={styles.stat}>
              <Text style={styles.statLabel}>평형</Text>
              <Text style={styles.statValue}>{data.areaTarget ?? options.areaTarget}㎡</Text>
            </View>
          </View>

          <Text style={styles.blockTitle}>
            {saleSeriesTitle(options.metric)} · {jeonseSeriesTitle(options.metric)} · 갭
          </Text>
          <OverlayLineChart series={combinedSeries} height={280} formatValue={formatValue} />

          <Text style={styles.blockTitle}>급등 구간 ({noun})</Text>
          <SurgeList
            surges={data.surges}
            threshold={data.surgeThresholdPercent}
            metric={options.metric}
          />

          <Text style={styles.blockTitle}>대장 단지 TOP {data.topN}</Text>
          <Text style={styles.blockSub}>
            {options.areaTarget}㎡ {noun} 순 · 매매 {data.tradeCount.toLocaleString()}건 / 전세{' '}
            {(data.jeonseCount ?? 0).toLocaleString()}건
          </Text>
          <LeaderList
            leaders={data.leaders}
            metric={options.metric}
            areaTarget={data.areaTarget ?? options.areaTarget}
          />

          <Text style={styles.summary}>{data.summary}</Text>
        </>
      ) : null}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 48,
    gap: 12,
  },
  center: {
    alignItems: 'center',
    paddingVertical: 48,
    gap: 10,
  },
  loadingText: {
    fontSize: 14,
    color: '#3d4639',
    fontWeight: '600',
  },
  errorBox: {
    backgroundColor: '#fdf4f2',
    padding: 14,
    gap: 10,
    borderLeftWidth: 3,
    borderLeftColor: '#e85d4c',
  },
  errorText: {
    color: '#6b2a22',
    fontSize: 14,
    lineHeight: 20,
  },
  retry: {
    alignSelf: 'flex-start',
    backgroundColor: '#1f4d3a',
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  retryText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 13,
  },
  mockBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#efe9d8',
    paddingHorizontal: 8,
    paddingVertical: 4,
    fontSize: 12,
    fontWeight: '600',
    overflow: 'hidden',
  },
  stats: {
    flexDirection: 'row',
    gap: 8,
  },
  stat: {
    flex: 1,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#d9ddd6',
    padding: 12,
  },
  statLabel: {
    fontSize: 11,
    color: '#7a8478',
    marginBottom: 4,
  },
  statValue: {
    fontSize: 14,
    fontWeight: '800',
    color: '#1a2218',
    fontVariant: ['tabular-nums'],
  },
  up: { color: '#c43b2c' },
  down: { color: '#2a5f9e' },
  blockTitle: {
    marginTop: 8,
    fontSize: 17,
    fontWeight: '700',
    color: '#1a2218',
  },
  blockSub: {
    marginTop: -6,
    fontSize: 12,
    color: '#7a8478',
  },
  summary: {
    marginTop: 8,
    fontSize: 13,
    lineHeight: 20,
    color: '#5c655a',
  },
});
